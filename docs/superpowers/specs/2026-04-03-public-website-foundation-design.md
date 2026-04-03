# Public Website Foundation Design

> **Goal:** Build the public-facing pages (Home, About, Contact) with AWS-branded design, no dynamic events yet, contact form stores submissions in Supabase.

> **Architecture:** Component-heavy approach with reusable UI primitives (Button, Card, Badge), layout components (Navbar, Footer), and section components (HeroSection, FeaturedEvent, Sponsors, ContactForm). Static pages render at build time; contact form submits to API route.

> **Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase, Zod validation

---

## Design System

**Colors:**
- Primary: AWS Orange `#FF9900`
- Background: Dark Navy `#232F3E`
- Text: White `#FFFFFF`
- Secondary: Gray for accents and secondary text

**Typography:**
- Font: Inter (primary), DM Sans (fallback)
- Headings: Bold, large sizes
- Body: Regular weight, readable line-height
- Mobile-first responsive design

**Theme:** Dark GitHub-inspired with AWS accents, minimal and clean, no neon colors

---

## Page Layouts

### Home Page (`app/(public)/page.tsx`)

**Sections (top to bottom):**
1. **Navbar** — Logo, navigation links (Home, About, Events, Contact)
2. **Hero Section** — Full viewport height
   - Centered heading: "AWS Cloud Club GCET"
   - Tagline: "Discover cloud computing through events, workshops, and community"
   - CTA Button: "Explore Events" → links to `/events`
   - Background: Navy gradient
3. **Featured Event Section** — Prominent event card
   - Title, date, mode (Online/Offline), tags
   - Short description
   - "Register on Luma" button (external link)
   - Placeholder for now (hardcoded event)
4. **Sponsors Strip** — Horizontal grid of sponsor logos
   - "Our Partners" heading
   - Logo grid (responsive columns)
   - Placeholder logos for now
5. **Footer** — Links, social, copyright

### About Page (`app/(public)/about/page.tsx`)

**Sections (top to bottom):**
1. **Navbar**
2. **Hero/Header Section** — Smaller than home
   - Heading: "About AWS Cloud Club"
3. **Mission & Vision** — Card-based layout
   - Mission statement paragraph
   - Vision statement paragraph
4. **Club Story** — Narrative section
   - Founding story and history
   - Text-focused, readable layout
5. **AWS Partnership Badge** — Centered visual
   - AWS logo or "AWS Partner" badge
   - Brief partnership description
6. **Footer**

### Contact Page (`app/(public)/contact/page.tsx`)

**Sections (top to bottom):**
1. **Navbar**
2. **Hero/Header Section**
   - Heading: "Get in Touch"
   - Tagline: "Have questions? Want to collaborate? Let's talk."
3. **Contact Form & Info** — Two-column layout (responsive)
   - **Left Column:** Contact form
     - Fields: Name, Email, Subject (dropdown), Message
     - Subject options: General, Sponsorship, Collaboration
     - Submit button
     - Success/error feedback
   - **Right Column:** Contact info
     - Club email address
     - Social links (LinkedIn, Instagram, Twitter/X)
4. **Map Section** — Optional
   - Google Maps embed or placeholder
   - Campus location
5. **Footer**

---

## Component Structure

### UI Primitives

**Button.tsx**
- Props: `variant` (primary/secondary/outline), `size` (sm/md/lg), `children`, `onClick`, `href`, `disabled`
- Variants: Orange for primary, gray for secondary, outlined for tertiary
- Responsive: Full width on mobile, auto on desktop
- States: hover, active, disabled, loading (optional)

**Card.tsx**
- Props: `children`, `className`, `header`, `footer`
- Base styles: Border, shadow, padding
- Used in: Featured events, contact sections, info cards

**Badge.tsx**
- Props: `text`, `variant` (default/online/offline/workshop)
- Small inline tag component
- Color-coded by type

**Container.tsx**
- Props: `children`, `className`
- Max-width: 1200px (lg screens)
- Padding: Responsive (1rem mobile, 2rem desktop)
- Wraps main content areas for consistent spacing

### Layout Components

**Navbar.tsx**
- Logo/brand on left (text or image)
- Navigation links: Home, About, Events, Contact
- Mobile: Hamburger menu collapses nav
- Position: Sticky top
- Background: Semi-transparent navy with backdrop blur (optional)

**Footer.tsx**
- Three columns: Quick Links, Follow Us, Legal
- Quick Links: About, Events, Contact, Admin
- Follow Us: LinkedIn, Instagram, Twitter icons
- Legal: Copyright, AWS branding
- Responsive: Stacks on mobile, columns on desktop

### Section Components

**HeroSection.tsx**
- Props: `title` (string), `subtitle` (string), `ctaText` (string), `ctaLink` (string), `size` (full/half)
- Full viewport height (size="full") or half height (size="half")
- Centered flex layout with gradient background
- Responsive text sizes

**FeaturedEvent.tsx**
- Props: `event` (object with title, date, mode, tags, description, lumaUrl)
- Card-based presentation
- Shows: Title, formatted date, mode badge, tags, description snippet
- Button: "Register on Luma" (external link to lumaUrl)
- Section wrapper with heading "Featured Event"

**Sponsors.tsx**
- Props: `sponsors` (array of {name, logoUrl})
- Grid layout: 1 column mobile, 3-4 columns desktop
- Each sponsor: Logo image with optional link
- Section wrapper: "Our Partners" heading
- Responsive image sizing

**ContactForm.tsx**
- Props: `onSuccess` (optional callback)
- Fields:
  - Name (text input, required)
  - Email (email input, required, validated)
  - Subject (select dropdown: general/sponsorship/collaboration, required)
  - Message (textarea, required, min 10 chars)
- Validation: Zod schema (see lib/validators.ts)
- Submit button: "Send Message"
- Loading state: Button disabled during submission
- Feedback: Success message or error toast
- Submits to: `POST /api/contact`

---

## Data Model

### Supabase Table: `contact_submissions`

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL CHECK (subject IN ('general', 'sponsorship', 'collaboration')),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert
CREATE POLICY "Allow public insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Admin can select all
CREATE POLICY "Admin can view all" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated' AND auth.jwt() -> 'role' = '"admin"');
```

---

## API Routes

### `POST /api/contact`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "sponsorship",
  "message": "I'd like to sponsor your club..."
}
```

**Validation:**
- Name: Required, min 2 chars
- Email: Required, valid email format (Zod email validator)
- Subject: Required, one of: general, sponsorship, collaboration
- Message: Required, min 10 chars

**Response (Success):**
```json
{
  "ok": true,
  "message": "Thank you for your message. We'll get back to you soon!"
}
```

**Response (Error):**
```json
{
  "ok": false,
  "error": "Validation failed: email is invalid"
}
```

**Implementation:**
- Uses Zod schema from `lib/validators.ts`
- Inserts into `contact_submissions` table
- Uses Supabase service role client (server-only)
- No email sending (data stored for admin review)

---

## File Structure to Create

```
app/(public)/page.tsx                        # Home page
app/(public)/about/page.tsx                  # About page
app/(public)/contact/page.tsx                # Contact page

app/api/contact/route.ts                     # Contact submission API

components/ui/Button.tsx
components/ui/Card.tsx
components/ui/Badge.tsx
components/ui/Container.tsx

components/layout/Navbar.tsx
components/layout/Footer.tsx

components/sections/HeroSection.tsx
components/sections/FeaturedEvent.tsx
components/sections/Sponsors.tsx
components/sections/ContactForm.tsx

lib/validators.ts                            # Zod schemas
```

---

## Styling Approach

- **Tailwind CSS** for all styling
- Custom theme in `tailwind.config.ts`: `aws-orange`, `aws-navy`
- Utility-first classes
- Dark mode by default (background: navy, text: white)
- Responsive breakpoints: mobile-first design
- No custom CSS files needed (utilities only)

---

## Placeholders & Future Integrations

**For Now (Static/Hardcoded):**
- Featured event: Hardcoded object in component
- Sponsor logos: Placeholder images or default grid
- Map embed: Placeholder or static Google Maps embed code
- Team information: Not included (per requirements)

**Future Integration:**
- Featured event: Fetch from Supabase `luma_events` table
- Sponsors: Dynamic sponsor data from database
- Map: Dynamic Google Maps embed or location data

---

## Testing Strategy

**Manual Testing:**
1. **Page rendering:** All pages load without errors
2. **Navigation:** All navbar links navigate correctly
3. **Responsive:** Check layout on mobile (375px), tablet (768px), desktop (1920px)
4. **Contact form:** 
   - Submit with valid data → success message
   - Submit with missing fields → validation error
   - Submit with invalid email → validation error
   - Message persists in Supabase after submission
5. **Links:** All external links (Luma, social) open correctly

**Browser Testing:**
- Chrome, Firefox, Safari (desktop + mobile)

**Performance:**
- Lighthouse audit (target 90+ score)
- Image optimization with `next/image`

---

## Notes

- All pages are **static** and render at build time (no dynamic data yet)
- Contact form is the only interactive element with server communication
- Design follows AWS branding guidelines (colors, typography)
- Fully responsive, mobile-first approach
- No authentication needed for public pages (admin login comes later)
