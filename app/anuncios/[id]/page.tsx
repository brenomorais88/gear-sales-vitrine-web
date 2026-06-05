import type { Metadata } from "next"
import Link from "next/link"
import { VitrineLayout } from "@/components/vitrine/VitrineLayout"
import { VitrineAnuncioDetalhe } from "@/components/vitrine/VitrineAnuncioDetalheView"
import { getAnuncioForRequest } from "@/src/lib/get-anuncio-for-request"
import { getVitrineForRequest } from "@/src/lib/get-vitrine"
import { getVitrineApiDominio } from "@/src/lib/vitrine-domain"
import {
  buildAnuncioSeoMetadata,
  buildVitrineSeoFallbackMetadata,
  getRequestOrigin,
} from "@/src/lib/vitrine-seo"
import { VitrineAnunciosError } from "@/src/services/vitrineAnunciosService"

interface AnuncioPageParams {
  id: string
}

export async function generateMetadata(props: {
  params: Promise<AnuncioPageParams>
}): Promise<Metadata> {
  try {
    const params = await props.params
    const [{ vitrine, anuncio }, requestOrigin] = await Promise.all([
      getAnuncioForRequest(params.id),
      getRequestOrigin(),
    ])

    return buildAnuncioSeoMetadata(vitrine, anuncio, requestOrigin)
  } catch {
    return buildVitrineSeoFallbackMetadata("anuncio")
  }
}

function AnuncioNotFoundPage() {
  return (
    <div className="vitrine-state">
      <div className="vitrine-state__card">
        <h1>Anúncio não encontrado</h1>
        <p>
          Este anúncio não está mais disponível ou não pertence a esta vitrine.
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <Link href="/#estoque" className="vitrine-state__link">
            Voltar para o estoque
          </Link>
        </div>
      </div>
    </div>
  )
}

function AnuncioErrorPage() {
  return (
    <div className="vitrine-state">
      <div className="vitrine-state__card">
        <h1>Não foi possível carregar o anúncio</h1>
        <p>Ocorreu um erro ao tentar exibir os detalhes. Tente novamente.</p>
        <div style={{ marginTop: "1.5rem" }}>
          <Link href="/#estoque" className="vitrine-state__link">
            Voltar para o estoque
          </Link>
        </div>
      </div>
    </div>
  )
}

export default async function AnuncioPage(props: {
  params: Promise<AnuncioPageParams>
}) {
  const params = await props.params

  let vitrine
  let anuncio
  let notFound = false
  let hasError = false

  try {
    const result = await getAnuncioForRequest(params.id)
    vitrine = result.vitrine
    anuncio = result.anuncio
  } catch (error) {
    if (
      error instanceof VitrineAnunciosError &&
      error.message.includes("não encontrado")
    ) {
      try {
        vitrine = await getVitrineForRequest()
        notFound = true
      } catch {
        hasError = true
      }
    } else {
      hasError = true
    }
  }

  if (hasError) {
    return <AnuncioErrorPage />
  }

  if (notFound) {
    return (
      <VitrineLayout vitrine={vitrine!}>
        <AnuncioNotFoundPage />
      </VitrineLayout>
    )
  }

  if (!anuncio) {
    return <AnuncioErrorPage />
  }

  return (
    <VitrineLayout vitrine={vitrine!} fullWidth>
      <VitrineAnuncioDetalhe
        anuncio={anuncio}
        dominio={getVitrineApiDominio(vitrine!)}
      />
    </VitrineLayout>
  )
}
