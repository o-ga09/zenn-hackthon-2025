import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiClient from './client'
import { User, UserInput, UsersResponse } from './types'

// キャッシュのキー
export const USERS_QUERY_KEY = ['users']
export const USER_QUERY_KEY = (userId: string) => ['users', userId]
export const FIREBASE_USER_QUERY_KEY = (firebaseId: string) => ['firebaseUsers', firebaseId]

/**
 * ユーザー一覧を取得するフック
 */
export const useGetUsers = () => {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: async (): Promise<UsersResponse> => {
      const response = await apiClient.get('/users')
      return response.data
    },
  })
}

/**
 * ユーザーをIDで取得するフック
 * @param userId ユーザーID
 */
export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: USER_QUERY_KEY(userId),
    queryFn: async (): Promise<User> => {
      const response = await apiClient.get(`/users/${userId}`)
      return response.data
    },
    // ユーザーIDが空の場合はクエリを無効化
    enabled: !!userId,
  })
}

/**
 * FirebaseのIDでユーザーを取得するフック
 * @param firebaseId FirebaseのユーザーID
 */
export const useGetUserByFirebaseId = (firebaseId: string) => {
  return useQuery({
    queryKey: FIREBASE_USER_QUERY_KEY(firebaseId),
    queryFn: async (): Promise<User> => {
      const response = await apiClient.get(`/firebaseUsers/${firebaseId}`)
      return response.data
    },
    // FirebaseIDが空の場合はクエリを無効化
    enabled: !!firebaseId,
  })
}

/**
 * 新規ユーザーを作成するフック
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: UserInput): Promise<User> => {
      const response = await apiClient.post('/users', userData)
      return response.data
    },
    // ミューテーション成功後にユーザー一覧のキャッシュを無効化
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
    },
  })
}

/**
 * ユーザーを更新するフック
 */
export const useUpdateUser = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: Partial<UserInput>): Promise<User> => {
      const response = await apiClient.put(`/users/${userId}`, userData)
      return response.data
    },
    // ミューテーション成功後に関連するキャッシュを無効化
    onSuccess: (data: User) => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY(userId) })
      queryClient.invalidateQueries({ queryKey: FIREBASE_USER_QUERY_KEY(data.firebase_id) })
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
    },
  })
}

/**
 * ユーザーを削除するフック
 */
export const useDeleteUser = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (version: number): Promise<void> => {
      await apiClient.delete(`/users/${userId}`, {
        params: { version },
      })
    },
    // ミューテーション成功後に関連するキャッシュを無効化
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY(userId) })
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
    },
  })
}
