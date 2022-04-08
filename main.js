const subscribeButton = document.querySelector("button");
console.log("Hello world");

subscribeButton.addEventListener("click", () => {
  console.log("Clicked");

  setupServiceWorker();
});

async function setupServiceWorker() {
  const permission = await Notification.requestPermission();
  console.log(
    "🚀 ~ file: main.js ~ line 12 ~ setupServiceWorker ~ permission",
    permission
  );

  if (permission !== "granted") {
    return;
  }

  // new Notification("Pouet");

  const registration = await navigator.serviceWorker.register("/sw.js", {
    scope: "/",
  });

  registration.showNotification("Pouet");

  registration.pushManager
    .getSubscription()
    .then(async (subscription) => {
      if (subscription) {
        console.log("Already subscribed to pushes");
        return subscription;
      }
      const publicKey = await (await fetch("/push/public-key")).text();

      console.log({ publicKey });

      // never resolve or reject on ungoogled chromium
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey,
      });
    })
    .then(async (subscription) => {
      await fetch("/push/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription }),
      });
      console.log("Registered");
    })
    .catch((err) => {
      console.log({ err });
    });
}
