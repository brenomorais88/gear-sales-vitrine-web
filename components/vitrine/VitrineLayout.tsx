import type { CSSProperties, ReactNode } from "react"

import type { VitrineLoja } from "@/src/types/vitrine"
import { VitrineHeader } from "@/components/vitrine/VitrineHeader"
import { VitrineFooter } from "@/components/vitrine/VitrineFooter"
import { getVitrineTheme } from "@/src/lib/vitrine-theme"

interface VitrineLayoutProps {
  vitrine: VitrineLoja
  children: ReactNode
  fullWidth?: boolean
}

export function VitrineLayout({
  vitrine,
  children,
  fullWidth = false,
}: VitrineLayoutProps) {
  const theme = getVitrineTheme(vitrine.corPrincipal)

  return (
    <div
      className="vitrine"
      style={
        {
          "--vitrine-primary": theme.primaryColor,
          "--vitrine-header-text": theme.textColor,
        } as CSSProperties
      }
    >
      <VitrineHeader vitrine={vitrine} />
      <main
        className={`vitrine-layout-main${fullWidth ? " vitrine-layout-main--wide" : ""}`}
        id="inicio"
      >
        {children}
      </main>
      <VitrineFooter vitrine={vitrine} />
    </div>
  )
}
