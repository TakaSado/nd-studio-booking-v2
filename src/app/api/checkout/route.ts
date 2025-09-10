import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'
import { calcPricing } from '@/domain/pricing'

export async function POST(req: NextRequest) {
  const { bookingId, customer, startISO, endISO } = await req.json()
  if (!bookingId || !customer) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  // 本来は lock/再計算/booking レコード作成まで実施
  const pricing = calcPricing(startISO, endISO)
  const session = await createCheckoutSession({
    bookingId,
    amountYenTaxIncluded: pricing.amountTaxIncluded,
    customer,
    startISO,
    endISO
  })
  return NextResponse.json({ url: session.url })
}

