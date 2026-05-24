/**
 * URL do Google Maps para direções (V1: link externo, sem embed).
 */
export function buildGoogleMapsDirectionsUrl(endereco: string): string {
  const query = encodeURIComponent(endereco.trim())
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
