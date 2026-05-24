interface AnuncioDescriptionProps {
  descricao: string | null | undefined
}

export function AnuncioDescription({ descricao }: AnuncioDescriptionProps) {
  const texto = descricao?.trim()

  return (
    <section className="anuncio-section" aria-labelledby="anuncio-desc-title">
      <h2 id="anuncio-desc-title" className="anuncio-section__title">
        Descrição
      </h2>
      {texto ? (
        <p className="anuncio-description">{texto}</p>
      ) : (
        <p className="anuncio-description anuncio-description--empty">
          Esta loja ainda não adicionou uma descrição para este veículo.
        </p>
      )}
    </section>
  )
}
