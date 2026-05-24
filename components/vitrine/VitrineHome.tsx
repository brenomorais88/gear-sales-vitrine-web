"use client"

import { HomeAnunciosGrid } from "@/components/home/HomeAnunciosGrid"
import { HomeHero } from "@/components/home/HomeHero"
import type { VitrineAnuncio } from "@/src/types/anuncio"
import type { VitrineLoja } from "@/src/types/vitrine"

interface VitrineHomeProps {
  loja: VitrineLoja
  anuncios: VitrineAnuncio[]
}

export function VitrineHome({ loja, anuncios }: VitrineHomeProps) {
  return (
    <>
      <HomeHero loja={loja} />
      <main className="vitrine-main vitrine-main--home">
        <HomeAnunciosGrid loja={loja} anuncios={anuncios} />
      </main>
    </>
  )
}
