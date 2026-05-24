"use client"

import { StateLayout } from "@/components/states/StateLayout"
import { VitrineLoadError } from "@/components/states/VitrineLoadError"

interface ErrorPageProps {
  reset: () => void
}

/**
 * Error boundary global — mensagem amigável, sem detalhes técnicos.
 */
export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <StateLayout loja={null} withShell={false}>
      <VitrineLoadError onRetry={reset} />
    </StateLayout>
  )
}
