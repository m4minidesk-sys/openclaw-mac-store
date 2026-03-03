export const metadata = {
  title: 'プライバシーポリシー | m4minidesk',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f7] py-24 px-4">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-3xl font-bold mb-4">プライバシーポリシー</h1>
        <p className="text-[#f5f5f7]/60 mb-12">最終更新: 2025年</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. 収集する情報</h2>
          <p className="text-[#f5f5f7]/80 leading-relaxed">
            当サイトでは、商品のご購入にあたり以下の情報を収集します：
          </p>
          <ul className="list-disc pl-6 mt-2 text-[#f5f5f7]/80 space-y-1">
            <li>氏名・メールアドレス（注文確認・サポート対応のため）</li>
            <li>配送先住所（商品発送のため）</li>
            <li>決済情報（Stripe社が処理。当サイトはカード番号を保持しません）</li>
            <li>アクセスログ（サービス改善のため）</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. 利用目的</h2>
          <ul className="list-disc pl-6 text-[#f5f5f7]/80 space-y-1">
            <li>商品の発送・サポート対応</li>
            <li>注文確認・領収書の送付</li>
            <li>サービスの改善・統計分析</li>
            <li>法令に基づく対応</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. 第三者への提供</h2>
          <p className="text-[#f5f5f7]/80 leading-relaxed">
            収集した個人情報は、以下の場合を除き第三者へ提供しません：
          </p>
          <ul className="list-disc pl-6 mt-2 text-[#f5f5f7]/80 space-y-1">
            <li>決済処理のため Stripe, Inc. へ提供</li>
            <li>配送のため運送会社へ提供</li>
            <li>法令に基づく開示要請</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Cookieの使用</h2>
          <p className="text-[#f5f5f7]/80 leading-relaxed">
            当サイトはサービス向上のためCookieを使用する場合があります。ブラウザの設定でCookieを無効にすることができますが、一部機能が制限される場合があります。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. お問い合わせ</h2>
          <p className="text-[#f5f5f7]/80 leading-relaxed">
            個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。<br />
            メール: support@m4minidesk.com（準備中）
          </p>
        </section>
      </div>
    </main>
  )
}
