"use client"

import { useState } from "react"
import type { PublicVitrineLojaResumo } from "@/src/types/vitrine"
import { getVitrineInitials } from "@/src/lib/vitrine-display"

interface VitrineLojaContactCardProps {
  loja: PublicVitrineLojaResumo
  anuncioTitulo: string
}

function formatarWhatsAppLink(whatsapp: string, titulo: string, nomeLoja: string): string {
  const numero = whatsapp.replace(/\D/g, "")
  const mensagem = `Olá, tenho interesse no veículo ${titulo} anunciado na vitrine da ${nomeLoja}. Ele ainda está disponível?`
  const url = new URL(`https://wa.me/${numero}`)
  url.searchParams.set("text", mensagem)
  return url.toString()
}

export function VitrineLojaContactCard({
  loja,
  anuncioTitulo,
}: VitrineLojaContactCardProps) {
  const [logoError, setLogoError] = useState(false)
  const localizacao =
    loja.cidade && loja.estado ? `${loja.cidade}, ${loja.estado}` : null
  const whatsappLink = loja.whatsapp
    ? formatarWhatsAppLink(loja.whatsapp, anuncioTitulo, loja.nome)
    : null
  const iniciais = getVitrineInitials(loja.nome)
  const possuiContato = Boolean(loja.whatsapp || loja.telefone || loja.email)

  return (
    <div className="vitrine-loja-card">
      <div className="vitrine-loja-card__header">
        <div className="vitrine-loja-card__logo">
          {loja.logoUrl && !logoError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={loja.logoUrl}
              alt=""
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="vitrine-loja-card__logo-initials" aria-hidden>
              {iniciais}
            </span>
          )}
        </div>
        <div className="vitrine-loja-card__info">
          <h3 className="vitrine-loja-card__nome">{loja.nome}</h3>
          {localizacao && (
            <p className="vitrine-loja-card__localizacao">{localizacao}</p>
          )}
        </div>
      </div>

      {possuiContato && (
        <div className="vitrine-loja-card__contacts">
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="vitrine-loja-card__contact-link"
            >
              <span className="vitrine-loja-card__contact-label">WhatsApp</span>
              <span className="vitrine-loja-card__contact-value">{loja.whatsapp}</span>
            </a>
          )}

          {loja.telefone && (
            <a
              href={`tel:${loja.telefone.replace(/\D/g, "")}`}
              className="vitrine-loja-card__contact-link"
            >
              <span className="vitrine-loja-card__contact-label">Telefone</span>
              <span className="vitrine-loja-card__contact-value">{loja.telefone}</span>
            </a>
          )}

          {loja.email && (
            <a
              href={`mailto:${loja.email}`}
              className="vitrine-loja-card__contact-link"
            >
              <span className="vitrine-loja-card__contact-label">E-mail</span>
              <span className="vitrine-loja-card__contact-value">{loja.email}</span>
            </a>
          )}
        </div>
      )}

      <div className="vitrine-loja-card__actions">
        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="vitrine-loja-card__btn vitrine-loja-card__btn--primary"
          >
            Falar com a loja
          </a>
        )}
        {loja.urlPublica && (
          <a
            href={loja.urlPublica}
            className="vitrine-loja-card__btn vitrine-loja-card__btn--secondary"
          >
            Ver estoque
          </a>
        )}
      </div>
    </div>
  )
}
