import { DateTime } from 'luxon'

const TZ = process.env.NEXT_PUBLIC_TIMEZONE || 'Asia/Tokyo'

export function toUTC(iso: string): string {
  return DateTime.fromISO(iso, { zone: TZ }).toUTC().toISO()!
}

export function toJST(iso: string): string {
  return DateTime.fromISO(iso).setZone(TZ).toISO()!
}

export function humanJST(iso: string): string {
  return DateTime.fromISO(iso).setZone(TZ).toFormat('yyyy/LL/dd HH:mm')
}

