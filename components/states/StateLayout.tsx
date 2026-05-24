import type { ReactNode } from "react"

import { VitrineShell } from "@/components/layout/VitrineShell"
import { DefaultBrandingBar } from "@/components/states/DefaultBrandingBar"
import { getVitrineThemeStyle } from "@/src/lib/vitrine-theme"
import type { VitrineLoja } from "@/src/types/vitrine"

interface StateLayoutProps {
  loja?: VitrineLoja | null
  children: ReactNode
  withShell?: boolean
}

/**
 * Envolve estados de erro/404 com identidade da loja (shell completo) ou Gear Sales padrão.
 */
export function StateLayout({
  loja,
  children,
  withShell = true,
}: StateLayoutProps) {
  if (loja && withShell) {
    return <VitrineShell loja={loja}>{children}</VitrineShell>
  }

  return (
    <div
      className="vitrine vitrine--default-brand"
      style={getVitrineThemeStyle(loja?.corPrincipal)}
    >
      <DefaultBrandingBar />
      <div className="vitrine__body">{children}</div>
    </div>
  )
}
