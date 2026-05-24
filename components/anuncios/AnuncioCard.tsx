import Link from "next/link"

import { SafeImage } from "@/components/shared/SafeImage"
import {
  buildAnuncioWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/src/lib/whatsapp"
import type { VitrineAnuncio } from "@/src/types/anuncio"
import {
  formatAno,
  formatCurrency,
  formatKm,
  formatLocation,
  formatMarcaModelo,
} from "@/src/utils/format"

interface AnuncioCardProps {
  anuncio: VitrineAnuncio
  nomeDaLoja: string
  whatsapp?: string | null
}

export function AnuncioCard({ anuncio, nomeDaLoja, whatsapp }: AnuncioCardProps) {
  const location = formatLocation(anuncio.cidade, anuncio.estado)
  const whatsappHref = whatsapp
    ? buildWhatsAppUrl(
        whatsapp,
        buildAnuncioWhatsAppMessage(anuncio.titulo, nomeDaLoja)
      )
    : null

  return (
    <article className="anuncio-card">
      <Link href={`/anuncios/${anuncio.id}`} className="anuncio-card__media">
        <SafeImage
          src={anuncio.imagemCapaUrl}
          alt={anuncio.titulo}
          className="anuncio-card__image"
        />
      </Link>

      <div className="anuncio-card__body">
        <Link href={`/anuncios/${anuncio.id}`} className="anuncio-card__title-link">
          <h3 className="anuncio-card__title">{anuncio.titulo}</h3>
        </Link>

        <p className="anuncio-card__subtitle">
          {formatMarcaModelo(anuncio.marca, anuncio.modelo, anuncio.versao)}
        </p>

        <p className="anuncio-card__price">{formatCurrency(anuncio.preco)}</p>

        <ul className="anuncio-card__specs">
          <li>{formatAno(anuncio.anoFabricacao, anuncio.anoModelo)}</li>
          <li>{formatKm(anuncio.quilometragem)}</li>
          <li>{anuncio.cambio}</li>
          <li>{anuncio.combustivel}</li>
        </ul>

        {location ? <p className="anuncio-card__location">{location}</p> : null}

        <div className="anuncio-card__actions">
          <Link
            href={`/anuncios/${anuncio.id}`}
            className="vitrine-btn vitrine-btn--primary anuncio-card__btn"
          >
            Ver detalhes
          </Link>
          {whatsappHref ? (
            <a
              href={whatsappHref}
              className="vitrine-btn vitrine-btn--outline anuncio-card__btn anuncio-card__btn--whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Tenho interesse no ${anuncio.titulo}`}
            >
              Tenho interesse
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
