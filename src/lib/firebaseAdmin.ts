import * as admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID,
    credential: process.env.GOOGLE_SA_CLIENT_EMAIL && process.env.GOOGLE_SA_PRIVATE_KEY ? admin.credential.cert({
      clientEmail: process.env.GOOGLE_SA_CLIENT_EMAIL,
      privateKey: (process.env.GOOGLE_SA_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      projectId: process.env.FIREBASE_PROJECT_ID
    }) : admin.credential.applicationDefault()
  })
}

export const adminDb = admin.firestore()

