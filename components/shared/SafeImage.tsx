"use client"

import { useState } from "react"

import { VEHICLE_PLACEHOLDER_IMAGE } from "@/src/lib/placeholders"

interface SafeImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  fallbackSrc?: string
}

export function SafeImage({
  src,
  alt,
  className,
  fallbackSrc = VEHICLE_PLACEHOLDER_IMAGE,
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src?.trim() || fallbackSrc)
  const [hasError, setHasError] = useState(false)

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={hasError ? fallbackSrc : currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true)
          setCurrentSrc(fallbackSrc)
        }
      }}
    />
  )
}
