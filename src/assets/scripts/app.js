/**
 * Modern Adminator Application
 * Shell, SPA routing and page feature bootstrap.
 */

import { DOM } from './utils/dom';
import DateUtils from './utils/date';
import ThemeManager from './utils/theme';
import Events from './utils/events';
import Performance from './utils/performance';
import Logger from './utils/logger';
import Sidebar from './components/Sidebar';
import ChartComponent from './components/Chart';
import Shell from './components/Shell';
import Router from './components/Router';
import { translatePage } from './utils/i18n';
import Auth from './utils/auth';
import DataTableModule from './datatable';
import FullCalendarModule from './fullcalendar';
import MasonryModule from './masonry';
import ScrollbarModule from './scrollbar';
import SearchModule from './search';
import SkyconsModule from './skycons';
import VectorMapsModule from './vectorMaps';
import ChatModule from './chat';
import EmailModule from './email';
import GoogleMapsModule from './googleMaps';
import UIModule from './ui';
import PasswordToggle from './auth/passwordToggle';

import '../styles/index.scss';

class AdminatorApp {
  constructor() {
    this.components = new Map();
    this.isInitialized = false;
    this.themeManager = ThemeManager;
    this.cleanupFunctions = [];
    this.router = null;

    DOM.ready(() => {
      this.init();
    });
  }

  init() {
    if (this.isInitialized) return;

    Logger.time('Adminator Init');

    try {
      Auth.init();
      Shell.init();
      this.initSidebar();
      this.initTheme();
      this.initMobileEnhancements();
      this.setupGlobalEvents();

      this.router = new Router(this);
      this.router.init();
      UIModule.init?.(document.querySelector('.header') || document);

      const resolvedRoute = Auth.resolveRoute(this.currentRoute());
      if (resolvedRoute !== this.currentRoute()) {
        this.router.navigate(resolvedRoute, { pushState: false, replaceState: true });
      } else {
        this.onRouteChange(resolvedRoute);
      }

      this.isInitialized = true;
      Logger.timeEnd('Adminator Init');
      Events.emit(window, 'adminator:ready', { app: this });
    } catch (error) {
      Logger.error('Error initializing Adminator App', error);
    }
  }

  currentRoute() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  initSidebar() {
    const existing = this.components.get('sidebar');
    if (existing && typeof existing.destroy === 'function') {
      existing.destroy();
    }

    if (DOM.exists('.sidebar')) {
      this.components.set('sidebar', new Sidebar());
    }
  }

  initTheme() {
    this.themeManager.init();

    setTimeout(() => {
      const navRight = DOM.select('.nav-right');
      if (!navRight || DOM.exists('#theme-toggle')) return;

      const item = document.createElement('li');
      item.className = 'theme-toggle-item';
      const isDark = this.themeManager.current() === 'dark';

      item.innerHTML = `
        <button id="theme-toggle" class="theme-toggle-control${isDark ? ' is-dark' : ''}" type="button" aria-pressed="${isDark}" aria-label="Cambiar entre modo claro y oscuro">
          <span class="theme-toggle-track">
            <span class="theme-icon theme-icon-sun"><i class="ti-sun"></i></span>
            <span class="theme-toggle-thumb"></span>
            <span class="theme-icon theme-icon-moon"><i class="ti-moon"></i></span>
          </span>
          <span class="theme-toggle-copy">
            <strong>Tema</strong>
            <small class="theme-toggle-status">${isDark ? 'Oscuro' : 'Claro'}</small>
          </span>
        </button>
      `;

      const lastItem = navRight.querySelector('li:last-child');
      if (lastItem && lastItem.parentNode === navRight) {
        navRight.insertBefore(item, lastItem);
      } else {
        navRight.appendChild(item);
      }

      const toggle = DOM.select('#theme-toggle');
      if (!toggle) return;

      DOM.on(toggle, 'click', () => {
        const newTheme = this.themeManager.current() === 'dark' ? 'light' : 'dark';
        this.themeManager.apply(newTheme);
      });

      window.addEventListener('adminator:themeChanged', (event) => {
        const enabled = event.detail.theme === 'dark';
        toggle.classList.toggle('is-dark', enabled);
        toggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
        const status = toggle.querySelector('.theme-toggle-status');
        if (status) status.textContent = enabled ? 'Oscuro' : 'Claro';

        const charts = this.components.get('charts');
        if (charts) {
          charts.redrawCharts();
        }
      });
    }, 100);
  }

  onRouteChange(route) {
    const resolvedRoute = Auth.resolveRoute(route);
    if (resolvedRoute !== route && this.router) {
      this.router.navigate(resolvedRoute, { pushState: false, replaceState: true });
      return;
    }

    this.closeAllOverlays();
    this.destroyViewComponents();
    translatePage(document.body);
    Shell.renderUserMenu();
    Shell.syncUserMenu();
    Shell.applyRouteState(resolvedRoute);
    Shell.updateBrand();
    Shell.updateTitle(resolvedRoute);
    this.refreshSidebarState();
    this.initDatePickers();
    this.initCharts();
    this.initDataTables();
    this.initValidationForms();
    this.initPageModules();
    Auth.bindRoute(resolvedRoute, this.router);
  }

  refreshSidebarState() {
    const sidebar = this.components.get('sidebar');
    if (sidebar) {
      sidebar.refreshActiveLink();
    }
  }

  destroyViewComponents() {
    const charts = this.components.get('charts');
    if (charts && typeof charts.destroy === 'function') {
      charts.destroy();
    }
    this.components.delete('charts');
  }

  initCharts() {
    const hasCharts =
      DOM.exists('#sparklinedash') ||
      DOM.exists('.sparkline') ||
      DOM.exists('.sparkbar') ||
      DOM.exists('.sparktri') ||
      DOM.exists('.sparkdisc') ||
      DOM.exists('.sparkbull') ||
      DOM.exists('.sparkbox') ||
      DOM.exists('.easy-pie-chart') ||
      DOM.exists('#line-chart') ||
      DOM.exists('#area-chart') ||
      DOM.exists('#scatter-chart') ||
      DOM.exists('#bar-chart');

    if (!hasCharts) return;

    this.components.set('charts', new ChartComponent());
  }

  initDataTables() {
    DataTableModule.init?.();
  }

  initDatePickers() {
    const pickers = [...DOM.selectAll('.start-date'), ...DOM.selectAll('.end-date')];

    pickers.forEach((picker) => {
      if (picker.type !== 'date') {
        picker.type = 'date';
      }

      picker.classList.add('form-control');

      if (!picker.value) {
        picker.value = DateUtils.form.toInputValue(DateUtils.now());
      }

      picker.style.pointerEvents = 'auto';
      picker.style.cursor = 'pointer';
      picker.style.minHeight = '38px';
      picker.style.lineHeight = '1.5';

      const clonedPicker = picker.cloneNode(true);
      picker.replaceWith(clonedPicker);

      DOM.on(clonedPicker, 'click', (event) => {
        event.target.focus();
        if (event.target.showPicker && typeof event.target.showPicker === 'function') {
          try {
            event.target.showPicker();
          } catch {
            // Native picker not available.
          }
        }
      });

      const inputGroup = clonedPicker.closest('.input-group');
      const calendarIcon = inputGroup?.querySelector('.input-group-text i.ti-calendar');

      if (calendarIcon) {
        const clonedIcon = calendarIcon.cloneNode(true);
        calendarIcon.replaceWith(clonedIcon);
        DOM.on(clonedIcon, 'click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          clonedPicker.focus();
          if (clonedPicker.showPicker && typeof clonedPicker.showPicker === 'function') {
            try {
              clonedPicker.showPicker();
            } catch {
              // Native picker not available.
            }
          }
        });
      }
    });
  }

  initValidationForms() {
    DOM.selectAll('form[novalidate]').forEach((form) => {
      if (form.dataset.validationBound === 'true') return;

      form.dataset.validationBound = 'true';
      DOM.on(form, 'submit', (event) => {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      });
    });
  }

  initPageModules() {
    const contentRoot = document.querySelector('.main-content') || document;

    SearchModule.init?.();
    EmailModule.init?.();
    ChatModule.init?.();
    FullCalendarModule.init?.();
    MasonryModule.init?.();
    ScrollbarModule.init?.();
    SkyconsModule.init?.();
    VectorMapsModule.init?.();
    GoogleMapsModule.init?.();
    UIModule.init?.(contentRoot);
    PasswordToggle.init?.(contentRoot);
  }

  initMobileEnhancements() {
    this.enhanceMobileDropdowns();
    this.enhanceMobileSearch();

    if (this.isMobile()) {
      document.body.style.overflowX = 'hidden';
    }
  }

  setupGlobalEvents() {
    const dropdownCleanup = Events.delegate(
      document,
      'click',
      '.nav-right .dropdown-toggle',
      (event, toggle) => this.handleDropdownClick(event, toggle),
    );
    this.cleanupFunctions.push(dropdownCleanup);

    const globalClickCleanup = Events.on(document, 'click', (event) => {
      this.handleGlobalClick(event);
    });
    this.cleanupFunctions.push(globalClickCleanup);

    const debouncedResize = Events.debounce(() => this.handleResize(), 250);
    const resizeCleanup = Events.on(window, 'resize', debouncedResize);
    this.cleanupFunctions.push(resizeCleanup);

    const escapeCleanup = Events.on(document, 'keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeAllOverlays();
      }
    });
    this.cleanupFunctions.push(escapeCleanup);
  }

  handleDropdownClick(event, toggle) {
    if (!this.isMobile()) return;

    event.preventDefault();
    event.stopPropagation();

    const dropdown = toggle.closest('.dropdown');
    const menu = dropdown?.querySelector('.dropdown-menu');
    if (!dropdown || !menu) return;

    this.closeSearch();

    DOM.selectAll('.nav-right .dropdown').forEach((item) => {
      if (item !== dropdown) {
        item.classList.remove('show');
        item.querySelector('.dropdown-menu')?.classList.remove('show');
      }
    });

    const isOpen = dropdown.classList.contains('show');
    dropdown.classList.toggle('show', !isOpen);
    menu.classList.toggle('show', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
    document.body.classList.toggle('mobile-menu-open', !isOpen);
  }

  closeAllOverlays() {
    DOM.selectAll('.nav-right .dropdown').forEach((dropdown) => {
      dropdown.classList.remove('show');
      dropdown.querySelector('.dropdown-menu')?.classList.remove('show');
    });

    this.closeSearch();
    document.body.style.overflow = '';
    document.body.classList.remove('mobile-menu-open');
  }

  closeSearch() {
    const searchBox = DOM.select('.search-box');
    const searchInput = DOM.select('.search-input');
    if (!searchBox || !searchInput) return;

    searchBox.classList.remove('active');
    searchInput.classList.remove('active');
    document.body.classList.remove('search-open');

    const searchIcon = searchBox.querySelector('i');
    if (searchIcon) {
      searchIcon.className = 'ti-search';
    }

    const field = searchInput.querySelector('input');
    if (field) {
      field.value = '';
      field.blur();
    }
  }

  handleResize() {
    if (!this.isMobile()) {
      document.body.style.overflow = '';
      document.body.style.overflowX = '';

      DOM.selectAll('.nav-right .dropdown').forEach((dropdown) => {
        dropdown.classList.remove('show');
        dropdown.querySelector('.dropdown-menu')?.classList.remove('show');
      });

      const searchBox = DOM.select('.search-box');
      const searchInput = DOM.select('.search-input');
      if (searchBox && searchInput) {
        searchBox.classList.remove('active');
        searchInput.classList.remove('active');
      }
    } else {
      document.body.style.overflowX = 'hidden';
    }

    this.enhanceMobileDropdowns();
    this.enhanceMobileSearch();
  }

  handleGlobalClick(event) {
    if (!event.target.closest('.dropdown')) {
      DOM.selectAll('.nav-right .dropdown').forEach((dropdown) => {
        dropdown.classList.remove('show');
        dropdown.querySelector('.dropdown-menu')?.classList.remove('show');
      });
      document.body.style.overflow = '';
    }

    if (!event.target.closest('.search-box') && !event.target.closest('.search-input')) {
      const searchBox = DOM.select('.search-box');
      const searchInput = DOM.select('.search-input');
      if (searchBox && searchInput) {
        searchBox.classList.remove('active');
        searchInput.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('mobile-menu-open');
      }
    }
  }

  isMobile() {
    return window.innerWidth <= 768;
  }

  enhanceMobileDropdowns() {
    if (!this.isMobile()) return;

    DOM.selectAll('.nav-right .dropdown').forEach((dropdown) => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (!toggle || !menu) return;

      const newToggle = toggle.cloneNode(true);
      toggle.replaceWith(newToggle);

      DOM.on(newToggle, 'click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const searchBox = DOM.select('.search-box');
        const searchInput = DOM.select('.search-input');
        if (searchBox && searchInput) {
          searchBox.classList.remove('active');
          searchInput.classList.remove('active');
        }

        DOM.selectAll('.nav-right .dropdown').forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('show');
            otherDropdown.querySelector('.dropdown-menu')?.classList.remove('show');
          }
        });

        const isOpen = dropdown.classList.contains('show');
        dropdown.classList.toggle('show', !isOpen);
        menu.classList.toggle('show', !isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
        document.body.classList.toggle('mobile-menu-open', !isOpen);
      });
    });
  }

  enhanceMobileSearch() {
    const searchBox = DOM.select('.search-box');
    const searchInput = DOM.select('.search-input');
    if (!searchBox || !searchInput) return;

    const searchToggle = searchBox.querySelector('a');
    const searchField = searchInput.querySelector('input');
    if (!searchToggle || !searchField) return;

    const newSearchToggle = searchToggle.cloneNode(true);
    searchToggle.replaceWith(newSearchToggle);

    DOM.on(newSearchToggle, 'click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      DOM.selectAll('.nav-right .dropdown').forEach((dropdown) => {
        dropdown.classList.remove('show');
        dropdown.querySelector('.dropdown-menu')?.classList.remove('show');
      });

      const isActive = searchInput.classList.contains('active');
      const searchIcon = newSearchToggle.querySelector('i');

      if (isActive) {
        searchInput.classList.remove('active');
        document.body.classList.remove('search-open');
        if (searchIcon) searchIcon.className = 'ti-search';
        searchField.value = '';
        searchField.blur();
      } else {
        searchInput.classList.add('active');
        document.body.classList.add('search-open');
        if (searchIcon) searchIcon.className = 'ti-close';
        setTimeout(() => searchField.focus(), 100);
      }
    });
  }

  getComponent(name) {
    return this.components.get(name);
  }

  destroy() {
    this.cleanupFunctions.forEach((cleanup) => {
      if (typeof cleanup === 'function') cleanup();
    });
    this.cleanupFunctions = [];

    this.components.forEach((component) => {
      if (typeof component.destroy === 'function') {
        component.destroy();
      }
    });
    this.components.clear();

    Performance.cleanup();
    this.isInitialized = false;
  }
}

const app = new AdminatorApp();
window.AdminatorApp = app;

export default app;
