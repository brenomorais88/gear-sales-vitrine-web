import type { VitrineAnuncio } from "@/src/types/anuncio"
import { formatAno, formatKm, formatLocation } from "@/src/utils/format"

interface AnuncioSpecsProps {
  anuncio: VitrineAnuncio
}

interface SpecRow {
  label: string
  value: string
}

export function AnuncioSpecs({ anuncio }: AnuncioSpecsProps) {
  const location = formatLocation(anuncio.cidade, anuncio.estado)

  const rows: SpecRow[] = [
    { label: "Marca", value: anuncio.marca },
    { label: "Modelo", value: anuncio.modelo },
    ...(anuncio.versao
      ? [{ label: "Versão", value: anuncio.versao }]
      : []),
    {
      label: "Ano",
      value: formatAno(anuncio.anoFabricacao, anuncio.anoModelo),
    },
    { label: "Quilometragem", value: formatKm(anuncio.quilometragem) },
    { label: "Câmbio", value: anuncio.cambio },
    { label: "Combustível", value: anuncio.combustivel },
    { label: "Cor", value: anuncio.cor },
    ...(anuncio.carroceria
      ? [{ label: "Carroceria", value: anuncio.carroceria }]
      : []),
    ...(anuncio.portas != null
      ? [{ label: "Portas", value: String(anuncio.portas) }]
      : []),
    ...(location ? [{ label: "Localização", value: location }] : []),
  ]

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
