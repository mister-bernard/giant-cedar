# Giant Cedar — Draft V2 Revision Plan
*Saved April 2026 · Version 1 tagged on GitHub (v1)*

---

## What V2 Is

V2 transforms the Giant Cedar site from a portfolio/lead-capture page into a functioning aerial footage marketplace with licensing tiers, Vimeo-hosted watermarked previews, a purchase flow, and a clearly articulated brand story. The mission planning functionality stays. The aesthetic stays. We're adding depth and commerce underneath it.

---

## Architecture Overview

```
Frontend (React/Vite → Cloudflare Pages)
  ├── Location Sections (Oman, Idaho, China, Italy…)
  │     ├── Watermarked Vimeo embeds (preview)
  │     └── "License This Footage" CTA → checkout flow
  ├── Brand Story section ("We Go Deep")
  ├── Custom Production Request (enhanced Mission Planning)
  ├── Pricing / Licensing page
  └── Gallery (existing, enhanced)

Backend (Node.js — port from NIS patterns)
  ├── Square payment processing (from NIS)
  ├── License management (SQLite)
  ├── Post-purchase: watermark-stripped or licensed download
  └── Telegram webhook notifications (already in use)

Video Infrastructure
  ├── Vimeo Pro (primary hosting)
  │     ├── Domain-restricted embeds (no direct download)
  │     ├── Vimeo logo watermark on all preview embeds
  │     └── Password-protected originals
  └── FFmpeg watermark pipeline (for download-ready licensed copies)
```

---

## 1. Video Sections — Location-Based Organization

### Section structure
Each location gets its own named section on the homepage with:
- Full-screen autoplay (muted) hero clip on scroll-into-view
- Grid of shorter clips / stills below
- Location title, brief context (one or two sentences max)
- "License Footage" CTA under each clip

### Locations — launch order

| Section | Status | Content |
|---|---|---|
| **Oman** | Ready to build | Wadi canyon aerials, desert formations, coastal clips |
| **Idaho / Western US** | Existing content | Backcountry, mountain, aerial-4.mp4, aerial-5.mov |
| **China** | Coming soon | Placeholder with "in post-production" treatment |
| **Italy** | Future | Placeholder |

### Watermarking plan
- **Preview embeds**: Vimeo Pro logo watermark (giant-cedar.com domain restriction = no direct embed elsewhere)
- **Download copies**: FFmpeg burn-in watermark (semi-transparent GC logo, bottom-right, 15% opacity) — processed once, stored in `/data/watermarked/`
- **Licensed delivery**: Watermark-free original, served via time-limited signed URL after payment
- NIS reference: `sharp` pipeline for images — equivalent for video: `ffmpeg -i input.mp4 -vf "movie=logo.png[wm];[in][wm]overlay=W-w-20:H-h-20:alpha=0.15" -c:a copy output_watermarked.mp4`

---

## 2. Service Offerings

### 2a. Custom Video Production
Enhanced version of "Plan a Mission" — keep the map, add:
- Project type selector (documentary, commercial, editorial, content creator, real estate)
- Duration/scope estimator (half-day / full-day / multi-day / expedition)
- Location type (accessible / remote / international)
- Budget range selector (not required, but filters leads)
- Auto-response acknowledging receipt (currently just Telegram notification)

### 2b. Brand Story Section — "We Go Deep"
New section between portfolio and mission planning. Full-width, cinematic, minimal copy.

**Copy direction:**
> Some locations require a plan. Most operators won't take it on.
> We go further — remote terrain, international deployments, hard weather, tight airspace.
> The shot is the destination. Everything else is logistics.

Three-column breakdown (icon + heading + 2-line description):
- **Remote Access** — Backcountry, international, off-grid. If you can reach it, we can fly it.
- **Multi-Platform** — Drones, fixed-wing, coordinated aerial ops. The right tool for the location.
- **Mission-Ready** — We plan the mission before we fly it. Airspace, weather, logistics, clearances.

---

## 3. Pricing / Licensing Model

### License tiers

| Tier | Who | Price | Terms |
|---|---|---|---|
| **Attribution** | Indie creators, YouTubers under 100K subs | Free | Credit "Giant Cedar / giant-cedar.com" in description + end card |
| **Creator** | YouTubers 100K+, travel/lifestyle content | $150–300/clip | Standard license, non-exclusive, online use |
| **Commercial** | Brand campaigns, ads, corporate video | $500–1,500/clip | Commercial license, usage-specific |
| **Broadcast** | Film, TV, major streaming | $1,500–5,000/clip | Broadcast license, negotiated |
| **Exclusive** | Full exclusivity on a clip | 3–5× standard rate | Clip removed from marketplace |

**Implementation:**
- License selection → Stripe/Square checkout (Square preferred — NIS already running it)
- Attribution tier: form submission only, no payment, manual approval via Telegram notification
- Post-purchase: signed time-limited download URL (15-min expiry, logged)

### "Footage for attribution" flow (indie creator)
1. User selects clip → clicks "Request Attribution License"
2. Form: name, channel URL, subscriber count, how they plan to use it
3. Telegram notification → G approves/denies
4. Approval → automated email with download link

---

## 4. Infrastructure & Technical

### 4a. Payment/Checkout (from NIS)
Port from `north-idaho-sunsets/server.js`:
- Square payment integration (already live, tested)
- SQLite order tracking
- Webhook-based fulfillment
- Telegram order notifications (BERNARD_CHAT_ID already set)

New tables needed:
```sql
CREATE TABLE footage_licenses (
  id TEXT PRIMARY KEY,
  clip_id TEXT NOT NULL,
  tier TEXT NOT NULL,  -- attribution/creator/commercial/broadcast/exclusive
  licensee_name TEXT,
  licensee_email TEXT,
  licensee_url TEXT,
  square_order_id TEXT,
  amount_cents INTEGER,
  approved INTEGER DEFAULT 0,  -- 0=pending, 1=approved, -1=rejected
  created_at TEXT NOT NULL,
  download_token TEXT,
  download_expires_at TEXT,
  downloaded_at TEXT
);

CREATE TABLE footage_clips (
  id TEXT PRIMARY KEY,
  location TEXT NOT NULL,  -- oman, idaho, china, italy
  title TEXT,
  description TEXT,
  duration_sec INTEGER,
  vimeo_id TEXT,
  vimeo_watermarked_id TEXT,
  file_path TEXT,  -- original on disk
  watermarked_path TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL
);
```

### 4b. Hosting → Cloudflare Pages
Current: nginx serving static files from `/home/openclaw/mrb-sh/public/giant-cedar/`

V2: 
- Push to GitHub → Cloudflare Pages auto-deploys on `main` branch
- Custom domain: giant-cedar.com, giantcedar.org → Cloudflare Pages (remove nginx blocks)
- Backend (payment server): stays on VPS, accessible at `api.giant-cedar.com`
- Build command: `npm run build` / output: `dist/`

Setup steps:
1. Connect `mister-bernard/giant-cedar` to Cloudflare Pages
2. Add custom domains in Cloudflare Pages dashboard
3. Update nginx: remove the giant-cedar static serve blocks, add `api.giant-cedar.com` reverse proxy to payment backend
4. Set environment secrets in Cloudflare Pages (Bunny API key, B2 keys, Square keys)

### 4c. Video Hosting — Bunny.net Stream + Backblaze B2

**Decision: Drop Vimeo.** Vimeo is a creator/marketing platform — it has no real signed URL system, can't store clean originals, and hits Enterprise pricing walls as the catalog grows. Its "watermark" feature is a player overlay that yt-dlp strips trivially.

**Since yt-dlp exists, the protection model is simple: the watermark IS the security.**
- Public preview = full-resolution video with burned-in FFmpeg watermark. Ripping it is fine — watermark is permanent in the file.
- Clean original = never publicly accessible. Delivered only via signed time-limited URL after purchase.

**Watermarked previews → Bunny.net Stream**
- $0.01/GB stored, $0.01/GB delivered, free transcoding
- Proper HLS adaptive streaming
- Signed token auth with path-based signing (works correctly for HLS sub-requests)
- S3-compatible upload API → easy from Mac via rclone or Cyberduck
- Estimated: ~$15/mo at launch volume

**Clean originals → Backblaze B2**
- $0.006/GB/month storage (~$12/mo for 2 TB of 4K footage)
- Zero egress cost via Cloudflare CDN (Bandwidth Alliance partner)
- Native S3-compatible pre-signed URLs with TTL
- Files stored exactly as uploaded — no re-encoding of 4K masters
- Upload from Mac: `rclone copy ./footage/ b2:giant-cedar-originals/ --progress`

**FFmpeg watermark pipeline (burn before upload to Bunny):**
```bash
# Tiled watermark — 16 instances, hard to crop out
ffmpeg -i clean.mp4 -i gc-watermark.png \
  -filter_complex "[1]scale=300:-1[tile];[tile]tile=4x4[tiled];[tiled]colorchannelmixer=aa=0.2[wm];[0][wm]overlay=0:0" \
  -c:a copy preview_watermarked.mp4

# Single corner watermark (35% opacity, bottom-right)
ffmpeg -i clean.mp4 -i gc-watermark.png \
  -filter_complex "[1]scale=iw*0.20:-1,colorchannelmixer=aa=0.35[wm];[0][wm]overlay=W-w-40:H-h-40" \
  -c:a copy preview_corner.mp4
```

**Post-purchase signed URL (backend, ~20 lines):**
```js
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  endpoint: "https://s3.us-west-004.backblazeb2.com",
  credentials: { accessKeyId: B2_KEY_ID, secretAccessKey: B2_APP_KEY },
  region: "us-west-004",
});

async function generateDownloadUrl(clipKey) {
  const cmd = new GetObjectCommand({ Bucket: "giant-cedar-originals", Key: clipKey });
  return getSignedUrl(s3, cmd, { expiresIn: 900 }); // 15-min TTL
}
```

Store `bunny_video_id` and `b2_key` per clip in the footage_clips table.

### 4d. SEO Improvements
Current: Schema.org LocalBusiness markup exists. Good start.

Add:
- `og:image`, `og:video` meta tags for each location section
- `<title>` and `<meta description>` updates (current description is generic)
- Structured data: `VideoObject` schema for each clip with location, description, thumbnailUrl
- Sitemap.xml (Vite plugin or static generation)
- robots.txt cleanup
- Page speed: lazy-load all gallery images (add `loading="lazy"`)
- Alt text audit (mostly done, continue)
- Google Search Console verification

Target keywords: "aerial footage Oman," "drone cinematography Idaho," "expedition aerial photography," "license drone footage"

---

## 5. Design & Development

### Immediate visual additions (V2.0)
- Location section headers with coordinates (e.g., `23.6139° N, 58.5922° E · OMAN`)
- Vimeo embeds replacing current self-hosted video where possible
- "License This Clip" button under each video (links to license modal)
- Pricing page (new route `/licensing`)
- Brand story section (new section on homepage)

### Planned enhancements (V2.1+)
- Video player with custom controls (matching Giant Cedar's grayscale aesthetic)
- Map-based browsing: explore footage by clicking locations on a world map (builds on existing MissionMap component)
- Lightbox/fullscreen clip viewer with licensing sidebar
- Client portal: licensed footage downloads, invoice history

### Design principles to maintain
- Dark background, grayscale-until-hover aesthetic
- Georgia serif for headings
- Minimal copy — let footage carry the weight
- No stock photography anywhere

---

## 6. Deployment & Version Control

### Completed
- [x] **v1 tagged** on `mister-bernard/giant-cedar` (GitHub, private) — April 2026
- [x] **Draft V2** saved to repo as `DRAFT-V2.md`

### V2 branch strategy
```
main          → production (Cloudflare Pages auto-deploy)
v2-dev        → V2 development branch
v2-dev/oman   → Oman section (first feature branch)
```

### Deployment sequence for V2
1. Set up Cloudflare Pages connection to repo
2. Develop on `v2-dev` branch locally
3. Preview deployments per branch (Cloudflare Pages does this automatically)
4. Merge to `main` → auto-deploys

---

## Next Steps — Immediate (This Week)

### Step 1: Oman video upload
**Required from G:**
- Raw Oman drone footage files (MP4/MOV)
- Selection of which clips to feature (or upload all and curate)
- Any existing Vimeo account credentials, or create new

**Once received:**
1. Process watermarked versions via FFmpeg
2. Upload originals + watermarked versions to Vimeo
3. Add Oman section to homepage with Vimeo embeds
4. Update existing aerial-5.mov / aerial-4.mp4 to location-specific names

### Step 2: Eli from Russia video description update
On the **Oman** YouTube video by Eli from Russia:
- Add to description: `Aerial cinematography by Giant Cedar · giant-cedar.com/oman · License footage from this shoot`
- This is Eli's channel — requires her to make the edit, or G coordinates with her

On **Giant Cedar's own channels** (Instagram, any other):
- Caption all Oman posts with: `License this footage → giant-cedar.com`

### Step 3: Cloudflare Pages setup
Can be done now without waiting for video files:
1. Go to Cloudflare Pages dashboard
2. Connect `mister-bernard/giant-cedar`
3. Build: `npm run build`, output: `dist`
4. Add domains: giant-cedar.com, giantcedar.org
5. Remove nginx static blocks, update DNS

### Step 4: Backend scaffold
Start the `giant-cedar-api` Node.js project:
- Port Square integration from NIS
- Set up SQLite schema (footage_clips, footage_licenses)
- Vimeo API integration for embed generation
- Deploy to VPS at `api.giant-cedar.com`

---

## Open Questions for G

1. **Oman footage**: Where are the files? Transferring to VPS or uploading from local?
2. **Vimeo account**: Existing account to use, or create under Giant Cedar brand?
3. **Payment processor**: Square (from NIS) or switch to Stripe for V2?
4. **Italy section**: Is there footage, or just a placeholder for now?
5. **Attribution license approval**: Manual (G approves via Telegram) or automatic under certain sub-count threshold?
6. **Domain for API**: `api.giant-cedar.com` or route through `giant-cedar.com/api`?
