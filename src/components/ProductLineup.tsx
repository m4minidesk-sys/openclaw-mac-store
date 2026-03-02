import { PRODUCTS, formatPrice, type Product } from '@/data/products'

interface ProductLineupProps {
  products?: Product[]
}

export function ProductLineup({ products = PRODUCTS }: ProductLineupProps) {
  return (
    <section id="product-lineup" className="bg-brand-bg py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-textDark text-center mb-4">
          商品ラインナップ
        </h2>
        <p className="text-center text-brand-textDark/60 mb-16 text-lg">
          すべてのモデルに OpenClaw がプリインストール済み
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-brand-border p-8 flex flex-col hover:border-brand-accent transition-colors"
            >
              <h3 className="text-xl font-semibold text-brand-textDark mb-2">
                {product.name}
              </h3>
              <p className="text-brand-textDark/60 text-sm mb-2">{product.specs}</p>
              <p className="text-brand-textDark/70 text-sm mb-6 flex-1">
                {product.description}
              </p>
              <p className="text-3xl font-bold text-brand-textDark mb-6">
                {formatPrice(product.price)}
                <span className="text-sm font-normal text-brand-textDark/50 ml-1">（税込）</span>
              </p>
              <button
                disabled={!product.available}
                aria-label={`${product.name}を購入する`}
                className="w-full py-3 rounded-full font-medium transition-all
                  bg-brand-accent text-white
                  disabled:opacity-40 disabled:cursor-not-allowed
                  enabled:hover:bg-brand-accentHover enabled:hover:scale-[1.02]"
              >
                {product.available ? '購入する' : '近日販売予定'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
