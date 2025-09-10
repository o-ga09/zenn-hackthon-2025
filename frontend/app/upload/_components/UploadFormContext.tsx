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
  handleGenerateVideo: () => Promise<void>
  addFiles: (files: File[]) => void
  removeFile: (index: number) => void
  uploadedFiles: File[]
  isGenerating: boolean
  generationError: string | null
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

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationError, setGenerationError] = useState<string | null>(null)

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
    if (step === 'upload') {
      if (uploadedFiles.length > 0) {
        setStep('info')
      }
    } else if (step === 'info') {
      if (
        methods.formState.isValid &&
        !methods.formState.errors.travelTitle &&
        !methods.formState.errors.travelDate
      ) {
        setStep('confirm')
      } else {
        // フォームのバリデーションを強制的に実行
        methods.trigger(['travelTitle', 'travelDate'])
      }
    }
  }

  const prevStep = () => {
    if (step === 'confirm') setStep('info')
    else if (step === 'info') setStep('upload')
  }

  const handleGenerateVideo = async () => {
    try {
      // 生成中の状態を設定
      setIsGenerating(true)
      setGenerationError(null)

      // フォームデータの取得
      const formData = methods.getValues()

      console.log('動画生成処理を開始', {
        travelTitle: formData.travelTitle,
        travelDate: formData.travelDate,
        travelLocation: formData.travelLocation,
        travelDescription: formData.travelDescription,
        photosCount: uploadedFiles.length,
      })

      // モックAPI呼び出し - 実際のAPIが実装されたらここを置き換える
      // 実際の実装では、写真ファイルをアップロードし、処理をリクエストするコードが入ります
      await new Promise(resolve => setTimeout(resolve, 2000)) // 2秒待機してAPIリクエストをシミュレート

      // 成功した場合、動画ページへリダイレクト
      router.push('/videos')
    } catch (error) {
      // エラーハンドリング
      console.error('動画生成中にエラーが発生しました', error)
      setGenerationError('動画生成中にエラーが発生しました。もう一度お試しください。')
    } finally {
      setIsGenerating(false)
    }
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
    isGenerating,
    generationError,
  }

  return (
    <UploadFormContext.Provider value={value}>
      <FormProvider {...methods}>{children}</FormProvider>
    </UploadFormContext.Provider>
  )
}
