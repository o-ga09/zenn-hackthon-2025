'use client'
import React, { useState, useRef, useEffect } from 'react'
import ShortsVideoCard from './ShortsVideoCard'
import { anyOneVideos } from '@/mock/mock'

export default function ShortsViewer() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // ビデオのインデックスを変更する関数
  const handleScroll = () => {
    if (!containerRef.current) return

    const container = containerRef.current
    const containerHeight = container.clientHeight
    const scrollTop = container.scrollTop

    // スクロール位置に基づいて現在のビデオインデックスを計算
    const newIndex = Math.round(scrollTop / containerHeight)

    if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < anyOneVideos.length) {
      setCurrentVideoIndex(newIndex)
    }
  }

  // スクロールイベントリスナーを設定
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll)
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [currentVideoIndex])

  return (
    <div className="w-full flex justify-center">
      <div
        ref={containerRef}
        className="h-[calc(100vh-64px)] w-full md:w-[400px] overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {anyOneVideos.map((video, index) => (
          <div key={video.id} className="h-[calc(100vh-64px)] snap-start">
            <ShortsVideoCard video={video} isActive={index === currentVideoIndex} />
          </div>
        ))}
      </div>
    </div>
  )
}
