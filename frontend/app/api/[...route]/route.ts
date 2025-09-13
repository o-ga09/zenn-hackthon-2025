import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { prisma } from '../../../schemes/prisma/client'
import { ulid } from 'ulid'

export const runtime = 'nodejs'

// API ルーターの作成
const app = new Hono().basePath('/api')

// レスポンス形式を統一するミドルウェア
app.use('*', async (c, next) => {
  await next()
  // レスポンスが既に送信されている場合は処理しない
  if (c.res.headers.get('content-type')?.includes('application/json')) {
    try {
      // レスポンスボディを取得
      const originalBody = await c.res.json()
      // エラーレスポンスの場合はそのまま
      if (originalBody.error || originalBody.success === false) {
        return
      }
      // 成功レスポンスの場合は形式を統一
      const newResponse = {
        success: true,
        ...originalBody,
      }
      // 新しいレスポンスを設定
      c.res = new Response(JSON.stringify(newResponse), {
        headers: {
          'content-type': 'application/json',
        },
        status: c.res.status,
      })
    } catch (e) {
      // レスポンスの変換に失敗した場合は元のレスポンスを使用
      console.error('Failed to transform response', e)
    }
  }
})

// エラーハンドリングミドルウェア
app.onError((err, c) => {
  console.error(`${err}`)

  // ZodErrorの場合は特別に処理する
  if (err.name === 'ZodError') {
    try {
      // エラーメッセージがJSON文字列の場合はパースする
      const parsedErrors = JSON.parse(err.message)
      // 人間が読みやすいフォーマットに変換
      const formattedErrors = parsedErrors.map((error: any) => {
        // フィールド名を取得
        const field = error.path.join('.')
        // エラーメッセージを生成
        let message = ''

        switch (error.code) {
          case 'invalid_type':
            message = `${field}は${error.expected}型である必要があります`
            break
          case 'required':
            message = `${field}は必須項目です`
            break
          case 'too_small':
            message = `${field}は${error.minimum}文字以上である必要があります`
            break
          case 'too_big':
            message = `${field}は${error.maximum}文字以下である必要があります`
            break
          default:
            message = error.message || `${field}が不正です`
        }

        return {
          field,
          code: error.code,
          message,
        }
      })

      return c.json(
        {
          success: false,
          error: {
            name: 'ValidationError',
            fields: formattedErrors,
          },
        },
        400
      )
    } catch (parseError) {
      // JSONパースに失敗した場合や想定外のフォーマットの場合
      return c.json(
        {
          success: false,
          error: {
            name: 'ValidationError',
            message: 'バリデーションエラーが発生しました。入力内容を確認してください。',
          },
        },
        400
      )
    }
  }

  // その他のエラー
  return c.json(
    {
      success: false,
      error: {
        name: err.name || 'Error',
        message: err.message,
      },
    },
    500
  )
})

// === ユーザー関連 API ===
// ユーザー一覧取得
app.get('/users', async c => {
  const users = await prisma.user.findMany({
    where: { deleteDatetime: null },
    include: { userDetails: true },
  })
  return c.json({ users })
})

// ユーザー詳細取得
app.get('/users/:id', async c => {
  const id = c.req.param('id')
  const user = await prisma.user.findUnique({
    where: { id, deleteDatetime: null },
    include: {
      userDetails: true,
      userSocialAccounts: true,
    },
  })

  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }

  return c.json({ user })
})

// FirebaseAuthユーザー詳細取得
app.get('/firebaseUsers/:id', async c => {
  const id = c.req.param('id')
  const user = await prisma.userDetail.findFirst({
    where: { uid: id, deleteDatetime: null },
  })
  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }

  return c.json({ user })
})

// ユーザー作成
const createUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  displayName: z.string(),
  uid: z.string(),
  birthday: z.string().optional(),
  gender: z.number().optional(),
  profileUrl: z.string().optional(),
  userType: z.string().optional(),
})

app.post('/users', zValidator('json', createUserSchema), async c => {
  const data = c.req.valid('json') as z.infer<typeof createUserSchema>

  const birthdayDate = data.birthday ? new Date(data.birthday) : null

  try {
    const userID = ulid()
    const user = await prisma.$transaction(async tx => {
      // ユーザー作成
      const newUser = await tx.user.create({
        data: {
          id: userID,
          version: 1,
        },
      })

      // ユーザー詳細作成
      const userDetailID = ulid()
      await tx.userDetail.create({
        data: {
          id: userDetailID,
          userId: newUser.id,
          name: data.name,
          displayName: data.displayName,
          uid: data.uid,
          birthday: birthdayDate,
          gender: data.gender,
          profileUrl: data.profileUrl,
          userType: data.userType || '550e8400-e29b-41d4-a716-446655440001',
        },
      })

      return newUser
    })

    return c.json({ user }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to create user' }, 500)
  }
})

// ユーザー更新
const updateUserSchema = z.object({
  name: z.string().optional(),
  displayName: z.string().optional(),
  birthday: z.string().optional(),
  gender: z.number().optional(),
  profileUrl: z.string().optional(),
  userType: z.string().optional(),
})

app.put('/users/:id', zValidator('json', updateUserSchema), async c => {
  const id = c.req.param('id')
  const data = c.req.valid('json') as z.infer<typeof updateUserSchema>

  const birthdayDate = data.birthday ? new Date(data.birthday) : undefined

  try {
    // ユーザーの存在確認
    const existingUser = await prisma.user.findUnique({
      where: { id, deleteDatetime: null },
      include: { userDetails: true },
    })

    if (!existingUser) {
      return c.json({ error: 'User not found' }, 404)
    }

    // ユーザー詳細の更新
    if (existingUser.userDetails.length > 0) {
      const userDetailId = existingUser.userDetails[0].id
      await prisma.userDetail.update({
        where: { id: userDetailId },
        data: {
          name: data.name,
          displayName: data.displayName,
          birthday: birthdayDate,
          gender: data.gender,
          profileUrl: data.profileUrl,
          userType: data.userType,
        },
      })
    }

    // ユーザーのバージョン更新
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { version: { increment: 1 } },
      include: { userDetails: true },
    })

    return c.json({ user: updatedUser })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to update user' }, 500)
  }
})

// ユーザー削除（論理削除）
app.delete('/users/:id', async c => {
  const id = c.req.param('id')

  try {
    // ユーザーの存在確認
    const existingUser = await prisma.user.findUnique({
      where: { id, deleteDatetime: null },
    })

    if (!existingUser) {
      return c.json({ error: 'User not found' }, 404)
    }

    // 論理削除（deleteDatetimeを設定）
    const now = new Date()
    await prisma.$transaction([
      // ユーザー詳細の論理削除
      prisma.userDetail.updateMany({
        where: { userId: id, deleteDatetime: null },
        data: { deleteDatetime: now },
      }),
      // ユーザーソーシャルアカウントの論理削除
      prisma.userSocialAccount.updateMany({
        where: { userId: id, deleteDatetime: null },
        data: { deleteDatetime: now },
      }),
      // ユーザーグループの論理削除
      prisma.userGroup.updateMany({
        where: { userId: id, deleteDatetime: null },
        data: { deleteDatetime: now },
      }),
      // ユーザー関係の論理削除
      prisma.userRelationship.updateMany({
        where: { userId: id, deleteDatetime: null },
        data: { deleteDatetime: now },
      }),
      // ユーザーの論理削除
      prisma.user.update({
        where: { id },
        data: { deleteDatetime: now },
      }),
    ])

    return c.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to delete user' }, 500)
  }
})

// === 旅行関連 API ===
// 旅行一覧取得
app.get('/travels', async c => {
  const userId = c.req.header('X-Tavinikkiy-User-Id')

  const where = userId ? { userId, deleteDatetime: null } : { deleteDatetime: null }

  const travels = await prisma.travel.findMany({
    where,
    orderBy: { createDatetime: 'desc' },
  })

  return c.json({ travels })
})

// 旅行詳細取得
app.get('/travels/:id', async c => {
  const id = c.req.param('id')

  const travel = await prisma.travel.findUnique({
    where: { id, deleteDatetime: null },
    include: {
      memories: { where: { deleteDatetime: null } },
      locations: { where: { deleteDatetime: null } },
      costs: { where: { deleteDatetime: null } },
    },
  })

  if (!travel) {
    return c.json({ error: 'Travel not found' }, 404)
  }

  return c.json({ travel })
})

// 旅行作成
const createTravelSchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  sharedId: z.string(),
  thumbnail: z.string(),
})

app.post('/travels', zValidator('json', createTravelSchema), async c => {
  const data = c.req.valid('json') as z.infer<typeof createTravelSchema>

  try {
    const travelID = ulid()
    const travel = await prisma.travel.create({
      data: {
        id: travelID,
        userId: data.userId,
        title: data.title,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        sharedId: data.sharedId,
        thumbnail: data.thumbnail,
        version: 0,
      },
    })

    return c.json({ travel }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to create travel' }, 500)
  }
})

// 旅行更新
const updateTravelSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  thumbnail: z.string().optional(),
})

app.put('/travels/:id', zValidator('json', updateTravelSchema), async c => {
  const id = c.req.param('id')
  const data = c.req.valid('json') as z.infer<typeof updateTravelSchema>

  try {
    // 旅行の存在確認
    const existingTravel = await prisma.travel.findUnique({
      where: { id, deleteDatetime: null },
    })

    if (!existingTravel) {
      return c.json({ error: 'Travel not found' }, 404)
    }

    // 更新用データの準備
    const updateData: any = {}
    if (data.title) updateData.title = data.title
    if (data.description) updateData.description = data.description
    if (data.startDate) updateData.startDate = new Date(data.startDate)
    if (data.endDate) updateData.endDate = new Date(data.endDate)
    if (data.thumbnail) updateData.thumbnail = data.thumbnail

    // バージョンの更新
    updateData.version = { increment: 1 }

    // 旅行の更新
    const updatedTravel = await prisma.travel.update({
      where: { id },
      data: updateData,
    })

    return c.json({ travel: updatedTravel })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to update travel' }, 500)
  }
})

// 旅行削除（論理削除）
app.delete('/travels/:id', async c => {
  const id = c.req.param('id')

  try {
    // 旅行の存在確認
    const existingTravel = await prisma.travel.findUnique({
      where: { id, deleteDatetime: null },
    })

    if (!existingTravel) {
      return c.json({ error: 'Travel not found' }, 404)
    }

    // 論理削除（deleteDatetimeを設定）
    const now = new Date()
    await prisma.$transaction([
      // 関連する思い出の論理削除
      prisma.memory.updateMany({
        where: { travelId: id, deleteDatetime: null },
        data: { deleteDatetime: now },
      }),
      // 関連する位置情報の論理削除
      prisma.location.updateMany({
        where: { travelId: id, deleteDatetime: null },
        data: { deleteDatetime: now },
      }),
      // 関連する費用の論理削除
      prisma.cost.updateMany({
        where: { travelId: id, deleteDatetime: null },
        data: { deleteDatetime: now },
      }),
      // 旅行の論理削除
      prisma.travel.update({
        where: { id },
        data: { deleteDatetime: now },
      }),
    ])

    return c.json({ message: 'Travel deleted successfully' })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to delete travel' }, 500)
  }
})

// エクスポート
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
