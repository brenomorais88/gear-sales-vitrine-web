import type { VitrineAnuncio } from "@/src/types/anuncio"
import { formatAno, formatKm, formatLocation } from "@/src/utils/format"

interface AnuncioSpecsProps {
  anuncio: VitrineAnuncio
}

interface SpecRow {
  label: string
  value: string
}

function pushIf(rows: SpecRow[], label: string, value: string | null) {
  const trimmed = value?.trim()
  if (trimmed) {
    rows.push({ label, value: trimmed })
  }
}

export function AnuncioSpecs({ anuncio }: AnuncioSpecsProps) {
  const location = formatLocation(anuncio.cidade, anuncio.estado)

  const rows: SpecRow[] = []
  pushIf(rows, "Marca", anuncio.marca)
  pushIf(rows, "Modelo", anuncio.modelo)
  pushIf(rows, "Versão", anuncio.versao)
  rows.push({
    label: "Ano",
    value: formatAno(anuncio.anoFabricacao, anuncio.anoModelo),
  })
  rows.push({ label: "Quilometragem", value: formatKm(anuncio.quilometragem) })
  pushIf(rows, "Câmbio", anuncio.cambio)
  pushIf(rows, "Combustível", anuncio.combustivel)
  pushIf(rows, "Cor", anuncio.cor)
  pushIf(rows, "Carroceria", anuncio.carroceria)
  if (anuncio.portas != null) {
    rows.push({ label: "Portas", value: String(anuncio.portas) })
  }
  pushIf(rows, "Localização", location)

  return (
    <section className="anuncio-section" aria-labelledby="anuncio-specs-title">
      <h2 id="anuncio-specs-title" className="anuncio-section__title">
        Dados do veículo
      </h2>
      <dl className="anuncio-specs">
        {rows.map((row) => (
          <div key={row.label} className="anuncio-specs__row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
