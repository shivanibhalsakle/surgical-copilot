from dataclasses import dataclass
from pathlib import Path
from typing import Any

import joblib
import pandas as pd

from apps.api.app.schemas.prediction import SurgicalPatientInput


PROJECT_ROOT = Path(__file__).resolve().parents[4]
MODEL_DIR = PROJECT_ROOT / "models"


@dataclass
class ModelArtifacts:
    icu_pipeline: Any
    mortality_pipeline: Any
    recovery_pipeline: Any


def load_model_artifacts() -> ModelArtifacts:
    model_paths = {
        "icu": MODEL_DIR / "icu_pipeline.joblib",
        "mortality": MODEL_DIR / "mortality_pipeline.joblib",
        "recovery": MODEL_DIR / "recovery_pipeline.joblib",
    }

    missing_files = [
        str(path)
        for path in model_paths.values()
        if not path.exists()
    ]

    if missing_files:
        raise FileNotFoundError(
            "Missing model files:\n"
            + "\n".join(missing_files)
        )

    return ModelArtifacts(
        icu_pipeline=joblib.load(model_paths["icu"]),
        mortality_pipeline=joblib.load(
            model_paths["mortality"]
        ),
        recovery_pipeline=joblib.load(
            model_paths["recovery"]
        ),
    )


def get_risk_category(probability: float) -> str:
    if probability < 0.30:
        return "Low"

    if probability < 0.70:
        return "Medium"

    return "High"


def prepare_input(
    patient: SurgicalPatientInput,
) -> pd.DataFrame:
    patient_data = patient.model_dump()

    patient_data["bmi"] = (
        patient.weight
        / ((patient.height / 100) ** 2)
    )

    expected_columns = [
        "age",
        "sex",
        "height",
        "weight",
        "race",
        "asa",
        "department",
        "antype",
        "emop",
        "icd10_pcs",
        "bmi",
        "heart_rate",
        "systolic_bp",
        "diastolic_bp",
        "respiratory_rate",
        "oxygen_saturation",
        "temperature",
        "hemoglobin",
        "wbc",
        "platelets",
        "creatinine",
        "glucose",
        "sodium",
        "potassium",
        "albumin",
        "inr",
        "diabetes",
        "hypertension",
        "ckd",
        "stroke",
        "heart_failure",
        "copd",
        "cancer",
    ]

    return pd.DataFrame(
        [patient_data],
        columns=expected_columns,
    )


def make_predictions(
    patient: SurgicalPatientInput,
    artifacts: ModelArtifacts,
) -> dict[str, object]:
    model_input = prepare_input(patient)

    icu_probability = float(
        artifacts.icu_pipeline.predict_proba(
            model_input
        )[0, 1]
    )

    mortality_probability = float(
        artifacts.mortality_pipeline.predict_proba(
            model_input
        )[0, 1]
    )

    recovery_days = float(
        artifacts.recovery_pipeline.predict(
            model_input
        )[0]
    )

    recovery_days = max(0.0, recovery_days)

    return {
        "icu_admission_probability": round(
            icu_probability,
            4,
        ),
        "icu_admission_prediction": (
            icu_probability >= 0.50
        ),
        "risk_category": get_risk_category(
            icu_probability
        ),
        "predicted_length_of_stay_days": round(
            recovery_days,
            1,
        ),
        "mortality_probability": round(
            mortality_probability,
            4,
        ),
        "mortality_high_risk": (
            mortality_probability >= 0.20
        ),
        "disclaimer": (
            "Research and educational use only. "
            "Not for clinical decision-making."
        ),
    }
