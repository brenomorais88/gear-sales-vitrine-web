import {
  buildLojaWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/src/lib/whatsapp"
import type { VitrineLoja } from "@/src/types/vitrine"
import { formatLocation } from "@/src/utils/format"
import { formatLojaEnderecoCompleto } from "@/src/utils/loja"

interface SobreContactProps {
  loja: VitrineLoja
}

export function SobreContact({ loja }: SobreContactProps) {
  const location = formatLocation(loja.cidade, loja.estado)
  const enderecoFormatado = formatLojaEnderecoCompleto(loja)
  const displayName = loja.nomePublico?.trim() || loja.nome
  const whatsappHref = loja.whatsapp
    ? buildWhatsAppUrl(loja.whatsapp, buildLojaWhatsAppMessage(displayName))
    : null

  const hasContact =
    loja.whatsapp ||
    loja.telefone ||
    loja.email ||
    location ||
    loja.endereco ||
    loja.horarioFuncionamento

  if (!hasContact) {
    return null
  }

  return (
    <section className="sobre-section" aria-labelledby="sobre-contact-title">
      <h2 id="sobre-contact-title" className="sobre-section__title">
        Contato
      </h2>
      <ul className="sobre-contact__list">
        {loja.whatsapp ? (
          <li>
            <span className="sobre-contact__label">WhatsApp</span>
            {whatsappHref ? (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                {loja.whatsapp}
              </a>
            ) : (
              loja.whatsapp
            )}
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
        {enderecoFormatado ? (
          <li>
            <span className="sobre-contact__label">Endereço</span>
            <span>{enderecoFormatado}</span>
          </li>
        ) : null}
        {loja.horarioFuncionamento ? (
          <li>
            <span className="sobre-contact__label">Horário</span>
            <span>{loja.horarioFuncionamento}</span>
          </li>
        ) : null}
      </ul>
    </section>
  )
}
