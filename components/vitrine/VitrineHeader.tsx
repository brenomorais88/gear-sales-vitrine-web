import type { CSSProperties } from "react"
import Link from "next/link"

import type { VitrineLoja } from "@/src/types/vitrine"
import { getVitrineTheme } from "@/src/lib/vitrine-theme"

interface VitrineHeaderProps {
  vitrine: VitrineLoja
}

function getInitials(nome: string): string {
  return nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function VitrineHeader({ vitrine }: VitrineHeaderProps) {
  const theme = getVitrineTheme(vitrine.corPrincipal)
  const whatsappHref = vitrine.whatsapp
    ? `https://wa.me/${vitrine.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá, encontrei a vitrine da ${vitrine.nome} e gostaria de mais informações.`)}`
    : null

  return (
    <header
      className="vitrine-header"
      style={
        {
          "--vitrine-primary": theme.primaryColor,
          "--vitrine-header-text": theme.textColor,
        } as CSSProperties
      }
    >
      <div className="vitrine-header__container">
        <div className="vitrine-header__logo-section">
          {vitrine.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={vitrine.logoUrl}
              alt={`Logo ${vitrine.nome}`}
              className="vitrine-header__logo"
            />
          ) : (
            <div className="vitrine-header__logo-placeholder" aria-hidden>
              {getInitials(vitrine.nome)}
            </div>
          )}
          <h1 className="vitrine-header__title">{vitrine.nome}</h1>
        </div>

        <nav className="vitrine-header__nav" aria-label="Navegação principal">
          <Link href="/#inicio" className="vitrine-header__nav-link">
            Início
          </Link>
          <Link href="/#estoque" className="vitrine-header__nav-link">
            Estoque
          </Link>
          <Link href="/sobre" className="vitrine-header__nav-link">
            Sobre
          </Link>
          <Link href="/contato" className="vitrine-header__nav-link">
            Contato
          </Link>
        </nav>

        {whatsappHref && (
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="vitrine-header__whatsapp">
            <span className="vitrine-header__whatsapp-text-desktop">Falar no WhatsApp</span>
            <span className="vitrine-header__whatsapp-text-mobile">WhatsApp</span>
          </a>
        )}
      </div>
    </header>
  )
}
