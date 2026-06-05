import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  buscarVitrinePorDominio,
  VitrineNotFoundError,
  VitrineUnavailableError,
} from "@/src/services/vitrineService"

describe("vitrineService", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "http://api.test")
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it("busca vitrine com dominio na query", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ id: "1", nome: "Loja", enderecoPaginaPublica: "x", urlPublica: "https://x.com" }),
    })
    vi.stubGlobal("fetch", fetchMock)

    await buscarVitrinePorDominio("loja.teste.gearsales.com.br")

    expect(fetchMock).toHaveBeenCalledWith(
      "http://api.test/public/vitrine/por-dominio?dominio=loja.teste.gearsales.com.br",
      expect.objectContaining({
        method: "GET",
        headers: { Accept: "application/json" },
      })
    )
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBeUndefined()
  })

  it("lança VitrineNotFoundError em 404", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 404 })
    )

    await expect(buscarVitrinePorDominio("x")).rejects.toBeInstanceOf(
      VitrineNotFoundError
    )
  })

  it("lança VitrineUnavailableError em 500", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 })
    )

    await expect(buscarVitrinePorDominio("x")).rejects.toBeInstanceOf(
      VitrineUnavailableError
    )
  })
})
