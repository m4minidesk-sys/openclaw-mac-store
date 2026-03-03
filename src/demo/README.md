# OpenClaw デモ動画 自動制作ガイド

## 概要
Playwright + ffmpeg を使ってOpenClawの動作デモ動画を自動制作します。

## 必要なもの
- ffmpeg（`brew install ffmpeg`）
- Playwright（`pnpm install`で自動インストール）
- 録画対象のSlack/Discord/TelegramへのログインセッションCookies

## 実行手順

### 1. デモシナリオ録画
```bash
# Slackデモ録画
npx playwright test src/demo/scenarios/slack-scenario.ts --headed

# 録画ファイルは src/demo/output/slack-raw.webm に保存される
```

### 2. 字幕・BGM追加
```bash
cd src/demo
bash scripts/add-subtitles.sh slack
bash scripts/add-bgm.sh slack
```

### 3. 最終エクスポート
```bash
bash scripts/export-final.sh
# → src/demo/output/openclaw-demo-final.mp4
```

## シナリオ説明
- **slack-scenario.ts**: Slackで「タスク作って」と指示 → AIがGitHub Issueを自動作成
- **discord-scenario.ts**: Discordでコード生成を依頼 → 実行結果を返答
- **telegram-scenario.ts**: Telegramでドキュメントを送付 → 要約を返答

## カスタマイズ
- `subtitles/*.srt`: 字幕テキストを編集
- `scenarios/*.ts`: 操作シナリオを変更
