# UI レビュー自動化 + LP表示崩れ修正 — Requirements

## 背景
openclaw-mac-store（Next.js 14 + Tailwind CSS + AWS Amplify）のLPに表示崩れが発生。
Tailwindカスタムカラー（brand.*）がAmplifyビルドで解決されない可能性あり。
また、UIの品質チェックを人手に依存しており、PRごとにhanさんが手動確認している。

## 解決したい問題
1. LP表示崩れ: HeroSectionのみ表示でFeaturesSection/PricingTable/FAQ/Footerが不表示
2. Tailwindカスタムカラー `brand.*` がAmplifyビルドで機能しているか不明
3. PR毎のUI品質確認が属人化・手動依存

## 要件

### REQ-1: LP表示崩れ修正
- HeroSection / FeaturesSection / PricingTable / FAQSection / Footer が全て表示される
- 各セクションが正しい背景色・テキスト色で表示される
- モバイル（375px）・デスクトップ（1280px）両方で正常表示

### REQ-2: Tailwindカスタムカラー問題の解消
- `brand.bg` / `brand.accent` / `brand.textDark` 等が確実にビルドされる
- Amplify本番ビルドでもカスタムカラーが適用される

### REQ-3: Playwright E2Eスクリーンショットテスト
- `src/tests/e2e/screenshot.spec.ts` を追加
- LP全体のfullPage screenshot（desktop + mobile viewport）
- 各セクションのvisibility確認（HeroSection, FeaturesSection, PricingTable, FAQSection, Footer）
- GitHub ActionsのArtifactとしてスクリーンショットを保存

### REQ-4: Lighthouse CI
- `.github/workflows/lighthouse.yml` を追加
- 本番URL（https://main.d31242v30hmgzh.amplifyapp.com）に対してLighthouse計測
- PR時にスコアをGitHub PRコメントに自動投稿
- 閾値: Performance ≥ 90 / Accessibility ≥ 90 / Best Practices ≥ 90

### REQ-5: セクション表示Playwright確認テスト
- 各セクションが `isVisible()` であることをアサート
- テストはCI（GitHub Actions）で自動実行

## 技術スタック
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Vitest (unit) + Playwright (E2E)
- AWS Amplify デプロイ
- GitHub Actions CI

## 制約
- `.env.local` は絶対にGitにコミットしない
- Playwright E2Eテストはlocalhost:3000で実行（CI時はwebServerオプション）
- Lighthouseは本番URLに対して実行（PR mergeの後か、main pushの後）
