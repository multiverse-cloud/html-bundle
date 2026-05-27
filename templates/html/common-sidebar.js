// common-sidebar.js — Advanced Sidebar with workspace switcher, nav search, smooth collapse, dark mode
(function() {
'use strict';

// ─── Nav Data ────────────────────────────────────────────────────────────────
const navGroups = [
  {
    label: 'MENU',
    items: [
      { label: 'Dashboard', icon: 'grid', badge: null, children: [
        ['Ecommerce', '01-main-dashboard.html'],
        ['Analytics', '02-analytics-dashboard.html'],
        ['Marketing', '03-ecommerce-dashboard.html'],
        ['CRM', '04-ai-tools-dashboard.html'],
        ['Stocks', '13-ai-usage-analytics.html'],
        ['SaaS', '05-prompt-cms-dashboard.html'],
        ['Finance', '54-billing-invoices.html', 'NEW'],
        ['AI', '04-ai-tools-dashboard.html', 'NEW'],
      ]},
      { label: 'AI Assistant', icon: 'bot', badge: 'NEW', children: [
        ['Text Generator', '09-ai-text-generator.html'],
        ['Image Generator', '08-ai-image-generator.html'],
        ['Code Generator', '10-ai-code-assistant.html'],
        ['Chat Interface', '11-ai-chat-interface.html'],
        ['Workflow Builder', '15-ai-workflow-builder.html'],
        ['AI Settings', '14-ai-model-settings.html'],
      ]},
      { label: 'E-commerce', icon: 'cart', children: [
        ['Products', '112-tables-products.html'],
        ['Add Product', '143-ecommerce-add-product.html'],
        ['Transactions', '144-ecommerce-transactions.html'],
        ['Invoices', '116-tables-invoices.html'],
      ]},
      { label: 'Analytics', icon: 'chart', children: [
        ['Line Charts', '72-charts-line.html'],
        ['Bar Charts', '73-charts-bar.html'],
        ['Pie Charts', '74-charts-pie.html'],
        ['Realtime', '76-charts-realtime.html'],
      ]},
      { label: 'Calendar', icon: 'calendar', href: '66-calendar-month.html' },
      { label: 'Tasks', icon: 'check', children: [
        ['Board', '69-tasks-board.html'],
        ['List', '70-tasks-list.html'],
      ]},
      { label: 'File Manager', icon: 'folder', children: [
        ['Overview', '29-files-manager.html'],
        ['List View', '37-file-manager-list.html'],
        ['Upload', '38-file-manager-upload.html'],
        ['Documents', '42-files-documents.html'],
      ]},
    ]
  },
  {
    label: 'SUPPORT',
    items: [
      { label: 'Messages', icon: 'message', children: [
        ['Inbox', '63-email-inbox.html'],
        ['Compose', '64-email-compose.html'],
        ['Chat', '61-chat-live.html'],
      ]},
      { label: 'Notifications', icon: 'bell', href: '57-notifications-inbox.html' },
      { label: 'Help / FAQ', icon: 'help', href: '118-faq.html' },
    ]
  },
  {
    label: 'OTHERS',
    items: [
      { label: 'Users', icon: 'users', href: '101-users.html' },
      { label: 'Settings', icon: 'settings', children: [
        ['General', '49-settings-general.html'],
        ['Notifications', '50-settings-notifications.html'],
        ['Billing', '51-settings-billing.html'],
        ['Integrations', '52-settings-integrations.html'],
        ['Appearance', '53-settings-appearance.html'],
      ]},
      { label: 'Auth Pages', icon: 'lock', children: [
        ['Login', '81-auth-login.html'],
        ['Register', '82-auth-register.html'],
        ['Forgot Password', '83-auth-forgot-password.html'],
        ['Reset Password', '84-auth-reset-password.html'],
        ['Verify Email', '85-auth-verify-email.html'],
        ['2FA', '86-auth-2fa.html'],
        ['SSO', '87-auth-sso.html'],
      ]},
      { label: 'Error Pages', icon: 'warning', children: [
        ['404', '88-error-404.html'],
        ['500', '89-error-500.html'],
        ['Maintenance', '90-error-maintenance.html'],
      ]},
    ]
  }
];


// ─── SVG Icons ───────────────────────────────────────────────────────────────
const icons = {
  grid: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  bot: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/><path d="M8 15h.01M16 15h.01"/></svg>`,
  cart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  chart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  calendar: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  check: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  folder: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  message: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  bell: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  help: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  settings: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  lock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  chevron: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
};


// ─── Workspaces ───────────────────────────────────────────────────────────────
const workspaces = [
  { id: 'ws1', name: 'Acme Corp', color: '#3b82f6', initial: 'A' },
  { id: 'ws2', name: 'TechFlow Inc', color: '#8b5cf6', initial: 'T' },
  { id: 'ws3', name: 'Startup Studio', color: '#10b981', initial: 'S' },
];
let activeWorkspace = workspaces[0];

// ─── HTML Builder ────────────────────────────────────────────────────────────
function buildSidebarHTML() {
  const navHTML = navGroups.map(group => `
    <div class="nav-group" data-group="${group.label}">
      <p class="sidebar-group-label px-4 mb-1 text-[10px] font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase select-none collapsed-hide">${group.label}</p>
      ${group.items.map(item => buildNavItem(item)).join('')}
    </div>
  `).join('');

  return `
    <style>
      #sidebar-container aside {
        display: flex; flex-direction: column;
        width: 260px; min-height: 100vh;
        background: #fff; border-right: 1px solid #e5e7eb;
        transition: width 0.25s cubic-bezier(.4,0,.2,1);
        overflow: hidden; position: relative;
      }
      .dark #sidebar-container aside { background: #111827; border-color: #1f2937; }
      #sidebar-container aside.collapsed { width: 68px; }
      #sidebar-container aside.collapsed .collapsed-hide { display: none !important; }
      #sidebar-container aside.collapsed .nav-item-label { opacity: 0; width: 0; overflow: hidden; }
      #sidebar-container aside.collapsed .nav-chevron { display: none !important; }
      #sidebar-container aside.collapsed .nav-badge { display: none !important; }
      #sidebar-container aside.collapsed .nav-link { justify-content: center; padding-left: 0; padding-right: 0; }
      #sidebar-container aside.collapsed .nav-link .nav-icon { margin: 0 auto; }
      #sidebar-container aside.collapsed .sidebar-group-label { padding: 0; }
      #sidebar-container aside.collapsed .nav-sub { display: none !important; }
      #sidebar-container aside.collapsed .ws-name { display: none; }
      .nav-link {
        display: flex; align-items: center; gap: 10px;
        padding: 8px 16px; border-radius: 6px; margin: 1px 8px;
        font-size: 14px; font-weight: 500; color: #374151;
        cursor: pointer; transition: background 0.15s, color 0.15s;
        text-decoration: none; white-space: nowrap;
      }
      .dark .nav-link { color: #9ca3af; }
      .nav-link:hover { background: #f3f4f6; color: #111827; }
      .dark .nav-link:hover { background: #1f2937; color: #f9fafb; }
      .nav-link.active { background: #eff6ff; color: #2563eb; font-weight: 600; }
      .dark .nav-link.active { background: #1e3a5f; color: #60a5fa; }
      .nav-link.active .nav-icon { color: #2563eb; }
      .dark .nav-link.active .nav-icon { color: #60a5fa; }
      .nav-icon { flex-shrink: 0; width: 20px; height: 20px; color: #6b7280; transition: color 0.15s; }
      .dark .nav-icon { color: #6b7280; }
      .nav-link:hover .nav-icon { color: #2563eb; }
      .dark .nav-link:hover .nav-icon { color: #93c5fd; }
      .nav-item-label { flex: 1; transition: opacity 0.2s, width 0.2s; }
      .nav-badge { font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 9999px; background: #dbeafe; color: #2563eb; }
      .dark .nav-badge { background: #1e3a5f; color: #93c5fd; }
      .nav-chevron { transition: transform 0.2s; color: #9ca3af; flex-shrink: 0; }
      .nav-chevron.open { transform: rotate(90deg); }
      .nav-sub { overflow: hidden; max-height: 0; transition: max-height 0.25s cubic-bezier(.4,0,.2,1); }
      .nav-sub.open { max-height: 800px; }
      .nav-sub-link {
        display: flex; align-items: center; gap-2; padding: 6px 16px 6px 46px;
        font-size: 13px; color: #6b7280; border-radius: 6px; margin: 1px 8px;
        text-decoration: none; transition: background 0.15s, color 0.15s;
      }
      .dark .nav-sub-link { color: #6b7280; }
      .nav-sub-link:hover { background: #f9fafb; color: #111827; }
      .dark .nav-sub-link:hover { background: #1f2937; color: #f9fafb; }
      .nav-sub-link.active { color: #2563eb; font-weight: 600; }
      .dark .nav-sub-link.active { color: #60a5fa; }
      .nav-sub-badge { font-size: 9px; font-weight: 700; padding: 1px 5px; border-radius: 9999px; background: #dcfce7; color: #16a34a; margin-left: 4px; }
      .nav-hidden { display: none !important; }
      /* Overlay for mobile */
      #sidebar-overlay {
        display: none; position: fixed; inset: 0; z-index: 39;
        background: rgba(0,0,0,0.5); backdrop-filter: blur(2px);
        animation: fadeIn 0.2s ease;
      }
      @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      @media (prefers-reduced-motion: reduce) {
        #sidebar-container aside, .nav-sub, .nav-chevron { transition: none !important; }
      }
      /* Workspace switcher */
      .ws-dropdown { position: relative; }
      .ws-menu {
        display: none; position: absolute; top: calc(100% + 4px); left: 8px; right: 8px;
        background: #fff; border: 1px solid #e5e7eb; border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,.12); z-index: 100; overflow: hidden;
      }
      .dark .ws-menu { background: #1f2937; border-color: #374151; }
      .ws-menu.open { display: block; }
      .ws-menu-item {
        display: flex; align-items: center; gap: 10px; padding: 10px 14px;
        cursor: pointer; font-size: 13px; font-weight: 500; color: #374151;
        transition: background 0.12s;
      }
      .dark .ws-menu-item { color: #d1d5db; }
      .ws-menu-item:hover { background: #f9fafb; }
      .dark .ws-menu-item:hover { background: #374151; }
      .ws-menu-item.active-ws { background: #eff6ff; }
      .dark .ws-menu-item.active-ws { background: #1e3a5f; }
    </style>

    <div id="sidebar-overlay" onclick="window.handleSidebarToggle()"></div>

    <aside id="main-sidebar">
      <!-- ── TOP: Logo + Workspace Switcher ── -->
      <div class="px-4 py-4 border-b border-gray-100 dark:border-gray-800">
        <div class="flex items-center justify-between mb-3">
          <a href="01-main-dashboard.html" class="flex items-center gap-2 collapsed-hide">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span class="text-white font-bold text-sm">M</span>
            </div>
            <span class="font-bold text-gray-900 dark:text-white text-base tracking-tight">mtverse</span>
          </a>
          <a href="01-main-dashboard.html" class="hidden collapsed-logo">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">M</span>
            </div>
          </a>
          <button onclick="window.toggleSidebar()" title="Collapse sidebar"
            class="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors collapsed-hide">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        </div>
        <!-- Workspace switcher -->
        <div class="ws-dropdown collapsed-hide" id="wsDropdown">
          <button onclick="window.toggleWsMenu()" id="wsBtn"
            class="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
            <div id="wsAvatar" class="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"></div>
            <span id="wsName" class="ws-name flex-1 text-sm font-medium text-gray-700 dark:text-gray-300 truncate"></span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="ws-menu" id="wsMenu"></div>
        </div>
      </div>
  `;
}


function buildNavItem(item) {
  if (item.href) {
    return `<a href="${item.href}" class="nav-link nav-flat-link" data-label="${item.label.toLowerCase()}">
      <span class="nav-icon">${icons[item.icon] || icons.grid}</span>
      <span class="nav-item-label">${item.label}</span>
    </a>`;
  }
  const children = item.children || [];
  const childLinks = children.map(([label, href, badge]) => `
    <a href="${href}" class="nav-sub-link" data-label="${label.toLowerCase()}">
      <span style="flex:1">${label}</span>
      ${badge ? `<span class="nav-sub-badge">${badge}</span>` : ''}
    </a>
  `).join('');
  return `
    <div class="nav-item-group">
      <button class="nav-link w-full text-left" onclick="window.toggleSubmenu(this)">
        <span class="nav-icon">${icons[item.icon] || icons.grid}</span>
        <span class="nav-item-label">${item.label}</span>
        ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
        <span class="nav-chevron">${icons.chevron}</span>
      </button>
      <div class="nav-sub">${childLinks}</div>
    </div>
  `;
}

function buildWsMenu() {
  return workspaces.map(ws => `
    <div class="ws-menu-item ${ws.id === activeWorkspace.id ? 'active-ws' : ''}" onclick="window.switchWorkspace('${ws.id}')">
      <div style="width:20px;height:20px;border-radius:4px;background:${ws.color};display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;flex-shrink:0">${ws.initial}</div>
      <span>${ws.name}</span>
      ${ws.id === activeWorkspace.id ? '<svg style="margin-left:auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
    </div>
  `).join('');
}


// ─── Main Init ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  const sidebarContainer = document.getElementById('sidebar-container');
  if (!sidebarContainer) return;

  sidebarContainer.innerHTML = buildSidebarHTML();

  const aside = document.getElementById('main-sidebar');

  // Append search + nav scroll area + user profile
  const scrollArea = document.createElement('div');
  scrollArea.style.cssText = 'flex:1;overflow-y:auto;padding: 12px 0;';
  scrollArea.innerHTML = `
    <!-- Search -->
    <div class="px-4 mb-3 collapsed-hide">
      <div style="position:relative">
        <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#9ca3af;pointer-events:none">${icons.search}</span>
        <input id="navSearchInput" type="text" placeholder="Search menu…"
          style="width:100%;padding:7px 10px 7px 34px;border:1px solid #e5e7eb;border-radius:8px;font-size:13px;background:#f9fafb;color:#374151;outline:none;transition:border-color .15s,box-shadow .15s"
          onfocus="this.style.borderColor='#3b82f6';this.style.boxShadow='0 0 0 3px rgba(59,130,246,.15)'"
          onblur="this.style.borderColor='#e5e7eb';this.style.boxShadow='none'"
          oninput="window.filterNav(this.value)" />
      </div>
    </div>
    <div id="navGroups">${navGroups.map(g => buildGroupHTML(g)).join('')}</div>
    <div id="noNavResults" style="display:none;padding:20px 16px;text-align:center;font-size:13px;color:#9ca3af">No results found</div>
  `;

  const userProfile = document.createElement('div');
  userProfile.style.cssText = 'border-top:1px solid #e5e7eb;padding:12px 16px;flex-shrink:0;';
  userProfile.className = 'dark-border-gray-800';
  userProfile.innerHTML = `
    <div class="collapsed-hide" style="display:flex;align-items:center;gap:10px">
      <div id="userAvatar" style="width:36px;height:36px;border-radius:50%;background:#3b82f6;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:14px;flex-shrink:0">JD</div>
      <div style="flex:1;min-width:0">
        <p style="font-size:13px;font-weight:600;color:#111827;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" class="dark-text-white">Jane Doe</p>
        <p style="font-size:11px;color:#6b7280;margin:0">Admin · mtverse</p>
      </div>
      <button style="padding:4px;border-radius:6px;color:#9ca3af;background:none;border:none;cursor:pointer" 
        title="Settings" onclick="location.href='49-settings-general.html'">
        ${icons.settings}
      </button>
    </div>
    <div style="display:none" class="show-collapsed" id="userAvatarCollapsed">
      <div style="width:36px;height:36px;border-radius:50%;background:#3b82f6;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:14px;margin:0 auto;cursor:pointer" title="Jane Doe">JD</div>
    </div>
  `;

  aside.appendChild(scrollArea);
  aside.appendChild(userProfile);

  // Init workspace switcher
  updateWorkspaceUI();
  document.getElementById('wsMenu').innerHTML = buildWsMenu();

  // Active page highlighting
  highlightActivePage();

  // Auto-open submenu containing active page
  autoOpenActiveSubmenu();

  // Keyboard navigation
  setupKeyboardNav();

  // Restore collapsed state
  if (localStorage.getItem('sidebarCollapsed') === 'true') {
    aside.classList.add('collapsed');
  }

  // Dark mode styling for scrollarea
  applyDarkStyles();
});

function buildGroupHTML(group) {
  return `<div class="nav-group-rendered" data-group="${group.label}">
    <p style="padding:0 16px;margin:12px 0 4px;font-size:10px;font-weight:700;letter-spacing:.1em;color:#9ca3af;text-transform:uppercase;user-select:none" class="collapsed-hide group-label">${group.label}</p>
    ${group.items.map(item => buildNavItem(item)).join('')}
  </div>`;
}


// ─── Workspace UI ────────────────────────────────────────────────────────────
function updateWorkspaceUI() {
  const avatar = document.getElementById('wsAvatar');
  const name = document.getElementById('wsName');
  if (avatar) { avatar.style.background = activeWorkspace.color; avatar.textContent = activeWorkspace.initial; }
  if (name) name.textContent = activeWorkspace.name;
}

window.switchWorkspace = function(id) {
  activeWorkspace = workspaces.find(w => w.id === id) || workspaces[0];
  updateWorkspaceUI();
  document.getElementById('wsMenu').innerHTML = buildWsMenu();
  document.getElementById('wsMenu').classList.remove('open');
};

window.toggleWsMenu = function() {
  const menu = document.getElementById('wsMenu');
  menu.classList.toggle('open');
  // Close when clicking outside
  const close = (e) => { if (!document.getElementById('wsDropdown').contains(e.target)) { menu.classList.remove('open'); document.removeEventListener('click', close); } };
  setTimeout(() => document.addEventListener('click', close), 10);
};

// ─── Nav Filter ──────────────────────────────────────────────────────────────
window.filterNav = function(query) {
  const q = query.trim().toLowerCase();
  const allLinks = document.querySelectorAll('#navGroups .nav-link, #navGroups .nav-sub-link, #navGroups .nav-flat-link');
  const allGroups = document.querySelectorAll('#navGroups .nav-group-rendered');
  let anyMatch = false;

  if (!q) {
    allLinks.forEach(el => el.classList.remove('nav-hidden'));
    document.querySelectorAll('#navGroups .nav-item-group').forEach(g => g.classList.remove('nav-hidden'));
    allGroups.forEach(g => g.classList.remove('nav-hidden'));
    document.getElementById('noNavResults').style.display = 'none';
    return;
  }

  allGroups.forEach(group => {
    let groupMatch = false;
    group.querySelectorAll('.nav-item-group').forEach(itemGroup => {
      const parentBtn = itemGroup.querySelector(':scope > .nav-link');
      const subLinks = itemGroup.querySelectorAll('.nav-sub-link');
      let subMatch = false;
      subLinks.forEach(sub => {
        const label = sub.dataset.label || sub.textContent.trim().toLowerCase();
        if (label.includes(q)) { sub.classList.remove('nav-hidden'); subMatch = true; anyMatch = true; groupMatch = true; }
        else sub.classList.add('nav-hidden');
      });
      if (subMatch) {
        itemGroup.classList.remove('nav-hidden');
        if (parentBtn) parentBtn.classList.remove('nav-hidden');
        // Open submenu
        const sub = itemGroup.querySelector('.nav-sub');
        if (sub) { sub.classList.add('open'); const chevron = parentBtn?.querySelector('.nav-chevron'); if (chevron) chevron.classList.add('open'); }
      } else {
        const parentLabel = (parentBtn?.dataset.label || '');
        if (parentLabel.includes(q)) { itemGroup.classList.remove('nav-hidden'); anyMatch = true; groupMatch = true; subLinks.forEach(s => s.classList.remove('nav-hidden')); }
        else itemGroup.classList.add('nav-hidden');
      }
    });
    // Flat links
    group.querySelectorAll('.nav-flat-link').forEach(link => {
      const label = link.dataset.label || '';
      if (label.includes(q)) { link.classList.remove('nav-hidden'); anyMatch = true; groupMatch = true; }
      else link.classList.add('nav-hidden');
    });
    const labelEl = group.querySelector('.group-label');
    if (labelEl) labelEl.style.display = groupMatch ? '' : 'none';
  });

  document.getElementById('noNavResults').style.display = anyMatch ? 'none' : 'block';
};

// ─── Submenu Toggle ──────────────────────────────────────────────────────────
window.toggleSubmenu = function(btn) {
  const group = btn.closest('.nav-item-group');
  const sub = group.querySelector('.nav-sub');
  const chevron = btn.querySelector('.nav-chevron');
  const isOpen = sub.classList.contains('open');
  // Close all others
  document.querySelectorAll('.nav-sub.open').forEach(s => {
    if (s !== sub) { s.classList.remove('open'); const c = s.previousElementSibling?.querySelector('.nav-chevron'); if (c) c.classList.remove('open'); }
  });
  sub.classList.toggle('open', !isOpen);
  chevron?.classList.toggle('open', !isOpen);
};

// ─── Sidebar Collapse ────────────────────────────────────────────────────────
window.toggleSidebar = function() {
  const aside = document.getElementById('main-sidebar');
  if (!aside) return;
  const collapsed = aside.classList.toggle('collapsed');
  localStorage.setItem('sidebarCollapsed', collapsed);
  // Show/hide user avatar collapsed version
  const coll = document.getElementById('userAvatarCollapsed');
  const full = document.querySelector('#main-sidebar .collapsed-hide:last-of-type');
  if (coll) coll.style.display = collapsed ? 'block' : 'none';
};

window.handleSidebarToggle = function() {
  const aside = document.getElementById('main-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!aside) return;
  if (window.innerWidth < 1024) {
    const isOpen = aside.style.transform === 'translateX(0px)' || !aside.style.transform;
    if (!aside.dataset.mobileShown) {
      aside.style.position = 'fixed';
      aside.style.top = '0'; aside.style.left = '0'; aside.style.height = '100vh'; aside.style.zIndex = '40';
      aside.style.transform = 'translateX(-100%)';
      aside.style.transition = 'transform 0.25s cubic-bezier(.4,0,.2,1)';
      aside.dataset.mobileShown = '1';
      setTimeout(() => { aside.style.transform = 'translateX(0px)'; overlay.style.display = 'block'; }, 10);
    } else if (aside.style.transform === 'translateX(0px)') {
      aside.style.transform = 'translateX(-100%)';
      overlay.style.display = 'none';
      setTimeout(() => { aside.dataset.mobileShown = ''; }, 260);
    } else {
      aside.style.transform = 'translateX(0px)';
      overlay.style.display = 'block';
    }
  } else {
    window.toggleSidebar();
  }
};


// ─── Active Page Highlighting ────────────────────────────────────────────────
function highlightActivePage() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navGroups a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || href === './' + current) {
      link.classList.add('active');
    }
  });
}

function autoOpenActiveSubmenu() {
  const active = document.querySelector('#navGroups .nav-sub-link.active');
  if (active) {
    const sub = active.closest('.nav-sub');
    if (sub) {
      sub.classList.add('open');
      const btn = sub.previousElementSibling;
      const chevron = btn?.querySelector('.nav-chevron');
      if (chevron) chevron.classList.add('open');
    }
  }
}

// ─── Keyboard Navigation ─────────────────────────────────────────────────────
function setupKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    const links = Array.from(document.querySelectorAll('#navGroups .nav-link:not(.nav-hidden), #navGroups .nav-sub-link.nav-sub.open .nav-sub-link:not(.nav-hidden)'));
    const focused = document.activeElement;
    const idx = links.indexOf(focused);
    if (e.key === 'ArrowDown' && idx >= 0) { e.preventDefault(); links[Math.min(idx + 1, links.length - 1)]?.focus(); }
    if (e.key === 'ArrowUp' && idx >= 0) { e.preventDefault(); links[Math.max(idx - 1, 0)]?.focus(); }
  });
}

// ─── Dark mode style helper ──────────────────────────────────────────────────
function applyDarkStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .dark #main-sidebar { background: #111827 !important; border-color: #1f2937 !important; }
    .dark #main-sidebar [style*="border-top"] { border-color: #1f2937 !important; }
    .dark #navSearchInput { background: #1f2937 !important; border-color: #374151 !important; color: #f9fafb !important; }
    .dark #navSearchInput::placeholder { color: #6b7280; }
    .dark .nav-link { color: #9ca3af; }
    .dark .nav-link:hover { background: #1f2937; color: #f9fafb; }
    .dark .nav-link.active { background: #1e3a5f; color: #60a5fa; }
    .dark .nav-sub-link { color: #6b7280; }
    .dark .nav-sub-link:hover { background: #1f2937; color: #f9fafb; }
    .dark .nav-sub-link.active { color: #60a5fa; }
    .dark .group-label { color: #4b5563; }
    .dark #userProfile p { color: #d1d5db; }
  `;
  document.head.appendChild(style);
}

})(); // end IIFE
