"use client"

import type { PublicVitrineLojaResumo } from "@/src/types/vitrine"

interface VitrineLojaContactCardProps {
  loja: PublicVitrineLojaResumo
  anuncioTitulo: string
}

function getInitials(nome: string): string {
  return nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
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
  const localizacao =
    loja.cidade && loja.estado ? `${loja.cidade}, ${loja.estado}` : null
  const whatsappLink = loja.whatsapp
    ? formatarWhatsAppLink(loja.whatsapp, anuncioTitulo, loja.nome)
    : null
  const iniciais = getInitials(loja.nome)

  return (
    <div className="vitrine-loja-card">
      <div className="vitrine-loja-card__header">
        <div className="vitrine-loja-card__logo">
          {loja.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={loja.logoUrl} alt={`Logo ${loja.nome}`} />
          ) : (
            <span className="vitrine-loja-card__logo-initials">{iniciais}</span>
          )}
        </div>
        <div className="vitrine-loja-card__info">
          <h3 className="vitrine-loja-card__nome">{loja.nome}</h3>
          {localizacao && (
            <p className="vitrine-loja-card__localizacao">{localizacao}</p>
          )}
        </div>
      </div>

      <div className="vitrine-loja-card__contacts">
        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="vitrine-loja-card__contact-link"
          >
            <span className="vitrine-loja-card__contact-label">WhatsApp:</span>
            <span className="vitrine-loja-card__contact-value">{loja.whatsapp}</span>
          </a>
        )}

        {loja.telefone && (
          <a
            href={`tel:${loja.telefone.replace(/\D/g, "")}`}
            className="vitrine-loja-card__contact-link"
          >
            <span className="vitrine-loja-card__contact-label">Telefone:</span>
            <span className="vitrine-loja-card__contact-value">{loja.telefone}</span>
          </a>
        )}

        {loja.email && (
          <a
            href={`mailto:${loja.email}`}
            className="vitrine-loja-card__contact-link"
          >
            <span className="vitrine-loja-card__contact-label">E-mail:</span>
            <span className="vitrine-loja-card__contact-value">{loja.email}</span>
          </a>
        )}
      </div>

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
