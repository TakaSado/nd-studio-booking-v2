import * as functions from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' })

export const apiWebhooksStripe = functions.onRequest({ region: 'asia-northeast1' }, async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed')
  const sig = req.headers['stripe-signature'] as string
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET || '')
  } catch (err) {
    logger.error('Webhook signature verification failed.', err)
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    logger.info('Session completed', session.id)
    // TODO: 冪等ロック→freeBusy再確認→Calendar Event→Akerun→Firestore更新→通知
  }
  res.json({ received: true })
})

export const ping = functions.onRequest({ region: 'asia-northeast1' }, async (_req, res) => {
  res.json({ ok: true, at: Date.now() })
})

