'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <main className="min-h-screen bg-brand-bg flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-4xl font-bold text-brand-textDark mb-4">
        ご注文ありがとうございます！
      </h1>
      <p className="text-brand-textDark/60 max-w-md mb-2">
        ご注文が確定しました。確認メールをお送りします。
      </p>
      {sessionId && (
        <p className="text-brand-textDark/40 text-sm mb-8">
          注文ID: {sessionId}
        </p>
      )}
      <Link
        href="/"
        className="px-6 py-3 bg-brand-accent hover:bg-brand-accentHover text-white rounded-full text-sm font-medium transition-all"
      >
        トップページへ戻る
      </Link>
    </main>
  )
}
