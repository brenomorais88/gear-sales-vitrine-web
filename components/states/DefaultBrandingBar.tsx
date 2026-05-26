import { GearSalesLogo } from "@/components/shared/GearSalesLogo"
import {
  GEAR_SALES_BRAND_TAGLINE,
  GEAR_SALES_SITE_URL,
} from "@/src/lib/gear-sales-brand"

/**
 * Identidade padrão Gear Sales usada quando a loja não está disponível
 * (não encontrada, erro de carregamento ou domínio inválido).
 */
export function DefaultBrandingBar() {
  return (
    <header className="state-default-brand">
      <div className="state-default-brand__inner">
        <a
          href={GEAR_SALES_SITE_URL}
          className="state-default-brand__logo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Site institucional Gear Sales"
        >
          <GearSalesLogo />
        </a>
        <span className="state-default-brand__tag">
          {GEAR_SALES_BRAND_TAGLINE}
        </span>
      </div>
    </header>
  )
}
