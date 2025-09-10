'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Camera, Upload } from 'lucide-react'
import React, { useState, useRef } from 'react'
import { X } from 'lucide-react'
import { useUploadForm } from './UploadFormContext'

export default function PhotoUpload() {
  const { uploadedFiles, addFiles, removeFile } = useUploadForm()
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      addFiles(files)
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const imageFiles = files.filter(file => file.type.startsWith('image/'))
      if (imageFiles.length > 0) {
        addFiles(imageFiles)
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>写真をアップロード</span>
          </CardTitle>
          <CardDescription>旅行の思い出の写真を選択してください（複数選択可能）</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleButtonClick}
            >
              <Upload
                className={`w-12 h-12 mx-auto mb-4 ${
                  isDragging ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <p className="text-muted-foreground mb-4">
                ここに写真をドラッグ&ドロップするか、クリックして選択
              </p>
              <Input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button variant="outline" className="cursor-pointer bg-transparent">
                写真を選択
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold">アップロード済み写真 ({uploadedFiles.length}枚)</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
