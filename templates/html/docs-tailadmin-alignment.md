# TailAdmin Alignment Checklist

This bundle was checked against TailAdmin docs for HTML folder structure, app layout, HTML components, and customization.

## Folder Structure

- `src/css/style.css`: Tailwind v4 CSS-first theme entry.
- `src/js/index.js`: source JavaScript entrypoint.
- `src/js/components/`: component behavior stubs for charts, maps, forms, and shell logic.
- `src/partials/`: header/sidebar partial documentation.
- `tailwind-production.css`: generated local CSS used by production HTML pages.
- `pro-styles.css`: bundle-level theme, animation, modal, toast, and interaction polish.

## App Layout

- Every page uses the TailAdmin-style `flex h-screen overflow-hidden` wrapper.
- Sidebar is fixed/off-canvas on mobile and static on desktop.
- Header is sticky.
- Main content uses internal scrolling and horizontal overflow protection.
- Page content is constrained with `mx-auto w-full max-w-screen-2xl`.

## Component Coverage

TailAdmin HTML docs list alerts, avatars, badges, buttons, charts, grid images, metric groups, profile, tables, and video components. This bundle includes matching categories across the HTML pages and a dedicated canonical gallery:

- Canonical TailAdmin component gallery: `117-tailadmin-components.html`.
- Alerts and notifications: `35-cards-notifications.html`, `57-notifications-inbox.html`, `59-notifications-alerts.html`.
- Avatars/profile: `44-user-profile.html`, `45-user-profile-edit.html`, `101-users.html`.
- Badges/buttons/cards: card, pricing, project, and table pages.
- Charts/maps: `72-*` through `80-*`.
- Forms: `28-*`, `31-*`, `33-*`, `34-*`, `41-*`, `107-*`, `108-*`, `110-*`, `111-*`, `113-*`.
- Tables: `30-*`, `103-*` through `106-*`, `109-*`, `112-*`, `116-*`.
- Media/files: `36-*` through `40-*`, `42-*`, `114-*`, `115-*`.

## Customization

- Brand, semantic colors, typography, shadows, and breakpoints are defined in `src/css/style.css` with `@theme`.
- Runtime design tokens are mirrored in `pro-styles.css` as CSS custom properties.
- Dark mode uses the `.dark` class and is persisted by `common-header.js`.
- Sidebar width and content padding can be adjusted in `common-sidebar.js`, `upgrade-production-bundle.js`, and `pro-styles.css`.
