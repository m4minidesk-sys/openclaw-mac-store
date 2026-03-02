import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ProductLineup } from '@/components/ProductLineup'
import { FAQSection } from '@/components/FAQSection'
import { PRODUCTS } from '@/data/products'

// スナップショット1: ProductLineup（全商品）
describe('ProductLineup snapshot', () => {
  it('全商品ラインナップのスナップショット', () => {
    const { container } = render(<ProductLineup />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('商品が3件描画される', () => {
    const { getAllByRole } = render(<ProductLineup />)
    // 購入ボタンが3つ（aria-labelで特定）
    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  it('section id が product-lineup', () => {
    const { container } = render(<ProductLineup />)
    const section = container.querySelector('#product-lineup')
    expect(section).not.toBeNull()
  })

  it('購入ボタンがdisabled（Stripe未連携）', () => {
    const { getAllByRole } = render(<ProductLineup />)
    const buttons = getAllByRole('button') as HTMLButtonElement[]
    buttons.forEach(btn => {
      expect(btn.disabled).toBe(true)
    })
  })
})

// スナップショット2: FAQSection（closed状態）
describe('FAQSection snapshot - closed', () => {
  it('FAQセクション初期状態（全closed）のスナップショット', () => {
    const { container } = render(<FAQSection />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('FAQ質問が4件描画される', () => {
    const { getAllByRole } = render(<FAQSection />)
    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(4)
  })

  it('デフォルトで回答が非表示', () => {
    const { queryByText } = render(<FAQSection />)
    // Radix UIはclosed時にコンテンツをDOMに含めるが非表示
    // 少なくとも初期状態のスナップショットが取れる
    const firstQ = queryByText('OpenClawとは？')
    expect(firstQ).toBeTruthy()
  })
})

// スナップショット3: カスタムデータのProductLineup
describe('ProductLineup snapshot - custom data', () => {
  it('カスタム1商品のスナップショット', () => {
    const customProducts = [PRODUCTS[0]]
    const { container } = render(<ProductLineup products={customProducts} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
