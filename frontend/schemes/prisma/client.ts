import { PrismaClient } from './generated/client'

// グローバルにPrismaClientのインスタンスを保持
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 開発環境では1つのインスタンスを再利用し、本番環境では新しいインスタンスを作成
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
