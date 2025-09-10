// NOTE: 本番では googleapis を利用。MVP では型とスタブを用意。
import { DateTime } from 'luxon'

export type FreeBusyResult = { busy: { start: string; end: string }[] }

export async function freeBusy(startISO: string, endISO: string): Promise<FreeBusyResult> {
  // TODO: implement with Google Calendar API.
  // ここでは常に空きとして返す（API 実装時に置換）
  return { busy: [] }
}

export async function createEvent(params: { startISO: string; endISO: string; summary: string; description?: string; privateProps?: Record<string, string> }): Promise<{ eventId: string }> {
  // TODO: implement with Google Calendar API.
  const eventId = `evt_${DateTime.now().toMillis()}`
  return { eventId }
}

export async function deleteEvent(eventId: string): Promise<void> {
  // TODO: implement with Google Calendar API.
  return
}

export async function extendEvent(eventId: string, newEndISO: string): Promise<void> {
  // TODO: implement with Google Calendar API.
  return
}

