import axios from 'axios'
import { getAuth } from 'firebase/auth'

// Axiosインスタンスを作成
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// リクエストインターセプターでFirebaseの認証トークンをヘッダーに追加
apiClient.interceptors.request.use(async config => {
  try {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  } catch (error) {
    console.error('認証トークン取得エラー:', error)
    return config
  }
})

export default apiClient
