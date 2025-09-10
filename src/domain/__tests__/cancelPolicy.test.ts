import { describe, it, expect } from 'vitest'
import { evaluateCancelPolicy } from '../cancelPolicy'

describe('cancelPolicy', () => {
  it('refund 100% at 12h or earlier', () => {
    const now = '2024-01-01T00:00:00+09:00'
    const start = '2024-01-01T12:00:00+09:00'
    const r = evaluateCancelPolicy(now, start)
    expect(r.refundRatio).toBe(1)
    expect(r.chargeRatio).toBe(0)
  })

  it('refund 20% between 12h and 2h', () => {
    const now = '2024-01-01T01:00:00+09:00'
    const start = '2024-01-01T12:00:00+09:00'
    const r = evaluateCancelPolicy(now, start)
    expect(r.refundRatio).toBe(0.2)
    expect(r.chargeRatio).toBe(0.8)
  })

  it('refund 0% within 2h', () => {
    const now = '2024-01-01T10:30:00+09:00'
    const start = '2024-01-01T12:00:00+09:00'
    const r = evaluateCancelPolicy(now, start)
    expect(r.refundRatio).toBe(0)
    expect(r.chargeRatio).toBe(1)
  })
})

