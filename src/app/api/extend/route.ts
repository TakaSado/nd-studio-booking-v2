import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { bookingId, addHours } = await req.json()
  if (!bookingId || !addHours) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  // TODO: 実装（freeBusy チェック→Checkout→Webhook 後に Event 延長 & Akerun 再発行）
  return NextResponse.json({ ok: true })
}

