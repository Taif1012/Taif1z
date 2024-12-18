class NotificationService {
    constructor() {
      this.checkPermission();
    }
  
    checkPermission = async () => {
      if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
        return;
      }
  
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        await Notification.requestPermission();
      }
    };
  
    showNotification = (title, message) => {
      if (!("Notification" in window)) {
        alert(message);
        return;
      }
  
      if (Notification.permission === "granted") {
        new Notification(title, {
          body: message,
          icon: "/favicon.ico", // يمكنك تغيير الأيقونة
          dir: "rtl"
        });
      } else {
        alert(message);
      }
    };
  }
  
  export default new NotificationService();