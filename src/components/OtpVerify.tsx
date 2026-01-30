'use client';

import { TurnstileWidget } from '@/components/TurnstileWidget';
import { LIMITS } from '@/lib/constants';
import {
  ClipboardEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface OtpVerifyProps {
  email: string;
  name: string;
  onVerified: () => void;
  onBack: () => void;
}

const OTP_LENGTH = LIMITS.OTP_CODE_LENGTH;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function OtpVerify({ email, name, onVerified, onBack }: OtpVerifyProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown para reenvío
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = useCallback(
    async (code: string) => {
      if (code.length !== OTP_LENGTH || isLoading) return;

      setIsLoading(true);
      setError('');

      try {
        const res = await fetch('/api/otp/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Código incorrecto');
          setOtp(Array(OTP_LENGTH).fill(''));
          inputRefs.current[0]?.focus();
          // Vibración de error en móviles
          if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
          return;
        }

        // Vibración de éxito
        if (navigator.vibrate) navigator.vibrate(50);
        onVerified();
      } catch {
        setError('Error de conexión. Intenta de nuevo.');
      } finally {
        setIsLoading(false);
      }
    },
    [email, onVerified, isLoading]
  );

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (newOtp.every((digit) => digit) && value) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH);

    if (pastedData.length === OTP_LENGTH) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[OTP_LENGTH - 1]?.focus();
      handleVerify(pastedData);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || isLoading) return;

    setIsLoading(true);
    setError('');

    try {
      if (TURNSTILE_SITE_KEY && !turnstileToken) {
        setError('Completa el captcha para reenviar el código');
        return;
      }

      const res = await fetch('/api/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al reenviar');
        setTurnstileToken(null);
        setTurnstileResetKey((v) => v + 1);
        return;
      }

      setCountdown(60);
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
      setTurnstileToken(null);
      setTurnstileResetKey((v) => v + 1);

      if (navigator.vibrate) navigator.vibrate(30);
    } catch {
      setError('Error de conexión');
      setTurnstileToken(null);
      setTurnstileResetKey((v) => v + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const maskedEmail = (() => {
    const [localPart, domain] = email.split('@');
    if (!domain) return email;
    if (localPart.length <= 2) return `${localPart[0] ?? ''}***@${domain}`;
    return `${localPart[0]}***${localPart.slice(-1)}@${domain}`;
  })();

  return (
    <div className='card animate-fade-in'>
      <button
        onClick={onBack}
        className='text-muted hover:text-foreground mb-4 flex items-center gap-1 text-sm touch-manipulation'
        disabled={isLoading}
        type='button'
      >
        <span aria-hidden='true'>←</span> Cambiar correo
      </button>

      <h2 className='text-xl font-bold mb-2'>Verifica tu correo</h2>
      <p className='text-muted text-sm mb-6'>
        Ingresa el código de {OTP_LENGTH} dígitos enviado a{' '}
        <span className='text-foreground font-medium'>{maskedEmail}</span>
      </p>

      {/* OTP inputs - centrados y con buen espaciado táctil */}
      <div
        className='flex justify-center gap-2 sm:gap-3 mb-6'
        role='group'
        aria-label='Código de verificación'
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className='otp-input'
            disabled={isLoading}
            autoFocus={index === 0}
            autoComplete='one-time-code'
            aria-label={`Dígito ${index + 1} de ${OTP_LENGTH}`}
          />
        ))}
      </div>

      {error && (
        <div
          className='bg-error/10 border border-error/30 text-error rounded-lg px-4 py-3 text-sm mb-4 animate-shake text-center'
          role='alert'
        >
          {error}
        </div>
      )}

      {isLoading && (
        <div className='flex justify-center mb-4' aria-live='polite'>
          <div className='spinner' aria-label='Verificando...'></div>
        </div>
      )}

      <div className='text-center'>
        <p className='text-sm text-muted mb-2'>¿No recibiste el código?</p>

        <div className='flex justify-center mb-3'>
          <TurnstileWidget
            siteKey={TURNSTILE_SITE_KEY}
            resetKey={turnstileResetKey}
            onToken={setTurnstileToken}
          />
        </div>

        <button
          onClick={handleResend}
          disabled={isLoading || countdown > 0}
          className='text-primary hover:text-primary-dark text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation'
          type='button'
        >
          {countdown > 0 ? `Reenviar en ${countdown}s` : 'Reenviar código'}
        </button>
      </div>
    </div>
  );
}
