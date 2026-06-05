import { describe, expect, it } from "vitest"

import {
  buildVitrineLeadPayload,
  formatTelefoneMask,
  hasFieldErrors,
  validateVitrineLeadForm,
} from "@/src/lib/vitrine-lead-validation"

const validValues = {
  nome: "João Silva",
  telefone: "(11) 98888-7777",
  email: "joao@email.com",
  mensagem: "Tenho interesse",
  valorEntrada: "10000",
  quantidadeParcelas: "48",
}

describe("vitrine-lead-validation", () => {
  it("aplica máscara de telefone", () => {
    expect(formatTelefoneMask("11988887777")).toBe("(11) 98888-7777")
  })

  it("rejeita nome e telefone inválidos", () => {
    const errors = validateVitrineLeadForm(
      "interest",
      { ...validValues, nome: "A", telefone: "123" },
      { dominio: "loja.teste.gearsales.com.br", anuncioId: "anuncio-001" }
    )
    expect(errors.nome).toBeTruthy()
    expect(errors.telefone).toBeTruthy()
    expect(hasFieldErrors(errors)).toBe(true)
  })

  it("rejeita e-mail inválido", () => {
    const errors = validateVitrineLeadForm(
      "general",
      { ...validValues, email: "email-invalido" },
      { dominio: "loja.teste.gearsales.com.br" }
    )
    expect(errors.email).toBeTruthy()
  })

  it("rejeita parcelas inválidas na simulação", () => {
    const errors = validateVitrineLeadForm(
      "financing",
      { ...validValues, quantidadeParcelas: "120" },
      { dominio: "loja.teste.gearsales.com.br", anuncioId: "anuncio-001" }
    )
    expect(errors.quantidadeParcelas).toBeTruthy()
  })

  it("monta payload de contato geral sem anuncioId", () => {
    const payload = buildVitrineLeadPayload(
      "general",
      validValues,
      "loja.teste.gearsales.com.br"
    )
    expect(payload.tipo).toBe("CONTATO_GERAL")
    expect(payload.dominio).toBe("loja.teste.gearsales.com.br")
    expect("anuncioId" in payload).toBe(false)
    expect("lojaId" in payload).toBe(false)
  })

  it("monta payload de interesse com anuncioId", () => {
    const payload = buildVitrineLeadPayload(
      "interest",
      validValues,
      "loja.teste.gearsales.com.br",
      "anuncio-001"
    )
    expect(payload.tipo).toBe("INTERESSE_ANUNCIO")
    expect(payload.anuncioId).toBe("anuncio-001")
  })

  it("monta payload de financiamento com campos extras", () => {
    const payload = buildVitrineLeadPayload(
      "financing",
      validValues,
      "loja.teste.gearsales.com.br",
      "anuncio-001"
    )
    expect(payload.tipo).toBe("SIMULACAO_FINANCIAMENTO")
    expect(payload.valorEntrada).toBe("10000")
    expect(payload.quantidadeParcelas).toBe(48)
  })
})
