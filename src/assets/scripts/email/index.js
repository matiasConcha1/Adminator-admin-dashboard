function bindEmailInteractions() {
  const emailSideToggle = document.querySelector('.email-side-toggle');
  const emailApp = document.querySelector('.email-app');

  if (emailSideToggle && emailApp) {
    const clonedToggle = emailSideToggle.cloneNode(true);
    emailSideToggle.replaceWith(clonedToggle);

    clonedToggle.addEventListener('click', (event) => {
      emailApp.classList.toggle('side-active');
      event.preventDefault();
    });
  }

  const emailContent = document.querySelector('.email-content');
  const emailItems = document.querySelectorAll('.email-list-item, .back-to-mailbox');

  if (!emailContent || emailItems.length === 0) {
    return;
  }

  emailItems.forEach((item) => {
    const clonedItem = item.cloneNode(true);
    item.replaceWith(clonedItem);

    clonedItem.addEventListener('click', (event) => {
      emailContent.classList.toggle('open');
      event.preventDefault();
    });
  });
}

bindEmailInteractions();

export default {
  init: bindEmailInteractions,
};
