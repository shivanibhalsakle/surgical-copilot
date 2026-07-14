from pathlib import Path

import pandas as pd


def load_operations(path: Path) -> pd.DataFrame:
    if not path.exists():
        raise FileNotFoundError(
            f"Operations file not found at {path}. "
            "Download INSPIRE through your authorized PhysioNet account."
        )
    return pd.read_csv(path)
