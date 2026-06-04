"use client"

import Link from "next/link"
import type { PublicVitrineAnuncioCardResponse } from "@/src/types/vitrine"

interface VitrineAnuncioCardProps {
  anuncio: PublicVitrineAnuncioCardResponse
}

/**
 * Formata um valor em reais
 */
function formatarValor(valor: string | null | undefined): string {
  if (!valor) return "Consulte"

  try {
    const num = parseFloat(valor)
    if (isNaN(num)) return "Consulte"

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  } catch {
    return "Consulte"
  }
}

/**
 * Formata quilometragem com separadores de milhares
 */
function formatarQuilometragem(km: string | null | undefined): string | null {
  if (!km) return null

  try {
    const num = parseFloat(km)
    if (isNaN(num)) return null

    return new Intl.NumberFormat("pt-BR").format(num) + " km"
  } catch {
    return null
  }
}

export function VitrineAnuncioCard({ anuncio }: VitrineAnuncioCardProps) {
  const ano = anuncio.anoModelo || anuncio.anoFabricacao
  const quilometragem = formatarQuilometragem(anuncio.quilometragem)
  const localizacao =
    anuncio.cidade && anuncio.estado
      ? `${anuncio.cidade}, ${anuncio.estado}`
      : null

  return (
    <Link
      href={`/anuncios/${anuncio.id}`}
      className="vitrine-anuncio-card"
    >
      <div className="vitrine-anuncio-card__image-container">
        {anuncio.fotoPrincipalUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={anuncio.fotoPrincipalUrl}
            alt={anuncio.titulo}
            className="vitrine-anuncio-card__image"
          />
        ) : (
          <div className="vitrine-anuncio-card__image-placeholder">
            <span>Foto indisponível</span>
          </div>
        )}

        {anuncio.totalFotos > 0 && (
          <div className="vitrine-anuncio-card__foto-count">
            {anuncio.totalFotos} foto{anuncio.totalFotos !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      <div className="vitrine-anuncio-card__content">
        <div className="vitrine-anuncio-card__header">
          <h3 className="vitrine-anuncio-card__title">{anuncio.titulo}</h3>
          <div className="vitrine-anuncio-card__price">
            {formatarValor(anuncio.valorVenda)}
          </div>
        </div>

        <div className="vitrine-anuncio-card__details">
          <div className="vitrine-anuncio-card__detail-row">
            <span className="vitrine-anuncio-card__label">Marca/Modelo:</span>
            <span className="vitrine-anuncio-card__value">
              {anuncio.marca.nome} {anuncio.modelo.nome}
            </span>
          </div>

          {ano && (
            <div className="vitrine-anuncio-card__detail-row">
              <span className="vitrine-anuncio-card__label">Ano:</span>
              <span className="vitrine-anuncio-card__value">{ano}</span>
            </div>
          )}

          {quilometragem && (
            <div className="vitrine-anuncio-card__detail-row">
              <span className="vitrine-anuncio-card__label">KM:</span>
              <span className="vitrine-anuncio-card__value">{quilometragem}</span>
            </div>
          )}

          {anuncio.cambio && (
            <div className="vitrine-anuncio-card__detail-row">
              <span className="vitrine-anuncio-card__label">Câmbio:</span>
              <span className="vitrine-anuncio-card__value">
                {anuncio.cambio}
              </span>
            </div>
          )}

          {anuncio.combustivel && (
            <div className="vitrine-anuncio-card__detail-row">
              <span className="vitrine-anuncio-card__label">Combustível:</span>
              <span className="vitrine-anuncio-card__value">
                {anuncio.combustivel}
              </span>
            </div>
          )}

          {localizacao && (
            <div className="vitrine-anuncio-card__detail-row">
              <span className="vitrine-anuncio-card__label">Localização:</span>
              <span className="vitrine-anuncio-card__value">{localizacao}</span>
            </div>
          )}
        </div>

        <div className="vitrine-anuncio-card__footer">
          <span className="vitrine-anuncio-card__cta">Ver detalhes</span>
        </div>
      </div>
    </Link>
  )
}
