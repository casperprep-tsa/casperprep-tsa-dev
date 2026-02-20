# CASPer Prep by TSA — The Success Architect

<<<<<<< HEAD
CASPer Expert Strategy Course v2.0 — Landing page, course preview, blog, checkout, and terms.
=======
CASPer Expert Strategy Course v2.0 — Full platform with auth, dashboard, course preview, blog, and checkout.
>>>>>>> cae4d6c (Add updates)

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (utility-first styling)
<<<<<<< HEAD
- **Vercel** (recommended deployment)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
=======
- **Supabase** (auth + database)
- **Vercel** (deployment)

## Getting Started

### 1. Install & run locally

```bash
npm install
npm run dev
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a project called `casper-prep`
2. Go to **Settings > API** and copy your **Project URL** and **anon public key**
3. Create `.env.local` from the template:

```bash
cp .env.local.example .env.local
```

4. Paste your Supabase credentials into `.env.local`
5. Go to **SQL Editor** in Supabase Dashboard and run the contents of `supabase/setup.sql`
6. Go to **Authentication > URL Configuration**:
   - Set **Site URL** to your Vercel domain (e.g. `https://casper-prep.vercel.app`)
   - Add `http://localhost:3000` and your Vercel URL to **Redirect URLs**

### 3. Deploy to Vercel

Add these environment variables in Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (your Vercel domain)

Then redeploy.
>>>>>>> cae4d6c (Add updates)

## Project Structure

```
casper-prep/
├── app/
<<<<<<< HEAD
│   ├── layout.js          # Root layout (Nav + Footer + SEO meta)
│   ├── page.js            # Home / Landing page
│   ├── course/page.js     # Course preview with Module 4 unlocked
│   ├── blog/page.js       # Blog (coming soon articles)
│   ├── checkout/page.js   # Checkout with value stack
│   ├── terms/page.js      # Terms of service
│   └── globals.css        # Global styles + Tailwind
├── components/
│   ├── Nav.js             # Scroll-aware navigation
│   ├── Footer.js          # Site footer
│   ├── VideoThumbnail.js  # YouTube click-to-play embed
│   ├── Icons.js           # SVG icon components
│   └── ui/Primitives.js   # Badge, Button, Label, BrandMark
├── lib/
│   └── constants.js       # Modules, testimonials, site config
└── public/
    └── logo.png           # TSA logo
```

=======
│   ├── layout.js              # Root layout (Nav + Footer + SEO)
│   ├── page.js                # Landing page
│   ├── auth/
│   │   ├── layout.js          # Auth pages layout (centered card)
│   │   ├── login/page.js      # Sign in
│   │   ├── signup/page.js     # Create account
│   │   ├── forgot-password/   # Request password reset
│   │   ├── reset-password/    # Set new password
│   │   └── callback/route.js  # Handles email confirmation redirects
│   ├── dashboard/page.js      # Student dashboard (protected)
│   ├── course/page.js         # Course preview (Module 4 unlocked)
│   ├── blog/page.js           # Blog articles
│   ├── checkout/page.js       # Value stack checkout
│   ├── terms/page.js          # Terms & policies
│   └── globals.css
├── components/
│   ├── Nav.js                 # Auth-aware navigation
│   ├── Footer.js              # Site footer
│   ├── VideoThumbnail.js      # YouTube click-to-play
│   ├── EnrollButton.js        # Checkout CTA (becomes Stripe)
│   ├── SignOutButton.js       # Sign out action
│   ├── Icons.js               # SVG icons
│   └── ui/Primitives.js       # Badge, Button, Label, BrandMark
├── lib/
│   ├── constants.js           # Modules, testimonials, site config
│   └── supabase/
│       ├── client.js          # Browser client
│       ├── server.js          # Server component client
│       └── middleware.js       # Session refresh + route protection
├── middleware.js               # Next.js middleware entry point
├── supabase/
│   └── setup.sql              # Database tables + RLS policies
└── public/
    └── logo.png
```

## Auth Flow

1. User signs up at `/auth/signup` → receives confirmation email
2. Clicks email link → hits `/auth/callback` → redirected to `/dashboard`
3. Signs in at `/auth/login` → redirected to `/dashboard`
4. `/dashboard` and `/course/learn` are protected (redirect to login if not authenticated)
5. Nav shows "Sign In" + "Enroll Now" when logged out, "Dashboard" when logged in

## Protected Routes

Routes under `/dashboard` and `/course/learn` require authentication.
The middleware refreshes the Supabase session on every request and redirects unauthenticated users to `/auth/login`.

>>>>>>> cae4d6c (Add updates)
## Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel
```

## Next Phases

- **Phase 2**: Supabase auth (sign up, login, protected routes)
- **Phase 3**: Stripe checkout ($249 CAD one-time payment)
- **Phase 4**: Course content pages with progress tracking
- **Phase 5**: Student dashboard
- **Phase 6**: Blog CMS
- **Phase 7**: Polish, SEO, mobile, launch
