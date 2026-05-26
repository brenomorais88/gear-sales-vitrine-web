import Link from "next/link"

import { GearSalesLogo } from "@/components/shared/GearSalesLogo"
import {
  GEAR_SALES_FOOTER_LABEL,
  GEAR_SALES_SITE_URL,
} from "@/src/lib/gear-sales-brand"
import {
  buildLojaWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/src/lib/whatsapp"
import type { VitrineLoja } from "@/src/types/vitrine"
import { formatLocation, getInitials } from "@/src/utils/format"
import { getLojaDisplayName } from "@/src/utils/loja"

interface VitrineFooterProps {
  loja: VitrineLoja
}

export function VitrineFooter({ loja }: VitrineFooterProps) {
  const displayName = getLojaDisplayName(loja)
  const location = formatLocation(loja.cidade, loja.estado)
  const whatsappHref = buildWhatsAppUrl(
    loja.whatsapp,
    buildLojaWhatsAppMessage(displayName)
  )

  const hasContacts = Boolean(loja.telefone || whatsappHref || loja.email)

  return (
    <footer className="vitrine-site-footer">
      <div className="vitrine-site-footer__inner">
        <div className="vitrine-site-footer__loja">
          <div className="vitrine-site-footer__brand-row">
            <span className="vitrine-site-footer__initials" aria-hidden>
              {getInitials(displayName)}
            </span>
            <p className="vitrine-site-footer__name">{displayName}</p>
          </div>

          {location ? (
            <p className="vitrine-site-footer__location">{location}</p>
          ) : null}

          {hasContacts ? (
            <ul className="vitrine-site-footer__contacts">
              {loja.telefone ? <li>Telefone: {loja.telefone}</li> : null}
              {whatsappHref ? (
                <li>
                  WhatsApp:{" "}
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    {loja.whatsapp}
                  </a>
                </li>
              ) : null}
              {loja.email ? (
                <li>
                  E-mail: <a href={`mailto:${loja.email}`}>{loja.email}</a>
                </li>
              ) : null}
            </ul>
          ) : null}

          <nav className="vitrine-site-footer__nav" aria-label="Links da vitrine">
            <Link href="/" className="vitrine-site-footer__home-link">
              Início
            </Link>
            <Link href="/sobre" className="vitrine-site-footer__home-link">
              Sobre a loja
            </Link>
          </nav>
        </div>

        <div className="vitrine-site-footer__brand">
          <a
            href={GEAR_SALES_SITE_URL}
            className="vitrine-site-footer__gear-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${GEAR_SALES_FOOTER_LABEL} (abrir em nova aba)`}
          >
            <GearSalesLogo />
          </a>
          <p className="vitrine-site-footer__tagline">
            {GEAR_SALES_FOOTER_LABEL}
          </p>
        </div>
      </div>
    </footer>
  )
}
