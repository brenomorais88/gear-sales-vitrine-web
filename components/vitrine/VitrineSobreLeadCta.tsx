"use client"

import { useState } from "react"

import { VitrineLeadModal } from "@/components/vitrine/VitrineLeadModal"

interface VitrineSobreLeadCtaProps {
  dominio: string
  lojaNome: string
  whatsapp?: string | null
  className?: string
  variant?: "accent" | "secondary" | "block-accent"
}

export function VitrineSobreLeadCta({
  dominio,
  lojaNome,
  whatsapp,
  className = "vitrine-sobre-btn vitrine-sobre-btn--accent",
  variant = "accent",
}: VitrineSobreLeadCtaProps) {
  const [open, setOpen] = useState(false)

  const buttonClass =
    variant === "block-accent"
      ? "vitrine-sobre-btn vitrine-sobre-btn--accent vitrine-sobre-btn--block"
      : variant === "secondary"
        ? "vitrine-sobre-btn vitrine-sobre-btn--secondary"
        : className

  return (
    <>
      <button
        type="button"
        className={buttonClass}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        Enviar mensagem
      </button>

      {open && (
        <VitrineLeadModal
          open
          mode="general"
          dominio={dominio}
          lojaNome={lojaNome}
          whatsapp={whatsapp}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
