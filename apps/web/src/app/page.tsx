"use client";

import { FormEvent, useState } from "react";
import {
  predictSurgicalRisk,
  SurgicalPatientInput,
  SurgicalPredictionResponse,
} from "../lib/api";

type FormFieldValue = string | number;

type SurgicalFormState = {
  name: string;
  age: string;
  sex: string;
  height: string;
  weight: string;
  race: string;
  asa: string;
  department: string;
  antype: string;
  emop: number;
  icd10_pcs: string;

  heart_rate: string;
  systolic_bp: string;
  diastolic_bp: string;
  respiratory_rate: string;
  oxygen_saturation: string;
  temperature: string;

  hemoglobin: string;
  wbc: string;
  platelets: string;
  creatinine: string;
  glucose: string;
  sodium: string;
  potassium: string;
  albumin: string;
  inr: string;

  diabetes: number;
  hypertension: number;
  ckd: number;
  stroke: number;
  heart_failure: number;
  copd: number;
  cancer: number;
};

const initialForm: SurgicalFormState = {
  name: "",
  age: "",
  sex: "",
  height: "",
  weight: "",
  race: "",
  asa: "",
  department: "",
  antype: "",
  emop: 0,
  icd10_pcs: "",

  heart_rate: "",
  systolic_bp: "",
  diastolic_bp: "",
  respiratory_rate: "",
  oxygen_saturation: "",
  temperature: "",

  hemoglobin: "",
  wbc: "",
  platelets: "",
  creatinine: "",
  glucose: "",
  sodium: "",
  potassium: "",
  albumin: "",
  inr: "",

  diabetes: 0,
  hypertension: 0,
  ckd: 0,
  stroke: 0,
  heart_failure: 0,
  copd: 0,
  cancer: 0,
};

const raceOptions = [
  "Asian",
  "Black",
  "White",
  "Hispanic",
  "Other",
];

const departmentOptions = [
  "General surgery",
  "Orthopedic surgery",
  "Neurosurgery",
  "Cardiothoracic surgery",
  "Vascular surgery",
  "Urology",
  "Gynecology",
  "Otolaryngology",
  "Plastic surgery",
];

const anesthesiaOptions = [
  "General",
  "Regional",
  "Spinal",
  "Epidural",
  "Monitored anesthesia care",
];

const DEFAULT_ICD10_PCS = "08DJ3";


const healthyValues = {
  heart_rate: "72",
  systolic_bp: "120",
  diastolic_bp: "80",
  respiratory_rate: "16",
  oxygen_saturation: "98",
  temperature: "36.8",

  hemoglobin: "14",
  wbc: "7",
  platelets: "250",
  creatinine: "0.9",
  glucose: "90",
  sodium: "140",
  potassium: "4.2",
  albumin: "4.2",
  inr: "1",
} satisfies Partial<SurgicalFormState>;

export default function Home() {
  const [form, setForm] =
    useState<SurgicalFormState>(initialForm);

  const [result, setResult] =
    useState<SurgicalPredictionResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    field: keyof SurgicalFormState,
    value: FormFieldValue,
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function setHealthyValue(
    field: keyof typeof healthyValues,
  ) {
    updateField(field, healthyValues[field]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const patientPayload: SurgicalPatientInput = {
        age: Number(form.age),
        sex: form.sex,
        height: Number(form.height),
        weight: Number(form.weight),
        race: form.race,
        asa: Number(form.asa),
        department: form.department,
        antype: form.antype,
        emop: form.emop,
        icd10_pcs: DEFAULT_ICD10_PCS,

        heart_rate: Number(form.heart_rate),
        systolic_bp: Number(form.systolic_bp),
        diastolic_bp: Number(form.diastolic_bp),
        respiratory_rate: Number(form.respiratory_rate),
        oxygen_saturation: Number(form.oxygen_saturation),
        temperature: Number(form.temperature),

        hemoglobin: Number(form.hemoglobin),
        wbc: Number(form.wbc),
        platelets: Number(form.platelets),
        creatinine: Number(form.creatinine),
        glucose: Number(form.glucose),
        sodium: Number(form.sodium),
        potassium: Number(form.potassium),
        albumin: Number(form.albumin),
        inr: Number(form.inr),

        diabetes: form.diabetes,
        hypertension: form.hypertension,
        ckd: form.ckd,
        stroke: form.stroke,
        heart_failure: form.heart_failure,
        copd: form.copd,
        cancer: form.cancer,
      };

      const prediction = await predictSurgicalRisk(patientPayload);
      setResult(prediction);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Prediction request failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            INSPIRE Surgical Copilot
          </h1>

          <p className="mt-2 text-slate-600">
            Enter preoperative patient information to estimate
            surgical risk.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-xl bg-white p-6 shadow"
        >
          <FormSection title="Patient details">
            <TextInput
              label="Patient name"
              value={form.name}
              onChange={(value) => updateField("name", value)}
            />

            <NumberInput
              label="Age"
              value={form.age}
              onChange={(value) => updateField("age", value)}
            />

            <SelectInput
              label="Sex"
              value={form.sex}
              placeholder="Select sex"
              options={["M", "F"]}
              onChange={(value) => updateField("sex", value)}
            />

            <NumberInput
              label="Height (cm)"
              value={form.height}
              onChange={(value) => updateField("height", value)}
            />

            <NumberInput
              label="Weight (kg)"
              value={form.weight}
              onChange={(value) => updateField("weight", value)}
            />

            <SelectInput
              label="Race"
              value={form.race}
              placeholder="Select race"
              options={raceOptions}
              onChange={(value) => updateField("race", value)}
            />
          </FormSection>

          <FormSection title="Surgical details">
            <SelectInput
              label="ASA class"
              value={form.asa}
              placeholder="Select ASA class"
              options={["1", "2", "3", "4", "5"]}
              onChange={(value) => updateField("asa", value)}
            />

            <SelectInput
              label="Department"
              value={form.department}
              placeholder="Select department"
              options={departmentOptions}
              onChange={(value) => updateField("department", value)}
            />

            <SelectInput
              label="Anesthesia type"
              value={form.antype}
              placeholder="Select anesthesia type"
              options={anesthesiaOptions}
              onChange={(value) => updateField("antype", value)}
            />

            <BinarySelect
              label="Emergency operation"
              value={form.emop}
              onChange={(value) =>
                updateField("emop", Number(value))
              }
            />


          </FormSection>

          <FormSection title="Vital signs">
            <HealthyNumberInput
              label="Heart rate"
              value={form.heart_rate}
              healthyValue={healthyValues.heart_rate}
              onChange={(value) =>
                updateField("heart_rate", value)
              }
              onHealthy={() => setHealthyValue("heart_rate")}
            />

            <HealthyNumberInput
              label="Systolic BP"
              value={form.systolic_bp}
              healthyValue={healthyValues.systolic_bp}
              onChange={(value) =>
                updateField("systolic_bp", value)
              }
              onHealthy={() => setHealthyValue("systolic_bp")}
            />

            <HealthyNumberInput
              label="Diastolic BP"
              value={form.diastolic_bp}
              healthyValue={healthyValues.diastolic_bp}
              onChange={(value) =>
                updateField("diastolic_bp", value)
              }
              onHealthy={() => setHealthyValue("diastolic_bp")}
            />

            <HealthyNumberInput
              label="Respiratory rate"
              value={form.respiratory_rate}
              healthyValue={healthyValues.respiratory_rate}
              onChange={(value) =>
                updateField("respiratory_rate", value)
              }
              onHealthy={() =>
                setHealthyValue("respiratory_rate")
              }
            />

            <HealthyNumberInput
              label="Oxygen saturation"
              value={form.oxygen_saturation}
              healthyValue={healthyValues.oxygen_saturation}
              onChange={(value) =>
                updateField("oxygen_saturation", value)
              }
              onHealthy={() =>
                setHealthyValue("oxygen_saturation")
              }
            />

            <HealthyNumberInput
              label="Temperature"
              value={form.temperature}
              healthyValue={healthyValues.temperature}
              step="0.1"
              onChange={(value) =>
                updateField("temperature", value)
              }
              onHealthy={() => setHealthyValue("temperature")}
            />
          </FormSection>

          <FormSection title="Laboratory values">
            {[
              ["hemoglobin", "Hemoglobin"],
              ["wbc", "WBC"],
              ["platelets", "Platelets"],
              ["creatinine", "Creatinine"],
              ["glucose", "Glucose"],
              ["sodium", "Sodium"],
              ["potassium", "Potassium"],
              ["albumin", "Albumin"],
              ["inr", "INR"],
            ].map(([field, label]) => {
              const typedField =
                field as keyof typeof healthyValues;

              return (
                <HealthyNumberInput
                  key={field}
                  label={label}
                  value={form[typedField]}
                  healthyValue={healthyValues[typedField]}
                  step="0.1"
                  onChange={(value) =>
                    updateField(typedField, value)
                  }
                  onHealthy={() => setHealthyValue(typedField)}
                />
              );
            })}
          </FormSection>

          <FormSection title="Medical history">
            {[
              ["diabetes", "Diabetes"],
              ["hypertension", "Hypertension"],
              ["ckd", "Chronic kidney disease"],
              ["stroke", "Stroke"],
              ["heart_failure", "Heart failure"],
              ["copd", "COPD"],
              ["cancer", "Cancer"],
            ].map(([field, label]) => (
              <BinarySelect
                key={field}
                label={label}
                value={
                  form[
                  field as keyof SurgicalPatientInput
                  ] as number
                }
                onChange={(value) =>
                  updateField(
                    field as keyof SurgicalPatientInput,
                    value,
                  )
                }
              />
            ))}
          </FormSection>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Calculating..." : "Calculate risk"}
          </button>
        </form>

        {error && (
          <div className="mt-6 rounded-lg bg-red-100 p-4 text-red-800">
            {error}
          </div>
        )}

        {result && (
          <section className="mt-8 rounded-xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold text-slate-900">
              Prediction results
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <ResultCard
                label="Risk category"
                value={result.risk_category}
              />

              <ResultCard
                label="ICU admission probability"
                value={`${(
                  result.icu_admission_probability * 100
                ).toFixed(1)}%`}
              />

              <ResultCard
                label="Predicted length of stay"
                value={`${result.predicted_length_of_stay_days.toFixed(
                  1,
                )} days`}
              />

              <ResultCard
                label="Mortality probability"
                value={`${(
                  result.mortality_probability * 100
                ).toFixed(1)}%`}
              />

              <ResultCard
                label="ICU admission prediction"
                value={
                  result.icu_admission_prediction ? "Yes" : "No"
                }
              />

              <ResultCard
                label="High mortality risk"
                value={result.mortality_high_risk ? "Yes" : "No"}
              />
            </div>

            <p className="mt-6 text-sm text-slate-500">
              {result.disclaimer}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        {title}
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </section>
  );
}

function TextInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>

      <input
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2"
      />
    </label>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  step = "any",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>

      <input
        required
        type="number"
        step={step}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="rounded-lg border border-slate-300 px-3 py-2"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  options,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>

      <select
        required
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="rounded-lg border border-slate-300 bg-white px-3 py-2"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function HealthyNumberInput({
  label,
  value,
  healthyValue,
  onChange,
  onHealthy,
  step = "any",
}: {
  label: string;
  value: string;
  healthyValue: string;
  onChange: (value: string) => void;
  onHealthy: () => void;
  step?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>

        <button
          type="button"
          onClick={onHealthy}
          title={`Use reference value: ${healthyValue}`}
          className="rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
        >
          Healthy
        </button>
      </div>

      <input
        required
        type="number"
        step={step}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="rounded-lg border border-slate-300 px-3 py-2"
      />
    </div>
  );
}

function BinarySelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2"
      >
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>
    </label>
  );
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}