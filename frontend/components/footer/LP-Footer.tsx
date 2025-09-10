import { Video } from 'lucide-react'
import React from 'react'

export default function LPFooter() {
  return (
    <footer className="container mx-auto px-4 py-12 border-t border-border">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
            <Video className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">TravelMoments</span>
        </div>
        <p className="text-muted-foreground mb-4">旅の記録を、AIでもっと簡単に、もっとエモく。</p>
        <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            プライバシーポリシー
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            利用規約
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            お問い合わせ
          </a>
        </div>
      </div>
    </footer>
  )
}
