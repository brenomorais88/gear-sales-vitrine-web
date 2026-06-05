import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  createVitrineLead,
  VitrineLeadError,
} from "@/src/services/vitrineLeadsService"
import type { PublicVitrineLeadRequest } from "@/src/types/vitrine"

const payload: PublicVitrineLeadRequest = {
  dominio: "loja.teste.gearsales.com.br",
  tipo: "CONTATO_GERAL",
  nome: "João Silva",
  telefone: "(11) 98888-7777",
  email: null,
  mensagem: "Olá",
}

describe("vitrineLeadsService", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "http://api.test")
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it("cria lead com sucesso em 201", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ id: "lead-1", message: "Lead recebido com sucesso" }),
    })
    vi.stubGlobal("fetch", fetchMock)

    const result = await createVitrineLead(payload)

    expect(result.id).toBe("lead-1")
    expect(fetchMock).toHaveBeenCalledWith(
      "http://api.test/vitrine/leads",
      expect.objectContaining({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    )
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBeUndefined()
  })

  it("trata erro 400", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ message: "nome inválido" }),
      })
    )

    await expect(createVitrineLead(payload)).rejects.toMatchObject({
      status: 400,
      message: "Revise os dados informados e tente novamente.",
    } satisfies Partial<VitrineLeadError>)
  })

  it("trata erro 404", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ message: "não encontrado" }),
      })
    )

    await expect(createVitrineLead(payload)).rejects.toMatchObject({
      status: 404,
    })
  })

  it("trata erro temporário de rede", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")))

    await expect(createVitrineLead(payload)).rejects.toBeInstanceOf(VitrineLeadError)
  })
})
