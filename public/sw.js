/* eslint-env serviceworker */

self.addEventListener("install", (e) => {
  console.log("SW installed");
});

// self.addEventListener("push", (e) => {
//   new self.Notification("Hello there :D");
// });

self.addEventListener("push", function (event) {
  console.log("Push notification received", event.data);
  event.waitUntil(
    self.registration.showNotification("Hello there", {
      body: "Blah blah blah",
      silent: false,
      vibrate: [300],
    })
  );
});
