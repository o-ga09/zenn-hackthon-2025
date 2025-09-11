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
  firebase_id: string
  display_name: string
  name: string
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
