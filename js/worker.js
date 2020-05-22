console.log("Service worker loaded");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push recieved...");
  console.log(location);
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: `${location.origin}/img/android-chrome-192x192.png`,
    badge: `${location.origin}/img/Fc - logo.png`,
    silent: false,
  });
});
