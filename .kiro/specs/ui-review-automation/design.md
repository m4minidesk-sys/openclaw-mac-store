# UI レビュー自動化 + LP表示崩れ修正 — Technical Design

## 1. 問題分析

### 1.1 LP表示崩れの根本原因仮説

**仮説A: Tailwindカスタムカラーのビルド問題**
- `bg-brand-bg` などのクラスがAmplifyビルドで正しくCSSに変換されていない
- Tailwind v4の新しいPostCSS設定がAmplifyと互換性がない可能性

**仮説B: コンポーネントのレンダリングエラー**
- FeaturesSection/PricingTable/FAQSection/FooterでJSエラーが発生し、レンダリングが中断
- クライアントサイドのハイドレーションエラー

**仮説C: CSSの読み込み順序問題**
- Tailwind CSSが正しく読み込まれていない
- カスタムカラーの定義が見つからず、スタイルが適用されない

**調査方針:**
1. ブラウザDevToolsでコンソールエラー確認
2. 本番ビルドの生成CSSファイルで `brand-bg` クラスの存在確認
3. Amplifyビルドログでwarning/error確認

### 1.2 Tailwindカスタムカラー問題の対処法

**選択: Tailwind設定の明示的な指定（推奨）**

理由:
- Tailwind v4は新しいため、Amplifyのビルド環境との互換性問題がある可能性
- `tailwind.config.ts`の`extend.colors`は正しく設定されているが、ビルド時にパースされない可能性
- 最もシンプルで保守性が高い

対処法:
1. `tailwind.config.ts`の設定を確認（既に正しい）
2. `postcss.config.js`が存在し、正しく設定されているか確認
3. Amplifyビルド設定で`NODE_ENV=production`が正しく設定されているか確認
4. 必要に応じて、Tailwind v3へのダウングレードを検討

**代替案（非推奨）:**
- CSS変数: 追加の複雑性、Tailwindの利点を失う
- インライン: 保守性が低い、Tailwindの一貫性を失う
- プリセット値: カスタムブランドカラーが使えない

## 2. アーキテクチャ設計

### 2.1 全体構成

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Actions CI                     │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  PR/Push Trigger                                         │
│       │                                                   │
│       ├─→ Lint & Unit Tests (existing)                  │
│       │                                                   │
│       ├─→ Build Check                                    │
│       │                                                   │
│       ├─→ Playwright E2E Tests (NEW)                    │
│       │   ├─ Desktop viewport (1280x720)                │
│       │   ├─ Mobile viewport (375x667)                  │
│       │   ├─ Section visibility checks                  │
│       │   └─ Full-page screenshots → Artifacts          │
│       │                                                   │
│       └─→ Lighthouse CI (main branch only) (NEW)        │
│           ├─ Wait for Amplify deploy                    │
│           ├─ Run Lighthouse on prod URL                 │
│           └─ Post results to PR comment                 │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Playwright E2E テスト設計

**実行環境:**
- ローカル: `pnpm test:e2e` → localhost:3000（dev server）
- CI: GitHub Actions → localhost:3000（webServer auto-start）

**設定統一方針:**
- `playwright.config.ts`の`webServer`オプションで自動起動
- `reuseExistingServer: !process.env.CI` でローカルは既存サーバー利用
- CI環境では`pnpm build && pnpm start`で本番ビルドをテスト

**テストスコープ:**
1. `screenshot.spec.ts`: フルページスクリーンショット（desktop/mobile）
2. `lp-sections.spec.ts`: 各セクションのvisibility確認

**スクリーンショット保存:**
- ローカル: `playwright-report/screenshots/`
- CI: GitHub Actions Artifacts（7日間保持）

### 2.3 Lighthouse CI 設計

**実行タイミング: Post-deploy（main branch push後）**

理由:
- Lighthouseは実際のデプロイ済みURLに対して実行する必要がある
- PR時点ではAmplifyのpreview環境がまだデプロイされていない
- main mergeの後、Amplifyデプロイ完了を待ってから実行

**実装方針:**
1. `.github/workflows/lighthouse.yml`を作成
2. `workflow_run`トリガーでAmplifyデプロイ完了を待つ
3. `@lhci/cli`を使用してLighthouse実行
4. 結果をGitHub PRコメントに投稿（`actions/github-script`）

**閾値設定:**
- Performance: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90（追加推奨）

**代替案（非推奨）:**
- PR時にpreview URLでLighthouse実行: Amplifyのpreview URL取得が複雑
- 毎回main pushで実行: 不要なCI実行が増える

### 2.4 ビジュアルリグレッションテスト

**判断: 現時点では不要**

理由:
- 初期段階のプロジェクトで、UIの変更頻度が高い
- ビジュアルリグレッションテストはベースライン管理が必要で、初期コストが高い
- Playwright E2Eのスクリーンショット保存で、手動での視覚確認が可能
- 必要になったら、Playwrightの`toHaveScreenshot()`を追加可能

**将来的に導入する場合:**
- Playwright built-in visual comparison
- Percy/Chromatic（有料サービス）
- Argos CI（OSS friendly）

## 3. 技術選定

### 3.1 E2Eテストフレームワーク: Playwright

**選定理由:**
- 既にプロジェクトに導入済み（`@playwright/test`）
- クロスブラウザ対応（Chromium, Firefox, WebKit）
- スクリーンショット機能が標準搭載
- GitHub Actionsとの統合が容易
- TypeScript完全サポート

**代替案:**
- Cypress: Playwrightより遅い、スクリーンショット機能が弱い
- Puppeteer: テストフレームワークではない、アサーション機能が弱い

### 3.2 Lighthouse CI: @lhci/cli

**選定理由:**
- Google公式のLighthouse CLI
- GitHub Actionsとの統合が容易
- JSON出力でスコアをパース可能
- 無料で使える

**代替案:**
- Lighthouse CI Server: セルフホスト必要、オーバーキル
- WebPageTest: API制限あり、レスポンスが遅い

### 3.3 CI/CD: GitHub Actions

**選定理由:**
- 既にプロジェクトで使用中
- Amplifyとの統合が容易
- Artifactsでスクリーンショット保存可能
- 無料枠で十分

## 4. データモデル

### 4.1 Playwright Test Results

```typescript
// src/tests/e2e/types.ts
export interface SectionVisibility {
  name: string
  selector: string
  isVisible: boolean
}

export interface ScreenshotResult {
  viewport: 'desktop' | 'mobile'
  path: string
  timestamp: string
}
```

### 4.2 Lighthouse Results

```typescript
// .github/scripts/lighthouse-types.ts
export interface LighthouseScore {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
}

export interface LighthouseResult {
  url: string
  scores: LighthouseScore
  timestamp: string
  passed: boolean
}
```

## 5. エラーハンドリング

### 5.1 Playwright E2E

**エラーケース:**
1. セクションが見つからない → `waitForSelector`でタイムアウト
2. スクリーンショット保存失敗 → ディレクトリ作成エラー
3. Dev server起動失敗 → `webServer`タイムアウト

**対処:**
- `retries: 2`（CI環境のみ）
- `timeout: 30000`（30秒）
- エラー時は`trace`を保存してArtifactsにアップロード

### 5.2 Lighthouse CI

**エラーケース:**
1. Amplifyデプロイ未完了 → Lighthouse実行失敗
2. 本番URLが404 → Lighthouse実行失敗
3. スコアが閾値未満 → CI失敗

**対処:**
- デプロイ完了を待つ（最大10分、30秒間隔でポーリング）
- リトライ3回
- スコアが閾値未満でもCI失敗させない（warning扱い）

## 6. セキュリティ考慮事項

### 6.1 環境変数

- `.env.local`は絶対にGitにコミットしない
- GitHub Secretsに機密情報を保存
- Playwright E2Eは環境変数不要（localhost:3000のみ）

### 6.2 Lighthouse CI

- 本番URLは公開されているため、セキュリティリスクなし
- GitHub Tokenは`GITHUB_TOKEN`（自動生成）を使用

## 7. パフォーマンス考慮事項

### 7.1 CI実行時間

- Playwright E2E: 約2-3分
- Lighthouse CI: 約3-5分
- 合計: 約5-8分（既存CI含む）

### 7.2 最適化

- Playwrightの`fullyParallel: true`で並列実行
- Lighthouseはmain pushのみ実行（PR時は実行しない）
- スクリーンショットは圧縮して保存

## 8. 実装の優先順位

1. **P0: LP表示崩れ修正** - ユーザー影響大
2. **P1: Playwright E2E** - 自動テストの基盤
3. **P2: Lighthouse CI** - パフォーマンス監視

## 9. 成功指標

- LP全セクションが正常表示される（100%）
- Playwright E2Eが全てパスする（100%）
- Lighthouse Performance ≥ 90
- PR毎のUI確認時間が50%削減（hanさんの手動確認時間）

## 10. 今後の拡張性

- ビジュアルリグレッションテスト追加
- A/Bテストのスクリーンショット比較
- Lighthouseスコアのトレンド可視化（Grafana/DataDog）
- E2Eテストのカバレッジ拡大（決済フロー等）
