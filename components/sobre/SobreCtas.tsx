import Link from "next/link"

import {
  buildLojaWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/src/lib/whatsapp"
import type { VitrineLoja } from "@/src/types/vitrine"
import { getLojaDisplayName } from "@/src/utils/loja"
import { buildTelHref } from "@/src/utils/phone"

interface SobreCtasProps {
  loja: VitrineLoja
}

export function SobreCtas({ loja }: SobreCtasProps) {
  const displayName = getLojaDisplayName(loja)
  const whatsappHref = loja.whatsapp
    ? buildWhatsAppUrl(loja.whatsapp, buildLojaWhatsAppMessage(displayName))
    : null
  const telHref = loja.telefone ? buildTelHref(loja.telefone) : null

  return (
    <section className="sobre-ctas" aria-label="Ações">
      <div className="sobre-ctas__actions">
        <Link href="/" className="vitrine-btn vitrine-btn--primary">
          Ver veículos disponíveis
        </Link>
        {whatsappHref ? (
          <a
            href={whatsappHref}
            className="vitrine-btn vitrine-btn--whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chamar no WhatsApp
          </a>
        ) : null}
        {loja.telefone && telHref ? (
          <a href={telHref} className="vitrine-btn vitrine-btn--outline">
            Ligar para a loja
          </a>
        ) : null}
      </div>
    </section>
  )
}
