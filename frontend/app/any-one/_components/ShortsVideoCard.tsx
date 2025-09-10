import React, { useRef, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Share2, User } from 'lucide-react'

interface Video {
  id: number
  title: string
  description: string
  date: string
  duration: string
  videoUrl: string
  thumbnail: string
  userName: string
  userAvatar?: string
  likes: number
  comments: number
}

interface ShortsVideoCardProps {
  video: Video
  isActive: boolean
}

export default function ShortsVideoCard({ video, isActive }: ShortsVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // 表示されたらビデオを再生、非表示になったら一時停止
  useEffect(() => {
    if (!videoRef.current) return

    if (isActive) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(error => {
        console.error('自動再生エラー:', error)
      })
    } else {
      videoRef.current.pause()
    }
  }, [isActive])

  return (
    <div className="relative h-full w-full bg-black flex items-center justify-center">
      {/* ビデオ */}
      <div className="relative w-full h-full">
        {isActive ? (
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="w-full h-full md:object-contain object-cover"
            loop
            playsInline
            muted // 必要に応じてミュートを解除
            poster={video.thumbnail}
          />
        ) : (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full md:object-contain object-cover"
          />
        )}

        {/* オーバーレイグラデーション */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
      </div>

      {/* 動画情報 - 下部 */}
      <div className="absolute bottom-8 left-4 right-16 md:right-4 text-white z-10">
        <h3 className="text-xl font-bold mb-2">{video.title}</h3>
        <p className="text-sm mb-3 line-clamp-2">{video.description}</p>

        {/* ユーザー情報 */}
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center overflow-hidden mr-2">
            {video.userAvatar ? (
              <img
                src={video.userAvatar}
                alt={video.userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-white" />
            )}
          </div>
          <span className="font-medium">{video.userName}</span>
        </div>
      </div>

      {/* アクションボタン - 右側 */}
      <div className="absolute right-4 bottom-40 md:bottom-32 flex flex-col items-center gap-6">
        {/* ボタン位置を調整 */}
        <div className="flex flex-col items-center">
          <Button
            size="sm"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-black/30 text-white p-0"
          >
            <Heart className="h-7 w-7" />
          </Button>
          <span className="text-white text-xs mt-1">{video.likes}</span>
        </div>

        <div className="flex flex-col items-center">
          <Button
            size="sm"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-black/30 text-white p-0"
          >
            <MessageCircle className="h-7 w-7" />
          </Button>
          <span className="text-white text-xs mt-1">{video.comments}</span>
        </div>

        <div className="flex flex-col items-center">
          <Button
            size="sm"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-black/30 text-white p-0"
          >
            <Share2 className="h-7 w-7" />
          </Button>
          <span className="text-white text-xs mt-1">共有</span>
        </div>
      </div>

      {/* 動画時間バッジ - 右上 */}
      <Badge className="absolute top-4 right-4 bg-black/60 text-white">{video.duration}</Badge>
    </div>
  )
}
