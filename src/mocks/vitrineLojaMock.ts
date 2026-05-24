import { GEAR_SALES_DEFAULT_PRIMARY } from "@/src/lib/vitrine-color"
import type { VitrineLoja } from "@/src/types/vitrine"

export { GEAR_SALES_DEFAULT_PRIMARY }

export const VITRINE_LOJA_MOCK_ID = "loja-geargarage"

export const vitrineLojaMock: VitrineLoja = {
  id: VITRINE_LOJA_MOCK_ID,
  nome: "Gear Garage Comércio de Veículos Ltda.",
  nomePublico: "Gear Garage",
  descricao:
    "Seminovos selecionados com procedência, revisão completa e atendimento personalizado em Curitiba.",
  textoInstitucional:
    "A Gear Garage nasceu para oferecer uma experiência transparente na compra de carros e motos seminovos. " +
    "Trabalhamos com veículos revisados, histórico consultado e equipe especializada para encontrar o modelo ideal para você. " +
    "Visite nossa loja, agende um test-drive ou fale conosco pelo WhatsApp.",
  telefone: "(41) 3333-4444",
  whatsapp: "5541999887766",
  email: "contato@geargarage.com.br",
  cidade: "Curitiba",
  estado: "PR",
  endereco: "Av. das Torres, 1200 — Portão, Curitiba — PR",
  horarioFuncionamento: "Segunda a sexta, 9h às 18h · Sábado, 9h às 13h",
  logoUrl: null,
  bannerUrl: null,
  corPrincipal: GEAR_SALES_DEFAULT_PRIMARY,
  enderecoPaginaPublica: "geargarage",
  urlPublica: "https://geargarage.gearsales.com.br",
}

/** Domínios que resolvem para a loja mockada. */
export const MOCK_LOJA_DOMAINS = [
  "geargarage.gearsales.com.br",
  "geargarage.gearsales.dev",
  "geargarage.localhost",
] as const

export function isMockLojaDomain(dominio: string): boolean {
  const normalized = dominio.trim().toLowerCase()
  if (MOCK_LOJA_DOMAINS.includes(normalized as (typeof MOCK_LOJA_DOMAINS)[number])) {
    return true
  }
  return normalized.startsWith(`${vitrineLojaMock.enderecoPaginaPublica}.`)
}
