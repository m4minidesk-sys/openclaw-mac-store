#!/bin/bash
# Usage: bash add-bgm.sh <scenario_name>
SCENARIO=${1:-slack}
INPUT="output/${SCENARIO}-with-subs.mp4"
# BGMはフリー素材をダウンロードして assets/bgm.mp3 に配置してください
BGM="assets/bgm.mp3"
OUTPUT="output/${SCENARIO}-with-bgm.mp4"

if [ ! -f "$BGM" ]; then
  echo "⚠️ BGMファイルが見つかりません: $BGM"
  echo "   フリー素材サイトから bgm.mp3 をダウンロードして assets/ に配置してください"
  echo "   推奨: https://bgm-free.com"
  # BGMなしでコピー
  cp "$INPUT" "$OUTPUT"
  exit 0
fi

echo "🎵 BGM追加: $SCENARIO"
ffmpeg -i "$INPUT" -i "$BGM" \
  -filter_complex "[1:a]volume=0.15[bgm];[0:a][bgm]amix=inputs=2:duration=first[aout]" \
  -map 0:v -map "[aout]" \
  -c:v copy \
  "$OUTPUT"

echo "✅ 完了: $OUTPUT"
