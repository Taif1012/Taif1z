import { toast } from 'react-toastify';

class NotificationService {
  showNotification = (title, message) => {
    toast.success(
      <div dir="rtl" className="flex flex-col">
        <strong>{title}</strong>
        <span>{message}</span>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };
}

export default new NotificationService();