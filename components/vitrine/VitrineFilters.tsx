"use client"

import { useState, useCallback, useMemo } from "react"
import type {
  PublicVitrineFiltersResponse,
  PublicVitrineAppliedFiltersResponse,
} from "@/src/types/vitrine"

interface VitrineFiltersProps {
  filtros: PublicVitrineFiltersResponse | null
  aplicados: PublicVitrineAppliedFiltersResponse | null
  onFiltersChange: (filtros: PublicVitrineAppliedFiltersResponse) => void
  isLoading: boolean
}

function countActiveFilters(
  aplicados: PublicVitrineAppliedFiltersResponse | null
): number {
  if (!aplicados) {
    return 0
  }

  return Object.values(aplicados).filter((value) => value != null && value !== "").length
}

export function VitrineFilters({
  filtros,
  aplicados,
  onFiltersChange,
  isLoading,
}: VitrineFiltersProps) {
  const [texto, setTexto] = useState(aplicados?.texto || "")
  const [marcaId, setMarcaId] = useState(aplicados?.marcaId || "")
  const [modeloId, setModeloId] = useState(aplicados?.modeloId || "")
  const [anoMin, setAnoMin] = useState(aplicados?.anoMin || "")
  const [anoMax, setAnoMax] = useState(aplicados?.anoMax || "")
  const [kmMin, setKmMin] = useState(aplicados?.kmMin || "")
  const [kmMax, setKmMax] = useState(aplicados?.kmMax || "")
  const [valorMin, setValorMin] = useState(aplicados?.valorMin || "")
  const [valorMax, setValorMax] = useState(aplicados?.valorMax || "")
  const [mobileOpen, setMobileOpen] = useState(false)

  const activeCount = useMemo(() => countActiveFilters(aplicados), [aplicados])

  const modelosFiltrados = useMemo(() => {
    return marcaId
      ? filtros?.modelos.filter((m) => m.marcaId === marcaId) ?? []
      : filtros?.modelos ?? []
  }, [marcaId, filtros?.modelos])

  const handleMarcaChange = useCallback(
    (novaMarca: string) => {
      setMarcaId(novaMarca)

      if (!novaMarca) {
        setModeloId("")
        return
      }

      if (modeloId) {
        const modeloPertence = filtros?.modelos.some(
          (modelo) => modelo.id === modeloId && modelo.marcaId === novaMarca
        )

        if (!modeloPertence) {
          setModeloId("")
        }
      }
    },
    [filtros?.modelos, modeloId]
  )

  const handleAplicarFiltros = useCallback(() => {
    const novosFiltros: PublicVitrineAppliedFiltersResponse = {}

    if (texto) novosFiltros.texto = texto
    if (marcaId) novosFiltros.marcaId = marcaId
    if (modeloId) novosFiltros.modeloId = modeloId
    if (anoMin) novosFiltros.anoMin = anoMin
    if (anoMax) novosFiltros.anoMax = anoMax
    if (kmMin) novosFiltros.kmMin = kmMin
    if (kmMax) novosFiltros.kmMax = kmMax
    if (valorMin) novosFiltros.valorMin = valorMin
    if (valorMax) novosFiltros.valorMax = valorMax

    onFiltersChange(novosFiltros)
    setMobileOpen(false)
  }, [texto, marcaId, modeloId, anoMin, anoMax, kmMin, kmMax, valorMin, valorMax, onFiltersChange])

  const handleLimparFiltros = useCallback(() => {
    setTexto("")
    setMarcaId("")
    setModeloId("")
    setAnoMin("")
    setAnoMax("")
    setKmMin("")
    setKmMax("")
    setValorMin("")
    setValorMax("")
    onFiltersChange({})
    setMobileOpen(false)
  }, [onFiltersChange])

  if (!filtros) {
    return null
  }

  return (
    <div className={`vitrine-filters${mobileOpen ? " vitrine-filters--open" : ""}`}>
      <div className="vitrine-filters__header">
        <button
          type="button"
          className="vitrine-filters__toggle"
          aria-expanded={mobileOpen}
          aria-controls="vitrine-filters-panel"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="vitrine-filters__toggle-label">
            Filtrar veículos
            {activeCount > 0 && (
              <span className="vitrine-filters__badge">{activeCount}</span>
            )}
          </span>
          <span className="vitrine-filters__toggle-icon" aria-hidden>
            {mobileOpen ? "−" : "+"}
          </span>
        </button>
        <h3 className="vitrine-filters__title-desktop">Filtrar veículos</h3>
        {activeCount > 0 && (
          <span className="vitrine-filters__active-note">
            {`${activeCount} filtro${activeCount !== 1 ? "s" : ""} ativo${activeCount !== 1 ? "s" : ""}`}
          </span>
        )}
      </div>

      <div className="vitrine-filters__content" id="vitrine-filters-panel">
        <div className="vitrine-filters__group">
          <label htmlFor="filtro-texto" className="vitrine-filters__label">
            Buscar
          </label>
          <input
            id="filtro-texto"
            type="search"
            placeholder="Modelo, marca, placa..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="vitrine-filters__input"
            disabled={isLoading}
          />
        </div>

        {filtros.marcas.length > 0 && (
          <div className="vitrine-filters__group">
            <label htmlFor="filtro-marca" className="vitrine-filters__label">
              Marca
            </label>
            <select
              id="filtro-marca"
              value={marcaId}
              onChange={(e) => handleMarcaChange(e.target.value)}
              className="vitrine-filters__select"
              disabled={isLoading}
            >
              <option value="">Todas</option>
              {filtros.marcas.map((marca) => (
                <option key={marca.id} value={marca.id}>
                  {marca.nome}
                </option>
              ))}
            </select>
          </div>
        )}

        {modelosFiltrados.length > 0 && (
          <div className="vitrine-filters__group">
            <label htmlFor="filtro-modelo" className="vitrine-filters__label">
              Modelo
            </label>
            <select
              id="filtro-modelo"
              value={modeloId}
              onChange={(e) => setModeloId(e.target.value)}
              className="vitrine-filters__select"
              disabled={isLoading || !marcaId}
            >
              <option value="">Todos</option>
              {modelosFiltrados.map((modelo) => (
                <option key={modelo.id} value={modelo.id}>
                  {modelo.nome}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="vitrine-filters__row">
          <div className="vitrine-filters__group">
            <label htmlFor="filtro-ano-min" className="vitrine-filters__label">
              Ano de / até
            </label>
            <div className="vitrine-filters__range-row">
              <input
                id="filtro-ano-min"
                type="number"
                placeholder="De"
                value={anoMin}
                onChange={(e) => setAnoMin(e.target.value)}
                className="vitrine-filters__input-small"
                disabled={isLoading}
                inputMode="numeric"
              />
              <input
                type="number"
                placeholder="Até"
                value={anoMax}
                onChange={(e) => setAnoMax(e.target.value)}
                className="vitrine-filters__input-small"
                disabled={isLoading}
                inputMode="numeric"
                aria-label="Ano até"
              />
            </div>
          </div>
        </div>

        <div className="vitrine-filters__row">
          <div className="vitrine-filters__group">
            <label htmlFor="filtro-km-min" className="vitrine-filters__label">
              KM de / até
            </label>
            <div className="vitrine-filters__range-row">
              <input
                id="filtro-km-min"
                type="number"
                placeholder="De"
                value={kmMin}
                onChange={(e) => setKmMin(e.target.value)}
                className="vitrine-filters__input-small"
                disabled={isLoading}
                inputMode="numeric"
              />
              <input
                type="number"
                placeholder="Até"
                value={kmMax}
                onChange={(e) => setKmMax(e.target.value)}
                className="vitrine-filters__input-small"
                disabled={isLoading}
                inputMode="numeric"
                aria-label="Quilometragem até"
              />
            </div>
          </div>
        </div>

        <div className="vitrine-filters__row">
          <div className="vitrine-filters__group">
            <label htmlFor="filtro-valor-min" className="vitrine-filters__label">
              Valor de / até
            </label>
            <div className="vitrine-filters__range-row">
              <input
                id="filtro-valor-min"
                type="number"
                placeholder="De"
                value={valorMin}
                onChange={(e) => setValorMin(e.target.value)}
                className="vitrine-filters__input-small"
                disabled={isLoading}
                inputMode="numeric"
              />
              <input
                type="number"
                placeholder="Até"
                value={valorMax}
                onChange={(e) => setValorMax(e.target.value)}
                className="vitrine-filters__input-small"
                disabled={isLoading}
                inputMode="numeric"
                aria-label="Valor até"
              />
            </div>
          </div>
        </div>

        <div className="vitrine-filters__actions">
          <button
            type="button"
            onClick={handleAplicarFiltros}
            disabled={isLoading}
            className="vitrine-filters__btn vitrine-filters__btn--primary"
          >
            Aplicar filtros
          </button>
          <button
            type="button"
            onClick={handleLimparFiltros}
            disabled={isLoading || activeCount === 0}
            className="vitrine-filters__btn vitrine-filters__btn--secondary"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  )
}
