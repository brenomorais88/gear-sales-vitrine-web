import { cache } from "react"
import { headers } from "next/headers"

import { resolveVitrineDomain } from "@/src/lib/vitrine-domain"
import { buscarVitrineMockPorDominio } from "@/src/services/vitrineMockService"

/**
 * Busca a vitrine da requisição atual (deduplicado entre page e metadata).
 * V1: dados mockados — sem consumo de API real.
 */
export const getVitrineForRequest = cache(async () => {
  const headersList = await headers()
  const dominio = resolveVitrineDomain(headersList.get("host"))
  return buscarVitrineMockPorDominio(dominio)
})
