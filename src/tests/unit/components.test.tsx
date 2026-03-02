import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroSection } from '@/components/HeroSection'
import { FAQSection } from '@/components/FAQSection'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/products'

describe('HeroSection', () => {
  it('キャッチコピーが表示される', () => {
    render(<HeroSection />)
    expect(screen.getByText(/AIエージェント搭載Mac/)).toBeInTheDocument()
  })

  it('CTAボタンが存在する', () => {
    render(<HeroSection />)
    expect(screen.getByRole('button', { name: /今すぐ注文する/ })).toBeInTheDocument()
  })

  it('CTAクリックでコールバックが呼ばれる', () => {
    const mockFn = vi.fn()
    render(<HeroSection onCTAClick={mockFn} />)
    screen.getByRole('button').click()
    expect(mockFn).toHaveBeenCalled()
  })
})

describe('ProductCard', () => {
  const product = PRODUCTS[0]

  it('商品名が表示される', () => {
    render(<ProductCard product={product} />)
    expect(screen.getByText(product.name)).toBeInTheDocument()
  })

  it('価格が表示される', () => {
    render(<ProductCard product={product} />)
    expect(screen.getByText('¥198,000')).toBeInTheDocument()
  })

  it('購入するボタンが存在する', () => {
    render(<ProductCard product={product} />)
    expect(screen.getByRole('button', { name: '購入する' })).toBeInTheDocument()
  })
})

describe('FAQSection', () => {
  it('FAQ見出しが表示される', () => {
    render(<FAQSection />)
    expect(screen.getByText('よくある質問')).toBeInTheDocument()
  })

  it('FAQ項目が4件表示される', () => {
    render(<FAQSection />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(4)
  })
})
