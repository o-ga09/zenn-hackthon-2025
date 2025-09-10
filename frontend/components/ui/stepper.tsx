'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface StepProps {
  title: string
  description?: string
  index: number
  active: boolean
  completed: boolean
  last?: boolean
}

const Step = ({ title, description, index, active, completed, last = false }: StepProps) => {
  return (
    <div className={cn('flex items-start', !last && 'w-full')}>
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'flex items-center justify-center w-8 h-8 rounded-full border-2 z-10',
            active
              ? 'border-primary bg-primary text-white'
              : completed
              ? 'border-primary bg-primary text-white'
              : 'border-muted-foreground/40 text-muted-foreground'
          )}
        >
          {completed ? (
            <Check className="w-5 h-5" />
          ) : (
            <span className="text-sm font-medium">{index + 1}</span>
          )}
        </div>
        {!last && (
          <div
            className={cn('w-0.5 h-full mt-2', completed ? 'bg-primary' : 'bg-muted-foreground/40')}
          />
        )}
      </div>
      <div className="ml-4 mt-0.5 pb-8">
        <h3
          className={cn(
            'text-sm font-medium',
            active || completed ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {title}
        </h3>
        {description && <p className="text-xs mt-1 text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}

interface StepperProps {
  steps: {
    title: string
    description?: string
  }[]
  activeStep: number
  className?: string
}

export function Stepper({ steps, activeStep, className }: StepperProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {steps.map((step, index) => (
        <Step
          key={index}
          title={step.title}
          description={step.description}
          index={index}
          active={index === activeStep}
          completed={index < activeStep}
          last={index === steps.length - 1}
        />
      ))}
    </div>
  )
}
