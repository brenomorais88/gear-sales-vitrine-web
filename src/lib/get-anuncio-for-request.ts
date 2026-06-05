import { cache } from "react"

import { getVitrineForRequest } from "@/src/lib/get-vitrine"
import { getVitrineApiDominio } from "@/src/lib/vitrine-domain"
import { fetchVitrineAnuncioDetalhe } from "@/src/services/vitrineAnunciosService"

/**
 * Busca vitrine + anúncio da requisição atual (deduplicado entre page e metadata).
 */
export const getAnuncioForRequest = cache(async (anuncioId: string) => {
  const vitrine = await getVitrineForRequest()
  const dominio = getVitrineApiDominio(vitrine)
  const anuncio = await fetchVitrineAnuncioDetalhe(anuncioId, dominio)

  return { vitrine, anuncio }
})
