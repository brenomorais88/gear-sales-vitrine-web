"use client"

import { StatePage } from "@/components/states/StatePage"

interface VitrineLoadErrorProps {
  onRetry?: () => void
}

/**
 * Erro inesperado ao carregar a vitrine.
 */
export function VitrineLoadError({ onRetry }: VitrineLoadErrorProps) {
  function handleRetry() {
    if (onRetry) {
      onRetry()
      return
    }
    window.location.reload()
  }

  return (
    <StatePage
      icon="error"
      title="Não foi possível carregar esta vitrine"
      description="Tente novamente em alguns instantes."
    >
      <button
        type="button"
        className="vitrine-btn vitrine-btn--primary"
        onClick={handleRetry}
      >
        Recarregar página
      </button>
    </StatePage>
  )
}
