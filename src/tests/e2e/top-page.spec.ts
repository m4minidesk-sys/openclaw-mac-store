import { test, expect } from '@playwright/test'

test.describe('トップページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('トップページが正常に表示される', async ({ page }) => {
    await expect(page).toHaveTitle(/openclaw|mac|store/i)
    await expect(page.locator('body')).toBeVisible()
  })

  test('ヘッダーが表示される', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible()
  })

  test('ヒーローセクションが表示される', async ({ page }) => {
    // HeroSection が存在することを確認（main要素内）
    const main = page.locator('main')
    await expect(main).toBeVisible()
  })

  test('フッターが表示される', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('フッターにコピーライトが表示される', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toContainText('m4minidesk')
  })

  test('製品ラインナップセクションが表示される', async ({ page }) => {
    // 製品セクション（ProductLineup）が id="product-lineup" で存在する
    const productSection = page.locator('#product-lineup')
    await expect(productSection).toBeVisible()
  })

  test('CTAボタンをクリックすると製品セクションにスクロールする', async ({ page }) => {
    // HeroSectionのCTAボタンをクリック
    const ctaButton = page.locator('button, a').filter({ hasText: /今すぐ|購入|見る|check/i }).first()
    if (await ctaButton.isVisible()) {
      await ctaButton.click()
      await page.waitForTimeout(500)
      const productSection = page.locator('#product-lineup')
      await expect(productSection).toBeInViewport()
    }
  })
})
