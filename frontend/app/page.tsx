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
  Camera,
  Video,
  Sparkles,
  Upload,
  Edit,
  Share2,
  Play,
  Heart,
  Star,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              TravelMoments
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground">
              ログイン
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              無料で始める
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-secondary/20 text-secondary-foreground border-secondary/30">
            <Sparkles className="w-4 h-4 mr-2" />
            AI搭載の新しい旅行体験
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            旅の記録を、
            <br />
            <span className="text-primary">もっと簡単に</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            旅行の写真をアップロードするだけで、AIが自動的にエモーショナルな縦画面動画を生成。
            YouTube ShortsやInstagramストーリーズで簡単にシェアできます。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            >
              <Play className="w-5 h-5 mr-2" />
              無料で動画を作成
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent"
            >
              <Video className="w-5 h-5 mr-2" />
              デモを見る
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            3つのステップで完成
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            複雑な編集作業は不要。シンプルな操作で、プロ品質の動画が完成します。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">写真をアップロード</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                旅行の思い出の写真を選んでアップロード。複数枚でも一度に処理できます。
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl">旅行情報を入力</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                旅行のタイトルと日付を入力。AIがこの情報を使って動画をパーソナライズします。
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">AI動画生成</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                AIが自動的にエモーショナルな動画を生成。音楽やエフェクトも自動で追加されます。
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              なぜTravelMomentsを選ぶのか？
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    エモーショナルな体験
                  </h4>
                  <p className="text-muted-foreground">
                    AIが写真から感情を読み取り、その瞬間にぴったりの音楽とエフェクトを選択します。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Share2 className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    簡単シェア
                  </h4>
                  <p className="text-muted-foreground">
                    YouTube
                    ShortsやInstagramストーリーズに最適化された縦画面動画を生成します。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Star className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    プロ品質
                  </h4>
                  <p className="text-muted-foreground">
                    高度なAI技術により、プロが作ったような高品質な動画を自動生成します。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">動画プレビュー</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
              今すぐ始めよう
            </h3>
            <p className="text-xl mb-8 text-white/95 max-w-2xl mx-auto drop-shadow-md">
              あなたの旅行の思い出を、AIの力で特別な動画に変えませんか？
              無料で始められます。
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              無料で動画を作成する
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
              <Video className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">
              TravelMoments
            </span>
          </div>
          <p className="text-muted-foreground mb-4">
            旅の記録を、AIでもっと簡単に、もっとエモく。
          </p>
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              プライバシーポリシー
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              利用規約
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              お問い合わせ
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
