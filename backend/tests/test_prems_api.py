"""
Backend API Tests for Prems AI
Tests cover: auth/register, waitlist status endpoints
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthCheck:
    """Health check and basic API tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert "Prems AI API" in data["message"]
        print(f"API root OK: {data}")
    
    def test_waitlist_count(self):
        """Test waitlist count endpoint"""
        response = requests.get(f"{BASE_URL}/api/waitlist/count")
        assert response.status_code == 200
        data = response.json()
        assert "count" in data
        assert isinstance(data["count"], int)
        print(f"Waitlist count: {data['count']}")


class TestUserRegistration:
    """User registration flow tests"""
    
    def test_register_user_minimal(self):
        """Test registering a user with minimal required fields"""
        unique_email = f"test_{uuid.uuid4().hex[:8]}@test.com"
        payload = {
            "email": unique_email,
            "password": "TestPass123",
            "first_name": "Test",
            "last_name": "User"
        }
        response = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response.status_code == 200, f"Failed: {response.text}"
        
        data = response.json()
        # Verify response structure
        assert "user_id" in data
        assert "email" in data
        assert "referral_code" in data
        assert "waitlist_position" in data
        assert "total_waitlist" in data
        
        # Verify values
        assert data["email"] == unique_email.lower()
        assert data["referral_code"].startswith("PREMS-")
        assert len(data["referral_code"]) == 11  # PREMS-XXXXX
        assert data["waitlist_position"] > 0
        assert data["first_name"] == "Test"
        
        print(f"Registration successful: position #{data['waitlist_position']}, code: {data['referral_code']}")
        return data
    
    def test_register_user_full_data(self):
        """Test registering a user with complete signup form data"""
        unique_email = f"testfull_{uuid.uuid4().hex[:8]}@test.com"
        payload = {
            "email": unique_email,
            "password": "SecurePass1",
            # Housing step
            "property_type": "Appartement",
            "furnished": "Meublé",
            "min_rooms": "T2",
            "min_surface": 35,
            # Location step
            "search_cities": "Paris, Lyon",
            "current_location": "France métropolitaine",
            "budget_min": "800",
            "budget_max": "1200",
            "deposit": "1 mois de loyer",
            # Equipment step
            "equipments": ["Parking", "Balcon", "Ascenseur"],
            "additional_notes": "Proche métro",
            # Calendar step
            "move_date": "2026-03-01",
            "urgency": "Normal",
            "visit_availability": ["Matin", "Soir"],
            # Profile step
            "first_name": "Jean",
            "last_name": "Dupont",
            "phone": "0612345678",
            "professional_status": "Salarié(e)",
            "monthly_income": "3000",
            "guarantor_type": "Parents",
            # Discovery
            "how_heard": "Google"
        }
        response = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response.status_code == 200, f"Failed: {response.text}"
        
        data = response.json()
        assert data["email"] == unique_email.lower()
        assert data["first_name"] == "Jean"
        assert data["referral_code"].startswith("PREMS-")
        
        print(f"Full registration successful: {data['email']}, position #{data['waitlist_position']}")
        return data
    
    def test_register_duplicate_email_fails(self):
        """Test that registering with duplicate email returns 400"""
        unique_email = f"testdup_{uuid.uuid4().hex[:8]}@test.com"
        payload = {
            "email": unique_email,
            "password": "TestPass123",
            "first_name": "Dup",
            "last_name": "Test"
        }
        # First registration
        response1 = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response1.status_code == 200
        
        # Second registration with same email
        response2 = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response2.status_code == 400
        
        data = response2.json()
        assert "déjà inscrit" in data["detail"].lower() or "email" in data["detail"].lower()
        print(f"Duplicate email correctly rejected: {data['detail']}")
    
    def test_register_and_verify_waitlist_status(self):
        """Test registration followed by waitlist status check"""
        unique_email = f"teststatus_{uuid.uuid4().hex[:8]}@test.com"
        payload = {
            "email": unique_email,
            "password": "TestPass123",
            "first_name": "Status",
            "last_name": "Test"
        }
        # Register
        reg_response = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert reg_response.status_code == 200
        reg_data = reg_response.json()
        user_id = reg_data["user_id"]
        
        # Get waitlist status
        status_response = requests.get(f"{BASE_URL}/api/waitlist/status/{user_id}")
        assert status_response.status_code == 200
        
        status_data = status_response.json()
        # Verify data matches
        assert status_data["user_id"] == user_id
        assert status_data["email"] == unique_email.lower()
        assert status_data["referral_code"] == reg_data["referral_code"]
        assert status_data["waitlist_position"] == reg_data["waitlist_position"]
        assert status_data["first_name"] == "Status"
        assert status_data["referral_count"] == 0
        
        print(f"Waitlist status verified: position #{status_data['waitlist_position']}, total: {status_data['total_waitlist']}")
    
    def test_waitlist_status_not_found(self):
        """Test waitlist status with invalid user_id returns 404"""
        fake_user_id = str(uuid.uuid4())
        response = requests.get(f"{BASE_URL}/api/waitlist/status/{fake_user_id}")
        assert response.status_code == 404
        
        data = response.json()
        assert "introuvable" in data["detail"].lower() or "not found" in data["detail"].lower()
        print(f"Invalid user correctly returns 404: {data['detail']}")


class TestReferralSystem:
    """Referral code system tests"""
    
    def test_referral_code_usage(self):
        """Test that using a referral code during registration works"""
        # First create a referrer user
        referrer_email = f"referrer_{uuid.uuid4().hex[:8]}@test.com"
        referrer_payload = {
            "email": referrer_email,
            "password": "TestPass123",
            "first_name": "Referrer",
            "last_name": "User"
        }
        ref_response = requests.post(f"{BASE_URL}/api/auth/register", json=referrer_payload)
        assert ref_response.status_code == 200
        referrer_data = ref_response.json()
        referrer_code = referrer_data["referral_code"]
        referrer_id = referrer_data["user_id"]
        
        # Now register a new user with the referral code
        new_user_email = f"referred_{uuid.uuid4().hex[:8]}@test.com"
        new_user_payload = {
            "email": new_user_email,
            "password": "TestPass123",
            "first_name": "Referred",
            "last_name": "User",
            "referral_code_used": referrer_code
        }
        new_response = requests.post(f"{BASE_URL}/api/auth/register", json=new_user_payload)
        assert new_response.status_code == 200
        
        # Check referrer's status - referral count should be 1 now
        status_response = requests.get(f"{BASE_URL}/api/waitlist/status/{referrer_id}")
        assert status_response.status_code == 200
        status_data = status_response.json()
        
        assert status_data["referral_count"] == 1
        print(f"Referral system working: {referrer_code} now has {status_data['referral_count']} referrals")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
