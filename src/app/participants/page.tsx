import Link from 'next/link';

import { ParticipantsList } from '@/components/ParticipantsList';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Participantes | Desafío Salchipapa',
  description: 'Conoce los participantes del Desafío Salchipapa.',
};

export default async function ParticipantsPage() {
  const businesses = await prisma.business.findMany({
    where: { active: true },
    select: {
      id: true,
      name: true,
      slug: true,
      imageUrl: true,
    },
    orderBy: { name: 'asc' },
  });

  return (
    <main className='min-h-screen relative overflow-hidden'>
      {/* Background */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 py-8'>
        <header className='text-center mb-6'>
          <Link
            href='/'
            className='text-muted hover:text-foreground text-sm mb-4 inline-block'
          >
            ← Volver
          </Link>
          <h1 className='text-3xl md:text-4xl font-bold mb-2'>
            <span className='gradient-text'>Participantes</span>
          </h1>
          <p className='text-muted text-sm'>
            Revisa la lista de participantes. Para votar, ve al inicio y valida
            tu correo.
          </p>
        </header>

        <div className='card mb-4'>
          <div className='flex items-center justify-between gap-3 flex-wrap'>
            <div>
              <p className='text-muted text-xs uppercase tracking-wider mb-1'>
                Total participantes
              </p>
              <p className='text-2xl font-bold'>{businesses.length}</p>
            </div>
            <Link href='/' className='btn btn-primary'>
              Ir a votar
            </Link>
          </div>
        </div>

        <ParticipantsList businesses={businesses} />
      </div>
    </main>
  );
}
