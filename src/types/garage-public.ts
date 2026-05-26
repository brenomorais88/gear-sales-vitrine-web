/**
 * Espelho dos DTOs retornados por `GET /garage/public/catalog` e
 * `GET /garage/public/catalog/{id}`. Mantenha sempre alinhado ao
 * pacote `com.sales.features.garage` do backend.
 */
import type { VitrineAnuncioStatus } from "@/src/types/anuncio"

export interface GaragePublicAnuncioResponse {
  id: string
  /** Valor de venda em formato string (BigDecimalAsStringSerializer). */
  valorVenda: string
  status: VitrineAnuncioStatus
  descricao: string | null
  createdAt: string | null
  updatedAt: string | null
}

export interface GaragePublicVeiculoResponse {
  id: string
  ano: string
  anoFabricacao: string
  km: string
  blindado: boolean
}

export interface GaragePublicCorResponse {
  id: string
  nome: string
}

export interface GaragePublicMarcaResponse {
  id: string
  nome: string
  tipo: string
}

export interface GaragePublicModeloResponse {
  id: string
  nome: string
  marcaId: string
  marcaNome: string | null
}

export interface GaragePublicAnuncioImagemResponse {
  id: string
  url: string
  ordem: number
  isCapa: boolean
}

export interface GaragePublicLojaResponse {
  id: string
  nome: string | null
  cidade: string | null
  estado: string | null
  telefonePublico: string | null
  whatsappPublico: string | null
  descricaoPublica: string | null
}

export interface GaragePublicCatalogItemResponse {
  anuncio: GaragePublicAnuncioResponse
  veiculo: GaragePublicVeiculoResponse
  cor: GaragePublicCorResponse
  marca: GaragePublicMarcaResponse
  modelo: GaragePublicModeloResponse
  imagens: GaragePublicAnuncioImagemResponse[]
  loja: GaragePublicLojaResponse
}

export interface GaragePublicCatalogListResponse {
  items: GaragePublicCatalogItemResponse[]
  page: number
  size: number
  totalItems: number
  totalPages: number
}
