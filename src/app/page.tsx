'use client';

import { AlreadyVoted } from '@/components/AlreadyVoted';
import { BusinessSelect } from '@/components/BusinessSelect';
import { OtpVerify } from '@/components/OtpVerify';
import { PhoneEntry } from '@/components/PhoneEntry';
import { StepIndicator } from '@/components/StepIndicator';
import { VoteSuccess } from '@/components/VoteSuccess';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Step = 'entry' | 'otp' | 'select' | 'success' | 'already-voted';

interface Business {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
}

export default function Home() {
  const [step, setStep] = useState<Step>('entry');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar estado de sesión al cargar
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/vote');
        const data = await res.json();

        if (data.hasVoted) {
          setStep('already-voted');
        } else if (data.verified) {
          // Tiene sesión verificada, puede votar
          setStep('select');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    }
    checkSession();
  }, []);

  // Cargar negocios
  useEffect(() => {
    async function loadBusinesses() {
      try {
        const res = await fetch('/api/businesses');
        const data = await res.json();
        if (data.businesses) {
          setBusinesses(data.businesses);
        }
      } catch (error) {
        console.error('Error loading businesses:', error);
      }
    }
    loadBusinesses();
  }, []);

  const handleEmailSubmit = (submittedEmail: string, submittedName: string) => {
    setEmail(submittedEmail);
    setName(submittedName);
    setStep('otp');
  };

  const handleOtpVerified = () => {
    setStep('select');
  };

  const handleVoted = () => {
    setStep('success');
  };

  const getCurrentStepNumber = () => {
    switch (step) {
      case 'entry':
        return 1;
      case 'otp':
        return 2;
      case 'select':
        return 3;
      case 'success':
      case 'already-voted':
        return 3;
      default:
        return 1;
    }
  };

  const showStepIndicator = step !== 'success' && step !== 'already-voted';

  // Skeleton para el estado de carga inicial - evita CLS al mantener layout estable
  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className='card animate-pulse'>
          <div className='h-6 bg-card-border rounded w-3/4 mb-4'></div>
          <div className='h-4 bg-card-border rounded w-full mb-6'></div>
          <div className='space-y-4'>
            <div className='h-12 bg-card-border rounded'></div>
            <div className='h-12 bg-card-border rounded'></div>
            <div className='h-12 bg-card-border rounded'></div>
          </div>
        </div>
      );
    }

    return (
      <>
        {step === 'entry' && <PhoneEntry onSubmit={handleEmailSubmit} />}

        {step === 'otp' && (
          <OtpVerify
            email={email}
            name={name}
            onVerified={handleOtpVerified}
            onBack={() => setStep('entry')}
          />
        )}

        {step === 'select' && (
          <BusinessSelect
            businesses={businesses}
            onVoted={handleVoted}
            onAlreadyVoted={() => setStep('already-voted')}
          />
        )}

        {step === 'success' && <VoteSuccess />}

        {step === 'already-voted' && <AlreadyVoted />}
      </>
    );
  };

  return (
    <main className='min-h-screen relative overflow-hidden salchi-pattern'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col'>
        {/* Header */}
        <header className='text-center mb-4'>
          <div className='mb-2 flex justify-center'>
            <Image
              src='/oficial/logo-oficial.PNG'
              alt='Logo oficial del evento'
              width={220}
              height={220}
              priority
              className='h-auto w-[180px] sm:w-[220px]'
            />
          </div>
          <h1 className='text-3xl md:text-4xl font-bold mb-2'>
            <span className='gradient-text'>
              Tercer Desafío de la Salchipapa
            </span>
          </h1>
          <p className='text-muted'>
            🏆 Vota y ayuda a elegir la mejor salchipapa de Cartago
          </p>
        </header>

        {/* Step indicator - wrapper con altura fija para evitar CLS */}
        <div className='min-h-[52px] flex items-center justify-center mb-0'>
          {showStepIndicator && (
            <StepIndicator
              currentStep={getCurrentStepNumber()}
              totalSteps={3}
            />
          )}
        </div>

        {/* Main content */}
        <div className='flex-1 flex flex-col justify-center'>
          {renderMainContent()}
        </div>

        {/* Patrocinadores (solo public/sponsors) */}
        <section className='mt-8 text-center' aria-label='Patrocinadores'>
          <p className='text-xs uppercase tracking-wider text-muted mb-4'>
            Patrocinadores
          </p>
          <div className='flex flex-wrap items-center justify-center gap-8 sm:gap-10'>
            <Image
              src='/sponsors/La-7incluyente.png'
              alt='La 7 incluyente'
              width={200}
              height={100}
              className='h-16 sm:h-20 w-auto object-contain'
              loading='lazy'
            />
            <Image
              src='/sponsors/Oscar.png'
              alt='Oscar'
              width={200}
              height={100}
              className='h-16 sm:h-20 w-auto object-contain'
              loading='lazy'
            />
            <Image
              src='/sponsors/Coemca.png'
              alt='Coemca - Colectivo Empresarial Cartagüeño'
              width={200}
              height={100}
              className='h-16 sm:h-20 w-auto object-contain'
              loading='lazy'
            />
          </div>
        </section>
      </div>
    </main>
  );
}
