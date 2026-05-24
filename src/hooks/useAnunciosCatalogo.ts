"use client"

import { useMemo, useState } from "react"

import { filtrarAnuncios, hasActiveFilters } from "@/src/lib/filtros-anuncios"
import { ordenarAnuncios } from "@/src/lib/ordenacao-anuncios"
import {
  FILTROS_INICIAIS,
  type FiltrosAnuncios,
  type OrdenacaoAnuncios,
} from "@/src/types/catalogo"
import type { VitrineAnuncio } from "@/src/types/anuncio"

export function useAnunciosCatalogo(anuncios: VitrineAnuncio[]) {
  const [filtros, setFiltros] = useState<FiltrosAnuncios>(FILTROS_INICIAIS)
  const [ordenacao, setOrdenacao] = useState<OrdenacaoAnuncios>("mais_recentes")

  const disponiveis = useMemo(
    () => anuncios.filter((a) => a.status === "DISPONIVEL"),
    [anuncios]
  )

  const filtrados = useMemo(
    () => ordenarAnuncios(filtrarAnuncios(anuncios, filtros), ordenacao),
    [anuncios, filtros, ordenacao]
  )

  const filtrosAtivos = hasActiveFilters(filtros)

  function updateFiltro<K extends keyof FiltrosAnuncios>(
    key: K,
    value: FiltrosAnuncios[K]
  ) {
    setFiltros((prev) => {
      const next = { ...prev, [key]: value }
      if (key === "marca") {
        next.modelo = "todos"
      }
      return next
    })
  }

  function limparFiltros() {
    setFiltros(FILTROS_INICIAIS)
  }

  return {
    disponiveis,
    filtrados,
    filtros,
    ordenacao,
    filtrosAtivos,
    updateFiltro,
    setOrdenacao,
    limparFiltros,
  }
}
