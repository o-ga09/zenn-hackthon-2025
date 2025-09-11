import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { recentVideos } from '@/mock/mock'
import { Play, Calendar, Download, Share2, Clock } from 'lucide-react'
import React from 'react'

export default function RecentVideo() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">最近の動画</h2>
        <Button variant="outline" size="sm">
          すべて表示
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
        {recentVideos.map(video => (
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
                  <div className="flex items-center text-xs text-white/80">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {video.date}
                    </div>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
