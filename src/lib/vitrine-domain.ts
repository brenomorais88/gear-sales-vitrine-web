const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"])

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
