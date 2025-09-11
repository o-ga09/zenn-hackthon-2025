import { Video } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function LPHeader() {
  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-primary-foreground" />
          </div>
          <Link href="/" className="text-lg font-bold text-foreground">
            <span className="text-xl font-bold text-foreground">TravelMoments</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-foreground">
            <Link href="/login">ログイン</Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Link href="/signup">無料で始める</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
