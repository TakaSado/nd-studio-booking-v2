// Akerun API スタブ。ENV でモック/本番切替予定。
import { DateTime } from 'luxon'

export async function grantAccess(deviceId: string, startISO: string, endISO: string): Promise<{ grantId: string }> {
  // 実装では API 呼び出し。ここではスタブ。
  return { grantId: `grant_${DateTime.now().toMillis()}` }
}

export async function revokeAccess(grantId: string): Promise<void> {
  return
}

