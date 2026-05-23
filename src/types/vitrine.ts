export interface VitrineLoja {
  id: string
  nome: string
  descricao?: string | null
  telefone?: string | null
  whatsapp?: string | null
  email?: string | null
  cidade?: string | null
  estado?: string | null
  logoUrl?: string | null
  bannerUrl?: string | null
  corPrincipal?: string | null
  enderecoPaginaPublica: string
  urlPublica: string
}
