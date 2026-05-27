// TailAdmin-style sidebar for the static HTML bundle.
document.addEventListener('DOMContentLoaded', function () {
  const sidebarContainer = document.getElementById('sidebar-container');
  if (!sidebarContainer) return;

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
          ['Logistics', '29-files-manager.html'],
          ['AI', '04-ai-tools-dashboard.html', 'NEW'],
          ['Sales', '03-ecommerce-dashboard.html', 'NEW'],
          ['Finance', '54-billing-invoices.html', 'NEW'],
        ] },
        { label: 'AI Assistant', icon: 'bot', badge: 'NEW', children: [
          ['Text Generator', '09-ai-text-generator.html'],
          ['Image Generator', '08-ai-image-generator.html'],
          ['Code Generator', '10-ai-code-assistant.html'],
          ['Chat Interface', '11-ai-chat-interface.html'],
          ['Workflow Builder', '15-ai-workflow-builder.html'],
          ['AI Settings', '14-ai-model-settings.html'],
        ] },
        { label: 'E-commerce', icon: 'cart', children: [
          ['Products', '112-tables-products.html'],
          ['Add Product', '143-ecommerce-add-product.html'],
          ['Billing', '51-settings-billing.html'],
          ['Invoices', '116-tables-invoices.html'],
          ['Single Invoice', '30-tables-invoices.html'],
          ['Transactions', '144-ecommerce-transactions.html'],
          ['Single Transaction', '145-ecommerce-transaction-detail.html'],
        ] },
        { label: 'Calendar', icon: 'calendar', children: [
          ['Month', '66-calendar-month.html'],
          ['Week', '67-calendar-week.html'],
          ['Event Detail', '68-calendar-event-detail.html'],
        ] },
        { label: 'User Profile', icon: 'user', href: '44-user-profile.html' },
        { label: 'Task', icon: 'task', children: [
          ['List', '70-tasks-list.html', 'PRO'],
          ['Kanban', '69-tasks-board.html', 'PRO'],
          ['Task Detail', '71-tasks-detail.html'],
        ] },
        { label: 'Forms', icon: 'forms', children: [
          ['Basic Form', '31-forms-basic.html'],
          ['Advanced Form', '108-forms-advanced.html'],
          ['Validation', '33-forms-validation.html'],
          ['Wizard', '110-forms-wizard.html'],
          ['Profile Edit', '113-forms-profile-edit.html'],
          ['Settings Form', '111-forms-settings.html'],
        ] },
        { label: 'Tables', icon: 'table', children: [
          ['Basic Table', '104-tables-basic.html'],
          ['Data Table', '103-tables-data.html'],
          ['Advanced Table', '105-tables-advanced.html'],
          ['Orders', '106-tables-orders.html'],
          ['Logs', '109-tables-logs.html'],
          ['Invoices', '116-tables-invoices.html'],
        ] },
        { label: 'Pages', icon: 'pages', children: [
          ['File Manager', '36-file-manager.html'],
          ['Pricing Tables', '27-cards-pricing.html'],
          ['FAQ', '118-faq.html'],
          ['API Keys', '21-api-keys.html', 'NEW'],
          ['Integrations', '52-settings-integrations.html', 'NEW'],
          ['Blank Page', '119-blank-page.html'],
          ['404 Error', '88-error-404.html'],
          ['500 Error', '89-error-500.html'],
          ['503 Error', '90-error-maintenance.html'],
          ['Coming Soon', '91-error-coming-soon.html'],
          ['Maintenance', '90-error-maintenance.html'],
          ['Success', '92-success-page.html'],
        ] },
        { label: 'Layouts', icon: 'layout', badge: 'NEW', children: [
          ['Wide Layout', '93-admin-layout-wide.html'],
          ['Compact Layout', '94-admin-layout-compact.html'],
          ['Top Nav', '95-admin-layout-topnav.html'],
          ['Dark Layout', '96-admin-layout-dark.html'],
          ['Mobile Dashboard', '97-mobile-dashboard.html'],
        ] },
      ],
    },
    {
      label: 'SUPPORT',
      items: [
        { label: 'Chat', icon: 'chat', href: '60-chat-support.html' },
        { label: 'Support Ticket', icon: 'headset', badge: 'NEW', children: [
          ['Ticket List', '41-forms-support-ticket.html'],
          ['Live Support', '61-chat-live.html'],
          ['Chat History', '62-chat-history.html'],
        ] },
        { label: 'Email', icon: 'mail', children: [
          ['Inbox', '63-email-inbox.html'],
          ['Details', '146-email-details.html'],
          ['Templates', '65-email-templates.html'],
        ] },
      ],
    },
    {
      label: 'OTHERS',
      items: [
        { label: 'Charts', icon: 'chart', badge: 'NEW', children: [
          ['Line Chart', '72-charts-line.html'],
          ['Bar Chart', '73-charts-bar.html'],
          ['Pie Chart', '74-charts-pie.html'],
          ['Radar Chart', '120-charts-radar.html'],
          ['Radial Chart', '121-charts-radial.html'],
          ['Mixed Chart', '75-charts-mixed.html'],
          ['Realtime Chart', '76-charts-realtime.html'],
        ] },
        { label: 'Maps', icon: 'map', badge: 'NEW', children: [
          ['Maps', '77-maps-overview.html'],
          ['Vector Map', '80-maps-regions.html'],
          ['Heat Map', '78-maps-heatmap.html'],
          ['Users Geo', '79-maps-users-geo.html'],
        ] },
        { label: 'UI Elements', icon: 'cube', children: [
          ['Alerts', '122-ui-alerts.html'],
          ['Avatar', '123-ui-avatars.html'],
          ['Badge', '124-ui-badge.html'],
          ['Breadcrumb', '125-ui-breadcrumb.html'],
          ['Buttons', '126-ui-buttons.html'],
          ['Buttons Group', '127-ui-button-groups.html'],
          ['Cards', '24-cards-overview.html'],
          ['Carousel', '128-ui-carousel.html'],
          ['Dropdowns', '129-ui-dropdowns.html'],
          ['Images', '130-ui-images.html'],
          ['Links', '131-ui-links.html'],
          ['List', '132-ui-list.html'],
          ['Modals', '133-ui-modals.html'],
          ['Notification', '134-ui-notifications.html'],
          ['Pagination', '135-ui-pagination.html'],
          ['Popovers', '136-ui-popovers.html'],
          ['Progressbar', '137-ui-progressbar.html'],
          ['Ribbons', '138-ui-ribbons.html'],
          ['Spinners', '139-ui-spinners.html'],
          ['Tabs', '140-ui-tabs.html'],
          ['Tooltips', '141-ui-tooltips.html'],
          ['Videos', '142-ui-videos.html'],
          ['Component Gallery', '117-tailadmin-components.html'],
        ] },
        { label: 'Authentication', icon: 'plug', children: [
          ['Sign In', '81-auth-login.html'],
          ['Sign Up', '82-auth-register.html'],
          ['Reset Password', '84-auth-reset-password.html'],
          ['Two Step Verification', '86-auth-2fa.html'],
          ['Forgot Password', '83-auth-forgot-password.html'],
          ['Verify Email', '85-auth-verify-email.html'],
          ['SSO', '87-auth-sso.html'],
        ] },
      ],
    },
  ];

  const iconPaths = {
    grid: '<path d="M4 5a1 1 0 0 1 1-1h4v5H4V5Zm11-1h4a1 1 0 0 1 1 1v4h-5V4ZM4 15h5v5H5a1 1 0 0 1-1-1v-4Zm11 0h5v4a1 1 0 0 1-1 1h-4v-5Z"/>',
    bot: '<path d="M9 3h6m-3 0v3m-5 5a5 5 0 0 1 10 0v4a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4v-4Zm2 1h.01M15 12h.01M9 16h6"/>',
    cart: '<path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h6.8a2 2 0 0 0 1.9-1.4L20 8H6m4 12h.01M17 20h.01"/>',
    calendar: '<path d="M7 3v4m10-4v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z"/>',
    user: '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 1 0-14 0"/>',
    task: '<path d="M8 6h11M8 12h11M8 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
    forms: '<path d="M5 4h14v16H5V4Zm4 4h6M9 12h6M9 16h4"/>',
    table: '<path d="M4 5h16v14H4V5Zm0 5h16M10 5v14"/>',
    pages: '<path d="M7 3h8l4 4v14H7V3Zm8 0v5h5M4 7v14h11"/>',
    layout: '<path d="M4 5h16v14H4V5Zm5 0v14"/>',
    chat: '<path d="M4 12a8 8 0 1 1 4 6.9L4 20l1.1-4A8 8 0 0 1 4 12Zm5-1h.01M12 11h.01M15 11h.01"/>',
    headset: '<path d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-2v-7h4M4 13v4a2 2 0 0 0 2 2h2v-7H4"/>',
    mail: '<path d="M4 6h16v12H4V6Zm0 1 8 6 8-6"/>',
    chart: '<path d="M4 19V5m0 14h16M8 16V9m4 7V6m4 10v-4"/>',
    map: '<path d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2V6Zm5-2v14m6-12v14"/>',
    cube: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12 4 7.5m8 4.5V21"/>',
    plug: '<path d="M9 7V3m6 4V3M7 7h10v4a5 5 0 0 1-10 0V7Zm5 9v5"/>',
  };

  const icon = (name) => `<svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.grid}</svg>`;
  const badge = (label) => label ? `<span class="sidebar-badge sidebar-text">${label}</span>` : '';
  const currentPage = window.location.pathname.split('/').pop() || '01-main-dashboard.html';

  const isActive = (item) => item.href === currentPage || (item.children || []).some((child) => child[1] === currentPage);

  const groupMarkup = navGroups.map((group) => `
    <div class="sidebar-section">
      <h3 class="sidebar-section-title sidebar-text">${group.label}</h3>
      <ul class="sidebar-menu">
        ${group.items.map((item, index) => {
          const submenuId = `sidebar-${group.label.toLowerCase()}-${index}`.replace(/[^a-z0-9-]/g, '-');
          const active = isActive(item);
          if (!item.children) {
            return `<li><a href="${item.href}" class="sidebar-item menu-item ${active ? 'is-active' : ''}">${icon(item.icon)}<span class="sidebar-text">${item.label}</span>${badge(item.badge)}</a></li>`;
          }
          return `
            <li>
              <button type="button" onclick="window.toggleSubmenu('${submenuId}')" class="sidebar-item menu-item sidebar-parent ${active ? 'is-active' : ''}" data-submenu-button="${submenuId}">
                ${icon(item.icon)}
                <span class="sidebar-text">${item.label}</span>
                ${badge(item.badge)}
                <svg class="sidebar-chevron sidebar-text ${active ? 'rotate-180' : ''}" id="${submenuId}-arrow" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>
              </button>
              <ul id="${submenuId}-submenu" class="sidebar-submenu ${active ? 'is-open' : 'hidden'}">
                ${item.children.map((child) => `<li><a href="${child[1]}" class="sidebar-subitem ${child[1] === currentPage ? 'is-active-subitem' : ''}"><span>${child[0]}</span>${badge(child[2])}</a></li>`).join('')}
              </ul>
            </li>`;
        }).join('')}
      </ul>
    </div>
  `).join('');

  sidebarContainer.innerHTML = `
    <aside id="sidebar" data-open="false" class="fixed left-0 top-0 z-50 flex h-screen w-[290px] -translate-x-full flex-col overflow-hidden border-r border-gray-200 bg-white px-5 duration-300 ease-linear dark:border-gray-800 dark:bg-gray-900 lg:static lg:translate-x-0">
      <div class="sidebar-header flex items-center justify-between pb-7 pt-8">
        <a href="01-main-dashboard.html" class="sidebar-brand" data-sidebar-brand="true">
          <span class="sidebar-brand-mark">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 17V9h2.5v8H6Zm4.75 0V5h2.5v12h-2.5ZM15.5 17v-6H18v6h-2.5Z"/></svg>
          </span>
          <span class="sidebar-brand-text sidebar-text">mtverse</span>
        </a>
      </div>

      <nav class="no-scrollbar flex-1 overflow-y-auto overflow-x-hidden pb-5">
        ${groupMarkup}
      </nav>

      <div class="sidebar-account">
        <div class="app-avatar app-avatar-sidebar">
          <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">M</div>
          <span class="app-online-dot" aria-hidden="true"></span>
        </div>
        <div class="min-w-0 sidebar-text">
          <p>Musharof</p>
          <span>Admin</span>
        </div>
      </div>
    </aside>
  `;

  if (localStorage.getItem('sidebarCollapsed') === 'true') {
    window.setTimeout(() => window.setSidebarCollapsed(true), 0);
  }
});

window.toggleSubmenu = function (id) {
  const submenu = document.getElementById(`${id}-submenu`);
  const arrow = document.getElementById(`${id}-arrow`);
  if (!submenu) return;

  const opening = submenu.classList.contains('hidden');
  if (opening) {
    submenu.classList.remove('hidden');
    submenu.classList.add('is-open');
    arrow?.classList.add('rotate-180');
  } else {
    submenu.classList.remove('is-open');
    arrow?.classList.remove('rotate-180');
    window.setTimeout(() => {
      if (!submenu.classList.contains('is-open')) submenu.classList.add('hidden');
    }, 240);
  }
};

window.handleSidebarToggle = function () {
  if (window.innerWidth >= 1024) {
    window.toggleSidebarCollapse();
  } else {
    window.toggleSidebar();
  }
};

window.toggleSidebar = function () {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const openIcon = document.getElementById('mobile-menu-open-icon');
  const closeIcon = document.getElementById('mobile-menu-close-icon');
  if (!sidebar) return;

  const opening = sidebar.dataset.open !== 'true';
  sidebar.dataset.open = opening ? 'true' : 'false';

  if (overlay) {
    if (opening) {
      overlay.classList.remove('hidden');
      requestAnimationFrame(() => overlay.classList.add('sidebar-overlay-open'));
    } else {
      overlay.classList.remove('sidebar-overlay-open');
      window.setTimeout(() => overlay.classList.add('hidden'), 300);
    }
  }

  if (openIcon) openIcon.classList.toggle('hidden', opening);
  if (closeIcon) closeIcon.classList.toggle('hidden', !opening);
};

window.setSidebarCollapsed = function (collapsed) {
  const sidebar = document.getElementById('sidebar');
  const arrow = document.getElementById('collapse-arrow');
  const sidebarTexts = document.querySelectorAll('.sidebar-text');
  if (!sidebar) return;

  sidebar.classList.toggle('w-[290px]', !collapsed);
  sidebar.classList.toggle('w-[80px]', collapsed);
  sidebar.classList.toggle('px-5', !collapsed);
  sidebar.classList.toggle('px-3', collapsed);
  arrow?.classList.toggle('rotate-180', collapsed);

  sidebarTexts.forEach((text) => {
    if (collapsed) {
      text.classList.add('opacity-0');
      window.setTimeout(() => {
        if (sidebar.classList.contains('w-[80px]')) text.classList.add('hidden');
      }, 140);
    } else {
      text.classList.remove('hidden');
      requestAnimationFrame(() => text.classList.remove('opacity-0'));
    }
  });
};

window.toggleSidebarCollapse = function () {
  const sidebar = document.getElementById('sidebar');
  const collapsed = !sidebar.classList.contains('w-[80px]');
  window.setSidebarCollapsed(collapsed);
  localStorage.setItem('sidebarCollapsed', collapsed);
};
