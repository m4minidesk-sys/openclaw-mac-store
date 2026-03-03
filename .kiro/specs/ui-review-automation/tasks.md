# UI レビュー自動化 + LP表示崩れ修正 — Implementation Tasks

## Phase 1: LP表示崩れ調査・修正（P0）

### TASK-1.1: LP表示崩れの根本原因調査 [S]
**目的:** 本番環境でどのセクションが表示されていないか、なぜ表示されないかを特定

**手順:**
1. 本番URL（https://main.d31242v30hmgzh.amplifyapp.com）をブラウザで開く
2. DevToolsのConsoleでエラー確認
3. DevToolsのNetworkでCSSファイルの読み込み確認
4. DevToolsのElementsで各セクションのDOM存在確認
5. 生成されたCSSファイルで`brand-bg`等のクラスが存在するか確認

**成果物:**
- 調査結果メモ（Slackまたはissueコメント）
- エラーログのスクリーンショット

**担当:** Developer
**見積:** 15分

---

### TASK-1.2: Tailwind設定の検証 [S]
**目的:** `tailwind.config.ts`と`postcss.config.js`が正しく設定されているか確認

**手順:**
1. `postcss.config.js`の存在確認（なければ作成）
2. `tailwind.config.ts`の`content`パスが正しいか確認
3. ローカルで`pnpm build`を実行し、`.next/static/css/`のCSSファイルを確認
4. `brand-bg`等のクラスが生成されているか確認

**ファイル:**
- `postcss.config.js`（確認/作成）
- `tailwind.config.ts`（確認）

**成果物:**
- PostCSS設定ファイル（必要に応じて）
- ビルド結果の確認メモ

**担当:** Developer
**見積:** 20分

---

### TASK-1.3: LP表示崩れ修正 [M]
**目的:** 特定された原因に基づいて修正を実施

**想定される修正パターン:**

**パターンA: Tailwindクラス名の問題**
- `bg-brand-bg` → `bg-[#0a0a0a]`（一時的な回避策）
- または`tailwind.config.ts`の修正

**パターンB: コンポーネントのエラー**
- `src/components/FeaturesSection.tsx`等のエラー修正
- `src/app/page.tsx`のimport確認

**パターンC: Amplifyビルド設定**
- `amplify.yml`のビルドコマンド確認
- Node.jsバージョン確認

**ファイル:**
- `src/app/page.tsx`
- `src/components/*.tsx`
- `tailwind.config.ts`
- `amplify.yml`（必要に応じて）

**成果物:**
- 修正コミット
- 本番環境での動作確認

**担当:** Developer
**見積:** 1時間

---

### TASK-1.4: 修正の動作確認 [S]
**目的:** 全セクションが正常表示されることを確認

**手順:**
1. ローカルで`pnpm dev`を実行し、全セクション表示確認
2. `pnpm build && pnpm start`で本番ビルドを確認
3. PR作成してAmplify preview環境で確認
4. Desktop（1280px）とMobile（375px）両方で確認

**成果物:**
- 動作確認スクリーンショット
- PRコメントに確認結果を記載

**担当:** Developer
**見積:** 15分

---

## Phase 2: Playwright E2Eテスト実装（P1）

### TASK-2.1: Playwright設定の更新 [S]
**目的:** CI環境で本番ビルドをテストできるように設定

**手順:**
1. `playwright.config.ts`の`webServer`を更新
2. CI環境では`pnpm build && pnpm start`を実行
3. ローカル環境では`pnpm dev`を使用

**ファイル:**
- `playwright.config.ts`

**変更内容:**
```typescript
webServer: {
  command: process.env.CI ? 'pnpm build && pnpm start' : 'pnpm dev',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
  timeout: 120000,
}
```

**成果物:**
- 更新された`playwright.config.ts`

**担当:** Developer
**見積:** 10分

---

### TASK-2.2: セクション表示確認テストの実装 [M]
**目的:** 各セクションが正しく表示されることを自動確認

**手順:**
1. `src/tests/e2e/lp-sections.spec.ts`を作成
2. 各セクションのdata-testid属性を追加（必要に応じて）
3. `isVisible()`でアサーション

**ファイル:**
- `src/tests/e2e/lp-sections.spec.ts`（新規作成）
- `src/components/*.tsx`（data-testid追加）

**テスト内容:**
```typescript
test.describe('LP Sections Visibility', () => {
  test('should display all sections on desktop', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header')).toBeVisible()
    await expect(page.getByRole('heading', { name: /OpenClaw/ })).toBeVisible()
    await expect(page.getByText(/特徴/)).toBeVisible()
    await expect(page.getByText(/商品ラインナップ/)).toBeVisible()
    await expect(page.getByText(/よくある質問/)).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })
})
```

**成果物:**
- `src/tests/e2e/lp-sections.spec.ts`

**担当:** Developer
**見積:** 45分

---

### TASK-2.3: スクリーンショットテストの実装 [M]
**目的:** LP全体のスクリーンショットを自動保存

**手順:**
1. `src/tests/e2e/screenshot.spec.ts`を作成
2. Desktop（1280x720）とMobile（375x667）のviewportで実行
3. `page.screenshot({ fullPage: true })`でスクリーンショット保存

**ファイル:**
- `src/tests/e2e/screenshot.spec.ts`（新規作成）

**テスト内容:**
```typescript
test.describe('LP Screenshots', () => {
  test('desktop full page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')
    await page.screenshot({ path: 'screenshots/lp-desktop.png', fullPage: true })
  })

  test('mobile full page', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.screenshot({ path: 'screenshots/lp-mobile.png', fullPage: true })
  })
})
```

**成果物:**
- `src/tests/e2e/screenshot.spec.ts`

**担当:** Developer
**見積:** 30分

---

### TASK-2.4: ローカルでのE2Eテスト実行確認 [S]
**目的:** ローカル環境でテストが正常に動作することを確認

**手順:**
1. `pnpm test:e2e`を実行
2. 全テストがパスすることを確認
3. `screenshots/`ディレクトリにスクリーンショットが保存されることを確認

**成果物:**
- テスト実行結果のスクリーンショット

**担当:** Developer
**見積:** 10分

---

## Phase 3: GitHub Actions CI統合（P1）

### TASK-3.1: CI workflowにPlaywright E2Eを追加 [M]
**目的:** PR/Push時に自動でE2Eテストを実行

**手順:**
1. `.github/workflows/ci.yml`を更新
2. Playwright依存関係のインストール
3. E2Eテスト実行
4. スクリーンショットをArtifactsにアップロード

**ファイル:**
- `.github/workflows/ci.yml`

**追加内容:**
```yaml
- name: Install Playwright Browsers
  run: pnpm exec playwright install --with-deps chromium

- name: Run E2E tests
  run: pnpm test:e2e

- name: Upload screenshots
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: playwright-screenshots
    path: screenshots/
    retention-days: 7
```

**成果物:**
- 更新された`.github/workflows/ci.yml`

**担当:** Developer
**見積:** 30分

---

### TASK-3.2: CI実行確認 [S]
**目的:** GitHub ActionsでE2Eテストが正常に動作することを確認

**手順:**
1. PRを作成してCI実行
2. E2Eテストがパスすることを確認
3. Artifactsにスクリーンショットがアップロードされることを確認

**成果物:**
- CI実行結果のスクリーンショット

**担当:** Developer
**見積:** 10分

---

## Phase 4: Lighthouse CI実装（P2）

### TASK-4.1: Lighthouse CI workflowの作成 [L]
**目的:** main pushの後、本番URLに対してLighthouse実行

**手順:**
1. `.github/workflows/lighthouse.yml`を作成
2. `workflow_run`トリガーでAmplifyデプロイ完了を待つ
3. `@lhci/cli`をインストールして実行
4. 結果をJSON出力

**ファイル:**
- `.github/workflows/lighthouse.yml`（新規作成）

**Workflow内容:**
```yaml
name: Lighthouse CI

on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Wait for Amplify deployment
        run: |
          for i in {1..20}; do
            if curl -s -o /dev/null -w "%{http_code}" https://main.d31242v30hmgzh.amplifyapp.com | grep -q "200"; then
              echo "Deployment ready"
              exit 0
            fi
            echo "Waiting for deployment... ($i/20)"
            sleep 30
          done
          exit 1
      
      - name: Run Lighthouse
        run: |
          npm install -g @lhci/cli
          lhci autorun --collect.url=https://main.d31242v30hmgzh.amplifyapp.com --collect.numberOfRuns=3
```

**成果物:**
- `.github/workflows/lighthouse.yml`

**担当:** Developer
**見積:** 1.5時間

---

### TASK-4.2: Lighthouse結果のPRコメント投稿 [L]
**目的:** Lighthouseスコアを自動でPRコメントに投稿

**手順:**
1. Lighthouse結果をJSONでパース
2. `actions/github-script`でPRコメント作成
3. スコアが閾値未満の場合は警告表示

**ファイル:**
- `.github/workflows/lighthouse.yml`（更新）
- `.github/scripts/format-lighthouse-results.js`（新規作成）

**追加内容:**
```yaml
- name: Comment PR
  uses: actions/github-script@v7
  with:
    script: |
      const fs = require('fs');
      const results = JSON.parse(fs.readFileSync('.lighthouseci/lhr.json'));
      const scores = {
        performance: results.categories.performance.score * 100,
        accessibility: results.categories.accessibility.score * 100,
        bestPractices: results.categories['best-practices'].score * 100,
        seo: results.categories.seo.score * 100,
      };
      const comment = `## Lighthouse Results\n\n` +
        `- Performance: ${scores.performance}\n` +
        `- Accessibility: ${scores.accessibility}\n` +
        `- Best Practices: ${scores.bestPractices}\n` +
        `- SEO: ${scores.seo}`;
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: comment
      });
```

**成果物:**
- 更新された`.github/workflows/lighthouse.yml`

**担当:** Developer
**見積:** 1.5時間

---

### TASK-4.3: Lighthouse CI実行確認 [M]
**目的:** main mergeの後、Lighthouse CIが正常に動作することを確認

**手順:**
1. main branchにmerge
2. GitHub ActionsでLighthouse CI実行を確認
3. PRコメントにスコアが投稿されることを確認
4. スコアが閾値を満たしているか確認

**成果物:**
- Lighthouse CI実行結果のスクリーンショット
- PRコメントのスクリーンショット

**担当:** Developer
**見積:** 30分

---

## Phase 5: ドキュメント・クリーンアップ（P2）

### TASK-5.1: READMEの更新 [S]
**目的:** E2Eテストとlighthouse CIの実行方法をドキュメント化

**手順:**
1. `README.md`に以下を追加:
   - E2Eテストの実行方法
   - スクリーンショットの確認方法
   - Lighthouse CIの仕組み

**ファイル:**
- `README.md`

**追加内容:**
```markdown
## Testing

### Unit Tests
pnpm test

### E2E Tests
pnpm test:e2e

### Lighthouse CI
Automatically runs on main branch push. Results are posted to PR comments.
```

**成果物:**
- 更新された`README.md`

**担当:** Developer
**見積:** 15分

---

### TASK-5.2: 不要なファイルのクリーンアップ [S]
**目的:** テスト実行で生成されたファイルをgitignoreに追加

**手順:**
1. `.gitignore`に以下を追加:
   - `screenshots/`
   - `playwright-report/`
   - `.lighthouseci/`

**ファイル:**
- `.gitignore`

**成果物:**
- 更新された`.gitignore`

**担当:** Developer
**見積:** 5分

---

## タスク実行順序（依存関係）

```
Phase 1 (P0): LP表示崩れ修正
  TASK-1.1 → TASK-1.2 → TASK-1.3 → TASK-1.4
  ↓
Phase 2 (P1): Playwright E2E
  TASK-2.1 → TASK-2.2 → TASK-2.3 → TASK-2.4
  ↓
Phase 3 (P1): CI統合
  TASK-3.1 → TASK-3.2
  ↓
Phase 4 (P2): Lighthouse CI
  TASK-4.1 → TASK-4.2 → TASK-4.3
  ↓
Phase 5 (P2): ドキュメント
  TASK-5.1, TASK-5.2（並行可能）
```

## 見積もりサマリー

| Phase | タスク数 | 合計時間 |
|-------|---------|---------|
| Phase 1 | 4 | 1.8時間 |
| Phase 2 | 4 | 1.6時間 |
| Phase 3 | 2 | 0.7時間 |
| Phase 4 | 3 | 3.5時間 |
| Phase 5 | 2 | 0.3時間 |
| **合計** | **15** | **7.9時間** |

## 完了条件

- [ ] LP全セクション（HeroSection, FeaturesSection, PricingTable, FAQSection, Footer）が本番環境で正常表示
- [ ] Playwright E2Eテストが全てパス（desktop + mobile）
- [ ] GitHub ActionsでE2Eテストが自動実行される
- [ ] スクリーンショットがArtifactsに保存される
- [ ] Lighthouse CIがmain pushの後に自動実行される
- [ ] Lighthouseスコアが閾値を満たす（Performance/Accessibility/Best Practices ≥ 90）
- [ ] READMEが更新されている

## リスクと対策

| リスク | 影響 | 対策 |
|--------|------|------|
| Tailwind v4がAmplifyと互換性がない | 高 | v3へのダウングレード検討 |
| Lighthouse実行時にAmplifyデプロイ未完了 | 中 | リトライ機構追加、待機時間延長 |
| E2Eテストが不安定（flaky） | 中 | `retries: 2`設定、`waitForSelector`のtimeout調整 |
| CI実行時間が長すぎる | 低 | Playwrightの並列実行、Lighthouseはmain pushのみ |
