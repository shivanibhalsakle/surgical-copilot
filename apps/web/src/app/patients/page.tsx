import PatientForm from "@/components/patients/PatientForm";
import PredictionPanel from "@/components/patients/PredictionPanel";

export default function PatientsPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-slate-900">
                    Surgical Copilot
                </h1>

                <p className="mt-1 text-sm text-slate-600">
                    AI-powered preoperative risk assessment
                </p>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <PatientForm />
                <PredictionPanel />
            </div>
        </div>
    );
}