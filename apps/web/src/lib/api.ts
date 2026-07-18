export type SurgicalPatientInput = {
    age: number;
    sex: string;
    height: number;
    weight: number;
    race: string;
    asa: number;
    department: string;
    antype: string;
    emop: number;
    icd10_pcs: string;

    heart_rate: number;
    systolic_bp: number;
    diastolic_bp: number;
    respiratory_rate: number;
    oxygen_saturation: number;
    temperature: number;

    hemoglobin: number;
    wbc: number;
    platelets: number;
    creatinine: number;
    glucose: number;
    sodium: number;
    potassium: number;
    albumin: number;
    inr: number;

    diabetes: number;
    hypertension: number;
    ckd: number;
    stroke: number;
    heart_failure: number;
    copd: number;
    cancer: number;
};

export type SurgicalPredictionResponse = {
    icu_admission_probability: number;
    icu_admission_prediction: boolean;
    risk_category: string;
    predicted_length_of_stay_days: number;
    mortality_probability: number;
    mortality_high_risk: boolean;
    disclaimer: string;
};

export async function predictSurgicalRisk(
    patient: SurgicalPatientInput,
): Promise<SurgicalPredictionResponse> {
    const response = await fetch(
        "http://127.0.0.1:8000/api/v1/predict",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patient),
        },
    );

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}