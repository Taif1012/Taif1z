import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyA0_jQ1fFFJj66Mw-7LjU6TEYLMRdUNgJg",
    authDomain: "subscription-management-a16e7.firebaseapp.com",
    projectId: "subscription-management-a16e7",
    storageBucket: "subscription-management-a16e7.firebasestorage.app",
    messagingSenderId: "549838967817",
    appId: "1:549838967817:web:6d158a5e4d4bf43f8394d8"
  };

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const messaging = getMessaging(app);

// دالة للحصول على token الإشعارات
export const requestNotificationPermission = async () => {
  try {
    const token = await getToken(messaging);
    return token;
  } catch (error) {
    console.error('An error occurred while retrieving token:', error);
    return null;
  }
};