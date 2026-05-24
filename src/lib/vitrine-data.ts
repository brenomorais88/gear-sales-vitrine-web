/**
 * Camada de dados da vitrine — V1 usa mocks.
 * Na integração com API, substituir implementações mantendo as mesmas assinaturas.
 */
import {
  getAnuncioMockById,
  getAnunciosMockByLojaId,
} from "@/src/mocks/anunciosMock"
import { getVitrineForRequest } from "@/src/lib/get-vitrine"
import type { VitrineAnuncio } from "@/src/types/anuncio"
import type { VitrineLoja } from "@/src/types/vitrine"

export { getVitrineForRequest as getLojaForRequest }

export async function getAnunciosForLoja(lojaId: string): Promise<VitrineAnuncio[]> {
  return getAnunciosMockByLojaId(lojaId)
}

export async function getAnuncioForLoja(
  lojaId: string,
  anuncioId: string
): Promise<VitrineAnuncio | undefined> {
  return getAnuncioMockById(lojaId, anuncioId)
}

export type { VitrineLoja, VitrineAnuncio }
