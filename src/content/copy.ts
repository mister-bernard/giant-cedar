/**
 * copy.ts — Single source of truth for all Giant Cedar site copy.
 *
 * BOTH themes (AlpineEditorial + MinimalistArchitect) import from here.
 * Edit once → updates both variants automatically.
 *
 * Layout, typography, and color live in the theme files.
 * Words live here.
 */

export const COPY = {
  brand: {
    name: "Giant Cedar",
    email: "hello@giant-cedar.com",
    instagram: "https://instagram.com/giantcedar",
    youtube: "https://youtube.com/channel/UCpVbldUV8E4ZySlEFKS0LuQ",
  },

  hero: {
    headline: "Aerial cinema\nfor hard\nplaces.",
    subheadline:
      "An expedition-grade aerial company operating in the Western United States and internationally. We handle permits, logistics, and airspace for every location — so the only thing you think about is the shot.",
    ctaLabel: "Plan a Mission →",
  },

  stats: [
    { value: "11",   label: "Countries flown"   },
    { value: "100%", label: "Permits handled"    },
    { value: "∞",    label: "Altitude limit"     },
  ],

  capabilities: [
    "Drone Cinematography",
    "Fixed-Wing Aerial Photography",
    "Mission Planning",
    "Remote Location Operations",
  ],

  whereWeGo: [
    "Western United States",
    "International on request",
    "Permits & logistics — fully handled",
    "Remote & backcountry terrain",
  ],

  logistics: {
    heading: "We handle\nevery detail.",
    paragraphs: [
      "Flying in Oman, China, or anywhere else doesn't start with a drone. It starts with permits. Airspace authorization, local aviation authority approvals, restricted zone waivers, operator certifications — the paperwork that most production teams never want to touch.",
      "We take care of all of it. Every country we fly in, every restricted area we operate near, every flight plan that needs regulatory sign-off. You brief us on the shot. We figure out what's required to legally and safely take it.",
      "That includes ground transport coordination, local liaison, customs documentation for equipment, and contingency planning for everything that can go wrong in a remote location at altitude. The mission is planned before we ever power on a drone.",
    ],
  },

  services: [
    {
      name:  "Expedition Day Rate",
      price: "$2,500",
      desc:  "Full-day drone ops in remote/backcountry terrain. Equipment, operator, and logistics planning included.",
    },
    {
      name:  "Standard Day Rate",
      price: "$1,500",
      desc:  "Full-day drone cinematography at accessible locations. Operator + gear + post delivery.",
    },
    {
      name:  "Mission Planning",
      price: "$750",
      desc:  "Location scouting, airspace research, permit coordination, and logistics brief. Standalone or pre-expedition.",
    },
    {
      name:  "Multi-Day Expedition",
      price: "Custom",
      desc:  "Quoted by mission. Covers all days, logistics, international permits, travel, and local liaison.",
    },
  ],

  cta: {
    heading: "Aerial cinematography\nfor locations that\nrequire a plan.",
    body:    "Tell us where you need to go. We assess the location, coordinate the permits, plan the mission, and deliver footage that can't be replicated anywhere else.",
    buttonLabel: "Plan a Mission",
  },

  portfolio: [
    { location: "Oman · 2024",       title: "Wadi Shab Canyon Expedition", type: "Drone Cinematography" },
    { location: "Idaho · 2024",      title: "Backcountry Series",           type: "Aerial Photography"   },
    { location: "Pacific Northwest", title: "Mountain Expedition",          type: "Multi-day Operation"   },
    { location: "Western US",        title: "Remote Location Ops",          type: "Expedition Aerial"    },
  ],

  workSection: {
    heading: "Selected Work",
    suffix:  "projects",
  },

  capsSection: {
    capabilitiesHeading: "Capabilities",
    whereWeGoHeading:    "Where We Go",
  },

  servicesSection: {
    heading:   "Services & Rates",
    qualifier: "Multi-day expeditions quoted by mission",
    bookLabel: "Book This",
    quoteLabel: "Request a Quote",
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Giant Cedar. All rights reserved.`,
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "hello@giant-cedar.com", href: "mailto:hello@giant-cedar.com" },
    ],
  },

  checkout: {
    heading:    "Secure Checkout via Square",
    amountLabel: "Amount due",
    legalNotice: `Payment processing is provided by Square (squareup.com). By submitting payment information, you authorize Giant Cedar to process your payment through Square in accordance with Square's Payment Terms and Privacy Policy. Card data is handled by Square's PCI-DSS Level 1 compliant payment infrastructure and is never stored on our servers.`,
  },

  meta: {
    title:       "Giant Cedar | Expedition Aerial Cinematography | Western US & International",
    description: "Expedition-grade aerial cinematography and drone photography for remote locations worldwide. We handle all permits, logistics, and airspace coordination so you get the shot.",
  },
} as const;

export type ServiceItem = typeof COPY.services[number];
