const admin = require('firebase-admin');

if (admin.apps.length === 0) {
  admin.initializeApp();
}

export * from './https';
export * as firestore from './firestore';
