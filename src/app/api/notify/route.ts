import { NextRequest, NextResponse } from 'next/server'
import { notifySlack } from '@/lib/slack'

export async function POST(req: NextRequest) {
  const { text } = await req.json()
  if (!text) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  await notifySlack(text)
  return NextResponse.json({ ok: true })
}

