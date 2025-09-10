'use client'

import React, { createContext, useContext, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TravelFormValues, UploadStep, travelFormSchema } from './form-schema'
import { useRouter } from 'next/navigation'

interface UploadFormContextProps {
  step: UploadStep
  setStep: (step: UploadStep) => void
  nextStep: () => void
  prevStep: () => void
  handleGenerateVideo: () => void
  addFiles: (files: File[]) => void
  removeFile: (index: number) => void
  uploadedFiles: File[]
}

const UploadFormContext = createContext<UploadFormContextProps | undefined>(undefined)

export const useUploadForm = () => {
  const context = useContext(UploadFormContext)
  if (!context) {
    throw new Error('useUploadForm must be used within a UploadFormProvider')
  }
  return context
}

interface UploadFormProviderProps {
  children: React.ReactNode
}

export function UploadFormProvider({ children }: UploadFormProviderProps) {
  const router = useRouter()
  const [step, setStep] = useState<UploadStep>('upload')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const methods = useForm<TravelFormValues>({
    resolver: zodResolver(travelFormSchema),
    defaultValues: {
      travelTitle: '',
      travelDate: '',
      travelLocation: '',
      travelDescription: '',
      uploadedFiles: [],
    },
    mode: 'onChange',
  })

  const nextStep = () => {
    if (step === 'upload') setStep('info')
    else if (step === 'info') setStep('confirm')
  }

  const prevStep = () => {
    if (step === 'confirm') setStep('info')
    else if (step === 'info') setStep('upload')
  }

  const handleGenerateVideo = () => {
    // ここで動画生成処理を開始
    // 成功したら動画ページへリダイレクト
    router.push('/videos')
  }

  const addFiles = (files: File[]) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev, ...files]
      methods.setValue('uploadedFiles', newFiles)
      return newFiles
    })
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev]
      newFiles.splice(index, 1)
      methods.setValue('uploadedFiles', newFiles)
      return newFiles
    })
  }

  const value = {
    step,
    setStep,
    nextStep,
    prevStep,
    handleGenerateVideo,
    addFiles,
    removeFile,
    uploadedFiles,
  }

  return (
    <UploadFormContext.Provider value={value}>
      <FormProvider {...methods}>{children}</FormProvider>
    </UploadFormContext.Provider>
  )
}
