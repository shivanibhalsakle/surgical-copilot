from contextlib import asynccontextmanager

from fastapi import FastAPI

from apps.api.app.routers import (
    health,
    predictions,
    reference,
)
from apps.api.app.services.prediction_service import (
    load_model_artifacts,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Loading INSPIRE Surgical Copilot models...")

    app.state.model_artifacts = load_model_artifacts()

    print("All model artifacts loaded successfully.")

    yield

    app.state.model_artifacts = None

    print("Model artifacts released.")


app = FastAPI(
    title="INSPIRE Surgical Copilot API",
    description=(
        "Research API for preoperative risk "
        "and resource planning."
    ),
    version="0.1.0",
    lifespan=lifespan,
)

app.include_router(health.router)
app.include_router(
    predictions.router,
    prefix="/api/v1",
)
app.include_router(
    reference.router,
    prefix="/api/v1",
)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "name": "INSPIRE Surgical Copilot API",
        "status": "running",
        "disclaimer": (
            "Research and educational use only; "
            "not for clinical care."
        ),
    }

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from apps.api.app.routers import predictions, reference
from apps.api.app.services.prediction_service import load_model_artifacts


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model_artifacts = load_model_artifacts()
    yield


app = FastAPI(
    title="INSPIRE Surgical Copilot API",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predictions.router, prefix="/api/v1")
app.include_router(reference.router, prefix="/api/v1")

