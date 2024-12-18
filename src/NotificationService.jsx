import { toast } from 'react-toastify';

class NotificationService {
  showNotification(title, message) {
    // استخدام toast.success مباشرة بدون JSX معقد
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