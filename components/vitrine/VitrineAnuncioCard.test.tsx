import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { VitrineAnuncioCard } from "@/components/vitrine/VitrineAnuncioCard"
import type { PublicVitrineAnuncioCardResponse } from "@/src/types/vitrine"

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

const anuncioComFoto: PublicVitrineAnuncioCardResponse = {
  id: "anuncio-001",
  titulo: "Toyota Corolla 2021",
  valorVenda: "89900",
  marca: { id: "m1", nome: "Toyota" },
  modelo: { id: "mo1", nome: "Corolla" },
  anoModelo: "2021",
  quilometragem: "25000",
  cambio: "AUTOMATICO",
  combustivel: "FLEX",
  cidade: "São Paulo",
  estado: "SP",
  fotoPrincipalUrl: "https://example.com/foto.jpg",
  totalFotos: 2,
}

const anuncioSemFoto: PublicVitrineAnuncioCardResponse = {
  id: "anuncio-sem-foto",
  titulo: "Veículo sem foto",
  valorVenda: "50000",
  marca: { id: "m1", nome: "Toyota" },
  modelo: { id: "mo1", nome: "Corolla" },
  anoModelo: "2019",
  quilometragem: "80000",
  cambio: "MANUAL",
  combustivel: "FLEX",
  cidade: "São Paulo",
  estado: "SP",
  fotoPrincipalUrl: null,
  totalFotos: 0,
}

describe("VitrineAnuncioCard", () => {
  it("renderiza card com foto e preço formatado", () => {
    render(<VitrineAnuncioCard anuncio={anuncioComFoto} />)

    expect(screen.getByRole("link")).toHaveAttribute("href", "/anuncios/anuncio-001")
    expect(screen.getByText("Toyota Corolla 2021")).toBeInTheDocument()
    expect(screen.getByText(/R\$\s*89\.900/)).toBeInTheDocument()
    expect(screen.getByAltText("Toyota Corolla 2021")).toBeInTheDocument()
    expect(screen.getByText("Ver detalhes")).toBeInTheDocument()
  })

  it("renderiza placeholder quando não há foto", () => {
    const { container } = render(<VitrineAnuncioCard anuncio={anuncioSemFoto} />)

    expect(screen.getByText("Foto indisponível")).toBeInTheDocument()
    expect(container.querySelector(".vitrine-anuncio-card__image")).toBeNull()
    expect(container.querySelector(".vitrine-anuncio-card__image-placeholder")).toBeTruthy()
  })
})
