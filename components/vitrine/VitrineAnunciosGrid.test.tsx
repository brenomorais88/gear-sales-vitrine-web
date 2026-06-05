import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { VitrineAnunciosGrid } from "@/components/vitrine/VitrineAnunciosGrid"
import type { PublicVitrineAnuncioListResponse } from "@/src/types/vitrine"

vi.mock("@/components/vitrine/VitrineAnuncioCard", () => ({
  VitrineAnuncioCard: ({ anuncio }: { anuncio: { titulo: string } }) => (
    <div data-testid="anuncio-card">{anuncio.titulo}</div>
  ),
}))

const listagemVazia: PublicVitrineAnuncioListResponse = {
  items: [],
  page: 0,
  size: 12,
  totalItems: 0,
  totalPages: 0,
  appliedFilters: null,
}

describe("VitrineAnunciosGrid", () => {
  it("exibe estado vazio sem filtros", () => {
    render(
      <VitrineAnunciosGrid
        response={listagemVazia}
        isLoading={false}
        onPageChange={vi.fn()}
      />
    )

    expect(
      screen.getByText("Esta loja ainda não possui veículos disponíveis na vitrine.")
    ).toBeInTheDocument()
  })

  it("exibe estado vazio com filtros", () => {
    render(
      <VitrineAnunciosGrid
        response={{
          ...listagemVazia,
          appliedFilters: { texto: "semresultado" },
        }}
        isLoading={false}
        onPageChange={vi.fn()}
      />
    )

    expect(
      screen.getByText("Nenhum veículo encontrado com os filtros selecionados.")
    ).toBeInTheDocument()
  })

  it("exibe skeleton durante loading", () => {
    const { container } = render(
      <VitrineAnunciosGrid
        response={null}
        isLoading
        onPageChange={vi.fn()}
      />
    )

    expect(screen.getByLabelText("Carregando veículos")).toBeInTheDocument()
    expect(container.querySelectorAll(".vitrine-anuncios-skeleton-card").length).toBe(
      6
    )
  })
})
