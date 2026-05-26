import { AnuncioCard } from "@/components/anuncios/AnuncioCard"
import type { VitrineAnuncio } from "@/src/types/anuncio"
import type { VitrineLoja } from "@/src/types/vitrine"
import { getLojaDisplayName } from "@/src/utils/loja"

interface AnunciosRelacionadosProps {
  anuncios: VitrineAnuncio[]
  loja: VitrineLoja
}

export function AnunciosRelacionados({ anuncios, loja }: AnunciosRelacionadosProps) {
  if (anuncios.length === 0) return null

  const displayName = getLojaDisplayName(loja)

  return (
    <section
      className="anuncios-relacionados"
      aria-labelledby="anuncios-relacionados-title"
    >
      <h2 id="anuncios-relacionados-title" className="anuncios-relacionados__title">
        Outros veículos da loja
      </h2>
      <div className="anuncios-relacionados__grid">
        {anuncios.map((anuncio) => (
          <AnuncioCard
            key={anuncio.id}
            anuncio={anuncio}
            nomeDaLoja={displayName}
            whatsapp={loja.whatsapp}
          />
        ))}
      </div>
    </section>
  )
}
