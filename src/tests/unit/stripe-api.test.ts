import { describe, it, expect, vi } from 'vitest'

// Stripe モック - クラスとして機能するようにfunctionで定義
vi.mock('stripe', () => {
  const mockStripeInstance = {
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({
          id: 'cs_test_123',
          url: 'https://checkout.stripe.com/test',
        }),
      },
    },
    webhooks: {
      constructEvent: vi.fn().mockReturnValue({
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_test_123',
            customer_details: { email: 'test@example.com' },
            amount_total: 198000,
            currency: 'jpy',
          },
        },
      }),
    },
  }

  function MockStripe() {
    return mockStripeInstance
  }
  MockStripe.prototype = mockStripeInstance

  return {
    default: MockStripe,
  }
})

describe('Stripe Checkout API', () => {
  it('有効な商品IDでCheckoutセッションURLが返る', async () => {
    const { POST } = await import('@/app/api/stripe/checkout/route')
    const request = new Request('http://localhost/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: 'mac-mini-m4-16gb' }),
    })
    const response = await POST(request)
    const data = await response.json()
    expect(data.url).toBe('https://checkout.stripe.com/test')
  })

  it('無効な商品IDで404が返る', async () => {
    const { POST } = await import('@/app/api/stripe/checkout/route')
    const request = new Request('http://localhost/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: 'invalid-product' }),
    })
    const response = await POST(request)
    expect(response.status).toBe(404)
  })

  it('3商品すべてでCheckoutセッションが作成できる', async () => {
    const { POST } = await import('@/app/api/stripe/checkout/route')
    const productIds = ['mac-mini-m4-16gb', 'mac-mini-m4pro-24gb', 'macbook-air-m3-16gb']
    for (const productId of productIds) {
      const request = new Request('http://localhost/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
      const response = await POST(request)
      const data = await response.json()
      expect(data.url).toBeTruthy()
    }
  })
})

describe('Stripe Webhook API', () => {
  it('正常なWebhookリクエストを受け取れる', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_xxx'
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_xxx'
    const { POST } = await import('@/app/api/stripe/webhook/route')
    const request = new Request('http://localhost/api/stripe/webhook', {
      method: 'POST',
      headers: { 'stripe-signature': 'test_signature' },
      body: JSON.stringify({ type: 'checkout.session.completed' }),
    })
    const response = await POST(request)
    const data = await response.json()
    expect(data.received).toBe(true)
  })
})
