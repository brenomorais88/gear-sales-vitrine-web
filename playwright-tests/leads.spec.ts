import { expect, test } from "@playwright/test"

import { waitForHomeLoaded } from "./_support/helpers"

async function openDetalhe(page: import("@playwright/test").Page) {
  await page.goto("/")
  await waitForHomeLoaded(page)
  await page.getByRole("link", { name: /Toyota Corolla 2021/i }).first().click()
  await expect(page).toHaveURL(/\/anuncios\/anuncio-001/)
}

test.describe("Fluxo 11 — Lead de interesse", () => {
  test("envia payload correto e exibe sucesso", async ({ page }) => {
    await openDetalhe(page)

    await page.getByRole("button", { name: "Tenho interesse" }).click()
    const dialog = page.getByRole("dialog")
    await expect(dialog.getByRole("heading", { name: "Tenho interesse" })).toBeVisible()

    await dialog.getByLabel("Nome *").fill("Maria Teste")
    await dialog.getByLabel("Telefone *").fill("11999998888")
    await dialog.getByLabel("E-mail").fill("maria@teste.com")
    await dialog.getByLabel("Mensagem").fill("Quero saber mais")

    const leadRequest = page.waitForRequest((request) => {
      if (!request.url().includes("/vitrine/leads") || request.method() !== "POST") {
        return false
      }
      const payload = request.postDataJSON()
      return (
        payload.tipo === "INTERESSE_ANUNCIO" &&
        payload.anuncioId === "anuncio-001" &&
        payload.dominio === "loja.teste.gearsales.com.br" &&
        payload.nome === "Maria Teste" &&
        !("lojaId" in payload)
      )
    })

    await dialog.getByRole("button", { name: "Enviar interesse" }).click()
    await leadRequest

    await expect(dialog.getByText("Recebemos seu contato!")).toBeVisible()
    await expect(
      dialog.getByRole("link", { name: "Falar no WhatsApp" })
    ).toBeVisible()
  })
})

test.describe("Fluxo 12 — Lead de simulação", () => {
  test("envia payload de financiamento", async ({ page }) => {
    await openDetalhe(page)

    await page.getByRole("button", { name: "Simular financiamento" }).click()
    const dialog = page.getByRole("dialog")

    await dialog.getByLabel("Nome *").fill("Carlos Teste")
    await dialog.getByLabel("Telefone *").fill("11988887777")
    await dialog.getByLabel("Valor de entrada").fill("15000")
    await dialog.getByLabel("Quantidade de parcelas").fill("36")

    const leadRequest = page.waitForRequest((request) => {
      if (!request.url().includes("/vitrine/leads") || request.method() !== "POST") {
        return false
      }
      const payload = request.postDataJSON()
      return (
        payload.tipo === "SIMULACAO_FINANCIAMENTO" &&
        payload.valorEntrada === "15000" &&
        payload.quantidadeParcelas === 36
      )
    })

    await dialog.getByRole("button", { name: "Solicitar simulação" }).click()
    await leadRequest
    await expect(dialog.getByText("Recebemos seu contato!")).toBeVisible()
  })
})

test.describe("Fluxo 13 — Contato geral", () => {
  test("envia contato geral sem anuncioId", async ({ page }) => {
    await page.goto("/sobre")
    await page
      .getByLabel("Ações principais")
      .getByRole("button", { name: "Enviar mensagem" })
      .click()

    const dialog = page.getByRole("dialog")
    await dialog.getByLabel("Nome *").fill("Ana Teste")
    await dialog.getByLabel("Telefone *").fill("11977776666")

    const leadRequest = page.waitForRequest((request) => {
      if (!request.url().includes("/vitrine/leads") || request.method() !== "POST") {
        return false
      }
      const payload = request.postDataJSON()
      return (
        payload.tipo === "CONTATO_GERAL" &&
        !("anuncioId" in payload) &&
        !("lojaId" in payload)
      )
    })

    await dialog.getByRole("button", { name: "Enviar mensagem" }).click()
    await leadRequest
    await expect(page.getByText("Recebemos seu contato!")).toBeVisible()
  })
})

test.describe("Fluxo 14 — Validações de formulário", () => {
  test("bloqueia envio com dados inválidos", async ({ page }) => {
    await openDetalhe(page)
    await page.getByRole("button", { name: "Tenho interesse" }).click()
    const dialog = page.getByRole("dialog")

    await dialog.getByLabel("Nome *").fill("A")
    await dialog.getByLabel("Telefone *").fill("123")
    await dialog.getByLabel("E-mail").fill("email-invalido")

    let leadCalled = false
    page.on("request", (request) => {
      if (request.url().includes("/vitrine/leads")) {
        leadCalled = true
      }
    })

    await dialog.getByRole("button", { name: "Enviar interesse" }).click()

    await expect(
      dialog.getByText("Informe seu nome com pelo menos 2 caracteres.")
    ).toBeVisible()
    await expect(
      dialog.getByText("O telefone deve ter entre 10 e 15 dígitos.")
    ).toBeVisible()
    await expect(dialog.getByText("Informe um e-mail válido.")).toBeVisible()
    expect(leadCalled).toBe(false)
  })
})

test.describe("Fluxo 15 — Erro ao criar lead", () => {
  test("exibe mensagens amigáveis e preserva dados", async ({ page }) => {
    await openDetalhe(page)
    await page.getByRole("button", { name: "Tenho interesse" }).click()
    const dialog = page.getByRole("dialog")

    await dialog.getByLabel("Nome *").fill("ERRO_400")
    await dialog.getByLabel("Telefone *").fill("11999990000")
    await dialog.getByLabel("Mensagem").fill("Mensagem preservada")

    await dialog.getByRole("button", { name: "Enviar interesse" }).click()
    await expect(
      dialog.getByText("Revise os dados informados e tente novamente.")
    ).toBeVisible()
    await expect(dialog.getByLabel("Mensagem")).toHaveValue("Mensagem preservada")
    await expect(dialog.getByRole("button", { name: "Enviar interesse" })).toBeEnabled()

    await dialog.getByLabel("Nome *").fill("ERRO_404")
    await dialog.getByRole("button", { name: "Enviar interesse" }).click()
    await expect(
      dialog.getByText(
        "Não foi possível enviar sua solicitação para esta vitrine ou anúncio."
      )
    ).toBeVisible()

    await dialog.getByLabel("Nome *").fill("ERRO_500")
    await dialog.getByRole("button", { name: "Enviar interesse" }).click()
    await expect(
      dialog.getByText(
        "Não foi possível enviar sua solicitação agora. Tente novamente em instantes."
      )
    ).toBeVisible()
  })
})
