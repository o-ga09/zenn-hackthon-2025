'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { MapPin } from 'lucide-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TravelFormValues } from './form-schema'

export default function TravelInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TravelFormValues>()

  return (
    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>旅行情報</span>
        </CardTitle>
        <CardDescription>動画に含める旅行の詳細情報を入力してください</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="travel-title">旅行のタイトル *</Label>
            <Input id="travel-title" placeholder="例: 京都の桜旅行" {...register('travelTitle')} />
            {errors.travelTitle && (
              <p className="mt-1 text-sm text-red-500">{errors.travelTitle.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="travel-date">旅行日 *</Label>
            <Input id="travel-date" type="date" {...register('travelDate')} />
            {errors.travelDate && (
              <p className="mt-1 text-sm text-red-500">{errors.travelDate.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="travel-location">場所</Label>
            <Input
              id="travel-location"
              placeholder="例: 京都府京都市"
              {...register('travelLocation')}
            />
          </div>

          <div>
            <Label htmlFor="travel-description">旅行の説明</Label>
            <Textarea
              id="travel-description"
              placeholder="この旅行の思い出や特別な瞬間について教えてください..."
              rows={4}
              {...register('travelDescription')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
