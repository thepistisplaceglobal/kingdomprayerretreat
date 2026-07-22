const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "BJad0XkSxJp14zJ16ZXD6hFkaUQQYTS3UJMetL20idfzumg09lGTglSKbxKn-HwqV8bDgmir77nA47ryki--N2I";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function isPushSupported(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  return "serviceWorker" in navigator && "PushManager" in window;
}

export async function getNotificationPermissionState(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) return "denied";
  return Notification.permission;
}

export async function getActiveSubscription(): Promise<PushSubscription | null> {
  if (!(await isPushSupported())) return null;
  const registration = await navigator.serviceWorker.ready;
  return await registration.pushManager.getSubscription();
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!(await isPushSupported())) return null;
  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/"
    });
    console.log("Service Worker registered successfully with scope:", registration.scope);
    return registration;
  } catch (error) {
    console.error("Service Worker registration failed:", error);
    return null;
  }
}

export async function subscribeToPush(): Promise<PushSubscription | null> {
  if (!(await isPushSupported())) {
    throw new Error("Push notifications are not supported by this browser.");
  }

  // Ensure service worker is registered
  let registration: ServiceWorkerRegistration | null | undefined = await navigator.serviceWorker.getRegistration("/");
  if (!registration) {
    registration = await registerServiceWorker();
  }
  
  if (!registration) {
    throw new Error("Could not register Service Worker");
  }

  // Force service worker active
  await navigator.serviceWorker.ready;

  // Request permission
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification permission denied");
  }

  // Get active subscription or create new one
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    const convertedVapidKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });

    // Save subscription to backend
    const rawSub = JSON.parse(JSON.stringify(subscription));
    const response = await fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rawSub)
    });

    if (!response.ok) {
      // Clean up local subscription if backend sync fails
      await subscription.unsubscribe();
      throw new Error("Failed to register push subscription with the server.");
    }
  }

  return subscription;
}

export async function unsubscribeFromPush(): Promise<boolean> {
  if (!(await isPushSupported())) return false;
  
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  
  if (!subscription) return true;

  // Unsubscribe on backend first
  try {
    await fetch("/api/push/subscribe", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: subscription.endpoint })
    });
  } catch (err) {
    console.warn("Could not delete subscription from server, continuing with client unsubscribe:", err);
  }

  // Unsubscribe client-side
  return await subscription.unsubscribe();
}
