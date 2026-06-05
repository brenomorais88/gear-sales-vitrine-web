import { expect, test } from "@playwright/test"

test.describe("Fluxo 9 — Página Sobre", () => {
  test("exibe informações institucionais e horários", async ({ page }) => {
    await page.goto("/sobre")

    await expect(page.locator(".vitrine-sobre-hero__title")).toHaveText("Revenda Teste E2E")
    await expect(page.locator(".vitrine-sobre-hero__description")).toHaveText(
      "Vitrine de testes automatizados da Gear Sales."
    )
    await expect(page.locator(".vitrine-sobre-hero__location")).toContainText(
      "São Paulo - SP"
    )
    await expect(
      page.getByLabel("Contato").getByText("contato@revendateste.com")
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: "Horário de funcionamento" })
    ).toBeVisible()
    await expect(page.getByText("08:00 - 18:00").first()).toBeVisible()
    await expect(page.getByText("Fechado").first()).toBeVisible()

    await page.getByRole("link", { name: "Ver veículos" }).first().click()
    await expect(page).toHaveURL(/\/#estoque|\/$/)
  })
})

test.describe("Fluxo 10 — Página Sobre sem horário", () => {
  test("exibe mensagem quando horário não foi informado", async ({ page }) => {
    await page.goto("/sobre")
    await expect(
      page.getByText("Horário de funcionamento não informado.")
    ).toBeVisible()
  })
})
