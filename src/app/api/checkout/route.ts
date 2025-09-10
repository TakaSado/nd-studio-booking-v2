import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'
import { calcPricing } from '@/domain/pricing'
import { createBooking, isLockValid } from '@/lib/bookings'

export async function POST(req: NextRequest) {
  const { bookingId, customer, startISO, endISO } = await req.json()
  if (!bookingId || !customer || !startISO || !endISO) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  // ロック検証
  const lockOk = await isLockValid(bookingId)
  if (!lockOk) return NextResponse.json({ error: 'lock_expired' }, { status: 409 })
  // 料金再計算 & pending 予約レコード（クライアント SDK 経由）
  const pricing = calcPricing(startISO, endISO)
  await createBooking({
    id: bookingId,
    start: startISO,
    end: endISO,
    durationHours: pricing.durationHours,
    amountTaxExcluded: pricing.amountTaxExcluded,
    taxAmount: pricing.taxAmount,
    amountTaxIncluded: pricing.amountTaxIncluded,
    status: 'pending',
    customer
  })
  const session = await createCheckoutSession({
    bookingId,
    amountYenTaxIncluded: pricing.amountTaxIncluded,
    customer,
    startISO,
    endISO
  })
  return NextResponse.json({ url: session.url })
}

