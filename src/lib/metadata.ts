import type { Metadata } from "next"

import type { VitrineAnuncio } from "@/src/types/anuncio"
import type { VitrineLoja } from "@/src/types/vitrine"
import { getLojaDisplayName } from "@/src/utils/loja"

const DEFAULT_METADATA: Metadata = {
  title: "Gear Sales Vitrine",
  description: "Vitrine pública de lojas no Gear Sales.",
}

function getLojaOgImage(loja: VitrineLoja): { url: string; alt: string } | null {
  const nome = getLojaDisplayName(loja)
  const url = loja.bannerUrl?.trim() || loja.logoUrl?.trim()
  if (!url) return null
  return { url, alt: `Vitrine ${nome}` }
}

function buildOpenGraph(
  title: string,
  description: string,
  image?: { url: string; alt: string } | null
): Metadata["openGraph"] {
  return {
    title,
    description,
    type: "website",
    locale: "pt_BR",
    ...(image ? { images: [image] } : {}),
  }
}

export function buildHomeMetadata(loja: VitrineLoja): Metadata {
  const nome = getLojaDisplayName(loja)
  const title = `${nome} - Veículos à venda`
  const description = `Confira os veículos disponíveis na ${nome}.`

  return {
    title: { absolute: title },
    description,
    openGraph: buildOpenGraph(title, description, getLojaOgImage(loja)),
  }
}

export function buildSobreMetadata(loja: VitrineLoja): Metadata {
  const nome = getLojaDisplayName(loja)
  const title = `Sobre a ${nome}`
  const description = `Conheça a ${nome}, veja informações de contato e confira os veículos disponíveis.`

  return {
    title: { absolute: title },
    description,
    openGraph: buildOpenGraph(title, description, getLojaOgImage(loja)),
  }
}

export function buildAnuncioMetadata(
  loja: VitrineLoja,
  anuncio: VitrineAnuncio
): Metadata {
  const nome = getLojaDisplayName(loja)
  const title = `${anuncio.titulo} - ${nome}`
  const description = `Veja detalhes, fotos e entre em contato sobre ${anuncio.titulo}.`
  const imageUrl = anuncio.imagemCapaUrl?.trim() || anuncio.imagens[0]?.trim()
  const ogImage = imageUrl
    ? { url: imageUrl, alt: anuncio.titulo }
    : getLojaOgImage(loja)

  return {
    title: { absolute: title },
    description,
    openGraph: buildOpenGraph(title, description, ogImage),
  }
}

export function buildNotFoundMetadata(loja?: VitrineLoja | null): Metadata {
  const title = "Página não encontrada"
  const description = "O endereço acessado não existe ou não está mais disponível."

  return {
    title: { absolute: title },
    description,
    openGraph: buildOpenGraph(
      title,
      description,
      loja ? getLojaOgImage(loja) : null
    ),
  }
}

export function getDefaultMetadata(): Metadata {
  return DEFAULT_METADATA
}
