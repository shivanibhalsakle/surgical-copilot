from pathlib import Path

import joblib


PROJECT_ROOT = Path(__file__).resolve().parents[4]
MODEL_DIR = PROJECT_ROOT / "models"

REFERENCE_VALUES = joblib.load(
    MODEL_DIR / "reference_values.joblib"
)


def get_reference_values() -> dict[str, list[str]]:
    return REFERENCE_VALUES