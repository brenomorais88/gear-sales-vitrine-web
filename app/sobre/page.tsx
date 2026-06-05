import type { Metadata } from "next"

import { VitrineError } from "@/components/vitrine/VitrineError"
import { VitrineNotFound } from "@/components/vitrine/VitrineNotFound"
import { VitrineLayout } from "@/components/vitrine/VitrineLayout"
import { VitrineSobre } from "@/components/vitrine/VitrineSobre"
import { getVitrineForRequest } from "@/src/lib/get-vitrine"
import { loadVitrinePage } from "@/src/lib/load-vitrine-page"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const vitrine = await getVitrineForRequest()

    return {
      title: `Sobre - ${vitrine.nome}`,
      description:
        vitrine.descricao?.trim() ||
        `Conheça a ${vitrine.nome} e veja os veículos disponíveis em nossa vitrine.`,
    }
  } catch {
    return {
      title: "Sobre",
      description: "Conheça nossa loja e veja os veículos disponíveis.",
    }
  }
}

export default async function SobrePage() {
  const { state, vitrine } = await loadVitrinePage()

  if (state === "not_found") {
    return <VitrineNotFound />
  }

  if (state === "error" || !vitrine) {
    return <VitrineError />
  }

  return (
    <VitrineLayout vitrine={vitrine}>
      <VitrineSobre vitrine={vitrine} />
    </VitrineLayout>
  )
}
