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
      <Card className="border-0 shadow-md bg-card/50 backdrop-blur-sm mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="動画を検索..." className="pl-10 h-10" />
            </div>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent h-10">
              <Filter className="w-4 h-4" />
              <span>フィルター</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Videos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {videos.map(video => (
          <div
            key={video.id}
            className="relative overflow-hidden group rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
              <img
                src={video.thumbnail || '/placeholder.webp'}
                alt={video.title}
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>

              {/* Content overlay (positioned at the bottom only) */}
              <div className="absolute bottom-0 left-0 right-0 p-2">
                {/* Top-right badge for duration */}
                <Badge className="absolute top-2 right-2 text-xs bg-black/60 text-white">
                  <Clock className="w-2.5 h-2.5 mr-0.5" />
                  {video.duration}
                </Badge>

                {/* Status badge (only shown for non-completed) */}
                {video.status !== '完成' && (
                  <Badge className="absolute top-2 left-2 text-xs bg-yellow-500/80 text-black">
                    {video.status}
                  </Badge>
                )}

                {/* Bottom content */}
                <div className="text-white">
                  <h3 className="font-medium text-base line-clamp-1">{video.title}</h3>
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {video.date}
                    </div>
                    {video.status === '完成' && (
                      <div className="text-xs text-white/80">♥ {video.likes}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 text-black hover:bg-white rounded-full w-10 h-10 p-0"
                >
                  <Play className="w-5 h-5" fill="currentColor" />
                </Button>
              </div>

              {/* Action buttons (visible on hover) - positioned at the top right */}
              <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="outline"
                  className="p-1 h-7 w-7 bg-black/40 hover:bg-black/60 text-white border-white/20 rounded-full"
                >
                  <Download className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="p-1 h-7 w-7 bg-black/40 hover:bg-black/60 text-white border-white/20 rounded-full"
                >
                  <Share2 className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="p-1 h-7 w-7 bg-black/40 hover:bg-black/60 text-white border-white/20 rounded-full hover:text-red-400"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          さらに読み込む
        </Button>
      </div>
    </>
  )
}
