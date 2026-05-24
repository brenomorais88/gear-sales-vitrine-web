import type { CSSProperties } from "react"

import { resolveVitrinePrimaryColor } from "@/src/lib/vitrine-color"

/**
 * Estilos inline para aplicar o tema dinâmico da loja no wrapper da vitrine.
 * Variáveis derivadas (--vitrine-primary-soft etc.) são calculadas em globals.css via color-mix.
 */
export function getVitrineThemeStyle(
  corPrincipal: string | null | undefined
): CSSProperties {
  const primary = resolveVitrinePrimaryColor(corPrincipal)

  return {
    "--vitrine-primary": primary,
  } as CSSProperties
}
