---
inclusion: fileMatch
fileMatchPattern: ["**/*.go", "**/go.mod", "**/*_test.go"]
---

# バックエンドアーキテクチャとコーディング規約

## アプリケーション概要

- Go 言語で実装される REST API サーバー
- Google Cloud Run でのデプロイメントを前提とした設計
- マイクロサービスアーキテクチャを採用

## ディレクトリ構成

Go Standard Project Layout に厳密に従う：

```
backend/
├── cmd/           # メインアプリケーション
├── internal/      # プライベートアプリケーションコード
│   ├── handler/   # HTTPハンドラー
│   ├── service/   # ビジネスロジック
│   ├── repository/ # データアクセス層
│   └── middleware/ # ミドルウェア
├── pkg/           # 外部アプリケーションで使用可能なライブラリコード
└── api/           # OpenAPI/Swagger仕様、JSONスキーマファイル
```

## テスト戦略

### テーブルドリブンテスト

- 全てのテストはテーブルドリブン形式で実装
- テストケースは構造体のスライスで定義
- サブテストを使用してケースごとに実行

```go
func TestFunction(t *testing.T) {
    tests := []struct {
        name     string
        input    InputType
        expected ExpectedType
        wantErr  bool
    }{
        // テストケース
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            // テスト実装
        })
    }
}
```

## セキュリティ

### 認証・認可

- JWT トークンベースの認証を実装
- ミドルウェアパターンで認証・認可を処理
- CORS 設定を適切に構成
- 入力値検証を必須とする

### セキュリティヘッダー

- セキュリティヘッダーをミドルウェアで設定
- レート制限を実装

## 開発手法（TDD）

### t_wada TDD 手法の厳格な適用

- **Red-Green-Refactor**サイクルを厳守
- **テストファースト**: 実装前に必ずテストを書く
- **小さなステップ**: 一度に大きな機能を実装せず、小さな単位で進める

### テストの三原則

1. テストは失敗する理由が明確であること
2. テストは独立していること
3. テストは高速に実行できること

### 実装順序

1. 失敗するテストを書く（Red）
2. テストを通す最小限のコードを書く（Green）
3. コードを改善する（Refactor）

## コーディング規約

### Go Style Guide 準拠

- `gofmt`、`goimports`を使用
- `golangci-lint`でリンティング
- エラーハンドリングを適切に行う
- インターフェースは小さく保つ
- パッケージ名は短く、明確にする

### 命名規則

- 関数名：キャメルケース
- 定数：UPPER_SNAKE_CASE
- パッケージ名：小文字、単語区切りなし

### エラーハンドリング

- カスタムエラー型を定義
- エラーラッピングを適切に使用
- ログレベルを適切に設定

## パフォーマンス

### データベース最適化

- 過剰な Preload を避ける
- N+1 問題を防ぐ
- インデックスを適切に設定

### メモリ管理

- Nil Pointer Error を防ぐ
- ゴルーチンリークを避ける
- コンテキストを適切に使用

## 監視・トレース

### OpenTelemetry

- 分散トレーシングを実装
- メトリクス収集を設定
- カスタムスパンを適切に作成

### ログ設定

- Google Cloud Logging 形式に準拠
- 構造化ログを使用
- ログレベルを環境変数で制御

```go
// ログ形式例
{
  "severity": "INFO",
  "message": "Request processed",
  "trace": "trace-id",
  "span": "span-id"
}
```

## デプロイメント

### Cloud Run 対応

- ヘルスチェックエンドポイントを実装
- グレースフルシャットダウンを実装
- 環境変数での設定管理
