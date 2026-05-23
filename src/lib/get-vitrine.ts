import { cache } from "react"
import { headers } from "next/headers"

import { resolveVitrineDomain } from "@/src/lib/vitrine-domain"
import { buscarVitrinePorDominio } from "@/src/services/vitrineService"

/**
 * Busca a vitrine da requisição atual (deduplicado entre page e metadata).
 */
export const getVitrineForRequest = cache(async () => {
  const headersList = await headers()
  const dominio = resolveVitrineDomain(headersList.get("host"))
  return buscarVitrinePorDominio(dominio)
})
