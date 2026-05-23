import type { CSSProperties } from "react"

import { resolveVitrinePrimaryColor } from "@/src/lib/vitrine-color"
import type { VitrineLoja } from "@/src/types/vitrine"

interface VitrineHomeProps {
  vitrine: VitrineLoja
}

function formatLocation(cidade?: string | null, estado?: string | null): string | null {
  const parts = [cidade, estado].filter(Boolean)
  return parts.length > 0 ? parts.join(" - ") : null
}

function getInitials(nome: string): string {
  return nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function VitrineHome({ vitrine }: VitrineHomeProps) {
  const primaryColor = resolveVitrinePrimaryColor(vitrine.corPrincipal)
  const location = formatLocation(vitrine.cidade, vitrine.estado)
  const whatsappHref = vitrine.whatsapp
    ? `https://wa.me/${vitrine.whatsapp.replace(/\D/g, "")}`
    : null

  return (
    <div
      className="vitrine"
      style={{ "--vitrine-primary": primaryColor } as CSSProperties}
    >
      <header className="vitrine-banner">
        {vitrine.bannerUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vitrine.bannerUrl}
            alt={`Banner da loja ${vitrine.nome}`}
            className="vitrine-banner__image"
          />
        ) : (
          <div className="vitrine-banner__placeholder" aria-hidden />
        )}
        <div className="vitrine-banner__overlay" />
      </header>

      <main className="vitrine-main">
        <section className="vitrine-store">
          <div className="vitrine-store__logo">
            {vitrine.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={vitrine.logoUrl} alt={`Logo ${vitrine.nome}`} />
            ) : (
              <span className="vitrine-store__logo-placeholder" aria-hidden>
                {getInitials(vitrine.nome)}
              </span>
            )}
          </div>

          <div className="vitrine-store__info">
            <h1>{vitrine.nome}</h1>
            {vitrine.descricao ? <p className="vitrine-store__description">{vitrine.descricao}</p> : null}
            {location ? <p className="vitrine-store__location">{location}</p> : null}
            <p className="vitrine-store__url">
              <a href={vitrine.urlPublica} target="_blank" rel="noopener noreferrer">
                {vitrine.urlPublica}
              </a>
            </p>
          </div>
        </section>

        {(vitrine.telefone || vitrine.whatsapp || vitrine.email) && (
          <section className="vitrine-contact" aria-label="Contato da loja">
            <h2>Contato</h2>
            <ul>
              {vitrine.telefone ? <li>Telefone: {vitrine.telefone}</li> : null}
              {vitrine.whatsapp ? (
                <li>
                  WhatsApp:{" "}
                  {whatsappHref ? (
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                      {vitrine.whatsapp}
                    </a>
                  ) : (
                    vitrine.whatsapp
                  )}
                </li>
              ) : null}
              {vitrine.email ? (
                <li>
                  E-mail:{" "}
                  <a href={`mailto:${vitrine.email}`}>{vitrine.email}</a>
                </li>
              ) : null}
            </ul>
          </section>
        )}

        <section className="vitrine-vehicles" aria-labelledby="vitrine-vehicles-title">
          <h2 id="vitrine-vehicles-title">Veículos</h2>
          <div className="vitrine-vehicles__placeholder">
            <p>Em breve você verá os veículos disponíveis desta loja.</p>
          </div>
        </section>
      </main>

      <footer className="vitrine-footer">
        <p>
          Vitrine digital ·{" "}
          <a href="https://gearsales.com.br" target="_blank" rel="noopener noreferrer">
            Gear Sales
          </a>
        </p>
      </footer>
    </div>
  )
}
