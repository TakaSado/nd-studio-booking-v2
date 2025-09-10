import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function AccessPage() {
  const accessInfo = {
    address: '東京都渋谷区〇〇1-2-3 NDビル 5F',
    nearestStation: '〇〇線 〇〇駅',
    walkTime: '徒歩5分',
    businessHours: '24時間365日（無人運営）',
    parking: '近隣コインパーキングをご利用ください'
  }

  const transportOptions = [
    {
      line: 'JR山手線',
      station: '渋谷駅',
      exit: '南口',
      time: '徒歩8分'
    },
    {
      line: '東京メトロ副都心線',
      station: '渋谷駅',
      exit: '13番出口',
      time: '徒歩5分'
    },
    {
      line: '東急東横線',
      station: '渋谷駅',
      exit: '西口',
      time: '徒歩7分'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom py-20">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">アクセス</h1>
          <p className="text-xl text-gray-700 font-medium">便利な立地で快適にご利用いただけます</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* 地図エリア */}
          <Card variant="elevated" className="h-[500px]">
            <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-700 font-semibold">Google Maps</p>
                <p className="text-sm text-gray-600 mt-2">地図が表示されます</p>
              </div>
            </div>
          </Card>

          {/* アクセス情報 */}
          <div className="space-y-6">
            <Card variant="bordered">
              <CardHeader>
                <CardTitle className="text-xl">スタジオ情報</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-700 font-semibold mb-1">住所</dt>
                    <dd className="text-gray-900 font-bold">{accessInfo.address}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-700 font-semibold mb-1">最寄駅</dt>
                    <dd className="text-gray-900 font-bold">{accessInfo.nearestStation} {accessInfo.walkTime}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-700 font-semibold mb-1">営業時間</dt>
                    <dd className="text-gray-900 font-bold">{accessInfo.businessHours}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-700 font-semibold mb-1">駐車場</dt>
                    <dd className="text-gray-900 font-bold">{accessInfo.parking}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardHeader>
                <CardTitle className="text-xl">交通アクセス</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {transportOptions.map((option, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-gray-900">{option.line} {option.station}</div>
                        <div className="text-gray-600 text-sm">{option.exit} より{option.time}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* アクセス時の注意事項 */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center">
                <svg className="w-6 h-6 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ご来場時のお願い
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  <span className="text-gray-700 font-semibold">予約時間の5分前からご入室いただけます</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  <span className="text-gray-700 font-semibold">Akerunアプリを事前にインストールしてください</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  <span className="text-gray-700 font-semibold">建物入口のインターホンで「501」を押してください</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  <span className="text-gray-700 font-semibold">お車でお越しの方は事前に駐車場をご確認ください</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/book">
            <Button size="xl" variant="primary">
              スタジオを予約する
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}