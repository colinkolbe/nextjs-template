# Basic Nextjs Template

## Tools & Dependencies
- Framework: _Nextjs_
- CSS: _Tailwind_, _DaisyUI_, _Heroicons_
    - _theme-change_ + DaisyUI for dark-mode toggle (multiple themes are possible)
- Linting: _ESLint_, _Prettier_
- Auth: _next-auth_ (future: _auth.js_ which is currently still in beta)
- Internationalization: _next-intl_
- Logging: _winston_
- Analytics: _analytics_
- Testing: _playwright, jest_

# Installation
```bash
# Recommended to use bun
# First, consider updating all dependencies to the latest version via
bun update
# Dev env
bun install
bun run dev
# Prod env
bun run build; bun run start
```

- Add `.env.local`
```bash
# PORT=""
# PROJECT_PRODUCTION_URL=""
NEXTAUTH_URL="" # CHANGE, e.g., "http://localhost:3000"
AUTH_SECRET="" # CHANGE
```