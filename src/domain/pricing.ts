import { DateTime, Duration } from 'luxon'

export type PricingResult = {
  durationHours: number
  amountTaxExcluded: number
  taxAmount: number
  amountTaxIncluded: number
}

const TAX_RATE = Number(process.env.TAX_RATE ?? '0.10')
const RATE_EXCL = Number(process.env.STUDIO_RATE_YEN_EXCL ?? '5000')

export function roundToHour(duration: Duration): number {
  const minutes = duration.as('minutes')
  const hours = minutes / 60
  return Math.round(hours)
}

export function calcPricing(startISO: string, endISO: string): PricingResult {
  const start = DateTime.fromISO(startISO)
  const end = DateTime.fromISO(endISO)
  const duration = end.diff(start)
  const durationHours = Math.max(1, roundToHour(duration))
  const amountTaxExcluded = RATE_EXCL * durationHours
  const taxAmount = Math.round(amountTaxExcluded * TAX_RATE)
  const amountTaxIncluded = amountTaxExcluded + taxAmount
  return { durationHours, amountTaxExcluded, taxAmount, amountTaxIncluded }
}

