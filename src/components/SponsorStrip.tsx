'use client';

import Image from 'next/image';

interface Sponsor {
  name: string;
  logoUrl?: string | null;
  href?: string;
}

interface SponsorStripProps {
  sponsors: Sponsor[];
}

export function SponsorStrip({ sponsors }: SponsorStripProps) {
  if (sponsors.length === 0) return null;

  return (
    <section className='mt-8'>
      <div className='text-center mb-4'>
        <p className='text-xs uppercase tracking-wider text-muted'>
          Participantes
        </p>
        <h2 className='text-lg font-semibold'>Restaurantes participantes</h2>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6'>
        {sponsors.map((sponsor) => {
          const content = sponsor.logoUrl ? (
            <Image
              src={sponsor.logoUrl}
              alt={sponsor.name}
              width={360}
              height={180}
              className='sponsor-logo'
              loading='lazy'
              sizes='(min-width: 768px) 33vw, 50vw'
            />
          ) : (
            <span className='text-sm font-medium'>{sponsor.name}</span>
          );

          if (sponsor.href) {
            return (
              <a
                key={sponsor.name}
                href={sponsor.href}
                className='sponsor-card'
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`Ir a ${sponsor.name}`}
              >
                {content}
              </a>
            );
          }

          return (
            <div key={sponsor.name} className='sponsor-card'>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
