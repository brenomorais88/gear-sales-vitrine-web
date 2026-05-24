/**
 * URLs estáveis para imagens mockadas (picsum com seed fixo por veículo).
 */
export function getMockVehicleImageUrl(seed: string, width = 800, height = 600): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`
}

export const MOCK_PLACEHOLDER_IMAGE = "/placeholder-vehicle.svg"
