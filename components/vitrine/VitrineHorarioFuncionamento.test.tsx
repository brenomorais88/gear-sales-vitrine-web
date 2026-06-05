import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { VitrineHorarioFuncionamento } from "@/components/vitrine/VitrineHorarioFuncionamento"

describe("VitrineHorarioFuncionamento", () => {
  it("exibe horários formatados", () => {
    render(
      <VitrineHorarioFuncionamento
        horario={{
          segunda: "08:00-18:00",
          terca: "fechado",
        }}
      />
    )

    expect(screen.getByText("Horário de funcionamento")).toBeInTheDocument()
    expect(screen.getByText("08:00 - 18:00")).toBeInTheDocument()
    expect(screen.getByText("Fechado")).toBeInTheDocument()
  })

  it("exibe mensagem quando horário não foi informado", () => {
    render(<VitrineHorarioFuncionamento horario={null} />)

    expect(
      screen.getByText("Horário de funcionamento não informado.")
    ).toBeInTheDocument()
  })
})
