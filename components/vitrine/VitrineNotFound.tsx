"use client"

import { useEffect } from "react"
import { VitrineStatePage } from "@/components/vitrine/VitrineStatePage"

export function VitrineNotFound() {
  useEffect(() => {
    // Aguarda um breve momento antes de redirecionar para gearsales.com.br
    const timer = setTimeout(() => {
      window.location.href = "https://www.gearsales.com.br"
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <VitrineStatePage
      title="Vitrine não encontrada"
      description="Você será redirecionado para Gear Sales em alguns segundos..."
    />
  )
}
