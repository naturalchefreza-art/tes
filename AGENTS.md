# Armania — Building Tools & Equipment Store

Frontend-only e-commerce storefront: Vite + React 18 + Tailwind CSS 3 + react-router-dom 6.
No backend, no database. All product data lives in `src/data/products.js`; blog posts in `src/data/posts.js`.
Cart, wishlist, currency and the local "account" persist in localStorage via `src/store/StoreContext.jsx`.

## Run

```
docker compose -f docker-compose.base44.yml up -d
```

Web dev server (hot reload) is on port 3000 inside a `node:22` container; `npm install` runs on container
startup against the bind-mounted source. Never build a production image for dev — edits must stay live.

## Layout

- `src/components` — shared UI (header, cart drawer, product card, footer, etc.)
- `src/pages` — routes: `/`, `/shop`, `/product/:id`, `/cart`, `/checkout`, `/wishlist`, `/blog`, `/blog/:id`, `/about`, `/contact`
- `public/images` — photography (CC-licensed, sourced via Openverse). Reuse these; do not hotlink external image hosts.

## Verify

- `docker compose -f docker-compose.base44.yml ps` → web is healthy
- curl http://localhost:3000/ serves the storefront HTML
- No secrets are required for boot.

## Quirks

- Vite `strictPort` is on; port conflicts fail loudly instead of silently hopping ports.
- Image filenames map to subjects (`drill1.jpg`, `saw1.jpg`, `worker1.jpg`, ...) — see `src/data/products.js` for usage.
