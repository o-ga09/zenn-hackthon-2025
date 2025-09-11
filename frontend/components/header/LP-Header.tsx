import { Menu, Video, X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function LPHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="container mx-auto px-4 py-6 relative z-50">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-primary-foreground" />
          </div>
          <Link href="/" className="text-lg font-bold text-foreground">
            <span className="text-xl font-bold text-foreground">TravelMoments</span>
          </Link>
        </div>

        {/* デスクトップメニュー */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-foreground">
            <Link href="/login">ログイン</Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Link href="/signup">無料で始める</Link>
          </Button>
        </div>

        {/* モバイルメニューボタン */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </nav>

      {/* モバイルメニュー */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background z-40 md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* 閉じるボタン - 画面右上に配置 */}
            <button
              className="absolute top-6 right-4 p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
              aria-label="メニューを閉じる"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>

            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-medium"
              >
                ログイン
              </Link>
              <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  無料で始める
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
