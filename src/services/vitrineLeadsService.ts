import { getApiBaseUrl } from "@/src/lib/api-config"
import type {
  PublicVitrineLeadApiError,
  PublicVitrineLeadRequest,
  PublicVitrineLeadResponse,
} from "@/src/types/vitrine"

export class VitrineLeadError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = "VitrineLeadError"
    this.status = status
    this.code = code
  }
}

function getFriendlyErrorMessage(status: number): string {
  if (status === 400) {
    return "Revise os dados informados e tente novamente."
  }

  if (status === 404) {
    return "Não foi possível enviar sua solicitação para esta vitrine ou anúncio."
  }

  return "Não foi possível enviar sua solicitação agora. Tente novamente em instantes."
}

async function parseErrorResponse(
  response: Response
): Promise<{ message: string; code?: string }> {
  try {
    const data = (await response.json()) as PublicVitrineLeadApiError
    return {
      message: data.message?.trim() || getFriendlyErrorMessage(response.status),
      code: data.code,
    }
  } catch {
    return { message: getFriendlyErrorMessage(response.status) }
  }
}

/**
 * Cria um lead público na vitrine (POST /vitrine/leads).
 */
export async function createVitrineLead(
  payload: PublicVitrineLeadRequest
): Promise<PublicVitrineLeadResponse> {
  const baseUrl = getApiBaseUrl()
  const url = `${baseUrl}/vitrine/leads`

  let response: Response

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new VitrineLeadError(
      "Não foi possível enviar sua solicitação agora. Tente novamente em instantes.",
      0
    )
  }

  if (response.status === 201) {
    const data = (await response.json()) as Partial<PublicVitrineLeadResponse>
    return {
      id: String(data.id ?? ""),
      message: data.message?.trim() || "Lead recebido com sucesso",
    }
  }

  const { message, code } = await parseErrorResponse(response)
  throw new VitrineLeadError(
    getFriendlyErrorMessage(response.status),
    response.status,
    code ?? message
  )
}
