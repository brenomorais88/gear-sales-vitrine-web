import type { FiltrosAnuncios } from "@/src/types/catalogo"
import type { VitrineAnuncio } from "@/src/types/anuncio"

function parseOptionalNumber(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const num = Number(trimmed)
  return Number.isFinite(num) ? num : null
}

function normalizeSearchText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
}

function matchesBusca(anuncio: VitrineAnuncio, busca: string): boolean {
  const term = normalizeSearchText(busca)
  if (!term) return true

  const haystack = [
    anuncio.titulo,
    anuncio.marca,
    anuncio.modelo,
    anuncio.versao ?? "",
    anuncio.descricao,
  ]
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")

  return haystack.includes(term)
}

export function hasActiveFilters(filtros: FiltrosAnuncios): boolean {
  return (
    filtros.busca.trim() !== "" ||
    filtros.marca !== "todos" ||
    filtros.modelo !== "todos" ||
    filtros.precoMin.trim() !== "" ||
    filtros.precoMax.trim() !== "" ||
    filtros.anoMin.trim() !== "" ||
    filtros.anoMax.trim() !== "" ||
    filtros.cambio !== "todos" ||
    filtros.combustivel !== "todos"
  )
}

export function filtrarAnuncios(
  anuncios: VitrineAnuncio[],
  filtros: FiltrosAnuncios
): VitrineAnuncio[] {
  const precoMin = parseOptionalNumber(filtros.precoMin)
  const precoMax = parseOptionalNumber(filtros.precoMax)
  const anoMin = parseOptionalNumber(filtros.anoMin)
  const anoMax = parseOptionalNumber(filtros.anoMax)

  return anuncios.filter((anuncio) => {
    if (anuncio.status !== "DISPONIVEL") return false

    if (!matchesBusca(anuncio, filtros.busca)) return false

    if (filtros.marca !== "todos" && anuncio.marca !== filtros.marca) {
      return false
    }

    if (filtros.modelo !== "todos" && anuncio.modelo !== filtros.modelo) {
      return false
    }

    if (precoMin !== null && anuncio.preco < precoMin) return false
    if (precoMax !== null && anuncio.preco > precoMax) return false

    const ano = anuncio.anoModelo
    if (anoMin !== null && ano < anoMin) return false
    if (anoMax !== null && ano > anoMax) return false

    if (filtros.cambio !== "todos" && (anuncio.cambio ?? "") !== filtros.cambio) {
      return false
    }

    if (
      filtros.combustivel !== "todos" &&
      (anuncio.combustivel ?? "") !== filtros.combustivel
    ) {
      return false
    }

    return true
  })
}
