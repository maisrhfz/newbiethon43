"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Thin wrapper over the browser Notification API. Works while the tab is
 * open; there is no service worker here, so it will not fire once the tab
 * or browser is closed — that's a deliberate scope cut (see README).
 */
export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "unsupported"
  );
  const firedKeysRef = useRef<Set<string>>(new Set());

  const requestPermission = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setPermission("unsupported");
      return;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
  }, []);

  const notifyOnce = useCallback(
    (key: string, title: string, options?: NotificationOptions) => {
      if (firedKeysRef.current.has(key)) return;
      firedKeysRef.current.add(key);
      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
        new Notification(title, options);
      }
    },
    []
  );

  // Reset dedupe set if the page has been open a very long time (new trip planned).
  useEffect(() => {
    return () => {
      firedKeysRef.current.clear();
    };
  }, []);

  return { permission, requestPermission, notifyOnce };
}
