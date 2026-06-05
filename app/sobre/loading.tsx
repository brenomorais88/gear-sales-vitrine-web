export default function SobreLoading() {
  return (
    <div className="vitrine-sobre-skeleton" role="status" aria-live="polite">
      <div className="vitrine-sobre-skeleton__hero" aria-hidden />
      <div className="vitrine-sobre-skeleton__container">
        <div className="vitrine-sobre-skeleton__grid">
          <div className="vitrine-sobre-skeleton__card" aria-hidden />
          <div className="vitrine-sobre-skeleton__card" aria-hidden />
          <div className="vitrine-sobre-skeleton__card" aria-hidden />
          <div className="vitrine-sobre-skeleton__card" aria-hidden />
        </div>
      </div>
      <span className="vitrine-sobre-skeleton__label">Carregando página Sobre...</span>
    </div>
  )
}
