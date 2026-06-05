"use client"

import type { CSSProperties } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { getVitrineInitials } from "@/src/lib/vitrine-display"
import { getVitrineTheme } from "@/src/lib/vitrine-theme"
import type { VitrineLoja } from "@/src/types/vitrine"

interface VitrineHeaderProps {
  vitrine: VitrineLoja
}

const NAV_ITEMS = [
  { href: "/#inicio", label: "Início", isActive: (path: string) => path === "/" },
  { href: "/#estoque", label: "Estoque", isActive: () => false },
  { href: "/sobre", label: "Sobre", isActive: (path: string) => path === "/sobre" },
  { href: "/sobre#contato", label: "Contato", isActive: () => false },
] as const

export function VitrineHeader({ vitrine }: VitrineHeaderProps) {
  const pathname = usePathname()
  const theme = getVitrineTheme(vitrine.corPrincipal)
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const iniciais = getVitrineInitials(vitrine.nome)

  const whatsappHref = vitrine.whatsapp
    ? `https://wa.me/${vitrine.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá, encontrei a vitrine da ${vitrine.nome} e gostaria de mais informações.`)}`
    : null

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const isNavActive = (isActive: (path: string) => boolean) => isActive(pathname)

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
        <Link href="/" className="vitrine-header__logo-section">
          {vitrine.logoUrl && !logoError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={vitrine.logoUrl}
              alt=""
              className="vitrine-header__logo"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="vitrine-header__logo-placeholder" aria-hidden>
              {iniciais}
            </div>
          )}
          <p className="vitrine-header__title">{vitrine.nome}</p>
        </Link>

        <nav className="vitrine-header__nav" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={`vitrine-header__nav-link${
                isNavActive(item.isActive) ? " vitrine-header__nav-link--active" : ""
              }`}
              aria-current={isNavActive(item.isActive) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="vitrine-header__actions">
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="vitrine-header__whatsapp"
            >
              <span className="vitrine-header__whatsapp-text-desktop">Falar no WhatsApp</span>
              <span className="vitrine-header__whatsapp-text-mobile">WhatsApp</span>
            </a>
          )}

          <button
            type="button"
            className="vitrine-header__menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="vitrine-mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="vitrine-sr-only">{menuOpen ? "Fechar menu" : "Abrir menu"}</span>
            <span className="vitrine-header__menu-icon" aria-hidden>
              {menuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`vitrine-header__mobile-panel${menuOpen ? " vitrine-header__mobile-panel--open" : ""}`}
        id="vitrine-mobile-nav"
        hidden={!menuOpen}
      >
        <nav className="vitrine-header__mobile-nav" aria-label="Navegação mobile">
          {NAV_ITEMS.map((item) => (
            <Link
              key={`mobile-${item.href}-${item.label}`}
              href={item.href}
              className={`vitrine-header__mobile-link${
                isNavActive(item.isActive) ? " vitrine-header__mobile-link--active" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="vitrine-header__mobile-whatsapp"
              onClick={() => setMenuOpen(false)}
            >
              Falar no WhatsApp
            </a>
          )}
        </nav>
      </div>
    </header>
  )
}
