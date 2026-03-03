#!/bin/bash
# 全シナリオを結合して最終動画を出力
echo "🎬 最終デモ動画を生成中..."

VIDEOS=""
for SCENARIO in slack discord telegram; do
  FILE="output/${SCENARIO}-with-bgm.mp4"
  if [ -f "$FILE" ]; then
    VIDEOS="$VIDEOS -i $FILE"
    echo "  ✅ $FILE"
  else
    echo "  ⚠️ $FILE が見つかりません（スキップ）"
  fi
done

if [ -z "$VIDEOS" ]; then
  echo "❌ 結合する動画がありません"
  exit 1
fi

# 動画の結合
INPUT_COUNT=$(echo "$VIDEOS" | tr -cd '\-' | wc -c)
ffmpeg $VIDEOS \
  -filter_complex "concat=n=${INPUT_COUNT}:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" \
  output/openclaw-demo-final.mp4

echo "✅ 最終動画: output/openclaw-demo-final.mp4"
