self.addEventListener('push', function(event) {
    const options = {
      body: event.data.text(),
      icon: '/icon.png',
      badge: '/badge.png',
      dir: 'rtl'
    };
  
    event.waitUntil(
      self.registration.showNotification('إشعار جديد', options)
    );
  });