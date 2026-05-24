import {
  buildAnuncioWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/src/lib/whatsapp"
import type { VitrineAnuncio } from "@/src/types/anuncio"
import type { VitrineLoja } from "@/src/types/vitrine"
import { formatCurrency } from "@/src/utils/format"
import { buildTelHref } from "@/src/utils/phone"

interface AnuncioContactCardProps {
  anuncio: VitrineAnuncio
  loja: VitrineLoja
}

export function AnuncioContactCard({ anuncio, loja }: AnuncioContactCardProps) {
  const displayName = loja.nomePublico?.trim() || loja.nome
  const whatsappMessage = buildAnuncioWhatsAppMessage(anuncio.titulo, displayName)
  const whatsappHref = loja.whatsapp
    ? buildWhatsAppUrl(loja.whatsapp, whatsappMessage)
    : null
  const telHref = loja.telefone ? buildTelHref(loja.telefone) : null

  return (
    <aside className="anuncio-contact-card" aria-label="Contato sobre o veículo">
      <p className="anuncio-contact-card__price">{formatCurrency(anuncio.preco)}</p>
      <p className="anuncio-contact-card__hint">
        Fale com a equipe da {displayName} e tire suas dúvidas sobre este veículo.
      </p>

      <div className="anuncio-contact-card__actions">
        {whatsappHref ? (
          <>
            <a
              href={whatsappHref}
              className="vitrine-btn vitrine-btn--primary anuncio-contact-card__btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tenho interesse
            </a>
            <a
              href={whatsappHref}
              className="vitrine-btn vitrine-btn--whatsapp anuncio-contact-card__btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chamar no WhatsApp
            </a>
          </>
        ) : null}

        {loja.telefone && telHref ? (
          <a href={telHref} className="vitrine-btn vitrine-btn--outline anuncio-contact-card__btn">
            Ligar para a loja
          </a>
        ) : null}

        {!whatsappHref && loja.email ? (
          <a
            href={`mailto:${loja.email}?subject=${encodeURIComponent(`Interesse: ${anuncio.titulo}`)}`}
            className="vitrine-btn vitrine-btn--outline anuncio-contact-card__btn"
          >
            Enviar e-mail
          </a>
        ) : null}
      </div>

      {!whatsappHref && !loja.telefone && !loja.email ? (
        <p className="anuncio-contact-card__fallback">
          Entre em contato com a loja pela página Sobre.
        </p>
      ) : null}
    </aside>
  )
}
