import { cache } from "react"
import { headers } from "next/headers"

import { buscarVitrinePorDominio } from "@/src/services/vitrineService"
import { resolveVitrineDomain } from "@/src/lib/vitrine-domain"

/**
 * Resolve a loja da requisição atual.
 *
 * Wrap dedicado a Server Components: lê o host da request, normaliza
 * para um domínio reconhecível pelo backend e delega ao
 * `buscarVitrinePorDominio` (que aplica cache de sessão por domínio).
 *
 * Ao chamar várias vezes durante a mesma renderização (ex.: `page.tsx`
 * + `generateMetadata` + componentes filhos), o React `cache()` garante
 * **uma única request por render**.
 */
export const getVitrineForRequest = cache(async () => {
  const headersList = await headers()
  const dominio = resolveVitrineDomain(headersList.get("host"))
  return buscarVitrinePorDominio(dominio)
})
