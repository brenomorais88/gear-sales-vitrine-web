import { resolveVitrinePrimaryColor } from "@/src/lib/vitrine-color"

interface VitrineTheme {
  primaryColor: string
  textColor: string
}

/**
 * Calcula a luminância relativa de uma cor hex para determinar o contraste.
 * Baseado em: https://www.w3.org/TR/AERT/#color-contrast
 */
function getColorLuminance(hexColor: string): number {
  const hex = hexColor.replace("#", "")
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const [rs, gs, bs] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  )

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Retorna a cor de texto adequada baseado na cor de fundo.
 * Cores claras (luminância > 0.5) usam texto escuro, cores escuras usam texto claro.
 */
function getContrastTextColor(backgroundColor: string): string {
  const luminance = getColorLuminance(backgroundColor)
  return luminance > 0.5 ? "#171717" : "#ffffff"
}

/**
 * Gera o tema da vitrine com cor primária validada e cor de texto com contraste.
 */
export function getVitrineTheme(
  corPrincipal: string | null | undefined
): VitrineTheme {
  const primaryColor = resolveVitrinePrimaryColor(corPrincipal)
  const textColor = getContrastTextColor(primaryColor)

  return {
    primaryColor,
    textColor,
  }
}
