import { getMessaging, getToken } from 'firebase/messaging';
import { app } from './firebase.jsx';

const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return;
    }

    const permission = await Notification.requestPermission();
    console.log('Notification permission:', permission);

    if (permission === 'granted') {
      // Register service worker
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered:', registration);

        const token = await getToken(messaging, {
          vapidKey: "BH1K4SIaqsE3Sdy5i6m4hYIv8Cz-0FDwb5WX9TGCz7RLauSIKpjF3oVvKF3p4Ui7_QPBP4nFo0f-FIwWXI_4bQo" // استبدل بمفتاح VAPID الخاص بك
        });

        if (token) {
          console.log('FCM Token:', token);
          return token;
        }
      }
    }
  } catch (error) {
    console.error('Error getting permission:', error);
  }
};

export const showNotification = async (title, body) => {
  try {
    if (Notification.permission === 'granted') {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        body,
        icon: '/icons/icon-192.png',
        badge: '/icons/badge.png',
        dir: 'rtl',
        vibrate: [200, 100, 200],
        tag: 'subscription-notification',
        renotify: true,
        data: {
          url: window.location.origin
        }
      });
    }
  } catch (error) {
    console.error('Error showing notification:', error);
  }
};