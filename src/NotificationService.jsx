import { toast } from 'react-toastify';
import { database } from './firebase.jsx';
import { ref, push, onValue } from 'firebase/database';

class NotificationService {
  constructor() {
    // إعداد مستمع للإشعارات
    const notificationsRef = ref(database, 'notifications');
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notifications = Object.values(data);
        const latestNotification = notifications[notifications.length - 1];
        this.showLocalNotification(latestNotification.title, latestNotification.message);
      }
    });
  }

  async showNotification(title, message) {
    try {
      // حفظ الإشعار في Firebase
      const notificationsRef = ref(database, 'notifications');
      await push(notificationsRef, {
        title,
        message,
        timestamp: Date.now()
      });

      // عرض الإشعار محلياً
      this.showLocalNotification(title, message);
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }

  showLocalNotification(title, message) {
    toast.success(`${title} - ${message}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      rtl: true,
      pauseOnHover: true,
      draggable: true
    });
  }
}

export default new NotificationService();