import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center text-center px-4">
      <div>
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-brand-textDark mb-4">
          ご注文ありがとうございます！
        </h1>
        <p className="text-brand-textDark/60 text-lg mb-8">
          注文確認メールをお送りしました。<br />
          お届けまで今しばらくお待ちください。
        </p>
        <Link
          href="/"
          className="px-8 py-4 bg-brand-accent hover:bg-brand-accentHover text-white rounded-full text-lg font-medium transition-all"
        >
          トップページに戻る
        </Link>
      </div>
    </div>
  )
}
