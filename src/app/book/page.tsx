"use client"
import React from 'react'
import { Stepper } from '@/components/ui/Stepper'
import { Button } from '@/components/ui/Button'
import { CalendarPicker } from '@/components/ui/CalendarPicker'

type Step = 0 | 1 | 2

export default function BookPage() {
  const [step, setStep] = React.useState<Step>(0)
  const [slot, setSlot] = React.useState<{ startISO: string; endISO: string } | null>(null)
  const [customer, setCustomer] = React.useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = React.useState(false)
  const [checkoutUrl, setCheckoutUrl] = React.useState<string | null>(null)
  const [statusMsg, setStatusMsg] = React.useState<string>('')

  const steps = [
    { label: '日時選択' },
    { label: 'お客様情報' },
    { label: '確認/決済' }
  ]

  async function checkAvailability() {
    if (!slot) return
    setLoading(true)
    setStatusMsg('空き状況を確認中...')
    try {
      const res = await fetch('/api/availability', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(slot) })
      const data = await res.json()
      if (!data.available) {
        setStatusMsg('申し訳ありません、その時間は埋まっています。別時間をお試しください。')
        return
      }
      ;(window as any).__bookingId = data.bookingId
      setStep(1)
      setStatusMsg('空きあり。次へお進みください。')
    } finally {
      setLoading(false)
    }
  }

  async function createCheckout() {
    setLoading(true)
    setStatusMsg('決済セッションを作成中...')
    try {
      const bookingId = (window as any).__bookingId
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bookingId, customer, startISO: slot!.startISO, endISO: slot!.endISO }) })
      const data = await res.json()
      setCheckoutUrl(data.url)
      setStep(2)
      setStatusMsg('Stripe へ遷移できます。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container-padded py-10">
      <div className="mb-6">
        <Stepper steps={steps} current={step} />
      </div>

      {step === 0 && (
        <div className="space-y-4">
          <CalendarPicker value={slot} onChange={setSlot} />
          <div>
            <Button onClick={checkAvailability} disabled={!slot || loading}>空き照会</Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4 max-w-lg">
          <input className="w-full border rounded-2xl px-3 py-2" placeholder="氏名" value={customer.name} onChange={e=>setCustomer({...customer, name: e.target.value})} />
          <input className="w-full border rounded-2xl px-3 py-2" placeholder="メール" value={customer.email} onChange={e=>setCustomer({...customer, email: e.target.value})} />
          <input className="w-full border rounded-2xl px-3 py-2" placeholder="電話" value={customer.phone} onChange={e=>setCustomer({...customer, phone: e.target.value})} />
          <div className="flex gap-3">
            <Button variant="ghost" onClick={()=>setStep(0)}>戻る</Button>
            <Button onClick={createCheckout} disabled={loading || !customer.name || !customer.email || !customer.phone}>決済へ</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p>以下のボタンで Stripe Checkout に進みます。</p>
          {checkoutUrl && <a className="inline-block" href={checkoutUrl}><Button>Stripe へ進む</Button></a>}
        </div>
      )}

      <p className="mt-8 text-sm text-gray-500">{statusMsg}</p>
      <p className="mt-2 text-xs text-gray-400">緊急連絡先: {process.env.NEXT_PUBLIC_SITE_NAME} 運営 / {process.env.NEXT_PUBLIC_SUPPORT_PHONE} / {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</p>
    </main>
  )
}

