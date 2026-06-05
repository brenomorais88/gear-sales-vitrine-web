import { expect, type Page } from "@playwright/test"

export async function waitForHomeLoaded(page: Page) {
  await expect(page.locator(".vitrine-header__title")).toHaveText("Revenda Teste E2E")
  await expect(page.locator("#estoque")).toBeVisible()
}

export async function openMobileFiltersIfNeeded(page: Page) {
  const toggle = page.getByRole("button", { name: /Filtrar veículos/i })
  if (await toggle.isVisible()) {
    await toggle.click()
  }
}

export async function applyFilters(page: Page) {
  await openMobileFiltersIfNeeded(page)
  await page.getByRole("button", { name: "Aplicar filtros" }).click()
}

export async function clearFilters(page: Page) {
  await openMobileFiltersIfNeeded(page)
  await page.getByRole("button", { name: "Limpar" }).click()
}
