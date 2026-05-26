import { VitrineShell } from "@/components/layout/VitrineShell"
import { StateLayout } from "@/components/states/StateLayout"
import { VitrineLoadError } from "@/components/states/VitrineLoadError"
import { VitrineUnavailable } from "@/components/states/VitrineUnavailable"
import { VitrineHome } from "@/components/vitrine/VitrineHome"
import { getVitrineForRequest } from "@/src/lib/get-vitrine"
import {
  buildHomeMetadata,
  getDefaultMetadata,
} from "@/src/lib/metadata"
import {
  getAnunciosForLoja,
  type VitrineLoja,
} from "@/src/lib/vitrine-data"
import { VitrineDomainError } from "@/src/lib/vitrine-domain"
import { VitrineNotFoundError } from "@/src/services/vitrineService"

type PageState = "success" | "not_found" | "error"

export async function generateMetadata() {
  try {
    const vitrine = await getVitrineForRequest()
    return buildHomeMetadata(vitrine)
  } catch {
    return getDefaultMetadata()
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

    if (error instanceof VitrineDomainError) {
      return { state: "error" }
    }

    return { state: "error" }
  }
}

export default async function HomePage() {
  const { state, vitrine } = await loadVitrinePage()

  if (state === "not_found") {
    return (
      <StateLayout loja={null} withShell={false}>
        <VitrineUnavailable />
      </StateLayout>
    )
  }

  if (state === "error" || !vitrine) {
    return (
      <StateLayout loja={null} withShell={false}>
        <VitrineLoadError />
      </StateLayout>
    )
  }

  const anuncios = await getAnunciosForLoja(vitrine.id)

  return (
    <VitrineShell loja={vitrine}>
      <VitrineHome loja={vitrine} anuncios={anuncios} />
    </VitrineShell>
  )
}
