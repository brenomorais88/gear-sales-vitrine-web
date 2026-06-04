"use client"

import Link from "next/link"
import type { PublicVitrineAnuncioDetalhe } from "@/src/types/vitrine"
import { VitrineAnuncioGallery } from "@/components/vitrine/VitrineAnuncioGallery"
import { VitrineLojaContactCard } from "@/components/vitrine/VitrineLojaContactCard"

interface VitrineAnuncioDetalheProps {
  anuncio: PublicVitrineAnuncioDetalhe
}

function formatarValor(valor: string): string {
  try {
    const num = parseFloat(valor)
    if (isNaN(num)) return "Consulte"

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  } catch {
    return "Consulte"
  }
}

function formatarQuilometragem(km: string | null | undefined): string | null {
  if (!km) return null
  try {
    const num = parseFloat(km)
    if (isNaN(num)) return null
    return new Intl.NumberFormat("pt-BR").format(num) + " km"
  } catch {
    return null
  }
}

function formatarAno(anoFab: string | null | undefined, anoMod: string | null | undefined): string | null {
  if (anoFab && anoMod) return `${anoFab}/${anoMod}`
  if (anoFab) return anoFab
  if (anoMod) return anoMod
  return null
}

export function VitrineAnuncioDetalhe({ anuncio }: VitrineAnuncioDetalheProps) {
  const localizacao =
    anuncio.cidade && anuncio.estado
      ? `${anuncio.cidade}, ${anuncio.estado}`
      : null
  const quilometragem = formatarQuilometragem(anuncio.quilometragem)
  const ano = formatarAno(anuncio.anoFabricacao, anuncio.anoModelo)
  const whatsappLink = anuncio.loja.whatsapp
    ? `https://wa.me/${anuncio.loja.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Olá, tenho interesse em simular o financiamento do veículo ${anuncio.titulo} anunciado na vitrine da ${anuncio.loja.nome}.`
      )}`
    : null

  return (
    <div className="vitrine-anuncio-detalhe">
      <Link href="/#estoque" className="vitrine-anuncio-detalhe__back">
        ← Voltar para o estoque
      </Link>

      <div className="vitrine-anuncio-detalhe__grid">
        <div className="vitrine-anuncio-detalhe__main">
          <VitrineAnuncioGallery titulo={anuncio.titulo} fotos={anuncio.fotos} />

          <div className="vitrine-anuncio-detalhe__header">
            <div>
              <h1 className="vitrine-anuncio-detalhe__titulo">{anuncio.titulo}</h1>
              <div className="vitrine-anuncio-detalhe__marca-modelo">
                {anuncio.marca.nome} {anuncio.modelo.nome}
              </div>
            </div>
            <div className="vitrine-anuncio-detalhe__preco">
              {formatarValor(anuncio.valorVenda)}
            </div>
          </div>

          {localizacao && (
            <div className="vitrine-anuncio-detalhe__localizacao">
              📍 {localizacao}
            </div>
          )}

          <div className="vitrine-anuncio-detalhe__specs">
            {ano && (
              <div className="vitrine-anuncio-detalhe__spec">
                <span className="vitrine-anuncio-detalhe__spec-label">Ano:</span>
                <span className="vitrine-anuncio-detalhe__spec-value">{ano}</span>
              </div>
            )}

            {quilometragem && (
              <div className="vitrine-anuncio-detalhe__spec">
                <span className="vitrine-anuncio-detalhe__spec-label">Quilometragem:</span>
                <span className="vitrine-anuncio-detalhe__spec-value">{quilometragem}</span>
              </div>
            )}

            {anuncio.cambio && (
              <div className="vitrine-anuncio-detalhe__spec">
                <span className="vitrine-anuncio-detalhe__spec-label">Câmbio:</span>
                <span className="vitrine-anuncio-detalhe__spec-value">{anuncio.cambio}</span>
              </div>
            )}

            {anuncio.combustivel && (
              <div className="vitrine-anuncio-detalhe__spec">
                <span className="vitrine-anuncio-detalhe__spec-label">Combustível:</span>
                <span className="vitrine-anuncio-detalhe__spec-value">{anuncio.combustivel}</span>
              </div>
            )}

            {anuncio.cor && (
              <div className="vitrine-anuncio-detalhe__spec">
                <span className="vitrine-anuncio-detalhe__spec-label">Cor:</span>
                <span className="vitrine-anuncio-detalhe__spec-value">{anuncio.cor}</span>
              </div>
            )}
          </div>

          <div className="vitrine-anuncio-detalhe__actions">
            {anuncio.loja.whatsapp && (
              <a
                href={`https://wa.me/${anuncio.loja.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                  `Olá, tenho interesse no veículo ${anuncio.titulo} anunciado na vitrine da ${anuncio.loja.nome}. Ele ainda está disponível?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="vitrine-anuncio-detalhe__btn vitrine-anuncio-detalhe__btn--primary"
              >
                Falar no WhatsApp
              </a>
            )}

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="vitrine-anuncio-detalhe__btn vitrine-anuncio-detalhe__btn--secondary"
              >
                Simular financiamento
              </a>
            )}
          </div>

          {anuncio.descricao && (
            <section className="vitrine-anuncio-detalhe__descricao">
              <h2>Descrição do veículo</h2>
              <p>{anuncio.descricao}</p>
            </section>
          )}

          <section className="vitrine-anuncio-detalhe__ficha-tecnica">
            <h2>Ficha técnica</h2>
            <div className="vitrine-anuncio-detalhe__ficha-grid">
              <div className="vitrine-anuncio-detalhe__ficha-item">
                <span className="vitrine-anuncio-detalhe__ficha-label">Marca:</span>
                <span className="vitrine-anuncio-detalhe__ficha-value">{anuncio.marca.nome}</span>
              </div>

              <div className="vitrine-anuncio-detalhe__ficha-item">
                <span className="vitrine-anuncio-detalhe__ficha-label">Modelo:</span>
                <span className="vitrine-anuncio-detalhe__ficha-value">{anuncio.modelo.nome}</span>
              </div>

              {anuncio.anoFabricacao && (
                <div className="vitrine-anuncio-detalhe__ficha-item">
                  <span className="vitrine-anuncio-detalhe__ficha-label">Ano de Fabricação:</span>
                  <span className="vitrine-anuncio-detalhe__ficha-value">{anuncio.anoFabricacao}</span>
                </div>
              )}

              {anuncio.anoModelo && (
                <div className="vitrine-anuncio-detalhe__ficha-item">
                  <span className="vitrine-anuncio-detalhe__ficha-label">Ano do Modelo:</span>
                  <span className="vitrine-anuncio-detalhe__ficha-value">{anuncio.anoModelo}</span>
                </div>
              )}

              {anuncio.quilometragem && (
                <div className="vitrine-anuncio-detalhe__ficha-item">
                  <span className="vitrine-anuncio-detalhe__ficha-label">Quilometragem:</span>
                  <span className="vitrine-anuncio-detalhe__ficha-value">{quilometragem}</span>
                </div>
              )}

              {anuncio.cambio && (
                <div className="vitrine-anuncio-detalhe__ficha-item">
                  <span className="vitrine-anuncio-detalhe__ficha-label">Câmbio:</span>
                  <span className="vitrine-anuncio-detalhe__ficha-value">{anuncio.cambio}</span>
                </div>
              )}

              {anuncio.combustivel && (
                <div className="vitrine-anuncio-detalhe__ficha-item">
                  <span className="vitrine-anuncio-detalhe__ficha-label">Combustível:</span>
                  <span className="vitrine-anuncio-detalhe__ficha-value">{anuncio.combustivel}</span>
                </div>
              )}

              {anuncio.cor && (
                <div className="vitrine-anuncio-detalhe__ficha-item">
                  <span className="vitrine-anuncio-detalhe__ficha-label">Cor:</span>
                  <span className="vitrine-anuncio-detalhe__ficha-value">{anuncio.cor}</span>
                </div>
              )}

              {anuncio.carroceria && (
                <div className="vitrine-anuncio-detalhe__ficha-item">
                  <span className="vitrine-anuncio-detalhe__ficha-label">Carroceria:</span>
                  <span className="vitrine-anuncio-detalhe__ficha-value">{anuncio.carroceria}</span>
                </div>
              )}

              {anuncio.portas && (
                <div className="vitrine-anuncio-detalhe__ficha-item">
                  <span className="vitrine-anuncio-detalhe__ficha-label">Portas:</span>
                  <span className="vitrine-anuncio-detalhe__ficha-value">{anuncio.portas}</span>
                </div>
              )}

              {localizacao && (
                <div className="vitrine-anuncio-detalhe__ficha-item">
                  <span className="vitrine-anuncio-detalhe__ficha-label">Localização:</span>
                  <span className="vitrine-anuncio-detalhe__ficha-value">{localizacao}</span>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="vitrine-anuncio-detalhe__sidebar">
          <VitrineLojaContactCard loja={anuncio.loja} anuncioTitulo={anuncio.titulo} />
        </aside>
      </div>
    </div>
  )
}
