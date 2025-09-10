import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { bookingId, reason } = await req.json()
  if (!bookingId) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  // TODO: 実装（Stripe Refund, Calendar Event 削除, Akerun 取消, Firestore 更新, 通知）
  return NextResponse.json({ ok: true })
}

