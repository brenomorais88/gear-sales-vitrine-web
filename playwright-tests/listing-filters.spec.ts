import { expect, test } from "@playwright/test"

import {
  applyFilters,
  clearFilters,
  openMobileFiltersIfNeeded,
  waitForHomeLoaded,
} from "./_support/helpers"

test.describe("Fluxo 3 — Listagem e paginação", () => {
  test("navega entre páginas da listagem", async ({ page }) => {
    await page.goto("/")
    await waitForHomeLoaded(page)
    await expect(page.getByText("Toyota Corolla 2021")).toBeVisible()

    const nextRequest = page.waitForRequest(
      (request) =>
        request.url().includes("/vitrine/anuncios") && request.url().includes("page=1")
    )
    await page.getByRole("button", { name: "Próxima página" }).click()
    await nextRequest

    await expect(page.getByText("Página 2 de 2")).toBeVisible()
    await expect(page.getByText("Toyota Yaris 2020")).toBeVisible()
    await expect(page.getByRole("button", { name: "Página anterior" })).toBeEnabled()
    await expect(page.getByRole("button", { name: "Próxima página" })).toBeDisabled()
  })
})

test.describe("Fluxo 4 — Filtros e ordenação", () => {
  test("aplica filtros, ordenação e reseta página", async ({ page }) => {
    await page.goto("/")
    await waitForHomeLoaded(page)

    await page.getByRole("button", { name: "Próxima página" }).click()
    await expect(page.getByText("Página 2 de 2")).toBeVisible()

    await openMobileFiltersIfNeeded(page)
    await page.getByLabel("Buscar").fill("Corolla")
    await page.getByLabel("Marca").selectOption({ label: "Toyota" })
    await page.getByLabel("Modelo").selectOption({ label: "Corolla" })
    await page.getByLabel("Valor até").fill("90000")

    const filteredRequest = page.waitForRequest((request) => {
      const url = request.url()
      return (
        url.includes("/vitrine/anuncios") &&
        url.includes("texto=Corolla") &&
        url.includes("marcaId=marca-toyota") &&
        url.includes("modeloId=modelo-corolla") &&
        url.includes("valorMax=90000") &&
        url.includes("page=0") &&
        !url.includes("lojaId") &&
        !url.includes("status=")
      )
    })
    await applyFilters(page)
    await filteredRequest

    const sortRequest = page.waitForRequest(
      (request) =>
        request.url().includes("/vitrine/anuncios") &&
        request.url().includes("sort=menor_preco") &&
        request.url().includes("page=0")
    )
    await page.getByLabel("Ordenar por:").selectOption("menor_preco")
    await sortRequest

    await clearFilters(page)
    await expect(page.getByText("Toyota Corolla 2021")).toBeVisible()
  })
})

test.describe("Fluxo 5 — Estado vazio", () => {
  test("exibe mensagens corretas com e sem filtros", async ({ page }) => {
    await page.goto("/")
    await waitForHomeLoaded(page)

    await openMobileFiltersIfNeeded(page)
    await page.getByLabel("Buscar").fill("semresultado")
    await applyFilters(page)

    await expect(
      page.getByText("Nenhum veículo encontrado com os filtros selecionados.")
    ).toBeVisible()

    await clearFilters(page)
    await expect(page.getByText("Toyota Corolla 2021")).toBeVisible()
  })
})
