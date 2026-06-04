import type { ReactNode } from "react"

import type { VitrineLoja } from "@/src/types/vitrine"
import { VitrineHeader } from "@/components/vitrine/VitrineHeader"
import { VitrineFooter } from "@/components/vitrine/VitrineFooter"

interface VitrineLayoutProps {
  vitrine: VitrineLoja
  children: ReactNode
}

export function VitrineLayout({ vitrine, children }: VitrineLayoutProps) {
  return (
    <div className="vitrine">
      <VitrineHeader vitrine={vitrine} />
      <main className="vitrine-layout-main" id="inicio">
        {children}
      </main>
      <VitrineFooter vitrine={vitrine} />
    </div>
  )
}
