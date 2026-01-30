import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // Para notch de iPhone
  themeColor: '#0D0D0D',
};

export const metadata: Metadata = {
  title: '🍟 Desafío Salchipapa | Vota por la Mejor',
  description:
    'Vota por la mejor salchipapa de la ciudad. Un voto, una elección. ¡Que gane la mejor!',
  keywords: ['salchipapa', 'votación', 'desafío', 'comida', 'colombia'],
  authors: [{ name: 'Desafío Salchipapa' }],
  creator: 'Desafío Salchipapa',
  openGraph: {
    title: '🍟 Desafío Salchipapa | Vota por la Mejor',
    description:
      'Vota por la mejor salchipapa de la ciudad. Un voto, una elección. ¡Que gane la mejor!',
    type: 'website',
    locale: 'es_CO',
    siteName: 'Desafío Salchipapa',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🍟 Desafío Salchipapa',
    description: 'Vota por la mejor salchipapa de la ciudad',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Desafío Salchipapa',
  },
  formatDetection: {
    telephone: false, // Evita que se detecten teléfonos automáticamente
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es' className='antialiased' suppressHydrationWarning>
      <head>
        {/* PWA manifest */}
        <link rel='manifest' href='/manifest.json' />

        {/* Favicons */}
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
      </head>
      <body className='antialiased' suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
