/**
 * Espelho fiel do `PublicVitrineResponse` retornado pelo backend em
 * `GET /public/vitrine/por-dominio?dominio=<dominio>`.
 *
 * Qualquer campo derivado (nome de exibição, intro curta, etc.) deve
 * ser calculado em utilitários — nunca adicionado aqui sem existir na API.
 */
export interface VitrineLoja {
  id: string
  nome: string
  descricao: string | null
  telefone: string | null
  whatsapp: string | null
  email: string | null
  cidade: string | null
  estado: string | null
  logoUrl: string | null
  bannerUrl: string | null
  corPrincipal: string | null
  enderecoPaginaPublica: string
  urlPublica: string
}
