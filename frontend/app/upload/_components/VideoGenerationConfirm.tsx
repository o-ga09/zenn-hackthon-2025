'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkles, ArrowRight } from 'lucide-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TravelFormValues } from './form-schema'
import { useUploadForm } from './UploadFormContext'

export default function VideoGenerationConfirm() {
  const { watch } = useFormContext<TravelFormValues>()
  const { handleGenerateVideo, uploadedFiles } = useUploadForm()

  const travelTitle = watch('travelTitle')
  const travelDate = watch('travelDate')

  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-semibold mb-2">確認事項</h3>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>アップロードした写真: {uploadedFiles.length}枚</li>
          <li>旅行タイトル: {travelTitle}</li>
          <li>旅行日: {travelDate}</li>
        </ul>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2">動画生成の準備完了！</h3>
          <p className="opacity-90">AIが{uploadedFiles.length}枚の写真から素敵な動画を作成します</p>
        </div>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 w-full"
          onClick={handleGenerateVideo}
          disabled={uploadedFiles.length === 0 || !travelTitle || !travelDate}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          AI動画生成を開始
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Card>
    </div>
  )
}
