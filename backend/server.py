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
    property_type: Optional[str] = None
    furnished: Optional[str] = None
    min_rooms: Optional[str] = None
    min_surface: Optional[int] = None
    search_cities: Optional[str] = None
    current_location: Optional[str] = None
    budget_min: Optional[str] = None
    budget_max: Optional[str] = None
    deposit: Optional[str] = None
    equipments: Optional[List[str]] = None
    additional_notes: Optional[str] = None
    move_date: Optional[str] = None
    urgency: Optional[str] = None
    visit_availability: Optional[List[str]] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    professional_status: Optional[str] = None
    monthly_income: Optional[str] = None
    guarantor_type: Optional[str] = None
    guarantor_income: Optional[str] = None
    how_heard: Optional[str] = None
    referral_code_used: Optional[str] = None

class LoginRequest(BaseModel):
    email: str
    password: str

class AdminLoginRequest(BaseModel):
    username: str
    password: str

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

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

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

@api_router.post("/auth/login")
async def login(req: LoginRequest):
    email = req.email.lower().strip()
    user = await db.waitlist_users.find_one({"email": email}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect.")
    if not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect.")
    total = await db.waitlist_users.count_documents({})
    return {
        "user_id": user["user_id"],
        "email": user["email"],
        "first_name": user.get("first_name"),
        "last_name": user.get("last_name"),
        "referral_code": user["referral_code"],
        "waitlist_position": user["waitlist_position"],
        "total_waitlist": total,
        "referral_count": user.get("referral_count", 0),
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

@api_router.get("/waitlist/leaderboard")
async def get_leaderboard():
    users = await db.waitlist_users.find(
        {}, {"_id": 0, "user_id": 1, "first_name": 1, "last_name": 1, "waitlist_position": 1, "referral_count": 1, "referral_code": 1, "created_at": 1}
    ).sort("waitlist_position", 1).to_list(100)
    return users

# ============ ADMIN ROUTES ============

ADMIN_USERNAME = "oren_shrek"
ADMIN_PASSWORD = "Iloveyoufilm!"

@api_router.post("/admin/login")
async def admin_login(req: AdminLoginRequest):
    if req.username != ADMIN_USERNAME or req.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Identifiants invalides.")
    return {"token": "admin_authenticated", "message": "Bienvenue, admin."}

@api_router.get("/admin/stats")
async def admin_stats(token: str = ""):
    if token != "admin_authenticated":
        raise HTTPException(status_code=401, detail="Non autorisé.")
    total = await db.waitlist_users.count_documents({})
    users = await db.waitlist_users.find({}, {"_id": 0}).to_list(None)

    # Property type distribution
    property_types = {}
    pro_statuses = {}
    locations = {}
    urgencies = {}
    how_heard = {}
    budget_ranges = {"< 500€": 0, "500-800€": 0, "800-1200€": 0, "> 1200€": 0}
    rooms_dist = {}
    equip_counts = {}
    signups_by_date = {}

    for u in users:
        pt = u.get("property_type") or "Non renseigné"
        property_types[pt] = property_types.get(pt, 0) + 1

        ps = u.get("professional_status") or "Non renseigné"
        pro_statuses[ps] = pro_statuses.get(ps, 0) + 1

        loc = u.get("current_location") or "Non renseigné"
        locations[loc] = locations.get(loc, 0) + 1

        urg = u.get("urgency") or "Non renseigné"
        urgencies[urg] = urgencies.get(urg, 0) + 1

        hh = u.get("how_heard") or "Non renseigné"
        how_heard[hh] = how_heard.get(hh, 0) + 1

        mr = u.get("min_rooms") or "Non renseigné"
        rooms_dist[mr] = rooms_dist.get(mr, 0) + 1

        for eq in (u.get("equipments") or []):
            equip_counts[eq] = equip_counts.get(eq, 0) + 1

        bmax = u.get("budget_max", "")
        try:
            val = int(str(bmax).replace("€", "").replace(" ", "").strip())
            if val < 500: budget_ranges["< 500€"] += 1
            elif val <= 800: budget_ranges["500-800€"] += 1
            elif val <= 1200: budget_ranges["800-1200€"] += 1
            else: budget_ranges["> 1200€"] += 1
        except (ValueError, TypeError):
            pass

        ca = u.get("created_at", "")
        if ca:
            day = ca[:10]
            signups_by_date[day] = signups_by_date.get(day, 0) + 1

    leaderboard = sorted(users, key=lambda x: x.get("waitlist_position", 999))[:20]
    clean_leaderboard = []
    for u in leaderboard:
        clean_leaderboard.append({
            "first_name": u.get("first_name", "Anonyme"),
            "last_name": u.get("last_name", ""),
            "email": u.get("email", ""),
            "waitlist_position": u.get("waitlist_position", 0),
            "referral_count": u.get("referral_count", 0),
            "referral_code": u.get("referral_code", ""),
            "property_type": u.get("property_type", ""),
            "search_cities": u.get("search_cities", ""),
            "professional_status": u.get("professional_status", ""),
            "created_at": u.get("created_at", ""),
        })

    def to_chart(d):
        return [{"name": k, "value": v} for k, v in d.items() if k and v]

    return {
        "total_users": total,
        "property_types": to_chart(property_types),
        "professional_statuses": to_chart(pro_statuses),
        "locations": to_chart(locations),
        "urgencies": to_chart(urgencies),
        "how_heard": to_chart(how_heard),
        "rooms_distribution": to_chart(rooms_dist),
        "equipment_popularity": to_chart(equip_counts),
        "budget_ranges": to_chart(budget_ranges),
        "signups_by_date": [{"date": k, "count": v} for k, v in sorted(signups_by_date.items())],
        "leaderboard": clean_leaderboard,
    }

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
