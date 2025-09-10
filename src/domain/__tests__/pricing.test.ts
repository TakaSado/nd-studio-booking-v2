import { describe, it, expect } from 'vitest'
import { calcPricing, roundToHour } from '../pricing'
import { Duration } from 'luxon'

describe('pricing', () => {
  it('rounds to nearest hour', () => {
    expect(roundToHour(Duration.fromObject({ minutes: 30 }))).toBe(1)
    expect(roundToHour(Duration.fromObject({ minutes: 89 }))).toBe(1)
    expect(roundToHour(Duration.fromObject({ minutes: 90 }))).toBe(2)
  })

  it('calculates tax included correctly', () => {
    const start = '2024-01-01T10:00:00.000+09:00'
    const end = '2024-01-01T12:00:00.000+09:00'
    const r = calcPricing(start, end)
    expect(r.durationHours).toBe(2)
    // default env: excl=5000, tax=10%
    expect(r.amountTaxExcluded).toBe(10000)
    expect(r.taxAmount).toBe(1000)
    expect(r.amountTaxIncluded).toBe(11000)
  })
})

