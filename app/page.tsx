import type { Metadata } from "next"

import { VitrineError } from "@/components/vitrine/VitrineError"
import { VitrineHome } from "@/components/vitrine/VitrineHome"
import { VitrineNotFound } from "@/components/vitrine/VitrineNotFound"
import { VitrineLayout } from "@/components/vitrine/VitrineLayout"
import { getVitrineForRequest } from "@/src/lib/get-vitrine"
import { loadVitrinePage } from "@/src/lib/load-vitrine-page"
import {
  buildHomeSeoMetadata,
  buildVitrineSeoFallbackMetadata,
  getRequestOrigin,
} from "@/src/lib/vitrine-seo"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [vitrine, requestOrigin] = await Promise.all([
      getVitrineForRequest(),
      getRequestOrigin(),
    ])

    return buildHomeSeoMetadata(vitrine, requestOrigin)
  } catch {
    return buildVitrineSeoFallbackMetadata("home")
  }
}

export default async function HomePage() {
  const { state, vitrine } = await loadVitrinePage()

  if (state === "not_found") {
    return <VitrineNotFound />
  }

  if (state === "error" || !vitrine) {
    return <VitrineError />
  }

  return (
    <VitrineLayout vitrine={vitrine} fullWidth>
      <VitrineHome vitrine={vitrine} />
    </VitrineLayout>
  )
}
