import { useState, useEffect, useRef } from "react";
import { MissionDialog } from "@/components/MissionDialog";
import { ContactDialog } from "@/components/ContactDialog";
import { AboutDialog } from "@/components/AboutDialog";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import aerial1 from "@/assets/aerial-1.jpg";
import aerial2 from "@/assets/aerial-2.jpg";
import aerial3 from "@/assets/aerial-3.jpg";
import aerial6 from "@/assets/aerial-6.jpg";
import aerial7 from "@/assets/aerial-7.jpg";
import heroImage from "@/assets/hero-aerial.jpg";

// ── Types ──────────────────────────────────────────────────────────────────
interface YTVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
}

// ── Static fallback gallery (shown when/until YouTube data loads) ──────────
const STATIC_WORK = [
  { img: aerial2, location: "Oman · 2024",       title: "Wadi Shab Canyon Expedition",    type: "Drone Cinematography" },
  { img: aerial3, location: "Idaho · 2024",       title: "Backcountry Series",             type: "Aerial Photography"  },
  { img: aerial6, location: "Pacific Northwest",  title: "Mountain Expedition",            type: "Multi-day Operation"  },
  { img: aerial7, location: "Western US",         title: "Remote Location Ops",            type: "Expedition Aerial"   },
];

// ── Square checkout placeholder data ──────────────────────────────────────
const SERVICES = [
  { name: "Expedition Day Rate",     price: "$2,500", desc: "Full-day drone ops in remote/backcountry terrain. Equipment, operator, and logistics planning included." },
  { name: "Standard Day Rate",       price: "$1,500", desc: "Full-day drone cinematography at accessible locations. Operator + gear + post delivery." },
  { name: "Mission Planning",        price: "$750",   desc: "Location scouting, airspace research, permit coordination, and logistics brief. Standalone or pre-expedition." },
  { name: "Multi-Day Expedition",    price: "Custom", desc: "Quoted by mission. Covers all days, logistics, international permits, travel, and local liaison." },
];

// ── Main component ─────────────────────────────────────────────────────────
const Index = () => {
  const [missionOpen,  setMissionOpen]  = useState(false);
  const [contactOpen,  setContactOpen]  = useState(false);
  const [aboutOpen,    setAboutOpen]    = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [videos, setVideos] = useState<YTVideo[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fetch YouTube videos from pre-generated JSON
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}videos.json`)
      .then(r => r.json())
      .then(d => setVideos(d.videos || []))
      .catch(() => {}); // graceful fallback to static work
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openCheckout = (svc: typeof SERVICES[0]) => {
    setSelectedService(svc);
    setCheckoutOpen(true);
  };

  // ── JSON-LD structured data ──────────────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://giant-cedar.com/#business",
        "name": "Giant Cedar",
        "description": "Expedition-grade aerial cinematography and drone photography for remote locations worldwide. We handle all permits, logistics, and airspace coordination so you get the shot.",
        "url": "https://giant-cedar.com",
        "logo": "https://giant-cedar.com/favicon.ico",
        "email": "hello@giant-cedar.com",
        "areaServed": { "@type": "GeoShape", "description": "Western United States and international on request" },
        "priceRange": "$$$",
        "knowsAbout": ["Aerial Cinematography", "Drone Photography", "Mission Planning", "Remote Location Operations", "Fixed-Wing Photography"],
        "sameAs": ["https://instagram.com/giantcedar", "https://youtube.com/channel/UCpVbldUV8E4ZySlEFKS0LuQ"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Giant Cedar Services",
          "itemListElement": SERVICES.filter(s => s.price !== "Custom").map(s => ({
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": s.name, "description": s.desc },
            "price": s.price.replace("$", "").replace(",", ""),
            "priceCurrency": "USD",
          })),
        },
      },
      {
        "@type": "VideoObject",
        "@id": "https://giant-cedar.com/#demo-reel",
        "name": "Giant Cedar - Drone Demo",
        "description": "Aerial cinematography demo reel showcasing expedition-grade drone work.",
        "thumbnailUrl": "https://i.ytimg.com/vi/_xzdPfMlzcc/hqdefault.jpg",
        "uploadDate": "2024-01-01",
        "contentUrl": "https://www.youtube.com/watch?v=_xzdPfMlzcc",
        "embedUrl": "https://www.youtube.com/embed/_xzdPfMlzcc",
      },
    ],
  };

  return (
    <>
      {/* ── Structured data ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Skip nav (ADA) ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif", background: "#FFFFFF", color: "#0A0A0A" }}>

        {/* ── NAV ────────────────────────────────────────────────────────── */}
        <header role="banner">
          <nav
            aria-label="Main navigation"
            style={{
              position: "sticky", top: 0, zIndex: 100,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 48px", height: "68px", background: "#FFFFFF",
              borderBottom: "1px solid #EBEBEB",
            }}
            ref={menuRef}
          >
            <a
              href="/"
              aria-label="Giant Cedar — home"
              style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", color: "#0A0A0A" }}
            >
              Giant Cedar
            </a>

            {/* Desktop nav */}
            <ul role="menubar" aria-label="Site sections" style={{ display: "flex", gap: "40px", listStyle: "none", margin: 0, padding: 0 }}>
              {[
                { label: "Work",         action: () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }) },
                { label: "Capabilities", action: () => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" }) },
                { label: "About",        action: () => setAboutOpen(true) },
                { label: "Contact",      action: () => setContactOpen(true) },
              ].map(({ label, action }) => (
                <li key={label} role="none">
                  <button
                    role="menuitem"
                    onClick={action}
                    style={{ fontSize: "14px", fontWeight: 400, color: "#777", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: "4px 0", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#0A0A0A")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#777")}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setMissionOpen(true)}
              aria-label="Plan a mission — open mission planning form"
              style={{ fontSize: "14px", color: "#3D5A47", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", borderBottom: "1px solid transparent", transition: "border-color 0.2s", padding: "2px 0" }}
              onMouseEnter={e => (e.currentTarget.style.borderBottomColor = "#3D5A47")}
              onMouseLeave={e => (e.currentTarget.style.borderBottomColor = "transparent")}
            >
              Plan a Mission →
            </button>
          </nav>
        </header>

        {/* ── MAIN ───────────────────────────────────────────────────────── */}
        <main id="main-content" role="main">

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <section
            aria-labelledby="hero-heading"
            style={{ padding: "96px 48px 80px", maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end" }}
          >
            <div>
              <h1
                id="hero-heading"
                style={{ fontSize: "84px", fontWeight: 300, lineHeight: 0.88, letterSpacing: "-0.03em", margin: 0 }}
              >
                Aerial cinema<br />for hard<br />places.
              </h1>
            </div>
            <div style={{ paddingBottom: "8px" }}>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#777", maxWidth: "380px", marginBottom: "36px", fontWeight: 300 }}>
                An expedition-grade aerial company operating in the Western United States and internationally. We handle permits, logistics, and airspace for every location — so the only thing you think about is the shot.
              </p>
              <div style={{ display: "flex", gap: "40px", paddingTop: "32px", borderTop: "1px solid #EBEBEB" }}>
                <div>
                  <span style={{ fontSize: "38px", fontWeight: 300, display: "block" }}>11</span>
                  <span style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#777", display: "block", marginTop: "4px" }}>Countries flown</span>
                </div>
                <div>
                  <span style={{ fontSize: "38px", fontWeight: 300, display: "block" }}>100%</span>
                  <span style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#777", display: "block", marginTop: "4px" }}>Permits handled</span>
                </div>
                <div>
                  <span style={{ fontSize: "38px", fontWeight: 300, display: "block" }}>∞</span>
                  <span style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#777", display: "block", marginTop: "4px" }}>Altitude limit</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── SELECTED WORK ────────────────────────────────────────────── */}
          <section
            id="work"
            aria-labelledby="work-heading"
            style={{ borderTop: "1px solid #EBEBEB" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "40px 48px 32px", borderBottom: "1px solid #EBEBEB" }}>
              <h2 id="work-heading" style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 400 }}>
                Selected Work
              </h2>
              <span style={{ fontSize: "13px", color: "#777" }}>
                {videos.length > 0 ? `${videos.length + STATIC_WORK.length} projects` : `${STATIC_WORK.length} projects`}
              </span>
            </div>

            <div
              role="list"
              aria-label="Portfolio projects"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderLeft: "1px solid #EBEBEB" }}
            >
              {/* YouTube videos first */}
              {videos.map((video, i) => (
                <article
                  key={video.id}
                  role="listitem"
                  style={{ borderRight: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB", overflow: "hidden", gridColumn: i === 0 ? "span 2" : "span 1" }}
                >
                  <YouTubeEmbed videoId={video.id} thumbnail={video.thumbnail} />
                  <div style={{ padding: "20px 24px 24px", borderTop: "1px solid #EBEBEB" }}>
                    <div style={{ fontSize: "15px", fontWeight: 500, marginBottom: "4px" }}>{video.title}</div>
                    <div style={{ fontSize: "13px", color: "#777" }}>Drone Cinematography · {video.publishedAt?.slice(0, 4)}</div>
                  </div>
                </article>
              ))}

              {/* Static portfolio items */}
              {STATIC_WORK.map((item, i) => (
                <article
                  key={i}
                  role="listitem"
                  style={{ borderRight: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB", cursor: "pointer", overflow: "hidden" }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <img
                      src={item.img}
                      alt={`${item.title} — aerial photography in ${item.location}`}
                      style={{ height: i === 0 && videos.length === 0 ? "420px" : "280px", width: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </div>
                  <div style={{ padding: "20px 24px 24px", borderTop: "1px solid #EBEBEB" }}>
                    <div style={{ fontSize: "15px", fontWeight: 500, marginBottom: "4px" }}>{item.title}</div>
                    <div style={{ fontSize: "13px", color: "#777" }}>{item.type} · {item.location}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── CAPABILITIES ─────────────────────────────────────────────── */}
          <section
            id="capabilities"
            aria-labelledby="caps-heading"
            style={{ padding: "80px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderTop: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB" }}
          >
            <div style={{ paddingRight: "48px" }}>
              <h2
                id="caps-heading"
                style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#777", paddingBottom: "28px", borderBottom: "2px solid #0A0A0A", marginBottom: 0 }}
              >
                Capabilities
              </h2>
              {["Drone Cinematography", "Fixed-Wing Aerial Photography", "Mission Planning", "Remote Location Operations"].map(cap => (
                <div key={cap} style={{ padding: "18px 0", borderBottom: "1px solid #EBEBEB", fontSize: "15px", fontWeight: 300 }}>{cap}</div>
              ))}
            </div>
            <div style={{ paddingLeft: "48px", borderLeft: "1px solid #EBEBEB" }}>
              <h2
                aria-label="Operating area"
                style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#777", paddingBottom: "28px", borderBottom: "2px solid #0A0A0A", marginBottom: 0 }}
              >
                Where We Go
              </h2>
              {[
                "Western United States",
                "International on request",
                "Permits &amp; logistics — fully handled",
                "Remote &amp; backcountry terrain",
              ].map((area, i) => (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{ __html: area }}
                  style={{ padding: "18px 0", borderBottom: "1px solid #EBEBEB", fontSize: "15px", fontWeight: 300 }}
                />
              ))}
            </div>
          </section>

          {/* ── LOGISTICS / COPY ─────────────────────────────────────────── */}
          <section
            aria-labelledby="logistics-heading"
            style={{ padding: "80px 48px", maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px" }}
          >
            <div>
              <h2
                id="logistics-heading"
                style={{ fontSize: "32px", fontWeight: 300, lineHeight: 1.2, letterSpacing: "-0.01em" }}
              >
                We handle<br />every detail.
              </h2>
            </div>
            <div style={{ fontSize: "16px", lineHeight: 1.8, color: "#555", fontWeight: 300 }}>
              <p style={{ marginBottom: "20px" }}>
                Flying in Oman, China, or anywhere else doesn't start with a drone. It starts with permits. Airspace authorization, local aviation authority approvals, restricted zone waivers, operator certifications — the paperwork that most production teams never want to touch.
              </p>
              <p style={{ marginBottom: "20px" }}>
                We take care of all of it. Every country we fly in, every restricted area we operate near, every flight plan that needs regulatory sign-off. You brief us on the shot. We figure out what's required to legally and safely take it.
              </p>
              <p>
                That includes ground transport coordination, local liaison, customs documentation for equipment, and contingency planning for everything that can go wrong in a remote location at altitude. The mission is planned before we ever power on a drone.
              </p>
            </div>
          </section>

          {/* ── SERVICES / CHECKOUT ──────────────────────────────────────── */}
          <section
            id="services"
            aria-labelledby="services-heading"
            style={{ background: "#F7F7F7", padding: "80px 48px", borderTop: "1px solid #EBEBEB" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "40px" }}>
              <h2 id="services-heading" style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 400 }}>
                Services &amp; Rates
              </h2>
              <span style={{ fontSize: "13px", color: "#777" }}>Multi-day expeditions quoted by mission</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px", borderLeft: "1px solid #EBEBEB" }}>
              {SERVICES.map(svc => (
                <div
                  key={svc.name}
                  style={{ borderRight: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB", padding: "32px 36px", background: "#FFFFFF" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
                    <span style={{ fontSize: "16px", fontWeight: 500 }}>{svc.name}</span>
                    <span style={{ fontSize: "22px", fontWeight: 300, letterSpacing: "-0.02em" }}>{svc.price}</span>
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#777", fontWeight: 300, marginBottom: "24px" }}>{svc.desc}</p>
                  <button
                    onClick={() => openCheckout(svc)}
                    aria-label={`Book ${svc.name} — ${svc.price}`}
                    style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 20px", border: "1px solid #EBEBEB", background: "transparent", cursor: "pointer", fontFamily: "inherit", color: "#0A0A0A", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#0A0A0A"; e.currentTarget.style.color = "#FFFFFF"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0A0A0A"; }}
                  >
                    {svc.price === "Custom" ? "Request a Quote" : "Book This"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ──────────────────────────────────────────────────────── */}
          <section
            aria-labelledby="cta-heading"
            style={{ background: "#0A0A0A", color: "#FFFFFF", padding: "120px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}
          >
            <h2
              id="cta-heading"
              style={{ fontSize: "56px", fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.02em", margin: 0 }}
            >
              Aerial cinematography<br />for locations that<br />require a plan.
            </h2>
            <div>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.55)", marginBottom: "36px", fontWeight: 300 }}>
                Tell us where you need to go. We assess the location, coordinate the permits, plan the mission, and deliver footage that can't be replicated anywhere else.
              </p>
              <button
                onClick={() => setMissionOpen(true)}
                aria-label="Open mission planning form"
                style={{ padding: "14px 32px", border: "1px solid rgba(255,255,255,0.25)", color: "#FFFFFF", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", background: "transparent", fontFamily: "inherit", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#3D5A47"; e.currentTarget.style.borderColor = "#3D5A47"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
              >
                Plan a Mission
              </button>
            </div>
          </section>

        </main>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer
          role="contentinfo"
          style={{ borderTop: "1px solid #EBEBEB", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#777" }}
        >
          <span>© {new Date().getFullYear()} Giant Cedar. All rights reserved.</span>
          <div style={{ display: "flex", gap: "32px" }}>
            <a href="/privacy" style={{ color: "#777", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "#0A0A0A")} onMouseLeave={e => (e.currentTarget.style.color = "#777")}>Privacy Policy</a>
            <a href="/terms" style={{ color: "#777", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "#0A0A0A")} onMouseLeave={e => (e.currentTarget.style.color = "#777")}>Terms of Service</a>
            <a href="mailto:hello@giant-cedar.com" style={{ color: "#777", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "#0A0A0A")} onMouseLeave={e => (e.currentTarget.style.color = "#777")}>hello@giant-cedar.com</a>
          </div>
        </footer>

      </div>

      {/* ── CHECKOUT MODAL ───────────────────────────────────────────────── */}
      {checkoutOpen && selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
          aria-describedby="checkout-desc"
          style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
        >
          {/* Backdrop */}
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setCheckoutOpen(false)}
            aria-hidden="true"
          />
          {/* Modal */}
          <div
            style={{ position: "relative", background: "#FFFFFF", maxWidth: "520px", width: "100%", padding: "48px" }}
            role="document"
          >
            {/* Close */}
            <button
              onClick={() => setCheckoutOpen(false)}
              aria-label="Close checkout"
              style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#777", lineHeight: 1 }}
            >
              ×
            </button>

            <h2
              id="checkout-title"
              style={{ fontSize: "22px", fontWeight: 500, marginBottom: "8px" }}
            >
              {selectedService.name}
            </h2>
            <p
              id="checkout-desc"
              style={{ fontSize: "14px", color: "#777", lineHeight: 1.6, marginBottom: "32px" }}
            >
              {selectedService.desc}
            </p>

            {selectedService.price !== "Custom" && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB", marginBottom: "32px" }}>
                <span style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#777" }}>Amount due</span>
                <span style={{ fontSize: "28px", fontWeight: 300, letterSpacing: "-0.02em" }}>{selectedService.price}</span>
              </div>
            )}

            {/* Square checkout placeholder */}
            <div style={{ background: "#F7F7F7", padding: "24px", marginBottom: "24px", border: "1px solid #EBEBEB" }}>
              <div style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#777", marginBottom: "16px" }}>Secure Checkout via Square</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input aria-label="Full name" placeholder="Full name" disabled style={{ padding: "12px 14px", border: "1px solid #EBEBEB", background: "#FFF", fontSize: "14px", fontFamily: "inherit", color: "#aaa" }} />
                <input aria-label="Email address" placeholder="Email address" disabled style={{ padding: "12px 14px", border: "1px solid #EBEBEB", background: "#FFF", fontSize: "14px", fontFamily: "inherit", color: "#aaa" }} />
                <input aria-label="Card number" placeholder="Card number" disabled style={{ padding: "12px 14px", border: "1px solid #EBEBEB", background: "#FFF", fontSize: "14px", fontFamily: "inherit", color: "#aaa" }} />
                <div style={{ display: "flex", gap: "12px" }}>
                  <input aria-label="Expiry date" placeholder="MM / YY" disabled style={{ padding: "12px 14px", border: "1px solid #EBEBEB", background: "#FFF", fontSize: "14px", fontFamily: "inherit", color: "#aaa", flex: 1 }} />
                  <input aria-label="CVV" placeholder="CVV" disabled style={{ padding: "12px 14px", border: "1px solid #EBEBEB", background: "#FFF", fontSize: "14px", fontFamily: "inherit", color: "#aaa", flex: 1 }} />
                </div>
              </div>
              <button
                disabled
                aria-disabled="true"
                style={{ width: "100%", marginTop: "16px", padding: "14px", background: "#BDBDBD", color: "#FFF", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "not-allowed", fontFamily: "inherit" }}
              >
                {selectedService.price === "Custom" ? "Send Inquiry" : `Pay ${selectedService.price}`}
              </button>
            </div>

            {/* Square / legal disclaimer */}
            <p style={{ fontSize: "11px", lineHeight: 1.6, color: "#AAA" }}>
              Payment processing is provided by{" "}
              <a href="https://squareup.com" target="_blank" rel="noopener noreferrer" style={{ color: "#777", textDecoration: "underline" }}>Square (squareup.com)</a>.{" "}
              By submitting payment information, you authorize Giant Cedar to process your payment through Square in accordance with Square's{" "}
              <a href="https://squareup.com/us/en/legal/general/ua" target="_blank" rel="noopener noreferrer" style={{ color: "#777", textDecoration: "underline" }}>Payment Terms</a>{" "}
              and{" "}
              <a href="https://squareup.com/us/en/legal/general/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#777", textDecoration: "underline" }}>Privacy Policy</a>.{" "}
              Card data is handled by Square's PCI-DSS Level 1 compliant payment infrastructure and is never stored on our servers. See our{" "}
              <a href="/privacy" style={{ color: "#777", textDecoration: "underline" }}>Privacy Policy</a>{" "}
              and{" "}
              <a href="/terms" style={{ color: "#777", textDecoration: "underline" }}>Terms of Service</a>.
            </p>
          </div>
        </div>
      )}

      {/* ── Existing dialogs ─────────────────────────────────────────────── */}
      <MissionDialog  open={missionOpen}  onOpenChange={setMissionOpen} />
      <ContactDialog  open={contactOpen}  onOpenChange={setContactOpen} />
      <AboutDialog    open={aboutOpen}    onOpenChange={setAboutOpen}   />
    </>
  );
};

export default Index;
