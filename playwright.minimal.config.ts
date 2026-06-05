import path from "path"
import { defineConfig, devices } from "@playwright/test"

const e2ePort = process.env.E2E_MINIMAL_PORT ?? "3011"
const mockApiPort = process.env.MOCK_API_PORT ?? "8099"
const baseURL = process.env.E2E_MINIMAL_BASE_URL ?? `http://localhost:${e2ePort}`
const mockApiUrl = `http://127.0.0.1:${mockApiPort}`
const vitrineDomain =
  process.env.DEFAULT_VITRINE_MINIMAL_DOMAIN ?? "loja.minimal.gearsales.com.br"

export default defineConfig({
  testDir: "./playwright-tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  grep: /Fluxo (2|10)/,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: `node e2e/mock-api-server.mjs`,
      url: `${mockApiUrl}/health`,
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
      env: {
        MOCK_API_PORT: mockApiPort,
      },
    },
    {
      command: `NEXT_PUBLIC_API_BASE_URL=${mockApiUrl} DEFAULT_VITRINE_DOMAIN=${vitrineDomain} npm run dev -- -p ${e2ePort}`,
      url: baseURL,
      reuseExistingServer: false,
      timeout: 120_000,
      cwd: path.resolve(__dirname),
    },
  ],
})
