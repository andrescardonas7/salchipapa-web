'use client';

import { FormEvent, useState } from 'react';

import { TurnstileWidget } from '@/components/TurnstileWidget';
import { LIMITS } from '@/lib/constants';

interface PhoneEntryProps {
  onSubmit: (email: string, name: string) => void;
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function PhoneEntry({ onSubmit }: PhoneEntryProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError('Completa el captcha para continuar');
      return;
    }

    if (!name.trim() || name.trim().length < 2) {
      setError('Ingresa tu nombre completo');
      return;
    }

    if (!email.trim()) {
      setError('Ingresa tu correo');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al enviar código');
        setTurnstileToken(null);
        setTurnstileResetKey((v) => v + 1);
        return;
      }

      onSubmit(email.trim(), name.trim());
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
      setTurnstileToken(null);
      setTurnstileResetKey((v) => v + 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='card animate-fade-in'>
      <h2 className='text-xl font-bold mb-2'>Vota en segundos</h2>
      <p className='text-muted mb-6'>
        Escribe tu nombre y correo. Te enviaremos un código de{' '}
        {LIMITS.OTP_CODE_LENGTH} dígitos para verificar y continuar.
      </p>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium mb-2'>
            Nombre completo
          </label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Tu nombre'
            disabled={isLoading}
            autoComplete='name'
          />
        </div>

        <div>
          <label htmlFor='email' className='block text-sm font-medium mb-2'>
            Correo
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='tu@correo.com'
            disabled={isLoading}
            autoComplete='email'
          />
          <p className='text-xs text-muted mt-1'>
            Usa un correo válido (gmail/outlook/icloud o .edu)
          </p>
        </div>

        {error && (
          <div className='bg-error/10 border border-error/30 text-error rounded-lg px-4 py-3 text-sm animate-shake'>
            {error}
          </div>
        )}

        <div className='rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted'>
          <span className='mr-2' aria-hidden='true'>
            ⚠️
          </span>
          <span className='font-medium text-foreground'>
            Solo se permite un voto por persona
          </span>
        </div>

        <div className='flex justify-center'>
          <TurnstileWidget
            siteKey={TURNSTILE_SITE_KEY}
            resetKey={turnstileResetKey}
            onToken={setTurnstileToken}
          />
        </div>

        <button
          type='submit'
          className='btn btn-primary w-full'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div
                className='spinner'
                style={{ width: 20, height: 20, borderWidth: 2 }}
              ></div>
              Enviando...
            </>
          ) : (
            <>
              Recibir código
              <span>→</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
