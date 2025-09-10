import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkles, ArrowRight } from 'lucide-react'
import React from 'react'

type UploadedVideosProps = {
  uploadedFiles: File[]
  travelTitle: string
  travelDate: string
}
export default function GenerateVideo({
  uploadedFiles,
  travelTitle,
  travelDate,
}: UploadedVideosProps) {
  const handleSubmit = () => {
    // ここで動画生成処理を開始
  }
  return (
    <div className="mt-8 text-center">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2">動画生成の準備完了！</h3>
          <p className="opacity-90">AIが{uploadedFiles.length}枚の写真から素敵な動画を作成します</p>
        </div>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
          onClick={handleSubmit}
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
