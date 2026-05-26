import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { SobreAbout } from "@/components/sobre/SobreAbout"
import { SobreContact } from "@/components/sobre/SobreContact"
import { SobreCtas } from "@/components/sobre/SobreCtas"
import { SobreHero } from "@/components/sobre/SobreHero"
import { SobreLocation } from "@/components/sobre/SobreLocation"
import { SobrePaginaPublica } from "@/components/sobre/SobrePaginaPublica"
import { SobreTrust } from "@/components/sobre/SobreTrust"
import type { VitrineLoja } from "@/src/types/vitrine"

interface SobreContentProps {
  loja: VitrineLoja
}

export function SobreContent({ loja }: SobreContentProps) {
  return (
    <>
      <SobreHero loja={loja} />
      <main className="vitrine-main sobre-page">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Sobre" },
          ]}
        />

        <div className="sobre-page__grid">
          <div className="sobre-page__main">
            <SobreAbout loja={loja} />
            <SobreContact loja={loja} />
            <SobreLocation loja={loja} />
            <SobrePaginaPublica loja={loja} />
            <SobreTrust />
          </div>

          <aside className="sobre-page__aside">
            <SobreCtas loja={loja} />
          </aside>
        </div>
      </main>
    </>
  )
}
