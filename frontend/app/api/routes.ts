import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { prisma } from '../../schemes/prisma/client'

export const runtime = 'nodejs'

// API ルーターの作成
const app = new Hono().basePath('/api')

// エラーハンドリングミドルウェア
app.onError((err, c) => {
  console.error(`${err}`)
  return c.json({ error: err.message }, 500)
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
    const user = await prisma.$transaction(async tx => {
      // ユーザー作成
      const newUser = await tx.user.create({
        data: {
          id: data.id,
          version: 0,
        },
      })

      // ユーザー詳細作成
      await tx.userDetail.create({
        data: {
          id: `${data.id}_detail`,
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
  const userId = c.req.query('userId')

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
  id: z.string(),
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
    const travel = await prisma.travel.create({
      data: {
        id: data.id,
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

// === お知らせ関連 API ===
// お知らせ一覧取得
app.get('/announcements', async c => {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return c.json({ announcements })
})

// お知らせ詳細取得
app.get('/announcements/:id', async c => {
  const id = c.req.param('id')

  const announcement = await prisma.announcement.findUnique({
    where: { id },
  })

  if (!announcement) {
    return c.json({ error: 'Announcement not found' }, 404)
  }

  return c.json({ announcement })
})

// お知らせ作成
const createAnnouncementSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  tag: z.string().optional(),
  icon: z.string().optional(),
})

app.post('/announcements', zValidator('json', createAnnouncementSchema), async c => {
  const data = c.req.valid('json') as z.infer<typeof createAnnouncementSchema>

  try {
    const announcement = await prisma.announcement.create({
      data: {
        id: data.id,
        slug: data.slug,
        title: data.title,
        content: data.content,
        tag: data.tag,
        icon: data.icon,
        version: 1,
      },
    })

    return c.json({ announcement }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to create announcement' }, 500)
  }
})

// お知らせ更新
const updateAnnouncementSchema = z.object({
  slug: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  tag: z.string().optional(),
  icon: z.string().optional(),
})

app.put('/announcements/:id', zValidator('json', updateAnnouncementSchema), async c => {
  const id = c.req.param('id')
  const data = c.req.valid('json') as z.infer<typeof updateAnnouncementSchema>

  try {
    // お知らせの存在確認
    const existingAnnouncement = await prisma.announcement.findUnique({
      where: { id },
    })

    if (!existingAnnouncement) {
      return c.json({ error: 'Announcement not found' }, 404)
    }

    // お知らせの更新
    const updatedAnnouncement = await prisma.announcement.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        content: data.content,
        tag: data.tag,
        icon: data.icon,
        version: { increment: 1 },
      },
    })

    return c.json({ announcement: updatedAnnouncement })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to update announcement' }, 500)
  }
})

// お知らせ削除
app.delete('/announcements/:id', async c => {
  const id = c.req.param('id')

  try {
    // お知らせの存在確認
    const existingAnnouncement = await prisma.announcement.findUnique({
      where: { id },
    })

    if (!existingAnnouncement) {
      return c.json({ error: 'Announcement not found' }, 404)
    }

    // お知らせの削除
    await prisma.announcement.delete({
      where: { id },
    })

    return c.json({ message: 'Announcement deleted successfully' })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to delete announcement' }, 500)
  }
})

// === 思い出関連 API ===
// 思い出一覧取得
app.get('/memories', async c => {
  const travelId = c.req.query('travelId')

  const where = travelId ? { travelId, deleteDatetime: null } : { deleteDatetime: null }

  const memories = await prisma.memory.findMany({
    where,
    orderBy: { date: 'desc' },
  })

  return c.json({ memories })
})

// 思い出詳細取得
app.get('/memories/:id', async c => {
  const id = c.req.param('id')

  const memory = await prisma.memory.findUnique({
    where: { id, deleteDatetime: null },
  })

  if (!memory) {
    return c.json({ error: 'Memory not found' }, 404)
  }

  return c.json({ memory })
})

// 思い出作成
const createMemorySchema = z.object({
  id: z.string(),
  travelId: z.string(),
  photoUrl: z.string(),
  description: z.string(),
  date: z.string(),
})

app.post('/memories', zValidator('json', createMemorySchema), async c => {
  const data = c.req.valid('json') as z.infer<typeof createMemorySchema>

  try {
    const memory = await prisma.memory.create({
      data: {
        id: data.id,
        travelId: data.travelId,
        photoUrl: data.photoUrl,
        description: data.description,
        date: new Date(data.date),
      },
    })

    return c.json({ memory }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to create memory' }, 500)
  }
})

// 思い出更新
const updateMemorySchema = z.object({
  photoUrl: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
})

app.put('/memories/:id', zValidator('json', updateMemorySchema), async c => {
  const id = c.req.param('id')
  const data = c.req.valid('json') as z.infer<typeof updateMemorySchema>

  try {
    // 思い出の存在確認
    const existingMemory = await prisma.memory.findUnique({
      where: { id, deleteDatetime: null },
    })

    if (!existingMemory) {
      return c.json({ error: 'Memory not found' }, 404)
    }

    // 更新用データの準備
    const updateData: any = {}
    if (data.photoUrl) updateData.photoUrl = data.photoUrl
    if (data.description) updateData.description = data.description
    if (data.date) updateData.date = new Date(data.date)

    // 思い出の更新
    const updatedMemory = await prisma.memory.update({
      where: { id },
      data: updateData,
    })

    return c.json({ memory: updatedMemory })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to update memory' }, 500)
  }
})

// 思い出削除（論理削除）
app.delete('/memories/:id', async c => {
  const id = c.req.param('id')

  try {
    // 思い出の存在確認
    const existingMemory = await prisma.memory.findUnique({
      where: { id, deleteDatetime: null },
    })

    if (!existingMemory) {
      return c.json({ error: 'Memory not found' }, 404)
    }

    // 論理削除（deleteDatetimeを設定）
    const now = new Date()
    await prisma.memory.update({
      where: { id },
      data: { deleteDatetime: now },
    })

    return c.json({ message: 'Memory deleted successfully' })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to delete memory' }, 500)
  }
})

// エクスポート
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
