'use client'

import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import './travel-detail-sheet.css'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Download, Share2, Play, Edit, X } from 'lucide-react'
import { Travel } from '@/api/types'
import { enhanceTravelData } from '@/utils/travel-utils'
import Image from 'next/image'

interface TravelDetailSheetProps {
  travel: Travel | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function TravelDetailSheet({
  travel,
  isOpen,
  onOpenChange,
}: TravelDetailSheetProps) {
  // 画面サイズに応じてシートの向きを調整（モバイルでは下から、デスクトップでは右から）
  const [sheetSide, setSheetSide] = React.useState<'bottom' | 'right'>('right')

  // クライアントサイドでのみ実行される画面サイズ検出
  React.useEffect(() => {
    // 初期ロード時に一度だけ実行
    const updateSheetSide = () => {
      const isMobile = window.innerWidth < 768
      setSheetSide(isMobile ? 'bottom' : 'right')
    }

    // 初期実行
    updateSheetSide()

    // リサイズイベントのリスナー設定
    const handleResize = () => {
      updateSheetSide()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!travel) return null

  // 期間の計算
  const calculateDuration = (startDate: string, endDate: string): number => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  }

  const duration = calculateDuration(travel.startDate, travel.endDate)

  // サムネイルなどのデータを強化
  const enhancedTravel = enhanceTravelData(travel)

  // デバッグ情報
  console.log(`Current sheet side: ${sheetSide}`)
  console.log(`Travel thumbnail: ${enhancedTravel.thumbnail}`)

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side={sheetSide}
        className={`w-full max-w-md overflow-y-auto ${
          sheetSide === 'bottom' ? 'p-6 pt-12 pb-8 mobile-sheet-content' : 'p-6'
        }`}
        style={{
          overflowY: 'auto',
          overscrollBehavior: 'contain',
        }}
      >
        <SheetHeader className="pb-4 space-y-2">
          <SheetTitle className="text-xl sm:text-2xl leading-tight">
            {enhancedTravel.title}
          </SheetTitle>
          <SheetDescription className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(enhancedTravel.startDate).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {duration > 1 &&
                ` 〜 ${new Date(enhancedTravel.endDate).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}`}
            </span>
          </SheetDescription>
          {duration > 1 && (
            <Badge variant="outline" className="mt-1 w-fit px-3 py-1">
              {duration}日間
            </Badge>
          )}
        </SheetHeader>

        {/* サムネイル画像 */}
        <div>
          <Image
            src={enhancedTravel.thumbnail || '/placeholder.webp'}
            alt={enhancedTravel.title}
            loading="eager"
            width={600}
            height={400}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 text-black hover:bg-white rounded-full w-12 h-12 p-0"
            >
              <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
            </Button>
          </div>
        </div>

        {/* 説明文 */}
        <div className="py-4 mb-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">旅行の説明</h3>
          <p className="text-sm whitespace-pre-line leading-relaxed">
            {enhancedTravel.description || '説明はありません'}
          </p>
        </div>

        {/* 詳細情報 */}
        <div className="py-4 mb-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">旅行情報</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-muted/40 p-3 rounded-md">
              <span className="text-xs text-muted-foreground block mb-1">開始日</span>
              <p className="font-medium">
                {new Date(enhancedTravel.startDate).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="bg-muted/40 p-3 rounded-md">
              <span className="text-xs text-muted-foreground block mb-1">終了日</span>
              <p className="font-medium">
                {new Date(enhancedTravel.endDate).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="col-span-2 bg-muted/40 p-3 rounded-md">
              <span className="text-xs text-muted-foreground block mb-1">共有ID</span>
              <p className="font-mono text-xs overflow-auto">{enhancedTravel.sharedId}</p>
            </div>
          </div>
        </div>

        {/* 作成・更新情報 */}
        <div className="py-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">メタデータ</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 rounded-md border border-muted/50">
              <span className="text-xs text-muted-foreground block mb-1">作成日</span>
              <p className="font-medium">
                {new Date(enhancedTravel.created_at).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="p-3 rounded-md border border-muted/50">
              <span className="text-xs text-muted-foreground block mb-1">更新日</span>
              <p className="font-medium">
                {new Date(enhancedTravel.updated_at).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        <SheetFooter className="flex-row gap-3 pt-6 pb-2 mt-4 border-t">
          <Button variant="outline" className="flex-1 gap-2 h-11">
            <Download className="w-4 h-4" />
            <span>ダウンロード</span>
          </Button>
          <Button variant="outline" className="flex-1 gap-2 h-11">
            <Share2 className="w-4 h-4" />
            <span>共有</span>
          </Button>
          <Button className="flex-1 gap-2 h-11">
            <Edit className="w-4 h-4" />
            <span>編集</span>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
