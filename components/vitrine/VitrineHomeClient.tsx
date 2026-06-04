"use client"

import { useState, useCallback, useEffect } from "react"
import { VitrineFilters } from "@/components/vitrine/VitrineFilters"
import { VitrineAnunciosGrid } from "@/components/vitrine/VitrineAnunciosGrid"
import { fetchVitrineAnuncios, fetchVitrineFiltros } from "@/src/services/vitrineAnunciosService"
import type {
  VitrineLoja,
  PublicVitrineAnuncioListResponse,
  PublicVitrineFiltersResponse,
  PublicVitrineAppliedFiltersResponse,
} from "@/src/types/vitrine"

interface VitrineHomeClientProps {
  vitrine: VitrineLoja
}

export function VitrineHomeClient({ vitrine }: VitrineHomeClientProps) {
  const [filtros, setFiltros] = useState<PublicVitrineFiltersResponse | null>(
    null
  )
  const [anuncios, setAnuncios] = useState<PublicVitrineAnuncioListResponse | null>(null)
  const [aplicadosFiltros, setAplicadosFiltros] =
    useState<PublicVitrineAppliedFiltersResponse>({})
  const [page, setPage] = useState(0)
  const [sort, setSort] = useState("mais_recentes")
  const [isLoadingFiltros, setIsLoadingFiltros] = useState(true)
  const [isLoadingAnuncios, setIsLoadingAnuncios] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getDominio = useCallback(() => {
    if (typeof window !== "undefined") {
      return window.location.host
    }
    return process.env.NEXT_PUBLIC_VITRINE_HOST || ""
  }, [])

  // Carregar filtros
  useEffect(() => {
    const carregarFiltros = async () => {
      try {
        setIsLoadingFiltros(true)
        setError(null)
        const dominio = getDominio()
        const dados = await fetchVitrineFiltros(dominio)
        setFiltros(dados)
      } catch {
        setError("Não foi possível carregar os filtros")
      } finally {
        setIsLoadingFiltros(false)
      }
    }

    carregarFiltros()
  }, [getDominio])

  // Carregar anúncios
  useEffect(() => {
    const carregarAnuncios = async () => {
      try {
        setIsLoadingAnuncios(true)
        setError(null)
        const dominio = getDominio()
        const dados = await fetchVitrineAnuncios({
          dominio,
          page,
          size: 12,
          sort,
          ...aplicadosFiltros,
        })
        setAnuncios(dados)
      } catch {
        setError("Não foi possível carregar os anúncios")
        setAnuncios(null)
      } finally {
        setIsLoadingAnuncios(false)
      }
    }

    carregarAnuncios()
  }, [page, sort, aplicadosFiltros, getDominio])

  const handleFiltrosChange = useCallback(
    (novosFiltros: PublicVitrineAppliedFiltersResponse) => {
      setAplicadosFiltros(novosFiltros)
      setPage(0) // Reset page quando filtros mudam
    },
    []
  )

  const handleSortChange = useCallback((novoSort: string) => {
    setSort(novoSort)
    setPage(0) // Reset page quando ordenação muda
  }, [])

  const handlePageChange = useCallback((novaPagina: number) => {
    setPage(novaPagina)
    // Scroll suave para a seção de estoque
    setTimeout(() => {
      const elemento = document.getElementById("estoque")
      if (elemento) {
        elemento.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }, [])

  // Fallback de opções de ordenação
  const sortOptions = filtros?.sortOptions || [
    { value: "mais_recentes", label: "Mais recentes" },
    { value: "menor_preco", label: "Menor preço" },
    { value: "maior_preco", label: "Maior preço" },
    { value: "menor_km", label: "Menor quilometragem" },
    { value: "ano_mais_novo", label: "Ano mais novo" },
    { value: "ano_mais_antigo", label: "Ano mais antigo" },
  ]

  const descricao = vitrine.descricao?.trim() || 
    "Confira os veículos disponíveis e fale diretamente com a revenda."
  const localizacao = vitrine.cidade && vitrine.estado 
    ? `${vitrine.cidade}, ${vitrine.estado}`
    : null

  return (
    <div className="vitrine-home-client">
      {/* Hero Section */}
      <section className="vitrine-hero">
        <div className="vitrine-hero__container">
          <div className="vitrine-hero__content">
            <h1 className="vitrine-hero__title">{vitrine.nome}</h1>
            <p className="vitrine-hero__description">{descricao}</p>
            {localizacao && (
              <p className="vitrine-hero__location">{localizacao}</p>
            )}
            <div className="vitrine-hero__actions">
              <a
                href="#estoque"
                className="vitrine-hero__btn vitrine-hero__btn--primary"
              >
                Ver veículos
              </a>
              {vitrine.whatsapp && (
                <a
                  href={`https://wa.me/${vitrine.whatsapp.replace(/\D/g, "")}?text=Olá, encontrei a vitrine da ${encodeURIComponent(vitrine.nome)} e gostaria de mais informações.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vitrine-hero__btn vitrine-hero__btn--secondary"
                >
                  Falar no WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filtros e Listagem */}
      <section id="estoque" className="vitrine-anuncios-main">
        <div className="vitrine-anuncios-container">
          <div className="vitrine-anuncios-layout">
            {/* Sidebar com Filtros */}
            <aside className="vitrine-anuncios-sidebar">
              <VitrineFilters
                filtros={filtros}
                aplicados={aplicadosFiltros}
                onFiltersChange={handleFiltrosChange}
                isLoading={isLoadingFiltros || isLoadingAnuncios}
              />
            </aside>

            {/* Grid de Anúncios */}
            <main className="vitrine-anuncios-main-content">
              {/* Ordenação */}
              <div className="vitrine-sort-bar">
                <label htmlFor="sort-select" className="vitrine-sort-label">
                  Ordenar por:
                </label>
                <select
                  id="sort-select"
                  value={sort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="vitrine-sort-select"
                  disabled={isLoadingAnuncios}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mensagem de erro */}
              {error && (
                <div className="vitrine-error-banner">
                  <p>{error}</p>
                  <button
                    onClick={() => {
                      setPage(0)
                      setAplicadosFiltros({})
                      setSort("mais_recentes")
                    }}
                    className="vitrine-error-banner__btn"
                  >
                    Tentar novamente
                  </button>
                </div>
              )}

              {/* Grid de Anúncios */}
              <VitrineAnunciosGrid
                response={anuncios}
                isLoading={isLoadingAnuncios}
                onPageChange={handlePageChange}
              />
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
