# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this portfolio, please report it responsibly:

1. **Do not** open a public issue
2. Email security concerns to: security@mercersecurity.com
3. Include a detailed description and reproduction steps
4. Allow 48 hours for initial response

## Security Measures Implemented

### Headers
- Content Security Policy (CSP) with strict directives
- X-Frame-Options: DENY (clickjacking prevention)
- X-Content-Type-Options: nosniff (MIME sniffing prevention)
- Strict-Transport-Security (HSTS)
- Referrer-Policy: strict-origin-when-cross-origin

### Client-Side
- No `dangerouslySetInnerHTML` on user input
- All external links use `rel="noopener noreferrer"`
- Form validation on client and server
- localStorage data is non-sensitive (draft form only)

### Build & Dependencies
- `npm audit` run before each release
- Dependabot alerts enabled
- No secrets in client-side code
- `.env` files excluded from git

## OWASP Top 10 Coverage

| Risk | Status | Mitigation |
|------|--------|------------|
| Broken Access Control | N/A | Static site, no auth required |
| Cryptographic Failures | ✅ | HTTPS enforced, no sensitive data stored |
| Injection | ✅ | No user input reaches backend (static export) |
| Insecure Design | ✅ | Threat model reviewed |
| Security Misconfiguration | ✅ | Security headers, minimal attack surface |
| Vulnerable Components | ✅ | Dependency scanning, automated updates |
| Auth Failures | N/A | No authentication system |
| Data Integrity | ✅ | Subresource integrity for CDN assets |
| Logging Failures | N/A | No server-side logging (static export) |
| SSRF | N/A | No server-side requests |
