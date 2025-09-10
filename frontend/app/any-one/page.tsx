import MainLayout from '@/components/layout/MainLayout'
import ShortsViewer from './_components/ShortsViewer'

export default function AnyOnePage() {
  return (
    <MainLayout title="みんなの動画" description="みんなが作成した旅行動画を楽しもう">
      <ShortsViewer />
    </MainLayout>
  )
}
