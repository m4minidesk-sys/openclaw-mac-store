export const metadata = {
  title: '特定商取引法に基づく表記 | m4minidesk',
}

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f7] py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-12">特定商取引法に基づく表記</h1>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ['販売業者', '【記入予定】'],
              ['代表者名', '【記入予定】'],
              ['所在地', '【申請により開示します】'],
              ['電話番号', '【申請により開示します】'],
              ['メールアドレス', 'support@m4minidesk.com（準備中）'],
              ['販売価格', '各商品ページに記載（税込）'],
              ['商品代金以外の費用', '送料：全国一律 ¥1,500（税込）/ 沖縄・離島は別途'],
              ['支払方法', 'クレジットカード（Visa / Mastercard / American Express）'],
              ['支払時期', '注文確定時にご請求'],
              ['商品の引渡し時期', 'ご注文確定後、5〜10営業日以内に発送'],
              ['返品・キャンセルポリシー', '商品到着後7日以内・未開封の場合のみ返品可。お客様都合の返品は返送料をご負担いただきます。初期不良・動作不良の場合は30日以内に交換対応。'],
              ['動作環境', 'セットアップ済みmacOS環境を提供。インターネット接続環境が必要です。'],
            ].map(([key, value]) => (
              <tr key={key} className="border-b border-white/10">
                <th className="text-left py-4 pr-8 text-[#f5f5f7]/60 font-medium w-1/3 align-top">{key}</th>
                <td className="py-4 text-[#f5f5f7]/90 leading-relaxed">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
