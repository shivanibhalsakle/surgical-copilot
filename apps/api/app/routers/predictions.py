from fastapi import APIRouter

from apps.api.app.schemas.prediction import (
    PreoperativePatient,
    SurgicalRiskResponse,
)

router = APIRouter(tags=["predictions"])


@router.post("/predict", response_model=SurgicalRiskResponse)
def predict_surgical_risk(patient: PreoperativePatient) -> SurgicalRiskResponse:
    # Placeholder until validated models are trained and loaded.
    return SurgicalRiskResponse(
        icu_admission_probability=None,
        in_hospital_mortality_probability=None,
        predicted_hospital_los_days=None,
        predicted_icu_los_days=None,
        resource_intensity="model_not_loaded",
        explanation=[
            "Prediction models have not been trained yet.",
            "Input validation and API scaffolding are working.",
        ],
        disclaimer="Research and educational use only; not for clinical care.",
    )
