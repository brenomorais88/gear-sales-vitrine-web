/** Comprimento mínimo para considerar telefone válido (10 dígitos: DDD + 8). */
const MIN_PHONE_DIGITS = 10
/** Comprimento máximo aceito (13 dígitos: 55 + DDD + 9 móvel). */
const MAX_PHONE_DIGITS = 13

export function normalizePhoneDigits(
  telefone: string | null | undefined
): string | null {
  if (!telefone) {
    return null
  }

  const digits = telefone.replace(/\D/g, "")
  if (digits.length < MIN_PHONE_DIGITS || digits.length > MAX_PHONE_DIGITS) {
    return null
  }

  return digits.startsWith("55") ? digits : `55${digits}`
}

export function buildTelHref(
  telefone: string | null | undefined
): string | null {
  const digits = normalizePhoneDigits(telefone)
  return digits ? `tel:+${digits}` : null
}

export function isValidPhone(telefone: string | null | undefined): boolean {
  return normalizePhoneDigits(telefone) !== null
}
