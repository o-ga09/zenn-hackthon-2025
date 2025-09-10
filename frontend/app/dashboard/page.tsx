import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  Plus,
  Upload,
  Play,
  Download,
  Share2,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // サンプルデータ
  const recentVideos = [
    {
      id: 1,
      title: "京都旅行 2024",
      date: "2024年3月15日",
      thumbnail: "/kyoto-travel-video-thumbnail.jpg",
      duration: "1:30",
      status: "完成",
    },
    {
      id: 2,
      title: "沖縄バケーション",
      date: "2024年2月20日",
      thumbnail: "/okinawa-beach-video-thumbnail.jpg",
      duration: "2:15",
      status: "完成",
    },
    {
      id: 3,
      title: "北海道スキー旅行",
      date: "2024年1月10日",
      thumbnail: "/hokkaido-ski-video-thumbnail.jpg",
      duration: "1:45",
      status: "処理中",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              TravelMoments
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground">
              プロフィール
            </Button>
            <Button variant="outline">ログアウト</Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            ダッシュボード
          </h1>
          <p className="text-xl text-muted-foreground">
            あなたの旅行動画を管理しましょう
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">新しい動画を作成</CardTitle>
                  <CardDescription>
                    写真をアップロードして新しい旅行動画を作成
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/upload">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Upload className="w-4 h-4 mr-2" />
                  写真をアップロード
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">統計情報</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">
                    作成した動画
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">156</div>
                  <div className="text-sm text-muted-foreground">
                    アップロード写真
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Videos */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">最近の動画</h2>
            <Button variant="outline">すべて表示</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentVideos.map((video) => (
              <Card
                key={video.id}
                className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow"
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-[9/16] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg overflow-hidden">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 text-black hover:bg-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        再生
                      </Button>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/50 text-white">
                      {video.duration}
                    </Badge>
                    <Badge
                      className={`absolute top-2 left-2 ${
                        video.status === "完成"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {video.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{video.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {video.date}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      ダウンロード
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      シェア
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
