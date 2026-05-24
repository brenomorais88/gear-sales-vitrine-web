export type OrdenacaoAnuncios =
  | "mais_recentes"
  | "menor_preco"
  | "maior_preco"
  | "menor_km"

export interface FiltrosAnuncios {
  busca: string
  marca: string
  modelo: string
  precoMin: string
  precoMax: string
  anoMin: string
  anoMax: string
  cambio: string
  combustivel: string
}

export const FILTROS_INICIAIS: FiltrosAnuncios = {
  busca: "",
  marca: "todos",
  modelo: "todos",
  precoMin: "",
  precoMax: "",
  anoMin: "",
  anoMax: "",
  cambio: "todos",
  combustivel: "todos",
}

export const ORDENACAO_OPCOES: { value: OrdenacaoAnuncios; label: string }[] = [
  { value: "mais_recentes", label: "Mais recentes" },
  { value: "menor_preco", label: "Menor preço" },
  { value: "maior_preco", label: "Maior preço" },
  { value: "menor_km", label: "Menor km" },
]
