import Link from "next/link"

import { StatePage } from "@/components/states/StatePage"

export function PageNotFound() {
  return (
    <StatePage
      statusCode="404"
      icon="not-found"
      title="Página não encontrada"
      description="O endereço acessado não existe ou não está mais disponível."
    >
      <Link href="/" className="vitrine-btn vitrine-btn--primary">
        Voltar para a vitrine
      </Link>
    </StatePage>
  )
}
