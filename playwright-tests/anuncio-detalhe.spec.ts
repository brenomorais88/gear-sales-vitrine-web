import { expect, test } from "@playwright/test"

import { waitForHomeLoaded } from "./_support/helpers"

test.describe("Fluxo 6 — Detalhe do anúncio", () => {
  test("abre detalhe pelo card e exibe informações principais", async ({ page }) => {
    await page.goto("/")
    await waitForHomeLoaded(page)

    await page.getByRole("link", { name: /Toyota Corolla 2021/i }).first().click()
    await expect(page).toHaveURL(/\/anuncios\/anuncio-001/)

    await expect(page.getByRole("heading", { name: "Toyota Corolla 2021" })).toBeVisible()
    await expect(page.getByText(/R\$\s*89\.900/)).toBeVisible()
    await expect(page.getByText("Veículo revisado e com garantia.")).toBeVisible()
    await expect(page.getByText("1 / 2")).toBeVisible()
    await expect(page.getByRole("button", { name: "Tenho interesse" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Falar com a loja" })).toBeVisible()

    await page.getByRole("link", { name: "Voltar para o estoque" }).click()
    await expect(page).toHaveURL(/\/#estoque|\/$/)
  })
})

test.describe("Fluxo 7 — Detalhe sem foto", () => {
  test("exibe placeholder quando anúncio não tem fotos", async ({ page }) => {
    await page.goto("/anuncios/anuncio-sem-foto")

    await expect(
      page.getByRole("heading", { name: "Toyota Corolla sem foto" })
    ).toBeVisible()
    await expect(page.getByText("Fotos não disponíveis")).toBeVisible()
  })
})

test.describe("Fluxo 8 — Anúncio 404", () => {
  test("exibe estado de anúncio não encontrado", async ({ page }) => {
    await page.goto("/anuncios/anuncio-404")

    await expect(page.getByRole("heading", { name: "Anúncio não encontrado" })).toBeVisible()
    await page.getByRole("link", { name: "Voltar para o estoque" }).click()
    await expect(page).toHaveURL(/\/#estoque|\/$/)
  })
})
