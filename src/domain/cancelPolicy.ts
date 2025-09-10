import { DateTime } from 'luxon'

export type CancelOutcome = {
  chargeRatio: number // 1.0 = 100%課金
  refundRatio: number // 1.0 = 全額返金
}

// 規定：
// T–12h 以前：全額返金（charge 0）
// T–12h～T–2h：80%課金（20%返金）
// T–2h 以降：100%課金（返金なし）
export function evaluateCancelPolicy(nowISO: string, startISO: string): CancelOutcome {
  const now = DateTime.fromISO(nowISO)
  const start = DateTime.fromISO(startISO)
  const diffHours = start.diff(now, 'hours').hours
  if (diffHours >= 12) return { chargeRatio: 0, refundRatio: 1 }
  if (diffHours >= 2) return { chargeRatio: 0.8, refundRatio: 0.2 }
  return { chargeRatio: 1, refundRatio: 0 }
}

