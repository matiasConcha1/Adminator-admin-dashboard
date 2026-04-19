const TEXT_REPLACEMENTS = new Map([
  ['Adminator', 'Administrador'],
  ['Dashboard', 'Panel'],
  ['Email', 'Correo'],
  ['Compose', 'Redactar'],
  ['Calendar', 'Calendario'],
  ['Charts', 'Graficos'],
  ['Forms', 'Formularios'],
  ['UI Elements', 'Elementos UI'],
  ['Tables', 'Tablas'],
  ['Maps', 'Mapas'],
  ['Pages', 'Paginas'],
  ['Basic Table', 'Tabla basica'],
  ['Basic Tables', 'Tablas basicas'],
  ['Data Table', 'Tabla de datos'],
  ['Data Tables', 'Tablas de datos'],
  ['Google Maps', 'Mapas de Google'],
  ['Google Map', 'Mapa de Google'],
  ['Vector Maps', 'Mapas vectoriales'],
  ['Vector Map', 'Mapa vectorial'],
  ['Blank', 'En blanco'],
  ['Sign In', 'Iniciar sesion'],
  ['Sign Up', 'Registrarse'],
  ['Signin', 'Iniciar sesion'],
  ['Signup', 'Registrarse'],
  ['Multiple Levels', 'Multiples niveles'],
  ['Menu Item', 'Elemento del menu'],
  ['Search...', 'Buscar...'],
  ['Search contacts...', 'Buscar contactos...'],
  ['View All Notifications', 'Ver todas las notificaciones'],
  ['View All Email', 'Ver todos los correos'],
  ['Notifications', 'Notificaciones'],
  ['Messages', 'Mensajes'],
  ['Setting', 'Configuracion'],
  ['Profile', 'Perfil'],
  ['Logout', 'Cerrar sesion'],
  ['New Message', 'Nuevo mensaje'],
  ['Inbox', 'Bandeja de entrada'],
  ['Drafts', 'Borradores'],
  ['Trash', 'Papelera'],
  ['Spam', 'Correo no deseado'],
  ['Delete', 'Eliminar'],
  ['Mark as Spam', 'Marcar como no deseado'],
  ['Star', 'Destacar'],
  ['To:', 'Para:'],
  ['Title of this email goes here', 'Resumen mensual de operaciones'],
  ['title goes here', 'resumen mensual'],
  ['Username', 'Usuario'],
  ['Password', 'Contrasena'],
  ['Confirm Password', 'Confirmar contrasena'],
  ['Remember Me', 'Recordarme'],
  ['Login', 'Iniciar sesion'],
  ['Register', 'Registrarse'],
  ['Email address', 'Correo electronico'],
  ['Email Subject', 'Asunto del correo'],
  ['Enter email', 'Ingresa tu correo'],
  ["We'll never share your email with anyone else.", 'Tu correo se mantendra privado.'],
  ['Birthdate', 'Fecha de nacimiento'],
  ['Select Date', 'Selecciona una fecha'],
  ['Basic Form', 'Formulario basico'],
  ['Complex Form Layout', 'Formulario avanzado'],
  ['Horizontal Form', 'Formulario horizontal'],
  ['Validation', 'Validacion'],
  ['Disabled Forms', 'Formularios deshabilitados'],
  ['Disabled input', 'Campo deshabilitado'],
  ['Disabled select menu', 'Menu deshabilitado'],
  ['Disabled select', 'Seleccion deshabilitada'],
  ['Address', 'Direccion'],
  ['Address 2', 'Direccion complementaria'],
  ['Apartment, studio, or floor', 'Departamento, oficina o piso'],
  ['City', 'Ciudad'],
  ['State', 'Estado'],
  ['Choose...', 'Selecciona...'],
  ['Zip', 'Codigo postal'],
  ['Submit', 'Enviar'],
  ['Submit form', 'Enviar formulario'],
  ['Call John for Dinner', 'Llamar a Juan para coordinar una reunion'],
  ['Radios', 'Opciones'],
  ["Option one is this and that—be sure to include why it's great", 'La opcion uno destaca por su facilidad de uso y consistencia.'],
  ['Option two can be something else and selecting it will deselect option one', 'La opcion dos ofrece una alternativa y desactiva la anterior.'],
  ['Option three is disabled', 'La opcion tres esta deshabilitada'],
  ['Checkbox', 'Casilla'],
  ['Check me out', 'Revisar opcion'],
  ["Can't check this", 'No disponible'],
  ['First name', 'Nombre'],
  ['Last name', 'Apellido'],
  ['Please provide a valid city.', 'Ingresa una ciudad valida.'],
  ['Please provide a valid state.', 'Ingresa un estado valido.'],
  ['Please provide a valid zip.', 'Ingresa un codigo postal valido.'],
  ['Total Visits', 'Visitas totales'],
  ['Total Page Views', 'Vistas de pagina'],
  ['Unique Visitor', 'Visitantes unicos'],
  ['Bounce Rate', 'Tasa de rebote'],
  ['Site Visits', 'Origen de visitas'],
  ['Visitors From USA', 'Visitantes de Estados Unidos'],
  ['Visitors From Europe', 'Visitantes de Europa'],
  ['Visitors From Australia', 'Visitantes de Australia'],
  ['Visitors From India', 'Visitantes de India'],
  ['Monthly Stats', 'Resumen mensual'],
  ['Sales Growth', 'Crecimiento de ventas'],
  ['Dec Sales', 'Ventas de dic.'],
  ['Profit Growth', 'Crecimiento de ganancias'],
  ['Dec Profit', 'Ganancias de dic.'],
  ['Quick Chat', 'Chat rapido'],
  ['Sales Report', 'Reporte de ventas'],
  ['Check all the sales', 'Ver todas las ventas'],
  ['Weather', 'Clima'],
  ['Wind', 'Viento'],
  ['Sunrise', 'Amanecer'],
  ['Pressure', 'Presion'],
  ['Partly Clouds', 'Parcialmente nublado'],
  ['New Users', 'Usuarios nuevos'],
  ['New Purchases', 'Compras nuevas'],
  ['New Customers', 'Clientes nuevos'],
  ['Book Boss Flight', 'Reservar vuelo del director'],
  ['Hit the Gym', 'Ir al gimnasio'],
  ['Give Purchase Report', 'Entregar reporte de compras'],
  ['Give Purchase report', 'Entregar reporte de compras'],
  ['Watch Game of Thrones Episode', 'Ver episodio de Game of Thrones'],
  ['Tomorrow', 'Manana'],
  ['Done', 'Listo'],
  ['Simple Table', 'Tabla simple'],
  ['Basic Tablas', 'Tablas basicas'],
  ['Table head options', 'Opciones de encabezado'],
  ['Bootstrap Data Table', 'Tabla de datos Bootstrap'],
  ['Interactive Vector Maps', 'Mapas vectoriales interactivos'],
  ['Easy Pie Charts', 'Graficos circulares'],
  ['All Day Event', 'Evento de todo el dia'],
  ['Long Event', 'Evento prolongado'],
  ['Repeating Event', 'Evento recurrente'],
  ['Conference', 'Conferencia'],
  ['Meeting', 'Reunion'],
  ['Lunch', 'Almuerzo'],
  ['Happy Hour', 'After office'],
  ['Dinner', 'Cena'],
  ['Birthday Party', 'Cumpleanos'],
  ['Click for Google', 'Abrir Google'],
  ['Launch demo modal', 'Abrir ventana modal'],
  ['Modal title', 'Detalle'],
  ['Popover title', 'Ayuda contextual'],
  ['Close', 'Cerrar'],
  ["And here's some amazing content. It's very engaging. Right?", 'Contenido de ejemplo para la ayuda contextual.'],
  ['Click to toggle popover', 'Abrir ayuda contextual'],
  ['Tooltip on top', 'Ayuda superior'],
  ['Tooltip on right', 'Ayuda a la derecha'],
  ['Tooltip on bottom', 'Ayuda inferior'],
  ['Tooltip on left', 'Ayuda a la izquierda'],
  ['Accordion', 'Acordeon'],
  ['Accordion Item #1', 'Acordeon elemento #1'],
  ['Accordion Item #2', 'Acordeon elemento #2'],
  ['Example heading', 'Ejemplo de encabezado'],
  ['Primary', 'Primario'],
  ['Secondary', 'Secundario'],
  ['Success', 'Exito'],
  ['Danger', 'Peligro'],
  ['Warning', 'Advertencia'],
  ['Info', 'Informacion'],
  ['Light', 'Claro'],
  ['Dark', 'Oscuro'],
  ['Start date', 'Fecha de inicio'],
  ['Start', 'Inicio'],
  ['Previous', 'Anterior'],
  ['Next', 'Siguiente'],
  ['Showing', 'Mostrando'],
  ['entries', 'registros'],
  ['This is the first item\'s accordion body. It is shown by default, until the collapse plugin adds the appropriate classes.', 'Este es el contenido del primer panel. Se muestra por defecto dentro del componente de acordeon.'],
  ['This is the second item\'s accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes.', 'Este es el contenido del segundo panel. Permanece oculto hasta que el usuario lo expande.'],
  ['Send Message', 'Enviar mensaje'],
  ['Send', 'Enviar'],
  ['Say something...', 'Escribe un mensaje...'],
  ['Online', 'En linea'],
  ['Away', 'Ausente'],
  ['Offline', 'Desconectado'],
  ['Busy', 'Ocupado'],
  ['Go to Home', 'Ir al inicio'],
  ['All rights reserved.', 'Todos los derechos reservados.'],
  ['Designed by', 'Disenado por'],
  ['HOT', 'Agenda'],
  ['NEW', 'Nuevo'],
  ['PRO', 'PRO'],
]);

const ATTRIBUTE_NAMES = ['placeholder', 'title', 'aria-label', 'data-bs-title', 'data-bs-content'];

function translateTextValue(value) {
  if (!value) return value;

  let translated = value;
  TEXT_REPLACEMENTS.forEach((replacement, original) => {
    translated = translated.replaceAll(original, replacement);
  });

  return translated;
}

export function translatePage(root = document) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    const parentTag = walker.currentNode.parentElement?.tagName;
    if (parentTag === 'SCRIPT' || parentTag === 'STYLE') continue;
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach((node) => {
    const original = node.nodeValue;
    const translated = translateTextValue(original);
    if (translated !== original) {
      node.nodeValue = translated;
    }
  });

  const elements = root.querySelectorAll('*');
  elements.forEach((element) => {
    ATTRIBUTE_NAMES.forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (!value) return;

      const translated = translateTextValue(value);
      if (translated !== value) {
        element.setAttribute(attribute, translated);
      }
    });
  });

  document.documentElement.lang = 'es';
}

export default {
  translatePage,
  translateTextValue,
};
