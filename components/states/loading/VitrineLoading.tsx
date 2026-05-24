interface VitrineLoadingProps {
  message?: string
}

export function VitrineLoading({
  message = "Carregando vitrine...",
}: VitrineLoadingProps) {
  return (
    <div className="vitrine-loading" role="status" aria-live="polite">
      <div className="vitrine-loading__spinner" aria-hidden />
      <p>{message}</p>
    </div>
  )
}
