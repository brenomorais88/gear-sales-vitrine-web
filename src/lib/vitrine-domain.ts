import type { VitrineLoja } from "@/src/types/vitrine"

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"])
export const PUBLIC_STORE_DOMAIN_SUFFIX = "gearsales.com.br"

/**
 * Remove porta do host (ex.: localhost:3000 → localhost).
 */
export function normalizeHost(host: string | null | undefined): string | null {
  if (!host?.trim()) {
    return null
  }

  return host.split(":")[0].trim().toLowerCase()
}

function getDefaultVitrineDomain(): string | null {
  const domain =
    process.env.DEFAULT_VITRINE_DOMAIN?.trim() ||
    process.env.NEXT_PUBLIC_DEFAULT_VITRINE_DOMAIN?.trim()

  return domain || null
}

export class VitrineDomainError extends Error {
  constructor(message = "DOMAIN_UNAVAILABLE") {
    super(message)
    this.name = "VitrineDomainError"
  }
}

/**
 * Resolve o domínio completo enviado à API (ex.: geargarage.gearsales.com.br).
 * Em localhost, usa fallback de ambiente para desenvolvimento.
 */
export function resolveVitrineDomain(host: string | null | undefined): string {
  const normalized = normalizeHost(host)

  if (!normalized || LOCAL_HOSTS.has(normalized)) {
    const fallback = getDefaultVitrineDomain()
    if (!fallback) {
      throw new VitrineDomainError()
    }
    return fallback
  }

  return normalized
}

/**
 * Domínio da loja para chamadas à API de anúncios/filtros.
 * Preferível ao host do browser em localhost (ex.: localhost:3000).
 */
export function getVitrineApiDominio(vitrine: VitrineLoja): string {
  const fromUrl = vitrine.urlPublica?.trim()
  if (fromUrl) {
    try {
      return new URL(fromUrl).hostname
    } catch {
      // segue para fallback por slug
    }
  }

  const slug = vitrine.enderecoPaginaPublica?.trim()
  if (slug) {
    return `${slug}.${PUBLIC_STORE_DOMAIN_SUFFIX}`
  }

  throw new VitrineDomainError("VITRINE_DOMAIN_UNAVAILABLE")
}
