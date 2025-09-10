import { Heart, Share2, Star, Camera } from 'lucide-react'
import React from 'react'

export default function Benefit() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <div>
          <h3 className="text-3xl font-bold text-foreground mb-6">なぜTravelMomentsを選ぶのか？</h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">エモーショナルな体験</h4>
                <p className="text-muted-foreground">
                  AIが写真から感情を読み取り、その瞬間にぴったりの音楽とエフェクトを選択します。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Share2 className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">簡単シェア</h4>
                <p className="text-muted-foreground">
                  YouTube ShortsやInstagramストーリーズに最適化された縦画面動画を生成します。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Star className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">プロ品質</h4>
                <p className="text-muted-foreground">
                  高度なAI技術により、プロが作ったような高品質な動画を自動生成します。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">動画プレビュー</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
