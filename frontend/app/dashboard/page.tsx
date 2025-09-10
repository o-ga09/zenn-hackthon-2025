import MainLayout from '@/components/layout/MainLayout'
import QuickAction from './_components/QuickAction'
import RecentVideo from './_components/RecentVideo'

export default function DashboardPage() {
  return (
    <MainLayout title="ダッシュボード" description="あなたの旅行動画を管理しましょう">
      <QuickAction />
      <RecentVideo />
    </MainLayout>
  )
}
