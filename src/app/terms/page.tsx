export const metadata = {
  title: '利用規約 | m4minidesk',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f7] py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">利用規約</h1>
        <p className="text-[#f5f5f7]/60 mb-12">最終更新: 2025年</p>

        {[
          {
            title: '1. サービス概要',
            body: `m4minidesk（以下「当社」）は、OpenClawをプリインストールしたMacコンピュータの販売サービス（以下「本サービス」）を提供します。本規約に同意の上、ご利用ください。`,
          },
          {
            title: '2. 購入・支払い',
            body: `商品の購入にはStripe決済をご利用いただきます。注文確定後のキャンセルは原則お受けできません。商品到着後7日以内・未開封の場合のみ返品対応します。`,
          },
          {
            title: '3. OpenClawについて',
            body: `本商品にプリインストールされているOpenClawはElastic License v2（ELv2）の下でライセンスされています。商用サービスとして再頒布・提供する行為は禁止されています。詳細はOpenClaw公式サイトのライセンス条項をご確認ください。AIモデルの利用にはAnthropicまたは各AIプロバイダーとの別途契約・APIキーが必要です。`,
          },
          {
            title: '4. 禁止事項',
            body: `① 本商品の転売・再頒布\n② 違法行為への使用\n③ 当社または第三者を害する目的での使用\n④ 本規約に違反する行為`,
          },
          {
            title: '5. 免責事項',
            body: `当社は、AIエージェントの出力内容・精度について保証しません。本サービスの利用により生じた損害について、当社は法令の定める範囲を超えた責任を負いません。`,
          },
          {
            title: '6. 知的財産権',
            body: `本サービスに関する知的財産権は当社または正当な権利者に帰属します。`,
          },
          {
            title: '7. 規約の変更',
            body: `当社は本規約を予告なく変更する場合があります。変更後はサイト上に掲載された時点で効力が生じます。`,
          },
          {
            title: '8. 準拠法・管轄',
            body: `本規約は日本法に準拠します。本サービスに関する紛争は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。`,
          },
        ].map(({ title, body }) => (
          <section key={title} className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-[#f5f5f7]">{title}</h2>
            <p className="text-[#f5f5f7]/80 leading-relaxed whitespace-pre-line">{body}</p>
          </section>
        ))}
      </div>
    </main>
  )
}
