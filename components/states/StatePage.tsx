import type { ReactNode } from "react"

export type StatePageIcon = "not-found" | "error" | "empty" | "search"

interface StatePageProps {
  title: string
  description: string
  statusCode?: string
  icon?: StatePageIcon
  children?: ReactNode
  compact?: boolean
}

function StateIcon({ icon }: { icon: StatePageIcon }) {
  return (
    <div className={`state-page__icon state-page__icon--${icon}`} aria-hidden>
      {icon === "not-found" && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9l6 6M15 9l-6 6" strokeLinecap="round" />
        </svg>
      )}
      {icon === "error" && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      )}
      {icon === "empty" && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="8" width="16" height="10" rx="2" />
          <path d="M8 8l1.5-3h5L16 8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="14" r="1" fill="currentColor" stroke="none" />
          <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
        </svg>
      )}
      {icon === "search" && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16l4 4" strokeLinecap="round" />
        </svg>
      )}
    </div>
  )
}

export function StatePage({
  title,
  description,
  statusCode,
  icon = "not-found",
  children,
  compact = false,
}: StatePageProps) {
  return (
    <div
      className={`state-page${compact ? " state-page--compact" : ""}`}
      role="alert"
    >
      <div className="state-page__card">
        {statusCode ? (
          <p className="state-page__code" aria-hidden>
            {statusCode}
          </p>
        ) : null}
        <StateIcon icon={icon} />
        <h1 className="state-page__title">{title}</h1>
        <p className="state-page__description">{description}</p>
        {children ? <div className="state-page__actions">{children}</div> : null}
      </div>
    </div>
  )
}
