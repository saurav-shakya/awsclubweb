**Project:** AWS Cloud Club Website — GCET

**Version:** 1.0

**Date:** April 2026

**Owner:** AWS Cloud Club GCET Core Team

**Status:** Draft

---

## 1. Product Overview

### 1.1 Purpose

Build a public-facing website for the AWS Cloud Club at GCET that showcases the club, lists events, handles student registrations, and provides visibility to sponsors and collaborators.

### 1.2 Problem Statement

Currently the club has no central digital presence. Students miss events due to lack of awareness, and sponsors have no credible page to assess the club. A dedicated website solves both.

### 1.3 Goals

- Establish a credible digital identity for the club
- Enable students to discover and register for events
- Give admins tools to manage events and registrations
- Make the club visible and attractive to sponsors

---

## 2. Target Users

| User Type | Description | Key Need |
| --- | --- | --- |
| Students | Primary audience at GCET | Discover events, register easily |
| Participants | Already registered users | Check event details, updates |
| Sponsors | Industry partners evaluating the club | Credibility, reach, contact info |
| Admin | Club leads managing content | Manage events, view registrations |

---

## 3. Pages & Features

### 3.1 Home Page

- Hero section: Club name, tagline, CTA button ("Explore Events")
- Club stats bar: Members, Events Held, Workshops
- Featured upcoming event card
- Sponsor/partner logo strip
- Quick nav links to About and Events

### 3.2 About Page

- Club mission and vision statement
- Core team cards: Name, Role, Photo, LinkedIn
- Club founding story / history
- AWS partnership badge

### 3.3 Events Page

- Tab toggle: Upcoming Events / Past Events
- Event card: Title, Date, Mode (Online/Offline), Tags, Register button
- Event detail modal or page: Full description, speakers, agenda, venue
- Past events: Photo gallery or recap summary

### 3.4 Registration Flow

- Registration form per event: Name, Email, College, Year, Branch, Phone
- Form validation (client-side)
- Admin can export registrations as CSV

### 3.5 Contact Page

- Contact form: Name, Email, Message, Subject (dropdown: General / Sponsorship / Collaboration)
- Club social links: LinkedIn, Instagram, Twitter/X
- Club email address
- Campus location map embed

### 3.6 Events Admin + CMS (No heavy database)

- Login-protected (admin only)
- Simple “CMS-style” admin UI to manage:
    - **Upcoming events** (create/edit/delete)
    - **Past events** (auto-move when date passes OR manual “Mark as Past”)
    - **Quick Updates / News** (short announcements shown on homepage)
- Minimal storage approach (choose one):
    - **Option A (preferred):** Use Luma as the source of truth for event metadata + registration links, and store only extra fields (photos/videos/recap) in Supabase Storage (or simple JSON)
    - **Option B:** Store everything as simple JSON (no complex relational DB), good for a small club site

### 3.7 Luma Events Integration (Create on Luma → Show on Website)

- Admin creates events on **Luma**
- Website shows events by:
    - Embedding the club’s Luma event/collection page OR
    - Fetching + rendering a clean “Upcoming / Past” list using stored Luma URLs
- Each event card has:
    - Title, date/time, mode, tags
    - **Register** button → opens the Luma event URL
- Admin can paste/update Luma event URLs in the admin panel

### 3.8 Past Event Media (Photos + Videos per Event)

- For every event (especially past events), admin can attach:
    - Photo gallery (multiple images)
    - YouTube/Drive video links (or uploaded clips if needed)
    - Short recap text
- Past event cards/pages show gallery + video section

### 3.9 Homepage Quick Updates (Lightweight)

- A “Quick Updates” strip/section on homepage for:
    - New event announcements
    - Workshop reminders
    - Results / winners / highlights
- Admin can add/edit/remove updates quickly (title + short text + optional link + optional image)

### 3.10 Instagram Story / Reels Embed (Homepage)

- If the club posts a story/reel/post on Instagram, show it on the homepage as an embedded widget
- Implementation options:
    - Use Instagram embed for posts/reels
    - If stories embedding is limited, use a workaround: highlight/stories link + latest posts/reels embed
- Admin can paste the Instagram URL to display as “Latest Update”

---

## 4. Design Requirements

| Attribute | Specification |
| --- | --- |
| Color Theme | AWS-style: Orange (#FF9900), Dark Navy (#232F3E), White |
| Font Style | Clean, modern — Inter or DM Sans |
| Layout | Minimal, not cluttered. Card-based sections |
| Responsive | Fully mobile + desktop responsive |
| Aesthetic | Dark GitHub-inspired with AWS accents |

---

## 5. Non-Functional Requirements

- **Performance:** Page load under 2s on 4G
- **Accessibility:** WCAG 2.1 AA compliant
- **SEO:** Meta tags, OG images for event pages
- **Security:** Admin routes protected, form spam protection
- **Uptime:** 99.9% (via Vercel hosting)

---

## 6. Out of Scope (v1)

- Payment / paid event ticketing
- Discussion forum or community chat
- Mobile app
- Multi-club support
- Certificate generation

---

## 7. Success Metrics

- 200+ student registrations within first 3 events
- 500+ unique monthly visitors within 2 months of launch
- Zero critical bugs in first 30 days
- Admin can publish a new event in under 5 minutes


**Project:** AWS Cloud Club Website — GCET

**Version:** 1.0

**Date:** April 2026

**Author:** AWS Cloud Club GCET Dev Team

**Status:** Draft

---

## 1. Tech Stack

| Layer | Technology | Version | Reason |
| --- | --- | --- | --- |
| Framework | Next.js | 16..x (App Router) | SSR + SEO + file-based routing |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 3.4.x | Utility-first, fast dev |
| Animations | Framer Motion | 11.x | Smooth transitions |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
| Hosting | Vercel | — | Free tier, auto deploy, edge CDN |
|  |  |  |  |
|  |  |  |  |

---

## 1.1 Prerequisites / Setup Requirements

### Accounts

- Vercel account (deployment)
- Supabase account (DB + Storage )auth not reguired
- Luma account (events + registration)
- Instagram business/creator account (optional, for embeds)

### Access & Secrets (Env vars)

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)
- `NEXT_PUBLIC_SITE_URL`

### Admin workflow prerequisites

- Decide admin users (single admin vs multiple)
- Prepare Luma “club page/collection” URL + event URLs
- Decide media hosting: Supabase Storage (recommended) vs YouTube/Drive links

---

## 2. Project Structure (Luma-first + Lightweight Admin CMS)

```jsx
aws-cloud-club-gcet/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                        ← Home (Quick Updates + Instagram embeds)
│   │   ├── about/page.tsx
│   │   ├── events/
│   │   │   ├── page.tsx                    ← Upcoming/Past list (Register → Luma)
│   │   │   └── [slug]/page.tsx             ← Event detail (recap + media gallery)
│   │   └── contact/page.tsx
│   ├── (admin)/
│   │   ├── login/page.tsx
│   │   └── admin/
│   │       ├── page.tsx                    ← Admin dashboard
│   │       ├── events/page.tsx             ← Manage Luma event entries (upcoming/past)
│   │       ├── media/page.tsx              ← Add photos/videos to events
│   │       ├── quick-updates/page.tsx      ← Homepage updates
│   │       └── instagram/page.tsx          ← Instagram URL embeds
│   ├── api/
│   │   ├── events/route.ts                 ← Public events feed
│   │   ├── events/[slug]/route.ts          ← Public event detail (with media)
│   │   ├── admin/
│   │   │   ├── events/route.ts
│   │   │   ├── events/[id]/route.ts
│   │   │   ├── event-media/route.ts
│   │   │   ├── event-media/[id]/route.ts
│   │   │   ├── quick-updates/route.ts
│   │   │   ├── quick-updates/[id]/route.ts
│   │   │   └── instagram-embeds/route.ts
│   │   └── contact/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                        ← Reusable: Button, Card, Modal, Badge
│   ├── layout/                    ← Navbar, Footer
│   ├── events/                    ← EventCard, EventList
│   ├── updates/                   ← QuickUpdateCard, InstagramEmbed
│   ├── media/                     ← Gallery, VideoEmbed
│   └── admin/                     ← AdminShell, AdminTable, EventEditor
├── lib/
│   ├── supabase-client.ts
│   ├── supabase-server.ts
│   ├── auth.ts                    ← Admin auth helpers
│   ├── validators.ts              ← Zod schemas
│   └── slug.ts
├── types/
│   └── index.ts
├── public/
│   └── assets/
├── .env.local
└── next.config.ts
```

---

## 3. Data Model (Lightweight CMS + Luma-first)

Goal: No heavy relational system for events. Luma is the source of truth for event registration + core metadata; the website stores only what Luma doesn’t cover (homepage updates + past-event media + curated embeds).

### 3.1 Storage Options

- **Option A (recommended):** Supabase Postgres (simple tables) + Supabase Storage for images
- **Option B:** JSON config (single file / KV) for events + updates (fastest for small scale)

Below schema assumes Option A.

### 3.2 `luma_events` table (event list shown on website)

Stores the Luma URL(s) and a small amount of display metadata so you can render Upcoming/Past cleanly.

```sql
CREATE TABLE luma_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  luma_event_url TEXT NOT NULL,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  mode TEXT CHECK (mode IN ('online', 'offline', 'hybrid')),
  venue TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  is_past BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 3.3 `event_media` table (photos + videos for past events)

```sql
CREATE TABLE event_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES luma_events(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video_link')),
  url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 3.4 `event_recaps` table (short recap text per event)

```sql
CREATE TABLE event_recaps (
  event_id UUID PRIMARY KEY REFERENCES luma_events(id) ON DELETE CASCADE,
  recap TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 3.5 `quick_updates` table (homepage announcements)

```sql
CREATE TABLE quick_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  link_url TEXT,
  image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 3.6 `instagram_embeds` table (homepage embeds)

```sql
CREATE TABLE instagram_embeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instagram_url TEXT NOT NULL,
  label TEXT,
  is_pinned BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 3.7 Keep existing tables

`team` and `contacts` tables remain as-is (About page + Contact form).

> Note: **registrations table becomes optional** if registrations happen fully on Luma. If you later need your own registrations, re-add `registrations` and connect it to `luma_events`.
> 

---

## 4. API Routes (Luma-first + Lightweight CMS)

### API Conventions

- All admin routes under `/api/admin/*` require auth
- Use Zod validation on all inputs
- Responses: `{ ok: true, data }` and errors: `{ ok: false, error }`

| Method | Route | Description | Auth |
| --- | --- | --- | --- |
| GET | /api/events | Return upcoming + past events from `luma_events` | Public |
| GET | /api/events/[slug] | Event detail (includes media + recap) | Public |
| POST | /api/admin/events | Create an event entry (paste Luma URL, set title/date/tags, etc.) | Admin |
| PUT | /api/admin/events/[id] | Edit event entry (or mark as past) | Admin |
| DELETE | /api/admin/events/[id] | Remove event from website | Admin |
| POST | /api/admin/event-media | Add photos/video links to an event | Admin |
| DELETE | /api/admin/event-media/[id] | Delete a media item | Admin |
| POST | /api/admin/quick-updates | Create a homepage quick update | Admin |
| PUT | /api/admin/quick-updates/[id] | Edit/publish/unpublish quick update | Admin |
| POST | /api/admin/instagram-embeds | Add Instagram URL to show on homepage | Admin |
| POST | /api/contact | Submit contact form | Public |

### 4.1 Registration handling

- Primary flow: **Register button links to Luma** (no `/api/register` needed)
- If later required: add `/api/register` + `registrations` table as Phase 2

---

## 4.2 Cost Estimate (Typical club scale)

- Vercel: Free tier usually enough for a static/ISR site
- Supabase: Free tier typically enough (DB + Auth + small Storage)
- Luma: Usually free for basic event hosting (depends on plan/features you choose)
- Media cost driver: Images/videos storage + bandwidth (if uploading lots of photos/videos, costs may increase)
- Domain (optional): yearly cost depending on TLD

---

## 5. Authentication

- **Provider:** Supabase Auth (email + password)
- **Admin:** Single admin account (club lead)
- **Protection:** Middleware on `/admin/*` routes
- **Session:** Supabase session cookies (SSR-compatible)
- **RLS:** Row Level Security on `registrations` and `events` for admin-only writes

```tsx
// middleware.ts
export const config = {
  matcher: ['/admin/:path*']
}
```

---

---

## 7. Deployment

| Concern | Solution |
| --- | --- |
| Hosting | Vercel (Free tier) |
| Database | Supabase Cloud (Free tier) |
| Domain | Custom domain via Vercel (optional) |
| CI/CD | GitHub push → Vercel auto-deploy |
| Environment | `.env.local` for secrets, Vercel env vars for prod |

---

## 8. Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

---

## 9. Key Dependencies (April 2026 Verified)

| Package | Version | Notes |
| --- | --- | --- |
| next | 14.2.x | Use App Router only |
| react | 18.3.x | No React 19 yet (breaking changes) |
| typescript | 5.x | Strict mode on |
| tailwindcss | 3.4.x | v4 still unstable |
| framer-motion | 11.x |  |
| @supabase/supabase-js | 2.x | SSR package: @supabase/ssr |
| @supabase/ssr | 0.5.x | Replaces auth-helpers |

| react-hook-form | 7.x |  |
| zod | 3.x |  |
| lucide-react | 0.4x | Icons |

---

## 10. Performance & SEO

- All public pages: Static Generation (SSG) or ISR (revalidate: 60)
- Event detail pages: `generateStaticParams` for slug-based pages
- OG images: `next/og` for event pages
- Image optimization: `next/image` with Supabase Storage URLs
- Lighthouse target: 90+ on all public pages

---

## 11. Security Checklist

- [ ]  Admin routes behind Supabase Auth middleware
- [ ]  Supabase RLS enabled on all tables
- [ ]  Service role key only server-side
- [ ]  Contact + registration forms: rate limiting via Vercel Edge
- [ ]  No API keys exposed in client bundle
- [ ]  Input sanitization via Zod validators`