import type { VitrineLoja } from "@/src/types/vitrine"

interface SobrePaginaPublicaProps {
  loja: VitrineLoja
}

function normalizeUrlForDisplay(url: string): string {
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "")
}

/**
 * Card "Página pública" — mostra o endereço público da vitrine
 * (subdomínio e URL completa). Útil para o lojista compartilhar com clientes.
 */
export function SobrePaginaPublica({ loja }: SobrePaginaPublicaProps) {
  const endereco = loja.enderecoPaginaPublica?.trim()
  const urlPublica = loja.urlPublica?.trim()

  if (!endereco && !urlPublica) {
    return null
  }

  return (
    <section className="sobre-section" aria-labelledby="sobre-publica-title">
      <h2 id="sobre-publica-title" className="sobre-section__title">
        Página pública
      </h2>
      <ul className="sobre-contact__list">
        {endereco ? (
          <li>
            <span className="sobre-contact__label">Endereço</span>
            <span>{endereco}</span>
          </li>
        ) : null}
        {urlPublica ? (
          <li>
            <span className="sobre-contact__label">URL</span>
            <a
              href={urlPublica}
              target="_blank"
              rel="noopener noreferrer"
            >
              {normalizeUrlForDisplay(urlPublica)}
            </a>
          </li>
        ) : null}
      </ul>
    </section>
  )
}
