# CASPer Prep by TSA — The Success Architect

CASPer Expert Strategy Course v2.0 — Landing page, course preview, blog, checkout, and terms.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (utility-first styling)
- **Vercel** (recommended deployment)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
casper-prep/
├── app/
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
