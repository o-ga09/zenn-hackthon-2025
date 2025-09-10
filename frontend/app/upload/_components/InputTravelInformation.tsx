import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { Camera, Upload, MapPin } from 'lucide-react'
import React, { useState } from 'react'
import GenerateVideo from './GenerateVideo'

export default function InputTravelInformation() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [travelTitle, setTravelTitle] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [travelLocation, setTravelLocation] = useState('')
  const [travelDescription, setTravelDescription] = useState('')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Photo Upload Section */}
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
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  ここに写真をドラッグ&ドロップするか、クリックして選択
                </p>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer bg-transparent">
                    写真を選択
                  </Button>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel Information Section */}
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
                <Input
                  id="travel-title"
                  placeholder="例: 京都の桜旅行"
                  value={travelTitle}
                  onChange={e => setTravelTitle(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="travel-date">旅行日 *</Label>
                <Input
                  id="travel-date"
                  type="date"
                  value={travelDate}
                  onChange={e => setTravelDate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="travel-location">場所</Label>
                <Input
                  id="travel-location"
                  placeholder="例: 京都府京都市"
                  value={travelLocation}
                  onChange={e => setTravelLocation(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="travel-description">旅行の説明</Label>
                <Textarea
                  id="travel-description"
                  placeholder="この旅行の思い出や特別な瞬間について教えてください..."
                  value={travelDescription}
                  onChange={e => setTravelDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <GenerateVideo
          uploadedFiles={uploadedFiles}
          travelTitle={travelTitle}
          travelDate={travelDate}
        />
      </div>
    </>
  )
}
