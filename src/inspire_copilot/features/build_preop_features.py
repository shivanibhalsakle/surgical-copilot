import pandas as pd


def build_preoperative_features(operations: pd.DataFrame) -> pd.DataFrame:
    """Create an operation-level feature table using only preoperative information.

    Preventing leakage is essential: postoperative ICU times, mortality, discharge
    times, and intraoperative measurements must not enter the feature matrix.
    """
    raise NotImplementedError("Implement after schema inspection and target definition.")
