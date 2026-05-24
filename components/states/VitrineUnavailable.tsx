import { StatePage } from "@/components/states/StatePage"

/**
 * Loja/vitrine não encontrada (ex.: API 404 no domínio).
 */
export function VitrineUnavailable() {
  return (
    <StatePage
      statusCode="404"
      icon="not-found"
      title="Vitrine não encontrada"
      description="Verifique se o endereço está correto ou se a loja ainda está ativa."
    />
  )
}
