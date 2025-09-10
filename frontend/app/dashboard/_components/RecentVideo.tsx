import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { recentVideos } from '@/mock/mock'
import { Play, Badge, Calendar, Download, Share2 } from 'lucide-react'
import React from 'react'

export default function RecentVideo() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">最近の動画</h2>
        <Button variant="outline">すべて表示</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentVideos.map(video => (
          <Card
            key={video.id}
            className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow"
          >
            <CardHeader className="p-0">
              <div className="relative aspect-[9/16] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg overflow-hidden">
                <img
                  src={video.thumbnail || '/placeholder.svg'}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 text-black hover:bg-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    再生
                  </Button>
                </div>
                <Badge className="absolute top-2 right-2 bg-black/50 text-white">
                  {video.duration}
                </Badge>
                <Badge
                  className={`absolute top-2 left-2 ${
                    video.status === '完成' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                  }`}
                >
                  {video.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2">{video.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Calendar className="w-4 h-4 mr-1" />
                {video.date}
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Download className="w-4 h-4 mr-1" />
                  ダウンロード
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="w-4 h-4 mr-1" />
                  シェア
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
