import type { VitrineLoja } from "@/src/types/vitrine"
import { getLojaTextoInstitucional } from "@/src/utils/loja"

interface SobreAboutProps {
  loja: VitrineLoja
}

export function SobreAbout({ loja }: SobreAboutProps) {
  const { texto, isFallback } = getLojaTextoInstitucional(loja)

  return (
    <section className="sobre-section" aria-labelledby="sobre-about-title">
      <h2 id="sobre-about-title" className="sobre-section__title">
        Sobre a loja
      </h2>
      <p
        className={`sobre-about__text${isFallback ? " sobre-about__text--fallback" : ""}`}
      >
        {texto}
      </p>
    </section>
  )
}
