import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { videos } from '@/mock/mock'
import {
  Search,
  Filter,
  Play,
  Badge,
  Clock,
  Calendar,
  Download,
  Share2,
  Edit,
  Trash2,
} from 'lucide-react'
import React from 'react'

export default function Library() {
  return (
    <>
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="動画を検索..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Filter className="w-4 h-4" />
              <span>フィルター</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Videos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
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
                  <Clock className="w-3 h-3 mr-1" />
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
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Calendar className="w-4 h-4 mr-1" />
                {video.date}
              </div>

              {video.status === '完成' && (
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{video.views} 回再生</span>
                  <span>♥ {video.likes}</span>
                </div>
              )}

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Download className="w-4 h-4 mr-1" />
                  DL
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="w-4 h-4 mr-1" />
                  シェア
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Edit className="w-4 h-4 mr-1" />
                  編集
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-destructive bg-transparent"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          さらに読み込む
        </Button>
      </div>
    </>
  )
}
