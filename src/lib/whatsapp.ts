/**
 * Normaliza número para link wa.me (apenas dígitos; adiciona 55 se parecer número BR local).
 */
export function normalizeWhatsAppNumber(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "")
  if (digits.length <= 11 && !digits.startsWith("55")) {
    return `55${digits}`
  }
  return digits
}

export function buildWhatsAppUrl(
  whatsapp: string,
  message?: string
): string {
  const number = normalizeWhatsAppNumber(whatsapp)
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
