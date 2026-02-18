# Eureka Automation Website - Project Summary

## 🎯 Project Overview

A modern, high-performance industrial automation website built with Next.js 15 (App Router), designed for static export and deployment on HostNeverDie shared hosting.

**Company**: Eureka Automation
**Industry**: Industrial Automation (Custom Machines, CNC, AMR/AGV, WMS)
**Target Markets**: Automotive, Electronics, Manufacturing

## 🛠️ Tech Stack

| Component | Technology | Reason |
|-----------|-----------|--------|
| **Framework** | Next.js 15 (App Router) | SSG support, excellent performance |
| **Language** | TypeScript | Type safety for complex applications |
| **Styling** | Tailwind CSS | Rapid development, small bundle size |
| **UI Components** | Shadcn/ui + Lucide React | Accessible, customizable components |
| **Animations** | Framer Motion | Professional animations |
| **i18n** | Path-based routing (`/[lang]`) | Works with static export |
| **SEO** | next-sitemap + Metadata API | Automated sitemap + SEO optimization |
| **Package Manager** | bun | Fast, all-in-one toolkit |

## 📁 Site Structure

```
/                        → Auto-redirects to /th or /en based on browser language
├── /en (English)
│   ├── / (Home)
│   ├── /about
│   ├── /services
│   │   ├── /mechanical-design
│   │   ├── /electrical-design
│   │   ├── /cnc-machining
│   │   ├── /plc-programming
│   │   ├── /traceability-systems
│   │   └── /machine-assembly
│   ├── /products
│   │   ├── /custom-machines
│   │   └── /standard-machines
│   ├── /solutions
│   │   ├── /amr-agv
│   │   ├── /wms
│   │   └── /production-integration
│   ├── /blog
│   └── /contact
└── /th (Thai - mirror of /en)
```

## ✅ Implemented Features

### Core Pages
- ✅ Home page with Hero, Services showcase, Industries, CTA
- ✅ About page with company overview and values (Unique content per section)
- ✅ Services overview with 6 service categories
- ✅ Products overview with custom/standard categories (Coming Soon handling)
- ✅ Solutions page (AMR/AGV, WMS, Production Integration)
- ✅ Blog listing page
- ✅ Contact page with form and info
- ✅ Careers page with job listings (Bilingual support)

### UI/UX
- ✅ **"Fresh Green" Theme**: Modern industrial aesthetic with Prompt typography
- ✅ **Bilingual PDPA Modal**: Fully internationalized (EN/TH) with HR contact integration
- ✅ Responsive Header with mobile menu
- ✅ Hero section with animations (Framer Motion)
- ✅ Standardized Service Detail Template (AI, Robotics, Machines, Logistics)

### SEO & Optimization
- ✅ Static export optimization (Fixes root 404 build issues)
- ✅ next-sitemap configuration
- ✅ Metadata API configuration
- ✅ Multilingual support with path-based routing
- ✅ Browser Language Detection

### Technical
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Component-based architecture
- ✅ Static HTML generation (SSG)

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Development server
bun run dev

# Build for production
bun run build

# The output will be in ./out directory
```

## 📦 Deployment

The site is configured for static export to HostNeverDie shared hosting.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Key points**:
- Run `bun run build`
- Upload contents of `out/` folder to `public_html/`

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Fresh Green (`#34A853`)
- **Secondary**: Deep Green (`#1A2F1A`)
- **Typography**: Prompt (Thai/English hybrid optimization)

### UI Patterns
- Gradient backgrounds for hero sections
- Card-based layouts with hover effects
- Consistent spacing (Tailwind scale)
- Glassmorphism effects on stats cards

## 📝 Next Steps / Future Enhancements

### Priority 1: Content
- [ ] Add real company images (replace placeholders)
- [ ] Write detailed service pages
- [ ] Create product detail pages
- [ ] Add case study content

### Priority 2: Forms & CMS
- [ ] Integrate contact form (Script-based solution implemented by user)
- [ ] Add blog CMS (Decap CMS or Keystatic)
- [ ] Create blog post template

### Priority 3: SEO
- [ ] Add Google Analytics (GA4)
- [ ] Submit sitemap to Google Search Console
- [ ] Optimize meta descriptions for all pages
- [ ] Add Open Graph images

### Priority 4: Advanced Features
- [ ] Add product filtering/search
- [ ] Create case study detail pages
- [ ] Implement cookie consent banner

## 🔒 Static Export Limitations

Due to HostNeverDie shared hosting constraints:

- ❌ No API routes (use third-party services)
- ❌ No server-side rendering (SSR)
- ❌ No on-demand image optimization
- ❌ No middleware (using path-based i18n instead)

**Workarounds implemented**:
- Forms → Script-based solution (e.g. Google Forms/HubSpot)
- Images → Unoptimized or use external CDN
- i18n → Path-based routing `/[lang]`

## 📚 Documentation

- **Design Specification**: [design_specification.md](./design_specification.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🤝 Contributing

When adding new pages:

1. Create page in `src/app/[lang]/your-page/page.tsx`
2. Add navigation link in Header component
3. Update Footer if needed
4. Add metadata for SEO
5. Test build with `bun run build`

## 📞 Support

For questions or issues:
- Email: HR@eurekaautomation.co.th
- Phone: 02-192-3737

---

**Built with ❤️ for Eureka Automation**
