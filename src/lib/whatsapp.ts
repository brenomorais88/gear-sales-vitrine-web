/**
 * Utilitários de WhatsApp da vitrine.
 *
 * Regras de validação:
 *  - Aceita apenas dígitos válidos (entre 10 e 13 após DDI).
 *  - Não duplica o DDI 55 quando o número já vem com ele.
 *  - Remove parênteses, espaços, traços e qualquer caractere não numérico.
 *  - Retorna `null` quando o número é inválido — para evitar renderizar
 *    botões "quebrados" na vitrine pública.
 */

/** Número mínimo (10 dígitos: DDD + 8) e máximo (13 dígitos: 55 + DDD + 9) após normalização. */
const MIN_DIGITS = 10
const MAX_DIGITS = 13

export function normalizeWhatsAppDigits(
  whatsapp: string | null | undefined
): string | null {
  if (!whatsapp) {
    return null
  }

  const digits = whatsapp.replace(/\D/g, "")
  if (!digits) {
    return null
  }

  const withCountry =
    digits.length <= 11 && !digits.startsWith("55") ? `55${digits}` : digits

  if (withCountry.length < MIN_DIGITS || withCountry.length > MAX_DIGITS) {
    return null
  }

  return withCountry
}

/**
 * Compatível com a API antiga (retorna string mesmo se inválido).
 * Prefira `normalizeWhatsAppDigits` para validação.
 */
export function normalizeWhatsAppNumber(whatsapp: string): string {
  return normalizeWhatsAppDigits(whatsapp) ?? ""
}

export function buildWhatsAppUrl(
  whatsapp: string | null | undefined,
  message?: string
): string | null {
  const number = normalizeWhatsAppDigits(whatsapp)
  if (!number) {
    return null
  }

  const base = `https://wa.me/${number}`
  if (!message?.trim()) {
    return base
  }
  return `${base}?text=${encodeURIComponent(message.trim())}`
}

export function buildLojaWhatsAppMessage(nomePublico: string): string {
  return `Olá! Vim pela vitrine da ${nomePublico} e gostaria de mais informações.`
}

export function buildAnuncioWhatsAppMessage(
  titulo: string,
  nomeDaLoja: string
): string {
  return `Olá, vi o anúncio do ${titulo} na vitrine da ${nomeDaLoja} e tenho interesse.`
}
