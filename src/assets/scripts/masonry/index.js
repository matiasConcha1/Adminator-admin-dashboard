import Masonry from 'masonry-layout';

let masonryInstance = null;

function initMasonry() {
  const masonryElement = document.querySelector('.masonry');
  if (!masonryElement) return;

  if (masonryInstance) {
    masonryInstance.destroy();
    masonryInstance = null;
  }

  masonryInstance = new Masonry(masonryElement, {
    itemSelector: '.masonry-item',
    columnWidth: '.masonry-sizer',
    percentPosition: true,
  });
}

window.addEventListener('load', initMasonry);

export default {
  init: initMasonry,
  destroy() {
    if (masonryInstance) {
      masonryInstance.destroy();
      masonryInstance = null;
    }
  },
};
