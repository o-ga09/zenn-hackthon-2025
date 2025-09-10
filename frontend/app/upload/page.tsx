"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Video,
  Upload,
  X,
  MapPin,
  Camera,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [travelTitle, setTravelTitle] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelLocation, setTravelLocation] = useState("");
  const [travelDescription, setTravelDescription] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // ここで動画生成処理を開始
    console.log("[v0] Starting video generation with:", {
      files: uploadedFiles.length,
      title: travelTitle,
      date: travelDate,
      location: travelLocation,
      description: travelDescription,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              TravelMoments
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-foreground">
                ダッシュボードに戻る
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            新しい動画を作成
          </h1>
          <p className="text-xl text-muted-foreground">
            写真と旅行情報をアップロードして、AIが素敵な動画を作成します
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Photo Upload Section */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>写真をアップロード</span>
              </CardTitle>
              <CardDescription>
                旅行の思い出の写真を選択してください（複数選択可能）
              </CardDescription>
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
                    <Button
                      variant="outline"
                      className="cursor-pointer bg-transparent"
                    >
                      写真を選択
                    </Button>
                  </Label>
                </div>

                {/* Uploaded Files Preview */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">
                      アップロード済み写真 ({uploadedFiles.length}枚)
                    </h4>
                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={
                              URL.createObjectURL(file) || "/placeholder.svg"
                            }
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
            </CardContent>
          </Card>

          {/* Travel Information Section */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>旅行情報</span>
              </CardTitle>
              <CardDescription>
                動画に含める旅行の詳細情報を入力してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="travel-title">旅行のタイトル *</Label>
                  <Input
                    id="travel-title"
                    placeholder="例: 京都の桜旅行"
                    value={travelTitle}
                    onChange={(e) => setTravelTitle(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="travel-date">旅行日 *</Label>
                  <Input
                    id="travel-date"
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="travel-location">場所</Label>
                  <Input
                    id="travel-location"
                    placeholder="例: 京都府京都市"
                    value={travelLocation}
                    onChange={(e) => setTravelLocation(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="travel-description">旅行の説明</Label>
                  <Textarea
                    id="travel-description"
                    placeholder="この旅行の思い出や特別な瞬間について教えてください..."
                    value={travelDescription}
                    onChange={(e) => setTravelDescription(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generate Button */}
        <div className="mt-8 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-primary to-secondary p-6 text-white">
            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-2">動画生成の準備完了！</h3>
              <p className="opacity-90">
                AIが{uploadedFiles.length}枚の写真から素敵な動画を作成します
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
              onClick={handleSubmit}
              disabled={
                uploadedFiles.length === 0 || !travelTitle || !travelDate
              }
            >
              <Sparkles className="w-5 h-5 mr-2" />
              AI動画生成を開始
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
