import { buildGoogleMapsDirectionsUrl } from "@/src/lib/maps"
import type { VitrineLoja } from "@/src/types/vitrine"
import {
  formatLojaEnderecoCompleto,
  getLojaEnderecoParaMapa,
  hasLojaLocalizacao,
} from "@/src/utils/loja"

interface SobreLocationProps {
  loja: VitrineLoja
}

export function SobreLocation({ loja }: SobreLocationProps) {
  if (!hasLojaLocalizacao(loja)) {
    return null
  }

  const enderecoExibicao = formatLojaEnderecoCompleto(loja)
  const enderecoMapa = getLojaEnderecoParaMapa(loja)
  const mapsHref = enderecoMapa
    ? buildGoogleMapsDirectionsUrl(enderecoMapa)
    : null

  return (
    <section className="sobre-section" aria-labelledby="sobre-location-title">
      <h2 id="sobre-location-title" className="sobre-section__title">
        Endereço
      </h2>

      {enderecoExibicao ? (
        <p className="sobre-location__address">{enderecoExibicao}</p>
      ) : null}

      {mapsHref ? (
        <a
          href={mapsHref}
          className="vitrine-btn vitrine-btn--outline sobre-location__maps-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Como chegar
        </a>
      ) : null}

      {/* Estrutura preparada para mapa embutido em versão futura */}
      <div
        className="sobre-location__map-placeholder"
        aria-hidden={!enderecoMapa}
        data-map-query={enderecoMapa ?? undefined}
      >
        <p>Mapa disponível em breve</p>
      </div>
    </section>
  )
}
