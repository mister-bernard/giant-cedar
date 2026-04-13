/**
 * MinimalistArchitect.tsx — Theme A
 * Clean white grid, DM Sans, editorial borders, split-grid hero.
 * All copy sourced from src/content/copy.ts
 */

import { useState, useEffect, useRef } from "react";
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

interface YTVideo { id: string; title: string; publishedAt: string; thumbnail: string; }

const STATIC_IMGS = [aerial2, aerial3, aerial6, aerial7];

interface Props {
  track: (event: string, meta?: Record<string, unknown>) => void;
  variant: Variant;
}

export function MinimalistArchitect({ track, variant }: Props) {
  const [missionOpen,  setMissionOpen]  = useState(false);
  const [contactOpen,  setContactOpen]  = useState(false);
  const [aboutOpen,    setAboutOpen]    = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedSvc,  setSelectedSvc]  = useState<ServiceItem | null>(null);
  const [videos,       setVideos]       = useState<YTVideo[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}videos.json`)
      .then(r => r.json()).then(d => setVideos(d.videos || [])).catch(() => {});
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {}
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
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

  const F = "'DM Sans', sans-serif";

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:text-sm focus:font-medium">
        Skip to main content
      </a>

      <div style={{ fontFamily: F, background: "#FFFFFF", color: "#0A0A0A", minHeight: "100vh" }}>

        {/* NAV */}
        <header role="banner">
          <nav aria-label="Main navigation" ref={menuRef} style={{
            position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center",
            justifyContent: "space-between", padding: "0 48px", height: "68px",
            background: "#FFFFFF", borderBottom: "1px solid #EBEBEB",
          }}>
            <a href="/" aria-label="Giant Cedar — home" style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", color: "#0A0A0A" }}>
              Giant Cedar
            </a>
            <ul role="menubar" style={{ display: "flex", gap: "40px", listStyle: "none", margin: 0, padding: 0 }}>
              {[
                { label: "Work",         action: () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }) },
                { label: "Capabilities", action: () => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" }) },
                { label: "About",        action: () => { track("contact_open", { type: "about" }); setAboutOpen(true); } },
                { label: "Contact",      action: () => { track("contact_open", { type: "contact" }); setContactOpen(true); } },
              ].map(({ label, action }) => (
                <li key={label} role="none">
                  <button role="menuitem" onClick={action} style={{ fontSize: "14px", fontWeight: 400, color: "#777", background: "none", border: "none", cursor: "pointer", fontFamily: F, padding: "4px 0", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#0A0A0A")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#777")}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => openMission("nav")} aria-label="Plan a mission" style={{ fontSize: "14px", color: "#3D5A47", background: "none", border: "none", cursor: "pointer", fontFamily: F, borderBottom: "1px solid transparent", transition: "border-color 0.2s", padding: "2px 0" }}
              onMouseEnter={e => (e.currentTarget.style.borderBottomColor = "#3D5A47")}
              onMouseLeave={e => (e.currentTarget.style.borderBottomColor = "transparent")}>
              Plan a Mission →
            </button>
          </nav>
        </header>

        <main id="main-content" role="main">

          {/* HERO */}
          <section aria-labelledby="hero-heading" style={{ padding: "96px 48px 80px", maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end" }}>
            <div>
              <h1 id="hero-heading" style={{ fontSize: "84px", fontWeight: 300, lineHeight: 0.88, letterSpacing: "-0.03em", margin: 0, whiteSpace: "pre-line" }}>
                {COPY.hero.headline}
              </h1>
            </div>
            <div style={{ paddingBottom: "8px" }}>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#777", maxWidth: "380px", marginBottom: "36px", fontWeight: 300 }}>
                {COPY.hero.subheadline}
              </p>
              <div style={{ display: "flex", gap: "40px", paddingTop: "32px", borderTop: "1px solid #EBEBEB" }}>
                {COPY.stats.map(s => (
                  <div key={s.label}>
                    <span style={{ fontSize: "38px", fontWeight: 300, display: "block" }}>{s.value}</span>
                    <span style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#777", display: "block", marginTop: "4px" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SELECTED WORK */}
          <section id="work" aria-labelledby="work-heading" style={{ borderTop: "1px solid #EBEBEB" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "40px 48px 32px", borderBottom: "1px solid #EBEBEB" }}>
              <h2 id="work-heading" style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 400 }}>{COPY.workSection.heading}</h2>
              <span style={{ fontSize: "13px", color: "#777" }}>{COPY.portfolio.length + videos.length} {COPY.workSection.suffix}</span>
            </div>
            <div role="list" aria-label="Portfolio projects" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderLeft: "1px solid #EBEBEB" }}>
              {videos.map((video, i) => (
                <article key={video.id} role="listitem" style={{ borderRight: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB", overflow: "hidden", gridColumn: i === 0 ? "span 2" : "span 1" }}>
                  <YouTubeEmbed videoId={video.id} thumbnail={video.thumbnail} />
                  <div style={{ padding: "20px 24px 24px", borderTop: "1px solid #EBEBEB" }}>
                    <div style={{ fontSize: "15px", fontWeight: 500, marginBottom: "4px" }}>{video.title}</div>
                    <div style={{ fontSize: "13px", color: "#777" }}>Drone Cinematography · {video.publishedAt?.slice(0, 4)}</div>
                  </div>
                </article>
              ))}
              {COPY.portfolio.map((item, i) => (
                <article key={i} role="listitem" style={{ borderRight: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB", overflow: "hidden" }}>
                  <div style={{ overflow: "hidden" }}>
                    <img src={STATIC_IMGS[i]} alt={`${item.title} — aerial photography in ${item.location}`}
                      style={{ height: i === 0 && videos.length === 0 ? "420px" : "280px", width: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                  </div>
                  <div style={{ padding: "20px 24px 24px", borderTop: "1px solid #EBEBEB" }}>
                    <div style={{ fontSize: "15px", fontWeight: 500, marginBottom: "4px" }}>{item.title}</div>
                    <div style={{ fontSize: "13px", color: "#777" }}>{item.type} · {item.location}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CAPABILITIES */}
          <section id="capabilities" aria-labelledby="caps-heading" style={{ padding: "80px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderTop: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB" }}>
            <div style={{ paddingRight: "48px" }}>
              <h2 id="caps-heading" style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#777", paddingBottom: "28px", borderBottom: "2px solid #0A0A0A", marginBottom: 0 }}>
                {COPY.capsSection.capabilitiesHeading}
              </h2>
              {COPY.capabilities.map(cap => (
                <div key={cap} style={{ padding: "18px 0", borderBottom: "1px solid #EBEBEB", fontSize: "15px", fontWeight: 300 }}>{cap}</div>
              ))}
            </div>
            <div style={{ paddingLeft: "48px", borderLeft: "1px solid #EBEBEB" }}>
              <h2 aria-label="Operating area" style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#777", paddingBottom: "28px", borderBottom: "2px solid #0A0A0A", marginBottom: 0 }}>
                {COPY.capsSection.whereWeGoHeading}
              </h2>
              {COPY.whereWeGo.map((area, i) => (
                <div key={i} style={{ padding: "18px 0", borderBottom: "1px solid #EBEBEB", fontSize: "15px", fontWeight: 300 }}>{area}</div>
              ))}
            </div>
          </section>

          {/* LOGISTICS */}
          <section aria-labelledby="logistics-heading" style={{ padding: "80px 48px", maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px" }}>
            <div>
              <h2 id="logistics-heading" style={{ fontSize: "32px", fontWeight: 300, lineHeight: 1.2, letterSpacing: "-0.01em", whiteSpace: "pre-line" }}>
                {COPY.logistics.heading}
              </h2>
            </div>
            <div style={{ fontSize: "16px", lineHeight: 1.8, color: "#555", fontWeight: 300 }}>
              {COPY.logistics.paragraphs.map((p, i) => (
                <p key={i} style={{ marginBottom: i < COPY.logistics.paragraphs.length - 1 ? "20px" : 0 }}>{p}</p>
              ))}
            </div>
          </section>

          {/* SERVICES */}
          <section id="services" aria-labelledby="services-heading" style={{ background: "#F7F7F7", padding: "80px 48px", borderTop: "1px solid #EBEBEB" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "40px" }}>
              <h2 id="services-heading" style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 400 }}>{COPY.servicesSection.heading}</h2>
              <span style={{ fontSize: "13px", color: "#777" }}>{COPY.servicesSection.qualifier}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px", borderLeft: "1px solid #EBEBEB" }}>
              {COPY.services.map(svc => (
                <div key={svc.name} style={{ borderRight: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB", padding: "32px 36px", background: "#FFFFFF" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
                    <span style={{ fontSize: "16px", fontWeight: 500 }}>{svc.name}</span>
                    <span style={{ fontSize: "22px", fontWeight: 300, letterSpacing: "-0.02em" }}>{svc.price}</span>
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#777", fontWeight: 300, marginBottom: "24px" }}>{svc.desc}</p>
                  <button onClick={() => openCheckout(svc)} aria-label={`${svc.price === "Custom" ? "Request quote for" : "Book"} ${svc.name}`}
                    style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 20px", border: "1px solid #EBEBEB", background: "transparent", cursor: "pointer", fontFamily: F, color: "#0A0A0A", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#0A0A0A"; e.currentTarget.style.color = "#FFFFFF"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0A0A0A"; }}>
                    {svc.price === "Custom" ? COPY.servicesSection.quoteLabel : COPY.servicesSection.bookLabel}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section aria-labelledby="cta-heading" style={{ background: "#0A0A0A", color: "#FFFFFF", padding: "120px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            <h2 id="cta-heading" style={{ fontSize: "56px", fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.02em", margin: 0, whiteSpace: "pre-line" }}>
              {COPY.cta.heading}
            </h2>
            <div>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.55)", marginBottom: "36px", fontWeight: 300 }}>{COPY.cta.body}</p>
              <button onClick={() => openMission("cta")} aria-label="Open mission planning form"
                style={{ padding: "14px 32px", border: "1px solid rgba(255,255,255,0.25)", color: "#FFFFFF", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", background: "transparent", fontFamily: F, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#3D5A47"; e.currentTarget.style.borderColor = "#3D5A47"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}>
                {COPY.cta.buttonLabel}
              </button>
            </div>
          </section>

        </main>

        {/* FOOTER */}
        <footer role="contentinfo" style={{ borderTop: "1px solid #EBEBEB", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#777" }}>
          <span>{COPY.footer.copyright}</span>
          <div style={{ display: "flex", gap: "32px" }}>
            {COPY.footer.links.map(l => (
              <a key={l.label} href={l.href} style={{ color: "#777", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0A0A0A")}
                onMouseLeave={e => (e.currentTarget.style.color = "#777")}>{l.label}</a>
            ))}
          </div>
        </footer>
      </div>

      {/* CHECKOUT MODAL */}
      {checkoutOpen && selectedSvc && (
        <div role="dialog" aria-modal="true" aria-labelledby="checkout-title" aria-describedby="checkout-desc"
          style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setCheckoutOpen(false)} aria-hidden="true" />
          <div style={{ position: "relative", background: "#FFFFFF", maxWidth: "520px", width: "100%", padding: "48px" }} role="document">
            <button onClick={() => setCheckoutOpen(false)} aria-label="Close checkout" style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#777", lineHeight: 1 }}>×</button>
            <h2 id="checkout-title" style={{ fontSize: "22px", fontWeight: 500, marginBottom: "8px" }}>{selectedSvc.name}</h2>
            <p id="checkout-desc" style={{ fontSize: "14px", color: "#777", lineHeight: 1.6, marginBottom: "32px" }}>{selectedSvc.desc}</p>
            {selectedSvc.price !== "Custom" && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB", marginBottom: "32px" }}>
                <span style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#777" }}>{COPY.checkout.amountLabel}</span>
                <span style={{ fontSize: "28px", fontWeight: 300, letterSpacing: "-0.02em" }}>{selectedSvc.price}</span>
              </div>
            )}
            <div style={{ background: "#F7F7F7", padding: "24px", marginBottom: "24px", border: "1px solid #EBEBEB" }}>
              <div style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#777", marginBottom: "16px" }}>{COPY.checkout.heading}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[["Full name","name"],["Email address","email"],["Card number","card"]].map(([ph, al]) => (
                  <input key={al} aria-label={ph} placeholder={ph} disabled style={{ padding: "12px 14px", border: "1px solid #EBEBEB", background: "#FFF", fontSize: "14px", fontFamily: F, color: "#aaa" }} />
                ))}
                <div style={{ display: "flex", gap: "12px" }}>
                  <input aria-label="Expiry date" placeholder="MM / YY" disabled style={{ padding: "12px 14px", border: "1px solid #EBEBEB", background: "#FFF", fontSize: "14px", fontFamily: F, color: "#aaa", flex: 1 }} />
                  <input aria-label="CVV" placeholder="CVV" disabled style={{ padding: "12px 14px", border: "1px solid #EBEBEB", background: "#FFF", fontSize: "14px", fontFamily: F, color: "#aaa", flex: 1 }} />
                </div>
              </div>
              <button disabled aria-disabled="true" style={{ width: "100%", marginTop: "16px", padding: "14px", background: "#BDBDBD", color: "#FFF", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "not-allowed", fontFamily: F }}>
                {selectedSvc.price === "Custom" ? COPY.servicesSection.quoteLabel : `Pay ${selectedSvc.price}`}
              </button>
            </div>
            <p style={{ fontSize: "11px", lineHeight: 1.6, color: "#AAA" }}>
              Payment processing is provided by <a href="https://squareup.com" target="_blank" rel="noopener noreferrer" style={{ color: "#777", textDecoration: "underline" }}>Square (squareup.com)</a>. By submitting payment information, you authorize Giant Cedar to process your payment through Square in accordance with Square's <a href="https://squareup.com/us/en/legal/general/ua" target="_blank" rel="noopener noreferrer" style={{ color: "#777", textDecoration: "underline" }}>Payment Terms</a> and <a href="https://squareup.com/us/en/legal/general/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#777", textDecoration: "underline" }}>Privacy Policy</a>. Card data is handled by Square's PCI-DSS Level 1 compliant payment infrastructure and is never stored on our servers.
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
