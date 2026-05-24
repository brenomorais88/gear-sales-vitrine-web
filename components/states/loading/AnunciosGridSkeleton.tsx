interface AnunciosGridSkeletonProps {
  count?: number
}

export function AnunciosGridSkeleton({ count = 8 }: AnunciosGridSkeletonProps) {
  return (
    <div
      className="home-grid home-grid--skeleton"
      role="status"
      aria-live="polite"
      aria-label="Carregando veículos"
    >
      {Array.from({ length: count }).map((_, index) => (
        <article key={index} className="anuncio-card-skeleton">
          <div className="anuncio-card-skeleton__media" />
          <div className="anuncio-card-skeleton__body">
            <div className="anuncio-card-skeleton__line anuncio-card-skeleton__line--title" />
            <div className="anuncio-card-skeleton__line" />
            <div className="anuncio-card-skeleton__line anuncio-card-skeleton__line--price" />
            <div className="anuncio-card-skeleton__line anuncio-card-skeleton__line--short" />
          </div>
        </article>
      ))}
    </div>
  )
}
