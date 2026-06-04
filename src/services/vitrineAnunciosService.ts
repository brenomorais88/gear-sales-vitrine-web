import { getApiBaseUrl } from "@/src/lib/api-config"
import type {
  PublicVitrineAnuncioListResponse,
  PublicVitrineFiltersResponse,
} from "@/src/types/vitrine"

export class VitrineAnunciosError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "VitrineAnunciosError"
  }
}

/**
 * Constrói query string omitindo valores vazios/null/undefined
 */
function buildQueryString(params: Record<string, string | number | null | undefined>): string {
  const entries = Object.entries(params)
    .filter(([, value]) => value != null && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)

  return entries.length > 0 ? `?${entries.join("&")}` : ""
}

/**
 * Busca lista de anúncios com filtros e paginação
 */
export async function fetchVitrineAnuncios(params: {
  dominio: string
  page?: number
  size?: number
  marcaId?: string | null
  modeloId?: string | null
  anoMin?: string | null
  anoMax?: string | null
  kmMin?: string | null
  kmMax?: string | null
  valorMin?: string | null
  valorMax?: string | null
  texto?: string | null
  sort?: string | null
}): Promise<PublicVitrineAnuncioListResponse> {
  const baseUrl = getApiBaseUrl()

  if (!params.dominio?.trim()) {
    throw new VitrineAnunciosError("dominio é obrigatório para buscar anúncios")
  }

  const queryParams = {
    dominio: params.dominio.trim(),
    page: params.page ?? 0,
    size: params.size ?? 12,
    ...(params.marcaId && { marcaId: params.marcaId }),
    ...(params.modeloId && { modeloId: params.modeloId }),
    ...(params.anoMin && { anoMin: params.anoMin }),
    ...(params.anoMax && { anoMax: params.anoMax }),
    ...(params.kmMin && { kmMin: params.kmMin }),
    ...(params.kmMax && { kmMax: params.kmMax }),
    ...(params.valorMin && { valorMin: params.valorMin }),
    ...(params.valorMax && { valorMax: params.valorMax }),
    ...(params.texto && { texto: params.texto }),
    ...(params.sort && { sort: params.sort }),
  }

  const queryString = buildQueryString(queryParams)
  const url = `${baseUrl}/vitrine/anuncios${queryString}`

  let response: Response

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 300 },
    })
  } catch (error) {
    throw new VitrineAnunciosError(
      `Erro ao buscar anúncios: ${error instanceof Error ? error.message : String(error)}`
    )
  }

  if (!response.ok) {
    throw new VitrineAnunciosError(
      `Erro ao buscar anúncios. Status: ${response.status}`
    )
  }

  return response.json() as Promise<PublicVitrineAnuncioListResponse>
}

/**
 * Busca opções de filtros para uma vitrine
 */
export async function fetchVitrineFiltros(
  dominio: string
): Promise<PublicVitrineFiltersResponse> {
  const baseUrl = getApiBaseUrl()
  const url = `${baseUrl}/vitrine/filtros?dominio=${encodeURIComponent(dominio)}`

  let response: Response

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 300 },
    })
  } catch (error) {
    throw new VitrineAnunciosError(
      `Erro ao buscar filtros: ${error instanceof Error ? error.message : String(error)}`
    )
  }

  if (!response.ok) {
    throw new VitrineAnunciosError(
      `Erro ao buscar filtros. Status: ${response.status}`
    )
  }

  return response.json() as Promise<PublicVitrineFiltersResponse>
}
