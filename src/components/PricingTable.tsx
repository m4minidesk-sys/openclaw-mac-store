import { PRODUCTS, type Product } from '@/lib/products'
import { ProductCard } from './ProductCard'

interface PricingTableProps {
  onBuy?: (product: Product) => void
}

export function PricingTable({ onBuy }: PricingTableProps) {
  return (
    <section id="products" className="bg-brand-bg py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-textDark text-center mb-4">ラインナップ</h2>
        <p className="text-center text-brand-textDark/60 mb-16">あなたの用途に合わせてお選びください。</p>
        <div className="grid md:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onBuy={onBuy} />
          ))}
        </div>
      </div>
    </section>
  )
}
