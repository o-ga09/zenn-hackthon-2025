import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Video,
  Search,
  Filter,
  Play,
  Download,
  Share2,
  Edit,
  Trash2,
  Calendar,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function VideosPage() {
  // サンプルデータ
  const videos = [
    {
      id: 1,
      title: "京都旅行 2024",
      date: "2024年3月15日",
      thumbnail: "/kyoto-travel-video-thumbnail.jpg",
      duration: "1:30",
      status: "完成",
      views: 245,
      likes: 18,
    },
    {
      id: 2,
      title: "沖縄バケーション",
      date: "2024年2月20日",
      thumbnail: "/okinawa-beach-video-thumbnail.jpg",
      duration: "2:15",
      status: "完成",
      views: 189,
      likes: 24,
    },
    {
      id: 3,
      title: "北海道スキー旅行",
      date: "2024年1月10日",
      thumbnail: "/hokkaido-ski-video-thumbnail.jpg",
      duration: "1:45",
      status: "処理中",
      views: 0,
      likes: 0,
    },
    {
      id: 4,
      title: "東京グルメツアー",
      date: "2023年12月5日",
      thumbnail: "/tokyo-food-tour-video-thumbnail.jpg",
      duration: "2:30",
      status: "完成",
      views: 312,
      likes: 35,
    },
    {
      id: 5,
      title: "大阪城と桜",
      date: "2023年11月18日",
      thumbnail: "/osaka-castle-cherry-blossoms-video-thumbnail.jpg",
      duration: "1:20",
      status: "完成",
      views: 156,
      likes: 12,
    },
    {
      id: 6,
      title: "富士山登山",
      date: "2023年10月22日",
      thumbnail: "/mount-fuji-climbing-video-thumbnail.jpg",
      duration: "3:00",
      status: "完成",
      views: 428,
      likes: 67,
    },
  ];

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
            <Link href="/upload">
              <Button className="bg-primary hover:bg-primary/90">
                新しい動画を作成
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            動画ライブラリ
          </h1>
          <p className="text-xl text-muted-foreground">
            あなたが作成したすべての旅行動画
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="動画を検索..." className="pl-10" />
              </div>
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-transparent"
              >
                <Filter className="w-4 h-4" />
                <span>フィルター</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
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
                    <Clock className="w-3 h-3 mr-1" />
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
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  {video.date}
                </div>

                {video.status === "完成" && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{video.views} 回再生</span>
                    <span>♥ {video.likes}</span>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    DL
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    シェア
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    編集
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            さらに読み込む
          </Button>
        </div>
      </main>
    </div>
  );
}
