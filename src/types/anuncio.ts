export type VitrineAnuncioStatus =
  | "DISPONIVEL"
  | "RESERVADO"
  | "VENDIDO"
  | "INDISPONIVEL"

export interface VitrineAnuncio {
  id: string
  titulo: string
  marca: string
  modelo: string
  versao: string | null
  anoFabricacao: number
  anoModelo: number
  preco: number
  quilometragem: number
  cambio: string
  combustivel: string
  cor: string
  carroceria: string | null
  portas: number | null
  cidade: string | null
  estado: string | null
  descricao: string
  opcionais: string[]
  imagemCapaUrl: string
  imagens: string[]
  publicadoEm: string
  status: VitrineAnuncioStatus
}
