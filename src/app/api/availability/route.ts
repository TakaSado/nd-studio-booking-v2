import { NextRequest, NextResponse } from 'next/server'
import { freeBusy } from '@/lib/googleCalendar'
import { createLock } from '@/lib/bookings'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  const { startISO, endISO } = await req.json()
  if (!startISO || !endISO) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  const fb = await freeBusy(startISO, endISO)
  if (fb.busy.length > 0) {
    return NextResponse.json({ available: false })
  }
  const bookingId = uuidv4()
  const locked = await createLock(bookingId)
  if (!locked) return NextResponse.json({ error: 'conflict' }, { status: 409 })
  return NextResponse.json({ available: true, bookingId })
}

