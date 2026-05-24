import { AnuncioDetail } from "@/components/anuncios/AnuncioDetail"
import { AnuncioNotFound } from "@/components/anuncios/AnuncioNotFound"
import { VitrineShell } from "@/components/layout/VitrineShell"
import { StateLayout } from "@/components/states/StateLayout"
import { VitrineLoadError } from "@/components/states/VitrineLoadError"
import { VitrineUnavailable } from "@/components/states/VitrineUnavailable"
import { getVitrineForRequest } from "@/src/lib/get-vitrine"
import {
  buildAnuncioMetadata,
  getDefaultMetadata,
} from "@/src/lib/metadata"
import {
  getAnuncioForLoja,
  getAnunciosForLoja,
  type VitrineAnuncio,
  type VitrineLoja,
} from "@/src/lib/vitrine-data"
import { VitrineDomainError } from "@/src/lib/vitrine-domain"
import { VitrineNotFoundError } from "@/src/services/vitrineMockService"

interface AnuncioPageProps {
  params: Promise<{ id: string }>
}

type PageState = "success" | "ad_not_found" | "loja_not_found" | "error"

export async function generateMetadata({ params }: AnuncioPageProps) {
  try {
    const { id } = await params
    const vitrine = await getVitrineForRequest()
    const anuncio = await getAnuncioForLoja(vitrine.id, id)

    if (!anuncio) {
      return { title: { absolute: "Anúncio não encontrado" } }
    }

    return buildAnuncioMetadata(vitrine, anuncio)
  } catch {
    return getDefaultMetadata()
  }
}

async function loadAnuncioPage(id: string): Promise<{
  state: PageState
  vitrine?: VitrineLoja
  anuncio?: VitrineAnuncio
  todosAnuncios?: VitrineAnuncio[]
}> {
  try {
    const vitrine = await getVitrineForRequest()
    const todosAnuncios = await getAnunciosForLoja(vitrine.id)
    const anuncio = await getAnuncioForLoja(vitrine.id, id)

    if (!anuncio) {
      return { state: "ad_not_found", vitrine, todosAnuncios }
    }

    return { state: "success", vitrine, anuncio, todosAnuncios }
  } catch (error) {
    if (error instanceof VitrineNotFoundError) {
      return { state: "loja_not_found" }
    }
    if (error instanceof VitrineDomainError) {
      return { state: "error" }
    }
    return { state: "error" }
  }
}

export default async function AnuncioPage({ params }: AnuncioPageProps) {
  const { id } = await params
  const { state, vitrine, anuncio, todosAnuncios } = await loadAnuncioPage(id)

  if (state === "loja_not_found") {
    return (
      <StateLayout loja={null} withShell={false}>
        <VitrineUnavailable />
      </StateLayout>
    )
  }

  if (state === "error") {
    return (
      <StateLayout loja={null} withShell={false}>
        <VitrineLoadError />
      </StateLayout>
    )
  }

  if (state === "ad_not_found") {
    if (vitrine) {
      return (
        <VitrineShell loja={vitrine}>
          <AnuncioNotFound />
        </VitrineShell>
      )
    }
    return <AnuncioNotFound />
  }

  if (!vitrine || !anuncio || !todosAnuncios) {
    return (
      <StateLayout loja={vitrine ?? null} withShell={Boolean(vitrine)}>
        <VitrineLoadError />
      </StateLayout>
    )
  }

  return (
    <VitrineShell loja={vitrine}>
      <AnuncioDetail
        anuncio={anuncio}
        loja={vitrine}
        todosAnuncios={todosAnuncios}
      />
    </VitrineShell>
  )
}
