"use client"

import { useState } from "react"

import { VitrineModal } from "@/components/vitrine/VitrineModal"
import { useVitrineLeadSubmit } from "@/src/hooks/useVitrineLeadSubmit"
import {
  formatTelefoneMask,
  getDefaultMensagem,
  type VitrineLeadFormValues,
} from "@/src/lib/vitrine-lead-validation"
import { buildVitrineWhatsAppLink } from "@/src/lib/vitrine-display"
import type { VitrineLeadModalMode } from "@/src/types/vitrine"

interface VitrineLeadModalProps {
  open: boolean
  mode: VitrineLeadModalMode
  dominio: string
  onClose: () => void
  anuncioId?: string
  anuncioTitulo?: string
  lojaNome?: string
  whatsapp?: string | null
}

function getModalTitle(mode: VitrineLeadModalMode): string {
  switch (mode) {
    case "interest":
      return "Tenho interesse"
    case "financing":
      return "Simular financiamento"
    case "general":
      return "Fale com a loja"
  }
}

function getSubmitLabel(mode: VitrineLeadModalMode): string {
  switch (mode) {
    case "interest":
      return "Enviar interesse"
    case "financing":
      return "Solicitar simulação"
    case "general":
      return "Enviar mensagem"
  }
}

export function VitrineLeadModal({
  open,
  mode,
  dominio,
  onClose,
  anuncioId,
  anuncioTitulo,
  lojaNome,
  whatsapp,
}: VitrineLeadModalProps) {
  const {
    fieldErrors,
    errorMessage,
    emptyValues,
    isSubmitting,
    isSuccess,
    reset,
    clearFieldError,
    submit,
  } = useVitrineLeadSubmit()

  const [values, setValues] = useState<VitrineLeadFormValues>(emptyValues)

  const handleClose = () => {
    reset()
    setValues(emptyValues)
    onClose()
  }

  const handleFieldChange = (field: keyof VitrineLeadFormValues, value: string) => {
    setValues((current) => ({
      ...current,
      [field]: field === "telefone" ? formatTelefoneMask(value) : value,
    }))

    if (fieldErrors[field]) {
      clearFieldError(field)
    }
  }

  const formLevelError =
    fieldErrors.dominio || fieldErrors.anuncioId
      ? fieldErrors.dominio || fieldErrors.anuncioId
      : null

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const success = await submit({
      mode,
      values,
      dominio,
      anuncioId,
    })

    if (success) {
      setValues(emptyValues)
    }
  }

  const whatsappLink =
    whatsapp && lojaNome
      ? buildVitrineWhatsAppLink(whatsapp, lojaNome)
      : whatsapp
        ? `https://wa.me/${whatsapp.replace(/\D/g, "")}`
        : null

  return (
    <VitrineModal open={open} title={getModalTitle(mode)} onClose={handleClose}>
      {isSuccess ? (
        <div className="vitrine-lead-success" role="status" aria-live="polite">
          <h3 className="vitrine-lead-success__title">Recebemos seu contato!</h3>
          <p className="vitrine-lead-success__text">
            A loja recebeu sua solicitação e poderá falar com você em breve.
          </p>
          <div className="vitrine-lead-success__actions">
            <button
              type="button"
              className="vitrine-lead-btn vitrine-lead-btn--primary"
              onClick={handleClose}
            >
              Continuar navegando
            </button>
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="vitrine-lead-btn vitrine-lead-btn--whatsapp"
              >
                Falar no WhatsApp
              </a>
            )}
          </div>
        </div>
      ) : (
        <form
          className="vitrine-lead-form"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={isSubmitting}
        >
          {mode === "interest" && (
            <p className="vitrine-lead-form__hint">
              Preencha seus dados e a loja retornará sobre a disponibilidade deste veículo.
            </p>
          )}

          {mode === "financing" && (
            <p className="vitrine-lead-form__hint">
              A loja receberá sua solicitação e entrará em contato com as condições
              disponíveis. Não há cálculo automático de parcelas nesta etapa.
            </p>
          )}

          {mode === "general" && (
            <p className="vitrine-lead-form__hint">
              Envie sua mensagem e aguarde o retorno da loja.
            </p>
          )}

          {anuncioTitulo && mode !== "general" && (
            <p className="vitrine-lead-form__context">
              Veículo: <strong>{anuncioTitulo}</strong>
            </p>
          )}

          {(errorMessage || formLevelError) && (
            <div className="vitrine-lead-form__banner vitrine-lead-form__banner--error" role="alert">
              {errorMessage || formLevelError}
            </div>
          )}

          <div className="vitrine-lead-form__field">
            <label htmlFor={`lead-nome-${mode}`}>Nome *</label>
            <input
              id={`lead-nome-${mode}`}
              type="text"
              name="nome"
              autoComplete="name"
              value={values.nome}
              onChange={(event) => handleFieldChange("nome", event.target.value)}
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.nome)}
              aria-describedby={fieldErrors.nome ? `lead-nome-error-${mode}` : undefined}
            />
            {fieldErrors.nome && (
              <span id={`lead-nome-error-${mode}`} className="vitrine-lead-form__error">
                {fieldErrors.nome}
              </span>
            )}
          </div>

          <div className="vitrine-lead-form__field">
            <label htmlFor={`lead-telefone-${mode}`}>Telefone *</label>
            <input
              id={`lead-telefone-${mode}`}
              type="tel"
              name="telefone"
              autoComplete="tel"
              inputMode="numeric"
              placeholder="(00) 00000-0000"
              value={values.telefone}
              onChange={(event) => handleFieldChange("telefone", event.target.value)}
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.telefone)}
              aria-describedby={
                fieldErrors.telefone ? `lead-telefone-error-${mode}` : undefined
              }
            />
            {fieldErrors.telefone && (
              <span id={`lead-telefone-error-${mode}`} className="vitrine-lead-form__error">
                {fieldErrors.telefone}
              </span>
            )}
          </div>

          <div className="vitrine-lead-form__field">
            <label htmlFor={`lead-email-${mode}`}>E-mail</label>
            <input
              id={`lead-email-${mode}`}
              type="email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => handleFieldChange("email", event.target.value)}
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? `lead-email-error-${mode}` : undefined}
            />
            {fieldErrors.email && (
              <span id={`lead-email-error-${mode}`} className="vitrine-lead-form__error">
                {fieldErrors.email}
              </span>
            )}
          </div>

          {mode === "financing" && (
            <>
              <div className="vitrine-lead-form__field">
                <label htmlFor={`lead-entrada-${mode}`}>Valor de entrada</label>
                <input
                  id={`lead-entrada-${mode}`}
                  type="text"
                  name="valorEntrada"
                  placeholder="Ex.: 10.000"
                  value={values.valorEntrada}
                  onChange={(event) => handleFieldChange("valorEntrada", event.target.value)}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(fieldErrors.valorEntrada)}
                  aria-describedby={
                    fieldErrors.valorEntrada ? `lead-entrada-error-${mode}` : undefined
                  }
                />
                {fieldErrors.valorEntrada && (
                  <span id={`lead-entrada-error-${mode}`} className="vitrine-lead-form__error">
                    {fieldErrors.valorEntrada}
                  </span>
                )}
              </div>

              <div className="vitrine-lead-form__field">
                <label htmlFor={`lead-parcelas-${mode}`}>Quantidade de parcelas</label>
                <input
                  id={`lead-parcelas-${mode}`}
                  type="number"
                  name="quantidadeParcelas"
                  min={1}
                  max={80}
                  placeholder="Ex.: 48"
                  value={values.quantidadeParcelas}
                  onChange={(event) =>
                    handleFieldChange("quantidadeParcelas", event.target.value)
                  }
                  disabled={isSubmitting}
                  aria-invalid={Boolean(fieldErrors.quantidadeParcelas)}
                  aria-describedby={
                    fieldErrors.quantidadeParcelas
                      ? `lead-parcelas-error-${mode}`
                      : undefined
                  }
                />
                {fieldErrors.quantidadeParcelas && (
                  <span id={`lead-parcelas-error-${mode}`} className="vitrine-lead-form__error">
                    {fieldErrors.quantidadeParcelas}
                  </span>
                )}
              </div>
            </>
          )}

          <div className="vitrine-lead-form__field">
            <label htmlFor={`lead-mensagem-${mode}`}>Mensagem</label>
            <textarea
              id={`lead-mensagem-${mode}`}
              name="mensagem"
              rows={4}
              placeholder={getDefaultMensagem(mode) || undefined}
              value={values.mensagem}
              onChange={(event) => handleFieldChange("mensagem", event.target.value)}
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.mensagem)}
              aria-describedby={
                fieldErrors.mensagem ? `lead-mensagem-error-${mode}` : undefined
              }
            />
            {fieldErrors.mensagem && (
              <span id={`lead-mensagem-error-${mode}`} className="vitrine-lead-form__error">
                {fieldErrors.mensagem}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="vitrine-lead-btn vitrine-lead-btn--primary vitrine-lead-btn--block"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando solicitação..." : getSubmitLabel(mode)}
          </button>
        </form>
      )}
    </VitrineModal>
  )
}
