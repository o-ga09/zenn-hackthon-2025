'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Stepper } from '@/components/ui/stepper'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface StepperLayoutProps {
  steps: {
    title: string
    description?: string
    content: React.ReactNode
    showNextButton?: boolean
    showBackButton?: boolean
    nextButtonText?: string
    backButtonText?: string
    isNextDisabled?: boolean
  }[]
  onComplete?: () => void
  className?: string
  activeStep?: number
  onNext?: () => void
  onBack?: () => void
}

export default function StepperLayout({
  steps,
  onComplete,
  className,
  activeStep: externalActiveStep,
  onNext,
  onBack,
}: StepperLayoutProps) {
  const [internalActiveStep, setInternalActiveStep] = useState(0)

  // 外部から制御されているかどうかを判断
  const isControlled = externalActiveStep !== undefined
  const activeStep = isControlled ? externalActiveStep : internalActiveStep

  const handleNext = () => {
    if (onNext) {
      onNext()
    } else if (activeStep < steps.length - 1) {
      setInternalActiveStep(prev => prev + 1)
    } else if (onComplete) {
      onComplete()
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else if (activeStep > 0) {
      setInternalActiveStep(prev => prev - 1)
    }
  }

  const currentStep = steps[activeStep]

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/4">
        <Card className="p-6 sticky top-24">
          <Stepper
            steps={steps.map(step => ({
              title: step.title,
              description: step.description,
            }))}
            activeStep={activeStep}
          />
        </Card>
      </div>
      <div className="md:w-3/4">
        <Card className="p-6">
          <div className="mb-8">{currentStep.content}</div>
          <div className="flex justify-between mt-8">
            {(currentStep.showBackButton ?? true) && activeStep > 0 ? (
              <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                {currentStep.backButtonText || '前へ戻る'}
              </Button>
            ) : (
              <div></div>
            )}
            {(currentStep.showNextButton ?? true) && (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2"
                disabled={currentStep.isNextDisabled}
              >
                {currentStep.nextButtonText || '次へ進む'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
