import * as functions from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'
import Stripe from 'stripe'
import { initializeApp, getApps } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

if (!getApps().length) {
  initializeApp()
}
const db = getFirestore()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' })

export const apiWebhooksStripe = functions.onRequest({ region: 'asia-northeast1' }, async (req, res): Promise<void> => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed')
    return
  }
  const sig = req.headers['stripe-signature'] as string
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET || '')
  } catch (err) {
    logger.error('Webhook signature verification failed.', err)
    res.status(400).send(`Webhook Error: ${(err as Error).message}`)
    return
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingId = session.metadata?.booking_id
    const action = session.metadata?.action || 'book'
    if (!bookingId) {
      logger.error('Missing booking_id in metadata')
      res.status(400).send('missing metadata')
      return
    }
    const idemRef = db.collection('locks').doc(`stripe_${event.id}`)
    try {
      await idemRef.create({ createdAt: FieldValue.serverTimestamp() })
    } catch (e) {
      logger.warn('Duplicate webhook event ignored', event.id)
      res.json({ received: true })
      return
    }

    if (action === 'extend') {
      const newEnd = session.metadata?.new_end!
      await db.collection('bookings').doc(bookingId).set({
        end: newEnd,
        updatedAt: FieldValue.serverTimestamp()
      }, { merge: true })
    } else {
      // FreeBusy 再確認や Calendar/Akerun は MVP では省略（TODO）。
      // ここでは予約を confirmed にする。
      await db.collection('bookings').doc(bookingId).set({
        status: 'confirmed',
        stripeCheckoutSessionId: session.id,
        updatedAt: FieldValue.serverTimestamp()
      }, { merge: true })
    }
  }
  res.json({ received: true })
})

export const ping = functions.onRequest({ region: 'asia-northeast1' }, async (_req, res) => {
  res.json({ ok: true, at: Date.now() })
})

