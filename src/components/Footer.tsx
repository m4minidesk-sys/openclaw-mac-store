import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[#f5f5f7]/40 text-sm">© 2025 m4minidesk. All rights reserved.</span>
          <nav className="flex gap-6 text-sm text-[#f5f5f7]/40">
            <Link href="/legal" className="hover:text-[#f5f5f7]/70 transition-colors">特定商取引法表記</Link>
            <Link href="/privacy" className="hover:text-[#f5f5f7]/70 transition-colors">プライバシーポリシー</Link>
            <Link href="/terms" className="hover:text-[#f5f5f7]/70 transition-colors">利用規約</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
