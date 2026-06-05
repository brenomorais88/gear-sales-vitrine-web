import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { VitrineHeader } from "@/components/vitrine/VitrineHeader"
import type { VitrineLoja } from "@/src/types/vitrine"

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

const mockUsePathname = vi.fn(() => "/")

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}))

const vitrineComLogo: VitrineLoja = {
  id: "loja-001",
  nome: "Revenda Teste",
  enderecoPaginaPublica: "revendateste",
  urlPublica: "https://loja.teste.gearsales.com.br",
  logoUrl: "https://example.com/logo.png",
  corPrincipal: "#c2410c",
}

const vitrineSemLogo: VitrineLoja = {
  ...vitrineComLogo,
  logoUrl: null,
}

describe("VitrineHeader", () => {
  it("renderiza logo quando disponível", () => {
    render(<VitrineHeader vitrine={vitrineComLogo} />)

    expect(document.querySelector(".vitrine-header__logo")).toBeTruthy()
    expect(screen.getByText("Revenda Teste")).toBeInTheDocument()
    expect(screen.getByRole("navigation", { name: "Navegação principal" })).toBeInTheDocument()
  })

  it("renderiza fallback de logo quando ausente", () => {
    render(<VitrineHeader vitrine={vitrineSemLogo} />)

    expect(screen.queryByAltText("Logo Revenda Teste")).not.toBeInTheDocument()
    expect(document.querySelector(".vitrine-header__logo-placeholder")).toBeTruthy()
  })
})
