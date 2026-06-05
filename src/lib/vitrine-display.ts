import type { PublicHorarioFuncionamentoResponse } from "@/src/types/vitrine"

export const VITRINE_DIAS_SEMANA = [
  { key: "segunda", label: "Segunda-feira" },
  { key: "terca", label: "Terça-feira" },
  { key: "quarta", label: "Quarta-feira" },
  { key: "quinta", label: "Quinta-feira" },
  { key: "sexta", label: "Sexta-feira" },
  { key: "sabado", label: "Sábado" },
  { key: "domingo", label: "Domingo" },
] as const satisfies ReadonlyArray<{
  key: keyof PublicHorarioFuncionamentoResponse
  label: string
}>

export function getVitrineInitials(nome: string): string {
  return nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function formatVitrineLocation(
  cidade?: string | null,
  estado?: string | null
): string | null {
  const cidadeTrim = cidade?.trim()
  const estadoTrim = estado?.trim()

  if (cidadeTrim && estadoTrim) {
    return `${cidadeTrim} - ${estadoTrim}`
  }

  if (cidadeTrim) {
    return cidadeTrim
  }

  if (estadoTrim) {
    return estadoTrim
  }

  return null
}

export function buildVitrineWhatsAppLink(
  whatsapp: string,
  nomeLoja: string,
  mensagem = `Olá, encontrei a vitrine da ${nomeLoja} e gostaria de mais informações.`
): string {
  const numero = whatsapp.replace(/\D/g, "")
  const url = new URL(`https://wa.me/${numero}`)
  url.searchParams.set("text", mensagem)
  return url.toString()
}

export function formatDiaHorario(valor: string | null | undefined): string {
  if (!valor?.trim()) {
    return "Não informado"
  }

  const trimmed = valor.trim()

  if (trimmed.toLowerCase() === "fechado") {
    return "Fechado"
  }

  if (trimmed.includes("-")) {
    return trimmed.replace("-", " - ")
  }

  return trimmed
}

export function getHorarioValorModifier(
  valor: string | null | undefined
): "fechado" | "nao-informado" | "aberto" {
  if (!valor?.trim()) {
    return "nao-informado"
  }

  if (valor.trim().toLowerCase() === "fechado") {
    return "fechado"
  }

  return "aberto"
}

export function hasHorarioFuncionamento(
  horario?: PublicHorarioFuncionamentoResponse | null
): boolean {
  if (!horario) {
    return false
  }

  return VITRINE_DIAS_SEMANA.some(({ key }) => {
    const valor = horario[key]
    return typeof valor === "string" && valor.trim().length > 0
  })
}
