import React, { ReactNode } from 'react'
import CommonHeader from '@/components/header/CommonHeader'
import CommonFooter from '@/components/footer/CommonFooter'

interface MainLayoutProps {
  children: ReactNode
  title: string
  description?: string
}

export default function MainLayout({ children, title, description }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <CommonHeader />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{title}</h1>
          {description && <p className="text-xl text-muted-foreground">{description}</p>}
        </div>
        {children}
      </main>
      <CommonFooter />
    </div>
  )
}
