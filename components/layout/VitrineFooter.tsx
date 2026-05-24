import Link from "next/link"

import {
  buildLojaWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/src/lib/whatsapp"
import type { VitrineLoja } from "@/src/types/vitrine"
import { formatLocation } from "@/src/utils/format"

interface VitrineFooterProps {
  loja: VitrineLoja
}

export function VitrineFooter({ loja }: VitrineFooterProps) {
  const displayName = loja.nomePublico?.trim() || loja.nome
  const location = formatLocation(loja.cidade, loja.estado)
  const whatsappHref = loja.whatsapp
    ? buildWhatsAppUrl(loja.whatsapp, buildLojaWhatsAppMessage(displayName))
    : null

  return (
    <footer className="vitrine-site-footer">
      <div className="vitrine-site-footer__inner">
        <div className="vitrine-site-footer__loja">
          <p className="vitrine-site-footer__name">{displayName}</p>
          {location ? <p className="vitrine-site-footer__location">{location}</p> : null}
          {loja.endereco ? (
            <p className="vitrine-site-footer__address">{loja.endereco}</p>
          ) : null}

          <ul className="vitrine-site-footer__contacts">
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
                E-mail:{" "}
                <a href={`mailto:${loja.email}`}>{loja.email}</a>
              </li>
            ) : null}
          </ul>

          <Link href="/" className="vitrine-site-footer__home-link">
            Voltar ao início
          </Link>
        </div>

        <div className="vitrine-site-footer__brand">
          <p>
            Vitrine criada com{" "}
            <a
              href="https://gearsales.com.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gear Sales
            </a>
          </p>
          <p className="vitrine-site-footer__tagline">
            Desenvolvido por Gear Sales
          </p>
        </div>
      </div>
    </footer>
  )
}
