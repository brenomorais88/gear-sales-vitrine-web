"use client"

import { useState } from "react"
import type { PublicVitrineAnuncioFoto } from "@/src/types/vitrine"

interface VitrineAnuncioGalleryProps {
  titulo: string
  fotos: PublicVitrineAnuncioFoto[]
}

export function VitrineAnuncioGallery({ titulo, fotos }: VitrineAnuncioGalleryProps) {
  // Encontrar foto principal ou usar primeira
  const fotoInicial = fotos.find((f) => f.principal) || fotos[0]
  const [fotoAtual, setFotoAtual] = useState<PublicVitrineAnuncioFoto | undefined>(fotoInicial)

  if (!fotos || fotos.length === 0) {
    return (
      <div className="vitrine-gallery">
        <div className="vitrine-gallery__main-placeholder">
          <div className="vitrine-gallery__placeholder-content">
            <span>Foto indisponível</span>
          </div>
        </div>
      </div>
    )
  }

  const fotoAtualData = fotoAtual || fotoInicial
  const indiceAtual = fotos.findIndex((f) => f.id === fotoAtualData?.id) + 1

  const handlePrev = () => {
    const idx = fotos.findIndex((f) => f.id === fotoAtualData.id)
    if (idx > 0) {
      setFotoAtual(fotos[idx - 1])
    }
  }

  const handleNext = () => {
    const idx = fotos.findIndex((f) => f.id === fotoAtualData.id)
    if (idx < fotos.length - 1) {
      setFotoAtual(fotos[idx + 1])
    }
  }

  return (
    <div className="vitrine-gallery">
      <div className="vitrine-gallery__main">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fotoAtualData.url}
          alt={titulo}
          className="vitrine-gallery__main-image"
        />
        <div className="vitrine-gallery__counter">
          {indiceAtual} de {fotos.length}
        </div>

        {fotos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              disabled={indiceAtual === 1}
              className="vitrine-gallery__button vitrine-gallery__button--prev"
              aria-label="Foto anterior"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              disabled={indiceAtual === fotos.length}
              className="vitrine-gallery__button vitrine-gallery__button--next"
              aria-label="Próxima foto"
            >
              ›
            </button>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className="vitrine-gallery__thumbnails">
          {fotos.map((foto, idx) => (
            <button
              key={foto.id}
              onClick={() => setFotoAtual(foto)}
              className={`vitrine-gallery__thumbnail ${
                fotoAtualData.id === foto.id
                  ? "vitrine-gallery__thumbnail--active"
                  : ""
              }`}
              aria-label={`Foto ${idx + 1}`}
              aria-current={fotoAtualData.id === foto.id}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={foto.url} alt={`${titulo} - Foto ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
