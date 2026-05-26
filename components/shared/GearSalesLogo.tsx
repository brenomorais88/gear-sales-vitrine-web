import { GEAR_SALES_BRAND_NAME } from "@/src/lib/gear-sales-brand"

interface GearSalesLogoProps {
  /** Quando true, usa cor branca (para fundos escuros). */
  inverted?: boolean
  /** Tamanho aplicado ao SVG. Texto escala junto. */
  size?: "sm" | "md"
  className?: string
}

/**
 * Marca compacta do Gear Sales — usada no rodapé da vitrine e nas telas
 * institucionais (loja não encontrada, erro). Inline SVG para evitar
 * dependência de arquivos externos e manter o bundle leve.
 */
export function GearSalesLogo({
  inverted = false,
  size = "sm",
  className,
}: GearSalesLogoProps) {
  const iconSize = size === "md" ? 28 : 22
  const fontSize = size === "md" ? "1rem" : "0.875rem"
  const color = inverted ? "#ffffff" : "var(--vitrine-primary)"
  const textColor = inverted ? "#ffffff" : "var(--vitrine-text)"

  return (
    <span
      className={`gear-sales-logo${className ? ` ${className}` : ""}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        color: textColor,
        fontWeight: 700,
        fontSize,
        lineHeight: 1,
        letterSpacing: "-0.01em",
      }}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        focusable="false"
      >
        <circle cx="16" cy="16" r="15" fill={color} />
        <path
          d="M21.4 12.1c-.9-1.4-2.5-2.3-4.4-2.3-2.9 0-5.2 2.3-5.2 5.2v2c0 2.9 2.3 5.2 5.2 5.2 2 0 3.7-1.1 4.5-2.7v-3.2h-4.7v2.2h2.5v.4c-.4.7-1.2 1.2-2.3 1.2-1.7 0-2.9-1.2-2.9-2.9v-2c0-1.7 1.2-2.9 2.9-2.9 1 0 1.8.4 2.2 1.1l2.2-1.3Z"
          fill="#ffffff"
        />
      </svg>
      <span>{GEAR_SALES_BRAND_NAME}</span>
    </span>
  )
}
