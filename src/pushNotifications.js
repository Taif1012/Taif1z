import { getMessaging, getToken } from 'firebase/messaging';
import { app } from './firebase.jsx';

const messaging = getMessaging(app);

// دالة التحقق من دعم الإشعارات
const checkNotificationSupport = () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }
  return true;
};

// دالة طلب الإذن
export const requestNotificationPermission = async () => {
  try {
    if (!checkNotificationSupport()) return;

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // تسجيل Service Worker
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered with scope:', registration.scope);

        // الحصول على token
        const currentToken = await getToken(messaging, {
          vapidKey: "BK_h1mmdKOPyIouAxXm-cd34031ce3XqIKIYuXVnv888GB49CE4TkqXRT0jbAc_3SN3M0zJmRRuaNugTaC1YudM" // من إعدادات Firebase
        });

        if (currentToken) {
          console.log('FCM Token:', currentToken);
          return currentToken;
        }
      }
    }
  } catch (error) {
    console.error('Error getting permission:', error);
  }
};

// دالة إرسال الإشعار
export const showNotification = async (title, body) => {
  try {
    if (!checkNotificationSupport()) return;

    if (Notification.permission === 'granted') {
      const options = {
        body: body,
        icon: '/notification-icon.png', // أضف أيقونة في مجلد public
        badge: '/badge-icon.png',      // أضف شارة في مجلد public
        dir: 'rtl',
        vibrate: [200, 100, 200],
        tag: 'subscription-notification',
        renotify: true
      };

      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, options);
    }
  } catch (error) {
    console.error('Error showing notification:', error);
  }
};