export interface VitrineLoja {
  id: string
  nome: string
  nomePublico: string
  descricao: string | null
  textoInstitucional: string | null
  telefone: string | null
  whatsapp: string | null
  email: string | null
  cidade: string | null
  estado: string | null
  endereco: string | null
  horarioFuncionamento: string | null
  logoUrl: string | null
  bannerUrl: string | null
  corPrincipal: string | null
  enderecoPaginaPublica: string
  urlPublica: string
}
