import { Heart, Share2, Star, Camera } from 'lucide-react'
import React from 'react'

export default function Benefit() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
        <div>
          <h3 className="text-3xl font-bold text-foreground mb-6">なぜTravelMomentsを選ぶのか？</h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                <Heart className="w-4 h-4 text-red-500" strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">エモーショナルな体験</h4>
                <p className="text-muted-foreground">
                  AIが写真から感情を読み取り、その瞬間にぴったりの音楽とエフェクトを選択します。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                <Share2 className="w-4 h-4 text-blue-500" strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">簡単シェア</h4>
                <p className="text-muted-foreground">
                  YouTube ShortsやInstagramストーリーズに最適化された縦画面動画を生成します。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                <Star className="w-4 h-4 text-amber-500" strokeWidth={2} />
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

        <div className="relative flex items-center justify-center">
          <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center max-w-[280px] w-full mx-auto">
            <div className="text-center">
              <Camera className="w-12 h-12 text-purple-500 mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-muted-foreground text-sm">動画プレビュー</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
