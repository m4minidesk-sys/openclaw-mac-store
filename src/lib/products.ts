export interface Product {
  id: string
  name: string
  price: number
  currency: string
  description: string
  specs: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'mac-mini-m4-16gb',
    name: 'Mac mini M4 16GB + OpenClaw',
    price: 198000,
    currency: 'jpy',
    description: 'エントリーモデル。AIエージェント入門に最適。',
    specs: ['Apple M4チップ', '16GB RAM', '256GB SSD', 'OpenClaw プリインストール済み'],
  },
  {
    id: 'mac-mini-m4pro-24gb',
    name: 'Mac mini M4 Pro 24GB + OpenClaw',
    price: 268000,
    currency: 'jpy',
    description: 'プロモデル。複数エージェント並列稼働に。',
    specs: ['Apple M4 Proチップ', '24GB RAM', '512GB SSD', 'OpenClaw プリインストール済み'],
  },
  {
    id: 'macbook-air-m3-16gb',
    name: 'MacBook Air M3 16GB + OpenClaw',
    price: 228000,
    currency: 'jpy',
    description: 'どこでもAIエージェント。持ち歩きたい方に。',
    specs: ['Apple M3チップ', '16GB RAM', '256GB SSD', 'OpenClaw プリインストール済み'],
  },
]

export function formatPrice(price: number): string {
  return `¥${price.toLocaleString('ja-JP')}`
}
