import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const OUTPUT_DIR = path.join(process.cwd(), 'src/demo/output')

test.beforeAll(() => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
})

test('Slackデモ: AIエージェントがタスクを自動処理する様子', async ({ page }) => {
  // 注意: 実際のSlack URLとCookiesが必要
  // ローカル実行時は環境変数 DEMO_SLACK_URL を設定してください
  const slackUrl = process.env.DEMO_SLACK_URL || 'https://app.slack.com'

  await page.goto(slackUrl)

  // スクリーンショット（デモ用キャプチャポイント）
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'slack-01-open.png'),
    fullPage: false,
  })

  // NOTE: 実際の操作は AYA が手動またはCookies設定後に実行
  // このシナリオはデモフローのテンプレート
  console.log('✅ Slackデモシナリオ準備完了')
  console.log('📝 実際の録画は AYA がログイン済み状態で実行してください')
})
