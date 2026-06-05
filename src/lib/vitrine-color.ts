const HEX_COLOR = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
const RGB_COLOR =
  /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i
const HSL_COLOR =
  /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i

const DEFAULT_PRIMARY = "#B70000"

function isRgbChannelValid(value: string): boolean {
  const channel = Number(value)
  return Number.isInteger(channel) && channel >= 0 && channel <= 255
}

/**
 * Valida cor vinda do backend antes de aplicar na UI.
 */
export function resolveVitrinePrimaryColor(
  corPrincipal: string | null | undefined
): string {
  if (!corPrincipal?.trim()) {
    return DEFAULT_PRIMARY
  }

  const color = corPrincipal.trim()

  if (HEX_COLOR.test(color)) {
    return color
  }

  const rgbMatch = color.match(RGB_COLOR)
  if (rgbMatch && isRgbChannelValid(rgbMatch[1]) && isRgbChannelValid(rgbMatch[2]) && isRgbChannelValid(rgbMatch[3])) {
    return color
  }

  const hslMatch = color.match(HSL_COLOR)
  if (hslMatch) {
    const hue = Number(hslMatch[1])
    const saturation = Number(hslMatch[2])
    const lightness = Number(hslMatch[3])
    if (hue >= 0 && hue <= 360 && saturation >= 0 && saturation <= 100 && lightness >= 0 && lightness <= 100) {
      return color
    }
  }

  return DEFAULT_PRIMARY
}
