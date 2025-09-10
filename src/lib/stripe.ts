import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
})

export async function createCheckoutSession(params: {
  bookingId: string
  amountYenTaxIncluded: number
  customer: { name: string; email: string; phone: string }
  startISO: string
  endISO: string
}) {
  const { bookingId, amountYenTaxIncluded, customer, startISO, endISO } = params
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/book?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/book?status=canceled`,
    line_items: [
      {
        price_data: {
          currency: 'jpy',
          product_data: { name: 'スタジオ利用（1時間単位）' },
          unit_amount: amountYenTaxIncluded,
        },
        quantity: 1,
      },
    ],
    metadata: {
      booking_id: bookingId,
      start: startISO,
      end: endISO,
      email: customer.email,
    },
  })
  return session
}

