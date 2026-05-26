import { StatePage } from "@/components/states/StatePage"
import { GEAR_SALES_SITE_URL } from "@/src/lib/gear-sales-brand"

/**
 * Loja não encontrada ou indisponível (ex.: domínio sem vitrine cadastrada).
 *
 * Mostra mensagem amigável e direciona o visitante para o site institucional
 * do Gear Sales — evitando erro técnico, loading infinito ou tela em branco.
 */
export function VitrineUnavailable() {
  return (
    <StatePage
      icon="not-found"
      title="Loja não encontrada"
      description="A página que você tentou acessar não está disponível ou foi removida."
    >
      <a
        href={GEAR_SALES_SITE_URL}
        className="vitrine-btn vitrine-btn--primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        Conheça o Gear Sales
      </a>
    </StatePage>
  )
}
