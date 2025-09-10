import MainLayout from '@/components/layout/MainLayout'
import Library from './_components/Library'

export default function VideosPage() {
  return (
    <MainLayout title="動画ライブラリ" description="あなたの旅の思い出をここで管理しましょう。">
      <Library />
    </MainLayout>
  )
}
