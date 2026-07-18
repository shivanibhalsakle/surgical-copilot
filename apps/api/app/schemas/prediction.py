from typing import Literal

from pydantic import BaseModel, Field


BinaryFlag = Literal[0, 1]


class SurgicalPatientInput(BaseModel):
    # Patient demographics
    age: int = Field(ge=18, le=120)
    sex: str = Field(min_length=1)
    height: float = Field(gt=0, description="Height in centimeters")
    weight: float = Field(gt=0, description="Weight in kilograms")
    race: str = Field(min_length=1)

    # Surgical information
    asa: int = Field(ge=1, le=5)
    department: str = Field(min_length=1)
    antype: str = Field(min_length=1)
    emop: BinaryFlag
    icd10_pcs: str = Field(min_length=1)

    # Preoperative vitals
    heart_rate: float = Field(gt=0)
    systolic_bp: float = Field(gt=0)
    diastolic_bp: float = Field(gt=0)
    respiratory_rate: float = Field(gt=0)
    oxygen_saturation: float = Field(ge=0, le=100)
    temperature: float = Field(gt=0)

    # Preoperative laboratory values
    hemoglobin: float = Field(gt=0)
    wbc: float = Field(ge=0)
    platelets: float = Field(ge=0)
    creatinine: float = Field(ge=0)
    glucose: float = Field(ge=0)
    sodium: float = Field(gt=0)
    potassium: float = Field(gt=0)
    albumin: float = Field(ge=0)
    inr: float = Field(ge=0)

    # Medical history
    diabetes: BinaryFlag
    hypertension: BinaryFlag
    ckd: BinaryFlag
    stroke: BinaryFlag
    heart_failure: BinaryFlag
    copd: BinaryFlag
    cancer: BinaryFlag


class SurgicalPredictionResponse(BaseModel):
    icu_admission_probability: float
    icu_admission_prediction: bool
    risk_category: str
    predicted_length_of_stay_days: float
    mortality_probability: float
    mortality_high_risk: bool
    disclaimer: str