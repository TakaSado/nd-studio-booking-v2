import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-16">
      <div className="container-padded py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} NDPromotion</div>
        <nav className="flex items-center gap-4">
          <Link href="/legal/terms">利用規約</Link>
          <Link href="/legal/privacy">プライバシー</Link>
          <Link href="/legal/cancel">キャンセル</Link>
          <Link href="/legal/tokushoho">特商法</Link>
        </nav>
      </div>
    </footer>
  )
}

