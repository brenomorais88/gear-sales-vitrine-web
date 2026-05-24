export function buildTelHref(telefone: string): string {
  const digits = telefone.replace(/\D/g, "")
  return digits ? `tel:+${digits.startsWith("55") ? digits : `55${digits}`}` : "#"
}
