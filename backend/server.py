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
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ============ MODELS ============

class RegisterRequest(BaseModel):
    email: str
    password: str

class RegisterResponse(BaseModel):
    user_id: str
    email: str
    message: str

class ProfileRequest(BaseModel):
    user_id: str
    first_name: str
    last_name: str
    phone: Optional[str] = None
    professional_status: Optional[str] = None
    monthly_income: Optional[str] = None
    employer: Optional[str] = None
    search_cities: Optional[str] = None
    property_type: Optional[str] = None
    max_budget: Optional[str] = None
    min_surface: Optional[str] = None
    preferred_areas: Optional[str] = None
    dossier_link: Optional[str] = None
    has_guarantor: Optional[bool] = False
    how_heard: Optional[str] = None
    referred_by_code: Optional[str] = None

class WaitlistStatus(BaseModel):
    user_id: str
    email: str
    first_name: Optional[str] = None
    referral_code: str
    waitlist_position: int
    total_waitlist: int
    referral_count: int

class ApplyReferralRequest(BaseModel):
    user_id: str
    referral_code: str

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
    return {"message": "Prems AI API"}

@api_router.post("/auth/register", response_model=RegisterResponse)
async def register(req: RegisterRequest):
    existing = await db.waitlist_users.find_one({"email": req.email.lower().strip()}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Cet email est déjà inscrit.")

    # Generate unique referral code
    referral_code = generate_referral_code()
    while await db.waitlist_users.find_one({"referral_code": referral_code}):
        referral_code = generate_referral_code()

    # Calculate position
    count = await db.waitlist_users.count_documents({})
    position = count + 1

    user_id = str(uuid.uuid4())
    user_doc = {
        "user_id": user_id,
        "email": req.email.lower().strip(),
        "password_hash": hash_password(req.password),
        "referral_code": referral_code,
        "referred_by_code": None,
        "waitlist_position": position,
        "referral_count": 0,
        "profile_completed": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    await db.waitlist_users.insert_one(user_doc)

    return RegisterResponse(
        user_id=user_id,
        email=req.email.lower().strip(),
        message="Compte créé avec succès!"
    )

@api_router.post("/waitlist/complete-profile")
async def complete_profile(req: ProfileRequest):
    user = await db.waitlist_users.find_one({"user_id": req.user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable.")

    update_data = {
        "first_name": req.first_name,
        "last_name": req.last_name,
        "phone": req.phone,
        "professional_status": req.professional_status,
        "monthly_income": req.monthly_income,
        "employer": req.employer,
        "search_cities": req.search_cities,
        "property_type": req.property_type,
        "max_budget": req.max_budget,
        "min_surface": req.min_surface,
        "preferred_areas": req.preferred_areas,
        "dossier_link": req.dossier_link,
        "has_guarantor": req.has_guarantor,
        "how_heard": req.how_heard,
        "profile_completed": True,
        "updated_at": datetime.now(timezone.utc).isoformat()
    }

    # Handle referral code
    if req.referred_by_code and req.referred_by_code.strip():
        code = req.referred_by_code.strip().upper()
        if code != user.get("referral_code"):
            referrer = await db.waitlist_users.find_one({"referral_code": code}, {"_id": 0})
            if referrer:
                update_data["referred_by_code"] = code
                # Boost referrer position by 10
                new_pos = max(1, referrer["waitlist_position"] - 10)
                await db.waitlist_users.update_one(
                    {"user_id": referrer["user_id"]},
                    {"$set": {"waitlist_position": new_pos}, "$inc": {"referral_count": 1}}
                )

    await db.waitlist_users.update_one(
        {"user_id": req.user_id},
        {"$set": update_data}
    )

    return {"message": "Profil complété!", "success": True}

@api_router.get("/waitlist/status/{user_id}", response_model=WaitlistStatus)
async def get_waitlist_status(user_id: str):
    user = await db.waitlist_users.find_one({"user_id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable.")

    total = await db.waitlist_users.count_documents({})

    return WaitlistStatus(
        user_id=user["user_id"],
        email=user["email"],
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

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
