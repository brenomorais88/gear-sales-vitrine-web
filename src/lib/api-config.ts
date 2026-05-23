/**
 * Base URL da API Gear Sales (mesmo padrão do gear-sales-web).
 */
export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"
}
