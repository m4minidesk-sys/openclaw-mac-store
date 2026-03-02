import { describe, it, expect } from 'vitest'
import { PRODUCTS, formatPrice } from '@/lib/products'

describe('PRODUCTS', () => {
  it('3件存在する', () => {
    expect(PRODUCTS).toHaveLength(3)
  })

  it('各productに必須フィールドが存在する', () => {
    PRODUCTS.forEach((p) => {
      expect(p.id).toBeTruthy()
      expect(p.name).toBeTruthy()
      expect(p.price).toBeGreaterThan(0)
      expect(p.currency).toBe('jpy')
      expect(p.description).toBeTruthy()
      expect(p.specs.length).toBeGreaterThan(0)
    })
  })

  it('priceが正の整数である', () => {
    PRODUCTS.forEach((p) => {
      expect(p.price).toBeGreaterThan(0)
      expect(Number.isInteger(p.price)).toBe(true)
    })
  })
})

describe('formatPrice', () => {
  it('¥198,000 形式でフォーマットする', () => {
    expect(formatPrice(198000)).toBe('¥198,000')
  })

  it('¥0 をフォーマットできる', () => {
    expect(formatPrice(0)).toBe('¥0')
  })
})
