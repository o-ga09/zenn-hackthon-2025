import { Video, Users } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { User, Bell } from 'lucide-react'

export default function CommonHeader() {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-xl font-bold text-primary">
            Tavinikkiy
          </Link>

          {/* ナビゲーションリンク */}
          <nav className="hidden md:flex items-center space-x-4 ml-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              ダッシュボード
            </Link>
            <Link href="/videos" className="text-sm font-medium text-gray-700 hover:text-primary">
              マイ動画
            </Link>
            <Link
              href="/any-one"
              className="text-sm font-medium text-gray-700 hover:text-primary flex items-center"
            >
              <Users className="h-4 w-4 mr-1" />
              みんなの動画
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
