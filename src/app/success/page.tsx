import { Suspense } from 'react'
import { SuccessContent } from './SuccessContent'

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-bg flex items-center justify-center">
          <div className="text-brand-textDark">読み込み中...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
