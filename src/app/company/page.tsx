import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function CompanyPage() {
  const companyInfo = {
    name: 'NDPromotion 株式会社',
    established: '2020年4月',
    capital: '1,000万円',
    ceo: '山田 太郎',
    employees: '15名',
    address: '東京都渋谷区〇〇1-2-3 NDビル',
    tel: '03-1234-5678',
    email: 'info@ndpromotion.jp',
    business: [
      'スタジオ運営事業',
      '撮影支援・機材レンタル',
      'クリエイター支援サービス',
      'オンラインコンテンツ制作'
    ]
  }

  const values = [
    {
      icon: '🎯',
      title: 'ミッション',
      description: 'すべてのクリエイターに最高の創作環境を提供し、新しい価値を生み出すお手伝いをします。'
    },
    {
      icon: '🌟',
      title: 'ビジョン',
      description: '日本のクリエイティブ産業を支える、信頼されるインフラとなることを目指します。'
    },
    {
      icon: '💎',
      title: 'バリュー',
      description: '革新性、利便性、安全性を重視し、常にユーザーファーストのサービスを提供します。'
    }
  ]

  const history = [
    { year: '2020年', event: 'NDPromotion株式会社設立' },
    { year: '2021年', event: '第1号スタジオオープン' },
    { year: '2022年', event: '無人運営システム導入' },
    { year: '2023年', event: 'オンライン予約システムリリース' },
    { year: '2024年', event: '累計利用者数10,000人突破' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom py-20">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">会社概要</h1>
          <p className="text-xl text-gray-700 font-medium">クリエイターの創造性を支えるパートナー</p>
        </div>

        {/* 会社情報 */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-2xl">会社情報</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm text-gray-700 mb-1 font-semibold">会社名</dt>
                  <dd className="text-gray-900 font-bold text-lg">{companyInfo.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-700 mb-1 font-semibold">設立</dt>
                  <dd className="text-gray-900 font-bold text-lg">{companyInfo.established}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-700 mb-1 font-semibold">資本金</dt>
                  <dd className="text-gray-900 font-bold text-lg">{companyInfo.capital}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-700 mb-1 font-semibold">代表取締役</dt>
                  <dd className="text-gray-900 font-bold text-lg">{companyInfo.ceo}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-700 mb-1 font-semibold">従業員数</dt>
                  <dd className="text-gray-900 font-bold text-lg">{companyInfo.employees}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-700 mb-1 font-semibold">所在地</dt>
                  <dd className="text-gray-900 font-bold text-lg">{companyInfo.address}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-700 mb-1 font-semibold">電話番号</dt>
                  <dd className="text-gray-900 font-bold text-lg">{companyInfo.tel}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-700 mb-1 font-semibold">メールアドレス</dt>
                  <dd className="text-gray-900 font-bold text-lg">{companyInfo.email}</dd>
                </div>
              </dl>
              <div className="mt-8 pt-8 border-t">
                <dt className="text-sm text-gray-700 mb-3 font-semibold">事業内容</dt>
                <dd>
                  <ul className="space-y-2">
                    {companyInfo.business.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span className="text-gray-800 font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ミッション・ビジョン・バリュー */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">私たちの価値観</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} hover>
                <div className="text-center">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 沿革 */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">沿革</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              {history.map((item, index) => (
                <div key={index} className="relative flex items-start mb-8">
                  <div className="absolute left-8 w-4 h-4 bg-primary-500 rounded-full -translate-x-1/2 mt-1.5"></div>
                  <div className="ml-20">
                    <div className="text-sm text-gray-700 font-semibold mb-1">{item.year}</div>
                    <div className="text-gray-900 font-bold">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* お問い合わせCTA */}
        <Card variant="glass" className="text-center">
          <CardContent className="py-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">お問い合わせ</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              スタジオのご利用や企業様との提携など、お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" variant="primary">
                  スタジオを予約する
                </Button>
              </Link>
              <a href={`mailto:${companyInfo.email}`}>
                <Button size="lg" variant="outline">
                  お問い合わせ
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}