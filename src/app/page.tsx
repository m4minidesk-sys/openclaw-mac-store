'use client'

import {
  Header,
  HeroSection,
  FeaturesSection,
  PricingTable,
  FAQSection,
  Footer,
} from '@/components'

export default function Home() {
  const handleCTAClick = () => {
    const el = document.getElementById('products')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-textDark">
      <Header />
      <main>
        <HeroSection onCTAClick={handleCTAClick} />
        <FeaturesSection />
        <section id="products" className="py-24">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              商品ラインナップ
            </h2>
            <p className="text-center text-brand-textDark/60 mb-16 text-lg">
              すべてのモデルに OpenClaw がプリインストール済み
            </p>
            <PricingTable />
          </div>
        </section>
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
