import type { ReactNode } from "react"

interface VitrineStatePageProps {
  title: string
  description: string
  children?: ReactNode
}

export function VitrineStatePage({
  title,
  description,
  children,
}: VitrineStatePageProps) {
  return (
    <div className="vitrine-state">
      <div className="vitrine-state__card">
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </div>
  )
}
