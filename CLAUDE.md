# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AWS Cloud Club Website for GCET** — A modern, lightweight website for the AWS Cloud Club at Goa College of Engineering and Technology. The site showcases events, integrates with Luma for registrations, and provides an admin interface for managing content.

**Key Philosophy:** Luma-first integration — Luma is the source of truth for event registrations; the website stores only supplementary data (photos, videos, event descriptions).

**Status:** Currently in specification phase (`all.md` contains complete product and technical specification). No implementation code exists yet.

## Tech Stack

- **Framework:** Next.js 14.2.x (App Router, TypeScript 5.x)
- **Styling:** Tailwind CSS 3.4.x
- **Animations:** Framer Motion 11.x
- **Backend/Services:**
  - Supabase (PostgreSQL, Auth, Storage)
  - Vercel (Hosting with edge deployment)
  - Luma (Event management and registration)
- **Form & Validation:** React Hook Form 7.x, Zod 3.x
- **UI Libraries:** Lucide React (icons)

## Development Commands

Once the project is initialized, use these commands:

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npx supabase start   # Start local Supabase (if using local dev)
npx supabase db reset # Reset local database
```

## Project Architecture

### Directory Structure

```
app/
├── (public)/              # Public pages (route group)
│   ├── page.tsx          # Home page
│   ├── about/page.tsx
│   ├── events/page.tsx   # Upcoming/past events
│   └── contact/page.tsx
├── (admin)/               # Admin area (route group)
│   ├── login/page.tsx    # Auth
│   └── admin/
│       ├── events/
│       ├── media/
│       ├── quick-updates/
│       └── instagram/
├── api/
│   ├── events/           # Event API routes
│   ├── admin/            # Admin-protected routes
│   └── contact/          # Contact form endpoint
└── layout.tsx            # Root layout

components/
├── ui/                   # Reusable primitives
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   └── Badge.tsx
├── layout/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── events/               # Event-specific components
│   ├── EventCard.tsx
│   ├── EventList.tsx
│   └── EventFilter.tsx
├── updates/              # Homepage updates
│   ├── QuickUpdateCard.tsx
│   └── InstagramEmbed.tsx
├── media/                # Gallery & embeds
│   ├── Gallery.tsx
│   └── VideoEmbed.tsx
└── admin/                # Admin components
    ├── AdminShell.tsx
    ├── AdminTable.tsx
    └── EventEditor.tsx

lib/
├── supabase-client.ts    # Client Supabase instance
├── supabase-server.ts    # Server Supabase instance
├── auth.ts               # Auth helpers & middleware
├── validators.ts         # Zod validation schemas
└── slug.ts               # URL slug utilities

types/
└── index.ts              # Shared TypeScript types

public/                   # Static assets
```

### Architectural Patterns

1. **Route Groups:** Using `(public)` and `(admin)` for logical organization without affecting URL structure
2. **Server Components by Default:** Data fetching and sensitive operations in Server Components
3. **Client Components:** Marked with `'use client'` — only for forms, animations, interactivity
4. **SSG/ISR:** Public pages use Static Generation with 60-second Incremental Static Regeneration
5. **Middleware Auth:** `/admin` routes protected by middleware checking Supabase session
6. **Supabase RLS:** Row Level Security policies enforce database-level access control

### Key Design Principles

- **Luma-First Strategy:** Website acts as a content hub around Luma; event registrations happen on Luma (embedded or external)
- **Lightweight CMS:** Simple admin panel for managing supplementary content (no complex CMS framework)
- **No Complex State Management:** Server Components + server data fetching reduce need for Redux/Zustand
- **Security-First:** Multi-layer protection (auth middleware, RLS policies, server-only secrets)
- **Performance Target:** Lighthouse 90+ via edge deployment and SSG/ISR
- **Cost Optimized:** All services on free tiers (Vercel, Supabase, Resend)

## Data Model

### Supabase Tables

All tables use Row Level Security (RLS) with admin-only write access.

```sql
-- Events metadata (Luma integration)
luma_events
├── id (UUID, PK)
├── luma_id (String) -- Reference to Luma event ID
├── slug (String) -- URL slug for detail page
├── title (String)
├── description (String)
├── start_date (Timestamp)
├── end_date (Timestamp)
├── luma_url (String) -- Link to Luma registration
├── is_upcoming (Boolean)
└── created_at (Timestamp)

-- Photos and videos for events
event_media
├── id (UUID, PK)
├── event_id (UUID, FK → luma_events.id)
├── media_url (String) -- Supabase Storage URL
├── media_type (Enum: 'photo' | 'video')
├── title (String, nullable)
└── created_at (Timestamp)

-- Event recaps and descriptions
event_recaps
├── id (UUID, PK)
├── event_id (UUID, FK → luma_events.id)
├── content (Text) -- Markdown support
└── created_at (Timestamp)

-- Homepage quick updates
quick_updates
├── id (UUID, PK)
├── content (String)
├── position (Integer) -- For ordering
├── is_published (Boolean)
└── created_at (Timestamp)

-- Instagram embeds
instagram_embeds
├── id (UUID, PK)
├── embed_code (String)
├── position (Integer)
├── is_published (Boolean)
└── created_at (Timestamp)
```

## Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Production (Vercel):** Set these via Vercel project settings (not in `.env` files).

## Design System

**Colors:**
- Primary: AWS Orange `#FF9900`
- Background: Dark Navy `#232F3E`
- Accent: White `#FFFFFF`
- Secondary: Grays for contrast

**Typography:**
- Font: Inter or DM Sans
- Headings: Bold, large sizes
- Body: Regular weight, readable line-height

**Responsive:**
- Mobile-first approach
- Tailwind breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- All pages fully responsive

**Theme:** Dark GitHub-inspired aesthetic with AWS accents

## API Design

### RESTful Conventions

```
GET    /api/events              # List all events
GET    /api/events?upcoming=true # Filter upcoming
GET    /api/events/[slug]       # Event details with media

POST   /api/contact             # Submit contact form (store in Supabase)
POST   /api/admin/events        # Create event (admin only)
PUT    /api/admin/events/[id]   # Update event
DELETE /api/admin/events/[id]   # Delete event
```

### Response Format

**Success:**
```json
{ "ok": true, "data": {...} }
```

**Error:**
```json
{ "ok": false, "error": "Description of error" }
```

### Validation & Security

- All POST/PUT inputs validated with Zod schemas
- Auth middleware protects `/admin/*` routes
- Rate limiting on public forms (contact, etc.)
- Service role key never exposed to client

## Implementation Notes

### When Starting Implementation

1. Initialize Next.js project: `npx create-next-app@latest`
2. Set up Supabase project and configure local development
3. Create tables per Data Model section above
4. Configure RLS policies for all tables
5. Set up Vercel deployment with environment variables
6. Implement pages under `app/(public)/*` first
7. Implement admin area under `app/(admin)/*` after public is done
8. Integrate Luma event links (embed or external link)

### Key Files to Know

- `lib/supabase-server.ts` — Creates server-side Supabase client with service role
- `lib/supabase-client.ts` — Creates browser-safe client for auth
- `lib/auth.ts` — Middleware protecting admin routes
- `lib/validators.ts` — Zod schemas for all API inputs
- `app/api/events/route.ts` — Events API endpoint

### Component Patterns

**Server Component (data fetching):**
```tsx
export default async function EventList() {
  const events = await getEvents();
  return <div>...</div>;
}
```

**Client Component (interactivity):**
```tsx
'use client';
export default function EventFilter() {
  const [filter, setFilter] = useState('');
  return <div>...</div>;
}
```

## Performance Optimization

- **Images:** Use `next/image` for automatic optimization
- **OG Tags:** Generate with `next/og` for social sharing
- **Code Splitting:** Automatic via Next.js
- **Caching:** ISR at 60 seconds for event pages
- **Database:** Indexes on `slug`, `is_upcoming`, `event_id`

## Security Checklist

- [ ] RLS policies enabled on all Supabase tables
- [ ] Admin middleware protecting `/admin/*` routes
- [ ] Service role key never exposed to frontend
- [ ] Contact form rate-limited
- [ ] Environment variables not committed to git
- [ ] Session tokens handled by Supabase SSR utilities

## Reference Documentation

For detailed specifications, see `all.md` in the project root. It contains:
- Complete feature requirements
- Database schema details
- UI/UX specifications
- Deployment instructions
