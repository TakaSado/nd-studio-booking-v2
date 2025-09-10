import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="container-padded h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">{process.env.NEXT_PUBLIC_SITE_NAME || 'NDスタジオ予約'}</Link>
        <nav className="flex items-center gap-4 text-sm text-gray-700">
          <Link href="/">ギャラリー</Link>
          <Link href="/book">予約</Link>
          <Link href="/pricing">料金・設備</Link>
          <Link href="/access">アクセス</Link>
          <Link href="/company">会社概要</Link>
        </nav>
        <Link href="/book" className="rounded-2xl px-3 py-1.5 bg-black text-white text-sm">今すぐ予約</Link>
      </div>
    </header>
  )
}

