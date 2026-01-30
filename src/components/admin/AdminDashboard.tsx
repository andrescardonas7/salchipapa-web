'use client'

import { useState, useEffect, useCallback } from 'react'

interface Summary {
  totalVoters: number
  totalVotes: number
  conversionRate: string
}

interface RankingItem {
  rank: number
  id: string
  name: string
  slug: string
  votes: number
  firstVoteAt: string | null
}

interface MetricsData {
  summary: Summary
  ranking: RankingItem[]
  recentActivity: number
  lastUpdated: string
}

export function AdminDashboard() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPublished, setIsPublished] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [refreshInterval, setRefreshInterval] = useState<number>(30)

  const loadMetrics = useCallback(async () => {
    try {
      const [metricsRes, publishRes] = await Promise.all([
        fetch('/api/admin/metrics'),
        fetch('/api/admin/publish')
      ])

      if (metricsRes.ok) {
        const data = await metricsRes.json()
        setMetrics(data)
      }

      if (publishRes.ok) {
        const data = await publishRes.json()
        setIsPublished(data.published)
      }
    } catch (error) {
      console.error('Error loading metrics:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMetrics()

    // Auto-refresh
    const interval = setInterval(loadMetrics, refreshInterval * 1000)
    return () => clearInterval(interval)
  }, [loadMetrics, refreshInterval])

  const handlePublish = async (publish: boolean) => {
    setIsPublishing(true)
    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publish })
      })

      if (res.ok) {
        setIsPublished(publish)
      }
    } catch (error) {
      console.error('Error publishing:', error)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleExport = async (format: 'csv' | 'json') => {
    window.open(`/api/admin/export?format=${format}`, '_blank')
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-muted">Cargando métricas...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold">🍟 Panel de Administración</h1>
            <p className="text-muted text-sm">Desafío Salchipapa - Métricas en tiempo real</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="bg-card border border-card-border rounded-lg px-3 py-2 text-sm"
            >
              <option value={10}>Actualizar: 10s</option>
              <option value={30}>Actualizar: 30s</option>
              <option value={60}>Actualizar: 1min</option>
            </select>

            <button
              onClick={() => loadMetrics()}
              className="btn btn-secondary text-sm"
            >
              ↻ Actualizar
            </button>
          </div>
        </header>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="card">
            <p className="text-muted text-xs uppercase tracking-wider mb-1">Total Votantes</p>
            <p className="text-3xl font-bold">{metrics?.summary.totalVoters || 0}</p>
          </div>
          <div className="card">
            <p className="text-muted text-xs uppercase tracking-wider mb-1">Votos Totales</p>
            <p className="text-3xl font-bold text-success">{metrics?.summary.totalVotes || 0}</p>
          </div>
          <div className="card">
            <p className="text-muted text-xs uppercase tracking-wider mb-1">Conversión</p>
            <p className="text-3xl font-bold">{metrics?.summary.conversionRate || '0%'}</p>
          </div>
        </div>

        {/* Ranking */}
        <div className="card mb-8">
          <h2 className="font-bold mb-4">🏆 Ranking de Negocios</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-card-border">
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Negocio</th>
                  <th className="text-right py-3 px-2">Votos</th>
                  <th className="text-right py-3 px-2">Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                {metrics?.ranking.map((item) => {
                  const totalVotes = metrics.summary.totalVotes || 1
                  const percentage = ((item.votes / totalVotes) * 100).toFixed(1)

                  return (
                    <tr key={item.id} className="border-b border-card-border/50">
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          item.rank === 1 ? 'bg-yellow-500 text-black' :
                          item.rank === 2 ? 'bg-gray-400 text-black' :
                          item.rank === 3 ? 'bg-amber-600 text-white' :
                          'bg-card-border text-muted'
                        }`}>
                          {item.rank}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-medium">{item.name}</td>
                      <td className="py-3 px-2 text-right font-bold">{item.votes}</td>
                      <td className="py-3 px-2 text-right text-muted">{percentage}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Publish toggle */}
          <div className="card">
            <h2 className="font-bold mb-4">📢 Publicación de Resultados</h2>
            <p className="text-muted text-sm mb-4">
              Estado actual: {' '}
              <span className={isPublished ? 'text-success font-bold' : 'text-muted'}>
                {isPublished ? 'Publicados' : 'Ocultos'}
              </span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handlePublish(true)}
                disabled={isPublishing || isPublished}
                className="btn btn-primary flex-1"
              >
                {isPublishing ? 'Procesando...' : 'Publicar'}
              </button>
              <button
                onClick={() => handlePublish(false)}
                disabled={isPublishing || !isPublished}
                className="btn btn-secondary flex-1"
              >
                Ocultar
              </button>
            </div>
          </div>

          {/* Export */}
          <div className="card">
            <h2 className="font-bold mb-4">📥 Exportar Datos</h2>
            <p className="text-muted text-sm mb-4">
              Descarga el registro completo de votos para auditoría.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleExport('csv')}
                className="btn btn-secondary flex-1"
              >
                Exportar CSV
              </button>
              <button
                onClick={() => handleExport('json')}
                className="btn btn-secondary flex-1"
              >
                Exportar JSON
              </button>
            </div>
          </div>
        </div>

        {/* Last updated */}
        {metrics?.lastUpdated && (
          <p className="text-center text-xs text-muted mt-8">
            Última actualización: {new Date(metrics.lastUpdated).toLocaleString('es-CO')}
          </p>
        )}
      </div>
    </main>
  )
}
