import { getVitrineForRequest } from "@/src/lib/get-vitrine"
import { VitrineDomainError } from "@/src/lib/vitrine-domain"
import {
  VitrineNotFoundError,
  VitrineUnavailableError,
} from "@/src/services/vitrineService"
import type { VitrineLoja } from "@/src/types/vitrine"

export type VitrinePageState = "success" | "not_found" | "error"

export async function loadVitrinePage(): Promise<{
  state: VitrinePageState
  vitrine?: VitrineLoja
}> {
  try {
    const vitrine = await getVitrineForRequest()
    return { state: "success", vitrine }
  } catch (error) {
    if (error instanceof VitrineNotFoundError) {
      return { state: "not_found" }
    }

    if (
      error instanceof VitrineDomainError ||
      error instanceof VitrineUnavailableError
    ) {
      return { state: "error" }
    }

    return { state: "error" }
  }
}
