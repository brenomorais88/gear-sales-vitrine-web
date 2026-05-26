"use client"

import { AnuncioCard } from "@/components/anuncios/AnuncioCard"
import {
  CatalogEmptyFiltros,
  CatalogEmptyLoja,
} from "@/components/states"
import { HomeFilters } from "@/components/home/HomeFilters"
import { useAnunciosCatalogo } from "@/src/hooks/useAnunciosCatalogo"
import {
  buildLojaWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/src/lib/whatsapp"
import type { VitrineAnuncio } from "@/src/types/anuncio"
import type { VitrineLoja } from "@/src/types/vitrine"
import { getLojaDisplayName } from "@/src/utils/loja"

interface HomeAnunciosGridProps {
  loja: VitrineLoja
  anuncios: VitrineAnuncio[]
}

export function HomeAnunciosGrid({ loja, anuncios }: HomeAnunciosGridProps) {
  const displayName = getLojaDisplayName(loja)
  const {
    disponiveis,
    filtrados,
    filtros,
    ordenacao,
    filtrosAtivos,
    updateFiltro,
    setOrdenacao,
    limparFiltros,
  } = useAnunciosCatalogo(anuncios)

  const whatsappHref = loja.whatsapp
    ? buildWhatsAppUrl(loja.whatsapp, buildLojaWhatsAppMessage(displayName))
    : null

  if (disponiveis.length === 0) {
    return (
      <section
        id="veiculos"
        className="home-catalog"
        aria-labelledby="home-catalog-title"
      >
        <h2 id="home-catalog-title" className="home-catalog__title">
          Veículos disponíveis
        </h2>
        <CatalogEmptyLoja
          action={
            whatsappHref ? (
              <a
                href={whatsappHref}
                className="vitrine-btn vitrine-btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            ) : undefined
          }
        />
      </section>
    )
  }

  return (
    <section
      id="veiculos"
      className="home-catalog"
      aria-labelledby="home-catalog-title"
    >
      <h2 id="home-catalog-title" className="home-catalog__title">
        Veículos disponíveis
      </h2>

      <HomeFilters
        anuncios={anuncios}
        filtros={filtros}
        ordenacao={ordenacao}
        filtrosAtivos={filtrosAtivos}
        totalFiltrados={filtrados.length}
        onFiltroChange={updateFiltro}
        onOrdenacaoChange={setOrdenacao}
        onLimpar={limparFiltros}
      />

      {filtrados.length === 0 ? (
        <CatalogEmptyFiltros onLimpar={limparFiltros} />
      ) : (
        <div className="home-grid">
          {filtrados.map((anuncio) => (
            <AnuncioCard
              key={anuncio.id}
              anuncio={anuncio}
              nomeDaLoja={displayName}
              whatsapp={loja.whatsapp}
            />
          ))}
        </div>
      )}
    </section>
  )
}
