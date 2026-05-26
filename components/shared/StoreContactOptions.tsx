import Link from "next/link"

import {
  buildLojaWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/src/lib/whatsapp"
import type { VitrineLoja } from "@/src/types/vitrine"
import { getLojaDisplayName } from "@/src/utils/loja"
import { buildTelHref } from "@/src/utils/phone"

type StoreContactVariant = "stacked" | "inline"

interface StoreContactOptionsProps {
  loja: VitrineLoja
  /** Mensagem customizada para WhatsApp (default: mensagem genérica da loja). */
  whatsappMessage?: string
  /** Inclui um link "Ver veículos disponíveis" antes dos contatos. */
  showCatalogLink?: boolean
  /** Mensagem mostrada quando a loja não tem nenhum canal cadastrado. */
  emptyMessage?: string
  variant?: StoreContactVariant
}

const DEFAULT_EMPTY_MESSAGE =
  "Esta loja ainda não cadastrou informações de contato."

/**
 * Bloco reutilizável com as opções de contato disponíveis da loja
 * (WhatsApp, telefone, e-mail). Componentes que precisem do mesmo
 * conjunto de CTAs devem usar este componente para evitar duplicação.
 *
 * Cada CTA só é renderizado quando o canal correspondente é válido —
 * nunca exibe botões vazios ou para canais com dados inválidos.
 */
export function StoreContactOptions({
  loja,
  whatsappMessage,
  showCatalogLink = false,
  emptyMessage = DEFAULT_EMPTY_MESSAGE,
  variant = "stacked",
}: StoreContactOptionsProps) {
  const displayName = getLojaDisplayName(loja)
  const whatsappHref = buildWhatsAppUrl(
    loja.whatsapp,
    whatsappMessage ?? buildLojaWhatsAppMessage(displayName)
  )
  const telHref = buildTelHref(loja.telefone)
  const mailtoHref = loja.email?.trim() ? `mailto:${loja.email.trim()}` : null

  const hasAnyContact = Boolean(whatsappHref || telHref || mailtoHref)

  if (!hasAnyContact && !showCatalogLink) {
    return (
      <p className="store-contact__empty">{emptyMessage}</p>
    )
  }

  return (
    <div
      className={`store-contact store-contact--${variant}`}
      role="group"
      aria-label="Opções de contato com a loja"
    >
      {showCatalogLink ? (
        <Link href="/" className="vitrine-btn vitrine-btn--primary">
          Ver veículos disponíveis
        </Link>
      ) : null}

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

      {telHref ? (
        <a href={telHref} className="vitrine-btn vitrine-btn--outline">
          Ligar agora
        </a>
      ) : null}

      {mailtoHref ? (
        <a href={mailtoHref} className="vitrine-btn vitrine-btn--outline">
          Enviar e-mail
        </a>
      ) : null}

      {!hasAnyContact ? (
        <p className="store-contact__empty">{emptyMessage}</p>
      ) : null}
    </div>
  )
}
