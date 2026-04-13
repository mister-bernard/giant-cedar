/**
 * useVariant.ts — A/B variant assignment and event tracking.
 *
 * Variant is assigned once per browser (localStorage) and never changes for
 * that visitor, so they always see the same theme. 50/50 split.
 *
 * Events are POSTed to the tracker endpoint via navigator.sendBeacon.
 * If the tracker is down, events are silently dropped (non-blocking).
 */

import { useEffect, useRef, useCallback } from "react";

export type Variant = "minimalist" | "alpine";

const STORAGE_KEY   = "gc_variant";
const SESSION_KEY   = "gc_session";
const TRACKER_URL   = "https://mrb.sh/gc-ab/track";

function assignVariant(): Variant {
  const stored = localStorage.getItem(STORAGE_KEY) as Variant | null;
  if (stored === "minimalist" || stored === "alpine") return stored;
  const v: Variant = Math.random() < 0.5 ? "minimalist" : "alpine";
  localStorage.setItem(STORAGE_KEY, v);
  return v;
}

function getSessionId(): string {
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

function sendEvent(event: string, variant: Variant, meta?: Record<string, unknown>) {
  if (typeof navigator === "undefined") return;
  const payload = JSON.stringify({
    event,
    variant,
    session: getSessionId(),
    path: window.location.pathname,
    ts: Date.now(),
    ...meta,
  });
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(TRACKER_URL, new Blob([payload], { type: "application/json" }));
    } else {
      fetch(TRACKER_URL, { method: "POST", body: payload, keepalive: true }).catch(() => {});
    }
  } catch {
    // Silent — never break UX for analytics
  }
}

export function useVariant() {
  const variant = useRef<Variant>(assignVariant());
  const v = variant.current;
  const scrollFired = useRef({ s50: false, s80: false });
  const timeFired   = useRef({ t60: false, t180: false });

  // Fire page_view immediately
  useEffect(() => {
    sendEvent("page_view", v);
  }, [v]);

  // Scroll depth tracking
  useEffect(() => {
    const handler = () => {
      const doc = document.documentElement;
      const pct = Math.round(((doc.scrollTop + window.innerHeight) / doc.scrollHeight) * 100);
      if (pct >= 50 && !scrollFired.current.s50) {
        scrollFired.current.s50 = true;
        sendEvent("scroll_50", v);
      }
      if (pct >= 80 && !scrollFired.current.s80) {
        scrollFired.current.s80 = true;
        sendEvent("scroll_80", v);
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [v]);

  // Time on page
  useEffect(() => {
    const t60  = setTimeout(() => { timeFired.current.t60  = true; sendEvent("time_60s",  v); }, 60_000);
    const t180 = setTimeout(() => { timeFired.current.t180 = true; sendEvent("time_180s", v); }, 180_000);
    return () => { clearTimeout(t60); clearTimeout(t180); };
  }, [v]);

  const track = useCallback((event: string, meta?: Record<string, unknown>) => {
    sendEvent(event, v, meta);
  }, [v]);

  return { variant: v, track } as const;
}
