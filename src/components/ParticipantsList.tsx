'use client';

import Image from 'next/image';
import { useState } from 'react';

import { getParticipantLogoUrl } from '@/lib/participants';

interface Business {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
}

interface ParticipantsListProps {
  businesses: Business[];
}

export function ParticipantsList({ businesses }: ParticipantsListProps) {
  const [logoErrorIds, setLogoErrorIds] = useState<Set<string>>(new Set());

  return (
    <div className='animate-fade-in'>
      <div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-4 hide-scrollbar'
        role='list'
        aria-label='Lista de participantes'
      >
        {businesses.map((business) => {
          const logoUrl = getParticipantLogoUrl({
            slug: business.slug,
            imageUrl: business.imageUrl,
          });
          const showLogo = !logoErrorIds.has(business.id);

          return (
            <article
              key={business.id}
              className='participant-card group'
              role='listitem'
            >
              {/* Logo container - prominente */}
              <div className='participant-logo-container'>
                {showLogo ? (
                  <Image
                    src={logoUrl}
                    alt={`Logo de ${business.name}`}
                    width={240}
                    height={240}
                    className='participant-logo'
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
                  <span className='participant-fallback' aria-hidden='true'>
                    🍟
                  </span>
                )}
              </div>

              {/* Nombre del negocio */}
              <h3 className='participant-name'>{business.name}</h3>

              {/* Badge decorativo */}
              <div className='participant-badge' aria-hidden='true'>
                Participante
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
