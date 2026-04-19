import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import DateUtils from '../utils/date';

let calendarInstance = null;

function buildEvents() {
  return [
    {
      title: 'Evento de todo el dia',
      start: DateUtils.format(DateUtils.now(), 'YYYY-MM-DD'),
    },
    {
      title: 'Evento prolongado',
      start: DateUtils.format(DateUtils.add(DateUtils.now(), 1, 'day'), 'YYYY-MM-DD'),
      end: DateUtils.format(DateUtils.add(DateUtils.now(), 4, 'day'), 'YYYY-MM-DD'),
    },
    {
      groupId: 999,
      title: 'Evento recurrente',
      start: DateUtils.format(DateUtils.add(DateUtils.now(), 2, 'day'), 'YYYY-MM-DDTHH:mm:ss').replace(/:\d{2}$/, ':00:00').replace(/T\d{2}:\d{2}/, 'T16:00'),
    },
    {
      groupId: 999,
      title: 'Evento recurrente',
      start: DateUtils.format(DateUtils.add(DateUtils.now(), 9, 'day'), 'YYYY-MM-DDTHH:mm:ss').replace(/:\d{2}$/, ':00:00').replace(/T\d{2}:\d{2}/, 'T16:00'),
    },
    {
      title: 'Conferencia',
      start: DateUtils.format(DateUtils.add(DateUtils.now(), 5, 'day'), 'YYYY-MM-DD'),
      end: DateUtils.format(DateUtils.add(DateUtils.now(), 7, 'day'), 'YYYY-MM-DD'),
    },
    {
      title: 'Reunion',
      start: DateUtils.format(DateUtils.add(DateUtils.now(), 3, 'day'), 'YYYY-MM-DDTHH:mm:ss').replace(/:\d{2}$/, ':00:00').replace(/T\d{2}:\d{2}/, 'T10:30'),
      end: DateUtils.format(DateUtils.add(DateUtils.now(), 3, 'day'), 'YYYY-MM-DDTHH:mm:ss').replace(/:\d{2}$/, ':00:00').replace(/T\d{2}:\d{2}/, 'T12:30'),
    },
    {
      title: 'Almuerzo',
      start: DateUtils.format(DateUtils.add(DateUtils.now(), 3, 'day'), 'YYYY-MM-DDTHH:mm:ss').replace(/:\d{2}$/, ':00:00').replace(/T\d{2}:\d{2}/, 'T12:00'),
    },
    {
      title: 'Reunion de seguimiento',
      start: DateUtils.format(DateUtils.add(DateUtils.now(), 3, 'day'), 'YYYY-MM-DDTHH:mm:ss').replace(/:\d{2}$/, ':00:00').replace(/T\d{2}:\d{2}/, 'T14:30'),
    },
    {
      title: 'After office',
      start: DateUtils.format(DateUtils.add(DateUtils.now(), 3, 'day'), 'YYYY-MM-DDTHH:mm:ss').replace(/:\d{2}$/, ':00:00').replace(/T\d{2}:\d{2}/, 'T17:30'),
    },
    {
      title: 'Cena',
      start: DateUtils.format(DateUtils.add(DateUtils.now(), 3, 'day'), 'YYYY-MM-DDTHH:mm:ss').replace(/:\d{2}$/, ':00:00').replace(/T\d{2}:\d{2}/, 'T20:00'),
    },
    {
      title: 'Cumpleanos',
      start: DateUtils.format(DateUtils.add(DateUtils.now(), 4, 'day'), 'YYYY-MM-DDTHH:mm:ss').replace(/:\d{2}$/, ':00:00').replace(/T\d{2}:\d{2}/, 'T07:00'),
    },
  ];
}

function initFullCalendar() {
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl) return;

  if (calendarInstance) {
    calendarInstance.destroy();
    calendarInstance = null;
  }

  calendarInstance = new Calendar(calendarEl, {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Dia',
      list: 'Agenda',
    },
    locale: esLocale,
    initialDate: DateUtils.format(DateUtils.now(), 'YYYY-MM-DD'),
    navLinks: true,
    editable: true,
    dayMaxEvents: true,
    events: buildEvents(),
  });

  calendarInstance.render();
}

initFullCalendar();

export default {
  init: initFullCalendar,
  destroy() {
    if (calendarInstance) {
      calendarInstance.destroy();
      calendarInstance = null;
    }
  },
};
