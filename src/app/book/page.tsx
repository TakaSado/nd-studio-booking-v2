'use client'

import React from 'react'
import { Stepper } from '@/components/ui/Stepper'
import { Button } from '@/components/ui/Button'
import { BookingWeekView } from '@/components/ui/BookingWeekView'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { DateTime } from 'luxon'

type Step = 0 | 1 | 2

export default function BookPage() {
  const [step, setStep] = React.useState<Step>(0)
  const [slot, setSlot] = React.useState<{ startISO: string; endISO: string } | null>(null)
  const [selectedDateTime, setSelectedDateTime] = React.useState<{ date: string; startTime: string; endTime: string } | null>(null)
  const [customer, setCustomer] = React.useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = React.useState(false)
  const [checkoutUrl, setCheckoutUrl] = React.useState<string | null>(null)
  const [statusMsg, setStatusMsg] = React.useState<string>('')
  const [statusType, setStatusType] = React.useState<'info' | 'success' | 'error'>('info')

  const steps = [
    { label: '日時選択', icon: '📅' },
    { label: 'お客様情報', icon: '👤' },
    { label: '確認・決済', icon: '💳' }
  ]

  // 選択された日時をslotに変換
  React.useEffect(() => {
    if (selectedDateTime && selectedDateTime.startTime && selectedDateTime.endTime) {
      const start = DateTime.fromISO(`${selectedDateTime.date}T${selectedDateTime.startTime}:00`)
      const end = DateTime.fromISO(`${selectedDateTime.date}T${selectedDateTime.endTime}:00`)
      setSlot({ startISO: start.toISO()!, endISO: end.toISO()! })
    } else {
      setSlot(null)
    }
  }, [selectedDateTime])

  async function proceedToCustomerInfo() {
    if (!slot) return
    
    // バックグラウンドで空き状況を確認
    try {
      const res = await fetch('/api/availability', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(slot) 
      })
      const data = await res.json()
      if (!data.available) {
        // 予約が埋まっていた場合、エラーメッセージを表示
        setStatusMsg('申し訳ありません、その時間は他の予約が入ってしまいました。別の時間をお選びください。')
        setStatusType('error')
        // カレンダーを更新するため、ページをリロード
        setTimeout(() => {
          window.location.reload()
        }, 3000)
        return
      }
      ;(window as any).__bookingId = data.bookingId
      // 問題なければ次のステップへ
      setStep(1)
      setStatusMsg('')
    } catch (error) {
      setStatusMsg('エラーが発生しました。もう一度お試しください。')
      setStatusType('error')
    }
  }

  async function createCheckout() {
    setLoading(true)
    setStatusMsg('決済セッションを作成中...')
    setStatusType('info')
    try {
      const bookingId = (window as any).__bookingId
      const res = await fetch('/api/checkout', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ 
          bookingId, 
          customer, 
          startISO: slot!.startISO, 
          endISO: slot!.endISO 
        }) 
      })
      const data = await res.json()
      setCheckoutUrl(data.url)
      setStep(2)
      setStatusMsg('決済ページへ進む準備ができました。')
      setStatusType('success')
    } catch (error) {
      setStatusMsg('エラーが発生しました。もう一度お試しください。')
      setStatusType('error')
    } finally {
      setLoading(false)
    }
  }

  const formatDateTime = (iso: string) => {
    const date = new Date(iso)
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom py-10">
        {/* ヘッダー */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">スタジオ予約</h1>
          <p className="text-lg text-gray-700 font-medium">簡単3ステップで予約完了</p>
        </div>

        {/* ステッパー */}
        <div className="mb-10">
          <Stepper steps={steps} current={step} />
        </div>

        {/* メインコンテンツ */}
        <div className={step === 0 ? "max-w-6xl mx-auto" : "max-w-3xl mx-auto"}>
          {/* ステップ0: 日時選択 */}
          {step === 0 && (
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-2xl">ご利用日時を選択</CardTitle>
                <CardDescription className="text-gray-700">
                  週表示で予約状況を確認しながら、ご希望の時間帯をお選びください
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <BookingWeekView 
                    value={selectedDateTime} 
                    onChange={setSelectedDateTime}
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={proceedToCustomerInfo} 
                      disabled={!selectedDateTime}
                      size="lg"
                      rightIcon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      }
                    >
                      次へ進む
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ステップ1: お客様情報 */}
          {step === 1 && (
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-2xl">お客様情報の入力</CardTitle>
                <CardDescription className="text-gray-700">
                  予約に必要な情報をご入力ください
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input 
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="山田 太郎" 
                      value={customer.name} 
                      onChange={e => setCustomer({...customer, name: e.target.value})} 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input 
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      type="email"
                      placeholder="example@email.com" 
                      value={customer.email} 
                      onChange={e => setCustomer({...customer, email: e.target.value})} 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      電話番号 <span className="text-red-500">*</span>
                    </label>
                    <input 
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      type="tel"
                      placeholder="090-1234-5678" 
                      value={customer.phone} 
                      onChange={e => setCustomer({...customer, phone: e.target.value})} 
                    />
                  </div>
                  
                  <div className="flex gap-4 justify-between">
                    <Button 
                      variant="ghost" 
                      onClick={() => setStep(0)}
                      size="lg"
                      leftIcon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      }
                    >
                      戻る
                    </Button>
                    <Button 
                      onClick={createCheckout} 
                      disabled={loading || !customer.name || !customer.email || !customer.phone}
                      isLoading={loading}
                      size="lg"
                      rightIcon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      }
                    >
                      決済へ進む
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ステップ2: 確認・決済 */}
          {step === 2 && (
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-2xl">予約内容の確認</CardTitle>
                <CardDescription className="text-gray-700">
                  以下の内容で決済ページへ進みます
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 予約サマリー */}
                  <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">日時</p>
                      <p className="font-semibold">
                        {slot && `${formatDateTime(slot.startISO)} 〜 ${formatDateTime(slot.endISO)}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">お名前</p>
                      <p className="font-semibold">{customer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">メールアドレス</p>
                      <p className="font-semibold">{customer.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">電話番号</p>
                      <p className="font-semibold">{customer.phone}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-700 mb-4">
                      Stripeの安全な決済ページで支払いを完了してください
                    </p>
                    {checkoutUrl && (
                      <a href={checkoutUrl}>
                        <Button 
                          size="xl" 
                          variant="primary"
                          className="min-w-[250px]"
                          rightIcon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          }
                        >
                          Stripeで支払う
                        </Button>
                      </a>
                    )}
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    <p>セキュアな決済はStripeにより処理されます</p>
                    <p className="mt-1">
                      <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      SSL暗号化通信
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ステータスメッセージ */}
          {statusMsg && (
            <div className={cn(
              'mt-6 p-4 rounded-xl flex items-start gap-3',
              statusType === 'success' && 'bg-green-50 text-green-800 border border-green-200',
              statusType === 'error' && 'bg-red-50 text-red-800 border border-red-200',
              statusType === 'info' && 'bg-blue-50 text-blue-800 border border-blue-200'
            )}>
              {statusType === 'success' && (
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {statusType === 'error' && (
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {statusType === 'info' && (
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              )}
              <p>{statusMsg}</p>
            </div>
          )}

          {/* サポート情報 */}
          <div className="mt-10 text-center text-sm text-gray-700">
            <p>お困りの場合はお気軽にお問い合わせください</p>
            <p className="mt-1">
              📞 {process.env.NEXT_PUBLIC_SUPPORT_PHONE || '03-1234-5678'} | 
              ✉️ {process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@ndstudio.jp'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}