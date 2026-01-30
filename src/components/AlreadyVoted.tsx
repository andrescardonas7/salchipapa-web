'use client'

export function AlreadyVoted() {
  return (
    <div className="card animate-fade-in text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-muted/20 flex items-center justify-center mb-6 text-4xl">
        🗳️
      </div>

      <h2 className="text-2xl font-bold mb-2">Ya has votado</h2>

      <p className="text-muted mb-6">
        Este usuario ya participó en el desafío.
        <br />
        Solo se permite un voto por persona.
      </p>

      <div className="bg-card-border/30 rounded-xl p-4 mb-6">
        <p className="text-sm text-muted">
          Gracias por tu participación.
          <br />
          Los resultados se publicarán al final del desafío.
        </p>
      </div>

      <a
        href="/results"
        className="btn btn-secondary w-full inline-flex"
      >
        Ver resultados (cuando estén disponibles)
      </a>
    </div>
  )
}
