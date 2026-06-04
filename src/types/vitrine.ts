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

// Tipos para Anúncios e Filtros (V2)

export interface PublicVitrineSimpleOptionResponse {
  id: string
  nome: string
}

export interface PublicVitrineModeloOptionResponse {
  id: string
  nome: string
  marcaId: string
}

export interface PublicVitrineRangeResponse {
  min?: string | null
  max?: string | null
}

export interface PublicVitrineSortOptionResponse {
  value: string
  label: string
}

export interface PublicVitrineAnuncioCardResponse {
  id: string
  titulo: string
  valorVenda: string
  descricaoResumo?: string | null
  marca: PublicVitrineSimpleOptionResponse
  modelo: PublicVitrineSimpleOptionResponse
  anoFabricacao?: string | null
  anoModelo?: string | null
  quilometragem?: string | null
  cambio?: string | null
  combustivel?: string | null
  cor?: string | null
  cidade?: string | null
  estado?: string | null
  fotoPrincipalUrl?: string | null
  totalFotos: number
  createdAt?: string | null
  updatedAt?: string | null
}

export interface PublicVitrineAppliedFiltersResponse {
  marcaId?: string | null
  modeloId?: string | null
  anoMin?: string | null
  anoMax?: string | null
  kmMin?: string | null
  kmMax?: string | null
  valorMin?: string | null
  valorMax?: string | null
  texto?: string | null
}

export interface PublicVitrineAnuncioListResponse {
  items: PublicVitrineAnuncioCardResponse[]
  page: number
  size: number
  totalItems: number
  totalPages: number
  sort?: string | null
  appliedFilters?: PublicVitrineAppliedFiltersResponse | null
}

export interface PublicVitrineFiltersResponse {
  marcas: PublicVitrineSimpleOptionResponse[]
  modelos: PublicVitrineModeloOptionResponse[]
  anos?: PublicVitrineRangeResponse | null
  valores?: PublicVitrineRangeResponse | null
  quilometragem?: PublicVitrineRangeResponse | null
  cambios: string[]
  combustiveis: string[]
  sortOptions: PublicVitrineSortOptionResponse[]
}

// Tipos para Detalhes do Anúncio (V3)

export interface PublicVitrineAnuncioFoto {
  id: string
  url: string
  ordem?: number | null
  principal?: boolean | null
}

export interface PublicVitrineLojaResumo {
  id: string
  nome: string
  telefone?: string | null
  whatsapp?: string | null
  email?: string | null
  cidade?: string | null
  estado?: string | null
  logoUrl?: string | null
  corPrincipal?: string | null
  urlPublica?: string | null
}

export interface PublicVitrineAnuncioDetalhe {
  id: string
  titulo: string
  valorVenda: string
  descricao?: string | null
  marca: PublicVitrineSimpleOptionResponse
  modelo: PublicVitrineSimpleOptionResponse
  anoFabricacao?: string | null
  anoModelo?: string | null
  quilometragem?: string | null
  cambio?: string | null
  combustivel?: string | null
  cor?: string | null
  carroceria?: string | null
  portas?: string | null
  cidade?: string | null
  estado?: string | null
  fotos: PublicVitrineAnuncioFoto[]
  loja: PublicVitrineLojaResumo
  createdAt?: string | null
  updatedAt?: string | null
}

