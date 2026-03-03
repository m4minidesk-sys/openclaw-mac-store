import { test } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const OUTPUT_DIR = path.join(process.cwd(), 'src/demo/output')

test.beforeAll(() => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
})

test('Discordデモ: AIエージェントがコード生成・実行する様子', async ({ page }) => {
  const discordUrl = process.env.DEMO_DISCORD_URL || 'https://discord.com/app'
  await page.goto(discordUrl)
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'discord-01-open.png'),
    fullPage: false,
  })
  console.log('✅ Discordデモシナリオ準備完了')
})
