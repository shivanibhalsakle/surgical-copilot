from fastapi import APIRouter

from apps.api.app.services.reference_service import (
    get_reference_values,
)

router = APIRouter(tags=["reference"])


@router.get("/reference-values")
def reference_values() -> dict[str, list[str]]:
    return get_reference_values()