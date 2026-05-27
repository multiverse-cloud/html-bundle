const fs = require('fs');
const path = require('path');

const root = __dirname;
const metadataPath = path.resolve(root, '..', '..', 'metadata', 'templates.json');

const pages = [
  { id: 81, file: '81-auth-login.html', title: 'Sign In', category: 'authentication', desc: 'Responsive mtverse sign-in page with social auth, password visibility, and production-ready form actions.', kind: 'auth-login' },
  { id: 82, file: '82-auth-register.html', title: 'Create Account', category: 'authentication', desc: 'Responsive mtverse sign-up page with social auth, account fields, and terms confirmation.', kind: 'auth-register' },
  { id: 83, file: '83-auth-forgot-password.html', title: 'Forgot Password', category: 'authentication', desc: 'Password recovery page with reset instructions and email capture.', kind: 'auth-forgot' },
  { id: 84, file: '84-auth-reset-password.html', title: 'Reset Password', category: 'authentication', desc: 'Password reset page with confirm password fields and validation-ready UI.', kind: 'auth-reset' },
  { id: 85, file: '85-auth-verify-email.html', title: 'Verify Email', category: 'authentication', desc: 'Email verification page with resend code actions and account guidance.', kind: 'auth-verify' },
  { id: 86, file: '86-auth-2fa.html', title: 'Two-Factor Authentication', category: 'authentication', desc: 'Two-step verification page with OTP inputs and secure account messaging.', kind: 'auth-2fa' },
  { id: 87, file: '87-auth-sso.html', title: 'Enterprise SSO', category: 'authentication', desc: 'Enterprise SSO page with workspace domain capture and provider actions.', kind: 'auth-sso' },
  { id: 118, file: '118-faq.html', title: 'FAQ', category: 'pages', desc: 'Production FAQ page with accordions, support cards, and help-center actions.', kind: 'faq' },
  { id: 119, file: '119-blank-page.html', title: 'Blank Page', category: 'pages', desc: 'Starter blank page layout with scaffolding, state cards, and production-ready actions.', kind: 'blank' },
  { id: 120, file: '120-charts-radar.html', title: 'Radar Chart', category: 'charts', desc: 'Animated radar chart examples for multi-axis product analytics.', kind: 'radar' },
  { id: 121, file: '121-charts-radial.html', title: 'Radial Chart', category: 'charts', desc: 'Animated radial charts for goals, progress, and usage quotas.', kind: 'radial' },
  { id: 122, file: '122-ui-alerts.html', title: 'Alerts', category: 'ui-elements', desc: 'Alert components with success, warning, error, info, action, and stacked states.', kind: 'alerts' },
  { id: 123, file: '123-ui-avatars.html', title: 'Avatars', category: 'ui-elements', desc: 'Avatar sizes, groups, and online/offline indicators using the bundled profile image.', kind: 'avatars' },
  { id: 124, file: '124-ui-badge.html', title: 'Badge', category: 'ui-elements', desc: 'Badge variants for status, category, count, and priority labels.', kind: 'badge' },
  { id: 125, file: '125-ui-breadcrumb.html', title: 'Breadcrumb', category: 'ui-elements', desc: 'Breadcrumb patterns for deep dashboard navigation.', kind: 'breadcrumb' },
  { id: 126, file: '126-ui-buttons.html', title: 'Buttons', category: 'ui-elements', desc: 'Button variants with icons, loading states, destructive actions, and segmented controls.', kind: 'buttons' },
  { id: 127, file: '127-ui-button-groups.html', title: 'Buttons Group', category: 'ui-elements', desc: 'Button group and segmented control patterns for dashboard tooling.', kind: 'button-groups' },
  { id: 128, file: '128-ui-carousel.html', title: 'Carousel', category: 'ui-elements', desc: 'Carousel cards for onboarding, products, and announcements.', kind: 'carousel' },
  { id: 129, file: '129-ui-dropdowns.html', title: 'Dropdowns', category: 'ui-elements', desc: 'Dropdown menus, filter menus, profile menus, and contextual actions.', kind: 'dropdowns' },
  { id: 130, file: '130-ui-images.html', title: 'Images', category: 'ui-elements', desc: 'Image cards, media grids, upload previews, and empty-state visuals.', kind: 'images' },
  { id: 131, file: '131-ui-links.html', title: 'Links', category: 'ui-elements', desc: 'Text, icon, external, muted, and destructive link treatments.', kind: 'links' },
  { id: 132, file: '132-ui-list.html', title: 'List', category: 'ui-elements', desc: 'Advanced list rows with avatars, metadata, checkboxes, and row actions.', kind: 'list' },
  { id: 133, file: '133-ui-modals.html', title: 'Modals', category: 'ui-elements', desc: 'Modal examples for confirmation, forms, billing, and command workflows.', kind: 'modals' },
  { id: 134, file: '134-ui-notifications.html', title: 'Notification', category: 'ui-elements', desc: 'Notification center examples with unread states, badges, and toasts.', kind: 'notifications' },
  { id: 135, file: '135-ui-pagination.html', title: 'Pagination', category: 'ui-elements', desc: 'Pagination bars for tables, search results, and mobile lists.', kind: 'pagination' },
  { id: 136, file: '136-ui-popovers.html', title: 'Popovers', category: 'ui-elements', desc: 'Popover cards for quick previews, filters, and contextual details.', kind: 'popovers' },
  { id: 137, file: '137-ui-progressbar.html', title: 'Progressbar', category: 'ui-elements', desc: 'Progress bars for usage, onboarding, upload, and goal tracking.', kind: 'progress' },
  { id: 138, file: '138-ui-ribbons.html', title: 'Ribbons', category: 'ui-elements', desc: 'Ribbon labels for featured, beta, sale, and priority content.', kind: 'ribbons' },
  { id: 139, file: '139-ui-spinners.html', title: 'Spinners', category: 'ui-elements', desc: 'Loading spinners, skeleton states, and async action indicators.', kind: 'spinners' },
  { id: 140, file: '140-ui-tabs.html', title: 'Tabs', category: 'ui-elements', desc: 'Tabs and segmented tab surfaces for dashboards and settings.', kind: 'tabs' },
  { id: 141, file: '141-ui-tooltips.html', title: 'Tooltips', category: 'ui-elements', desc: 'Tooltip placements and icon help patterns.', kind: 'tooltips' },
  { id: 142, file: '142-ui-videos.html', title: 'Videos', category: 'ui-elements', desc: 'Video preview cards, lesson rows, and media player controls.', kind: 'videos' },
  { id: 143, file: '143-ecommerce-add-product.html', title: 'Add Product', category: 'ecommerce', desc: 'Advanced product creation page with media upload, variants, pricing, inventory, and publishing controls.', kind: 'add-product' },
  { id: 144, file: '144-ecommerce-transactions.html', title: 'Transactions', category: 'ecommerce', desc: 'Transaction management page with filters, payment status, risk checks, and export actions.', kind: 'transactions' },
  { id: 145, file: '145-ecommerce-transaction-detail.html', title: 'Single Transaction', category: 'ecommerce', desc: 'Transaction detail page with payment timeline, fraud signals, customer, invoice, and refund actions.', kind: 'transaction-detail' },
  { id: 146, file: '146-email-details.html', title: 'Email Details', category: 'email', desc: 'Email detail page with threaded conversation, attachments, labels, and reply composer.', kind: 'email-detail' },
];

const card = (title, body) => `
          <section class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white/90">${title}</h2>
            <div class="mt-5">${body}</div>
          </section>`;

const metricCards = `
        <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <p class="text-sm text-gray-500">Components</p><p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">24</p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <p class="text-sm text-gray-500">States</p><p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">96</p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <p class="text-sm text-gray-500">Responsive</p><p class="mt-2 text-3xl font-bold text-green-600">Ready</p>
          </div>
        </div>`;

function componentContent(kind) {
  const avatar = 'assets/avatars/admin-profile-man.png';
  const samples = {
    faq: [
      card('Popular questions', `<div class="divide-y divide-gray-200 dark:divide-gray-800">
        ${['How do I customize the sidebar?', 'Can I add new HTML pages?', 'Where do charts live?', 'Is dark mode production ready?'].map((q, i) => `<details class="group py-4" ${i === 0 ? 'open' : ''}><summary class="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900 dark:text-white">${q}<span class="text-blue-600">+</span></summary><p class="mt-2 text-sm leading-6 text-gray-500">Use the shared header, sidebar, CSS tokens, and app-shell behaviors so every page stays consistent after build.</p></details>`).join('')}
      </div>`),
      card('Support routing', `<div class="grid gap-3 sm:grid-cols-3"><button class="rounded-xl border border-gray-200 p-4 text-left dark:border-gray-800"><b>Docs</b><p class="mt-1 text-sm text-gray-500">Read setup notes.</p></button><button class="rounded-xl border border-gray-200 p-4 text-left dark:border-gray-800"><b>Ticket</b><p class="mt-1 text-sm text-gray-500">Create support case.</p></button><button class="rounded-xl border border-gray-200 p-4 text-left dark:border-gray-800"><b>Chat</b><p class="mt-1 text-sm text-gray-500">Talk to support.</p></button></div>`)
    ],
    blank: [
      card('Starter canvas', `<div class="grid min-h-[320px] place-items-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-white/[0.02]"><div><h3 class="text-xl font-bold text-gray-900 dark:text-white">Build your next page here</h3><p class="mx-auto mt-2 max-w-xl text-sm text-gray-500">The shell, sidebar, command search, loader, dark mode, and responsive spacing are already wired.</p><button class="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Create Section</button></div></div>`),
      card('Page checklist', `<div class="grid gap-3 sm:grid-cols-2">${['Responsive header', 'Sidebar active state', 'Loading transition', 'Empty state', 'Actions wired', 'Metadata ready'].map((item) => `<label class="flex items-center gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-800"><input type="checkbox" checked class="h-4 w-4 rounded border-gray-300"><span class="text-sm font-medium">${item}</span></label>`).join('')}</div>`)
    ],
    radar: [
      card('Product health radar', `<svg class="mx-auto h-80 w-full max-w-xl" viewBox="0 0 420 320" fill="none"><polygon points="210,28 346,106 346,236 210,304 74,236 74,106" stroke="#e5e7eb"/><polygon points="210,74 306,128 312,220 210,262 112,218 102,124" fill="#465fff" fill-opacity=".18" stroke="#465fff" stroke-width="3"/><polygon points="210,98 284,142 276,210 210,238 142,204 134,142" fill="#12b76a" fill-opacity=".18" stroke="#12b76a" stroke-width="3"/><circle cx="210" cy="74" r="5" fill="#465fff"/><circle cx="306" cy="128" r="5" fill="#465fff"/><circle cx="312" cy="220" r="5" fill="#465fff"/></svg>`),
      card('Axis scores', `<div class="grid gap-3 sm:grid-cols-3">${['Acquisition 92%', 'Activation 81%', 'Retention 76%', 'Revenue 88%', 'Support 69%', 'Quality 94%'].map((item) => `<div class="rounded-xl bg-gray-50 p-4 dark:bg-white/[0.04]"><p class="font-semibold">${item}</p><div class="mt-3 h-2 rounded-full bg-gray-200"><span class="block h-2 rounded-full bg-blue-600" style="width:${parseInt(item.match(/\d+/)[0], 10)}%"></span></div></div>`).join('')}</div>`)
    ],
    radial: [
      card('Monthly target', `<div class="grid gap-6 md:grid-cols-3">${[76, 58, 92].map((v) => `<div class="grid place-items-center rounded-xl border border-gray-200 p-5 dark:border-gray-800"><svg class="h-36 w-36" viewBox="0 0 120 120"><circle cx="60" cy="60" r="48" stroke="#e5e7eb" stroke-width="12" fill="none"/><circle cx="60" cy="60" r="48" stroke="#465fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="${v * 3} 999" transform="rotate(-90 60 60)"/></svg><p class="-mt-24 text-2xl font-bold">${v}%</p><p class="mt-20 text-sm text-gray-500">Goal progress</p></div>`).join('')}</div>`),
      card('Usage quotas', `<div class="space-y-4">${['Storage 64%', 'Seats 82%', 'AI credits 47%', 'Automations 73%'].map((item) => `<div><div class="mb-2 flex justify-between text-sm"><span>${item.split(' ')[0]}</span><span>${item.split(' ')[1]}</span></div><div class="h-2 rounded-full bg-gray-200"><span class="block h-2 rounded-full bg-blue-600" style="width:${item.split(' ')[1]}"></span></div></div>`).join('')}</div>`)
    ],
    alerts: [card('Alert variants', `<div class="grid gap-3">${['Success Message|green|Your workflow has been published.', 'Info Message|blue|A new integration is ready to configure.', 'Warning Message|yellow|Token usage is above the monthly target.', 'Error Message|red|Payment method requires attention.'].map((raw) => { const [title, color, text] = raw.split('|'); return `<div class="rounded-xl border border-${color}-500 bg-${color}-50 p-4 text-${color}-700 dark:bg-${color}-500/10"><b>${title}</b><p class="mt-1 text-sm">${text}</p></div>`; }).join('')}</div>`)],
    avatars: [card('Default avatar', `<div class="flex flex-wrap items-end justify-center gap-5">${[28,36,44,56,68,82].map((s) => `<img src="${avatar}" alt="Musharof avatar" class="rounded-full bg-gray-100" style="width:${s}px;height:${s}px">`).join('')}</div>`), card('Avatar with online indicator', `<div class="flex flex-wrap items-end justify-center gap-5">${[28,36,44,56,68,82].map((s) => `<span class="app-avatar" style="width:${s}px;height:${s}px"><img src="${avatar}" alt="Musharof avatar"><span class="app-online-dot"></span></span>`).join('')}</div>`)],
    badge: [card('Badge system', `<div class="flex flex-wrap gap-3">${['Primary','Success','Warning','Error','Neutral','Beta','New','Pro','Draft','Live'].map((x, i) => `<span class="rounded-full ${i % 4 === 0 ? 'bg-blue-50 text-blue-600' : i % 4 === 1 ? 'bg-green-50 text-green-600' : i % 4 === 2 ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-600'} px-3 py-1 text-xs font-bold">${x}</span>`).join('')}</div>`)],
    breadcrumb: [card('Breadcrumb examples', `<div class="space-y-4">${['Home / UI Elements / Breadcrumb', 'Dashboard / Ecommerce / Orders / Details', 'Settings / Billing / Payment methods'].map((x) => `<nav class="rounded-xl border border-gray-200 p-4 text-sm text-gray-500 dark:border-gray-800">${x.split(' / ').map((p, i, arr) => `<span class="${i === arr.length - 1 ? 'font-semibold text-gray-900 dark:text-white' : ''}">${p}</span>${i < arr.length - 1 ? '<span class="mx-2">/</span>' : ''}`).join('')}</nav>`).join('')}</div>`)],
    buttons: [card('Action buttons', `<div class="flex flex-wrap gap-3"><button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Primary</button><button class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold">Secondary</button><button class="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white">Save</button><button class="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white">Delete</button><button class="is-busy rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white">Loading</button></div>`)],
    'button-groups': [card('Segmented controls', `<div class="flex flex-wrap gap-4"><div class="inline-flex rounded-xl bg-gray-100 p-1 dark:bg-white/[0.04]">${['Daily','Weekly','Monthly'].map((x, i) => `<button class="rounded-lg px-4 py-2 text-sm font-semibold ${i === 1 ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-900' : 'text-gray-500'}">${x}</button>`).join('')}</div><div class="inline-flex rounded-xl border border-gray-200 dark:border-gray-800">${['Grid','List','Board'].map((x) => `<button class="border-r border-gray-200 px-4 py-2 text-sm font-semibold last:border-r-0 dark:border-gray-800">${x}</button>`).join('')}</div></div>`)],
    carousel: [card('Carousel preview', `<div class="grid gap-4 md:grid-cols-3">${['Launch campaign','Team activity','Revenue insight'].map((x, i) => `<article class="rounded-xl bg-gradient-to-br ${i === 0 ? 'from-blue-600 to-indigo-600' : i === 1 ? 'from-emerald-500 to-teal-600' : 'from-slate-800 to-blue-900'} p-5 text-white"><p class="text-sm opacity-80">Slide ${i + 1}</p><h3 class="mt-8 text-xl font-bold">${x}</h3><p class="mt-2 text-sm opacity-80">Production carousel card with readable content.</p></article>`).join('')}</div>`)],
    dropdowns: [card('Dropdown menu states', `<div class="grid gap-4 md:grid-cols-3">${['Profile','Filter','Actions'].map((x) => `<div class="rounded-xl border border-gray-200 p-4 dark:border-gray-800"><button class="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">${x}</button><div class="mt-3 rounded-xl border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900">${['View','Edit','Archive'].map((a) => `<button class="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-white/[0.04]">${a}</button>`).join('')}</div></div>`).join('')}</div>`)],
    images: [card('Media grid', `<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">${['#eef2ff','#ecfdf3','#fff7ed','#fdf2f8'].map((c, i) => `<div class="aspect-video rounded-xl border border-gray-200" style="background:${c}"><div class="grid h-full place-items-center text-sm font-bold text-gray-600">Image ${i + 1}</div></div>`).join('')}</div>`)],
    links: [card('Link variants', `<div class="grid gap-3 text-sm">${['Primary link','External link','Muted link','Danger link','Inline action'].map((x, i) => `<a href="#" class="${i === 3 ? 'text-red-600' : i === 2 ? 'text-gray-500' : 'text-blue-600'} font-semibold">${x}</a>`).join('')}</div>`)],
    list: [card('Operational list', `<div class="divide-y divide-gray-200 dark:divide-gray-800">${['Finish onboarding','Review billing update','Ship campaign','QA mobile sidebar'].map((x, i) => `<div class="flex items-center gap-4 py-4"><input type="checkbox" ${i === 0 ? 'checked' : ''} class="h-4 w-4 rounded"><img src="${avatar}" class="h-9 w-9 rounded-full" alt="Owner"><div class="flex-1"><p class="font-semibold">${x}</p><p class="text-sm text-gray-500">Assigned to product team</p></div><span class="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">Task</span></div>`).join('')}</div>`)],
    modals: [card('Modal templates', `<div class="grid gap-4 md:grid-cols-2"><div class="rounded-xl border border-gray-200 p-5 dark:border-gray-800"><h3 class="font-bold">Confirm action</h3><p class="mt-2 text-sm text-gray-500">Use this for destructive or billing actions.</p><button class="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white">Open Confirm</button></div><div class="rounded-xl border border-gray-200 p-5 dark:border-gray-800"><h3 class="font-bold">Edit profile</h3><p class="mt-2 text-sm text-gray-500">Form modal with validation-ready fields.</p><button class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Open Form</button></div></div>`)],
    notifications: [card('Notification feed', `<div class="space-y-3">${['Payment successful','New user registered','Quota warning','Deployment finished'].map((x, i) => `<div class="flex items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800"><span class="h-2.5 w-2.5 rounded-full ${i < 2 ? 'bg-blue-600' : 'bg-gray-300'}"></span><div class="flex-1"><p class="font-semibold">${x}</p><p class="text-sm text-gray-500">${i + 2} minutes ago</p></div><button class="text-sm font-semibold text-blue-600">View</button></div>`).join('')}</div>`)],
    pagination: [card('Table pagination', `<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p class="text-sm text-gray-500">Showing 1 to 10 of 159 entries</p><div class="flex items-center gap-2">${['Prev','1','2','3','Next'].map((x, i) => `<button class="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold ${i === 1 ? 'bg-blue-600 text-white' : ''} dark:border-gray-800">${x}</button>`).join('')}</div></div>`)],
    popovers: [card('Context popovers', `<div class="grid gap-4 md:grid-cols-3">${['User preview','Metric detail','Filter help'].map((x) => `<div class="rounded-xl border border-gray-200 p-4 dark:border-gray-800"><button class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white">${x}</button><div class="mt-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-500 dark:bg-white/[0.04]">Popover copy with quick actions and concise context.</div></div>`).join('')}</div>`)],
    progress: [card('Progress states', `<div class="space-y-5">${['Onboarding 72%','Storage 54%','Uploads 88%','Security 42%'].map((x) => `<div><div class="mb-2 flex justify-between text-sm font-semibold"><span>${x.split(' ')[0]}</span><span>${x.split(' ')[1]}</span></div><div class="h-3 rounded-full bg-gray-200"><span class="block h-3 rounded-full bg-blue-600" style="width:${x.split(' ')[1]}"></span></div></div>`).join('')}</div>`)],
    ribbons: [card('Ribbon cards', `<div class="grid gap-4 md:grid-cols-3">${['Featured','Beta','Popular'].map((x, i) => `<article class="relative overflow-hidden rounded-xl border border-gray-200 p-5 dark:border-gray-800"><span class="absolute right-[-34px] top-5 rotate-45 bg-blue-600 px-10 py-1 text-xs font-bold text-white">${x}</span><h3 class="text-lg font-bold">Plan ${i + 1}</h3><p class="mt-2 text-sm text-gray-500">Ribbon-ready product card.</p></article>`).join('')}</div>`)],
    spinners: [card('Loading states', `<div class="grid gap-4 md:grid-cols-3"><div class="grid place-items-center rounded-xl border border-gray-200 p-8 dark:border-gray-800"><span class="site-loader-mark"></span></div><div class="space-y-3 rounded-xl border border-gray-200 p-5 dark:border-gray-800"><div class="h-4 rounded bg-gray-200"></div><div class="h-4 w-3/4 rounded bg-gray-200"></div><div class="h-10 rounded bg-gray-100"></div></div><button class="is-busy rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white">Processing</button></div>`)],
    tabs: [card('Tabs surface', `<div class="rounded-xl border border-gray-200 p-2 dark:border-gray-800"><div class="flex gap-2 rounded-lg bg-gray-100 p-1 dark:bg-white/[0.04]">${['Overview','Activity','Settings'].map((x, i) => `<button class="flex-1 rounded-lg px-4 py-2 text-sm font-semibold ${i === 0 ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-900' : 'text-gray-500'}">${x}</button>`).join('')}</div><div class="p-5 text-sm text-gray-500">Tab panel content with production spacing.</div></div>`)],
    tooltips: [card('Tooltip placements', `<div class="grid gap-4 md:grid-cols-4">${['Top','Right','Bottom','Left'].map((x) => `<div class="relative grid place-items-center rounded-xl border border-gray-200 p-8 dark:border-gray-800"><button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">${x}</button><span class="absolute top-2 rounded-md bg-gray-900 px-2 py-1 text-xs text-white">${x} tooltip</span></div>`).join('')}</div>`)],
    videos: [card('Video player', `<div class="grid gap-5 lg:grid-cols-[1.5fr_1fr]"><div class="grid aspect-video place-items-center rounded-2xl bg-gray-900 text-white"><button class="grid h-16 w-16 place-items-center rounded-full bg-white text-blue-600 shadow-lg"><svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button></div><div class="space-y-3">${['Getting started','Layout system','Deploy bundle'].map((x, i) => `<div class="rounded-xl border border-gray-200 p-4 dark:border-gray-800"><p class="font-semibold">${x}</p><p class="text-sm text-gray-500">${8 + i * 4}:00 min lesson</p></div>`).join('')}</div></div>`)],
    'add-product': [
      card('Product information', `<div class="grid gap-4 md:grid-cols-2"><label><span class="mb-2 block text-sm font-semibold">Product name</span><input class="h-11 w-full rounded-xl border border-gray-200 px-3" value="mtverse Analytics Suite"></label><label><span class="mb-2 block text-sm font-semibold">SKU</span><input class="h-11 w-full rounded-xl border border-gray-200 px-3" value="MTV-AN-2026"></label><label class="md:col-span-2"><span class="mb-2 block text-sm font-semibold">Description</span><textarea rows="4" class="w-full rounded-xl border border-gray-200 p-3">A production analytics dashboard kit for SaaS operators.</textarea></label></div>`),
      card('Media and variants', `<div class="grid gap-4 lg:grid-cols-2"><div class="grid min-h-56 place-items-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-center"><div><p class="font-bold">Drop product images</p><p class="text-sm text-gray-500">PNG, JPG, WebP up to 10MB</p></div></div><div class="space-y-3">${['Starter / $49 / 92 in stock','Pro / $99 / 48 in stock','Enterprise / Custom / Unlimited'].map((x)=>`<div class="flex items-center justify-between rounded-xl border border-gray-200 p-4"><span class="font-semibold">${x}</span><button class="text-sm font-bold text-blue-600">Edit</button></div>`).join('')}</div></div>`),
      card('Publishing controls', `<div class="grid gap-4 md:grid-cols-3">${['Draft saved','SEO ready','Inventory synced'].map((x)=>`<div class="rounded-xl bg-green-50 p-4 text-green-700"><p class="font-bold">${x}</p><p class="mt-1 text-sm">Ready for production workflow.</p></div>`).join('')}</div>`)
    ],
    transactions: [
      card('Transaction filters', `<div class="grid gap-3 md:grid-cols-4"><input class="h-11 rounded-xl border border-gray-200 px-3" placeholder="Search transaction"><select class="h-11 rounded-xl border border-gray-200 px-3"><option>All statuses</option><option>Paid</option><option>Refunded</option></select><select class="h-11 rounded-xl border border-gray-200 px-3"><option>All methods</option><option>Card</option><option>PayPal</option></select><button class="rounded-xl bg-blue-600 px-4 text-sm font-bold text-white">Filter</button></div>`),
      card('Payments table', `<table class="w-full text-left text-sm"><thead><tr class="border-b"><th class="py-3">ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Risk</th><th></th></tr></thead><tbody>${['TX-2391|Musharof|$299.00|Paid|Low','TX-2392|Aisha Khan|$99.00|Pending|Medium','TX-2393|Ryan Chen|$149.00|Refunded|Low','TX-2394|Sophie Lin|$899.00|Paid|Review'].map((r)=>{const a=r.split('|');return `<tr class="border-b"><td class="py-4 font-semibold">${a[0]}</td><td>${a[1]}</td><td>${a[2]}</td><td><span class="rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-600">${a[3]}</span></td><td>${a[4]}</td><td><a class="font-bold text-blue-600" href="145-ecommerce-transaction-detail.html">View</a></td></tr>`}).join('')}</tbody></table>`)
    ],
    'transaction-detail': [
      card('Payment summary', `<div class="grid gap-4 md:grid-cols-4">${['Amount $299.00','Status Paid','Method Mastercard','Risk Low'].map((x)=>`<div class="rounded-xl bg-gray-50 p-4"><p class="text-sm text-gray-500">${x.split(' ')[0]}</p><p class="mt-2 text-xl font-bold">${x.replace(x.split(' ')[0]+' ','')}</p></div>`).join('')}</div>`),
      card('Timeline', `<div class="space-y-4">${['Payment authorized','Invoice generated','Receipt sent','Order fulfilled'].map((x,i)=>`<div class="flex gap-3"><span class="mt-1 h-3 w-3 rounded-full ${i<3?'bg-blue-600':'bg-gray-300'}"></span><div><p class="font-semibold">${x}</p><p class="text-sm text-gray-500">May 26, 2026 at 11:${20+i*7} AM</p></div></div>`).join('')}</div>`),
      card('Actions', `<div class="flex flex-wrap gap-3"><button class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white">Download invoice</button><button class="rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold">Send receipt</button><button class="rounded-xl border border-red-300 px-4 py-2 text-sm font-bold text-red-600">Refund</button></div>`)
    ],
    'email-detail': [
      card('Conversation', `<div class="space-y-4">${['Can you share the dashboard export?','Sure, attaching the latest report and notes.','Looks good. Please send the invoice copy too.'].map((x,i)=>`<article class="rounded-2xl ${i===1?'bg-blue-50':'bg-gray-50'} p-4"><div class="mb-2 flex items-center justify-between"><p class="font-bold">${i===1?'Musharof':'Client Team'}</p><span class="text-xs text-gray-500">12:${10+i*8} PM</span></div><p class="text-sm text-gray-600">${x}</p></article>`).join('')}</div>`),
      card('Attachments and reply', `<div class="space-y-4"><div class="grid gap-3 sm:grid-cols-2">${['invoice-may.pdf','dashboard-export.csv'].map((x)=>`<div class="rounded-xl border border-gray-200 p-4"><p class="font-semibold">${x}</p><p class="text-sm text-gray-500">Ready to download</p></div>`).join('')}</div><textarea rows="5" class="w-full rounded-xl border border-gray-200 p-3" placeholder="Write a reply..."></textarea><button class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white">Send reply</button></div>`)
    ],
  };
  return samples[kind] || [card('Component examples', '<p class="text-sm text-gray-500">Reusable production component examples.</p>')];
}

function advancedWorkbench(page) {
  if (page.category === 'authentication') return '';
  return `
          <section class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] xl:col-span-2">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white/90">${page.title} production states</h2>
                <p class="mt-1 text-sm text-gray-500">Real dashboard states with actions, accessibility, responsive layout, and clean spacing.</p>
              </div>
              <div class="inline-flex rounded-xl bg-gray-100 p-1 dark:bg-white/[0.04]">
                <button class="rounded-lg bg-white px-4 py-2 text-sm font-bold text-blue-600 shadow-sm dark:bg-gray-900">Preview</button>
                <button class="rounded-lg px-4 py-2 text-sm font-bold text-gray-500">Code</button>
                <button class="rounded-lg px-4 py-2 text-sm font-bold text-gray-500">States</button>
              </div>
            </div>
            <div class="mt-5 grid gap-4 md:grid-cols-3">
              ${['Default', 'Hover / active', 'Loading / empty'].map((state, index) => `<div class="rounded-xl border border-gray-200 p-4 dark:border-gray-800"><div class="mb-4 flex items-center justify-between"><p class="font-bold">${state}</p><span class="h-2.5 w-2.5 rounded-full ${index === 2 ? 'bg-yellow-400' : 'bg-green-500'}"></span></div><div class="space-y-2"><div class="h-3 rounded bg-gray-100 dark:bg-white/[0.06]"></div><div class="h-3 w-3/4 rounded bg-gray-100 dark:bg-white/[0.06]"></div><button class="mt-3 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white">Action</button></div></div>`).join('')}
            </div>
          </section>`;
}

function authFields(kind) {
  const input = (label, type, placeholder) => `
              <label class="block">
                <span class="mb-2 block text-sm font-semibold text-gray-800 dark:text-white/90">${label}</span>
                <input type="${type}" placeholder="${placeholder}" class="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white" />
              </label>`;
  if (kind === 'auth-register') return `${input('Name', 'text', 'Enter your name')}${input('Email', 'email', 'info@gmail.com')}${input('Password', 'password', 'Create a password')}`;
  if (kind === 'auth-forgot') return `${input('Email', 'email', 'info@gmail.com')}`;
  if (kind === 'auth-reset') return `${input('New Password', 'password', 'Enter new password')}${input('Confirm Password', 'password', 'Confirm password')}`;
  if (kind === 'auth-verify') return `<div class="rounded-xl bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">We sent a verification link to <b>musharof@example.com</b>.</div>`;
  if (kind === 'auth-2fa') return `<div><span class="mb-3 block text-sm font-semibold text-gray-800 dark:text-white/90">Enter verification code</span><div class="grid grid-cols-6 gap-2">${Array.from({ length: 6 }, (_, i) => `<input maxlength="1" value="${i < 3 ? i + 2 : ''}" class="h-12 rounded-xl border border-gray-200 bg-white text-center text-lg font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-white/[0.03]" />`).join('')}</div></div>`;
  if (kind === 'auth-sso') return `${input('Workspace domain', 'text', 'company.mtverse.com')}${input('Work email', 'email', 'you@company.com')}`;
  return `${input('Email', 'email', 'info@gmail.com')}${input('Password', 'password', 'Enter your password')}`;
}

function renderAuthPage(page) {
  const primary = page.kind === 'auth-register' ? 'Create account'
    : page.kind === 'auth-forgot' ? 'Send reset link'
    : page.kind === 'auth-reset' ? 'Reset password'
    : page.kind === 'auth-verify' ? 'Open inbox'
    : page.kind === 'auth-2fa' ? 'Verify account'
    : page.kind === 'auth-sso' ? 'Continue with SSO'
    : 'Sign in';
  const footer = page.kind === 'auth-register'
    ? `Already have an account? <a href="81-auth-login.html" class="font-semibold text-blue-600">Sign In</a>`
    : `Don't have an account? <a href="82-auth-register.html" class="font-semibold text-blue-600">Sign Up</a>`;
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#465fff" />
  <meta name="description" content="${page.desc}" />
  <title>${page.title} - mtverse</title>
  <link rel="stylesheet" href="tailwind-production.css">
  <link rel="stylesheet" href="pro-styles.css">
</head>
<body class="bg-white text-gray-800 font-sans dark:bg-gray-950 dark:text-gray-100">
  <main class="grid min-h-screen grid-cols-1 lg:grid-cols-2">
    <section class="flex min-h-screen items-center justify-center px-6 py-10">
      <div class="w-full max-w-[560px]">
        <a href="01-main-dashboard.html" class="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 18-6-6 6-6"/></svg>
          Back to dashboard
        </a>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">${page.title}</h1>
        <p class="mt-3 text-gray-500">${page.desc}</p>

        <div class="mt-8 grid gap-3 sm:grid-cols-2">
          <button type="button" class="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-gray-100 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-200 dark:bg-white/[0.04] dark:text-gray-200">
            <span class="text-lg font-bold text-blue-600">G</span> Continue with Google
          </button>
          <button type="button" class="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-gray-100 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-200 dark:bg-white/[0.04] dark:text-gray-200">
            <span class="text-lg font-bold">X</span> Continue with X
          </button>
        </div>

        <div class="my-8 flex items-center gap-4 text-sm text-gray-400"><span class="h-px flex-1 bg-gray-200 dark:bg-gray-800"></span>Or<span class="h-px flex-1 bg-gray-200 dark:bg-gray-800"></span></div>
        <form class="grid gap-5">
${authFields(page.kind)}
          ${page.kind === 'auth-login' ? `<div class="flex items-center justify-between gap-3 text-sm"><label class="inline-flex items-center gap-2"><input type="checkbox" class="h-4 w-4 rounded border-gray-300">Keep me logged in</label><a href="83-auth-forgot-password.html" class="font-semibold text-blue-600">Forgot password?</a></div>` : ''}
          <button type="submit" class="h-12 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">${primary}</button>
        </form>
        <p class="mt-6 text-sm text-gray-600 dark:text-gray-400">${footer}</p>
      </div>
    </section>
    <section class="relative hidden min-h-screen overflow-hidden bg-[#151853] lg:grid lg:place-items-center">
      <div class="absolute inset-0 opacity-30" style="background-image: linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px); background-size: 72px 72px;"></div>
      <div class="relative z-10 text-center text-white">
        <div class="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-blue-600 shadow-2xl shadow-blue-600/30">
          <svg class="h-9 w-9" viewBox="0 0 24 24" fill="currentColor"><path d="M6 17V9h2.5v8H6Zm4.75 0V5h2.5v12h-2.5ZM15.5 17v-6H18v6h-2.5Z"/></svg>
        </div>
        <h2 class="text-4xl font-bold">mtverse</h2>
        <p class="mx-auto mt-4 max-w-md text-lg text-white/70">Production-ready Tailwind CSS admin dashboard experience for modern teams.</p>
      </div>
    </section>
  </main>
  <script src="app-shell.js"></script>
</body>
</html>
`;
}

function renderPage(page) {
  const sections = componentContent(page.kind).join('\n');
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#465fff" />
  <meta name="description" content="${page.desc}" />
  <title>${page.title} - mtverse</title>
  <style>
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-slideDown { animation: slideDown 0.2s ease-out; }
  </style>
  <link rel="stylesheet" href="tailwind-production.css">
  <link rel="stylesheet" href="pro-styles.css">
</head>
<body class="bg-gray-50 text-gray-800 font-sans dark:bg-gray-900 dark:text-gray-100">
<div id="sidebar-overlay" class="fixed inset-0 bg-black/40 z-40 hidden lg:hidden" onclick="toggleSidebar()"></div>
<div class="flex h-screen overflow-hidden">
  <div id="sidebar-container"></div>
  <div class="flex-1 flex flex-col overflow-hidden">
    <div id="header-container"></div>
    <main class="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-6 2xl:px-10 py-6" tabindex="-1">
      <div class="mx-auto w-full max-w-screen-2xl">
        <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div class="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <span>mtverse</span><span>/</span><span>${page.category}</span><span>/</span>
              <span class="font-medium text-gray-800 dark:text-white/90">${page.title}</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white/90">${page.title}</h1>
            <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">${page.desc}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button type="button" class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300">Preview</button>
            <button type="button" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Use Component</button>
          </div>
        </div>
${metricCards}
        <div class="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
${sections}
${advancedWorkbench(page)}
        </div>
      </div>
    </main>
  </div>
</div>
<script src="common-sidebar.js"></script>
<script src="common-header.js"></script>
<script src="app-shell.js"></script>
</body>
</html>
`;
}

for (const page of pages) {
  fs.writeFileSync(path.join(root, page.file), page.category === 'authentication' ? renderAuthPage(page) : renderPage(page), 'utf8');
}

const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
for (const page of pages) {
  const slug = page.file.replace(/^\d+-/, '').replace(/\.html$/, '');
  const entry = {
    id: `html-${String(page.id).padStart(3, '0')}`,
    title: page.title,
    slug,
    framework: 'html',
    category: page.category,
    description: page.desc,
    previewImagePath: `/previews/html/${page.file.replace('.html', '.png')}`,
    sourceZipPath: `/source-zips/html/${page.file.replace('.html', '.zip')}`,
    livePreviewPath: `/live-previews/html/${page.file}`,
    tags: ['tailadmin', 'html', 'production-ready', 'responsive', 'dark-mode', page.category],
    responsive: true,
    darkModeReady: true,
    difficulty: 'advanced',
    createdAt: '2026-05-26',
  };
  const index = metadata.findIndex((item) => item.id === entry.id);
  if (index >= 0) metadata[index] = { ...metadata[index], ...entry };
  else metadata.push(entry);
}

for (const file of fs.readdirSync(root).filter((name) => /^\d+-.+\.html$/.test(name))) {
  const idNumber = Number(file.match(/^(\d+)/)[1]);
  const id = `html-${String(idNumber).padStart(3, '0')}`;
  if (metadata.some((item) => item.id === id)) continue;
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const rawTitle = (source.match(/<title>(.*?)<\/title>/i) || [null, file])[1]
    .replace(/\s+[—-]\s+.*$/u, '')
    .replace(/\s+/g, ' ')
    .trim();
  const slug = file.replace(/^\d+-/, '').replace(/\.html$/, '');
  metadata.push({
    id,
    title: rawTitle,
    slug,
    framework: 'html',
    category: slug.split('-')[0] || 'dashboard',
    description: `Production-ready ${rawTitle} HTML dashboard page with responsive TailAdmin-style layout, shared app shell, dark mode, and interactive actions.`,
    previewImagePath: `/previews/html/${file.replace('.html', '.png')}`,
    sourceZipPath: `/source-zips/html/${file.replace('.html', '.zip')}`,
    livePreviewPath: `/live-previews/html/${file}`,
    tags: ['tailadmin', 'html', 'production-ready', 'responsive', 'dark-mode'],
    responsive: true,
    darkModeReady: true,
    difficulty: 'advanced',
    createdAt: '2026-05-26',
  });
}

metadata.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8');

console.log(`Generated ${pages.length} advanced mtverse pages.`);
