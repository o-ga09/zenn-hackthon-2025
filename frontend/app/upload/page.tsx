'use client'

import MainLayout from '@/components/layout/MainLayout'
import InputTravelInformation from './_components/InputTravelInformation'
import UploadedVideos from './_components/UploadedVideos'

export default function UploadPage() {
  return (
    <MainLayout
      title="動画生成 - アップロード"
      description="写真と旅行情報をアップロードして、AIが素敵な動画を作成します"
    >
      <InputTravelInformation />
      <UploadedVideos />
    </MainLayout>
  )
}
