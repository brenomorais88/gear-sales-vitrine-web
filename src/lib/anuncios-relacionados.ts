import type { VitrineAnuncio } from "@/src/types/anuncio"

function sortByRecent(a: VitrineAnuncio, b: VitrineAnuncio): number {
  return (
    new Date(b.publicadoEm).getTime() - new Date(a.publicadoEm).getTime()
  )
}

/**
 * Retorna 3–4 anúncios relacionados: prioriza mesma marca, depois mais recentes.
 */
export function getAnunciosRelacionados(
  anuncios: VitrineAnuncio[],
  atual: VitrineAnuncio,
  limit = 4
): VitrineAnuncio[] {
  const disponiveis = anuncios.filter(
    (a) => a.id !== atual.id && a.status === "DISPONIVEL"
  )

  const mesmaMarca = disponiveis
    .filter((a) => a.marca === atual.marca)
    .sort(sortByRecent)
  const outrasMarcas = disponiveis
    .filter((a) => a.marca !== atual.marca)
    .sort(sortByRecent)

  return [...mesmaMarca, ...outrasMarcas].slice(0, limit)
}
