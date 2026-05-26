import type { VitrineAnuncio } from "@/src/types/anuncio"
import type {
  GaragePublicAnuncioImagemResponse,
  GaragePublicCatalogItemResponse,
} from "@/src/types/garage-public"

function parseIntOrZero(value: string | null | undefined): number {
  if (!value) return 0
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : 0
}

function parsePriceToNumber(value: string | null | undefined): number {
  if (!value) return 0
  const parsed = Number(value.replace(",", "."))
  return Number.isFinite(parsed) ? parsed : 0
}

function pickCapa(
  imagens: GaragePublicAnuncioImagemResponse[]
): string | null {
  if (!imagens?.length) return null
  const sorted = [...imagens].sort((a, b) => a.ordem - b.ordem)
  return (sorted.find((img) => img.isCapa) ?? sorted[0]).url ?? null
}

function buildTitulo(
  marcaNome: string,
  modeloNome: string,
  ano: string
): string {
  const partes = [marcaNome, modeloNome].filter(Boolean).join(" ").trim()
  return ano ? `${partes} ${ano}` : partes
}

/**
 * Converte um item do catálogo público do backend para o formato
 * consumido pela vitrine. Campos não disponíveis no endpoint público
 * (versão, câmbio, combustível, carroceria, portas, opcionais) ficam
 * como `null` / `[]` — os componentes da vitrine já os tratam.
 */
export function mapCatalogItemToVitrineAnuncio(
  item: GaragePublicCatalogItemResponse
): VitrineAnuncio {
  const imagensOrdenadas = [...item.imagens].sort((a, b) => a.ordem - b.ordem)

  return {
    id: item.anuncio.id,
    lojaId: item.loja.id,
    titulo: buildTitulo(item.marca.nome, item.modelo.nome, item.veiculo.ano),
    marca: item.marca.nome,
    modelo: item.modelo.nome,
    versao: null,
    anoFabricacao: parseIntOrZero(item.veiculo.anoFabricacao),
    anoModelo: parseIntOrZero(item.veiculo.ano),
    preco: parsePriceToNumber(item.anuncio.valorVenda),
    quilometragem: parseIntOrZero(item.veiculo.km),
    cambio: null,
    combustivel: null,
    cor: item.cor.nome,
    carroceria: null,
    portas: null,
    cidade: item.loja.cidade,
    estado: item.loja.estado,
    descricao: item.anuncio.descricao ?? "",
    opcionais: [],
    imagemCapaUrl: pickCapa(imagensOrdenadas),
    imagens: imagensOrdenadas.map((img) => img.url),
    publicadoEm: item.anuncio.createdAt ?? new Date().toISOString(),
    status: item.anuncio.status,
  }
}
