import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <main>
      <section className="relative">
        <div className="h-[60vh] bg-gradient-to-b from-gray-100 to-white flex items-center">
          <div className="container-padded">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight mb-4">NDスタジオ予約</h1>
              <p className="text-gray-600 mb-6">モノトーン × 淡いパステルの軽快な UI。24/365 無人運用。</p>
              <Link href="/book"><Button>今すぐ予約</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-padded py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-soft bg-gray-100 aspect-video" />
          ))}
        </div>
      </section>
    </main>
  )
}

