import type { Metadata } from "next"
import Link from "next/link"
import { VitrineLayout } from "@/components/vitrine/VitrineLayout"
import { VitrineAnuncioDetalhe } from "@/components/vitrine/VitrineAnuncioDetalheView"
import { getVitrineForRequest } from "@/src/lib/get-vitrine"
import { getVitrineApiDominio } from "@/src/lib/vitrine-domain"
import { fetchVitrineAnuncioDetalhe } from "@/src/services/vitrineAnunciosService"
import { VitrineAnunciosError } from "@/src/services/vitrineAnunciosService"

interface AnuncioPageParams {
  id: string
}

export async function generateMetadata(props: {
  params: Promise<AnuncioPageParams>
}): Promise<Metadata> {
  try {
    const params = await props.params
    const vitrine = await getVitrineForRequest()
    const anuncio = await fetchVitrineAnuncioDetalhe(
      params.id,
      getVitrineApiDominio(vitrine)
    )

    return {
      title: `${anuncio.titulo} - ${vitrine.nome}`,
      description: anuncio.descricao
        ?.substring(0, 160)
        .trim() || `Veículo ${anuncio.marca.nome} ${anuncio.modelo.nome} na vitrine da ${vitrine.nome}`,
    }
  } catch {
    return {
      title: "Detalhes do Anúncio",
    }
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
    vitrine = await getVitrineForRequest()
  } catch {
    hasError = true
  }

  if (!hasError) {
    try {
      anuncio = await fetchVitrineAnuncioDetalhe(
        params.id,
        getVitrineApiDominio(vitrine!)
      )
    } catch (error) {
      if (
        error instanceof VitrineAnunciosError &&
        error.message.includes("não encontrado")
      ) {
        notFound = true
      } else {
        hasError = true
      }
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
    <VitrineLayout vitrine={vitrine!}>
      <VitrineAnuncioDetalhe anuncio={anuncio} />
    </VitrineLayout>
  )
}
