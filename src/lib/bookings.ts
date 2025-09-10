import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore'
import { adminDb } from './firebaseAdmin'
import * as admin from 'firebase-admin'
import { v4 as uuidv4 } from 'uuid'

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
export const db = getFirestore(app)

export type Booking = {
  id: string
  start: string
  end: string
  durationHours: number
  amountTaxExcluded: number
  taxAmount: number
  amountTaxIncluded: number
  status: 'pending' | 'confirmed' | 'canceled' | 'failed'
  customer: { name: string; email: string; phone: string }
  calendarEventId?: string
  akerunGrantId?: string
  stripePaymentIntentId?: string
  stripeCheckoutSessionId?: string
  createdAt?: any
  updatedAt?: any
}

export async function createLock(bookingId: string): Promise<boolean> {
  // Admin SDK で原子的に作成（存在すれば失敗）
  const ref = adminDb.collection('locks').doc(bookingId)
  try {
    await ref.create({ expiresAt: admin.firestore.Timestamp.fromMillis(Date.now() + 3 * 60 * 1000) })
    return true
  } catch (e: any) {
    return false
  }
}

export async function createBooking(b: Omit<Booking, 'id' | 'status' | 'createdAt' | 'updatedAt'> & { id?: string; status?: Booking['status'] }) {
  const id = b.id ?? uuidv4()
  const ref = doc(db, 'bookings', id)
  await setDoc(ref, {
    id,
    ...b,
    status: b.status ?? 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return id
}

