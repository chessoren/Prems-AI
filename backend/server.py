from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import bcrypt
import random
import string
from pathlib import Path
from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ============ MODELS ============

class RegisterRequest(BaseModel):
    email: str
    password: str
    # Step 1: Housing
    property_type: Optional[str] = None
    furnished: Optional[str] = None
    min_rooms: Optional[str] = None
    min_surface: Optional[int] = None
    # Step 2: Location & Budget
    search_cities: Optional[str] = None
    current_location: Optional[str] = None
    budget_min: Optional[str] = None
    budget_max: Optional[str] = None
    deposit: Optional[str] = None
    # Step 3: Equipment
    equipments: Optional[List[str]] = None
    additional_notes: Optional[str] = None
    # Step 4: Calendar
    move_date: Optional[str] = None
    urgency: Optional[str] = None
    visit_availability: Optional[List[str]] = None
    # Step 5: Profile
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    professional_status: Optional[str] = None
    monthly_income: Optional[str] = None
    guarantor_type: Optional[str] = None
    guarantor_income: Optional[str] = None
    # Discovery
    how_heard: Optional[str] = None
    referral_code_used: Optional[str] = None

class WaitlistStatus(BaseModel):
    user_id: str
    email: str
    first_name: Optional[str] = None
    referral_code: str
    waitlist_position: int
    total_waitlist: int
    referral_count: int

# ============ HELPERS ============

def generate_referral_code():
    chars = string.ascii_uppercase + string.digits
    return "PREMS-" + ''.join(random.choices(chars, k=5))

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# ============ ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "Prems AI API", "status": "ok"}

@api_router.post("/auth/register")
async def register(req: RegisterRequest):
    email = req.email.lower().strip()
    existing = await db.waitlist_users.find_one({"email": email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Cet email est déjà inscrit.")

    referral_code = generate_referral_code()
    while await db.waitlist_users.find_one({"referral_code": referral_code}):
        referral_code = generate_referral_code()

    count = await db.waitlist_users.count_documents({})
    position = count + 1
    user_id = str(uuid.uuid4())

    user_doc = {
        "user_id": user_id,
        "email": email,
        "password_hash": hash_password(req.password),
        "referral_code": referral_code,
        "waitlist_position": position,
        "referral_count": 0,
        "first_name": req.first_name,
        "last_name": req.last_name,
        "phone": req.phone,
        "property_type": req.property_type,
        "furnished": req.furnished,
        "min_rooms": req.min_rooms,
        "min_surface": req.min_surface,
        "search_cities": req.search_cities,
        "current_location": req.current_location,
        "budget_min": req.budget_min,
        "budget_max": req.budget_max,
        "deposit": req.deposit,
        "equipments": req.equipments or [],
        "additional_notes": req.additional_notes,
        "move_date": req.move_date,
        "urgency": req.urgency,
        "visit_availability": req.visit_availability or [],
        "professional_status": req.professional_status,
        "monthly_income": req.monthly_income,
        "guarantor_type": req.guarantor_type,
        "guarantor_income": req.guarantor_income,
        "how_heard": req.how_heard,
        "referred_by_code": None,
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    # Handle referral
    if req.referral_code_used and req.referral_code_used.strip():
        code = req.referral_code_used.strip().upper()
        referrer = await db.waitlist_users.find_one({"referral_code": code}, {"_id": 0})
        if referrer:
            user_doc["referred_by_code"] = code
            new_pos = max(1, referrer["waitlist_position"] - 10)
            await db.waitlist_users.update_one(
                {"user_id": referrer["user_id"]},
                {"$set": {"waitlist_position": new_pos}, "$inc": {"referral_count": 1}}
            )

    await db.waitlist_users.insert_one(user_doc)

    return {
        "user_id": user_id,
        "email": email,
        "referral_code": referral_code,
        "waitlist_position": position,
        "total_waitlist": position,
        "first_name": req.first_name,
        "referral_count": 0,
        "message": "Inscription réussie!"
    }

@api_router.get("/waitlist/status/{user_id}", response_model=WaitlistStatus)
async def get_waitlist_status(user_id: str):
    user = await db.waitlist_users.find_one({"user_id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable.")
    total = await db.waitlist_users.count_documents({})
    return WaitlistStatus(
        user_id=user["user_id"], email=user["email"],
        first_name=user.get("first_name"),
        referral_code=user["referral_code"],
        waitlist_position=user["waitlist_position"],
        total_waitlist=total,
        referral_count=user.get("referral_count", 0)
    )

@api_router.get("/waitlist/count")
async def get_waitlist_count():
    total = await db.waitlist_users.count_documents({})
    return {"count": total}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
