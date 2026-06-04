import type { Metadata } from "next"

import { VitrineError } from "@/components/vitrine/VitrineError"
import { VitrineHome } from "@/components/vitrine/VitrineHome"
import { VitrineNotFound } from "@/components/vitrine/VitrineNotFound"
import { VitrineLayout } from "@/components/vitrine/VitrineLayout"
import { getVitrineForRequest } from "@/src/lib/get-vitrine"
import { VitrineDomainError } from "@/src/lib/vitrine-domain"
import {
  VitrineNotFoundError,
  VitrineUnavailableError,
} from "@/src/services/vitrineService"
import type { VitrineLoja } from "@/src/types/vitrine"

type PageState = "success" | "not_found" | "error"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const vitrine = await getVitrineForRequest()

    return {
      title: vitrine.nome,
      description:
        vitrine.descricao?.trim() ||
        `Vitrine pública da loja ${vitrine.nome} no Gear Sales.`,
    }
  } catch {
    return {
      title: "Gear Sales Vitrine",
      description: "Vitrine pública de lojas no Gear Sales.",
    }
  }
}

async function loadVitrinePage(): Promise<{
  state: PageState
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

export default async function HomePage() {
  const { state, vitrine } = await loadVitrinePage()

  if (state === "not_found") {
    return <VitrineNotFound />
  }

  if (state === "error" || !vitrine) {
    return <VitrineError />
  }

  return (
    <VitrineLayout vitrine={vitrine}>
      <VitrineHome vitrine={vitrine} />
    </VitrineLayout>
  )
}
