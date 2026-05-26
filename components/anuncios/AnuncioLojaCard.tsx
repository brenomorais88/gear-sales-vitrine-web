import Link from "next/link"

import { SafeImage } from "@/components/shared/SafeImage"
import {
  buildLojaWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/src/lib/whatsapp"
import type { VitrineLoja } from "@/src/types/vitrine"
import { formatLocation, getInitials } from "@/src/utils/format"
import { getLojaDisplayName } from "@/src/utils/loja"

interface AnuncioLojaCardProps {
  loja: VitrineLoja
}

export function AnuncioLojaCard({ loja }: AnuncioLojaCardProps) {
  const displayName = getLojaDisplayName(loja)
  const location = formatLocation(loja.cidade, loja.estado)
  const whatsappHref = loja.whatsapp
    ? buildWhatsAppUrl(loja.whatsapp, buildLojaWhatsAppMessage(displayName))
    : null

  return (
    <section className="anuncio-loja-card" aria-labelledby="anuncio-loja-title">
      <h2 id="anuncio-loja-title" className="anuncio-loja-card__title">
        Vendido por
      </h2>

      <div className="anuncio-loja-card__header">
        <div className="anuncio-loja-card__logo">
          {loja.logoUrl ? (
            <SafeImage src={loja.logoUrl} alt={`Logo ${displayName}`} />
          ) : (
            <span aria-hidden>{getInitials(displayName)}</span>
          )}
        </div>
        <div>
          <p className="anuncio-loja-card__name">{displayName}</p>
          {location ? (
            <p className="anuncio-loja-card__location">{location}</p>
          ) : null}
        </div>
      </div>

      <ul className="anuncio-loja-card__contacts">
        {loja.telefone ? <li>Telefone: {loja.telefone}</li> : null}
        {loja.whatsapp ? (
          <li>
            WhatsApp:{" "}
            {whatsappHref ? (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                {loja.whatsapp}
              </a>
            ) : (
              loja.whatsapp
            )}
          </li>
        ) : null}
        {loja.email ? (
          <li>
            E-mail: <a href={`mailto:${loja.email}`}>{loja.email}</a>
          </li>
        ) : null}
      </ul>

      <div className="anuncio-loja-card__actions">
        <Link href="/sobre" className="vitrine-btn vitrine-btn--outline anuncio-loja-card__btn">
          Sobre a loja
        </Link>
        <Link href="/" className="vitrine-btn vitrine-btn--primary anuncio-loja-card__btn">
          Ver todos os veículos
        </Link>
      </div>
    </section>
  )
}
