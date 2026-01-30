'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type ConfettiPiece = {
  leftPercent: number;
  topPercent: number;
  animationDelaySeconds: number;
  animationDurationSeconds: number;
  emoji: '🎉' | '🍟' | '⭐' | '✨' | '🎊';
};

const CONFETTI_EMOJIS: ConfettiPiece['emoji'][] = [
  '🎉',
  '🍟',
  '⭐',
  '✨',
  '🎊',
];
const CONFETTI_COUNT = 20;

function generateConfetti(): ConfettiPiece[] {
  return Array.from({ length: CONFETTI_COUNT }).map(() => ({
    leftPercent: Math.random() * 100,
    topPercent: Math.random() * 100,
    animationDelaySeconds: Math.random() * 0.5,
    animationDurationSeconds: 0.5 + Math.random() * 0.5,
    emoji: CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)],
  }));
}

export function VoteSuccess() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [confetti] = useState<ConfettiPiece[]>(() => generateConfetti());

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='card animate-fade-in text-center relative overflow-hidden'>
      {/* Confetti effect */}
      {showConfetti && (
        <div className='absolute inset-0 pointer-events-none'>
          {confetti.map((piece, i) => (
            <div
              key={i}
              className='absolute text-2xl animate-bounce'
              style={{
                left: `${piece.leftPercent}%`,
                top: `${piece.topPercent}%`,
                animationDelay: `${piece.animationDelaySeconds}s`,
                animationDuration: `${piece.animationDurationSeconds}s`,
              }}
            >
              {piece.emoji}
            </div>
          ))}
        </div>
      )}

      <div className='relative z-10'>
        <div className='w-24 h-24 mx-auto rounded-full bg-success/20 flex items-center justify-center mb-6'>
          <svg
            className='w-12 h-12 text-success'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={3}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>

        <h2 className='text-2xl font-bold mb-3'>🧡 Gracias por votar</h2>

        <p className='text-muted mb-2'>Eres parte de la familia salchipapera</p>

        <p className='text-muted mb-6'>
          Tu voto ya fue registrado y no puede modificarse.
          <br />
          📣 Invita a otros a participar y apoyar el desafío.
        </p>

        <div className='space-y-3'>
          <Link href='/' className='btn btn-secondary w-full inline-flex'>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
