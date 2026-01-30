'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type TurnstileTheme = 'light' | 'dark' | 'auto';
type TurnstileSize = 'normal' | 'compact';

type TurnstileRenderParams = {
  sitekey: string;
  callback: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
  theme?: TurnstileTheme;
  size?: TurnstileSize;
};

type TurnstileApi = {
  render: (container: HTMLElement, params: TurnstileRenderParams) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

// Dimensiones conocidas del widget de Turnstile para reservar espacio y evitar CLS
const TURNSTILE_DIMENSIONS = {
  normal: { width: 300, height: 65 },
  compact: { width: 130, height: 120 },
} as const;

let turnstileScriptPromise: Promise<void> | null = null;

/**
 * Ejecuta una función cuando el navegador está idle, con fallback a setTimeout.
 * Esto reduce el TBT al no bloquear el hilo principal durante el arranque.
 */
function scheduleWhenIdle(callback: () => void): void {
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(callback, { timeout: 2000 });
  } else {
    // Fallback para navegadores sin requestIdleCallback (Safari < 16.4)
    setTimeout(callback, 100);
  }
}

function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined')
    return Promise.reject(new Error('No window'));
  if (window.turnstile) return Promise.resolve();

  if (turnstileScriptPromise) return turnstileScriptPromise;

  turnstileScriptPromise = new Promise<void>((resolve, reject) => {
    // Diferir la carga del script para reducir TBT
    scheduleWhenIdle(() => {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${TURNSTILE_SCRIPT_SRC}"]`
      );
      if (existing) {
        if (window.turnstile) {
          resolve();
          return;
        }
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener(
          'error',
          () => reject(new Error('Turnstile script failed')),
          {
            once: true,
          }
        );
        return;
      }

      const script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Turnstile script failed'));
      document.head.appendChild(script);
    });
  });

  return turnstileScriptPromise;
}

interface TurnstileWidgetProps {
  siteKey?: string;
  onToken: (token: string | null) => void;
  resetKey?: number;
  theme?: TurnstileTheme;
  size?: TurnstileSize;
}

export function TurnstileWidget({
  siteKey,
  onToken,
  resetKey = 0,
  theme = 'auto',
  size = 'normal',
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const enabled = useMemo(() => Boolean(siteKey), [siteKey]);
  const dimensions = TURNSTILE_DIMENSIONS[size];

  useEffect(() => {
    if (!enabled) return;
    if (!siteKey) return;

    let cancelled = false;
    // Evita setState síncrono dentro del effect (react-hooks/set-state-in-effect)
    // y resetea el skeleton al re-render por cambios en dependencias.
    setTimeout(() => {
      if (!cancelled) setIsLoaded(false);
    }, 0);

    async function renderWidget() {
      const siteKeyValue = siteKey;
      if (!siteKeyValue) return;

      await loadTurnstileScript();
      if (cancelled) return;
      if (!containerRef.current) return;
      if (!window.turnstile)
        throw new Error('Turnstile API missing after load');

      // Re-render cleanly on resetKey changes
      containerRef.current.innerHTML = '';

      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKeyValue,
        theme,
        size,
        callback: (token) => {
          setIsLoaded(true);
          onToken(token);
        },
        'expired-callback': () => {
          onToken(null);
        },
        'error-callback': () => {
          setIsLoaded(true);
          onToken(null);
        },
      });

      widgetIdRef.current = widgetId;
      // Marcar como cargado después de un breve delay para permitir que el iframe se renderice
      setTimeout(() => {
        if (!cancelled) setIsLoaded(true);
      }, 100);
    }

    renderWidget().catch(() => {
      // Si falla cargar Turnstile, tratamos como no verificado.
      setIsLoaded(true);
      onToken(null);
    });

    return () => {
      cancelled = true;
      const widgetId = widgetIdRef.current;
      widgetIdRef.current = null;

      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // noop
        }
      }
    };
  }, [enabled, onToken, resetKey, siteKey, size, theme]);

  if (!enabled) return null;

  return (
    <div
      style={{
        minWidth: dimensions.width,
        minHeight: dimensions.height,
        position: 'relative',
      }}
    >
      {/* Skeleton placeholder mientras carga - evita CLS */}
      {!isLoaded && (
        <div
          className='animate-pulse bg-card-border rounded'
          style={{
            position: 'absolute',
            inset: 0,
            width: dimensions.width,
            height: dimensions.height,
          }}
          aria-hidden='true'
        />
      )}
      <div ref={containerRef} />
    </div>
  );
}
