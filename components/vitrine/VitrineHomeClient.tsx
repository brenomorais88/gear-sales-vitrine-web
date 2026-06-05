"use client"

import { useState, useCallback, useEffect } from "react"
import { VitrineFilters } from "@/components/vitrine/VitrineFilters"
import { VitrineAnunciosGrid } from "@/components/vitrine/VitrineAnunciosGrid"
import { getVitrineApiDominio } from "@/src/lib/vitrine-domain"
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
  const [filtersResetKey, setFiltersResetKey] = useState(0)

  const apiDominio = useCallback(() => getVitrineApiDominio(vitrine), [vitrine])

  // Carregar filtros
  useEffect(() => {
    const carregarFiltros = async () => {
      try {
        setIsLoadingFiltros(true)
        setError(null)
        const dominio = apiDominio()
        const dados = await fetchVitrineFiltros(dominio)
        setFiltros(dados)
      } catch {
        setError("Não foi possível carregar os filtros")
      } finally {
        setIsLoadingFiltros(false)
      }
    }

    carregarFiltros()
  }, [apiDominio])

  // Carregar anúncios
  useEffect(() => {
    const carregarAnuncios = async () => {
      try {
        setIsLoadingAnuncios(true)
        setError(null)
        const dominio = apiDominio()
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
  }, [page, sort, aplicadosFiltros, apiDominio])

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

  return (
    <div className="vitrine-home-client">
      <section id="estoque" className="vitrine-anuncios-main">
        <div className="vitrine-anuncios-container">
          <div className="vitrine-anuncios-layout">
            {/* Sidebar com Filtros */}
            <aside className="vitrine-anuncios-sidebar">
              <VitrineFilters
                key={filtersResetKey}
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
                      setFiltersResetKey((key) => key + 1)
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
