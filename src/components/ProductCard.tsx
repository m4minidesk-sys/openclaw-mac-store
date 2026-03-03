import { type Product, formatPrice } from '@/lib/products'

interface ProductCardProps {
  product: Product
  onBuy?: (product: Product) => void
  loading?: boolean
}

export function ProductCard({ product, onBuy, loading = false }: ProductCardProps) {
  return (
    <div className="bg-brand-bg border border-brand-border rounded-3xl p-8 hover:border-brand-accent transition-all hover:shadow-lg hover:shadow-brand-accent/10">
      <h3 className="text-xl font-semibold text-brand-textDark">{product.name}</h3>
      <p className="mt-2 text-brand-textMuted text-sm">{product.description}</p>
      <ul className="mt-4 space-y-1">
        {product.specs.map((s) => (
          <li key={s} className="text-brand-textDark text-sm flex items-center gap-2">
            <span className="text-brand-accent">✓</span> {s}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-2xl font-bold text-brand-textDark">{formatPrice(product.price)}</span>
        <button
          onClick={() => onBuy?.(product)}
          disabled={loading}
          className="px-6 py-2 bg-brand-accentBtn hover:bg-brand-accentHover disabled:opacity-50 text-white rounded-full text-sm font-medium transition-all"
        >
          {loading ? '処理中...' : '購入する'}
        </button>
      </div>
    </div>
  )
}
