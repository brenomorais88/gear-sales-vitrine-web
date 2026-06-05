import { describe, expect, it } from "vitest"

import {
  buildAnuncioSeoMetadata,
  buildHomeSeoMetadata,
  buildSobreSeoMetadata,
  buildVitrineCanonicalUrl,
  formatVitrinePrice,
  pickAnuncioOgImage,
  pickVitrineOgImage,
  resolveSeoImageUrl,
  sanitizeSeoDescription,
  VITRINE_DEFAULT_OG_IMAGE_PATH,
} from "@/src/lib/vitrine-seo"
import type { PublicVitrineAnuncioDetalhe, VitrineLoja } from "@/src/types/vitrine"

const vitrineBase: VitrineLoja = {
  id: "loja-1",
  nome: "Revenda Teste",
  descricao: "Descrição da loja para SEO.",
  logoUrl: "https://example.com/logo.png",
  bannerUrl: "https://example.com/banner.png",
  enderecoPaginaPublica: "revendateste",
  urlPublica: "https://revendateste.gearsales.com.br",
}

const anuncioBase: PublicVitrineAnuncioDetalhe = {
  id: "anuncio-001",
  titulo: "Toyota Corolla 2021",
  valorVenda: "89900.00",
  marca: { id: "m1", nome: "Toyota" },
  modelo: { id: "mo1", nome: "Corolla" },
  fotos: [
    { id: "f1", url: "https://example.com/principal.jpg", principal: true },
    { id: "f2", url: "https://example.com/outra.jpg", ordem: 1 },
  ],
  loja: {
    id: "loja-1",
    nome: "Revenda Teste",
    logoUrl: "https://example.com/logo-loja.png",
  },
}

describe("vitrine-seo", () => {
  it("formata preço válido", () => {
    expect(formatVitrinePrice("89900")).toBe("R$\u00a089.900,00")
  })

  it("retorna null para preço inválido", () => {
    expect(formatVitrinePrice("abc")).toBeNull()
    expect(formatVitrinePrice("0")).toBeNull()
  })

  it("sanitiza e trunca description", () => {
    const long = `<p>${"Descrição longa ".repeat(20)}</p>`
    const result = sanitizeSeoDescription(long, 80)
    expect(result).toBeTruthy()
    expect(result!.length).toBeLessThanOrEqual(83)
    expect(result).not.toContain("<p>")
  })

  it("escolhe foto principal do anúncio", () => {
    expect(pickAnuncioOgImage(anuncioBase)).toBe("https://example.com/principal.jpg")
  })

  it("usa logo da loja quando não há fotos", () => {
    expect(
      pickAnuncioOgImage({
        ...anuncioBase,
        fotos: [],
      })
    ).toBe("https://example.com/logo-loja.png")
  })

  it("prioriza banner e logo da vitrine", () => {
    expect(pickVitrineOgImage(vitrineBase)).toBe("https://example.com/banner.png")
    expect(
      pickVitrineOgImage({
        ...vitrineBase,
        bannerUrl: null,
      })
    ).toBe("https://example.com/logo.png")
  })

  it("resolve imagem fallback absoluta", () => {
    const url = resolveSeoImageUrl(null, "https://revendateste.gearsales.com.br")
    expect(url).toContain(VITRINE_DEFAULT_OG_IMAGE_PATH.replace("/", ""))
    expect(url.startsWith("https://")).toBe(true)
  })

  it("monta canonical da home e sobre", () => {
    expect(buildVitrineCanonicalUrl(vitrineBase, "/")).toBe(
      "https://revendateste.gearsales.com.br"
    )
    expect(buildVitrineCanonicalUrl(vitrineBase, "/sobre")).toBe(
      "https://revendateste.gearsales.com.br/sobre"
    )
  })

  it("monta metadata da home sem valores inválidos", () => {
    const metadata = buildHomeSeoMetadata(vitrineBase)
    expect(metadata.title).toEqual({ absolute: "Revenda Teste | Veículos à venda" })
    expect(metadata.description).toContain("Descrição da loja para SEO.")
    expect(metadata.openGraph?.images?.[0]?.url).toContain("https://")
    expect(JSON.stringify(metadata)).not.toContain("undefined")
    expect(JSON.stringify(metadata)).not.toContain("null")
  })

  it("monta metadata do anúncio com preço", () => {
    const metadata = buildAnuncioSeoMetadata(vitrineBase, anuncioBase)
    expect(metadata.description).toContain("R$")
    expect(metadata.openGraph?.images?.[0]?.url).toBe("https://example.com/principal.jpg")
  })

  it("monta metadata da sobre", () => {
    const metadata = buildSobreSeoMetadata(vitrineBase)
    expect(metadata.title).toEqual({ absolute: "Sobre a Revenda Teste" })
    expect(metadata.alternates?.canonical).toContain("/sobre")
  })
})
