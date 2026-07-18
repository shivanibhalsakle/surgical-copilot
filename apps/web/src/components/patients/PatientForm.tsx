"use client";

import { useState } from "react";

export default function PatientForm() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState<number | null>(null);
    const [bmiError, setBmiError] = useState("");

    function calculateBmi() {
        const weightKg = Number(weight);
        const heightCm = Number(height);

        if (
            !Number.isFinite(weightKg) ||
            !Number.isFinite(heightCm) ||
            weightKg <= 0 ||
            heightCm <= 0
        ) {
            setBmi(null);
            setBmiError("Enter a valid weight and height.");
            return;
        }

        const heightMetres = heightCm / 100;
        const calculatedBmi = weightKg / heightMetres ** 2;

        setBmi(Number(calculatedBmi.toFixed(1)));
        setBmiError("");
    }
    return (
        <section className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="border-b border-slate-200 pb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    Patient & Surgery Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Enter patient and surgical information to generate predictions.
                </p>
            </div>

            <div className="mt-6">
                <h3 className="text-sm font-semibold text-blue-700">
                    Patient Information
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField label="Patient Name" placeholder="Enter patient name" />
                    <FormField label="Patient ID" placeholder="Enter patient ID" />
                    <FormField label="Age (years)" placeholder="Enter age" />

                    <SelectField
                        label="Sex"
                        options={["Select sex", "Male", "Female"]}
                    />

                    <FormField
                        label="Weight (kg)"
                        placeholder="Enter weight"
                        type="number"
                        value={weight}
                        onChange={(value) => {
                            setWeight(value);
                            setBmi(null);
                        }}
                    />

                    <FormField
                        label="Height (cm)"
                        placeholder="Enter height"
                        type="number"
                        value={height}
                        onChange={(value) => {
                            setHeight(value);
                            setBmi(null);
                        }}
                    />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            BMI (kg/m²)
                        </label>

                        <div className="flex h-11 items-center rounded-md border border-slate-300 bg-slate-50 px-3 text-sm">
                            {bmi !== null ? (
                                <span className="font-semibold text-slate-900">{bmi}</span>
                            ) : (
                                <span className="text-slate-500">Not calculated</span>
                            )}
                        </div>

                        {bmiError && (
                            <p className="mt-2 text-sm text-red-600">{bmiError}</p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={calculateBmi}
                        className="h-11 rounded-md border border-blue-600 px-4 text-sm font-medium text-blue-700 hover:bg-blue-50 sm:mt-7"
                    >
                        Calculate BMI
                    </button>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-semibold text-blue-700">
                        Clinical & Surgical Information
                    </h3>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <SelectField
                            label="Emergency Surgery"
                            options={["Select option", "No", "Yes"]}
                        />

                        <SelectField
                            label="Anesthesia Type"
                            options={["Select anesthesia type"]}
                        />

                        <SelectField
                            label="Procedure Code"
                            options={["Select procedure code"]}
                        />

                        <SelectField
                            label="Department"
                            options={["Select department"]}
                        />

                        <SelectField
                            label="ASA Score"
                            options={["Select ASA score", "1", "2", "3", "4", "5"]}
                        />

                        <SelectField label="Race" options={["Select race"]} />
                    </div>
                </div>

                <button
                    type="button"
                    className="mt-6 w-full rounded-md bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                >
                    Generate Predictions
                </button>
            </div>
        </section>
    );
}

type FormFieldProps = {
    label: string;
    placeholder: string;
    type?: "text" | "number";
    value?: string;
    onChange?: (value: string) => void;
};

function FormField({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
}: FormFieldProps) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
                placeholder={placeholder}
                className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
        </div>
    );
}

type SelectFieldProps = {
    label: string;
    options: string[];
};

function SelectField({ label, options }: SelectFieldProps) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
                {label}
            </label>

            <select className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100">
                {options.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}