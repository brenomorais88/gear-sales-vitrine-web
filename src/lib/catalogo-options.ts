import type { VitrineAnuncio } from "@/src/types/anuncio"

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "pt-BR"))
}

export function getMarcasFromAnuncios(anuncios: VitrineAnuncio[]): string[] {
  return uniqueSorted(
    anuncios
      .filter((a) => a.status === "DISPONIVEL")
      .map((a) => a.marca)
  )
}

export function getModelosFromAnuncios(
  anuncios: VitrineAnuncio[],
  marca: string
): string[] {
  const disponiveis = anuncios.filter((a) => a.status === "DISPONIVEL")
  const filtered =
    marca === "todos"
      ? disponiveis
      : disponiveis.filter((a) => a.marca === marca)

  return uniqueSorted(filtered.map((a) => a.modelo))
}

export function getCambiosFromAnuncios(anuncios: VitrineAnuncio[]): string[] {
  return uniqueSorted(
    anuncios
      .filter((a) => a.status === "DISPONIVEL")
      .map((a) => a.cambio)
  )
}

export function getCombustiveisFromAnuncios(anuncios: VitrineAnuncio[]): string[] {
  return uniqueSorted(
    anuncios
      .filter((a) => a.status === "DISPONIVEL")
      .map((a) => a.combustivel)
  )
}
