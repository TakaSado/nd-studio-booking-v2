import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function PricingPage() {
  const paymentMethods = [
    { icon: '💳', name: 'Visa' },
    { icon: '💳', name: 'MasterCard' },
    { icon: '💳', name: 'JCB' }
  ]

  const cancellationPolicy = [
    { time: '24時間前まで', rate: '無料', color: 'text-green-600' },
    { time: '12時間前まで', rate: '50%', color: 'text-yellow-600' },
    { time: '12時間以内', rate: '100%', color: 'text-red-600' }
  ]

  const equipment = [
    { icon: '💡', name: '照明設備', description: 'プロ仕様のLED照明完備' },
    { icon: '📷', name: '撮影機材', description: '三脚・レフ板など基本機材' },
    { icon: '🌐', name: '高速Wi-Fi', description: '光回線で安定接続' },
    { icon: '🔌', name: '電源設備', description: '豊富なコンセント' },
    { icon: '🎨', name: '背景', description: '各種背景紙・グリーンバック' },
    { icon: '☕', name: 'アメニティ', description: '給湯設備・休憩スペース' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom py-20">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">料金プラン</h1>
          <p className="text-xl text-gray-700 font-medium">シンプルな時間制料金</p>
        </div>

        {/* メイン料金カード */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card variant="elevated" className="border-2 border-primary-500">
            <CardContent className="text-center py-12">
              <div className="mb-8">
                <p className="text-gray-700 font-semibold text-lg mb-2">スタジオ利用料金</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-6xl font-bold text-gray-900">¥5,500</span>
                  <span className="text-2xl text-gray-700 font-medium">/ 時間</span>
                </div>
                <p className="text-gray-600 mt-2">（税込）</p>
              </div>
              
              <div className="bg-primary-50 rounded-xl p-6 mb-8">
                <p className="text-primary-900 font-bold text-lg mb-2">24時間365日利用可能</p>
                <p className="text-primary-700">完全無人運営・スマートロック対応</p>
              </div>

              <Link href="/book">
                <Button size="xl" variant="primary" className="min-w-[300px]">
                  スタジオを予約する
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* お支払い方法とキャンセルポリシー */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* お支払い方法 */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <span className="text-2xl">💳</span>
                お支払い方法
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-gray-900 mb-3">ご利用可能なクレジットカード</p>
                  <div className="flex gap-4 mb-4">
                    {paymentMethods.map((method, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
                        <span className="font-semibold text-gray-800">{method.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-800 font-semibold">Stripeによる安全な決済</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-800 font-semibold">領収書発行可能</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mt-4">
                  <p className="text-blue-800 text-sm font-medium">
                    <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    SSL暗号化通信で安全
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* キャンセルポリシー */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <span className="text-2xl">📋</span>
                キャンセルポリシー
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cancellationPolicy.map((policy, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="font-bold text-gray-900">{policy.time}</span>
                    <span className={`font-bold text-xl ${policy.color}`}>{policy.rate}</span>
                  </div>
                ))}
                
                <div className="bg-yellow-50 rounded-lg p-4 mt-4 border border-yellow-200">
                  <p className="text-yellow-800 text-sm font-medium">
                    <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    キャンセル料金は予約時間に対して発生します
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 設備情報 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">料金に含まれる設備</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {equipment.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{item.name}</h3>
                <p className="text-xs text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 追加情報 */}
        <Card variant="glass" className="max-w-3xl mx-auto">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">その他のご案内</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl mb-2">⏰</div>
                <p className="font-bold text-gray-900">最低利用時間</p>
                <p className="text-gray-700">1時間から</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📅</div>
                <p className="font-bold text-gray-900">予約単位</p>
                <p className="text-gray-700">1時間単位</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🔧</div>
                <p className="font-bold text-gray-900">機材破損時</p>
                <p className="text-gray-700">実費負担</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-700 font-medium mb-4">ご不明な点がございましたらお気軽にお問い合わせください</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="xl" variant="primary" className="min-w-[200px]">
                今すぐ予約する
              </Button>
            </Link>
            <Link href="/access">
              <Button size="xl" variant="outline" className="min-w-[200px]">
                アクセス情報を見る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}