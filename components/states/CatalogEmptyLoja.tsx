import type { ReactNode } from "react"

import { StatePage } from "@/components/states/StatePage"

interface CatalogEmptyLojaProps {
  action?: ReactNode
}

export function CatalogEmptyLoja({ action }: CatalogEmptyLojaProps) {
  return (
    <div className="catalog-empty">
      <StatePage
        icon="empty"
        title="Nenhum veículo disponível"
        description="No momento esta loja não possui veículos disponíveis. Entre em contato para saber sobre novas oportunidades."
        compact
      >
        {action}
      </StatePage>
    </div>
  )
}
