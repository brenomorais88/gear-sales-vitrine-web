import { StoreContactOptions } from "@/components/shared/StoreContactOptions"
import type { VitrineLoja } from "@/src/types/vitrine"

interface SobreCtasProps {
  loja: VitrineLoja
}

export function SobreCtas({ loja }: SobreCtasProps) {
  return (
    <section className="sobre-ctas" aria-label="Ações">
      <StoreContactOptions loja={loja} showCatalogLink variant="stacked" />
    </section>
  )
}
