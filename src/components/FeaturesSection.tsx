const FEATURES = [
  { icon: '⚡️', title: 'セットアップ不要', desc: 'OpenClaw + AIエージェント設定済み。箱を開けて電源を入れるだけ。' },
  { icon: '🔒', title: '30日サポート付き', desc: '購入後30日間、使い方から設定まで安心サポート。' },
  { icon: '🚀', title: '即日利用可能', desc: '届いたその日から本番稼働。セットアップ時間ゼロ。' },
]

export function FeaturesSection() {
  return (
    <section className="bg-brand-bgSection py-24 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {FEATURES.map((f) => (
          <div key={f.title} className="text-center p-8 rounded-2xl border border-brand-border hover:border-brand-accent transition-colors">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold text-brand-textDark mb-2">{f.title}</h3>
            <p className="text-brand-textMuted">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
