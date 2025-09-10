import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Plus, Upload } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function QuickAction() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">新しい動画を作成</CardTitle>
              <CardDescription>写真をアップロードして新しい旅行動画を作成</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Link href="/upload">
            <Button className="w-full bg-primary hover:bg-primary/90">
              <Upload className="w-4 h-4 mr-2" />
              写真をアップロード
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">統計情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">作成した動画</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">156</div>
              <div className="text-sm text-muted-foreground">アップロード写真</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
