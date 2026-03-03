'use client'

import * as Accordion from '@radix-ui/react-accordion'

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'OpenClawとは？',
    answer:
      'OpenClaw は、Mac上で動作するAIエージェントプラットフォームです。Slack、GitHub、各種APIと連携し、タスクを自律的に実行します。プリインストール済みなので、電源を入れたその日から使い始められます。',
  },
  {
    id: 'faq-2',
    question: 'セットアップ内容は？',
    answer:
      'OpenClawのインストール・初期設定済みです。Slack連携、GitHub連携、AIモデル（Claude等）の設定サポートを30日間提供します。詳細はご購入後にお送りするセットアップガイドをご確認ください。',
  },
  {
    id: 'faq-3',
    question: '返品・交換は？',
    answer:
      '商品到着後7日以内に限り、未開封・未使用の場合のみ返品・交換を承ります。開封済みの場合は初期不良に限り対応いたします。詳細はお問い合わせフォームよりご連絡ください。',
  },
  {
    id: 'faq-4',
    question: '支払い方法は？',
    answer:
      'クレジットカード（Visa / Mastercard / American Express / JCB）、銀行振込に対応しています。分割払いは一部カードでご利用いただけます。',
  },
]

interface FAQSectionProps {
  items?: typeof FAQ_ITEMS
}

export function FAQSection({ items = FAQ_ITEMS }: FAQSectionProps) {
  return (
    <section className="bg-brand-bgSection py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-brand-textDark text-center mb-16">
          よくある質問
        </h2>
        <Accordion.Root type="single" collapsible className="space-y-3">
          {items.map((item) => (
            <Accordion.Item
              key={item.id}
              value={item.id}
              className="border border-brand-border rounded-xl overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between px-6 py-5 text-left text-brand-textDark font-medium hover:bg-white/5 transition-colors group">
                  <span>{item.question}</span>
                  <span className="text-brand-textMuted transition-transform group-data-[state=open]:rotate-180">
                    ▼
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-6 pb-5 text-brand-textMuted leading-relaxed data-[state=open]:animate-none">
                {item.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
