from fastapi import APIRouter

from apps.api.app.schemas.prediction import (
    SurgicalPatientInput,
    SurgicalPredictionResponse,
)
from apps.api.app.services.prediction_service import (
    make_predictions,
)

router = APIRouter(tags=["predictions"])


@router.post(
    "/predict",
    response_model=SurgicalPredictionResponse,
)
def predict(
    patient: SurgicalPatientInput,
) -> SurgicalPredictionResponse:
    predictions = make_predictions(patient)

    return SurgicalPredictionResponse(
        **predictions
    )