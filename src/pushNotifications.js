import { getMessaging, getToken } from 'firebase/messaging';
import { app } from './firebase.jsx';  // نستورد app من ملف firebase

const messaging = getMessaging(app);

// طلب إذن الإشعارات
export const requestNotificationPermission = async () => {
  try {
    if (!("Notification" in window)) {
      console.log("هذا المتصفح لا يدعم الإشعارات");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // الحصول على token للإشعارات
      const currentToken = await getToken(messaging, {
        vapidKey: "BH1K4SIaqsE3Sdy5i6m4hYIv8Cz-0FDwb5WX9TGCz7RLauSIKpjF3oVvKF3p4Ui7_QPBP4nFo0f-FIwWXI_4bQo" 
      });

      if (currentToken) {
        console.log('token:', currentToken);
      } else {
        console.log('لا يمكن الحصول على token');
      }
    }
  } catch (error) {
    console.error("حدث خطأ أثناء طلب إذن الإشعارات:", error);
  }
};

// إظهار الإشعار
export const showNotification = (title, body) => {
  try {
    if (!("Notification" in window)) {
      alert(body);
      return;
    }

    if (Notification.permission === "granted") {
      const notification = new Notification(title, {
        body: body,
        icon: "/icon.png",  // يمكنك إضافة أيقونة خاصة بك
        badge: "/badge.png",
        dir: "rtl"
      });

      notification.onclick = function() {
        window.focus();
        this.close();
      };
    } else {
      alert(body);
    }
  } catch (error) {
    console.error("Error showing notification:", error);
    alert(body);
  }
};

// الاستماع للإشعارات في الخلفية
export const setupNotificationListener = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
};