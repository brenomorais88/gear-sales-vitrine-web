/**
 * Tipos do catálogo público de anúncios.
 *
 * Mapeados a partir de `GaragePublicCatalogItemResponse` no backend
 * (endpoint `GET /garage/public/catalog`). Campos não retornados pelo
 * endpoint público são opcionais (`null`) e devem ser exibidos
 * apenas se presentes.
 */
export type VitrineAnuncioStatus =
  | "DISPONIVEL"
  | "RESERVADO"
  | "VENDIDO"
  | "INDISPONIVEL"

export interface VitrineAnuncio {
  id: string
  /** Loja dona do anúncio — usado para filtrar o catálogo público por vitrine. */
  lojaId: string
  titulo: string
  marca: string
  modelo: string
  versao: string | null
  anoFabricacao: number
  anoModelo: number
  preco: number
  quilometragem: number
  cambio: string | null
  combustivel: string | null
  cor: string
  carroceria: string | null
  portas: number | null
  cidade: string | null
  estado: string | null
  descricao: string
  opcionais: string[]
  imagemCapaUrl: string | null
  imagens: string[]
  publicadoEm: string
  status: VitrineAnuncioStatus
}
