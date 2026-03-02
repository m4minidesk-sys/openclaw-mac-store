interface HeaderProps {
  className?: string
}

export function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`fixed top-0 w-full z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border ${className}`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-brand-textDark font-semibold text-lg">m4minidesk</span>
        <nav>
          <a href="#products" className="text-brand-textDark/70 hover:text-brand-textDark text-sm transition-colors">
            商品
          </a>
        </nav>
      </div>
    </header>
  )
}
