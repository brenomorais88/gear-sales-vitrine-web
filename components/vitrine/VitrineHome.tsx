import type { VitrineLoja } from "@/src/types/vitrine"
import { VitrineHomeClient } from "@/components/vitrine/VitrineHomeClient"

interface VitrineHomeProps {
  vitrine: VitrineLoja
}

export function VitrineHome({ vitrine }: VitrineHomeProps) {
  return <VitrineHomeClient vitrine={vitrine} />
}

