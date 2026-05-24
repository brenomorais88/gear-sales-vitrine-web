import { PageNotFound } from "@/components/states/PageNotFound"
import { StateLayout } from "@/components/states/StateLayout"
import { getVitrineForRequest } from "@/src/lib/get-vitrine"
import { buildNotFoundMetadata } from "@/src/lib/metadata"
import type { VitrineLoja } from "@/src/types/vitrine"

async function tryGetLoja(): Promise<VitrineLoja | null> {
  try {
    return await getVitrineForRequest()
  } catch {
    return null
  }
}

export async function generateMetadata() {
  const loja = await tryGetLoja()
  return buildNotFoundMetadata(loja)
}

export default async function NotFound() {
  const loja = await tryGetLoja()

  return (
    <StateLayout loja={loja}>
      <PageNotFound />
    </StateLayout>
  )
}
