function bindChatSidebar() {
  const chatSidebarToggle = document.getElementById('chat-sidebar-toggle');
  const chatSidebar = document.getElementById('chat-sidebar');

  if (!chatSidebarToggle || !chatSidebar) {
    return;
  }

  const clonedToggle = chatSidebarToggle.cloneNode(true);
  chatSidebarToggle.replaceWith(clonedToggle);

  clonedToggle.addEventListener('click', (event) => {
    chatSidebar.classList.toggle('open');
    event.preventDefault();
  });
}

bindChatSidebar();

export default {
  init: bindChatSidebar,
};
