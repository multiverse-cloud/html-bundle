# mtverse HTML Dashboard Bundle

Production-ready static HTML bundle inspired by TailAdmin's documented HTML structure.

## Included

- 146 responsive HTML pages, including advanced mtverse component, chart, FAQ, ecommerce, email, auth, blank, and UI element pages.
- Shared sidebar and header: `common-sidebar.js`, `common-header.js`.
- Shared production interaction layer: `app-shell.js`.
- Local generated Tailwind CSS: `tailwind-production.css`.
- Theme and polish layer: `pro-styles.css`.
- Bundle normalizer: `upgrade-production-bundle.js`.

## TailAdmin Alignment

- Uses a full-height flex app shell with sidebar plus main content.
- Sidebar is fixed/hidden on mobile and static on desktop.
- Header remains sticky with search, notifications, theme toggle, and profile actions.
- Common UI is centralized instead of duplicated across every page.
- Dark mode is class-based and persisted locally.
- Production pages use local CSS instead of Tailwind's browser CDN.

## Production Features

- Command palette via the header search or `Ctrl/Cmd + K`.
- Compact layout toggle.
- Dark mode toggle.
- Toast notifications for common actions.
- Confirmation modal for destructive actions.
- Page loader and page transition motion.
- Animated chart reveal behavior.
- Reveal animations with reduced-motion support.
- Responsive tables, forms, cards, and mobile sidebar overlay.

## Rebuild / Normalize

Run this after adding or editing HTML pages:

```bash
node templates/html/upgrade-production-bundle.js
```

The script injects shared assets, production metadata, local CSS links, accessibility defaults, and metadata flags across the HTML catalog.

## Preview

Open any file in `templates/html`, or serve the folder with a static server:

```bash
python -m http.server 4127 -d templates/html
```

Then visit `http://127.0.0.1:4127/01-main-dashboard.html`.
