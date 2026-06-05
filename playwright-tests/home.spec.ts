import { expect, test } from "@playwright/test"

import { waitForHomeLoaded } from "./_support/helpers"

test.describe("Fluxo 1 — Carregamento da Home", () => {
  test("carrega vitrine com header, footer, hero e cards", async ({ page }) => {
    await page.goto("/")
    await waitForHomeLoaded(page)

    await expect(page.getByRole("navigation", { name: "Navegação principal" })).toBeVisible()
    await expect(page.getByRole("contentinfo")).toBeVisible()
    await expect(page.getByRole("link", { name: "Ver veículos" }).first()).toBeVisible()
    await expect(page.getByText("Toyota Corolla 2021")).toBeVisible()
    await expect(page.getByText("Ver detalhes").first()).toBeVisible()
  })
})
