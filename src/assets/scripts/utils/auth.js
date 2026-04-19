import { AUTH_ROUTES, APP_BRAND } from '../config/navigation';

const STORAGE_KEY = 'adminator.session';
const PENDING_SIGNUP_KEY = 'adminator.pendingSignup';
const PUBLIC_ROUTES = new Set([...AUTH_ROUTES, '404.html', '500.html']);

const DEFAULT_USER = {
  name: 'Valentina Soto',
  username: 'valentina.soto',
  email: 'valentina.soto@administrador.local',
  role: 'Directora de Operaciones',
  phone: '+56 9 8123 4567',
  location: 'Santiago, Chile',
  department: 'Operaciones y Analitica',
  summary: 'Lidera la operacion diaria, coordina equipos y mantiene visibilidad ejecutiva sobre indicadores clave.',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
};

function normalizeRoute(route) {
  const value = route || 'index.html';
  return value === 'login.html' ? 'signin.html' : value;
}

function readSession() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(payload) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function readPendingSignup() {
  try {
    const raw = window.sessionStorage.getItem(PENDING_SIGNUP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const Auth = {
  init() {
    const current = readSession();
    if (!current) return;

    if (!current.user) {
      writeSession({
        isAuthenticated: true,
        user: DEFAULT_USER,
        loggedAt: new Date().toISOString(),
      });
    }
  },

  isAuthenticated() {
    return Boolean(readSession()?.isAuthenticated);
  },

  isAuthRoute(route) {
    return AUTH_ROUTES.includes(normalizeRoute(route));
  },

  resolveRoute(route) {
    const normalizedRoute = normalizeRoute(route);

    if (!this.isAuthenticated() && !PUBLIC_ROUTES.has(normalizedRoute)) {
      return 'signin.html';
    }

    if (this.isAuthenticated() && normalizedRoute === 'signin.html') {
      return 'index.html';
    }

    return normalizedRoute;
  },

  getUser() {
    return readSession()?.user || DEFAULT_USER;
  },

  updateUser(updates = {}) {
    const currentSession = readSession() || {
      isAuthenticated: true,
      user: DEFAULT_USER,
      loggedAt: new Date().toISOString(),
    };

    const nextUser = {
      ...DEFAULT_USER,
      ...currentSession.user,
      ...updates,
    };

    if (!nextUser.username) {
      nextUser.username = nextUser.name || DEFAULT_USER.username;
    }

    const nextSession = {
      ...currentSession,
      user: nextUser,
      updatedAt: new Date().toISOString(),
    };

    writeSession(nextSession);
    this.hydrateSessionFields(document);
    window.dispatchEvent(new CustomEvent('adminator:userUpdated', { detail: { user: nextUser } }));

    return nextUser;
  },

  login({ username, password }) {
    if (!username || !password) {
      return {
        ok: false,
        message: 'Ingresa tu usuario y tu contrasena para continuar.',
      };
    }

    const trimmedUsername = username.trim();
    const normalizedUsername = trimmedUsername.toLowerCase();
    const pendingSignup = readPendingSignup();

    if (pendingSignup && pendingSignup.name?.toLowerCase() === normalizedUsername && pendingSignup.password !== password) {
      return {
        ok: false,
        message: 'La contrasena no coincide con la cuenta registrada.',
      };
    }

    const user = {
      ...DEFAULT_USER,
      name: pendingSignup?.name?.toLowerCase() === normalizedUsername ? pendingSignup.name : trimmedUsername || DEFAULT_USER.name,
      username: pendingSignup?.name?.toLowerCase() === normalizedUsername ? pendingSignup.name : trimmedUsername || DEFAULT_USER.username,
      email: pendingSignup?.name?.toLowerCase() === normalizedUsername ? pendingSignup.email : DEFAULT_USER.email,
    };

    writeSession({
      isAuthenticated: true,
      user,
      loggedAt: new Date().toISOString(),
    });

    if (pendingSignup && pendingSignup.name?.toLowerCase() === normalizedUsername) {
      window.sessionStorage.removeItem(PENDING_SIGNUP_KEY);
    }

    return { ok: true };
  },

  logout() {
    window.localStorage.removeItem(STORAGE_KEY);
  },

  hydrateSessionFields(root = document) {
    const user = this.getUser();

    root.querySelectorAll('[data-session-field]').forEach((element) => {
      const field = element.dataset.sessionField;
      const value = user[field] || '';

      if (element.matches('input, textarea')) {
        element.value = value;
      } else {
        element.textContent = value;
      }
    });

    root.querySelectorAll('[data-session-avatar]').forEach((element) => {
      element.setAttribute('src', user.avatar);
      element.setAttribute('alt', `Avatar de ${user.name}`);
    });

    root.querySelectorAll('[data-session-brand]').forEach((element) => {
      element.textContent = APP_BRAND;
    });

    root.querySelectorAll('[data-user-name]').forEach((element) => {
      element.textContent = user.name;
    });

    root.querySelectorAll('[data-user-role]').forEach((element) => {
      element.textContent = user.role;
    });

    root.querySelectorAll('[data-user-identity]').forEach((element) => {
      element.textContent = `@${user.username || user.name}`;
    });

    root.querySelectorAll('.user-avatar, .user-avatar-lg').forEach((element) => {
      element.setAttribute('src', user.avatar);
      element.setAttribute('alt', `Avatar de ${user.name}`);
    });
  },

  bindRoute(route, router) {
    const normalizedRoute = normalizeRoute(route);
    this.hydrateSessionFields(document);

    if (normalizedRoute === 'signin.html') {
      this.bindLoginForm(router);
    }

    if (normalizedRoute === 'signup.html') {
      this.bindSignupForm(router);
    }

    if (normalizedRoute === 'perfil.html') {
      this.bindProfileForm();
    }

    this.bindLogoutActions(router);
  },

  bindLoginForm(router) {
    const form = document.querySelector('[data-login-form]');
    if (!form || form.dataset.bound === 'true') return;

    const feedback = form.querySelector('[data-login-feedback]');
    const signupMessage = window.sessionStorage.getItem('adminator.signupMessage');
    const pendingSignup = readPendingSignup();
    if (signupMessage && feedback) {
      feedback.textContent = signupMessage;
      feedback.classList.remove('d-n');
      feedback.classList.remove('alert-primary');
      feedback.classList.add('alert-success');
      window.sessionStorage.removeItem('adminator.signupMessage');
    }

    if (pendingSignup) {
      const usernameField = form.querySelector('[name="username"]');
      if (usernameField && !usernameField.value) {
        usernameField.value = pendingSignup.name;
      }
    }

    form.dataset.bound = 'true';
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const username = form.querySelector('[name="username"]')?.value || '';
      const password = form.querySelector('[name="password"]')?.value || '';

      const result = this.login({ username, password });
      if (!result.ok) {
        if (feedback) {
          feedback.textContent = result.message;
          feedback.classList.remove('d-n');
        }
        return;
      }

      if (feedback) {
        feedback.textContent = 'Acceso correcto. Redirigiendo al panel...';
        feedback.classList.remove('d-n');
        feedback.classList.remove('alert-primary');
        feedback.classList.add('alert-success');
      }

      router.navigate('index.html');
    });
  },

  bindSignupForm(router) {
    const form = document.querySelector('[data-signup-form]');
    if (!form || form.dataset.bound === 'true') return;

    form.dataset.bound = 'true';
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = form.querySelector('[name="name"]')?.value?.trim() || '';
      const email = form.querySelector('[name="email"]')?.value?.trim() || '';
      const password = form.querySelector('[name="password"]')?.value || '';
      const confirmPassword = form.querySelector('[name="confirm_password"]')?.value || '';
      const feedback = form.querySelector('[data-signup-feedback]');

      let message = '';
      if (!name || !email || !password || !confirmPassword) {
        message = 'Completa todos los campos para continuar.';
      } else if (password !== confirmPassword) {
        message = 'Las contrasenas no coinciden.';
      }

      if (message) {
        if (feedback) {
          feedback.textContent = message;
          feedback.classList.remove('d-n');
          feedback.classList.remove('alert-success');
          feedback.classList.add('alert-primary');
        }
        return;
      }

      window.sessionStorage.setItem(PENDING_SIGNUP_KEY, JSON.stringify({
        name,
        email: email.toLowerCase(),
        password,
      }));
      window.sessionStorage.setItem('adminator.signupMessage', 'Cuenta creada. Inicia sesion para continuar.');
      router.navigate('signin.html');
    });
  },

  bindLogoutActions(router) {
    document.querySelectorAll('[data-logout-link]').forEach((link) => {
      if (link.dataset.bound === 'true') return;

      link.dataset.bound = 'true';
      link.addEventListener('click', (event) => {
        event.preventDefault();
        this.logout();
        router.navigate('signin.html');
      });
    });
  },

  bindProfileForm() {
    const form = document.querySelector('[data-profile-form]');
    if (!form || form.dataset.bound === 'true') return;

    const feedback = document.querySelector('[data-profile-feedback]');
    const avatarInput = document.querySelector('[data-avatar-input]');
    const avatarTrigger = document.querySelector('[data-avatar-trigger]');
    const avatarHelper = document.querySelector('[data-avatar-helper]');

    const showFeedback = (message, type = 'success') => {
      if (!feedback) return;

      feedback.textContent = message;
      feedback.classList.remove('d-n', 'alert-success', 'alert-primary');
      feedback.classList.add(type === 'error' ? 'alert-primary' : 'alert-success');
    };

    const syncUserName = () => {
      const nameField = form.querySelector('[data-session-field="name"]');
      const usernameField = form.querySelector('[data-session-field="username"]');
      if (!nameField || !usernameField || usernameField.value.trim()) return;

      usernameField.value = nameField.value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '.')
        .replace(/[^a-z0-9._-]/g, '');
    };

    form.dataset.bound = 'true';
    form.querySelector('[data-session-field="name"]')?.addEventListener('blur', syncUserName);

    if (avatarTrigger && avatarInput) {
      avatarTrigger.addEventListener('click', () => avatarInput.click());
      avatarTrigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          avatarInput.click();
        }
      });
    }

    if (avatarInput) {
      avatarInput.addEventListener('change', () => {
        const [file] = avatarInput.files || [];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
          showFeedback('Selecciona una imagen valida para actualizar el avatar.', 'error');
          avatarInput.value = '';
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          this.updateUser({ avatar: reader.result });
          if (avatarHelper) {
            avatarHelper.textContent = 'Foto actualizada. Puedes guardar otros cambios cuando quieras.';
          }
          showFeedback('Imagen de perfil actualizada correctamente.');
        };
        reader.readAsDataURL(file);
      });
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const payload = {};
      form.querySelectorAll('[data-session-field]').forEach((field) => {
        const key = field.dataset.sessionField;
        payload[key] = field.value.trim();
      });

      if (!payload.name || !payload.email || !payload.role) {
        showFeedback('Completa nombre, correo y cargo antes de guardar.', 'error');
        return;
      }

      payload.email = payload.email.toLowerCase();
      payload.username = payload.username
        ? payload.username.toLowerCase().replace(/\s+/g, '.')
        : payload.name.toLowerCase().replace(/\s+/g, '.');

      this.updateUser(payload);
      showFeedback('Cambios guardados correctamente.');
    });
  },
};

export default Auth;
