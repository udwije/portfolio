# Security Hardening Checklist

## Pre-Deployment

- [ ] Run `npm audit` — fix all high/critical vulnerabilities
- [ ] Run `npm outdated` — update dependencies
- [ ] Verify no secrets in `.env.local` or source code
- [ ] Check `.gitignore` includes `.env*`, `node_modules/`, `.next/`
- [ ] Review all `target="_blank"` links have `rel="noopener noreferrer"`
- [ ] Verify no `dangerouslySetInnerHTML` with user input
- [ ] Test with `npm run build` — no errors or warnings
- [ ] Run Lighthouse security audit (DevTools > Lighthouse)

## Headers (Server Deployment)

If deploying with a server (not static export), ensure these headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
X-DNS-Prefetch-Control: on
```

## Static Export (Current Setup)

Since this uses `output: "export"`, headers must be applied at the CDN/host level:

### Vercel
Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### Netlify
Add to `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

### Cloudflare Pages
Add Transform Rules in Cloudflare Dashboard or use `_headers` file.

## Ongoing Maintenance

- [ ] Enable Dependabot alerts (GitHub Settings > Security)
- [ ] Schedule weekly `npm audit` checks
- [ ] Review CSP reports if using report-uri
- [ ] Monitor for new React/Next.js CVEs
- [ ] Keep Node.js version updated (LTS recommended)

## What This Portfolio Does NOT Store

✅ No authentication system  
✅ No user accounts or PII collection  
✅ No payment processing  
✅ No server-side database  
✅ No third-party tracking scripts (optional)  
✅ No cookies (except potential analytics)  

This minimizes the attack surface significantly.
