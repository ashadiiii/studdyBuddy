from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.v1.timer import router as timer_router

app = FastAPI(title = "chroni")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["<http://localhost:3000>"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(timer_router, prefix="/api/v1", tags=["timer"])