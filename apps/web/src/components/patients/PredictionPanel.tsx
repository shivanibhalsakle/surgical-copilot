const predictionCards = [
    {
        title: "ICU Admission Risk",
        value: "—",
        description: "Probability of ICU admission after surgery",
    },
    {
        title: "Predicted Length of Stay",
        value: "—",
        description: "Estimated hospital stay after surgery",
    },
    {
        title: "Mortality Risk",
        value: "—",
        description: "Estimated in-hospital mortality probability",
    },
];

export default function PredictionPanel() {
    return (
        <section className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Predictions
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Model results for the selected patient.
                    </p>
                </div>

                <span className="text-xs text-slate-500">
                    Model: XGBoost v1.0
                </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {predictionCards.map((card) => (
                    <article
                        key={card.title}
                        className="rounded-lg border border-slate-200 p-5 text-center"
                    >
                        <h3 className="text-sm font-semibold text-slate-800">
                            {card.title}
                        </h3>

                        <p className="mt-5 text-4xl font-semibold text-blue-700">
                            {card.value}
                        </p>

                        <p className="mt-4 text-xs leading-5 text-slate-500">
                            {card.description}
                        </p>
                    </article>
                ))}
            </div>

            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm font-semibold text-blue-900">
                    These predictions are not a substitute for clinical judgment.
                </p>

                <p className="mt-1 text-sm leading-6 text-blue-800">
                    They are intended for research and educational purposes only and
                    must not be used independently for clinical decision-making.
                </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <EmptyState
                    title="Key Risk Factors"
                    message="Risk factor explanations will be available in a future model version."
                />

                <EmptyState
                    title="Contributors to Mortality Risk"
                    message="Feature contributions will be available in a future model version."
                />
            </div>
        </section>
    );
}

type EmptyStateProps = {
    title: string;
    message: string;
};

function EmptyState({ title, message }: EmptyStateProps) {
    return (
        <article className="rounded-lg border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-800">{title}</h3>

            <div className="mt-4 flex min-h-40 items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <p className="max-w-xs text-sm leading-6 text-slate-500">
                    {message}
                </p>
            </div>
        </article>
    );
}