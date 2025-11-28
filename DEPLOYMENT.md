# Eureka Automation - Deployment Guide

## Building for Production

### 1. Build the Static Export

```bash
npm run build
```

This command will:
- Compile all TypeScript and React components
- Generate static HTML for all pages
- Create an `out` directory with the complete static site

### 2. Verify Build Output

Check that the `out` directory contains:
- `index.html` (root redirect page)
- `en/` folder (English pages)
- `th/` folder (Thai pages)
- `_next/` folder (Next.js assets)
- All static assets from `public/`

## Deploying to HostNeverDie

### Option 1: cPanel File Manager

1. Log in to your HostNeverDie cPanel
2. Navigate to **File Manager**
3. Go to `public_html` directory
4. **Delete all existing files** in `public_html` (backup first if needed)
5. Upload all contents from the `out` folder
6. Ensure file permissions are correct (644 for files, 755 for folders)

### Option 2: FTP Upload

1. Connect via FTP using FileZilla or similar:
   - Host: Your HostNeverDie FTP address
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21

2. Navigate to `public_html`
3. Upload all files from the `out` directory

### Important Files Structure

```
public_html/
├── index.html              # Root redirect
├── 404.html               # 404 page
├── en/
│   ├── index.html
│   ├── about/
│   │   └── index.html
│   ├── services/
│   │   └── index.html
│   ├── products/
│   │   └── index.html
│   ├── solutions/
│   │   └── index.html
│   ├── blog/
│   │   └── index.html
│   └── contact/
│       └── index.html
├── th/
│   └── ... (same structure as en/)
├── _next/
│   ├── static/
│   └── ...
└── images/
```

## Post-Deployment Checks

### 1. Test URLs

Visit these URLs to ensure everything works:
- `https://yourdomain.com` → Should redirect to `/en`
- `https://yourdomain.com/en`
- `https://yourdomain.com/th`
- `https://yourdomain.com/en/about`
- `https://yourdomain.com/th/about`

### 2. Check SEO

- View page source and verify:
  - Meta tags are present
  - JSON-LD structured data is included
  - hreflang tags are correct

### 3. Test Performance

- Run Google PageSpeed Insights
- Check Core Web Vitals
- Verify image loading

## Updating the Site

To update content:

1. Make changes in the code
2. Run `npm run build`
3. Upload only changed files from `out/` to `public_html/`

## .htaccess Configuration (Optional)

Create a `.htaccess` file in `public_html` for better performance:

```apache
# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Redirect root to /en
RewriteEngine On
RewriteRule ^$ /en/ [R=301,L]
</apache>
```

## Troubleshooting

### Issue: 404 errors on navigation

**Solution**: Ensure `trailingSlash: true` is set in `next.config.ts`. This is already configured.

### Issue: Images not loading

**Solution**: Check that all images are in the `public/` directory and are referenced with absolute paths starting with `/`.

### Issue: CSS/JS not applying

**Solution**: Clear browser cache or use hard refresh (Ctrl+Shift+R).

## Future Migration to Vercel/Cloudflare (Optional)

If you want better performance in the future:

1. Remove `output: 'export'` from `next.config.ts`
2. Remove `images: { unoptimized: true }`
3. Deploy to Vercel: `npm install -g vercel && vercel`
4. Or deploy to Cloudflare Pages via their dashboard

## Contact Form Integration

The contact form currently shows an alert. To make it functional:

1. Sign up for [Formspree](https://formspree.io/) (free tier available)
2. Create a new form and get your endpoint
3. Update `src/app/[lang]/contact/page.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (response.ok) {
    alert('Message sent successfully!');
  }
};
```

## Monitoring & Analytics

Add Google Analytics:

1. Create a GA4 property
2. Add the tracking code to `src/app/[lang]/layout.tsx` in the `<head>`:

```typescript
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

---

**Ready to deploy!** 🚀
