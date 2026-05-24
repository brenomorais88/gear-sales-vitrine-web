import type { VitrineLoja } from "@/src/types/vitrine"

import { formatLocation } from "@/src/utils/format"

const INSTITUCIONAL_FALLBACK =
  "Esta loja ainda não adicionou uma descrição institucional."

export function getLojaDisplayName(loja: VitrineLoja): string {
  return loja.nomePublico?.trim() || loja.nome
}

export function getLojaIntroCurta(loja: VitrineLoja): string | null {
  return (
    loja.descricao?.trim() ||
    loja.textoInstitucional?.trim().slice(0, 200) ||
    null
  )
}

export function getLojaTextoInstitucional(loja: VitrineLoja): {
  texto: string
  isFallback: boolean
} {
  const texto =
    loja.textoInstitucional?.trim() || loja.descricao?.trim() || ""

  if (texto) {
    return { texto, isFallback: false }
  }

  return { texto: INSTITUCIONAL_FALLBACK, isFallback: true }
}

export function formatLojaEnderecoCompleto(loja: VitrineLoja): string | null {
  const endereco = loja.endereco?.trim()
  const location = formatLocation(loja.cidade, loja.estado)

  if (endereco && location) {
    return `${endereco} · ${location}`
  }

  return endereco || location
}

export function getLojaEnderecoParaMapa(loja: VitrineLoja): string | null {
  const parts = [
    loja.endereco?.trim(),
    loja.cidade?.trim(),
    loja.estado?.trim(),
  ].filter(Boolean)

  return parts.length > 0 ? parts.join(", ") : null
}

export function hasLojaLocalizacao(loja: VitrineLoja): boolean {
  return Boolean(
    loja.endereco?.trim() || loja.cidade?.trim() || loja.estado?.trim()
  )
}
