export const APP_BRAND = 'Administrador';
export const AUTH_ROUTES = ['signin.html', 'signup.html'];

export const ROUTES = [
  {
    key: 'index.html',
    label: 'Panel',
    icon: 'c-blue-500 ti-home',
    href: 'index.html',
  },
  {
    key: 'email.html',
    label: 'Correo',
    icon: 'c-brown-500 ti-email',
    href: 'email.html',
  },
  {
    key: 'compose.html',
    label: 'Redactar',
    icon: 'c-blue-500 ti-share',
    href: 'compose.html',
  },
  {
    key: 'calendar.html',
    label: 'Calendario',
    icon: 'c-deep-orange-500 ti-calendar',
    href: 'calendar.html',
    badge: { className: 'bg-danger', text: 'Agenda' },
  },
  {
    key: 'chat.html',
    label: 'Chat',
    icon: 'c-deep-purple-500 ti-comment-alt',
    href: 'chat.html',
  },
  {
    key: 'charts.html',
    label: 'Graficos',
    icon: 'c-indigo-500 ti-bar-chart',
    href: 'charts.html',
    badge: { className: 'bg-success', text: 'Actualizado' },
  },
  {
    key: 'forms.html',
    label: 'Formularios',
    icon: 'c-light-blue-500 ti-pencil',
    href: 'forms.html',
  },
  {
    key: 'ui.html',
    label: 'Elementos UI',
    icon: 'c-pink-500 ti-palette',
    href: 'ui.html',
  },
  {
    key: 'tables',
    label: 'Tablas',
    icon: 'c-orange-500 ti-layout-list-thumb',
    children: [
      { key: 'basic-table.html', label: 'Tabla basica', href: 'basic-table.html' },
      { key: 'datatable.html', label: 'Tabla de datos', href: 'datatable.html', badge: { className: 'bg-success', text: 'Nuevo' } },
    ],
  },
  {
    key: 'maps',
    label: 'Mapas',
    icon: 'c-purple-500 ti-map',
    children: [
      { key: 'google-maps.html', label: 'Mapa de Google', href: 'google-maps.html' },
      { key: 'vector-maps.html', label: 'Mapa vectorial', href: 'vector-maps.html' },
    ],
  },
  {
    key: 'pages',
    label: 'Paginas',
    icon: 'c-red-500 ti-files',
    children: [
      { key: 'blank.html', label: 'En blanco', href: 'blank.html' },
      { key: '404.html', label: '404', href: '404.html' },
      { key: '500.html', label: '500', href: '500.html' },
      { key: 'signin.html', label: 'Iniciar sesion', href: 'signin.html' },
      { key: 'signup.html', label: 'Registrarse', href: 'signup.html' },
    ],
  },
  {
    key: 'levels',
    label: 'Multiples niveles',
    icon: 'c-teal-500 ti-view-list-alt',
    children: [
      { key: 'levels-item-1', label: 'Elemento del menu', href: 'javascript:void(0);' },
      {
        key: 'levels-item-2',
        label: 'Submenu',
        href: 'javascript:void(0);',
        children: [
          { key: 'levels-child-1', label: 'Opcion A', href: 'javascript:void(0);' },
          { key: 'levels-child-2', label: 'Opcion B', href: 'javascript:void(0);' },
        ],
      },
    ],
  },
];

export const ROUTE_TITLES = {
  'index.html': 'Panel',
  'blank.html': 'Pagina en blanco',
  'buttons.html': 'Botones',
  'calendar.html': 'Calendario',
  'charts.html': 'Graficos',
  'chat.html': 'Chat',
  'compose.html': 'Redactar',
  'datatable.html': 'Tabla de datos',
  'email.html': 'Correo',
  'forms.html': 'Formularios',
  'google-maps.html': 'Mapa de Google',
  'perfil.html': 'Perfil',
  'mensajes.html': 'Mensajes',
  'configuracion.html': 'Configuracion',
  'signin.html': 'Iniciar sesion',
  'signup.html': 'Registrarse',
  'ui.html': 'Elementos UI',
  'vector-maps.html': 'Mapa vectorial',
  '404.html': 'Error 404',
  '500.html': 'Error 500',
  'basic-table.html': 'Tabla basica',
};
