/**
 * Cor primária padrão do Gear Sales (laranja-avermelhado) usada
 * sempre que a loja não definir uma cor válida.
 */
export const GEAR_SALES_DEFAULT_PRIMARY = "#c2410c"
export const DEFAULT_PRIMARY_COLOR = GEAR_SALES_DEFAULT_PRIMARY

const HEX_SHORT = /^[0-9a-f]{3}$/i
const HEX_LONG = /^[0-9a-f]{6}$/i
const HEX_FULL = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
const RGB_COLOR =
  /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i
const HSL_COLOR =
  /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i

function expandShortHex(hex: string): string {
  return hex
    .split("")
    .map((char) => `${char}${char}`)
    .join("")
}

/**
 * Normaliza valores HEX vindos do cadastro da loja.
 *
 * Aceita as variações mais comuns:
 *  - `#FF6600`
 *  - `FF6600`
 *  - `#F60`
 *  - `f60`
 *
 * Retorna sempre no formato `#RRGGBB`. Se o valor for inválido,
 * retorna o fallback informado (por padrão a cor do Gear Sales).
 */
export function normalizeHexColor(
  color?: string | null,
  fallback: string = DEFAULT_PRIMARY_COLOR
): string {
  if (!color) {
    return fallback
  }

  const trimmed = color.trim()
  if (!trimmed) {
    return fallback
  }

  const withoutHash = trimmed.startsWith("#") ? trimmed.slice(1) : trimmed

  if (HEX_SHORT.test(withoutHash)) {
    return `#${expandShortHex(withoutHash).toLowerCase()}`
  }

  if (HEX_LONG.test(withoutHash)) {
    return `#${withoutHash.toLowerCase()}`
  }

  return fallback
}

function isRgbChannelValid(value: string): boolean {
  const channel = Number(value)
  return Number.isInteger(channel) && channel >= 0 && channel <= 255
}

/**
 * Resolve a cor primária da loja para uso no tema da vitrine.
 *
 * Aceita HEX (com/sem `#`, longo ou curto), RGB e HSL. Para qualquer
 * outro formato, retorna a cor padrão do Gear Sales — garantindo que
 * a vitrine continue parecendo um produto Gear Sales mesmo quando a
 * loja envia um valor inválido.
 */
export function resolveVitrinePrimaryColor(
  corPrincipal: string | null | undefined
): string {
  if (!corPrincipal?.trim()) {
    return DEFAULT_PRIMARY_COLOR
  }

  const color = corPrincipal.trim()

  if (HEX_FULL.test(color)) {
    return color.toLowerCase()
  }

  const candidateHex = normalizeHexColor(color, "")
  if (candidateHex) {
    return candidateHex
  }

  const rgbMatch = color.match(RGB_COLOR)
  if (
    rgbMatch &&
    isRgbChannelValid(rgbMatch[1]) &&
    isRgbChannelValid(rgbMatch[2]) &&
    isRgbChannelValid(rgbMatch[3])
  ) {
    return color
  }

  const hslMatch = color.match(HSL_COLOR)
  if (hslMatch) {
    const hue = Number(hslMatch[1])
    const saturation = Number(hslMatch[2])
    const lightness = Number(hslMatch[3])
    if (
      hue >= 0 &&
      hue <= 360 &&
      saturation >= 0 &&
      saturation <= 100 &&
      lightness >= 0 &&
      lightness <= 100
    ) {
      return color
    }
  }

  return DEFAULT_PRIMARY_COLOR
}
