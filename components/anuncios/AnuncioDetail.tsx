import { AnuncioContactCard } from "@/components/anuncios/AnuncioContactCard"
import { AnuncioDescription } from "@/components/anuncios/AnuncioDescription"
import { AnuncioGallery } from "@/components/anuncios/AnuncioGallery"
import { AnuncioLojaCard } from "@/components/anuncios/AnuncioLojaCard"
import { AnuncioOpcionais } from "@/components/anuncios/AnuncioOpcionais"
import { AnunciosRelacionados } from "@/components/anuncios/AnunciosRelacionados"
import { AnuncioSpecs } from "@/components/anuncios/AnuncioSpecs"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { getAnunciosRelacionados } from "@/src/lib/anuncios-relacionados"
import type { VitrineAnuncio } from "@/src/types/anuncio"
import type { VitrineLoja } from "@/src/types/vitrine"
import { formatCurrency } from "@/src/utils/format"

interface AnuncioDetailProps {
  anuncio: VitrineAnuncio
  loja: VitrineLoja
  todosAnuncios: VitrineAnuncio[]
}

export function AnuncioDetail({
  anuncio,
  loja,
  todosAnuncios,
}: AnuncioDetailProps) {
  const relacionados = getAnunciosRelacionados(todosAnuncios, anuncio)

  return (
    <main className="vitrine-main anuncio-detail-page">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Anúncio" },
        ]}
      />

      <div className="anuncio-detail">
        <div className="anuncio-detail__main">
          <AnuncioGallery
            titulo={anuncio.titulo}
            imagemCapaUrl={anuncio.imagemCapaUrl}
            imagens={anuncio.imagens}
          />

          <header className="anuncio-detail__header">
            <h1 className="anuncio-detail__title">{anuncio.titulo}</h1>
            <p className="anuncio-detail__price anuncio-detail__price--mobile">
              {formatCurrency(anuncio.preco)}
            </p>
          </header>

          <AnuncioSpecs anuncio={anuncio} />
          <AnuncioDescription descricao={anuncio.descricao} />
          <AnuncioOpcionais opcionais={anuncio.opcionais} />
        </div>

        <aside className="anuncio-detail__aside">
          <AnuncioContactCard anuncio={anuncio} loja={loja} />
          <AnuncioLojaCard loja={loja} />
        </aside>
      </div>

      <AnunciosRelacionados anuncios={relacionados} loja={loja} />
    </main>
  )
}
