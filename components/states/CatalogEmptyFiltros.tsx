interface CatalogEmptyFiltrosProps {
  onLimpar: () => void
}

export function CatalogEmptyFiltros({ onLimpar }: CatalogEmptyFiltrosProps) {
  return (
    <div className="catalog-empty catalog-empty--filtros">
      <div className="catalog-empty__card">
        <p className="catalog-empty__icon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="6" />
            <path d="M16 16l4 4" strokeLinecap="round" />
          </svg>
        </p>
        <p className="catalog-empty__message">
          Nenhum veículo encontrado com os filtros selecionados.
        </p>
        <button
          type="button"
          className="vitrine-btn vitrine-btn--outline"
          onClick={onLimpar}
        >
          Limpar filtros
        </button>
      </div>
    </div>
  )
}
