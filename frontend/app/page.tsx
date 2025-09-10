import LPFooter from '@/components/footer/LP-Footer'
import LPHeader from '@/components/header/LP-Header'
import Benefit from '@/components/lp/Benefit'
import CTA from '@/components/lp/CTA'
import Feature from '@/components/lp/Feature'
import Hero from '@/components/lp/Hero'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <LPHeader />
      <Hero />
      <Feature />
      <Benefit />
      <CTA />
      <LPFooter />
    </div>
  )
}
