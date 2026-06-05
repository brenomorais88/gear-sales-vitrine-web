import type { Metadata } from "next"
import { headers } from "next/headers"
import { cache } from "react"

import { PUBLIC_STORE_DOMAIN_SUFFIX } from "@/src/lib/vitrine-domain"
import type {
  PublicVitrineAnuncioDetalhe,
  PublicVitrineAnuncioFoto,
  VitrineLoja,
} from "@/src/types/vitrine"

export const VITRINE_DEFAULT_STORE_NAME = "Vitrine Gear Sales"
export const VITRINE_DEFAULT_OG_IMAGE_PATH = "/favicon.ico"
const DEFAULT_PUBLIC_ORIGIN = "https://gearsales.com.br"
const SEO_DESCRIPTION_MAX_LENGTH = 160

export function getVitrineStoreName(nome?: string | null): string {
  const trimmed = nome?.trim()
  return trimmed || VITRINE_DEFAULT_STORE_NAME
}

export function sanitizeSeoDescription(
  text?: string | null,
  maxLength = SEO_DESCRIPTION_MAX_LENGTH
): string | undefined {
  if (!text?.trim()) {
    return undefined
  }

  const cleaned = text
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim()

  if (!cleaned) {
    return undefined
  }

  if (cleaned.length <= maxLength) {
    return cleaned
  }

  const truncated = cleaned.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(" ")

  if (lastSpace > maxLength * 0.6) {
    return `${truncated.slice(0, lastSpace).trim()}...`
  }

  return `${truncated.trim()}...`
}

export function formatVitrinePrice(valor?: string | null): string | null {
  if (!valor?.trim()) {
    return null
  }

  const num = Number.parseFloat(valor)

  if (Number.isNaN(num) || num <= 0) {
    return null
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

export function pickAnuncioOgImage(
  anuncio: Pick<PublicVitrineAnuncioDetalhe, "fotos" | "loja">
): string | null {
  const fotos = anuncio.fotos ?? []
  const principal = fotos.find(
    (foto) => foto.principal === true && foto.url?.trim()
  )

  if (principal?.url?.trim()) {
    return principal.url.trim()
  }

  const orderedFotos = [...fotos].sort(
    (a: PublicVitrineAnuncioFoto, b: PublicVitrineAnuncioFoto) =>
      (a.ordem ?? Number.MAX_SAFE_INTEGER) - (b.ordem ?? Number.MAX_SAFE_INTEGER)
  )
  const primeiraFoto = orderedFotos.find((foto) => foto.url?.trim())

  if (primeiraFoto?.url?.trim()) {
    return primeiraFoto.url.trim()
  }

  const logoLoja = anuncio.loja.logoUrl?.trim()

  if (logoLoja) {
    return logoLoja
  }

  return null
}

export function pickVitrineOgImage(
  vitrine: Pick<VitrineLoja, "bannerUrl" | "logoUrl">
): string | null {
  const banner = vitrine.bannerUrl?.trim()

  if (banner) {
    return banner
  }

  const logo = vitrine.logoUrl?.trim()

  if (logo) {
    return logo
  }

  return null
}

function normalizePathname(pathname = "/"): string {
  if (!pathname || pathname === "/") {
    return "/"
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`
}

export function toAbsoluteUrl(url: string, baseUrl: string): string {
  if (/^https?:\/\//i.test(url)) {
    return url
  }

  const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`
  const normalizedPath = url.startsWith("/") ? url.slice(1) : url

  return new URL(normalizedPath, base).toString()
}

export function resolveSeoImageUrl(
  imageUrl: string | null | undefined,
  canonicalBaseUrl: string
): string {
  const trimmed = imageUrl?.trim()

  if (trimmed) {
    return toAbsoluteUrl(trimmed, canonicalBaseUrl)
  }

  return toAbsoluteUrl(VITRINE_DEFAULT_OG_IMAGE_PATH, canonicalBaseUrl)
}

export function buildVitrineCanonicalUrl(
  vitrine: Pick<VitrineLoja, "urlPublica" | "enderecoPaginaPublica">,
  pathname = "/",
  requestOrigin?: string | null
): string {
  const normalizedPath = normalizePathname(pathname)
  const trimmedPublicUrl = vitrine.urlPublica?.trim()

  if (trimmedPublicUrl) {
    try {
      const base = new URL(trimmedPublicUrl)

      if (normalizedPath === "/") {
        return base.origin
      }

      return `${base.origin}${normalizedPath}`
    } catch {
      // segue para fallback
    }
  }

  const slug = vitrine.enderecoPaginaPublica?.trim()

  if (slug) {
    const origin = `https://${slug}.${PUBLIC_STORE_DOMAIN_SUFFIX}`

    if (normalizedPath === "/") {
      return origin
    }

    return `${origin}${normalizedPath}`
  }

  const origin = requestOrigin?.trim().replace(/\/$/, "") || DEFAULT_PUBLIC_ORIGIN

  if (normalizedPath === "/") {
    return origin
  }

  return `${origin}${normalizedPath}`
}

interface VitrineSeoMetadataInput {
  title: string
  description: string
  canonicalUrl: string
  imageUrl: string
  siteName?: string
  ogTitle?: string
  ogDescription?: string
}

export function buildVitrineSeoMetadata(
  input: VitrineSeoMetadataInput
): Metadata {
  const ogTitle = input.ogTitle ?? input.title
  const ogDescription = input.ogDescription ?? input.description
  const siteName = input.siteName ?? VITRINE_DEFAULT_STORE_NAME

  return {
    title: {
      absolute: input.title,
    },
    description: input.description,
    alternates: {
      canonical: input.canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: input.canonicalUrl,
      siteName,
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: input.imageUrl,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [input.imageUrl],
    },
  }
}

export const getRequestOrigin = cache(async (): Promise<string | null> => {
  const headersList = await headers()
  const host = headersList.get("host")

  if (!host?.trim()) {
    return null
  }

  const protocol = headersList.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https"

  return `${protocol}://${host.split(":")[0].trim()}`
})

export function buildHomeSeoMetadata(
  vitrine: VitrineLoja,
  requestOrigin?: string | null
): Metadata {
  const nomeLoja = getVitrineStoreName(vitrine.nome)
  const title = `${nomeLoja} | Veículos à venda`
  const description =
    sanitizeSeoDescription(vitrine.descricao) ??
    `Confira os veículos disponíveis na ${nomeLoja}. Veja fotos, detalhes e fale diretamente com a revenda.`
  const canonicalUrl = buildVitrineCanonicalUrl(vitrine, "/", requestOrigin)
  const imageUrl = resolveSeoImageUrl(
    pickVitrineOgImage(vitrine),
    canonicalUrl
  )

  return buildVitrineSeoMetadata({
    title,
    description,
    canonicalUrl,
    imageUrl,
    siteName: nomeLoja,
  })
}

export function buildSobreSeoMetadata(
  vitrine: VitrineLoja,
  requestOrigin?: string | null
): Metadata {
  const nomeLoja = getVitrineStoreName(vitrine.nome)
  const title = `Sobre a ${nomeLoja}`
  const description =
    sanitizeSeoDescription(vitrine.descricao) ??
    `Conheça a ${nomeLoja}, veja contatos, localização, horário de funcionamento e acesse os veículos disponíveis.`
  const canonicalUrl = buildVitrineCanonicalUrl(vitrine, "/sobre", requestOrigin)
  const imageUrl = resolveSeoImageUrl(
    pickVitrineOgImage(vitrine),
    canonicalUrl
  )
  const ogDescription =
    sanitizeSeoDescription(vitrine.descricao) ??
    `Conheça a ${nomeLoja} e veja os veículos disponíveis em nossa vitrine.`

  return buildVitrineSeoMetadata({
    title,
    description,
    canonicalUrl,
    ogTitle: title,
    ogDescription,
    imageUrl,
    siteName: nomeLoja,
  })
}

export function buildAnuncioSeoMetadata(
  vitrine: VitrineLoja,
  anuncio: PublicVitrineAnuncioDetalhe,
  requestOrigin?: string | null
): Metadata {
  const nomeLoja = getVitrineStoreName(vitrine.nome)
  const titulo = anuncio.titulo.trim() || "Veículo"
  const preco = formatVitrinePrice(anuncio.valorVenda)
  const title = `${titulo} à venda | ${nomeLoja}`
  const description = preco
    ? `${titulo} por ${preco} na ${nomeLoja}. Veja fotos, detalhes e fale diretamente com a revenda.`
    : `Veja fotos, preço e detalhes do ${titulo}. Fale diretamente com a ${nomeLoja}.`
  const canonicalUrl = buildVitrineCanonicalUrl(
    vitrine,
    `/anuncios/${anuncio.id}`,
    requestOrigin
  )
  const imageUrl = resolveSeoImageUrl(
    pickAnuncioOgImage(anuncio) ?? pickVitrineOgImage(vitrine),
    canonicalUrl
  )
  const ogTitle = `${titulo} à venda`
  const ogDescription = preco
    ? `${titulo} por ${preco} na ${nomeLoja}. Veja fotos e detalhes.`
    : description

  return buildVitrineSeoMetadata({
    title,
    description,
    canonicalUrl,
    ogTitle,
    ogDescription,
    imageUrl,
    siteName: nomeLoja,
  })
}

export async function buildVitrineSeoFallbackMetadata(
  kind: "home" | "sobre" | "anuncio" = "home"
): Promise<Metadata> {
  const requestOrigin = await getRequestOrigin()

  const fallbackByKind = {
    home: {
      title: `${VITRINE_DEFAULT_STORE_NAME} | Veículos à venda`,
      description:
        "Confira os veículos disponíveis na vitrine. Veja fotos, detalhes e fale diretamente com a revenda.",
      pathname: "/",
    },
    sobre: {
      title: `Sobre a ${VITRINE_DEFAULT_STORE_NAME}`,
      description:
        "Conheça a vitrine, veja contatos, localização, horário de funcionamento e acesse os veículos disponíveis.",
      pathname: "/sobre",
    },
    anuncio: {
      title: "Detalhes do anúncio",
      description:
        "Veja fotos, preço e detalhes do veículo. Fale diretamente com a revenda.",
      pathname: "/",
    },
  } as const

  const fallback = fallbackByKind[kind]
  const canonicalUrl = buildVitrineCanonicalUrl(
    { urlPublica: "", enderecoPaginaPublica: "" },
    fallback.pathname,
    requestOrigin
  )
  const imageUrl = resolveSeoImageUrl(null, canonicalUrl)

  return buildVitrineSeoMetadata({
    title: fallback.title,
    description: fallback.description,
    canonicalUrl,
    imageUrl,
  })
}
