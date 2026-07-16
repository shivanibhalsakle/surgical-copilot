from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from apps.api.app.schemas.prediction import SurgicalPatientInput


PROJECT_ROOT = Path(__file__).resolve().parents[4]
MODEL_DIR = PROJECT_ROOT / "models"

icu_model = joblib.load(
    MODEL_DIR / "icu_admission_model.joblib"
)

los_model = joblib.load(
    MODEL_DIR / "length_of_stay_model.joblib"
)

mortality_model = joblib.load(
    MODEL_DIR / "mortality_model.joblib"
)

scaler = joblib.load(
    MODEL_DIR / "scaler.joblib"
)

icu_feature_columns = joblib.load(
    MODEL_DIR / "icu_feature_columns.joblib"
)

extended_feature_columns = joblib.load(
    MODEL_DIR / "extended_feature_columns.joblib"
)

NUMERIC_COLUMNS = ["age", "bmi", "asa"]


def get_risk_category(probability: float) -> str:
    if probability < 0.30:
        return "Low"
    if probability < 0.70:
        return "Medium"
    return "High"


def prepare_input(
    patient: SurgicalPatientInput,
    expected_columns: list[str],
) -> pd.DataFrame:
    bmi = patient.weight / ((patient.height / 100) ** 2)

    row = pd.DataFrame(
        [
            {
                "age": patient.age,
                "sex": patient.sex,
                "race": patient.race,
                "asa": patient.asa,
                "emop": patient.emop,
                "department": patient.department,
                "antype": patient.antype,
                "icd10_pcs": patient.icd10_pcs,
                "bmi": bmi,
            }
        ]
    )

    row = pd.get_dummies(
        row,
        columns=[
            "sex",
            "race",
            "department",
            "antype",
            "icd10_pcs",
        ],
        dtype=int,
    )

    row = row.reindex(
        columns=expected_columns,
        fill_value=0,
    )

    return row


def make_predictions(
    patient: SurgicalPatientInput,
) -> dict[str, object]:
    icu_input = prepare_input(
        patient,
        icu_feature_columns,
    )

    extended_input = prepare_input(
        patient,
        extended_feature_columns,
    )

    icu_input[NUMERIC_COLUMNS] = scaler.transform(
        icu_input[NUMERIC_COLUMNS]
    )

    icu_probability = float(
        icu_model.predict_proba(icu_input)[0, 1]
    )

    los_log_prediction = float(
        los_model.predict(extended_input)[0]
    )

    los_days = max(
        0.0,
        float(np.expm1(los_log_prediction)),
    )

    mortality_probability = float(
        mortality_model.predict_proba(
            extended_input
        )[0, 1]
    )

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
            los_days,
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