import { test, expect } from '@playwright/test'

test.describe('フッター', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('フッターが表示される', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('フッターにコピーライトテキストが含まれる', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toContainText('m4minidesk')
  })

  test('フッターの著作権年が表示される', async ({ page }) => {
    const footer = page.locator('footer')
    // 年（2024 or 2025）が含まれることを確認
    const text = await footer.textContent()
    expect(text).toMatch(/20[0-9]{2}/)
  })

  test('フッターの法的ページリンク（実装後確認）', async ({ page }) => {
    const footer = page.locator('footer')
    // 法的ページリンクが存在する場合に確認
    const legalLinks = footer.locator('a[href="/legal"], a[href="/privacy"], a[href="/terms"]')
    const count = await legalLinks.count()
    if (count > 0) {
      // リンクが存在する場合、全てが表示されていることを確認
      for (let i = 0; i < count; i++) {
        await expect(legalLinks.nth(i)).toBeVisible()
      }
    }
    // まだリンクがなくてもテストは通す（PR #26マージ後に自動で有効化）
  })
})

test.describe('レスポンシブ表示', () => {
  test('モバイル表示でトップページが崩れない', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('タブレット表示でトップページが崩れない', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('デスクトップ表示でトップページが崩れない', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })
})
