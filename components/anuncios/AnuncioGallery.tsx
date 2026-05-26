"use client"

import { useMemo, useState } from "react"

import { SafeImage } from "@/components/shared/SafeImage"
import { VEHICLE_PLACEHOLDER_IMAGE } from "@/src/lib/placeholders"

interface AnuncioGalleryProps {
  titulo: string
  imagemCapaUrl: string | null
  imagens: string[]
}

export function AnuncioGallery({
  titulo,
  imagemCapaUrl,
  imagens,
}: AnuncioGalleryProps) {
  const fotos = useMemo(() => {
    const urls = imagens.length > 0 ? imagens : [imagemCapaUrl ?? ""]
    const unique = [...new Set(urls.filter(Boolean))] as string[]
    return unique.length > 0 ? unique : [VEHICLE_PLACEHOLDER_IMAGE]
  }, [imagemCapaUrl, imagens])

  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = fotos[selectedIndex] ?? fotos[0]

  return (
    <div className="anuncio-gallery">
      <div className="anuncio-gallery__main">
        <SafeImage
          src={selected}
          alt={`${titulo} — foto ${selectedIndex + 1}`}
          className="anuncio-gallery__main-image"
        />
      </div>

      {fotos.length > 1 ? (
        <ul className="anuncio-gallery__thumbs" aria-label="Miniaturas do veículo">
          {fotos.map((url, index) => (
            <li key={`${url}-${index}`}>
              <button
                type="button"
                className={`anuncio-gallery__thumb${
                  index === selectedIndex ? " anuncio-gallery__thumb--active" : ""
                }`}
                onClick={() => setSelectedIndex(index)}
                aria-label={`Ver foto ${index + 1}`}
                aria-current={index === selectedIndex}
              >
                <SafeImage
                  src={url}
                  alt=""
                  className="anuncio-gallery__thumb-image"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
