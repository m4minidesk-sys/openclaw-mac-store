'use client'
import { useState } from 'react'

const FAQS = [
  { q: 'OpenClawとは何ですか？', a: 'OpenClawはAIエージェントを動かすためのプラットフォームです。Claude等のAIモデルと連携し、タスクを自律的にこなすエージェントをMac上で動かせます。' },
  { q: 'セットアップ内容は？', a: 'OpenClawのインストール・設定、初期エージェント設定、動作確認まで完了した状態でお届けします。電源を入れるだけで使い始められます。' },
  { q: '返品・交換は可能ですか？', a: '商品到着後7日以内に未開封の場合に限り返品対応します。動作不良の場合は30日以内に交換対応します。' },
  { q: '支払い方法は？', a: 'クレジットカード（Visa / Mastercard / American Express）に対応しています。Stripe決済で安全にお支払いいただけます。' },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="bg-brand-bg py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-brand-textDark text-center mb-12">よくある質問</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-brand-border rounded-2xl overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 text-brand-textDark font-medium flex justify-between items-center hover:bg-white/5 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <span className="text-brand-accent">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-brand-textDark/70 text-sm leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
