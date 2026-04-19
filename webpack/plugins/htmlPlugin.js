const
  path              = require('path'),
  manifest          = require('../manifest'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const titles = {
  'index': 'Panel',
  'blank': 'En blanco',
  'buttons': 'Botones',
  'calendar': 'Calendario',
  'charts': 'Graficos',
  'chat': 'Chat',
  'compose': 'Redactar',
  'datatable': 'Tabla de datos',
  'email': 'Correo',
  'forms': 'Formularios',
  'google-maps': 'Mapa de Google',
  'perfil': 'Perfil',
  'mensajes': 'Mensajes',
  'configuracion': 'Configuracion',
  'signin': 'Iniciar sesion',
  'signup': 'Registrarse',
  'ui': 'Elementos UI',
  'vector-maps': 'Mapa vectorial',
  '404': '404',
  '500': '500',
  'basic-table': 'Tabla basica',
};

let minify = {
  collapseWhitespace: false,
  minifyCSS: false,
  minifyJS: false,
  removeComments: true,
  useShortDoctype: false,
};

if (manifest.MINIFY) {
  minify = {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    useShortDoctype: true,
  };
}


module.exports = Object.keys(titles).map(title => {
  return new HtmlWebpackPlugin({
    template: path.join(manifest.paths.src, `${title}.html`),
    path: manifest.paths.build,
    filename: `${title}.html`,
    inject: true,
    minify,
  });
});
