'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Play, Sparkles, Video } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="container mx-auto px-4 min-h-screen flex items-center justify-center text-center pt-0 pb-20 -mt-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-16"
        >
          <Badge className="py-2 px-4 text-base md:text-lg bg-primary text-white font-medium border-primary hover:bg-primary/90 transition-colors shadow-md">
            <Sparkles className="w-5 h-5 mr-2 text-white" />
            AI搭載の新しい旅行体験
          </Badge>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="absolute -top-6 md:-top-8 right-[calc(50%-100px)] md:right-[calc(50%-140px)] bg-primary text-white px-5 py-2 rounded-xl text-lg md:text-xl font-bold shadow-lg"
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 5 }}
            transition={{ duration: 0.5, delay: 1.2, type: 'spring', bounce: 0.4 }}
          >
            <div className="absolute -bottom-3 right-5 h-4 w-4 bg-primary rotate-45"></div>
            動画で
          </motion.div>
          旅の記録を、
          <br />
          <motion.span
            className="text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 200 }}
          >
            もっと簡単に
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          旅行の写真をアップロードするだけで、AIが自動的にエモーショナルな縦画面動画を生成。 YouTube
          ShortsやInstagramストーリーズで簡単にシェアできます。
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              <Play className="w-5 h-5 mr-2" />
              <Link href="/videos">無料で動画を作成</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
              <Video className="w-5 h-5 mr-2" />
              <Link href="/any-one">デモを見る</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
