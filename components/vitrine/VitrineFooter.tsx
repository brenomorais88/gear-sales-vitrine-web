import type { CSSProperties } from "react"

import type { VitrineLoja } from "@/src/types/vitrine"
import { getVitrineTheme } from "@/src/lib/vitrine-theme"

interface VitrineFooterProps {
  vitrine: VitrineLoja
}

function formatLocation(cidade?: string | null, estado?: string | null): string | null {
  const parts = [cidade, estado].filter(Boolean)
  return parts.length > 0 ? parts.join(" - ") : null
}

export function VitrineFooter({ vitrine }: VitrineFooterProps) {
  const theme = getVitrineTheme(vitrine.corPrincipal)
  const location = formatLocation(vitrine.cidade, vitrine.estado)

  return (
    <footer
      className="vitrine-footer-custom"
      style={
        {
          "--vitrine-primary": theme.primaryColor,
        } as CSSProperties
      }
    >
      <div className="vitrine-footer-custom__container">
        <div className="vitrine-footer-custom__section">
          <h3 className="vitrine-footer-custom__title">{vitrine.nome}</h3>
          {location && (
            <p className="vitrine-footer-custom__text">{location}</p>
          )}
        </div>

        {(vitrine.telefone || vitrine.whatsapp || vitrine.email) && (
          <div className="vitrine-footer-custom__section">
            <h3 className="vitrine-footer-custom__subtitle">Contato</h3>
            <ul className="vitrine-footer-custom__list">
              {vitrine.telefone && (
                <li>
                  <a href={`tel:${vitrine.telefone.replace(/\D/g, "")}`}>
                    {vitrine.telefone}
                  </a>
                </li>
              )}
              {vitrine.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${vitrine.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {vitrine.whatsapp}
                  </a>
                </li>
              )}
              {vitrine.email && (
                <li>
                  <a href={`mailto:${vitrine.email}`}>{vitrine.email}</a>
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="vitrine-footer-custom__section">
          <h3 className="vitrine-footer-custom__subtitle">Links Úteis</h3>
          <ul className="vitrine-footer-custom__list">
            <li>
              <a href="/termos">Termos de Uso</a>
            </li>
            <li>
              <a href="/privacidade">Política de Privacidade</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="vitrine-footer-custom__bottom">
        <p className="vitrine-footer-custom__credit">
          Vitrine criada com{" "}
          <a href="https://gearsales.com.br" target="_blank" rel="noopener noreferrer">
            Gear Sales
          </a>{" "}
          · Tecnologia para revendas de veículos
        </p>
      </div>
    </footer>
  )
}
