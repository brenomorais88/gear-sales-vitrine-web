"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { SafeImage } from "@/components/shared/SafeImage"
import {
  buildLojaWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/src/lib/whatsapp"
import type { VitrineLoja } from "@/src/types/vitrine"
import { formatLocation, getInitials } from "@/src/utils/format"
import { getLojaDisplayName } from "@/src/utils/loja"

interface VitrineHeaderProps {
  loja: VitrineLoja
}

const NAV_ITEMS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
] as const

export function VitrineHeader({ loja }: VitrineHeaderProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const displayName = getLojaDisplayName(loja)
  const location = formatLocation(loja.cidade, loja.estado)
  const whatsappHref = loja.whatsapp
    ? buildWhatsAppUrl(loja.whatsapp, buildLojaWhatsAppMessage(displayName))
    : null

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <header className="vitrine-header">
      <div className="vitrine-header__inner">
        <Link
          href="/"
          className="vitrine-header__brand"
          onClick={() => setMenuOpen(false)}
        >
          <span className="vitrine-header__logo">
            {loja.logoUrl ? (
              <SafeImage src={loja.logoUrl} alt={`Logo ${displayName}`} />
            ) : (
              <span className="vitrine-header__logo-fallback" aria-hidden>
                {getInitials(displayName)}
              </span>
            )}
          </span>
          <span className="vitrine-header__brand-text">
            <span className="vitrine-header__name">{displayName}</span>
            {location ? (
              <span className="vitrine-header__location">{location}</span>
            ) : null}
          </span>
        </Link>

        <button
          type="button"
          className="vitrine-header__menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="vitrine-header-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="vitrine-header__menu-icon" aria-hidden />
          <span className="sr-only">{menuOpen ? "Fechar menu" : "Abrir menu"}</span>
        </button>

        <div
          id="vitrine-header-nav"
          className={`vitrine-header__actions${menuOpen ? " vitrine-header__actions--open" : ""}`}
        >
          <nav className="vitrine-header__nav" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="vitrine-header__nav-link"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {whatsappHref ? (
            <a
              href={whatsappHref}
              className="vitrine-btn vitrine-btn--primary vitrine-header__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com a loja
            </a>
          ) : null}
        </div>
      </div>
    </header>
  )
}
