import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  fetchVitrineAnuncioDetalhe,
  fetchVitrineAnuncios,
  fetchVitrineFiltros,
  VitrineAnunciosError,
} from "@/src/services/vitrineAnunciosService"

describe("vitrineAnunciosService", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "http://api.test")
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it("monta query params sem campos vazios ou proibidos", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        items: [],
        page: 0,
        size: 12,
        totalItems: 0,
        totalPages: 0,
      }),
    })
    vi.stubGlobal("fetch", fetchMock)

    await fetchVitrineAnuncios({
      dominio: "loja.teste.gearsales.com.br",
      page: 1,
      sort: "menor_preco",
      marcaId: "marca-1",
      texto: "corolla",
      valorMax: "90000",
      modeloId: "",
    })

    const url = fetchMock.mock.calls[0][0] as string
    expect(url).toContain("dominio=loja.teste.gearsales.com.br")
    expect(url).toContain("page=1")
    expect(url).toContain("sort=menor_preco")
    expect(url).toContain("marcaId=marca-1")
    expect(url).toContain("texto=corolla")
    expect(url).toContain("valorMax=90000")
    expect(url).not.toContain("modeloId=")
    expect(url).not.toContain("lojaId")
    expect(url).not.toContain("status=")
    expect(url).not.toContain("placa")
  })

  it("exige dominio para listagem", async () => {
    await expect(fetchVitrineAnuncios({ dominio: "" })).rejects.toThrow(
      "dominio é obrigatório"
    )
  })

  it("busca filtros com dominio", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ marcas: [], modelos: [], cambios: [], combustiveis: [], sortOptions: [] }),
    })
    vi.stubGlobal("fetch", fetchMock)

    await fetchVitrineFiltros("loja.teste.gearsales.com.br")

    expect(fetchMock.mock.calls[0][0]).toBe(
      "http://api.test/vitrine/filtros?dominio=loja.teste.gearsales.com.br"
    )
  })

  it("trata 404 no detalhe do anúncio", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 404 })
    )

    await expect(
      fetchVitrineAnuncioDetalhe("anuncio-404", "loja.teste.gearsales.com.br")
    ).rejects.toThrow("Anúncio não encontrado")
  })

  it("trata 400 no detalhe do anúncio", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 400 })
    )

    await expect(
      fetchVitrineAnuncioDetalhe("x", "loja.teste.gearsales.com.br")
    ).rejects.toThrow("Parâmetros inválidos")
  })

  it("trata erro temporário na listagem", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")))

    await expect(
      fetchVitrineAnuncios({ dominio: "loja.teste.gearsales.com.br" })
    ).rejects.toBeInstanceOf(VitrineAnunciosError)
  })
})
