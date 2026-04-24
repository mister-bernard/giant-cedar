/**
 * analytics.ts — Google Analytics 4 integration.
 *
 * Dynamically injects the GA4 script so it only loads when
 * VITE_GA_MEASUREMENT_ID is set. Zero overhead if not configured.
 *
 * Also sets the A/B variant as a GA4 user property so you can
 * segment every report by theme (alpine / minimalist).
 *
 * Usage:
 *   initGA("G-XXXXXXXXXX", "alpine")   ← call once from main.tsx
 *   gtagEvent("mission_cta_click", { source: "hero" })
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let _initialized = false;
let _measurementId = "";

export function initGA(measurementId: string, variant?: string): void {
  if (_initialized || !measurementId) return;
  _measurementId = measurementId;

  // Inject gtag script
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Init dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    // Disable automatic page_view — we fire it manually via useVariant
    // so it carries the variant dimension
    send_page_view: false,
    // Privacy: anonymize IPs
    anonymize_ip: true,
  });

  // Set A/B variant as a persistent user property
  if (variant) {
    window.gtag("set", "user_properties", { gc_variant: variant });
  }

  _initialized = true;
}

/**
 * Fire a GA4 event. No-op if GA not initialized.
 * Event names follow our existing naming (mission_cta_click, etc.)
 * GA4 accepts any string — they'll appear in custom reports.
 */
export function gtagEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!_initialized || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", eventName, {
      event_category: "engagement",
      ...params,
    });
  } catch {
    // Never break UX for analytics
  }
}

/**
 * Fire GA4 page_view manually (with variant dimension attached).
 * Call once on mount, after initGA.
 */
export function gtagPageView(variant: string): void {
  if (!_initialized || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_title: document.title,
      gc_variant: variant,
    });
  } catch {
    // silent
  }
}
