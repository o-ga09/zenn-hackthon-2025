'use client'

import React from 'react'
import { useAuth } from '@/context/authContext'
import { useGetUserByFirebaseId, useCreateUser } from '@/api/userApi'

/**
 * 現在のユーザー情報を取得するフック
 * Firebase認証情報を使用してユーザー情報を取得または作成します
 */
export const useCurrentUser = () => {
  const { user: firebaseUser, loading: authLoading } = useAuth()
  const firebaseId = firebaseUser?.uid || ''

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
    refetch: refetchUser,
  } = useGetUserByFirebaseId(firebaseId)

  const { mutate: createUser, isPending: isCreating, error: createError } = useCreateUser()

  // Firebase認証後、ユーザーが取得できない場合は新規作成
  React.useEffect(() => {
    if (!authLoading && firebaseUser && userError) {
      // ユーザーが見つからない場合は新規作成
      createUser({
        firebase_id: firebaseUser.uid || '',
        display_name: firebaseUser.displayname || 'ユーザー',
        name: firebaseUser.displayname || 'ユーザー',
      })
    }
  }, [authLoading, firebaseUser, userError, createUser])

  return {
    user,
    isLoading: authLoading || isUserLoading || isCreating,
    error: userError || createError,
    refetchUser,
  }
}
