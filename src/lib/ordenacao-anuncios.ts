import type { OrdenacaoAnuncios } from "@/src/types/catalogo"
import type { VitrineAnuncio } from "@/src/types/anuncio"

export function ordenarAnuncios(
  anuncios: VitrineAnuncio[],
  ordenacao: OrdenacaoAnuncios
): VitrineAnuncio[] {
  const sorted = [...anuncios]

  switch (ordenacao) {
    case "menor_preco":
      sorted.sort((a, b) => a.preco - b.preco)
      break
    case "maior_preco":
      sorted.sort((a, b) => b.preco - a.preco)
      break
    case "menor_km":
      sorted.sort((a, b) => a.quilometragem - b.quilometragem)
      break
    case "mais_recentes":
    default:
      sorted.sort(
        (a, b) =>
          new Date(b.publicadoEm).getTime() - new Date(a.publicadoEm).getTime()
      )
      break
  }

  return sorted
}
