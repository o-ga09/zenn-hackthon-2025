---
inclusion: fileMatch
fileMatchPattern:
  [
    "frontend/**/*.ts",
    "frontend/**/*.tsx",
    "frontend/**/*.js",
    "frontend/**/*.jsx",
  ]
---

# フロントエンドアーキテクチャ規約

## 技術スタック

- **フレームワーク**: React 18 + TypeScript + Vite
- **状態管理**: TanStack Query v5 (サーバー状態) + useState/useReducer (ローカル状態)
- **スタイリング**: TailwindCSS v3 (モバイルファースト)
- **API**: Orbal 自動生成クライアント (`src/utils/lib/api`)
- **テスト**: Jest + React Testing Library
- **計装**: OpenTelemetry

## ディレクトリ構成

```
src/
├── components/
│   ├── ui/           # 基本UIコンポーネント (Button, Input, Modal等)
│   └── layout/       # レイアウトコンポーネント (Header, Footer, Sidebar)
├── pages/            # ページコンポーネント (React Router)
├── hooks/            # カスタムフック (useQuery, useMutation等)
├── utils/
│   ├── lib/
│   │   └── api/      # Orbal自動生成APIクライアント
│   └── helpers/      # ユーティリティ関数
├── types/            # TypeScript型定義
└── __tests__/        # テストファイル (ディレクトリ構造を反映)
```

## コンポーネント設計原則

- **単一責任**: 1 つのコンポーネントは 1 つの責任のみ
- **Props 型定義**: 必須。interface 使用、デフォルト値設定
- **レイアウトシフト防止**: 固定サイズ指定、skeleton UI 使用

## スタイリング規約

### TailwindCSS 使用ルール

- **モバイルファースト必須**: デフォルト = モバイル、`sm:` `md:` `lg:` `xl:` で拡張
- **カスタム CSS 禁止**: Tailwind ユーティリティクラスのみ使用
- **タッチ領域**: ボタン・リンクは最小 `h-11 w-11` (44px) 確保

### デザインシステム

```typescript
// 使用必須のクラス定義
const typography = {
  h1: "text-2xl font-bold",
  h2: "text-xl font-semibold",
  body: "text-base",
  caption: "text-xs text-gray-600",
};

const colors = {
  primary: "blue-600",
  secondary: "gray-600",
  success: "green-600",
  warning: "yellow-600",
  error: "red-600",
};
```

## 命名規則

| 対象           | 形式                        | 例                        |
| -------------- | --------------------------- | ------------------------- |
| ファイル名     | PascalCase                  | `UserProfile.tsx`         |
| コンポーネント | PascalCase                  | `UserProfile`             |
| 関数・変数     | camelCase                   | `userName`, `handleClick` |
| 定数           | UPPER_SNAKE_CASE            | `API_BASE_URL`            |
| カスタムフック | use + PascalCase            | `useUserData`             |
| 型定義         | PascalCase + Type/Interface | `UserType`, `ApiResponse` |

## TDD 開発フロー

### 必須サイクル: Red-Green-Refactor

1. **Red**: 失敗するテストを先に書く
2. **Green**: テストを通す最小限のコードを実装
3. **Refactor**: 動作を保ったままコードを改善

### テスト戦略

- **ツール**: Jest + React Testing Library
- **対象**: ユーザー操作・API 連携・ビジネスロジック
- **カバレッジ**: 80%以上 (重要機能は 100%)
- **原則**: 独立性・高速実行・明確な失敗理由

## 状態管理パターン

### 必須ルール

- **サーバー状態**: TanStack Query v5 のみ使用
- **ローカル状態**: useState (一時的な状態のみ)
- **グローバル状態**: Zustand または Context (最小限)
- **API**: Orbal 自動生成 (`src/utils/lib/api`)

```typescript
// 推奨パターン
const { data, isLoading, error } = useQuery({
  queryKey: ["users", userId],
  queryFn: () => api.getUser(userId),
});
```

## パフォーマンス要件

### 必須最適化

- **useEffect**: 依存配列を正確に指定 (無限ループ防止)
- **型安全性**: `any`型禁止、厳密な型定義
- **メモ化**: `useMemo`/`useCallback`で不要な再レンダリング防止
- **遅延読み込み**: `React.lazy`でコード分割

### モバイル最適化

- **軽量実装**: バンドルサイズ最小化
- **タッチ操作**: スワイプ・ピンチ・タップ対応
- **アクセシビリティ**: セマンティック HTML + ARIA 属性

## 計装・監視

- **OpenTelemetry**: 全コンポーネントでトレース実装
- **エラー境界**: React Error Boundary で例外処理
- **ログ**: 構造化ログでバックエンド連携
