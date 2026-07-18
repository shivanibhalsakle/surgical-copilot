from fastapi import APIRouter, HTTPException, Request

from apps.api.app.schemas.prediction import (
    SurgicalPatientInput,
    SurgicalPredictionResponse,
)
from apps.api.app.services.prediction_service import (
    ModelArtifacts,
    make_predictions,
)

router = APIRouter(tags=["predictions"])


@router.post(
    "/predict",
    response_model=SurgicalPredictionResponse,
)
def predict(
    patient: SurgicalPatientInput,
    request: Request,
) -> SurgicalPredictionResponse:
    artifacts: ModelArtifacts | None = getattr(
        request.app.state,
        "model_artifacts",
        None,
    )

    if artifacts is None:
        raise HTTPException(
            status_code=503,
            detail="Prediction models are not available.",
        )

    predictions = make_predictions(
        patient=patient,
        artifacts=artifacts,
    )

    return SurgicalPredictionResponse(
        **predictions
    )