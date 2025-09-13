import { Users } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { useAuth } from '@/context/authContext'

export default function CommonHeader() {
  const { user } = useAuth()
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
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" className="border rounded px-4 py-2 hover:bg-gray-50">
                  ダッシュボードへ
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" className="flex items-center gap-2 px-3 py-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="ユーザーアイコン"
                      className="w-8 h-8 rounded-full border"
                    />
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                      {user.displayname ? user.displayname.charAt(0) : 'U'}
                    </span>
                  )}
                  <span className="hidden md:inline text-sm font-medium">{user.displayname}</span>
                </Button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  )
}
