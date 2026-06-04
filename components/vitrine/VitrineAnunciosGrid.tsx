"use client"

import { VitrineAnuncioCard } from "@/components/vitrine/VitrineAnuncioCard"
import type { PublicVitrineAnuncioListResponse } from "@/src/types/vitrine"

interface VitrineAnunciosGridProps {
  response: PublicVitrineAnuncioListResponse | null
  isLoading: boolean
  onPageChange: (page: number) => void
}

export function VitrineAnunciosGrid({
  response,
  isLoading,
  onPageChange,
}: VitrineAnunciosGridProps) {
  const hasFilters =
    response?.appliedFilters &&
    Object.values(response.appliedFilters).some((v) => v != null)

  // Estado vazio sem filtros
  if (!isLoading && response?.items.length === 0 && !hasFilters) {
    return (
      <div className="vitrine-anuncios-empty">
        <div className="vitrine-anuncios-empty__content">
          <h2>Esta loja ainda não possui veículos disponíveis na vitrine.</h2>
          <p>Volte em breve para conferir as novidades.</p>
        </div>
      </div>
    )
  }

  // Estado vazio com filtros
  if (!isLoading && response?.items.length === 0 && hasFilters) {
    return (
      <div className="vitrine-anuncios-empty">
        <div className="vitrine-anuncios-empty__content">
          <h2>Nenhum veículo encontrado com os filtros selecionados.</h2>
          <p>Tente alterar ou limpar os filtros.</p>
        </div>
      </div>
    )
  }

  // Loading
  if (isLoading) {
    return (
      <div className="vitrine-anuncios-loading">
        <div className="vitrine-anuncios-skeleton" />
        <div className="vitrine-anuncios-skeleton" />
        <div className="vitrine-anuncios-skeleton" />
        <div className="vitrine-anuncios-skeleton" />
        <div className="vitrine-anuncios-skeleton" />
        <div className="vitrine-anuncios-skeleton" />
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
        <div className="vitrine-anuncios-pagination">
          <button
            onClick={() => onPageChange(response.page - 1)}
            disabled={response.page === 0}
            className="vitrine-pagination-btn"
            aria-label="Página anterior"
          >
            Anterior
          </button>

          <div className="vitrine-pagination-info">
            Página {response.page + 1} de {response.totalPages}
          </div>

          <button
            onClick={() => onPageChange(response.page + 1)}
            disabled={response.page >= response.totalPages - 1}
            className="vitrine-pagination-btn"
            aria-label="Próxima página"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  )
}
