import Link from "next/link"

/**
 * Identidade padrão Gear Sales quando a loja não está disponível.
 */
export function DefaultBrandingBar() {
  return (
    <header className="state-default-brand">
      <div className="state-default-brand__inner">
        <Link href="https://gearsales.com.br" className="state-default-brand__logo">
          Gear Sales
        </Link>
        <span className="state-default-brand__tag">Vitrine digital</span>
      </div>
    </header>
  )
}
