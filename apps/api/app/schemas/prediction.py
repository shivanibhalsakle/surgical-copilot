from pydantic import BaseModel, Field


class PreoperativePatient(BaseModel):
    age_group: int = Field(ge=18, le=90)
    sex: str
    asa_class: int = Field(ge=1, le=6)
    anesthesia_type: str
    procedure_code: str
    department: str | None = None
    emergency_operation: bool | None = None
    preoperative_hemoglobin: float | None = None
    preoperative_creatinine: float | None = None
    preoperative_albumin: float | None = None


class SurgicalRiskResponse(BaseModel):
    icu_admission_probability: float | None
    in_hospital_mortality_probability: float | None
    predicted_hospital_los_days: float | None
    predicted_icu_los_days: float | None
    resource_intensity: str
    explanation: list[str]
    disclaimer: str
