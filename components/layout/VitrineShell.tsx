import type { ReactNode } from "react"

import { VitrineFooter } from "@/components/layout/VitrineFooter"
import { VitrineHeader } from "@/components/layout/VitrineHeader"
import { getVitrineThemeStyle } from "@/src/lib/vitrine-theme"
import type { VitrineLoja } from "@/src/types/vitrine"

interface VitrineShellProps {
  loja: VitrineLoja
  children: ReactNode
}

export function VitrineShell({ loja, children }: VitrineShellProps) {
  return (
    <div className="vitrine" style={getVitrineThemeStyle(loja.corPrincipal)}>
      <a href="#conteudo-principal" className="skip-link">
        Ir para o conteúdo
      </a>
      <VitrineHeader loja={loja} />
      <div id="conteudo-principal" className="vitrine__body" tabIndex={-1}>
        {children}
      </div>
      <VitrineFooter loja={loja} />
    </div>
  )
}
