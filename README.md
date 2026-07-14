# INSPIRE Surgical Copilot

A research prototype for preoperative risk stratification and hospital resource planning using the INSPIRE perioperative dataset.

## MVP goals

Given information available before surgery, the application will estimate:

- Probability of postoperative ICU admission
- Expected hospital length of stay
- Expected ICU length of stay, when applicable
- In-hospital mortality risk
- Likely postoperative resource intensity

The application will also show the factors that most influenced each prediction.

> This project is for research and educational use only. It is not a medical device and must not be used for patient care.

## Repository structure

- `apps/api`: FastAPI prediction service
- `apps/web`: Next.js frontend
- `src/inspire_copilot`: data preparation, feature engineering, training, and evaluation
- `notebooks`: exploratory analysis only
- `data`: local data directories; raw data is never committed
- `models`: locally generated model artifacts; not committed
- `tests`: automated tests
- `docs`: product, data, and modeling documentation

## Local backend setup

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements-dev.txt
```

Run the API:

```bash
uvicorn apps.api.app.main:app --reload
```

Open:

- API: http://127.0.0.1:8000
- API docs: http://127.0.0.1:8000/docs

## Data access

INSPIRE is restricted-access PhysioNet data. Store downloaded files under `data/raw/inspire/`. Do not commit, upload, redistribute, or expose the dataset.
