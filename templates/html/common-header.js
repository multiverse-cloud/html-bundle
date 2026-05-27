// common-header.js — Advanced Header with command palette, breadcrumbs, notification tabs, dark mode toggle
(function() {
'use strict';

// ─── Notification Data ───────────────────────────────────────────────────────
const notifications = [
  { id: 1, type: 'mention', title: 'Alex mentioned you in a comment', time: '2m ago', read: false, avatar: 'AM' },
  { id: 2, type: 'system', title: 'Your export is ready to download', time: '15m ago', read: false, avatar: '📥' },
  { id: 3, type: 'update', title: 'New template added: Analytics Pro', time: '1h ago', read: true, avatar: '✨' },
  { id: 4, type: 'mention', title: 'Jordan replied to your message', time: '2h ago', read: true, avatar: 'JL' },
  { id: 5, type: 'system', title: 'Security alert: New login from Chrome', time: '1d ago', read: false, avatar: '🔒' },
];

// ─── Command Palette Pages ───────────────────────────────────────────────────
const palettePages = [
  { label: 'Dashboard', href: '01-main-dashboard.html', icon: '⊞', group: 'Pages' },
  { label: 'Analytics Dashboard', href: '02-analytics-dashboard.html', icon: '📊', group: 'Pages' },
  { label: 'AI Text Generator', href: '09-ai-text-generator.html', icon: '🤖', group: 'AI Tools' },
  { label: 'AI Chat Interface', href: '11-ai-chat-interface.html', icon: '💬', group: 'AI Tools' },
  { label: 'File Manager', href: '29-files-manager.html', icon: '📁', group: 'Pages' },
  { label: 'Settings', href: '49-settings-general.html', icon: '⚙️', group: 'Settings' },
  { label: 'Users', href: '101-users.html', icon: '👥', group: 'Pages' },
  { label: 'Billing', href: '51-settings-billing.html', icon: '💳', group: 'Settings' },
  { label: 'Toggle Dark Mode', href: '#', icon: '🌙', group: 'Actions', action: 'darkMode' },
  { label: 'Go to Login', href: '81-auth-login.html', icon: '🔑', group: 'Auth' },
];

// ─── Breadcrumb Map ──────────────────────────────────────────────────────────
const breadcrumbMap = {
  '01-main-dashboard.html': ['Home', 'Dashboard', 'Ecommerce'],
  '02-analytics-dashboard.html': ['Home', 'Dashboard', 'Analytics'],
  '09-ai-text-generator.html': ['Home', 'AI Tools', 'Text Generator'],
  '81-auth-login.html': ['Home', 'Auth', 'Login'],
  '49-settings-general.html': ['Home', 'Settings', 'General'],
  '101-users.html': ['Home', 'Users'],
};

function getBreadcrumb() {
  const page = window.location.pathname.split('/').pop() || '';
  return breadcrumbMap[page] || ['Home'];
}

// ─── Inject Header ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  const hc = document.getElementById('header-container');
  if (!hc) return;

  const unreadCount = notifications.filter(n => !n.read).length;
  const crumbs = getBreadcrumb();
  const crumbHTML = crumbs.map((c, i) =>
    i < crumbs.length - 1
      ? `<span class="text-gray-400 dark:text-gray-500 hover:text-blue-600 cursor-pointer text-sm">${c}</span><svg class="w-3 h-3 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`
      : `<span class="text-sm font-semibold text-gray-700 dark:text-gray-200">${c}</span>`
  ).join('');

  hc.innerHTML = `
    <style>
      /* ── Command Palette ── */
      #cmd-overlay { display:none;position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.55);backdrop-filter:blur(3px); }
      #cmd-overlay.open { display:flex;align-items:flex-start;justify-content:center;padding-top:10vh; }
      #cmd-box { width:100%;max-width:560px;background:#fff;border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.25);overflow:hidden;animation:cmdSlide .2s ease; }
      .dark #cmd-box { background:#1f2937;border:1px solid #374151; }
      @keyframes cmdSlide { from{opacity:0;transform:scale(.97) translateY(-8px)} to{opacity:1;transform:none} }
      #cmd-input { width:100%;padding:16px 18px;font-size:16px;border:none;outline:none;background:transparent;color:#111827;border-bottom:1px solid #e5e7eb; }
      .dark #cmd-input { color:#f9fafb;border-color:#374151; }
      #cmd-input::placeholder { color:#9ca3af; }
      .cmd-group-label { padding:8px 16px 4px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9ca3af; }
      .cmd-item { display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;font-size:14px;color:#374151;transition:background .1s; }
      .dark .cmd-item { color:#d1d5db; }
      .cmd-item:hover,.cmd-item.selected { background:#f3f4f6; }
      .dark .cmd-item:hover,.dark .cmd-item.selected { background:#374151; }
      .cmd-item-icon { font-size:16px;width:24px;text-align:center;flex-shrink:0; }
      /* ── Notification Panel ── */
      #notif-panel { display:none;position:absolute;right:0;top:calc(100% + 8px);width:360px;max-height:480px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.12);z-index:200;animation:slideDown .2s ease;overflow:hidden; }
      .dark #notif-panel { background:#1f2937;border-color:#374151; }
      #notif-panel.open { display:flex;flex-direction:column; }
      @keyframes slideDown { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
      .notif-tab { padding:8px 16px;font-size:13px;font-weight:600;cursor:pointer;color:#6b7280;border-bottom:2px solid transparent;transition:color .15s,border-color .15s; }
      .notif-tab.active { color:#2563eb;border-color:#2563eb; }
      .dark .notif-tab.active { color:#60a5fa;border-color:#60a5fa; }
      .notif-item { display:flex;align-items:flex-start;gap:12px;padding:12px 16px;border-bottom:1px solid #f3f4f6;cursor:pointer;transition:background .1s; }
      .dark .notif-item { border-color:#374151; }
      .notif-item:hover { background:#f9fafb; }
      .dark .notif-item:hover { background:#374151; }
      .notif-avatar { width:36px;height:36px;border-radius:50%;background:#dbeafe;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#2563eb;flex-shrink:0; }
      .notif-unread-dot { width:7px;height:7px;border-radius:50%;background:#3b82f6;flex-shrink:0;margin-top:5px; }
      /* ── Profile dropdown ── */
      #profile-menu { display:none;position:absolute;right:0;top:calc(100% + 8px);width:220px;background:#fff;border:1px solid #e5e7eb;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.1);z-index:200;animation:slideDown .15s ease;overflow:hidden; }
      .dark #profile-menu { background:#1f2937;border-color:#374151; }
      #profile-menu.open { display:block; }
      .profile-menu-item { display:flex;align-items:center;gap:10px;padding:9px 14px;font-size:13px;color:#374151;cursor:pointer;transition:background .1s;text-decoration:none; }
      .dark .profile-menu-item { color:#d1d5db; }
      .profile-menu-item:hover { background:#f3f4f6; }
      .dark .profile-menu-item:hover { background:#374151; }
      /* ── Dark toggle animation ── */
      #dark-toggle-sun, #dark-toggle-moon { transition: opacity .25s, transform .25s; }
      @media (prefers-reduced-motion: reduce) { #cmd-box, #notif-panel, #profile-menu { animation: none !important; } }
    </style>

    <!-- Command Palette Overlay -->
    <div id="cmd-overlay" onclick="if(event.target===this)window.closePalette()">
      <div id="cmd-box" role="dialog" aria-label="Command palette">
        <div style="display:flex;align-items:center;padding-left:18px">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input id="cmd-input" placeholder="Search pages, actions…" autocomplete="off"
            oninput="window.filterPalette(this.value)"
            onkeydown="window.palettKeydown(event)" />
          <kbd style="margin-right:14px;padding:2px 6px;border-radius:4px;background:#f3f4f6;font-size:11px;color:#6b7280;flex-shrink:0">ESC</kbd>
        </div>
        <div id="cmd-results" style="max-height:340px;overflow-y:auto;padding-bottom:8px"></div>
      </div>
    </div>
  `;


  // Now inject main header HTML
  hc.insertAdjacentHTML('beforeend', `
    <header class="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between px-4 md:px-6 h-14">
        <!-- Left: sidebar toggle + search -->
        <div class="flex items-center gap-3">
          <button onclick="window.handleSidebarToggle()" title="Toggle sidebar"
            class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
            <svg class="hidden lg:block w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="15" y2="18"/></svg>
            <svg class="lg:hidden w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <!-- Command palette trigger (desktop) -->
          <button onclick="window.openPalette()" title="Search (⌘K)"
            class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-w-[200px]">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>Search…</span>
            <kbd class="ml-auto text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>
          <!-- Mobile search icon -->
          <button id="mobileSearchBtn" onclick="window.toggleMobileSearch()" class="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </div>

        <!-- Right: actions -->
        <div class="flex items-center gap-1.5">
          <!-- Live badge -->
          <span class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>Live
          </span>

          <!-- Dark mode toggle -->
          <button id="headerDarkToggle" onclick="window.toggleDarkMode()" title="Toggle dark mode"
            class="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors overflow-hidden w-9 h-9 flex items-center justify-center">
            <svg id="dark-toggle-sun" class="w-5 h-5 absolute dark:opacity-0 opacity-100" style="transform:scale(1)" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            </svg>
            <svg id="dark-toggle-moon" class="w-5 h-5 absolute dark:opacity-100 opacity-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
            </svg>
          </button>

          <!-- Notifications -->
          <div class="relative" id="notifDropdown">
            <button onclick="window.toggleNotifPanel()" title="Notifications"
              class="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              ${unreadCount > 0 ? `<span class="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">${unreadCount}</span>` : ''}
            </button>
            <div id="notif-panel">
              <!-- tabs -->
              <div class="flex border-b border-gray-100 dark:border-gray-700 px-2 pt-1">
                <button class="notif-tab active" onclick="window.switchNotifTab('all',this)">All</button>
                <button class="notif-tab" onclick="window.switchNotifTab('unread',this)">Unread <span class="ml-1 px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-[10px] font-bold">${unreadCount}</span></button>
                <button class="notif-tab" onclick="window.switchNotifTab('mentions',this)">Mentions</button>
                <button onclick="window.closeNotifPanel()" class="ml-auto p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div id="notif-list" style="overflow-y:auto;max-height:380px"></div>
            </div>
          </div>

          <!-- Profile -->
          <div class="relative" id="profileDropdown">
            <button onclick="window.toggleProfileMenu()" class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">JD</div>
              <svg class="hidden md:block w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div id="profile-menu">
              <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <p class="text-sm font-semibold text-gray-800 dark:text-white">Jane Doe</p>
                <p class="text-xs text-gray-500">jane@mtverse.io</p>
              </div>
              <a href="44-user-profile.html" class="profile-menu-item">👤 Profile</a>
              <a href="49-settings-general.html" class="profile-menu-item">⚙️ Settings</a>
              <a href="51-settings-billing.html" class="profile-menu-item">💳 Billing</a>
              <div class="border-t border-gray-100 dark:border-gray-700 my-1"></div>
              <a href="81-auth-login.html" class="profile-menu-item text-red-500 dark:text-red-400">🚪 Sign out</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Breadcrumb bar -->
      <div class="hidden md:flex items-center gap-1.5 px-6 py-1.5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-gray-500">
        ${crumbHTML}
      </div>

      <!-- Mobile search bar (hidden by default) -->
      <div id="mobile-search-bar" style="display:none" class="px-4 py-2 border-t border-gray-100 dark:border-gray-800">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input id="mobileSearchInput" type="text" placeholder="Search pages and actions…"
            class="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg border-none outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
            oninput="window.filterPalette(this.value)" onfocus="window.openPalette()" />
        </div>
      </div>
    </header>
  `);


  // ── Init notifications ──────────────────────────────────────────────────────
  renderNotifications('all');

  // ── Keyboard shortcut for command palette ──────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); window.openPalette(); }
    if (e.key === 'Escape') { window.closePalette(); window.closeNotifPanel(); closeProfileMenu(); }
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!document.getElementById('notifDropdown')?.contains(e.target)) window.closeNotifPanel();
    if (!document.getElementById('profileDropdown')?.contains(e.target)) closeProfileMenu();
  });

  // Dark mode toggle init
  if (localStorage.getItem('darkMode') === 'true') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
});

// ─── Command Palette ─────────────────────────────────────────────────────────
let paletteSelectedIdx = -1;
let paletteFiltered = [...palettePages];

window.openPalette = function() {
  const overlay = document.getElementById('cmd-overlay');
  overlay.classList.add('open');
  paletteFiltered = [...palettePages];
  renderPaletteItems('');
  setTimeout(() => document.getElementById('cmd-input')?.focus(), 50);
};

window.closePalette = function() {
  document.getElementById('cmd-overlay').classList.remove('open');
  const input = document.getElementById('cmd-input');
  if (input) input.value = '';
  paletteSelectedIdx = -1;
};

window.filterPalette = function(q) {
  const query = (q || '').trim().toLowerCase();
  paletteFiltered = query ? palettePages.filter(p => p.label.toLowerCase().includes(query) || p.group.toLowerCase().includes(query)) : [...palettePages];
  paletteSelectedIdx = paletteFiltered.length > 0 ? 0 : -1;
  renderPaletteItems(query);
};

window.palettKeydown = function(e) {
  if (e.key === 'ArrowDown') { e.preventDefault(); paletteSelectedIdx = Math.min(paletteSelectedIdx + 1, paletteFiltered.length - 1); renderPaletteItems(document.getElementById('cmd-input').value); }
  if (e.key === 'ArrowUp') { e.preventDefault(); paletteSelectedIdx = Math.max(paletteSelectedIdx - 1, 0); renderPaletteItems(document.getElementById('cmd-input').value); }
  if (e.key === 'Enter' && paletteSelectedIdx >= 0) { execPaletteItem(paletteFiltered[paletteSelectedIdx]); }
  if (e.key === 'Escape') window.closePalette();
};

function execPaletteItem(item) {
  if (item.action === 'darkMode') { window.toggleDarkMode(); window.closePalette(); return; }
  if (item.href && item.href !== '#') { window.location.href = item.href; }
  window.closePalette();
}

function renderPaletteItems(query) {
  const container = document.getElementById('cmd-results');
  if (!container) return;
  if (paletteFiltered.length === 0) {
    container.innerHTML = `<p style="padding:24px;text-align:center;color:#9ca3af;font-size:14px">No results for "${query}"</p>`;
    return;
  }
  // Group by group label
  const groups = {};
  paletteFiltered.forEach(item => { if (!groups[item.group]) groups[item.group] = []; groups[item.group].push(item); });
  let html = '';
  let globalIdx = 0;
  Object.entries(groups).forEach(([group, items]) => {
    html += `<div class="cmd-group-label">${group}</div>`;
    items.forEach(item => {
      const selected = globalIdx === paletteSelectedIdx;
      html += `<div class="cmd-item${selected ? ' selected' : ''}" onclick="window._paletteItemClick(${JSON.stringify(item).replace(/"/g, '&quot;')})" data-idx="${globalIdx}">
        <span class="cmd-item-icon">${item.icon}</span>
        <span style="flex:1">${item.label}</span>
        ${item.href && item.href !== '#' ? `<span style="font-size:11px;color:#9ca3af;font-family:monospace">${item.href}</span>` : ''}
      </div>`;
      globalIdx++;
    });
  });
  container.innerHTML = html;
  // Scroll selected into view
  const selectedEl = container.querySelector('.selected');
  if (selectedEl) selectedEl.scrollIntoView({ block: 'nearest' });
}

window._paletteItemClick = function(item) { execPaletteItem(item); };


// ─── Notifications ────────────────────────────────────────────────────────────
let currentNotifTab = 'all';

window.toggleNotifPanel = function() {
  const panel = document.getElementById('notif-panel');
  panel.classList.toggle('open');
  closeProfileMenu();
};
window.closeNotifPanel = function() { document.getElementById('notif-panel')?.classList.remove('open'); };

window.switchNotifTab = function(tab, btn) {
  currentNotifTab = tab;
  document.querySelectorAll('.notif-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderNotifications(tab);
};

function renderNotifications(tab) {
  const list = document.getElementById('notif-list');
  if (!list) return;
  let items = notifications;
  if (tab === 'unread') items = notifications.filter(n => !n.read);
  if (tab === 'mentions') items = notifications.filter(n => n.type === 'mention');

  if (items.length === 0) {
    list.innerHTML = `<div style="padding:32px;text-align:center;color:#9ca3af;font-size:13px">
      <div style="font-size:28px;margin-bottom:8px">🔔</div>
      <p>No ${tab === 'all' ? '' : tab} notifications</p>
    </div>`;
    return;
  }
  list.innerHTML = items.map(n => `
    <div class="notif-item">
      <div class="notif-avatar">${n.avatar}</div>
      <div style="flex:1;min-width:0">
        <p style="font-size:13px;font-weight:${n.read ? '400' : '600'};color:${n.read ? '#6b7280' : '#111827'};margin:0;line-height:1.4">${n.title}</p>
        <p style="font-size:11px;color:#9ca3af;margin:3px 0 0">${n.time}</p>
      </div>
      ${n.read ? '' : '<div class="notif-unread-dot"></div>'}
    </div>
  `).join('') + `<div style="padding:10px 16px;border-top:1px solid #f3f4f6">
    <a href="57-notifications-inbox.html" style="font-size:13px;color:#2563eb;font-weight:500;text-decoration:none">View all notifications →</a>
  </div>`;
}

// ─── Profile Dropdown ────────────────────────────────────────────────────────
window.toggleProfileMenu = function() {
  const menu = document.getElementById('profile-menu');
  menu.classList.toggle('open');
  window.closeNotifPanel();
};
function closeProfileMenu() { document.getElementById('profile-menu')?.classList.remove('open'); }

// ─── Dark Mode ────────────────────────────────────────────────────────────────
window.toggleDarkMode = function() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', isDark);
};

// ─── Mobile Search ───────────────────────────────────────────────────────────
window.toggleMobileSearch = function() {
  const bar = document.getElementById('mobile-search-bar');
  if (bar) {
    const shown = bar.style.display !== 'none';
    bar.style.display = shown ? 'none' : 'block';
    if (!shown) document.getElementById('mobileSearchInput')?.focus();
  }
};

})(); // end IIFE
