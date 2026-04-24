/**
 * AlpineEditorial.tsx — Theme B
 * Dark forest header with cedar logo mark, warm off-white body,
 * Georgia serif headlines, editorial magazine grid.
 * All copy sourced from src/content/copy.ts
 */

import { useState, useEffect } from "react";
import { MissionDialog } from "@/components/MissionDialog";
import { ContactDialog } from "@/components/ContactDialog";
import { AboutDialog } from "@/components/AboutDialog";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { COPY, type ServiceItem } from "@/content/copy";
import { type Variant } from "@/hooks/useVariant";
import aerial2 from "@/assets/aerial-2.jpg";
import aerial3 from "@/assets/aerial-3.jpg";
import aerial6 from "@/assets/aerial-6.jpg";
import aerial7 from "@/assets/aerial-7.jpg";
import heroImage from "@/assets/hero-aerial.jpg";

// ── Palette ────────────────────────────────────────────────────────────────
const C = {
  headerBg:    "#0D1F0D",
  headerText:  "#E8E0D0",
  cream:       "#F8F6F1",
  warm:        "#EDE9E2",
  ink:         "#1A1A18",
  muted:       "#7A7570",
  border:      "#D4CFC8",
  green:       "#2D5A27",
  greenLight:  "#3D7A35",
  accent:      "#8B6914",
};

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS  = "'DM Sans', -apple-system, sans-serif";

// ── Cedar Tree Logo Mark ───────────────────────────────────────────────────
function CedarMark({ size = 32, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={Math.round(size * 1.15)} viewBox="0 0 32 37" fill="none" aria-hidden="true">
      {/* Layered cedar silhouette */}
      <polygon points="16,1 29,14 3,14"  fill={color} opacity="0.85" />
      <polygon points="16,8 31,23 1,23"  fill={color} opacity="0.92" />
      <polygon points="16,15 32,32 0,32" fill={color} />
      {/* Trunk */}
      <rect x="13.5" y="32" width="5" height="5" rx="0.5" fill={color} />
    </svg>
  );
}

interface YTVideo { id: string; title: string; publishedAt: string; thumbnail: string; description: string; }
const STATIC_IMGS = [aerial2, aerial3, aerial6, aerial7];

interface Props {
  track: (event: string, meta?: Record<string, unknown>) => void;
  variant: Variant;
}

export function AlpineEditorial({ track, variant }: Props) {
  const [missionOpen,  setMissionOpen]  = useState(false);
  const [contactOpen,  setContactOpen]  = useState(false);
  const [aboutOpen,    setAboutOpen]    = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedSvc,  setSelectedSvc]  = useState<ServiceItem | null>(null);
  const [videos,       setVideos]       = useState<YTVideo[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}videos.json`)
      .then(r => r.json()).then(d => setVideos(d.videos || [])).catch(() => {});
  }, []);

  const openCheckout = (svc: ServiceItem) => {
    track("service_click", { service: svc.name });
    setSelectedSvc(svc);
    setCheckoutOpen(true);
  };

  const openMission = (source: string) => {
    track("mission_cta_click", { source });
    setMissionOpen(true);
  };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:text-sm">
        Skip to main content
      </a>

      <div style={{ fontFamily: SANS, background: C.cream, color: C.ink, minHeight: "100vh" }}>

        {/* ── HEADER / NAV ──────────────────────────────────────────────── */}
        <header role="banner">

          {/* Top bar — issue line */}
          <div style={{ background: C.headerBg, padding: "0 48px", height: "36px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(232,224,208,0.5)", fontFamily: SANS }}>
              Expedition Aerial Cinematography
            </span>
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "rgba(232,224,208,0.4)", fontFamily: SANS }}>
              Western United States &amp; International
            </span>
          </div>

          {/* Main nav */}
          <nav aria-label="Main navigation" style={{
            background: C.headerBg, padding: "0 48px", height: "72px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: `3px solid ${C.green}`, position: "sticky", top: 0, zIndex: 100,
          }}>
            {/* Logo mark + wordmark */}
            <a href="/" aria-label="Giant Cedar — home" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: C.headerText }}>
              <CedarMark size={28} color={C.headerText} />
              <div>
                <div style={{ fontSize: "18px", fontWeight: 500, letterSpacing: "0.06em", lineHeight: 1.1, fontFamily: SERIF }}>
                  Giant Cedar
                </div>
                <div style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(232,224,208,0.55)", marginTop: "1px", fontFamily: SANS }}>
                  Aerial Cinematography
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <ul role="menubar" style={{ display: "flex", gap: "36px", listStyle: "none", margin: 0, padding: 0 }}>
              {[
                { label: "Field Work",   action: () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }) },
                { label: "Capabilities", action: () => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" }) },
                { label: "About",        action: () => { track("contact_open", { type: "about" }); setAboutOpen(true); } },
                { label: "Contact",      action: () => { track("contact_open", { type: "contact" }); setContactOpen(true); } },
              ].map(({ label, action }) => (
                <li key={label} role="none">
                  <button role="menuitem" onClick={action} style={{ fontSize: "13px", letterSpacing: "0.04em", color: "rgba(232,224,208,0.7)", background: "none", border: "none", cursor: "pointer", fontFamily: SANS, padding: "4px 0", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.headerText)}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(232,224,208,0.7)")}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            <button onClick={() => openMission("nav")} aria-label="Plan a mission"
              style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "9px 20px", background: C.green, color: "#FFFFFF", border: "none", cursor: "pointer", fontFamily: SANS, transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = C.greenLight)}
              onMouseLeave={e => (e.currentTarget.style.background = C.green)}>
              Plan a Mission
            </button>
          </nav>
        </header>

        <main id="main-content" role="main">

          {/* ── HERO — full-bleed image with overlay text ──────────────── */}
          <section aria-labelledby="hero-heading" style={{ position: "relative", height: "88vh", minHeight: "560px", overflow: "hidden" }}>
            <img src={heroImage} alt="Aerial cinematography — expedition aerial over remote terrain"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />
            {/* Gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,31,13,0.82) 0%, rgba(13,31,13,0.45) 55%, rgba(13,31,13,0.15) 100%)" }} />

            <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 64px 72px" }}>
              {/* Field report label */}
              <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,224,208,0.6)", marginBottom: "20px", fontFamily: SANS }}>
                ◆ Field Report — Expedition Aerial
              </div>

              <h1 id="hero-heading" style={{ fontSize: "clamp(52px,7vw,96px)", fontWeight: 400, lineHeight: 0.92, letterSpacing: "-0.02em", margin: "0 0 28px", color: C.headerText, fontFamily: SERIF, maxWidth: "680px" }}>
                {COPY.hero.headline.replace(/\n/g, " ")}
              </h1>

              <p style={{ fontSize: "17px", lineHeight: 1.65, color: "rgba(232,224,208,0.75)", maxWidth: "440px", marginBottom: "40px", fontWeight: 300, fontFamily: SANS }}>
                {COPY.hero.subheadline}
              </p>

              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <button onClick={() => openMission("hero")} aria-label="Plan a mission"
                  style={{ padding: "14px 32px", background: C.green, color: "#FFFFFF", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: SANS, transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = C.greenLight)}
                  onMouseLeave={e => (e.currentTarget.style.background = C.green)}>
                  Plan a Mission
                </button>
                <button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                  style={{ padding: "14px 24px", background: "transparent", color: "rgba(232,224,208,0.8)", fontSize: "13px", letterSpacing: "0.08em", border: "1px solid rgba(232,224,208,0.3)", cursor: "pointer", fontFamily: SANS, transition: "all 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(232,224,208,0.7)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(232,224,208,0.3)")}>
                  View Field Work ↓
                </button>
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", gap: "48px", marginTop: "56px", paddingTop: "32px", borderTop: "1px solid rgba(232,224,208,0.2)" }}>
                {COPY.stats.map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize: "36px", fontWeight: 300, color: C.headerText, lineHeight: 1, fontFamily: SERIF }}>{s.value}</div>
                    <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(232,224,208,0.5)", marginTop: "6px", fontFamily: SANS }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SELECTED WORK ──────────────────────────────────────────── */}
          <section id="work" aria-labelledby="work-heading" style={{ background: C.cream }}>

            {/* Section header — editorial divider */}
            <div style={{ padding: "52px 64px 40px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, fontFamily: SANS, marginBottom: "8px" }}>Portfolio</div>
                <h2 id="work-heading" style={{ fontSize: "28px", fontWeight: 400, fontFamily: SERIF, margin: 0, letterSpacing: "-0.01em" }}>{COPY.workSection.heading}</h2>
              </div>
              <span style={{ fontSize: "13px", color: C.muted, fontFamily: SANS }}>
                {COPY.portfolio.length + videos.length} {COPY.workSection.suffix}
              </span>
            </div>

            {/* Editorial photo grid */}
            <div role="list" aria-label="Portfolio projects">

              {/* YouTube videos — featured large */}
              {videos.map((video, i) => (
                <article key={video.id} role="listitem" style={{ display: "grid", gridTemplateColumns: i === 0 ? "3fr 1fr" : "1fr 1fr", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ borderRight: `1px solid ${C.border}`, overflow: "hidden" }}>
                    <YouTubeEmbed videoId={video.id} thumbnail={video.thumbnail} />
                  </div>
                  <div style={{ padding: "40px 48px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent, fontFamily: SANS, marginBottom: "12px" }}>Drone Cinematography</div>
                    <h3 style={{ fontSize: "24px", fontWeight: 400, fontFamily: SERIF, lineHeight: 1.2, marginBottom: "12px" }}>{video.title}</h3>
                    <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.6, fontFamily: SANS }}>{video.description?.slice(0, 120)}{video.description?.length > 120 ? "…" : ""}</p>
                    <div style={{ fontSize: "11px", color: C.muted, fontFamily: SANS, marginTop: "20px", letterSpacing: "0.05em" }}>{video.publishedAt?.slice(0, 7)}</div>
                  </div>
                </article>
              ))}

              {/* Static portfolio — alternating editorial layout */}
              {COPY.portfolio.map((item, i) => {
                const isWide = i === 0 && videos.length === 0;
                const isReverse = i % 2 !== 0;
                return (
                  <article key={i} role="listitem" style={{
                    display: "grid",
                    gridTemplateColumns: isWide ? "1fr" : isReverse ? "1fr 2fr" : "2fr 1fr",
                    borderBottom: `1px solid ${C.border}`,
                    flexDirection: isReverse ? "row-reverse" : "row",
                  }}>
                    {isReverse && (
                      <div style={{ padding: "40px 48px", display: "flex", flexDirection: "column", justifyContent: "flex-end", borderRight: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent, fontFamily: SANS, marginBottom: "12px" }}>{item.type}</div>
                        <h3 style={{ fontSize: "24px", fontWeight: 400, fontFamily: SERIF, lineHeight: 1.2, marginBottom: "10px" }}>{item.title}</h3>
                        <div style={{ fontSize: "12px", color: C.muted, fontFamily: SANS, letterSpacing: "0.04em" }}>{item.location}</div>
                      </div>
                    )}
                    <div style={{ overflow: "hidden", height: isWide ? "520px" : "320px" }}>
                      <img src={STATIC_IMGS[i]} alt={`${item.title} — aerial photography in ${item.location}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                    </div>
                    {!isReverse && (
                      <div style={{ padding: "40px 48px", display: "flex", flexDirection: "column", justifyContent: "flex-end", borderLeft: isWide ? "none" : `1px solid ${C.border}` }}>
                        <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent, fontFamily: SANS, marginBottom: "12px" }}>{item.type}</div>
                        <h3 style={{ fontSize: "24px", fontWeight: 400, fontFamily: SERIF, lineHeight: 1.2, marginBottom: "10px" }}>{item.title}</h3>
                        <div style={{ fontSize: "12px", color: C.muted, fontFamily: SANS, letterSpacing: "0.04em" }}>{item.location}</div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          {/* ── CAPABILITIES ───────────────────────────────────────────── */}
          <section id="capabilities" aria-labelledby="caps-heading" style={{ background: C.headerBg, color: C.headerText, padding: "80px 64px" }}>
            {/* Single shared grid — rows guaranteed aligned across both columns */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 80px", maxWidth: "1200px", margin: "0 auto" }}>
              {/* Header row — left column */}
              <div style={{ paddingBottom: "40px", borderBottom: `1px solid rgba(232,224,208,0.2)` }}>
                <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,224,208,0.4)", fontFamily: SANS, marginBottom: "16px" }}>What We Do</div>
                <h2 id="caps-heading" style={{ fontSize: "32px", fontWeight: 400, fontFamily: SERIF, lineHeight: 1.15, margin: 0 }}>{COPY.capsSection.capabilitiesHeading}</h2>
              </div>
              {/* Header row — right column */}
              <div style={{ paddingBottom: "40px", borderBottom: `1px solid rgba(232,224,208,0.2)` }}>
                <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,224,208,0.4)", fontFamily: SANS, marginBottom: "16px" }}>Operating Area</div>
                <h2 style={{ fontSize: "32px", fontWeight: 400, fontFamily: SERIF, lineHeight: 1.15, margin: 0 }}>{COPY.capsSection.whereWeGoHeading}</h2>
              </div>
              {/* Data rows — zipped so each pair shares a grid row */}
              {Array.from({ length: Math.max(COPY.capabilities.length, COPY.whereWeGo.length) }, (_, i) => [
                <div key={`cap-${i}`} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderBottom: `1px solid rgba(232,224,208,0.12)` }}>
                  <span style={{ color: C.greenLight, fontSize: "18px", fontFamily: SERIF, minWidth: "24px" }}>0{i+1}</span>
                  <span style={{ fontSize: "16px", fontWeight: 300, fontFamily: SANS }}>{COPY.capabilities[i] ?? ""}</span>
                </div>,
                <div key={`area-${i}`} style={{ padding: "16px 0", borderBottom: `1px solid rgba(232,224,208,0.12)`, fontSize: "16px", fontWeight: 300, fontFamily: SANS, display: "flex", alignItems: "center" }}>
                  {COPY.whereWeGo[i] ?? ""}
                </div>,
              ])}
            </div>
          </section>

          {/* ── ACCESS METHODS ─────────────────────────────────────────── */}
          <section aria-labelledby="access-heading" style={{ background: C.warm, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "80px 64px" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", marginBottom: "60px" }}>
                <div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, fontFamily: SANS, marginBottom: "16px" }}>Access & Logistics</div>
                  <h2 id="access-heading" style={{ fontSize: "40px", fontWeight: 400, fontFamily: SERIF, lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
                    {COPY.access.heading}
                  </h2>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "4px" }}>
                  <p style={{ fontSize: "16px", lineHeight: 1.75, color: C.muted, fontFamily: SANS, fontWeight: 300, margin: 0 }}>
                    {COPY.access.subheading}
                  </p>
                </div>
              </div>
              {/* Methods grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: C.border }}>
                {COPY.access.methods.map((method, i) => (
                  <div key={i} style={{ background: C.cream, padding: "36px 40px" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, fontFamily: SANS, marginBottom: "10px" }}>
                      0{i + 1}
                    </div>
                    <h3 style={{ fontSize: "19px", fontWeight: 400, fontFamily: SERIF, margin: "0 0 12px" }}>{method.label}</h3>
                    <p style={{ fontSize: "14px", lineHeight: 1.75, color: C.muted, fontFamily: SANS, margin: 0 }}>{method.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── LOGISTICS / EDITORIAL ESSAY ────────────────────────────── */}
          <section aria-labelledby="logistics-heading" style={{ padding: "96px 64px", maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px" }}>
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, fontFamily: SANS, marginBottom: "16px" }}>How We Work</div>
                <h2 id="logistics-heading" style={{ fontSize: "36px", fontWeight: 400, fontFamily: SERIF, lineHeight: 1.15, letterSpacing: "-0.01em", whiteSpace: "pre-line" }}>
                  {COPY.logistics.heading}
                </h2>
                {/* Pull quote decoration */}
                <div style={{ width: "48px", height: "3px", background: C.green, marginTop: "32px" }} />
              </div>
              <div style={{ paddingTop: "8px" }}>
                {COPY.logistics.paragraphs.map((p, i) => (
                  <p key={i} style={{ fontSize: "17px", lineHeight: 1.85, color: "#3D3A34", fontWeight: 300, fontFamily: SANS, marginBottom: i < COPY.logistics.paragraphs.length - 1 ? "24px" : 0 }}>{p}</p>
                ))}
              </div>
            </div>
          </section>

          {/* ── SERVICES ───────────────────────────────────────────────── */}
          <section id="services" aria-labelledby="services-heading" style={{ background: C.warm, padding: "80px 64px", borderTop: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "48px" }}>
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, fontFamily: SANS, marginBottom: "8px" }}>Engage</div>
                <h2 id="services-heading" style={{ fontSize: "28px", fontWeight: 400, fontFamily: SERIF, margin: 0 }}>{COPY.servicesSection.heading}</h2>
              </div>
              <span style={{ fontSize: "13px", color: C.muted, fontFamily: SANS }}>{COPY.servicesSection.qualifier}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: C.border }}>
              {COPY.services.map(svc => (
                <div key={svc.name} style={{ background: C.cream, padding: "36px 40px" }}>
                  <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, fontFamily: SANS, marginBottom: "10px" }}>Day Rate</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "14px" }}>
                    <h3 style={{ fontSize: "20px", fontWeight: 400, fontFamily: SERIF, margin: 0 }}>{svc.name}</h3>
                    <span style={{ fontSize: "26px", fontWeight: 300, fontFamily: SERIF, letterSpacing: "-0.02em", color: C.ink }}>{svc.price}</span>
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: C.muted, fontFamily: SANS, marginBottom: "28px" }}>{svc.desc}</p>
                  <button onClick={() => openCheckout(svc)} aria-label={`${svc.price === "Custom" ? "Request quote for" : "Book"} ${svc.name}`}
                    style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "10px 22px", border: `1px solid ${C.green}`, background: "transparent", cursor: "pointer", fontFamily: SANS, color: C.green, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.green; e.currentTarget.style.color = "#FFFFFF"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.green; }}>
                    {svc.price === "Custom" ? COPY.servicesSection.quoteLabel : COPY.servicesSection.bookLabel}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA — editorial full-width ─────────────────────────────── */}
          <section aria-labelledby="cta-heading" style={{ background: C.headerBg, padding: "120px 64px", textAlign: "center" }}>
            <div style={{ marginBottom: "24px" }}>
              <CedarMark size={40} color="rgba(232,224,208,0.4)" />
            </div>
            <h2 id="cta-heading" style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 400, fontFamily: SERIF, lineHeight: 1.1, letterSpacing: "-0.02em", color: C.headerText, maxWidth: "800px", margin: "0 auto 28px", whiteSpace: "pre-line" }}>
              {COPY.cta.heading}
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(232,224,208,0.6)", maxWidth: "480px", margin: "0 auto 48px", lineHeight: 1.7, fontFamily: SANS, fontWeight: 300 }}>
              {COPY.cta.body}
            </p>
            <button onClick={() => openMission("cta")} aria-label="Open mission planning form"
              style={{ padding: "16px 40px", background: C.green, color: "#FFFFFF", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: SANS, transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = C.greenLight)}
              onMouseLeave={e => (e.currentTarget.style.background = C.green)}>
              {COPY.cta.buttonLabel}
            </button>
          </section>

        </main>

        {/* ── FOOTER ─────────────────────────────────────────────────────── */}
        <footer role="contentinfo" style={{ background: "#0A0F0A", borderTop: `1px solid rgba(255,255,255,0.06)`, padding: "36px 64px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CedarMark size={18} color="rgba(232,224,208,0.3)" />
            <span style={{ fontSize: "12px", color: "rgba(232,224,208,0.35)", fontFamily: SANS }}>{COPY.footer.copyright}</span>
          </div>
          <div style={{ display: "flex", gap: "28px" }}>
            {COPY.footer.links.map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: "12px", color: "rgba(232,224,208,0.35)", textDecoration: "none", fontFamily: SANS, transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(232,224,208,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(232,224,208,0.35)")}>{l.label}</a>
            ))}
          </div>
        </footer>
      </div>

      {/* ── CHECKOUT MODAL ─────────────────────────────────────────────── */}
      {checkoutOpen && selectedSvc && (
        <div role="dialog" aria-modal="true" aria-labelledby="checkout-title" aria-describedby="checkout-desc"
          style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }} onClick={() => setCheckoutOpen(false)} aria-hidden="true" />
          <div style={{ position: "relative", background: C.cream, maxWidth: "520px", width: "100%", padding: "48px" }} role="document">
            <button onClick={() => setCheckoutOpen(false)} aria-label="Close checkout" style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: C.muted, lineHeight: 1, fontFamily: SERIF }}>×</button>
            <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, fontFamily: SANS, marginBottom: "8px" }}>Book</div>
            <h2 id="checkout-title" style={{ fontSize: "24px", fontWeight: 400, fontFamily: SERIF, marginBottom: "8px" }}>{selectedSvc.name}</h2>
            <p id="checkout-desc" style={{ fontSize: "14px", color: C.muted, lineHeight: 1.6, marginBottom: "32px", fontFamily: SANS }}>{selectedSvc.desc}</p>
            {selectedSvc.price !== "Custom" && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, marginBottom: "32px" }}>
                <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, fontFamily: SANS }}>{COPY.checkout.amountLabel}</span>
                <span style={{ fontSize: "30px", fontWeight: 300, fontFamily: SERIF }}>{selectedSvc.price}</span>
              </div>
            )}
            <div style={{ background: C.warm, padding: "24px", marginBottom: "24px", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: "16px", fontFamily: SANS }}>{COPY.checkout.heading}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[["Full name","name"],["Email address","email"],["Card number","card"]].map(([ph, al]) => (
                  <input key={al} aria-label={ph} placeholder={ph} disabled style={{ padding: "12px 14px", border: `1px solid ${C.border}`, background: C.cream, fontSize: "14px", fontFamily: SANS, color: "#aaa" }} />
                ))}
                <div style={{ display: "flex", gap: "12px" }}>
                  <input aria-label="Expiry date" placeholder="MM / YY" disabled style={{ padding: "12px 14px", border: `1px solid ${C.border}`, background: C.cream, fontSize: "14px", fontFamily: SANS, color: "#aaa", flex: 1 }} />
                  <input aria-label="CVV" placeholder="CVV" disabled style={{ padding: "12px 14px", border: `1px solid ${C.border}`, background: C.cream, fontSize: "14px", fontFamily: SANS, color: "#aaa", flex: 1 }} />
                </div>
              </div>
              <button disabled aria-disabled="true" style={{ width: "100%", marginTop: "16px", padding: "14px", background: "#BDBDBD", color: "#FFF", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "not-allowed", fontFamily: SANS }}>
                {selectedSvc.price === "Custom" ? COPY.servicesSection.quoteLabel : `Pay ${selectedSvc.price}`}
              </button>
            </div>
            <p style={{ fontSize: "11px", lineHeight: 1.6, color: "#AAA", fontFamily: SANS }}>
              Payment processing is provided by <a href="https://squareup.com" target="_blank" rel="noopener noreferrer" style={{ color: C.muted, textDecoration: "underline" }}>Square (squareup.com)</a>. By submitting payment information, you authorize Giant Cedar to process your payment through Square in accordance with Square's <a href="https://squareup.com/us/en/legal/general/ua" target="_blank" rel="noopener noreferrer" style={{ color: C.muted, textDecoration: "underline" }}>Payment Terms</a> and <a href="https://squareup.com/us/en/legal/general/privacy" target="_blank" rel="noopener noreferrer" style={{ color: C.muted, textDecoration: "underline" }}>Privacy Policy</a>. Card data is handled by Square's PCI-DSS Level 1 compliant payment infrastructure and is never stored on our servers.
            </p>
          </div>
        </div>
      )}

      <MissionDialog open={missionOpen} onOpenChange={setMissionOpen} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      <AboutDialog   open={aboutOpen}   onOpenChange={setAboutOpen}   />
    </>
  );
}
