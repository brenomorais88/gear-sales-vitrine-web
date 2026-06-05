import { test, expect } from "@playwright/test"

test.describe("Fluxo 2 — Vitrine com fallback", () => {
  test("exibe fallback de logo e oculta campos nulos", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("#vitrine-home-title")).toHaveText("Revenda Minimal")
    await expect(page.locator(".vitrine-header__logo-placeholder")).toBeVisible()
    await expect(page.getByText("undefined")).toHaveCount(0)
    await expect(page.getByText("null")).toHaveCount(0)
    await expect(page.getByRole("link", { name: /WhatsApp/i })).toHaveCount(0)
  })
})
