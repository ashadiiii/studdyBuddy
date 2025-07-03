from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, onboarding,user
from app.api.v1.timer import router as timer_router
from app.api.v1.tasks import router as tasks_router

app = FastAPI(title="Minerva")

# Step 8: Configure CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Step 9: Include all API routes
# app.include_router(timer_router, prefix="/api/v1", tags=["timer"])
app.include_router(onboarding.router, prefix="/api/v1", tags=["onboarding"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(tasks_router, prefix='/api/v1/tasks', tags=['tasks'])
app.include_router(user.router,prefix='/api/v1/user')