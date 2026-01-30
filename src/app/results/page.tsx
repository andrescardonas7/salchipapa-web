'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface RankingItem {
  rank: number
  name: string
  slug: string
  imageUrl: string | null
  votes: number
  percentage: string
}

interface ResultsData {
  published: boolean
  message?: string
  totalVotes?: number
  ranking?: RankingItem[]
  lastUpdated?: string
}

export default function ResultsPage() {
  const [data, setData] = useState<ResultsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadResults() {
      try {
        const res = await fetch('/api/results')
        const results = await res.json()
        setData(results)
      } catch (error) {
        console.error('Error loading results:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadResults()
  }, [])

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-muted">Cargando resultados...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <Link href="/" className="text-muted hover:text-foreground text-sm mb-4 inline-block">
            ← Volver al inicio
          </Link>
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Resultados del Desafío</span>
          </h1>
        </header>

        {/* Content */}
        {!data?.published ? (
          <div className="card text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-muted/20 flex items-center justify-center mb-6 text-4xl">
              ⏳
            </div>
            <h2 className="text-xl font-bold mb-2">Resultados no disponibles</h2>
            <p className="text-muted">
              {data?.message || 'Los resultados se publicarán al final del desafío.'}
            </p>
            <Link href="/" className="btn btn-primary mt-6 inline-flex">
              Ir a votar
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="card mb-6">
              <div className="text-center">
                <p className="text-muted text-sm uppercase tracking-wider mb-1">Total de votos</p>
                <p className="text-4xl font-bold gradient-text">{data.totalVotes?.toLocaleString()}</p>
              </div>
            </div>

            {/* Ranking */}
            <div className="space-y-3">
              {data.ranking?.map((item, index) => (
                <div
                  key={item.slug}
                  className={`card flex items-center gap-4 ${
                    index === 0 ? 'border-yellow-500/50 bg-yellow-500/5' :
                    index === 1 ? 'border-gray-400/50 bg-gray-400/5' :
                    index === 2 ? 'border-amber-600/50 bg-amber-600/5' : ''
                  }`}
                >
                  {/* Rank */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                    index === 0 ? 'bg-yellow-500 text-black' :
                    index === 1 ? 'bg-gray-400 text-black' :
                    index === 2 ? 'bg-amber-600 text-white' :
                    'bg-card-border text-muted'
                  }`}>
                    {item.rank}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-muted">
                      {item.votes} votos ({item.percentage}%)
                    </p>
                  </div>

                  {/* Medal for top 3 */}
                  {index < 3 && (
                    <div className="text-3xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Last updated */}
            {data.lastUpdated && (
              <p className="text-center text-sm text-muted mt-6">
                Última actualización: {new Date(data.lastUpdated).toLocaleString('es-CO')}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  )
}
