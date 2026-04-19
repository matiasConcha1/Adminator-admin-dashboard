function bindSearch() {
  const searchToggle = document.querySelector('.search-toggle');
  const searchBox = document.querySelector('.search-box');
  const searchInput = document.querySelector('.search-input');
  const searchInputField = document.querySelector('.search-input input');

  if (!searchToggle || !searchBox || !searchInput || !searchInputField) {
    return;
  }

  const clonedToggle = searchToggle.cloneNode(true);
  searchToggle.replaceWith(clonedToggle);

  clonedToggle.addEventListener('click', (event) => {
    searchBox.classList.toggle('active');
    searchInput.classList.toggle('active');
    searchInputField.focus();
    event.preventDefault();
  });
}

bindSearch();

export default {
  init: bindSearch,
};
