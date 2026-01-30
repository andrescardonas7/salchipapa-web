'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { ERROR_MESSAGES } from '@/lib/constants';

interface Business {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
}

interface BusinessSelectProps {
  businesses: Business[];
  onVoted: (business: Business) => void;
  onAlreadyVoted: () => void;
}

export function BusinessSelect({
  businesses,
  onVoted,
  onAlreadyVoted,
}: BusinessSelectProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [supportsHover, setSupportsHover] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState('');
  const [logoErrorIds, setLogoErrorIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // En móviles no hay hover real. Esto nos permite usar un patrón "tap-to-reveal".
    setSupportsHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  const voteFor = async (business: Business) => {
    if (isVoting) return;

    setIsVoting(true);
    setError('');

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId: business.id }),
      });

      const data: unknown = await res.json();
      const errorMessage =
        typeof data === 'object' && data && 'error' in data
          ? String((data as Record<string, unknown>).error ?? '')
          : '';

      if (!res.ok) {
        if (errorMessage === ERROR_MESSAGES.ALREADY_VOTED) {
          onAlreadyVoted();
          return;
        }

        setError(errorMessage || 'Error al registrar voto');
        return;
      }

      if (navigator.vibrate) navigator.vibrate(30);
      onVoted(business);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsVoting(false);
    }
  };

  const handleCardClick = (business: Business) => {
    if (isVoting) return;

    // Desktop: click = votar directo.
    if (supportsHover) {
      setActiveId(business.id);
      void voteFor(business);
      return;
    }

    // Mobile: 1er toque activa, 2do toque vota.
    if (activeId !== business.id) {
      setActiveId(business.id);
      if (navigator.vibrate) navigator.vibrate(10);
      return;
    }

    void voteFor(business);
  };

  return (
    <div className='animate-fade-in'>
      <div className='text-center mb-5'>
        <h2 className='text-xl font-bold mb-2'>Elige tu favorita</h2>
        <p className='text-muted text-sm'>
          {supportsHover
            ? 'Pasa el mouse por una card y haz clic para votar'
            : 'Toca una card para activar, y toca de nuevo para votar'}
        </p>
      </div>

      {error && (
        <div
          className='bg-error/10 border border-error/30 text-error rounded-lg px-4 py-3 text-sm mb-4 animate-shake text-center'
          role='alert'
        >
          {error}
        </div>
      )}

      {/* Business grid - optimizado para scroll en móvil */}
      <div
        className='grid grid-cols-2 gap-3 max-h-[55vh] sm:max-h-[60vh] overflow-y-auto pb-4 hide-scrollbar'
        role='list'
        aria-label='Negocios participantes'
      >
        {businesses.map((business) => {
          // Preferimos assets locales por velocidad.
          const logoUrl = `/participants/${business.slug}.svg`;
          const showLogo = !logoErrorIds.has(business.id);
          const isActive = activeId === business.id;

          return (
            <button
              key={business.id}
              type='button'
              onClick={() => handleCardClick(business)}
              className={`business-card business-vote-card text-left ${
                isActive ? 'selected' : ''
              }`}
              data-active={isActive ? 'true' : 'false'}
              disabled={isVoting}
              aria-disabled={isVoting}
              aria-label={
                supportsHover
                  ? `Votar por ${business.name}`
                  : isActive
                  ? `Toca de nuevo para votar por ${business.name}`
                  : `Toca para activar ${business.name}`
              }
            >
              <div className='business-logo-wrap'>
                {showLogo ? (
                  <Image
                    src={logoUrl}
                    alt={business.name}
                    width={48}
                    height={48}
                    className='business-logo'
                    loading='lazy'
                    onError={() => {
                      setLogoErrorIds((prev) => {
                        const next = new Set(prev);
                        next.add(business.id);
                        return next;
                      });
                    }}
                  />
                ) : (
                  <span aria-hidden='true'>🍟</span>
                )}
              </div>
              <h3 className='font-semibold text-xs sm:text-sm leading-tight line-clamp-2'>
                {business.name}
              </h3>

              <span className='business-vote-cta' aria-hidden='true'>
                Votar
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
