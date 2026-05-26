import { SafeImage } from "@/components/shared/SafeImage"
import {
  buildLojaWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/src/lib/whatsapp"
import type { VitrineLoja } from "@/src/types/vitrine"
import { formatLocation } from "@/src/utils/format"
import { getLojaDisplayName, getLojaIntroCurta } from "@/src/utils/loja"

interface HomeHeroProps {
  loja: VitrineLoja
}

export function HomeHero({ loja }: HomeHeroProps) {
  const displayName = getLojaDisplayName(loja)
  const location = formatLocation(loja.cidade, loja.estado)
  const intro = getLojaIntroCurta(loja)
  const whatsappHref = loja.whatsapp
    ? buildWhatsAppUrl(loja.whatsapp, buildLojaWhatsAppMessage(displayName))
    : null

  return (
    <section className="home-hero" aria-label="Apresentação da loja">
      <div className="home-hero__media">
        {loja.bannerUrl ? (
          <SafeImage
            src={loja.bannerUrl}
            alt={`Banner da loja ${displayName}`}
            className="home-hero__image"
          />
        ) : (
          <div className="home-hero__placeholder" aria-hidden />
        )}
        <div className="home-hero__overlay" />
      </div>

      <div className="home-hero__content">
        <div className="home-hero__inner">
          {loja.logoUrl ? (
            <div className="home-hero__logo">
              <SafeImage src={loja.logoUrl} alt={`Logo ${displayName}`} />
            </div>
          ) : null}

          <h1 className="home-hero__title">{displayName}</h1>

          {intro ? <p className="home-hero__intro">{intro}</p> : null}
          {location ? <p className="home-hero__location">{location}</p> : null}

          <div className="home-hero__actions">
            <a href="#veiculos" className="vitrine-btn vitrine-btn--primary">
              Ver veículos
            </a>
            {whatsappHref ? (
              <a
                href={whatsappHref}
                className="vitrine-btn vitrine-btn--outline home-hero__whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
