import { APP_BRAND, ROUTES, ROUTE_TITLES } from '../config/navigation';
import { translatePage } from '../utils/i18n';
import Auth from '../utils/auth';

class Shell {
  init() {
    this.updateBrand();
    this.renderSidebar();
    this.renderUserMenu();
    this.translateShell();
  }

  updateBrand() {
    document.querySelectorAll('.logo-text').forEach((element) => {
      element.textContent = APP_BRAND;
    });
  }

  renderSidebar() {
    const menu = document.querySelector('.sidebar-menu');
    if (!menu) return;

    menu.innerHTML = ROUTES.map((item, index) => this.renderItem(item, index === 0)).join('');
  }

  renderItem(item, isFirst = false) {
    const classes = ['nav-item'];
    if (item.children) classes.push('dropdown');
    if (isFirst) classes.push('mT-30');

    if (!item.children) {
      return `
        <li class="${classes.join(' ')}">
          <a class="sidebar-link" href="${item.href}" data-spa-link="true">
            <span class="icon-holder">
              <i class="${item.icon}"></i>
            </span>
            <span class="title">${item.label}${this.renderBadge(item.badge, 'ms-2')}</span>
          </a>
        </li>
      `;
    }

    return `
      <li class="${classes.join(' ')}">
        <a class="dropdown-toggle" href="javascript:void(0);">
          <span class="icon-holder">
            <i class="${item.icon}"></i>
          </span>
          <span class="title">${item.label}</span>
          <span class="arrow">
            <i class="ti-angle-right"></i>
          </span>
        </a>
        <ul class="dropdown-menu">
          ${item.children.map((child) => this.renderChild(child)).join('')}
        </ul>
      </li>
    `;
  }

  renderChild(item) {
    if (!item.children) {
      return `
        <li class="${item.href === 'javascript:void(0);' ? 'nav-item' : ''}">
          <a class="sidebar-link" href="${item.href}" ${item.href.endsWith('.html') ? 'data-spa-link="true"' : ''}>
            ${item.label}${this.renderBadge(item.badge, 'ms-1')}
          </a>
        </li>
      `;
    }

    return `
      <li class="nav-item dropdown">
        <a href="${item.href}">
          <span>${item.label}</span>
          <span class="arrow">
            <i class="ti-angle-right"></i>
          </span>
        </a>
        <ul class="dropdown-menu">
          ${item.children.map((child) => this.renderChild(child)).join('')}
        </ul>
      </li>
    `;
  }

  renderBadge(badge, spacingClass) {
    if (!badge) return '';
    return ` <span class="badge ${badge.className} ${spacingClass}">${badge.text}</span>`;
  }

  translateShell() {
    translatePage(document);
  }

  renderUserMenu() {
    const userDropdown = document.querySelector('.nav-right > li.dropdown:last-child');
    if (!userDropdown) return;

    const user = Auth.getUser();
    userDropdown.classList.add('user-dropdown');
    userDropdown.dataset.userDropdown = 'true';
    userDropdown.innerHTML = `
      <a href="javascript:void(0);" class="dropdown-toggle no-after peers fxw-nw ai-c lh-1" data-user-menu-toggle="true" aria-expanded="false">
        <div class="peer mR-10">
          <img class="w-2r bdrs-50p user-avatar" src="${user.avatar}" alt="Avatar de ${user.name}">
        </div>
        <div class="peer user-meta">
          <span class="fsz-sm c-grey-900 fw-600" data-user-name>${user.name}</span>
          <small class="d-b c-grey-600" data-user-role>${user.role}</small>
        </div>
      </a>
      <ul class="dropdown-menu fsz-sm user-menu-dropdown">
        <li class="user-menu-header">
          <div class="d-flex ai-c p-15">
            <img class="w-3r h-3r bdrs-50p mR-15 user-avatar-lg" src="${user.avatar}" alt="Avatar de ${user.name}">
            <div>
              <div class="fw-600 c-grey-900" data-user-name>${user.name}</div>
              <div class="c-grey-600 fsz-sm" data-user-identity>@${user.username || user.name}</div>
            </div>
          </div>
        </li>
        <li><a href="perfil.html" data-spa-link="true" class="d-b td-n pY-10 pX-15 bgcH-grey-100 c-grey-700"><i class="ti-user mR-10"></i><span>Perfil</span></a></li>
        <li><a href="chat.html" data-spa-link="true" class="d-b td-n pY-10 pX-15 bgcH-grey-100 c-grey-700"><i class="ti-email mR-10"></i><span>Mensajes</span></a></li>
        <li><a href="configuracion.html" data-spa-link="true" class="d-b td-n pY-10 pX-15 bgcH-grey-100 c-grey-700"><i class="ti-settings mR-10"></i><span>Configuracion</span></a></li>
        <li role="separator" class="divider"></li>
        <li><a href="signin.html" data-logout-link="true" class="d-b td-n pY-10 pX-15 bgcH-grey-100 c-grey-700"><i class="ti-power-off mR-10"></i><span>Cerrar sesion</span></a></li>
      </ul>
    `;

    this.bindUserMenu(userDropdown);
  }

  bindUserMenu(userDropdown) {
    const toggle = userDropdown.querySelector('[data-user-menu-toggle]');
    const menu = userDropdown.querySelector('.dropdown-menu');
    if (!toggle || !menu || toggle.dataset.bound === 'true') return;

    toggle.dataset.bound = 'true';
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      document.querySelectorAll('.nav-right .dropdown.show').forEach((dropdown) => {
        if (dropdown !== userDropdown) {
          dropdown.classList.remove('show');
          dropdown.querySelector('.dropdown-menu')?.classList.remove('show');
          dropdown.querySelector('[data-user-menu-toggle], .dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        }
      });

      const isOpen = userDropdown.classList.contains('show');
      userDropdown.classList.toggle('show', !isOpen);
      menu.classList.toggle('show', !isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  }

  syncUserMenu() {
    const user = Auth.getUser();

    document.querySelectorAll('[data-user-name]').forEach((element) => {
      element.textContent = user.name;
    });

    document.querySelectorAll('[data-user-role]').forEach((element) => {
      element.textContent = user.role;
    });

    document.querySelectorAll('[data-user-identity]').forEach((element) => {
      element.textContent = `@${user.username || user.name}`;
    });

    document.querySelectorAll('.user-avatar, .user-avatar-lg').forEach((element) => {
      element.setAttribute('src', user.avatar);
      element.setAttribute('alt', `Avatar de ${user.name}`);
    });
  }

  applyRouteState(route) {
    const isAuthRoute = Auth.isAuthRoute(route);
    const isAuthenticated = Auth.isAuthenticated();

    document.body.classList.toggle('auth-route', isAuthRoute);
    document.body.classList.toggle('logged-out', !isAuthenticated);

    const userDropdown = document.querySelector('[data-user-dropdown]');
    if (userDropdown) {
      userDropdown.classList.toggle('d-n', isAuthRoute || !isAuthenticated);
    }

    document.querySelectorAll('.notifications, .search-box, .search-input').forEach((element) => {
      element.classList.toggle('d-n', isAuthRoute || !isAuthenticated);
    });
  }

  updateTitle(routeKey) {
    const pageTitle = ROUTE_TITLES[routeKey];
    if (pageTitle) {
      document.title = `${pageTitle} | ${APP_BRAND}`;
    }
  }
}

export default new Shell();
