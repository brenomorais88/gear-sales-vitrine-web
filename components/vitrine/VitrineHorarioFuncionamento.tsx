import {
  formatDiaHorario,
  getHorarioValorModifier,
  hasHorarioFuncionamento,
  VITRINE_DIAS_SEMANA,
} from "@/src/lib/vitrine-display"
import type { PublicHorarioFuncionamentoResponse } from "@/src/types/vitrine"

interface VitrineHorarioFuncionamentoProps {
  horario?: PublicHorarioFuncionamentoResponse | null
}

export function VitrineHorarioFuncionamento({
  horario,
}: VitrineHorarioFuncionamentoProps) {
  const possuiHorario = hasHorarioFuncionamento(horario)

  return (
    <section
      className="vitrine-sobre-card"
      aria-labelledby="vitrine-sobre-hours-title"
    >
      <h2 id="vitrine-sobre-hours-title" className="vitrine-sobre-card__title">
        Horário de funcionamento
      </h2>

      {!possuiHorario ? (
        <p className="vitrine-sobre-card__muted">
          Horário de funcionamento não informado.
        </p>
      ) : (
        <dl className="vitrine-sobre-horario">
          {VITRINE_DIAS_SEMANA.map(({ key, label }) => {
            const valorBruto = horario?.[key]
            const modifier = getHorarioValorModifier(valorBruto)

            return (
              <div key={key} className="vitrine-sobre-horario__row">
                <dt className="vitrine-sobre-horario__dia">{label}</dt>
                <dd
                  className={`vitrine-sobre-horario__valor vitrine-sobre-horario__valor--${modifier}`}
                >
                  {formatDiaHorario(valorBruto)}
                </dd>
              </div>
            )
          })}
        </dl>
      )}
    </section>
  )
}
