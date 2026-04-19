import PerfectScrollbar from 'perfect-scrollbar';

function initScrollbars() {
  document.querySelectorAll('.scrollable').forEach((element) => {
    if (element._perfectScrollbar) {
      element._perfectScrollbar.update();
      return;
    }

    element._perfectScrollbar = new PerfectScrollbar(element);
  });
}

initScrollbars();

export default {
  init: initScrollbars,
};
