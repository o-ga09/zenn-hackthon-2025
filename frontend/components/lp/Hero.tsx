import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Play, Sparkles, Video } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <Badge className="mb-6 bg-secondary/20 text-secondary-foreground border-secondary/30">
          <Sparkles className="w-4 h-4 mr-2" />
          AI搭載の新しい旅行体験
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
          旅の記録を、
          <br />
          <span className="text-primary">もっと簡単に</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          旅行の写真をアップロードするだけで、AIが自動的にエモーショナルな縦画面動画を生成。 YouTube
          ShortsやInstagramストーリーズで簡単にシェアできます。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
            <Play className="w-5 h-5 mr-2" />
            <Link href="/videos">無料で動画を作成</Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
            <Video className="w-5 h-5 mr-2" />
            <Link href="/any-one">デモを見る</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
