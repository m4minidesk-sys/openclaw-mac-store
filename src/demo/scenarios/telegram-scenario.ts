import { test } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const OUTPUT_DIR = path.join(process.cwd(), 'src/demo/output')

test.beforeAll(() => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
})

test('Telegramデモ: AIエージェントがドキュメントを解析・要約する様子', async ({ page }) => {
  const telegramUrl = process.env.DEMO_TELEGRAM_URL || 'https://web.telegram.org'
  await page.goto(telegramUrl)
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'telegram-01-open.png'),
    fullPage: false,
  })
  console.log('✅ Telegramデモシナリオ準備完了')
})
