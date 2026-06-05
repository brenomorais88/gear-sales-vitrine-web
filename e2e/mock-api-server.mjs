import http from "node:http"
import { URL } from "node:url"

const PORT = Number(process.env.MOCK_API_PORT ?? 8099)

const DOMINIO_DEFAULT = "loja.teste.gearsales.com.br"
const DOMINIO_MINIMAL = "loja.minimal.gearsales.com.br"
const DOMINIO_NOT_FOUND = "loja.inexistente.gearsales.com.br"
const DOMINIO_LOCAL_DEV = "lojatestehml.gearsales.com.br"

const vitrineFull = {
  id: "loja-001",
  nome: "Revenda Teste E2E",
  descricao: "Vitrine de testes automatizados da Gear Sales.",
  telefone: "(11) 3333-4444",
  whatsapp: "(11) 98888-7777",
  email: "contato@revendateste.com",
  cidade: "São Paulo",
  estado: "SP",
  logoUrl: "https://example.com/logo.png",
  bannerUrl: "https://example.com/banner.png",
  corPrincipal: "#c2410c",
  horarioFuncionamento: {
    segunda: "08:00-18:00",
    terca: "08:00-18:00",
    quarta: "fechado",
    quinta: "08:00-18:00",
    sexta: "08:00-18:00",
    sabado: "09:00-13:00",
    domingo: "fechado",
  },
  enderecoPaginaPublica: "revendateste",
  urlPublica: `https://${DOMINIO_DEFAULT}`,
}

const vitrineMinimal = {
  id: "loja-minimal",
  nome: "Revenda Minimal",
  descricao: null,
  telefone: null,
  whatsapp: null,
  email: null,
  cidade: null,
  estado: null,
  logoUrl: null,
  bannerUrl: null,
  corPrincipal: null,
  horarioFuncionamento: null,
  enderecoPaginaPublica: "minimal",
  urlPublica: `https://${DOMINIO_MINIMAL}`,
}

const marcaToyota = { id: "marca-toyota", nome: "Toyota" }
const modeloCorolla = {
  id: "modelo-corolla",
  nome: "Corolla",
  marcaId: "marca-toyota",
}

const anuncioCard1 = {
  id: "anuncio-001",
  titulo: "Toyota Corolla 2021",
  valorVenda: "89900.00",
  descricaoResumo: "Veículo em ótimo estado.",
  marca: marcaToyota,
  modelo: modeloCorolla,
  anoFabricacao: "2021",
  anoModelo: "2021",
  quilometragem: "25000",
  cambio: "AUTOMATICO",
  combustivel: "FLEX",
  cor: "BRANCO",
  cidade: "São Paulo",
  estado: "SP",
  fotoPrincipalUrl: "https://example.com/foto1.jpg",
  totalFotos: 2,
}

const anuncioCard2 = {
  id: "anuncio-002",
  titulo: "Toyota Yaris 2020",
  valorVenda: "69900.00",
  descricaoResumo: "Segunda página.",
  marca: marcaToyota,
  modelo: { id: "modelo-yaris", nome: "Yaris", marcaId: "marca-toyota" },
  anoFabricacao: "2020",
  anoModelo: "2020",
  quilometragem: "40000",
  cambio: "MANUAL",
  combustivel: "FLEX",
  cor: "PRATA",
  cidade: "São Paulo",
  estado: "SP",
  fotoPrincipalUrl: "https://example.com/foto2.jpg",
  totalFotos: 1,
}

const anuncioDetalheComFotos = {
  id: "anuncio-001",
  titulo: "Toyota Corolla 2021",
  valorVenda: "89900.00",
  descricao: "Veículo revisado e com garantia.",
  marca: marcaToyota,
  modelo: modeloCorolla,
  anoFabricacao: "2021",
  anoModelo: "2021",
  quilometragem: "25000",
  cambio: "AUTOMATICO",
  combustivel: "FLEX",
  cor: "BRANCO",
  carroceria: "SEDAN",
  portas: "4",
  cidade: "São Paulo",
  estado: "SP",
  fotos: [
    {
      id: "foto-1",
      url: "https://example.com/foto1.jpg",
      ordem: 0,
      principal: true,
    },
    {
      id: "foto-2",
      url: "https://example.com/foto2.jpg",
      ordem: 1,
      principal: false,
    },
  ],
  loja: {
    id: vitrineFull.id,
    nome: vitrineFull.nome,
    telefone: vitrineFull.telefone,
    whatsapp: vitrineFull.whatsapp,
    email: vitrineFull.email,
    cidade: vitrineFull.cidade,
    estado: vitrineFull.estado,
    logoUrl: vitrineFull.logoUrl,
    corPrincipal: vitrineFull.corPrincipal,
    urlPublica: vitrineFull.urlPublica,
  },
}

const anuncioDetalheSemFotos = {
  ...anuncioDetalheComFotos,
  id: "anuncio-sem-foto",
  titulo: "Toyota Corolla sem foto",
  fotos: [],
}

const filtrosDefault = {
  marcas: [marcaToyota],
  modelos: [modeloCorolla, { id: "modelo-yaris", nome: "Yaris", marcaId: "marca-toyota" }],
  anos: { min: "2020", max: "2021" },
  valores: { min: "69900.00", max: "89900.00" },
  quilometragem: { min: "25000", max: "40000" },
  cambios: ["AUTOMATICO", "MANUAL"],
  combustiveis: ["FLEX"],
  sortOptions: [
    { value: "mais_recentes", label: "Mais recentes" },
    { value: "menor_preco", label: "Menor preço" },
    { value: "maior_preco", label: "Maior preço" },
    { value: "menor_km", label: "Menor quilometragem" },
    { value: "ano_mais_novo", label: "Ano mais novo" },
    { value: "ano_mais_antigo", label: "Ano mais antigo" },
  ],
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  })
  res.end(JSON.stringify(body))
}

function getVitrineByDominio(dominio) {
  if (dominio === DOMINIO_NOT_FOUND) {
    return null
  }
  if (dominio === DOMINIO_MINIMAL) {
    return vitrineMinimal
  }
  if (
    dominio === DOMINIO_DEFAULT ||
    dominio === DOMINIO_LOCAL_DEV
  ) {
    return vitrineFull
  }
  return vitrineFull
}

function buildAnunciosList(searchParams) {
  const page = Number(searchParams.get("page") ?? "0")
  const texto = searchParams.get("texto")?.trim()
  const marcaId = searchParams.get("marcaId")
  const modeloId = searchParams.get("modeloId")
  const valorMax = searchParams.get("valorMax")
  const sort = searchParams.get("sort") ?? "mais_recentes"

  if (texto === "semresultado") {
    return {
      items: [],
      page: 0,
      size: 12,
      totalItems: 0,
      totalPages: 0,
      sort,
      appliedFilters: { texto },
    }
  }

  let items = [anuncioCard1, anuncioCard2]

  if (marcaId) {
    items = items.filter((item) => item.marca.id === marcaId)
  }

  if (modeloId) {
    items = items.filter((item) => item.modelo.id === modeloId)
  }

  if (valorMax) {
    items = items.filter((item) => Number(item.valorVenda) <= Number(valorMax))
  }

  if (texto) {
    items = items.filter((item) =>
      item.titulo.toLowerCase().includes(texto.toLowerCase())
    )
  }

  const pageSize = 1
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(page, Math.max(0, totalPages - 1))
  const pageItems = items.slice(safePage * pageSize, safePage * pageSize + pageSize)

  return {
    items: pageItems,
    page: safePage,
    size: pageSize,
    totalItems,
    totalPages,
    sort,
    appliedFilters: {
      marcaId: marcaId ?? null,
      modeloId: modeloId ?? null,
      valorMax: valorMax ?? null,
      texto: texto ?? null,
    },
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ""
    req.on("data", (chunk) => {
      data += chunk
    })
    req.on("end", () => resolve(data))
    req.on("error", reject)
  })
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://127.0.0.1:${PORT}`)
  const { pathname, searchParams } = url

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Accept,Authorization",
    })
    res.end()
    return
  }

  if (pathname === "/health") {
    sendJson(res, 200, { ok: true })
    return
  }

  if (pathname === "/public/vitrine/por-dominio" && req.method === "GET") {
    const dominio = searchParams.get("dominio")
    const vitrine = getVitrineByDominio(dominio)
    if (!vitrine) {
      sendJson(res, 404, { message: "Vitrine não encontrada" })
      return
    }
    sendJson(res, 200, vitrine)
    return
  }

  if (pathname === "/vitrine/filtros" && req.method === "GET") {
    sendJson(res, 200, filtrosDefault)
    return
  }

  if (pathname === "/vitrine/anuncios" && req.method === "GET") {
    sendJson(res, 200, buildAnunciosList(searchParams))
    return
  }

  const anuncioMatch = pathname.match(/^\/vitrine\/anuncios\/([^/]+)$/)
  if (anuncioMatch && req.method === "GET") {
    const anuncioId = decodeURIComponent(anuncioMatch[1])

    if (anuncioId === "anuncio-404") {
      sendJson(res, 404, { message: "Anúncio não encontrado" })
      return
    }

    if (anuncioId === "anuncio-sem-foto") {
      sendJson(res, 200, anuncioDetalheSemFotos)
      return
    }

    if (anuncioId === "anuncio-001") {
      sendJson(res, 200, anuncioDetalheComFotos)
      return
    }

    sendJson(res, 404, { message: "Anúncio não encontrado" })
    return
  }

  if (pathname === "/vitrine/leads" && req.method === "POST") {
    try {
      const raw = await readBody(req)
      const payload = JSON.parse(raw || "{}")

      if (payload.nome === "ERRO_400") {
        sendJson(res, 400, { message: "nome deve ter entre 2 e 100 caracteres" })
        return
      }

      if (payload.nome === "ERRO_404") {
        sendJson(res, 404, { message: "Vitrine não encontrada" })
        return
      }

      if (payload.nome === "ERRO_500") {
        sendJson(res, 500, { message: "Erro interno" })
        return
      }

      sendJson(res, 201, {
        id: "lead-e2e-001",
        message: "Lead recebido com sucesso",
      })
    } catch {
      sendJson(res, 400, { message: "Payload inválido" })
    }
    return
  }

  sendJson(res, 404, { message: "Not found" })
})

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[mock-api] listening on http://127.0.0.1:${PORT}`)
})
