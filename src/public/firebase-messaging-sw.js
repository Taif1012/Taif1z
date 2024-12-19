importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA0_jQ1fFFJj66Mw-7LjU6TEYLMRdUNgJg",
  authDomain: "subscription-management-a16e7.firebaseapp.com",
  projectId: "subscription-management-a16e7",
  storageBucket: "subscription-management-a16e7.firebasestorage.app",
  messagingSenderId: "549838967817",
  appId: "1:549838967817:web:6d158a5e4d4bf43f8394d8"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationOptions = {
    body: payload.data.body,
    icon: '/notification-icon.png',
    badge: '/badge-icon.png',
    dir: 'rtl',
    vibrate: [200, 100, 200],
    tag: 'subscription-notification',
    renotify: true
  };

  return self.registration.showNotification(
    payload.data.title,
    notificationOptions
  );
});