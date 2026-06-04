import type { VitrineLoja } from "@/src/types/vitrine"

interface VitrineHomeProps {
  vitrine: VitrineLoja
}

export function VitrineHome({ vitrine }: VitrineHomeProps) {
  return (
    <div className="vitrine-home">
      <section className="vitrine-home__welcome">
        <h2>Bem-vindo à vitrine de {vitrine.nome}</h2>
        {vitrine.descricao && (
          <p className="vitrine-home__description">{vitrine.descricao}</p>
        )}
        <p className="vitrine-home__placeholder">
          Em breve, você verá os anúncios desta loja aqui.
        </p>
      </section>

      <section id="estoque" className="vitrine-home__estoque">
        {/* Futura área de estoque */}
      </section>
    </div>
  )
}
