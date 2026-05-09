# Alex Mercer — Senior Security Engineer Portfolio

A modern, interactive portfolio built with **Next.js 15**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**.

## Tech Stack

- **Next.js 15** (App Router) — Server components, SEO, static export
- **React 19** — Latest React features
- **Tailwind CSS v4** — Utility-first styling with CSS-based theming
- **Framer Motion** — Smooth animations, scroll reveals, page transitions
- **GSAP** — Complex scroll-linked animations (optional upgrade path)
- **Lucide React** — Consistent iconography
- **React Hook Form + Zod** — Type-safe form validation

## Features

- 🎨 **Cyberpunk aesthetic** with neon green (#00ff88) theme
- ✨ **Particle network canvas** with mouse interaction
- 🖱️ **Custom cursor** with hover states
- ⌨️ **Interactive terminal** with command history
- 📊 **Animated stat counters** on scroll
- 🗂️ **Project filtering** with layout animations
- 🎠 **Testimonial slider** with auto-play and touch support
- 📱 **Fully responsive** with mobile menu
- ♿ **Accessibility** — ARIA labels, reduced motion support
- 📝 **Form auto-save** to localStorage
- 🎯 **Keyboard shortcuts** (1-7 for sections, T for terminal, etc.)

## Getting Started

### Prerequisites

- **Node.js 20+** (required for Next.js 15 and React 19)
- **npm 10+**

Check your version:
```bash
node -v   # Should be v20.x.x or higher
npm -v    # Should be 10.x.x or higher
```

If you have an older version, install Node 20 using one of these methods:

**Option 1: nvm (recommended)**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
nvm use 20
```

**Option 2: Download directly**
https://nodejs.org/dist/v20.11.0/

**Option 3: Package manager**
```bash
# macOS (Homebrew)
brew install node@20

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
# Download installer from https://nodejs.org/
```

### Install & Run

```bash
cd mercer-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.


## File Structure

```
mercer-portfolio/
├── app/
│   ├── components/       # Reusable components
│   │   ├── BackToTop.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── Navbar.tsx
│   │   ├── ParticleCanvas.tsx
│   │   └── ProgressBar.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useInView.ts
│   │   ├── useMousePosition.ts
│   │   ├── useScramble.ts
│   │   └── useTypewriter.ts
│   ├── lib/              # Utilities
│   │   └── utils.ts
│   ├── sections/         # Page sections
│   │   ├── About.tsx
│   │   ├── Certs.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Expertise.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Highlights.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── Terminal.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/               # Static assets
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1-7` | Jump to sections |
| `T` | Focus terminal |
| `C` | Jump to contact |
| `↑` (Ctrl) | Back to top |
| `Esc` | Close modals |

## Deployment

### GitHub + Cloudflare Pages (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/mercer-portfolio.git
   git push -u origin main
   ```

2. **Connect Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
   - Create a project → Connect to Git
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Build output directory: `out`
   - Add environment variable: `NODE_VERSION = 20`

3. **Add Secrets for GitHub Actions (optional)**
   - Go to GitHub repo → Settings → Secrets and variables → Actions
   - Add `CLOUDFLARE_API_TOKEN` (create at [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens))
   - Add `CLOUDFLARE_ACCOUNT_ID` (find in Cloudflare dashboard sidebar)

4. **Custom Domain**
   - In Cloudflare Pages project → Custom domains
   - Add `mercersecurity.com`
   - Cloudflare will auto-configure DNS

### Security Headers (Already Configured)

The `public/_headers` file applies these automatically on Cloudflare Pages:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` (HSTS)
- `Referrer-Policy`
- `Permissions-Policy`

### Redirects (Already Configured)

The `public/_redirects` file handles:
- `www` → apex domain
- HTTP → HTTPS

## CI/CD

Every push to `main` triggers:
1. `npm audit` (fails on high/critical vulnerabilities)
2. TypeScript type check
3. Build
4. Auto-deploy to Cloudflare Pages

## License

MIT — Built with security in mind.
