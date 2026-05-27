// Production app shell enhancements for the static mtverse/TailAdmin HTML bundle.
(function () {
  const selectors = {
    modalRoot: 'app-modal-root',
    toastRoot: 'app-toast-root',
    commandPalette: 'app-command-palette',
  };

  const internalPagePattern = /\.html($|[#?])/;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
      return;
    }
    callback();
  }

  function icon(path, className = 'h-5 w-5') {
    return `
      <svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${path}"></path>
      </svg>
    `;
  }

  function getPageTitle() {
    const heading = document.querySelector('main h1');
    if (heading && heading.textContent.trim()) return heading.textContent.trim();
    return document.title.replace(/\s+[-—]\s+mtverse/i, '').trim();
  }

  function ensureRoot(id, className) {
    let root = document.getElementById(id);
    if (!root) {
      root = document.createElement('div');
      root.id = id;
      root.className = className;
      document.body.appendChild(root);
    }
    return root;
  }

  function showToast(message, type = 'success') {
    const root = ensureRoot(selectors.toastRoot, 'app-toast-stack');
    const toast = document.createElement('div');
    toast.className = `app-toast app-toast-${type}`;
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <span class="app-toast-icon">${type === 'error' ? icon('M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z', 'h-4 w-4') : icon('M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', 'h-4 w-4')}</span>
      <span>${message}</span>
      <button type="button" aria-label="Dismiss notification">${icon('M6 18 18 6M6 6l12 12', 'h-4 w-4')}</button>
    `;
    root.appendChild(toast);
    const close = () => {
      toast.classList.add('is-leaving');
      window.setTimeout(() => toast.remove(), 180);
    };
    toast.querySelector('button').addEventListener('click', close);
    window.setTimeout(close, 3600);
  }

  function confirmAction(options) {
    const root = ensureRoot(selectors.modalRoot, 'app-modal-host');
    root.innerHTML = `
      <div class="app-modal-backdrop" data-modal-close></div>
      <section class="app-modal-panel" role="dialog" aria-modal="true" aria-labelledby="app-modal-title">
        <div class="app-modal-icon">${icon('M12 9v3.75m0 3.75h.01M4.93 19.5h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4.5c-.77-1.33-2.69-1.33-3.46 0L3.2 16.5c-.77 1.33.19 3 1.73 3z')}</div>
        <div>
          <h2 id="app-modal-title">${options.title}</h2>
          <p>${options.message}</p>
        </div>
        <div class="app-modal-actions">
          <button type="button" class="app-btn app-btn-secondary" data-modal-close>Cancel</button>
          <button type="button" class="app-btn app-btn-danger" data-modal-confirm>${options.confirmLabel || 'Confirm'}</button>
        </div>
      </section>
    `;
    root.classList.add('is-open');
    root.querySelector('[data-modal-confirm]').focus();

    const close = () => {
      root.classList.remove('is-open');
      root.innerHTML = '';
    };

    root.querySelectorAll('[data-modal-close]').forEach((node) => node.addEventListener('click', close));
    root.querySelector('[data-modal-confirm]').addEventListener('click', () => {
      close();
      if (typeof options.onConfirm === 'function') options.onConfirm();
    });
  }

  function collectPages() {
    const seen = new Set();
    return Array.from(document.querySelectorAll('a[href$=".html"], a[href*=".html#"], a[href*=".html?"]'))
      .map((link) => {
        const href = link.getAttribute('href');
        const label = link.textContent.replace(/\s+/g, ' ').trim();
        return { href, label: label || href };
      })
      .filter((item) => {
        if (!item.href || seen.has(item.href)) return false;
        seen.add(item.href);
        return true;
      })
      .slice(0, 80);
  }

  function renderCommandPalette() {
    if (document.getElementById(selectors.commandPalette)) return;
    const pages = collectPages();
    const root = document.createElement('div');
    root.id = selectors.commandPalette;
    root.className = 'command-palette';
    root.innerHTML = `
      <div class="command-backdrop" data-command-close></div>
      <section class="command-panel" role="dialog" aria-modal="true" aria-label="Command palette">
        <div class="command-search">
          ${icon('M21 21l-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0')}
          <input type="search" placeholder="Search pages, actions, tools..." autocomplete="off" />
          <kbd>Esc</kbd>
        </div>
        <div class="command-section">
          <p>Quick actions</p>
          <button type="button" data-command-action="toggle-density">${icon('M4 6h16M4 12h10M4 18h16', 'h-4 w-4')} Toggle compact layout</button>
          <button type="button" data-command-action="toggle-dark">${icon('M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z', 'h-4 w-4')} Toggle dark mode</button>
          <button type="button" data-command-action="copy-url">${icon('M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71', 'h-4 w-4')} Copy page URL</button>
        </div>
        <div class="command-section">
          <p>Pages</p>
          <div class="command-list"></div>
        </div>
      </section>
    `;
    document.body.appendChild(root);

    const input = root.querySelector('input');
    const list = root.querySelector('.command-list');

    const draw = () => {
      const query = input.value.trim().toLowerCase();
      const results = pages.filter((page) => page.label.toLowerCase().includes(query) || page.href.toLowerCase().includes(query)).slice(0, 14);
      list.innerHTML = results.map((page) => `
        <a href="${page.href}">
          ${icon('M9 5l7 7-7 7', 'h-4 w-4')}
          <span>${page.label}</span>
          <small>${page.href}</small>
        </a>
      `).join('');
    };

    input.addEventListener('input', draw);
    root.querySelectorAll('[data-command-close]').forEach((node) => node.addEventListener('click', closeCommandPalette));
    root.querySelectorAll('[data-command-action]').forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.commandAction;
        if (action === 'toggle-density') toggleDensity();
        if (action === 'toggle-dark' && window.toggleDarkMode) window.toggleDarkMode();
        if (action === 'copy-url') copyCurrentUrl();
        closeCommandPalette();
      });
    });
    draw();
  }

  function openCommandPalette() {
    renderCommandPalette();
    const root = document.getElementById(selectors.commandPalette);
    root.classList.add('is-open');
    const input = root.querySelector('input');
    input.value = '';
    input.dispatchEvent(new Event('input'));
    window.setTimeout(() => input.focus(), 20);
  }

  function closeCommandPalette() {
    const root = document.getElementById(selectors.commandPalette);
    if (root) root.classList.remove('is-open');
  }

  function copyCurrentUrl() {
    const url = window.location.href;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(() => showToast('Page URL copied'));
      return;
    }
    showToast('Page URL ready to copy');
  }

  function toggleDensity() {
    document.body.classList.toggle('density-compact');
    localStorage.setItem('densityCompact', document.body.classList.contains('density-compact'));
    showToast(document.body.classList.contains('density-compact') ? 'Compact layout enabled' : 'Comfortable layout enabled');
  }

  function enhanceSidebar() {
    const current = window.location.pathname.split('/').pop();
    document.querySelectorAll('#sidebar a[href]:not([data-sidebar-brand])').forEach((link) => {
      if (link.getAttribute('href') === current) {
        if (link.classList.contains('sidebar-subitem')) link.classList.add('is-active-subitem');
        if (link.classList.contains('sidebar-item')) link.classList.add('is-active');
        const submenu = link.closest('ul[id$="-submenu"]');
        if (submenu && submenu.classList.contains('hidden')) {
          const id = submenu.id.replace('-submenu', '');
          if (window.toggleSubmenu) window.toggleSubmenu(id);
        }
      }
    });
  }

  function enhanceFormsAndActions() {
    document.querySelectorAll('form').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        showToast('Changes saved successfully');
      });
    });

    document.body.addEventListener('click', (event) => {
      const button = event.target.closest('button, a');
      if (!button) return;

      const text = button.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
      const href = button.getAttribute('href');

      if (href && internalPagePattern.test(href) && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
        event.preventDefault();
        navigateWithTransition(href);
        return;
      }

      if (/(delete|remove|archive|revoke|cancel plan)/i.test(text)) {
        event.preventDefault();
        confirmAction({
          title: 'Confirm this action',
          message: 'This is a demo template action. In production, connect it to your API and permission checks.',
          confirmLabel: 'Continue',
          onConfirm: () => showToast('Action completed'),
        });
        return;
      }

      if (/(save|create|send|upload|invite|update|publish|apply|export|download|share)/i.test(text) && !button.dataset.skipDemoAction) {
        if (button.tagName === 'A' && href && href !== '#') return;
        button.classList.add('is-busy');
        window.setTimeout(() => {
          button.classList.remove('is-busy');
          showToast(`${button.textContent.trim() || 'Action'} completed`);
        }, 520);
      }
    });
  }

  function navigateWithTransition(href) {
    if (prefersReducedMotion) {
      window.location.href = href;
      return;
    }
    const loader = document.getElementById('site-loader');
    if (loader) loader.classList.add('is-active');
    document.body.classList.add('is-navigating');
    window.setTimeout(() => {
      window.location.href = href;
    }, 140);
  }

  function ensureSiteLoader() {
    if (document.getElementById('site-loader')) return;
    const loader = document.createElement('div');
    loader.id = 'site-loader';
    loader.className = 'site-loader is-active';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = `
      <div class="site-loader-card">
        <span class="site-loader-mark" aria-hidden="true"><span></span><span></span><span></span></span>
        <span class="site-loader-copy">mtverse</span>
      </div>
      <span class="site-loader-bar"></span>
    `;
    document.body.appendChild(loader);
    window.setTimeout(() => loader.classList.remove('is-active'), prefersReducedMotion ? 10 : 420);
  }

  function enhanceChartMotion() {
    document.querySelectorAll('main svg').forEach((svg) => {
      const box = svg.getBoundingClientRect();
      if (box.width < 80 || box.height < 50) return;
      svg.classList.add('chart-animate');
      svg.querySelectorAll('path, polyline, polygon, circle, rect').forEach((node, index) => {
        node.style.setProperty('--chart-delay', `${Math.min(index * 35, 420)}ms`);
      });
    });
  }

  function enhanceRevealMotion() {
    const main = document.querySelector('main');
    if (!main) return;
    const targets = main.querySelectorAll(':scope > div, :scope > section, :scope > article');
    targets.forEach((target, index) => {
      target.classList.add('reveal-item');
      target.style.setProperty('--reveal-delay', `${Math.min(index * 45, 240)}ms`);
    });

    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach((target) => observer.observe(target));
  }

  function enhanceCommandSearch() {
    const header = document.getElementById('header-container');
    if (!header) return;
    header.addEventListener('click', (event) => {
      const searchControl = event.target.closest('input[placeholder*="Search"], button');
      if (!searchControl) return;
      if (searchControl.matches('input[placeholder*="Search"]') || searchControl.textContent.includes('K')) {
        event.preventDefault();
        openCommandPalette();
      }
    });
  }

  function enhanceAccessibility() {
    document.querySelectorAll('button:not([type])').forEach((button) => {
      if (!button.closest('form')) button.setAttribute('type', 'button');
    });

    document.querySelectorAll('button').forEach((button) => {
      if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
        button.setAttribute('aria-label', 'Action');
      }
    });
  }

  function enhanceLayoutFit() {
    document.querySelectorAll('main table').forEach((table) => {
      if (table.parentElement && table.parentElement.classList.contains('app-table-scroll')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'app-table-scroll';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    document.querySelectorAll('main img, main svg, main video, main iframe').forEach((media) => {
      media.classList.add('app-fit-media');
    });

    document.querySelectorAll('main select').forEach((select) => {
      select.classList.add('app-modern-select');
    });
  }

  function enhanceKeyboard() {
    document.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openCommandPalette();
      }
      if (event.key === 'Escape') {
        closeCommandPalette();
        const modal = document.getElementById(selectors.modalRoot);
        if (modal) {
          modal.classList.remove('is-open');
          modal.innerHTML = '';
        }
        document.querySelectorAll('[id$="-dropdown"]').forEach((dropdown) => dropdown.classList.add('hidden'));
      }
    });
  }

  ready(() => {
    ensureSiteLoader();
    document.body.classList.add('app-shell-active');
    if (localStorage.getItem('densityCompact') === 'true') document.body.classList.add('density-compact');
    enhanceSidebar();
    enhanceFormsAndActions();
    enhanceRevealMotion();
    enhanceChartMotion();
    enhanceLayoutFit();
    enhanceCommandSearch();
    enhanceAccessibility();
    enhanceKeyboard();
    window.showToast = showToast;
    window.openCommandPalette = openCommandPalette;
    window.confirmAction = confirmAction;
  });
})();
