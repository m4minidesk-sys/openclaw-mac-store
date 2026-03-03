interface HeroSectionProps {
  onCTAClick?: () => void
}

export function HeroSection({ onCTAClick }: HeroSectionProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onCTAClick) {
      e.preventDefault()
      onCTAClick()
    }
  }

  return (
    <section className="min-h-screen bg-brand-bg flex flex-col items-center justify-center text-center px-4 pt-16">
      <h1 className="text-5xl md:text-7xl font-bold text-brand-textDark leading-tight">
        AIエージェント搭載Mac、<br />届いたら即起動。
      </h1>
      <p className="mt-6 text-xl text-brand-textMuted max-w-2xl">
        OpenClaw プリインストール済み。電源を入れたその日から、AIが働く。
      </p>
      <a
        href="#product-lineup"
        onClick={handleClick}
        className="mt-10 inline-block px-8 py-4 bg-brand-accentBtn hover:bg-brand-accentHover text-white rounded-full text-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        今すぐ注文する →
      </a>
    </section>
  )
}
