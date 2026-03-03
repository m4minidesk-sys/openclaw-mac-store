'use client'
import { useState } from 'react'
import { PRODUCTS, type Product } from '@/lib/products'
import { ProductCard } from './ProductCard'

export function PricingTable() {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleBuy = async (product: Product) => {
    setLoadingId(product.id)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <section className="bg-brand-bg py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-textDark text-center mb-4">ラインナップ</h2>
        <p className="text-center text-brand-textMuted mb-16">あなたの用途に合わせてお選びください。</p>
        <div className="grid md:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={handleBuy}
              loading={loadingId === product.id}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
