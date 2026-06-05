"use client"

import { useEffect, useId, useRef, type ReactNode } from "react"

interface VitrineModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  )
}

export function VitrineModal({ open, title, onClose, children }: VitrineModalProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    if (open && !dialog.open) {
      dialog.showModal()
      requestAnimationFrame(() => {
        const panel = panelRef.current
        if (!panel) {
          return
        }
        const focusable = getFocusableElements(panel)
        focusable[0]?.focus()
      })
    }

    if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    const handleCancel = (event: Event) => {
      event.preventDefault()
      onClose()
    }

    dialog.addEventListener("cancel", handleCancel)
    return () => dialog.removeEventListener("cancel", handleCancel)
  }, [onClose])

  useEffect(() => {
    const panel = panelRef.current
    if (!open || !panel) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return
      }

      const focusable = getFocusableElements(panel)
      if (focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    panel.addEventListener("keydown", handleKeyDown)
    return () => panel.removeEventListener("keydown", handleKeyDown)
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="vitrine-modal"
      aria-labelledby={titleId}
      aria-modal="true"
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose()
        }
      }}
    >
      <div ref={panelRef} className="vitrine-modal__panel">
        <div className="vitrine-modal__header">
          <h2 id={titleId} className="vitrine-modal__title">
            {title}
          </h2>
          <button
            type="button"
            className="vitrine-modal__close"
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        <div className="vitrine-modal__body">{children}</div>
      </div>
    </dialog>
  )
}
