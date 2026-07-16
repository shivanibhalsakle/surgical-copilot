from fastapi import FastAPI

from apps.api.app.routers import (
    health,
    predictions,
    reference,
)

app = FastAPI(
    title="INSPIRE Surgical Copilot API",
    description="Research API for preoperative risk and resource planning.",
    version="0.1.0",
)

app.include_router(health.router)
app.include_router(predictions.router, prefix="/api/v1")
app.include_router(
    reference.router,
    prefix="/api/v1",
)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "name": "INSPIRE Surgical Copilot API",
        "status": "running",
        "disclaimer": "Research and educational use only; not for clinical care.",
    }

