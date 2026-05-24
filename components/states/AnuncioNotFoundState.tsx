import Link from "next/link"

import { StatePage } from "@/components/states/StatePage"

/**
 * Anúncio inexistente ou removido.
 */
export function AnuncioNotFoundState() {
  return (
    <StatePage
      statusCode="404"
      icon="not-found"
      title="Anúncio não encontrado"
      description="Este veículo pode ter sido vendido ou removido pela loja."
      compact
    >
      <Link href="/#veiculos" className="vitrine-btn vitrine-btn--primary">
        Ver outros veículos
      </Link>
      <Link href="/" className="vitrine-btn vitrine-btn--outline">
        Voltar para o início
      </Link>
    </StatePage>
  )
}
