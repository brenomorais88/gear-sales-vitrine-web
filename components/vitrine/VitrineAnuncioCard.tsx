"use client"

import Link from "next/link"
import { useState } from "react"
import type { PublicVitrineAnuncioCardResponse } from "@/src/types/vitrine"

interface VitrineAnuncioCardProps {
  anuncio: PublicVitrineAnuncioCardResponse
}

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
  const [imageError, setImageError] = useState(false)
  const ano = anuncio.anoModelo || anuncio.anoFabricacao
  const quilometragem = formatarQuilometragem(anuncio.quilometragem)
  const localizacao =
    anuncio.cidade && anuncio.estado
      ? `${anuncio.cidade}, ${anuncio.estado}`
      : null

  const chips = [
    ano && { label: "Ano", value: ano },
    quilometragem && { label: "KM", value: quilometragem },
    anuncio.cambio && { label: "Câmbio", value: anuncio.cambio },
    anuncio.combustivel && { label: "Comb.", value: anuncio.combustivel },
  ].filter(Boolean) as Array<{ label: string; value: string }>

  return (
    <Link
      href={`/anuncios/${anuncio.id}`}
      className="vitrine-anuncio-card"
    >
      <div className="vitrine-anuncio-card__image-container">
        {anuncio.fotoPrincipalUrl && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={anuncio.fotoPrincipalUrl}
            alt={anuncio.titulo}
            className="vitrine-anuncio-card__image"
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="vitrine-anuncio-card__image-placeholder" aria-hidden>
            <span className="vitrine-anuncio-card__placeholder-icon">🚗</span>
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
          <p className="vitrine-anuncio-card__subtitle">
            {anuncio.marca.nome} {anuncio.modelo.nome}
          </p>
          <div className="vitrine-anuncio-card__price">
            {formatarValor(anuncio.valorVenda)}
          </div>
        </div>

        {chips.length > 0 && (
          <ul className="vitrine-anuncio-card__chips" aria-label="Características">
            {chips.map((chip) => (
              <li key={`${chip.label}-${chip.value}`} className="vitrine-anuncio-card__chip">
                <span className="vitrine-anuncio-card__chip-label">{chip.label}</span>
                <span className="vitrine-anuncio-card__chip-value">{chip.value}</span>
              </li>
            ))}
          </ul>
        )}

        {localizacao && (
          <p className="vitrine-anuncio-card__location">{localizacao}</p>
        )}

        <div className="vitrine-anuncio-card__footer">
          <span className="vitrine-anuncio-card__cta">Ver detalhes</span>
        </div>
      </div>
    </Link>
  )
}
