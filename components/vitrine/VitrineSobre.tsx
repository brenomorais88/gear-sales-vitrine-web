import type { CSSProperties } from "react"
import Link from "next/link"

import { VitrineHorarioFuncionamento } from "@/components/vitrine/VitrineHorarioFuncionamento"
import {
  buildVitrineWhatsAppLink,
  formatVitrineLocation,
  getVitrineInitials,
} from "@/src/lib/vitrine-display"
import { getVitrineTheme } from "@/src/lib/vitrine-theme"
import type { VitrineLoja } from "@/src/types/vitrine"

interface VitrineSobreProps {
  vitrine: VitrineLoja
}

function getDescricaoInstitucionalFallback(nome: string): string {
  return `A ${nome} disponibiliza seus veículos em uma vitrine online para facilitar sua consulta e contato.`
}

export function VitrineSobre({ vitrine }: VitrineSobreProps) {
  const theme = getVitrineTheme(vitrine.corPrincipal)
  const localizacao = formatVitrineLocation(vitrine.cidade, vitrine.estado)
  const descricaoTrim = vitrine.descricao?.trim()
  const descricaoHero =
    descricaoTrim ||
    `Conheça a ${vitrine.nome} e veja os veículos disponíveis em nossa vitrine.`
  const descricaoInstitucional =
    descricaoTrim || getDescricaoInstitucionalFallback(vitrine.nome)
  const bannerUrl = vitrine.bannerUrl?.trim() || null
  const whatsappLink = vitrine.whatsapp
    ? buildVitrineWhatsAppLink(vitrine.whatsapp, vitrine.nome)
    : null
  const iniciais = getVitrineInitials(vitrine.nome)
  const possuiContato = Boolean(
    vitrine.whatsapp || vitrine.telefone || vitrine.email
  )

  return (
    <div
      className="vitrine-sobre"
      style={
        {
          "--vitrine-primary": theme.primaryColor,
          "--vitrine-header-text": theme.textColor,
        } as CSSProperties
      }
    >
      <section className="vitrine-sobre-hero" aria-labelledby="vitrine-sobre-page-title">
        {bannerUrl && (
          <div className="vitrine-sobre-hero__banner" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={bannerUrl} alt="" />
            <div className="vitrine-sobre-hero__banner-overlay" />
          </div>
        )}

        <div className="vitrine-sobre-hero__container">
          <h1 id="vitrine-sobre-page-title" className="vitrine-sr-only">
            Sobre a {vitrine.nome}
          </h1>

          <div className="vitrine-sobre-hero__identity">
            <div
              className="vitrine-sobre-hero__logo"
              aria-label={vitrine.logoUrl ? undefined : `Logo ${vitrine.nome}`}
            >
              {vitrine.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={vitrine.logoUrl}
                  alt={`Logo ${vitrine.nome}`}
                />
              ) : (
                <span className="vitrine-sobre-hero__logo-initials" aria-hidden>
                  {iniciais}
                </span>
              )}
            </div>
            <div className="vitrine-sobre-hero__content">
              <p className="vitrine-sobre-hero__eyebrow">Vitrine pública da revenda</p>
              <h2 className="vitrine-sobre-hero__title">{vitrine.nome}</h2>
              <p className="vitrine-sobre-hero__description">{descricaoHero}</p>
              {localizacao && (
                <p className="vitrine-sobre-hero__location">
                  <span className="vitrine-sobre-hero__location-label">Localização:</span>{" "}
                  {localizacao}
                </p>
              )}
            </div>
          </div>

          <div className="vitrine-sobre-hero__actions">
            <Link href="/#estoque" className="vitrine-sobre-btn vitrine-sobre-btn--primary">
              Ver veículos
            </Link>
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="vitrine-sobre-btn vitrine-sobre-btn--secondary"
                aria-label={`Falar no WhatsApp com ${vitrine.nome}`}
              >
                Falar no WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="vitrine-sobre__container">
        <div className="vitrine-sobre__grid">
          <section className="vitrine-sobre-card vitrine-sobre-card--about" aria-labelledby="vitrine-sobre-about-title">
            <h2 id="vitrine-sobre-about-title" className="vitrine-sobre-card__title">
              Sobre a loja
            </h2>
            <p className="vitrine-sobre-card__nome">{vitrine.nome}</p>
            <p className="vitrine-sobre-card__text vitrine-sobre-card__text--lead">
              {descricaoInstitucional}
            </p>
            {(vitrine.urlPublica?.trim() || localizacao) && (
              <dl className="vitrine-sobre-meta-list">
                {vitrine.urlPublica?.trim() && (
                  <div className="vitrine-sobre-meta-list__item">
                    <dt className="vitrine-sobre-meta-list__label">Vitrine online</dt>
                    <dd className="vitrine-sobre-meta-list__value">
                      <a
                        href={vitrine.urlPublica}
                        className="vitrine-sobre-card__link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {vitrine.urlPublica}
                      </a>
                    </dd>
                  </div>
                )}
                {localizacao && (
                  <div className="vitrine-sobre-meta-list__item">
                    <dt className="vitrine-sobre-meta-list__label">Localização</dt>
                    <dd className="vitrine-sobre-meta-list__value">{localizacao}</dd>
                  </div>
                )}
              </dl>
            )}
          </section>

          {possuiContato && (
            <section className="vitrine-sobre-card" aria-labelledby="vitrine-sobre-contact-title">
              <h2 id="vitrine-sobre-contact-title" className="vitrine-sobre-card__title">
                Contato
              </h2>
              <ul className="vitrine-sobre-contato">
                {vitrine.whatsapp && (
                  <li className="vitrine-sobre-contato__item">
                    <span className="vitrine-sobre-contato__label">WhatsApp</span>
                    <a
                      href={whatsappLink ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vitrine-sobre-contato__value"
                      aria-label={`WhatsApp ${vitrine.whatsapp}`}
                    >
                      {vitrine.whatsapp}
                    </a>
                  </li>
                )}
                {vitrine.telefone && (
                  <li className="vitrine-sobre-contato__item">
                    <span className="vitrine-sobre-contato__label">Telefone</span>
                    <a
                      href={`tel:${vitrine.telefone.replace(/\D/g, "")}`}
                      className="vitrine-sobre-contato__value"
                      aria-label={`Telefone ${vitrine.telefone}`}
                    >
                      {vitrine.telefone}
                    </a>
                  </li>
                )}
                {vitrine.email && (
                  <li className="vitrine-sobre-contato__item">
                    <span className="vitrine-sobre-contato__label">E-mail</span>
                    <a
                      href={`mailto:${vitrine.email}`}
                      className="vitrine-sobre-contato__value"
                      aria-label={`E-mail ${vitrine.email}`}
                    >
                      {vitrine.email}
                    </a>
                  </li>
                )}
              </ul>
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vitrine-sobre-btn vitrine-sobre-btn--whatsapp vitrine-sobre-btn--block"
                  aria-label={`Falar no WhatsApp com ${vitrine.nome}`}
                >
                  Falar no WhatsApp
                </a>
              )}
            </section>
          )}

          <section className="vitrine-sobre-card" aria-labelledby="vitrine-sobre-location-title">
            <h2 id="vitrine-sobre-location-title" className="vitrine-sobre-card__title">
              Localização
            </h2>
            {localizacao ? (
              <p className="vitrine-sobre-card__text vitrine-sobre-card__text--location">
                {localizacao}
              </p>
            ) : (
              <p className="vitrine-sobre-card__muted">
                Localização não informada.
              </p>
            )}
          </section>

          <VitrineHorarioFuncionamento
            horario={vitrine.horarioFuncionamento}
          />

          <section
            className="vitrine-sobre-card vitrine-sobre-card--highlight vitrine-sobre-card--full"
            aria-labelledby="vitrine-sobre-online-title"
          >
            <h2 id="vitrine-sobre-online-title" className="vitrine-sobre-card__title">
              Vitrine online
            </h2>
            <p className="vitrine-sobre-card__text">
              Esta vitrine reúne os veículos disponíveis da {vitrine.nome}, com
              informações atualizadas para facilitar sua consulta.
            </p>
            <Link
              href="/#estoque"
              className="vitrine-sobre-btn vitrine-sobre-btn--accent vitrine-sobre-btn--block"
            >
              Ver veículos disponíveis
            </Link>
          </section>
        </div>

        <nav className="vitrine-sobre__cta-bar" aria-label="Ações principais">
          <Link href="/#estoque" className="vitrine-sobre-btn vitrine-sobre-btn--accent">
            Ver veículos
          </Link>
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="vitrine-sobre-btn vitrine-sobre-btn--whatsapp"
              aria-label={`Falar no WhatsApp com ${vitrine.nome}`}
            >
              Falar no WhatsApp
            </a>
          )}
        </nav>
      </div>
    </div>
  )
}
