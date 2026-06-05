"use client"

import { VitrineAnuncioCard } from "@/components/vitrine/VitrineAnuncioCard"
import type { PublicVitrineAnuncioListResponse } from "@/src/types/vitrine"

interface VitrineAnunciosGridProps {
  response: PublicVitrineAnuncioListResponse | null
  isLoading: boolean
  onPageChange: (page: number) => void
}

function VitrineAnuncioSkeletonCard() {
  return (
    <div className="vitrine-anuncios-skeleton-card" aria-hidden>
      <div className="vitrine-anuncios-skeleton-card__image" />
      <div className="vitrine-anuncios-skeleton-card__body">
        <div className="vitrine-anuncios-skeleton-card__line vitrine-anuncios-skeleton-card__line--title" />
        <div className="vitrine-anuncios-skeleton-card__line vitrine-anuncios-skeleton-card__line--price" />
        <div className="vitrine-anuncios-skeleton-card__line vitrine-anuncios-skeleton-card__line--short" />
      </div>
    </div>
  )
}

export function VitrineAnunciosGrid({
  response,
  isLoading,
  onPageChange,
}: VitrineAnunciosGridProps) {
  const hasFilters =
    response?.appliedFilters &&
    Object.values(response.appliedFilters).some((v) => v != null)

  if (!isLoading && response?.items.length === 0 && !hasFilters) {
    return (
      <div className="vitrine-anuncios-empty">
        <div className="vitrine-anuncios-empty__content">
          <div className="vitrine-anuncios-empty__icon" aria-hidden>
            🚗
          </div>
          <h2>Esta loja ainda não possui veículos disponíveis na vitrine.</h2>
          <p>Volte em breve para conferir as novidades.</p>
        </div>
      </div>
    )
  }

  if (!isLoading && response?.items.length === 0 && hasFilters) {
    return (
      <div className="vitrine-anuncios-empty">
        <div className="vitrine-anuncios-empty__content">
          <div className="vitrine-anuncios-empty__icon" aria-hidden>
            🔍
          </div>
          <h2>Nenhum veículo encontrado com os filtros selecionados.</h2>
          <p>Tente alterar ou limpar os filtros para ver mais opções.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div
        className="vitrine-anuncios-loading"
        role="status"
        aria-live="polite"
        aria-label="Carregando veículos"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <VitrineAnuncioSkeletonCard key={index} />
        ))}
      </div>
    )
  }

  if (!response || response.items.length === 0) {
    return null
  }

  return (
    <div className="vitrine-anuncios-section">
      <div className="vitrine-anuncios-count">
        Mostrando {response.items.length} de {response.totalItems} veículo
        {response.totalItems !== 1 ? "s" : ""}
      </div>

      <div className="vitrine-anuncios-grid">
        {response.items.map((anuncio) => (
          <VitrineAnuncioCard key={anuncio.id} anuncio={anuncio} />
        ))}
      </div>

      {response.totalPages > 1 && (
        <nav className="vitrine-anuncios-pagination" aria-label="Paginação de veículos">
          <button
            type="button"
            onClick={() => onPageChange(response.page - 1)}
            disabled={response.page === 0}
            className="vitrine-pagination-btn"
            aria-label="Página anterior"
          >
            Anterior
          </button>

          <div className="vitrine-pagination-info" aria-current="page">
            Página {response.page + 1} de {response.totalPages}
          </div>

          <button
            type="button"
            onClick={() => onPageChange(response.page + 1)}
            disabled={response.page >= response.totalPages - 1}
            className="vitrine-pagination-btn"
            aria-label="Próxima página"
          >
            Próxima
          </button>
        </nav>
      )}
    </div>
  )
}
