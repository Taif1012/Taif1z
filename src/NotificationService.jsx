import { toast } from 'react-toastify';
import { database } from './firebase';
import { ref, push, onValue } from 'firebase/database';

class NotificationService {
  constructor() {
    this.setupNotificationListener();
  }

  setupNotificationListener() {
    const notificationsRef = ref(database, 'notifications');
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lastNotification = Object.values(data).pop();
        this.showLocalNotification(
          lastNotification.title,
          lastNotification.message
        );
      }
    });
  }

  async showNotification(title, message) {
    // حفظ الإشعار في Firebase
    const notificationsRef = ref(database, 'notifications');
    await push(notificationsRef, {
      title,
      message,
      timestamp: Date.now()
    });

    // عرض إشعار محلي
    this.showLocalNotification(title, message);
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