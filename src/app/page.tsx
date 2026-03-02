'use client'

import {
  Header,
  HeroSection,
  FeaturesSection,
  ProductLineup,
  FAQSection,
  Footer,
} from '@/components'

export default function Home() {
  const handleCTAClick = () => {
    const el = document.getElementById('product-lineup')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-textDark">
      <Header />
      <main>
        <HeroSection onCTAClick={handleCTAClick} />
        <FeaturesSection />
        <ProductLineup />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
