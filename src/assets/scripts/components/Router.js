import Shell from './Shell';
import Auth from '../utils/auth';

class Router {
  constructor(app) {
    this.app = app;
    this.isNavigating = false;
  }

  init() {
    document.addEventListener('click', (event) => this.handleLinkClick(event));
    window.addEventListener('popstate', () => {
      this.navigate(window.location.pathname.split('/').pop() || 'index.html', { pushState: false });
    });
  }

  isInternalPageLink(link) {
    if (!link) return false;
    if (link.target === '_blank' || link.hasAttribute('download')) return false;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (href.startsWith('javascript:void(0)')) return false;

    const url = new URL(link.href, window.location.origin);
    if (url.origin !== window.location.origin) return false;

    return url.pathname.endsWith('.html');
  }

  handleLinkClick(event) {
    const link = event.target.closest('a[href]');
    if (!this.isInternalPageLink(link)) return;

    const url = new URL(link.href, window.location.origin);
    const route = url.pathname.split('/').pop();
    if (!route || route === (window.location.pathname.split('/').pop() || 'index.html')) return;

    event.preventDefault();
    this.navigate(route);
  }

  async navigate(route, { pushState = true, replaceState = false } = {}) {
    if (this.isNavigating) return;

    this.isNavigating = true;
    const resolvedRoute = Auth.resolveRoute(route);

    try {
      const response = await fetch(resolvedRoute, { headers: { 'X-Requested-With': 'spa-router' } });
      if (!response.ok) throw new Error(`No se pudo cargar la ruta ${resolvedRoute}`);

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const incomingMain = doc.querySelector('.main-content');
      const currentMain = document.querySelector('.main-content');

      if (!incomingMain || !currentMain) {
        window.location.href = resolvedRoute;
        return;
      }

      currentMain.replaceWith(incomingMain);

      if (replaceState) {
        window.history.replaceState({ route: resolvedRoute }, '', resolvedRoute);
      } else if (pushState) {
        window.history.pushState({ route: resolvedRoute }, '', resolvedRoute);
      }

      Shell.updateTitle(resolvedRoute);
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      this.app.onRouteChange(resolvedRoute);
    } catch {
      window.location.href = resolvedRoute;
    } finally {
      this.isNavigating = false;
    }
  }
}

export default Router;
