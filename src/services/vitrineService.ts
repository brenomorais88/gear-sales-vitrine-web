import { cache } from "react"
import { revalidateTag } from "next/cache"

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
 * Tempo (em segundos) em que o resultado fica cacheado na camada de
 * Server Components do Next. Pode ser invalidado a qualquer momento via
 * `revalidateVitrineCache(dominio)`.
 *
 * 5 minutos é um meio-termo razoável para dados públicos da loja —
 * raramente mudam, mas mudanças (cor, logo, contato) devem aparecer
 * em até alguns minutos sem reinicializar o servidor.
 */
const VITRINE_REVALIDATE_SECONDS = 300

/** Constrói a tag de cache única por domínio (permite invalidação cirúrgica). */
export function buildVitrineCacheTag(dominio: string): string {
  return `vitrine:${dominio.trim().toLowerCase()}`
}

function buildVitrineEndpoint(dominio: string): string {
  const baseUrl = getApiBaseUrl().replace(/\/$/, "")
  const query = new URLSearchParams({ dominio })
  return `${baseUrl}/public/vitrine/por-dominio?${query.toString()}`
}

/**
 * Busca os dados públicos da loja a partir do domínio.
 *
 * Esta função é o **primeiro chamado em toda renderização da vitrine** —
 * todas as páginas (home, /sobre, /anuncios/[id]) começam por ela. Por
 * isso ela combina três camadas de cache:
 *
 *  1. `React.cache()` deduplica chamadas dentro da mesma request
 *     (uma única chamada cobre `page.tsx` + `generateMetadata`).
 *  2. `fetch` com `cache: 'force-cache'` + `next.revalidate` faz com que
 *     a mesma resposta seja reaproveitada em todas as requests dentro do
 *     mesmo TTL (≈ "sessão" do usuário).
 *  3. `next.tags` permite invalidação imediata via
 *     `revalidateVitrineCache(dominio)` quando a loja é editada.
 */
export const buscarVitrinePorDominio = cache(
  async (dominio: string): Promise<VitrineLoja> => {
    const dominioNormalizado = dominio.trim().toLowerCase()
    if (!dominioNormalizado) {
      throw new VitrineNotFoundError()
    }

    const url = buildVitrineEndpoint(dominioNormalizado)

    let response: Response
    try {
      response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "force-cache",
        next: {
          revalidate: VITRINE_REVALIDATE_SECONDS,
          tags: [buildVitrineCacheTag(dominioNormalizado)],
        },
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

    return (await response.json()) as VitrineLoja
  }
)

/**
 * Invalida o cache da vitrine para um domínio específico. Use após
 * alterações no cadastro da loja (cor principal, logo, dados públicos)
 * para forçar a próxima requisição a buscar do backend.
 */
export function revalidateVitrineCache(dominio: string): void {
  revalidateTag(buildVitrineCacheTag(dominio), "max")
}
