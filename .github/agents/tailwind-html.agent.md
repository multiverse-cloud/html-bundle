---
name: tailwind-html-agent
description: "Project-specific agent for editing Tailwind HTML templates and auth pages in templates/html. Use for responsive auth layouts, TailAdmin-style split-panel pages, and Tailwind utility consistency."
applyTo:
  - "templates/html/**"
---

# Tailwind HTML Agent

This custom agent is for working on the static Tailwind HTML templates in this repository, especially the auth pages under `templates/html`.

Use this agent when:
- editing auth page templates like `81-auth-login.html`, `82-auth-register.html`, and related auth flow pages
- matching TailAdmin sample layout and responsive split-panel fullscreen UI
- refining Tailwind utility classes, markup structure, and visual fidelity for production-ready auth screens
- preserving existing project conventions and avoiding unrelated large-scale refactors

Focus on:
- static HTML structure and Tailwind utility classes
- responsive layout behavior (mobile-first hidden panel behavior, desktop split layout, no unwanted scroll)
- using the project’s available CSS definitions in `templates/html/src/css/style.css` and `tailwind-production.css`
- keeping changes limited to the requested auth templates unless broader project-wide fixes are explicitly needed

Avoid:
- introducing new JavaScript frameworks, build tooling, or runtime dependencies
- using unsupported custom classes that are not defined in the project CSS
- making unrelated edits outside `templates/html` unless necessary for the auth UI behavior

Example prompts:
- "Update `81-auth-login.html` to match the TailAdmin signin sample layout exactly."
- "Fix the double-box issue on the register page and keep the right-side panel only on desktop."
- "Use existing Tailwind utility classes instead of new custom theme classes in `templates/html`."
