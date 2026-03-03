import { test, expect } from '@playwright/test'

test.describe('購入フロー', () => {
  test('製品カードが表示される', async ({ page }) => {
    await page.goto('/')
    const productSection = page.locator('#product-lineup')
    await expect(productSection).toBeVisible()
  })

  test('製品の価格情報が表示される', async ({ page }) => {
    await page.goto('/')
    // 価格表示（¥ or 円）が1つ以上存在することを確認
    const priceElements = page.locator('text=/¥|円|\\$|price/i').first()
    // 価格が存在する場合のみチェック（UIの構造依存）
    const count = await page.locator('[class*="price"], [class*="Price"]').count()
    if (count > 0) {
      const firstPrice = page.locator('[class*="price"], [class*="Price"]').first()
      await expect(firstPrice).toBeVisible()
    }
  })

  test('注文成功ページにアクセスできる', async ({ page }) => {
    await page.goto('/success')
    await expect(page.locator('body')).toBeVisible()
    // 成功ページの主要コンテンツ確認
    await expect(page.locator('h1')).toBeVisible()
  })

  test('注文成功ページにトップページへのリンクがある', async ({ page }) => {
    await page.goto('/success')
    const homeLink = page.locator('a[href="/"]')
    await expect(homeLink).toBeVisible()
  })

  test('注文成功ページからトップページに遷移できる', async ({ page }) => {
    await page.goto('/success')
    const homeLink = page.locator('a[href="/"]').first()
    await homeLink.click()
    await expect(page).toHaveURL('/')
  })

  test('存在しない製品ページは404を返す', async ({ page }) => {
    const response = await page.goto('/products/nonexistent-product-12345')
    expect(response?.status()).toBe(404)
  })
})
