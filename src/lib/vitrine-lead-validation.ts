import type {
  PublicVitrineLeadRequest,
  PublicVitrineLeadTipo,
  VitrineLeadModalMode,
} from "@/src/types/vitrine"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type VitrineLeadFieldErrors = Partial<
  Record<
    | "nome"
    | "telefone"
    | "email"
    | "mensagem"
    | "valorEntrada"
    | "quantidadeParcelas"
    | "anuncioId"
    | "dominio",
    string
  >
>

export type VitrineLeadFormValues = {
  nome: string
  telefone: string
  email: string
  mensagem: string
  valorEntrada: string
  quantidadeParcelas: string
}

export function countTelefoneDigits(telefone: string): number {
  return telefone.replace(/\D/g, "").length
}

export function formatTelefoneMask(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 15)

  if (digits.length === 0) {
    return ""
  }

  if (digits.length <= 2) {
    return `(${digits}`
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function modalModeToLeadTipo(mode: VitrineLeadModalMode): PublicVitrineLeadTipo {
  switch (mode) {
    case "interest":
      return "INTERESSE_ANUNCIO"
    case "financing":
      return "SIMULACAO_FINANCIAMENTO"
    case "general":
      return "CONTATO_GERAL"
  }
}

export function getDefaultMensagem(mode: VitrineLeadModalMode): string {
  switch (mode) {
    case "interest":
      return "Tenho interesse neste veículo. Ele ainda está disponível?"
    case "general":
      return "Gostaria de mais informações sobre os veículos disponíveis."
    case "financing":
      return ""
  }
}

export function validateVitrineLeadForm(
  mode: VitrineLeadModalMode,
  values: VitrineLeadFormValues,
  options?: { anuncioId?: string | null; dominio?: string }
): VitrineLeadFieldErrors {
  const errors: VitrineLeadFieldErrors = {}
  const tipo = modalModeToLeadTipo(mode)

  const dominio = options?.dominio?.trim()
  if (!dominio) {
    errors.dominio = "Domínio indisponível."
  }

  if (
    (tipo === "INTERESSE_ANUNCIO" || tipo === "SIMULACAO_FINANCIAMENTO") &&
    !options?.anuncioId?.trim()
  ) {
    errors.anuncioId = "Anúncio indisponível."
  }

  const nome = values.nome.trim()
  if (nome.length < 2) {
    errors.nome = "Informe seu nome com pelo menos 2 caracteres."
  } else if (nome.length > 100) {
    errors.nome = "O nome deve ter no máximo 100 caracteres."
  }

  const telefoneDigits = countTelefoneDigits(values.telefone)
  if (telefoneDigits === 0) {
    errors.telefone = "Informe seu telefone."
  } else if (telefoneDigits < 10 || telefoneDigits > 15) {
    errors.telefone = "O telefone deve ter entre 10 e 15 dígitos."
  }

  const email = values.email.trim()
  if (email) {
    if (email.length > 150) {
      errors.email = "O e-mail deve ter no máximo 150 caracteres."
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = "Informe um e-mail válido."
    }
  }

  const mensagem = values.mensagem.trim()
  if (mensagem.length > 1000) {
    errors.mensagem = "A mensagem deve ter no máximo 1000 caracteres."
  }

  if (mode === "financing") {
    const valorEntrada = values.valorEntrada.trim()
    if (valorEntrada.length > 50) {
      errors.valorEntrada = "O valor de entrada deve ter no máximo 50 caracteres."
    }

    const parcelasRaw = values.quantidadeParcelas.trim()
    if (parcelasRaw) {
      const parcelas = Number.parseInt(parcelasRaw, 10)
      if (
        !/^\d+$/.test(parcelasRaw) ||
        !Number.isFinite(parcelas) ||
        parcelas < 1 ||
        parcelas > 80
      ) {
        errors.quantidadeParcelas = "Informe entre 1 e 80 parcelas."
      }
    }
  }

  return errors
}

export function buildVitrineLeadPayload(
  mode: VitrineLeadModalMode,
  values: VitrineLeadFormValues,
  dominio: string,
  anuncioId?: string | null
): PublicVitrineLeadRequest {
  const tipo = modalModeToLeadTipo(mode)
  const defaultMensagem = getDefaultMensagem(mode)
  const mensagemTrim = values.mensagem.trim()
  const mensagem = mensagemTrim || defaultMensagem || null

  const base = {
    dominio: dominio.trim(),
    tipo,
    nome: values.nome.trim(),
    telefone: values.telefone.trim(),
    email: values.email.trim() || null,
    mensagem,
  }

  if (tipo === "CONTATO_GERAL") {
    return base
  }

  if (tipo === "INTERESSE_ANUNCIO") {
    return {
      ...base,
      anuncioId: anuncioId?.trim() || null,
    }
  }

  const parcelasRaw = values.quantidadeParcelas.trim()
  return {
    ...base,
    anuncioId: anuncioId?.trim() || null,
    valorEntrada: values.valorEntrada.trim() || null,
    quantidadeParcelas: parcelasRaw ? Number.parseInt(parcelasRaw, 10) : null,
  }
}

export function hasFieldErrors(errors: VitrineLeadFieldErrors): boolean {
  return Object.keys(errors).length > 0
}
