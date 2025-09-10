'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'ホーム' },
    { href: '/book', label: '予約' },
    { href: '/pricing', label: '料金' },
    { href: '/access', label: 'アクセス' },
    { href: '/company', label: '会社概要' }
  ]

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100' 
          : 'bg-gray-900/95 backdrop-blur-md'
      )}
    >
      <div className="container-custom">
        <div className="h-16 lg:h-20 flex items-center justify-between">
          {/* ロゴ */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className={cn(
              "font-bold text-xl hidden sm:block transition-colors",
              isScrolled ? "text-gray-900" : "text-white"
            )}>
              {process.env.NEXT_PUBLIC_SITE_NAME || 'NDスタジオ'}
            </span>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href as any}
                className={cn(
                  "px-4 py-2 font-medium transition-all rounded-lg",
                  isScrolled 
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-50" 
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTAボタン */}
          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              size="md"
              className="hidden sm:inline-flex"
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            >
              <Link href="/book">今すぐ予約</Link>
            </Button>

            {/* モバイルメニューボタン */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                isScrolled 
                  ? "hover:bg-gray-100 text-gray-700" 
                  : "hover:bg-white/10 text-white"
              )}
              aria-label="メニュー"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        <div 
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-96' : 'max-h-0',
            isScrolled ? 'bg-white' : 'bg-gray-900'
          )}
        >
          <nav className="py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href as any}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg transition-colors",
                  isScrolled 
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-50" 
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Button variant="primary" size="lg" className="w-full">
                <Link href="/book">今すぐ予約</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}