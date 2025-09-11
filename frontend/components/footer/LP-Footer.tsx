import { Video } from 'lucide-react'
import React from 'react'

export default function LPFooter() {
  return (
    <footer className="container mx-auto px-4 py-8 sm:py-12 border-t border-border">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
            <Video className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">TravelMoments</span>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground mb-4">
          旅の記録を、AIでもっと簡単に、もっとエモく。
        </p>
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-3 sm:space-y-0 text-sm text-muted-foreground">
          <a href="/privacy-policy" className="hover:text-foreground transition-colors">
            プライバシーポリシー
          </a>
          <a href="/terms-of-service" className="hover:text-foreground transition-colors">
            利用規約
          </a>
          <a href="/contact" className="hover:text-foreground transition-colors">
            お問い合わせ
          </a>
        </div>
      </div>
    </footer>
  )
}
