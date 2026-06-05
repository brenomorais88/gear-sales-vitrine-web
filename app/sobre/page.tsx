import type { Metadata } from "next"

import { VitrineError } from "@/components/vitrine/VitrineError"
import { VitrineNotFound } from "@/components/vitrine/VitrineNotFound"
import { VitrineLayout } from "@/components/vitrine/VitrineLayout"
import { VitrineSobre } from "@/components/vitrine/VitrineSobre"
import { getVitrineForRequest } from "@/src/lib/get-vitrine"
import { getVitrineApiDominio } from "@/src/lib/vitrine-domain"
import { loadVitrinePage } from "@/src/lib/load-vitrine-page"
import {
  buildSobreSeoMetadata,
  buildVitrineSeoFallbackMetadata,
  getRequestOrigin,
} from "@/src/lib/vitrine-seo"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [vitrine, requestOrigin] = await Promise.all([
      getVitrineForRequest(),
      getRequestOrigin(),
    ])

    return buildSobreSeoMetadata(vitrine, requestOrigin)
  } catch {
    return buildVitrineSeoFallbackMetadata("sobre")
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
    <VitrineLayout vitrine={vitrine} fullWidth>
      <VitrineSobre vitrine={vitrine} dominio={getVitrineApiDominio(vitrine)} />
    </VitrineLayout>
  )
}
