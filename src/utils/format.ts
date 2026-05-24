export function formatLocation(
  cidade?: string | null,
  estado?: string | null
): string | null {
  const parts = [cidade, estado].filter(Boolean)
  return parts.length > 0 ? parts.join(" - ") : null
}

export function getInitials(nome: string): string {
  return nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export function formatKm(value: number): string {
  return `${value.toLocaleString("pt-BR")} km`
}

export function formatAno(
  anoFabricacao: number,
  anoModelo: number
): string {
  if (anoFabricacao === anoModelo) {
    return String(anoModelo)
  }
  return `${anoFabricacao}/${anoModelo}`
}

export function formatMarcaModelo(
  marca: string,
  modelo: string,
  versao?: string | null
): string {
  const base = `${marca} ${modelo}`
  return versao?.trim() ? `${base} ${versao}` : base
}
