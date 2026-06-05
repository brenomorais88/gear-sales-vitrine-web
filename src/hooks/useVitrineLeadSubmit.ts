"use client"

import { useCallback, useRef, useState } from "react"

import {
  buildVitrineLeadPayload,
  hasFieldErrors,
  validateVitrineLeadForm,
  type VitrineLeadFieldErrors,
  type VitrineLeadFormValues,
} from "@/src/lib/vitrine-lead-validation"
import { createVitrineLead, VitrineLeadError } from "@/src/services/vitrineLeadsService"
import type { VitrineLeadModalMode } from "@/src/types/vitrine"

export type VitrineLeadSubmitState = "idle" | "submitting" | "success" | "error"

const EMPTY_VALUES: VitrineLeadFormValues = {
  nome: "",
  telefone: "",
  email: "",
  mensagem: "",
  valorEntrada: "",
  quantidadeParcelas: "",
}

export function useVitrineLeadSubmit() {
  const [state, setState] = useState<VitrineLeadSubmitState>("idle")
  const [fieldErrors, setFieldErrors] = useState<VitrineLeadFieldErrors>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const isSubmittingRef = useRef(false)

  const reset = useCallback(() => {
    setState("idle")
    setFieldErrors({})
    setErrorMessage(null)
    isSubmittingRef.current = false
  }, [])

  const clearFieldError = useCallback((field: keyof VitrineLeadFieldErrors) => {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current
      }
      const next = { ...current }
      delete next[field]
      return next
    })
  }, [])

  const submit = useCallback(
    async (options: {
      mode: VitrineLeadModalMode
      values: VitrineLeadFormValues
      dominio: string
      anuncioId?: string | null
    }) => {
      if (isSubmittingRef.current) {
        return false
      }

      const validationErrors = validateVitrineLeadForm(options.mode, options.values, {
        anuncioId: options.anuncioId,
        dominio: options.dominio,
      })

      if (hasFieldErrors(validationErrors)) {
        setFieldErrors(validationErrors)
        setErrorMessage(null)
        setState("error")
        return false
      }

      isSubmittingRef.current = true
      setState("submitting")
      setFieldErrors({})
      setErrorMessage(null)

      try {
        const payload = buildVitrineLeadPayload(
          options.mode,
          options.values,
          options.dominio,
          options.anuncioId
        )
        await createVitrineLead(payload)
        setState("success")
        return true
      } catch (error) {
        setState("error")
        if (error instanceof VitrineLeadError) {
          setErrorMessage(error.message)
        } else {
          setErrorMessage(
            "Não foi possível enviar sua solicitação agora. Tente novamente em instantes."
          )
        }
        return false
      } finally {
        isSubmittingRef.current = false
      }
    },
    []
  )

  return {
    state,
    fieldErrors,
    errorMessage,
    emptyValues: EMPTY_VALUES,
    isSubmitting: state === "submitting",
    isSuccess: state === "success",
    reset,
    clearFieldError,
    submit,
  }
}
