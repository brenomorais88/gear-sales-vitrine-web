/**
 * Camada de acesso a dados da vitrine pública.
 *
 * Toda chamada aqui é cacheada na camada de serviço (`vitrineService`
 * e `anunciosService`) — vide os comentários em cada serviço para o
 * comportamento de cache de sessão.
 */
import { getVitrineForRequest } from "@/src/lib/get-vitrine"
import {
  buscarAnuncioPublicoPorId,
  listarAnunciosPublicosPorLoja,
} from "@/src/services/anunciosService"
import type { VitrineAnuncio } from "@/src/types/anuncio"
import type { VitrineLoja } from "@/src/types/vitrine"

export { getVitrineForRequest as getLojaForRequest }

export async function getAnunciosForLoja(
  lojaId: string
): Promise<VitrineAnuncio[]> {
  return listarAnunciosPublicosPorLoja(lojaId)
}

export async function getAnuncioForLoja(
  lojaId: string,
  anuncioId: string
): Promise<VitrineAnuncio | undefined> {
  return buscarAnuncioPublicoPorId(lojaId, anuncioId)
}

export type { VitrineLoja, VitrineAnuncio }
