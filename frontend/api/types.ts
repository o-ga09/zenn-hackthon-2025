// ユーザー関連の型定義
export interface User {
  id: string
  firebase_id: string
  display_name: string
  name: string
  birth_day?: string
  gender?: string
  image_data?: string
  messaage?: string // APIのtypoをそのまま保持
  version: number
}

export interface UserInput {
  uid: string
  id: string
  name: string
  displayName: string
  image_data?: string
  birth_day?: string
  gender?: string
}

// フロントエンド内部での表現用
export interface UserInputFrontend {
  firebase_id: string
  name: string
  display_name: string
  image_data?: string
  birth_day?: string
  gender?: string
}

export interface UsersResponse {
  users: User[]
  total: number
  messaage?: string
  next_page_token?: string
}

// フォロー関連の型定義
export interface Follow {
  user_id: string
  follow_count: number
  follower_count: number
}

// ソーシャルアカウント関連の型定義
export interface SocialAccount {
  x_url: string
  instagram_url: string
  facebook_url: string
  tiktok_url: string
  youtube_url: string
}

// 旅行情報関連の型定義
export interface Travel {
  id: string
  userId: string
  title: string
  description: string
  startDate: string
  endDate: string
  sharedId: string
  thumbnail: string
  created_at: string
  updated_at: string
  version: number
}

export interface TravelInput {
  id?: string // サーバー側で生成される場合はオプショナル
  userId: string
  title: string
  description: string
  startDate: string
  endDate: string
  sharedId: string
  thumbnail: string
}

export interface TravelsResponse {
  travels: Travel[]
  total: number
  message?: string
  next_page_token?: string
}
