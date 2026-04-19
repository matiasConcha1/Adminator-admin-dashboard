const SELECTOR = '[data-password-toggle]';

function bindToggle(toggle) {
  if (toggle.dataset.bound === 'true') return;

  const wrapper = toggle.closest('.password-field');
  const input = wrapper?.querySelector('input');
  const icon = toggle.querySelector('i');

  if (!input || !icon) return;

  toggle.dataset.bound = 'true';
  toggle.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
    toggle.setAttribute('aria-label', isPassword ? 'Ocultar contrasena' : 'Mostrar contrasena');
    icon.className = isPassword ? 'ti-eye-off' : 'ti-eye';
  });
}

const PasswordToggle = {
  init(root = document) {
    root.querySelectorAll(SELECTOR).forEach(bindToggle);
  },
};

export default PasswordToggle;
