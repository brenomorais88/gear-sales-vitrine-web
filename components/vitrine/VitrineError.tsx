import { VitrineStatePage } from "@/components/vitrine/VitrineStatePage"

export function VitrineError() {
  return (
    <VitrineStatePage
      title="Não foi possível carregar esta vitrine no momento."
      description="Tente novamente em alguns instantes."
    />
  )
}
