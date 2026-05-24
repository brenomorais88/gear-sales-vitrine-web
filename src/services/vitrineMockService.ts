import { isMockLojaDomain, vitrineLojaMock } from "@/src/mocks/vitrineLojaMock"
import type { VitrineLoja } from "@/src/types/vitrine"

export class VitrineNotFoundError extends Error {
  constructor() {
    super("VITRINE_NOT_FOUND")
    this.name = "VitrineNotFoundError"
  }
}

const MOCK_DELAY_MS = 80

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Busca loja mockada pelo domínio completo (ex.: geargarage.gearsales.com.br).
 */
export async function buscarVitrineMockPorDominio(dominio: string): Promise<VitrineLoja> {
  await delay(MOCK_DELAY_MS)

  if (isMockLojaDomain(dominio)) {
    return { ...vitrineLojaMock }
  }

  throw new VitrineNotFoundError()
}
