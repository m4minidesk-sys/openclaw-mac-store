export interface Product {
  id: string
  name: string
  specs: string
  price: number
  currency: string
  description: string
  available: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 'mac-mini-m4-16gb',
    name: 'Mac mini M4 16GB + OpenClaw',
    specs: 'Apple M4 / 16GB RAM / 256GB SSD',
    price: 198000,
    currency: 'jpy',
    description: 'エントリーモデル。AIエージェント入門に最適。',
    available: false,
  },
  {
    id: 'mac-mini-m4pro-24gb',
    name: 'Mac mini M4 Pro 24GB + OpenClaw',
    specs: 'Apple M4 Pro / 24GB RAM / 512GB SSD',
    price: 268000,
    currency: 'jpy',
    description: 'プロモデル。複数エージェント並列稼働に。',
    available: false,
  },
  {
    id: 'macbook-air-m3-16gb',
    name: 'MacBook Air M3 16GB + OpenClaw',
    specs: 'Apple M3 / 16GB RAM / 256GB SSD',
    price: 228000,
    currency: 'jpy',
    description: 'どこでもAIエージェント。持ち歩きたい方に。',
    available: false,
  },
]

export function formatPrice(price: number): string {
  return `¥${price.toLocaleString('ja-JP')}`
}
