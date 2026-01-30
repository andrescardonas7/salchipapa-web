'use client'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="step-indicator">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1
          let status = ''
          if (stepNum < currentStep) status = 'completed'
          else if (stepNum === currentStep) status = 'active'

          return (
            <div
              key={i}
              className={`step-dot ${status}`}
              title={`Paso ${stepNum}`}
            />
          )
        })}
      </div>
    </div>
  )
}
