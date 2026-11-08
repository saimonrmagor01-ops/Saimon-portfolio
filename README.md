# Saimon Rana Magar — Personal Portfolio

Official personal portfolio website for **Saimon Rana Magar** — Digital Creator & Developer based in Nepal.

> **Primary Identity:** AI Filmmaker, Content Creator and Web Developer  
> **Headline:** "I create. I develop. I bring ideas to life."

The Next.js application is the canonical implementation. The root `index.html` is a separate standalone snapshot and is not updated by changes to the Next.js app.

---

## Architecture & Technology Stack

The project offers two production-ready avenues:

1. **Next.js App Router Application (Modern Modular Architecture)**
   - **Framework:** Next.js 16 (App Router)
   - **Language:** TypeScript
   - **Styling:** Tailwind CSS 4 with a custom editorial dark design system (`#050817`)
   - **Animations:** Framer Motion
   - **Icons:** Lucide React
   - **Static Export:** Configured with `output: 'export'` for zero-latency hosting

2. **Standalone Snapshot (`index.html`)**
   - Self-contained, zero-dependency static build that can be opened directly in any browser (via double click) or deployed directly to any static web host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).
   - Includes full interactive capabilities: interactive cinema reel selector, live Python/TypeScript code inspection tabs, project category filtering, modal inspector, Web Audio API ambient drone synthesizer, live Nepal time clock (NPT GMT+5:45), service inquiry preselection, and validated project inquiry form.

---

## Directory Structure

```text
saimon-portfolio/
├── index.html                    # Standalone self-contained production portfolio
├── package.json                  # Next.js & dependencies manifest
├── tsconfig.json                 # TypeScript configuration with @/* path aliases
├── tailwind.config.ts            # Bespoke design system, fonts & theme colors
├── next.config.mjs               # Static export configuration
├── postcss.config.mjs            # PostCSS pipeline
├── public/
│   └── favicon.svg               # Geometric S / Film Lens Monogram Favicon
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Global metadata, SEO, Open Graph & viewport
│   │   ├── page.tsx              # Master portfolio page assembling all sections
│   │   ├── not-found.tsx         # Custom 404 error page
│   │   ├── globals.css           # Film grain overlay, editorial grid & custom scrollbar
│   │   └── icon.svg              # Next.js app icon
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky glassmorphism header & mobile navigation
│   │   ├── CustomCursor.tsx      # Desktop-only magnetic cursor (reduced-motion safe)
│   │   ├── Hero.tsx              # Editorial typography, CTAs & showreel preview
│   │   ├── About.tsx             # Narrative background & 3 core focus pillars
│   │   ├── CreativeStudio.tsx    # Dedicated AI filmmaking & visual production showcase
│   │   ├── DevelopmentStudio.tsx # Dedicated software studio with interactive code tabs
│   │   ├── Projects.tsx          # Advanced category filtering & project gallery
│   │   ├── ProjectModal.tsx      # Immersive project detail modal (Esc to close)
│   │   ├── Skills.tsx            # 5 taxonomy categories (zero fake percentages)
│   │   ├── Experience.tsx        # Timeline (Digital Communications Assistant)
│   │   ├── Services.tsx          # Four service cards with inquiry preselection
│   │   ├── Contact.tsx           # Direct contact channels and live Nepal time clock
│   │   └── Footer.tsx            # Credits, quick links & back-to-top button
│   ├── data/
│   │   ├── projects.ts           # Typed project data including BudgetMandu
│   │   ├── skills.ts             # Verified skills organized by discipline
│   │   └── services.ts           # Four professional service offerings
│   └── lib/
│       └── utils.ts              # cn() utility helper for Tailwind classes
└── out/                          # Generated static build from `npm run build`
```

---

## Getting Started

Use Node.js 22.13 or newer.

### Option 1: Instant Local Preview
Simply open `index.html` in your web browser (Safari, Chrome, Arc, Firefox, Edge). No build step or server is required.

### Option 2: Running with Next.js (Local Development)

```bash
# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the live site.

### Option 3: Production Build & Static Export

```bash
# Create optimized production static export in the out/ folder
npm run build
```

The output will be placed in the `out/` directory, ready to deploy.

---

## Deployment Instructions

### 1. Vercel (Recommended)
1. Push this repository to GitHub or GitLab.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repository. Vercel will automatically detect **Next.js**.
4. Click **Deploy**.

### 2. Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Set **Build command**: `npm run build`
3. Set **Publish directory**: `out`
4. Click **Deploy**.

### 3. GitHub Pages
1. Go to repository **Settings** → **Pages**.
2. Select **GitHub Actions** or choose **Deploy from a branch** (deploying either the root directory or the `out` branch).

---

## Customizing Your Content

1. **Email & Contact Details**:
   - In `src/components/Contact.tsx` and `index.html`, update `saimonranamagar@example.com` to your verified email address.
2. **Project Screenshots & Stills**:
   - Add your video stills, showreel clips, and BudgetMandu screenshots into the `public/` directory and update `src/data/projects.ts`.
3. **Resume / CV**:
   - Place your PDF resume in `public/cv.pdf` and link to it from the Hero or Navigation.

---

## License

&copy; 2026 Saimon Rana Magar. All rights reserved. Designed with intention. Built for what's next.
