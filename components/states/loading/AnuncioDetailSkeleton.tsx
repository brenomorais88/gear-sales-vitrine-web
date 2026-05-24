export function AnuncioDetailSkeleton() {
  return (
    <main
      className="vitrine-main anuncio-detail-page anuncio-detail-page--skeleton"
      role="status"
      aria-live="polite"
      aria-label="Carregando detalhes do veículo"
    >
      <div className="anuncio-detail-skeleton__breadcrumb" />
      <div className="anuncio-detail">
        <div className="anuncio-detail__main">
          <div className="anuncio-detail-skeleton__gallery" />
          <div className="anuncio-detail-skeleton__title" />
          <div className="anuncio-detail-skeleton__block" />
          <div className="anuncio-detail-skeleton__block anuncio-detail-skeleton__block--tall" />
        </div>
        <aside className="anuncio-detail__aside">
          <div className="anuncio-detail-skeleton__sidebar" />
        </aside>
      </div>
    </main>
  )
}
