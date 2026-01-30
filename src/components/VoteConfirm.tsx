'use client'

import { useState } from 'react'

interface Business {
  id: string
  name: string
  slug: string
  imageUrl: string | null
}

interface VoteConfirmProps {
  business: Business
  onConfirm: () => void
  onBack: () => void
}

export function VoteConfirm({ business, onConfirm, onBack }: VoteConfirmProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleConfirm = async () => {
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: business.id
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Error al registrar voto')
        return
      }

      onConfirm()

    } catch {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card animate-fade-in text-center">
      <button
        onClick={onBack}
        className="text-muted hover:text-foreground mb-4 flex items-center gap-1 text-sm"
        disabled={isLoading}
      >
        ← Cambiar elección
      </button>

      <h2 className="text-xl font-bold mb-6">Confirma tu voto</h2>

      {/* Selected business */}
      <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 text-4xl">
          🍟
        </div>
        <h3 className="text-2xl font-bold gradient-text">{business.name}</h3>
      </div>

      <p className="text-muted mb-6">
        Tu voto es definitivo y no podrás cambiarlo después.
        <br />
        <span className="text-sm">Solo puedes votar una vez.</span>
      </p>

      {error && (
        <div className="bg-error/10 border border-error/30 text-error rounded-lg px-4 py-3 text-sm mb-4 animate-shake">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className="btn btn-primary w-full"
        >
          {isLoading ? (
            <>
              <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }}></div>
              Registrando voto...
            </>
          ) : (
            <>
              ✓ Confirmar mi voto
            </>
          )}
        </button>

        <button
          onClick={onBack}
          disabled={isLoading}
          className="btn btn-secondary w-full"
        >
          Elegir otro negocio
        </button>
      </div>
    </div>
  )
}
