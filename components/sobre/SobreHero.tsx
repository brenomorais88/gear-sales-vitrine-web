import { SafeImage } from "@/components/shared/SafeImage"
import type { VitrineLoja } from "@/src/types/vitrine"
import { formatLocation, getInitials } from "@/src/utils/format"
import { getLojaDisplayName, getLojaIntroCurta } from "@/src/utils/loja"

interface SobreHeroProps {
  loja: VitrineLoja
}

export function SobreHero({ loja }: SobreHeroProps) {
  const displayName = getLojaDisplayName(loja)
  const location = formatLocation(loja.cidade, loja.estado)
  const intro = getLojaIntroCurta(loja)

  return (
    <section className="sobre-hero" aria-label="Apresentação institucional">
      <div className="sobre-hero__media">
        {loja.bannerUrl ? (
          <SafeImage
            src={loja.bannerUrl}
            alt={`Banner da loja ${displayName}`}
            className="sobre-hero__image"
          />
        ) : (
          <div className="sobre-hero__placeholder" aria-hidden />
        )}
        <div className="sobre-hero__overlay" />
      </div>

      <div className="sobre-hero__content">
        <div className="sobre-hero__inner">
          <div className="sobre-hero__brand">
            <div className="sobre-hero__logo">
              {loja.logoUrl ? (
                <SafeImage src={loja.logoUrl} alt={`Logo ${displayName}`} />
              ) : (
                <span className="sobre-hero__logo-fallback" aria-hidden>
                  {getInitials(displayName)}
                </span>
              )}
            </div>
            <div>
              <p className="sobre-hero__eyebrow">Sobre a loja</p>
              <h1 className="sobre-hero__title">{displayName}</h1>
              {location ? (
                <p className="sobre-hero__location">{location}</p>
              ) : null}
            </div>
          </div>

          {intro ? <p className="sobre-hero__intro">{intro}</p> : null}
        </div>
      </div>
    </section>
  )
}
