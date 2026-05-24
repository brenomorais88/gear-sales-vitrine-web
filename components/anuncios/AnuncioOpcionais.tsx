interface AnuncioOpcionaisProps {
  opcionais: string[]
}

export function AnuncioOpcionais({ opcionais }: AnuncioOpcionaisProps) {
  const items = opcionais.filter((item) => item.trim().length > 0)
  if (items.length === 0) return null

  return (
    <section className="anuncio-section" aria-labelledby="anuncio-opcionais-title">
      <h2 id="anuncio-opcionais-title" className="anuncio-section__title">
        Opcionais
      </h2>
      <ul className="anuncio-opcionais">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
