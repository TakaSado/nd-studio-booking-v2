import { NextRequest, NextResponse } from 'next/server'
import { getBookingAdmin } from '@/lib/bookings'
import { freeBusy } from '@/lib/googleCalendar'
import { stripe, createCheckoutSession } from '@/lib/stripe'
import { DateTime } from 'luxon'

export async function POST(req: NextRequest) {
  const { bookingId, addHours } = await req.json()
  const add = Number(addHours)
  if (!bookingId || !add || add < 1) return NextResponse.json({ error: 'invalid' }, { status: 400 })

  const booking = await getBookingAdmin(bookingId)
  if (!booking || booking.status !== 'confirmed') return NextResponse.json({ error: 'not_confirmed' }, { status: 400 })

  const currentEnd = DateTime.fromISO(booking.end)
  const newEnd = currentEnd.plus({ hours: add })
  // 空き確認（末尾連結範囲）
  const fb = await freeBusy(currentEnd.toISO()!, newEnd.toISO()!)
  if (fb.busy.length > 0) return NextResponse.json({ error: 'not_available' }, { status: 409 })

  const rateExcl = Number(process.env.STUDIO_RATE_YEN_EXCL || '5000')
  const taxRate = Number(process.env.TAX_RATE || '0.10')
  const amountIncl = Math.round(rateExcl * (1 + taxRate) * add)

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/book?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/book?status=canceled`,
    line_items: [
      {
        price_data: {
          currency: 'jpy',
          product_data: { name: `延長 ${add}時間` },
          unit_amount: amountIncl,
        },
        quantity: 1,
      },
    ],
    metadata: {
      action: 'extend',
      booking_id: bookingId,
      add_hours: String(add),
      new_end: newEnd.toISO()!,
    },
  })

  return NextResponse.json({ url: session.url })
}

