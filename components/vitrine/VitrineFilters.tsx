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

  // Filtrar modelos baseado na marca selecionada (memoizado)
  const modelosFiltrados = useMemo(() => {
    return marcaId
      ? filtros?.modelos.filter((m) => m.marcaId === marcaId) ?? []
      : filtros?.modelos ?? []
  }, [marcaId, filtros?.modelos])

  // Se trocar marca e o modelo selecionado não pertence à nova marca, limpar modelo
  if (marcaId && modeloId) {
    const modeloPertence = modelosFiltrados.some((m) => m.id === modeloId)
    if (!modeloPertence) {
      setModeloId("")
    }
  }

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
  }, [onFiltersChange])

  if (!filtros) {
    return null
  }

  return (
    <div className="vitrine-filters">
      <div className="vitrine-filters__header">
        <h3>Filtrar veículos</h3>
      </div>

      <div className="vitrine-filters__content">
        {/* Busca por texto */}
        <div className="vitrine-filters__group">
          <label htmlFor="filtro-texto" className="vitrine-filters__label">
            Buscar
          </label>
          <input
            id="filtro-texto"
            type="text"
            placeholder="Modelo, marca, placa..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="vitrine-filters__input"
            disabled={isLoading}
          />
        </div>

        {/* Marca */}
        {filtros.marcas.length > 0 && (
          <div className="vitrine-filters__group">
            <label htmlFor="filtro-marca" className="vitrine-filters__label">
              Marca
            </label>
            <select
              id="filtro-marca"
              value={marcaId}
              onChange={(e) => setMarcaId(e.target.value)}
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

        {/* Modelo (dependente de marca) */}
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

        {/* Anos */}
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
              />
              <input
                type="number"
                placeholder="Até"
                value={anoMax}
                onChange={(e) => setAnoMax(e.target.value)}
                className="vitrine-filters__input-small"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Quilometragem */}
        <div className="vitrine-filters__row">
          <div className="vitrine-filters__group">
            <label htmlFor="filtro-km-min" className="vitrine-filters__label">
              KM / até
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
              />
              <input
                type="number"
                placeholder="Até"
                value={kmMax}
                onChange={(e) => setKmMax(e.target.value)}
                className="vitrine-filters__input-small"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="vitrine-filters__row">
          <div className="vitrine-filters__group">
            <label htmlFor="filtro-valor-min" className="vitrine-filters__label">
              Valor / até
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
              />
              <input
                type="number"
                placeholder="Até"
                value={valorMax}
                onChange={(e) => setValorMax(e.target.value)}
                className="vitrine-filters__input-small"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="vitrine-filters__actions">
          <button
            onClick={handleAplicarFiltros}
            disabled={isLoading}
            className="vitrine-filters__btn vitrine-filters__btn--primary"
          >
            Aplicar filtros
          </button>
          <button
            onClick={handleLimparFiltros}
            disabled={isLoading}
            className="vitrine-filters__btn vitrine-filters__btn--secondary"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  )
}
