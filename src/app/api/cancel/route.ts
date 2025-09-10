import { NextRequest, NextResponse } from 'next/server'
import { getBookingAdmin, upsertBookingAdmin } from '@/lib/bookings'
import { evaluateCancelPolicy } from '@/domain/cancelPolicy'

export async function POST(req: NextRequest) {
  const { bookingId, reason } = await req.json()
  if (!bookingId) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  const booking = await getBookingAdmin(bookingId)
  if (!booking) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  const outcome = evaluateCancelPolicy(new Date().toISOString(), booking.start)
  const refund = Math.round(booking.amountTaxIncluded * outcome.refundRatio)
  // TODO: Stripe Refund 実行、Calendar Event 削除、Akerun 取消、Gmail/Slack 通知
  await upsertBookingAdmin(bookingId, { status: 'canceled' })
  return NextResponse.json({ ok: true, refundYen: refund })
}

