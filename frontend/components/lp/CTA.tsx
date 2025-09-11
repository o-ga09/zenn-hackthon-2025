import { Sparkles } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="bg-gradient-to-br from-primary/90 via-primary/70 to-primary/40 rounded-3xl p-12 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-[2px]"></div>
        <div className="relative z-10">
          <h3 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">今すぐ始めよう</h3>
          <p className="text-xl mb-8 text-white/95 max-w-2xl mx-auto drop-shadow-md">
            あなたの旅行の思い出を、AIの力で特別な動画に変えませんか？ 無料で始められます。
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 shadow-lg transition-all hover:scale-105"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            <Link href="/videos">無料で動画を作成する</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
