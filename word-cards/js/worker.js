console.log("Service worker loaded");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push recieved...");
  console.log(location);
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: `${location.origin}/word-cards/img/android-chrome-192x192.png`,
    badge: `${location.origin}/word-cards/img/Fc - logo.png`,
    silent: false,
  });
});

self.addEventListener("notificationclick", (event) => {
  let url = "https://hoarfox.github.io/word-cards/#home";
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (let i = 0; i < clientList.length; i++) {
          let client = clientList[i];
          if (client.url == url && "focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(url);
      })
  );
});
