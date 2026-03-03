#!/bin/bash
# Usage: bash add-subtitles.sh <scenario_name>
# Example: bash add-subtitles.sh slack

SCENARIO=${1:-slack}
INPUT="output/${SCENARIO}-raw.mp4"
SUBTITLES="subtitles/${SCENARIO}.srt"
OUTPUT="output/${SCENARIO}-with-subs.mp4"

if [ ! -f "$INPUT" ]; then
  echo "❌ Input file not found: $INPUT"
  echo "   先にデモ録画を実行してください"
  exit 1
fi

echo "📝 字幕追加: $SCENARIO"
ffmpeg -i "$INPUT" \
  -vf "subtitles=${SUBTITLES}:force_style='FontName=Hiragino Sans,FontSize=24,PrimaryColour=&Hffffff,OutlineColour=&H000000,BackColour=&H80000000,Bold=1,Alignment=2'" \
  -c:a copy \
  "$OUTPUT"

echo "✅ 完了: $OUTPUT"
