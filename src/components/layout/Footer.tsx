import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    サービス: [
      { href: '/book', label: '予約する' },
      { href: '/pricing', label: '料金プラン' },
      { href: '/access', label: 'アクセス' }
    ],
    サポート: [
      { href: '/legal/terms', label: '利用規約' },
      { href: '/legal/privacy', label: 'プライバシーポリシー' },
      { href: '/legal/cancel', label: 'キャンセルポリシー' }
    ],
    会社情報: [
      { href: '/company', label: '会社概要' },
      { href: '/legal/tokushoho', label: '特定商取引法' }
    ]
  }

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-100 mt-auto">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* ブランド */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                {process.env.NEXT_PUBLIC_SITE_NAME || 'NDスタジオ'}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              クリエイティブな空間で、あなたのアイデアを実現しましょう。
            </p>
            <div className="flex space-x-3">
              {/* ソーシャルメディアアイコン */}
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* リンクセクション */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href as any}
                      className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 下部セクション */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} NDPromotion. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href="/legal/terms" 
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                利用規約
              </Link>
              <Link 
                href="/legal/privacy" 
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                プライバシー
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}