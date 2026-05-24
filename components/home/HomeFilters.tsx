"use client"

import { useState } from "react"

import {
  getCambiosFromAnuncios,
  getCombustiveisFromAnuncios,
  getMarcasFromAnuncios,
  getModelosFromAnuncios,
} from "@/src/lib/catalogo-options"
import {
  ORDENACAO_OPCOES,
  type FiltrosAnuncios,
  type OrdenacaoAnuncios,
} from "@/src/types/catalogo"
import type { VitrineAnuncio } from "@/src/types/anuncio"

interface HomeFiltersProps {
  anuncios: VitrineAnuncio[]
  filtros: FiltrosAnuncios
  ordenacao: OrdenacaoAnuncios
  filtrosAtivos: boolean
  totalFiltrados: number
  onFiltroChange: <K extends keyof FiltrosAnuncios>(
    key: K,
    value: FiltrosAnuncios[K]
  ) => void
  onOrdenacaoChange: (value: OrdenacaoAnuncios) => void
  onLimpar: () => void
}

export function HomeFilters({
  anuncios,
  filtros,
  ordenacao,
  filtrosAtivos,
  totalFiltrados,
  onFiltroChange,
  onOrdenacaoChange,
  onLimpar,
}: HomeFiltersProps) {
  const [open, setOpen] = useState(false)

  const marcas = getMarcasFromAnuncios(anuncios)
  const modelos = getModelosFromAnuncios(anuncios, filtros.marca)
  const cambios = getCambiosFromAnuncios(anuncios)
  const combustiveis = getCombustiveisFromAnuncios(anuncios)

  return (
    <div className="home-filters">
      <div className="home-filters__toolbar">
        <p className="home-filters__count">
          {totalFiltrados} veículo{totalFiltrados !== 1 ? "s" : ""} encontrado
          {totalFiltrados !== 1 ? "s" : ""}.
        </p>

        <div className="home-filters__toolbar-actions">
          <label className="home-filters__sort">
            <span className="sr-only">Ordenar por</span>
            <select
              value={ordenacao}
              onChange={(e) =>
                onOrdenacaoChange(e.target.value as OrdenacaoAnuncios)
              }
              aria-label="Ordenar veículos"
            >
              {ORDENACAO_OPCOES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="home-filters__toggle vitrine-btn vitrine-btn--outline"
            aria-expanded={open}
            aria-controls="home-filters-panel"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Ocultar filtros" : "Filtros"}
          </button>
        </div>
      </div>

      <div
        id="home-filters-panel"
        className={`home-filters__panel${open ? " home-filters__panel--open" : ""}`}
      >
        <div className="home-filters__grid">
          <label className="home-filters__field home-filters__field--wide">
            <span>Buscar</span>
            <input
              type="search"
              placeholder="Marca, modelo, versão..."
              value={filtros.busca}
              onChange={(e) => onFiltroChange("busca", e.target.value)}
            />
          </label>

          <label className="home-filters__field">
            <span>Marca</span>
            <select
              value={filtros.marca}
              onChange={(e) => onFiltroChange("marca", e.target.value)}
            >
              <option value="todos">Todas</option>
              {marcas.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <label className="home-filters__field">
            <span>Modelo</span>
            <select
              value={filtros.modelo}
              onChange={(e) => onFiltroChange("modelo", e.target.value)}
            >
              <option value="todos">Todos</option>
              {modelos.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <label className="home-filters__field">
            <span>Preço mín. (R$)</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="Ex: 30000"
              value={filtros.precoMin}
              onChange={(e) => onFiltroChange("precoMin", e.target.value)}
            />
          </label>

          <label className="home-filters__field">
            <span>Preço máx. (R$)</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="Ex: 150000"
              value={filtros.precoMax}
              onChange={(e) => onFiltroChange("precoMax", e.target.value)}
            />
          </label>

          <label className="home-filters__field">
            <span>Ano mín.</span>
            <input
              type="number"
              inputMode="numeric"
              min={1990}
              max={2030}
              placeholder="Ex: 2018"
              value={filtros.anoMin}
              onChange={(e) => onFiltroChange("anoMin", e.target.value)}
            />
          </label>

          <label className="home-filters__field">
            <span>Ano máx.</span>
            <input
              type="number"
              inputMode="numeric"
              min={1990}
              max={2030}
              placeholder="Ex: 2024"
              value={filtros.anoMax}
              onChange={(e) => onFiltroChange("anoMax", e.target.value)}
            />
          </label>

          <label className="home-filters__field">
            <span>Câmbio</span>
            <select
              value={filtros.cambio}
              onChange={(e) => onFiltroChange("cambio", e.target.value)}
            >
              <option value="todos">Todos</option>
              {cambios.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="home-filters__field">
            <span>Combustível</span>
            <select
              value={filtros.combustivel}
              onChange={(e) => onFiltroChange("combustivel", e.target.value)}
            >
              <option value="todos">Todos</option>
              {combustiveis.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="home-filters__footer">
          <button
            type="button"
            className="vitrine-btn vitrine-btn--outline"
            onClick={onLimpar}
            disabled={!filtrosAtivos}
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </div>
  )
}
