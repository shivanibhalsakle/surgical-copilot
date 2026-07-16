from pydantic import BaseModel, Field


class SurgicalPatientInput(BaseModel):
    age: int = Field(ge=18, le=120)
    sex: str
    weight: float = Field(gt=0)
    height: float = Field(gt=0)
    race: str
    asa: int = Field(ge=1, le=5)
    emop: int = Field(ge=0, le=1)
    department: str
    antype: str
    icd10_pcs: str


class SurgicalPredictionResponse(BaseModel):
    icu_admission_probability: float
    icu_admission_prediction: bool
    risk_category: str
    predicted_length_of_stay_days: float
    mortality_probability: float
    mortality_high_risk: bool
    disclaimer: str