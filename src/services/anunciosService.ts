import { cache } from "react"
import { revalidateTag } from "next/cache"

import { getApiBaseUrl } from "@/src/lib/api-config"
import { mapCatalogItemToVitrineAnuncio } from "@/src/lib/anuncios-mapper"
import type {
  GaragePublicCatalogItemResponse,
  GaragePublicCatalogListResponse,
} from "@/src/types/garage-public"
import type { VitrineAnuncio } from "@/src/types/anuncio"

export class AnunciosUnavailableError extends Error {
  constructor() {
    super("ANUNCIOS_UNAVAILABLE")
    this.name = "AnunciosUnavailableError"
  }
}

const ANUNCIOS_REVALIDATE_SECONDS = 120
const CATALOG_PAGE_SIZE = 100
const CATALOG_TAG = "anuncios:public-catalog"

/** Página única do catálogo público (helper interno paginado). */
async function fetchCatalogPage(
  page: number,
  size: number
): Promise<GaragePublicCatalogListResponse> {
  const baseUrl = getApiBaseUrl().replace(/\/$/, "")
  const query = new URLSearchParams({
    page: String(page),
    size: String(size),
  })
  const url = `${baseUrl}/garage/public/catalog?${query.toString()}`

  let response: Response
  try {
    response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "force-cache",
      next: {
        revalidate: ANUNCIOS_REVALIDATE_SECONDS,
        tags: [CATALOG_TAG],
      },
    })
  } catch {
    throw new AnunciosUnavailableError()
  }

  if (!response.ok) {
    throw new AnunciosUnavailableError()
  }

  return (await response.json()) as GaragePublicCatalogListResponse
}

/**
 * Lista todos os anúncios públicos disponíveis no Gear Garage.
 *
 * TODO: substituir por endpoint público dedicado por loja
 * (ex.: `/public/lojas/{lojaId}/anuncios`) quando o backend
 * disponibilizar — assim evitamos paginar/filtrar no cliente.
 */
async function listarTodosAnunciosPublicos(): Promise<GaragePublicCatalogItemResponse[]> {
  const first = await fetchCatalogPage(0, CATALOG_PAGE_SIZE)
  const items = [...first.items]

  const totalPages = first.totalPages || 0
  for (let page = 1; page < totalPages; page++) {
    const next = await fetchCatalogPage(page, CATALOG_PAGE_SIZE)
    items.push(...next.items)
  }

  return items
}

/**
 * Lista anúncios públicos de uma loja específica.
 *
 * Hoje filtra no cliente porque o backend público não expõe
 * `lojaId` como query param. Resultado é cacheado entre requests
 * para a mesma renderização e entre requisições subsequentes via tag.
 */
export const listarAnunciosPublicosPorLoja = cache(
  async (lojaId: string): Promise<VitrineAnuncio[]> => {
    if (!lojaId?.trim()) {
      return []
    }

    const todos = await listarTodosAnunciosPublicos()
    return todos
      .filter((item) => item.loja.id === lojaId)
      .map(mapCatalogItemToVitrineAnuncio)
  }
)

/**
 * Busca um único anúncio público pelo ID. Valida se ele realmente
 * pertence à loja antes de retornar — evita acesso cruzado entre vitrines.
 */
export const buscarAnuncioPublicoPorId = cache(
  async (
    lojaId: string,
    anuncioId: string
  ): Promise<VitrineAnuncio | undefined> => {
    if (!lojaId?.trim() || !anuncioId?.trim()) {
      return undefined
    }

    const baseUrl = getApiBaseUrl().replace(/\/$/, "")
    const url = `${baseUrl}/garage/public/catalog/${encodeURIComponent(anuncioId)}`

    let response: Response
    try {
      response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "force-cache",
        next: {
          revalidate: ANUNCIOS_REVALIDATE_SECONDS,
          tags: [CATALOG_TAG, `anuncio:${anuncioId}`],
        },
      })
    } catch {
      throw new AnunciosUnavailableError()
    }

    if (response.status === 404) {
      return undefined
    }

    if (!response.ok) {
      throw new AnunciosUnavailableError()
    }

    const item = (await response.json()) as GaragePublicCatalogItemResponse
    if (item.loja.id !== lojaId) {
      return undefined
    }

    return mapCatalogItemToVitrineAnuncio(item)
  }
)

/** Invalida todo o catálogo de anúncios públicos. */
export function revalidateAnunciosCache(): void {
  revalidateTag(CATALOG_TAG, "max")
}
