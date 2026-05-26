import type { VitrineLoja } from "@/src/types/vitrine"

import { formatLocation } from "@/src/utils/format"

const INSTITUCIONAL_FALLBACK =
  "Esta loja ainda não adicionou uma descrição institucional."

const INTRO_MAX_LENGTH = 200

export function getLojaDisplayName(loja: VitrineLoja): string {
  return loja.nome
}

/**
 * Texto curto usado em heros (até ~200 caracteres). Sempre derivado de `descricao`.
 */
export function getLojaIntroCurta(loja: VitrineLoja): string | null {
  const descricao = loja.descricao?.trim()
  if (!descricao) {
    return null
  }
  return descricao.length > INTRO_MAX_LENGTH
    ? `${descricao.slice(0, INTRO_MAX_LENGTH).trim()}…`
    : descricao
}

/**
 * Texto completo institucional para a página /sobre. Quando ausente,
 * devolve um fallback discreto sinalizado em `isFallback`.
 */
export function getLojaTextoInstitucional(loja: VitrineLoja): {
  texto: string
  isFallback: boolean
} {
  const texto = loja.descricao?.trim() || ""
  if (texto) {
    return { texto, isFallback: false }
  }
  return { texto: INSTITUCIONAL_FALLBACK, isFallback: true }
}

/**
 * Endereço público de exibição. O backend público só expõe cidade/estado.
 */
export function formatLojaEnderecoCompleto(loja: VitrineLoja): string | null {
  return formatLocation(loja.cidade, loja.estado)
}

export function getLojaEnderecoParaMapa(loja: VitrineLoja): string | null {
  const parts = [loja.cidade?.trim(), loja.estado?.trim()].filter(Boolean)
  return parts.length > 0 ? parts.join(", ") : null
}

export function hasLojaLocalizacao(loja: VitrineLoja): boolean {
  return Boolean(loja.cidade?.trim() || loja.estado?.trim())
}
