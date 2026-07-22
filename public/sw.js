/* eslint-disable */
// Service Worker for KPR 2026 Push Notifications
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  if (!event.data) {
    console.log("Push event received with no data.");
    return;
  }

  let title = "Kingdom Prayer Retreat (KPR 2026)";
  let options = {
    body: "You have a new update from the organizers.",
    icon: "/KPR_logo.png",
    badge: "/KPR_logo.png",
    vibrate: [100, 50, 100],
    data: {
      url: "/KPR"
    }
  };

  try {
    // Try to parse the payload as JSON
    const data = event.data.json();
    if (data.title) title = data.title;
    if (data.body) options.body = data.body;
    if (data.icon) options.icon = data.icon;
    if (data.badge) options.badge = data.badge;
    if (data.url) options.data.url = data.url;
    if (data.vibrate) options.vibrate = data.vibrate;
  } catch (e) {
    // Fallback if data is raw text
    options.body = event.data.text();
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/KPR";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      // Check if there is already a window open with this URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url.includes(urlToOpen) && "focus" in client) {
          return client.focus();
        }
      }
      // If not, open a new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});
