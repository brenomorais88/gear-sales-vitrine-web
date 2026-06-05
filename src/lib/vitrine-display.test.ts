import { describe, expect, it } from "vitest"

import {
  buildVitrineWhatsAppLink,
  formatDiaHorario,
  formatVitrineLocation,
  getHorarioValorModifier,
  getVitrineInitials,
  hasHorarioFuncionamento,
} from "@/src/lib/vitrine-display"

describe("vitrine-display", () => {
  it("formata localização com cidade e estado", () => {
    expect(formatVitrineLocation("São Paulo", "SP")).toBe("São Paulo - SP")
  })

  it("retorna null quando localização está vazia", () => {
    expect(formatVitrineLocation(null, null)).toBeNull()
  })

  it("monta iniciais da loja", () => {
    expect(getVitrineInitials("Gear Sales Zona Sul")).toBe("GS")
  })

  it("monta URL do WhatsApp com mensagem", () => {
    const url = buildVitrineWhatsAppLink("(11) 98888-7777", "Revenda Teste")
    expect(url).toContain("https://wa.me/11988887777")
    expect(url).toContain("text=")
  })

  it("formata horário fechado", () => {
    expect(formatDiaHorario("fechado")).toBe("Fechado")
  })

  it("formata faixa de horário", () => {
    expect(formatDiaHorario("08:00-18:00")).toBe("08:00 - 18:00")
  })

  it("retorna não informado para horário vazio", () => {
    expect(formatDiaHorario(null)).toBe("Não informado")
  })

  it("identifica modificador de horário", () => {
    expect(getHorarioValorModifier("fechado")).toBe("fechado")
    expect(getHorarioValorModifier("")).toBe("nao-informado")
    expect(getHorarioValorModifier("08:00-18:00")).toBe("aberto")
  })

  it("detecta horário de funcionamento preenchido", () => {
    expect(
      hasHorarioFuncionamento({
        segunda: "08:00-18:00",
      })
    ).toBe(true)
    expect(hasHorarioFuncionamento(null)).toBe(false)
  })
})
