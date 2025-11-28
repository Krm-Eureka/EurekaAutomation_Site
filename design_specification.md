# Eureka Automation Website - Design & Architecture Specification

## 1. Tech Stack Overview

To meet the requirements for high performance, Static Export (SSG), and HostNeverDie hosting, we will use the following stack:

-   **Framework**: **Next.js 15 (App Router)**
    -   *Why*: Best-in-class React framework, excellent SSG support via `output: 'export'`, and robust routing.
-   **Language**: **TypeScript**
    -   *Why*: Type safety is crucial for maintaining a complex industrial site.
-   **Styling**: **Tailwind CSS**
    -   *Why*: Rapid development, small bundle size (critical for core web vitals), and highly customizable.
-   **UI Components**: **Shadcn/ui** (built on Radix UI) + **Lucide React** (Icons)
    -   *Why*: Accessible, headless (easy to style), and copy-paste architecture (no heavy npm dependency).
-   **Animations**: **Framer Motion**
    -   *Why*: Professional, smooth animations for the "premium" feel.
-   **Internationalization (i18n)**: **Custom Path-based Routing** (`/[lang]/...`)
    -   *Why*: Next.js Middleware does not run on static hosting (HostNeverDie). We must use dynamic routes for languages.
-   **SEO**: **next-sitemap** + **Next.js Metadata API**
    -   *Why*: Automated sitemap generation and easy metadata management.
-   **Image Optimization**: **Unoptimized** (standard `<img>` or `next/image` with `unoptimized: true`)
    -   *Why*: HostNeverDie does not support Next.js Image Optimization API (requires Node.js).
-   **Package Manager**: **npm** (Strictly enforced).

## 2. Website Structure (Sitemap)

The site will follow a hierarchical structure optimized for user navigation and SEO crawling.

```text
/ (Root redirects to default lang /en or /th)
├── /en (English)
│   ├── / (Home)
│   ├── /about (Company Profile, History, Vision)
│   ├── /services (Overview)
│   │   ├── /mechanical-design
│   │   ├── /electrical-design
│   │   ├── /cnc-machining
│   │   ├── /plc-programming
│   │   ├── /traceability-systems
│   │   └── /machine-assembly
│   ├── /products (Overview)
│   │   ├── /custom-machines (Category)
│   │   │   └── /[product-slug] (Detail)
│   │   └── /standard-machines (Category)
│   │       └── /[product-slug] (Detail)
│   ├── /solutions (Overview)
│   │   ├── /amr-agv (Geek+ & Custom)
│   │   ├── /wms (Warehouse Management System)
│   │   └── /production-integration
│   ├── /case-studies (Success Stories)
│   │   └── /[case-slug]
│   ├── /blog (Industry Insights)
│   │   └── /[post-slug]
│   ├── /careers
│   └── /contact
└── /th (Thai - Mirror of /en)
```

## 3. URL Structure (SEO Friendly)

-   **Pattern**: `https://eureka-automation.com/{lang}/{section}/{slug}`
-   **Examples**:
    -   `https://eureka-automation.com/en/services/cnc-machining`
    -   `https://eureka-automation.com/th/solutions/amr-agv`
    -   `https://eureka-automation.com/en/blog/future-of-industrial-automation-2025`
-   **Strategy**:
    -   Use hyphens (`-`) for word separation.
    -   Keep slugs short but descriptive (keyword-rich).
    -   Avoid deep nesting beyond 3 levels where possible.

## 4. SEO & EEAT Strategy

### Technical SEO
-   **Static Generation**: Pre-render all pages at build time for fastest TTFB (Time to First Byte).
-   **Canonical Tags**: Self-referencing canonicals to avoid duplicate content issues between languages.
-   **Hreflang**: Essential for multi-language support to tell Google which version to show.
-   **Structured Data (JSON-LD)**:
    -   `Organization`: On Home/Contact pages (Logo, Address, Contact).
    -   `Service`: On Service pages.
    -   `Product`: On Product pages.
    -   `BreadcrumbList`: On all pages.
    -   `Article`: On Blog posts.

### EEAT (Experience, Expertise, Authoritativeness, Trustworthiness)
-   **Expertise**: Showcase "Technical Specs", "Certifications", and "Engineering Team" profiles.
-   **Experience**: Detailed "Case Studies" with problem/solution/result format.
-   **Authority**: Backlinks from partners (e.g., Geek+), industry associations.
-   **Trust**: Physical address, phone numbers, Google Maps embed, Privacy Policy.

### Keyword Clusters (Industrial)
-   **Primary**: "Custom Machine Builder Thailand", "Industrial Automation Solutions", "CNC Machining Services".
-   **Secondary**: "AMR AGV Integration", "PLC Programming Services", "Warehouse Management System WMS".
-   **Long-tail**: "Automated material transport for electronics factory", "Traceability system for automotive parts".

### Blog Content Plan (3-6 Months)
1.  **Month 1 (Foundation)**: "What is Industry 4.0?", "Benefits of Custom vs Standard Machines".
2.  **Month 2 (Solutions)**: "How AMR/AGV Optimizes Logistics", "Integrating WMS with ERP".
3.  **Month 3 (Case Studies)**: "Case Study: 30% Efficiency Gain in Auto Plant".

## 5. UI/UX Guidelines

### Visual Identity
-   **Colors**: Deep Industrial Blue (Trust), Safety Orange/Yellow (Accent/Action), White/Light Grey (Background).
-   **Typography**: `Inter` or `Roboto` (Clean, readable, technical).
-   **Imagery**: High-quality photos of machines, blueprints, engineers at work.

### Layout System
-   **Grid**: 12-column grid for desktop, 4-column for mobile.
-   **Spacing**: Consistent spacing scale (4px, 8px, 16px, 32px, 64px, 128px).

### Key Components
-   **Hero**: Large background video/image of machinery in motion + Value Proposition + CTA ("Get Consultation").
-   **Service Card**: Icon + Title + Short Desc + "Learn More".
-   **Product Detail**: Gallery (Left) + Specs/Features (Right) + "Request Quote" (Sticky on mobile).
-   **Navigation**: Mega-menu for Services/Solutions to allow quick access.

### Mobile-First
-   Hamburger menu for navigation.
-   Large touch targets (min 44px).
-   Stacked layouts for columns.

## 6. Component Library Specification

We will use a component-driven approach.

-   `components/ui`: Primitive atoms (Button, Input, Card) - from Shadcn.
-   `components/layout`: Header, Footer, Container, Section.
-   `components/sections`: HeroSection, FeatureGrid, ContactForm.
-   `components/seo`: JsonLd, MetaTags.
-   `components/common`: LanguageSwitcher, Breadcrumbs.

## 7. Code Templates & Commands (npm only)

### Project Initialization
```bash
npm init next-app@latest eureka-site -- --typescript --tailwind --eslint
cd eureka-site
npm install lucide-react framer-motion clsx tailwind-merge
```

### Directory Structure
```text
src/
  app/
    [lang]/
      layout.tsx      # Root layout with <html> lang={lang}
      page.tsx        # Home page
      about/
        page.tsx
      ...
    layout.tsx        # Root layout (redirect logic if needed)
  components/
    ui/               # Shadcn components
    layout/           # Header, Footer
  lib/
    utils.ts          # Helper functions
    dictionaries.ts   # i18n translations
  public/
    images/
```

### i18n Example (`src/lib/dictionaries.ts`)
```typescript
import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  th: () => import('./dictionaries/th.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'th') => dictionaries[locale]()
```

### Static Generation (`next.config.js`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // Optional: helps with some hosting
}

module.exports = nextConfig
```

## 8. Deployment Guide (HostNeverDie)

### Build Process
1.  Run build command:
    ```bash
    npm run build
    ```
    This will generate an `out` folder.

### Uploading
1.  Access HostNeverDie Control Panel (DirectAdmin/cPanel).
2.  Go to File Manager -> `public_html`.
3.  Upload the contents of the `out` folder.
    -   Ensure `index.html` is at the root of `public_html`.
    -   Ensure `_next` folder is uploaded correctly.

### Future Proofing
-   If migrating to Vercel/Cloudflare, simply remove `output: 'export'` and `images: { unoptimized: true }` to leverage edge features.

## 9. Launch Checklist

-   [ ] Content prepared (Text & Images) for both EN/TH.
-   [ ] SEO Metadata (Titles, Descriptions) filled for all pages.
-   [ ] Sitemap generated (`npm run build` should trigger `next-sitemap` if configured).
-   [ ] Analytics (GA4) script added.
-   [ ] Contact form connected (use a service like Formspree or emailjs since no backend).
-   [ ] Mobile responsiveness tested.
-   [ ] 404 Page customized.

## 10. Additional Recommendations

-   **Contact Form**: Since you are on static hosting, you cannot use API routes for sending emails. Use **Formspree**, **EmailJS**, or **Getform**.
-   **CMS**: For a blog, consider **Decap CMS (formerly Netlify CMS)** or **Keystatic**. They work with Git and don't require a separate backend server, perfect for static export.
-   **Performance**: Compress all images using TinyPNG before uploading to `public/images`.
