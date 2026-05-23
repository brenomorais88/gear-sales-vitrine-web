import { getApiBaseUrl } from "@/src/lib/api-config"
import type { VitrineLoja } from "@/src/types/vitrine"

export class VitrineNotFoundError extends Error {
  constructor() {
    super("VITRINE_NOT_FOUND")
    this.name = "VitrineNotFoundError"
  }
}

export class VitrineUnavailableError extends Error {
  constructor() {
    super("VITRINE_UNAVAILABLE")
    this.name = "VitrineUnavailableError"
  }
}

/**
 * Busca dados públicos da loja pelo domínio completo.
 */
export async function buscarVitrinePorDominio(
  dominio: string
): Promise<VitrineLoja> {
  const baseUrl = getApiBaseUrl()
  const url = `${baseUrl}/public/vitrine/por-dominio?dominio=${encodeURIComponent(dominio)}`

  let response: Response

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    })
  } catch {
    throw new VitrineUnavailableError()
  }

  if (response.status === 404) {
    throw new VitrineNotFoundError()
  }

  if (!response.ok) {
    throw new VitrineUnavailableError()
  }

  return response.json() as Promise<VitrineLoja>
}
