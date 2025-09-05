import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ✅ تأكد من وضع بيانات Firebase الصحيحة هنا
const firebaseConfig = {
  apiKey: "AIzaSyBST9Z0u5GkBUNnt8PUUx6U-8ZPn3YoVzc",
  authDomain: "gosolar-11568.firebaseapp.com",
  projectId: "gosolar-11568",
  storageBucket: "gosolar-11568.appspot.com",
  messagingSenderId: "392588962708",
  appId: "1:392588962708:android:7792268dffa6c11da57d81"
};

// ✅ استخدم getApps() للتحقق من التهيئة قبل إنشاء التطبيق
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ أضف Debugging للتأكد من التهيئة
console.log('Firebase App Initialized:', app.name); // المفروض يطبع [DEFAULT] لو شغال

const db = getFirestore(app);
const storage = getStorage(app);

// ✅ أضف Debugging للتأكد من تهيئة Firestore
console.log('Firestore Initialized:', db ? 'Yes' : 'No');

export { app, db, storage };