import {
  buildLojaWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/src/lib/whatsapp"
import type { VitrineLoja } from "@/src/types/vitrine"
import { formatLocation } from "@/src/utils/format"
import { getLojaDisplayName, formatLojaEnderecoCompleto } from "@/src/utils/loja"

interface SobreContactProps {
  loja: VitrineLoja
}

export function SobreContact({ loja }: SobreContactProps) {
  const location = formatLocation(loja.cidade, loja.estado)
  const enderecoFormatado = formatLojaEnderecoCompleto(loja)
  const displayName = getLojaDisplayName(loja)
  const whatsappHref = buildWhatsAppUrl(
    loja.whatsapp,
    buildLojaWhatsAppMessage(displayName)
  )

  const hasDirectContact = Boolean(
    whatsappHref || loja.telefone || loja.email
  )
  const hasLocationInfo = Boolean(location)

  return (
    <section className="sobre-section" aria-labelledby="sobre-contact-title">
      <h2 id="sobre-contact-title" className="sobre-section__title">
        Contato
      </h2>

      {hasDirectContact || hasLocationInfo ? (
        <ul className="sobre-contact__list">
          {whatsappHref ? (
            <li>
              <span className="sobre-contact__label">WhatsApp</span>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                {loja.whatsapp}
              </a>
            </li>
          ) : null}
          {loja.telefone ? (
            <li>
              <span className="sobre-contact__label">Telefone</span>
              <span>{loja.telefone}</span>
            </li>
          ) : null}
          {loja.email ? (
            <li>
              <span className="sobre-contact__label">E-mail</span>
              <a href={`mailto:${loja.email}`}>{loja.email}</a>
            </li>
          ) : null}
          {location ? (
            <li>
              <span className="sobre-contact__label">Cidade</span>
              <span>{location}</span>
            </li>
          ) : null}
          {enderecoFormatado && enderecoFormatado !== location ? (
            <li>
              <span className="sobre-contact__label">Endereço</span>
              <span>{enderecoFormatado}</span>
            </li>
          ) : null}
        </ul>
      ) : (
        <p className="sobre-contact__empty">
          Esta loja ainda não cadastrou informações de contato.
        </p>
      )}
    </section>
  )
}
