    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('collapsed');
    }

    function toggleSubmenu(element) {
      // Prevenir la navegación
      event.preventDefault();
      
      // Cerrar otros submenús abiertos
      document.querySelectorAll('.submenu.show').forEach(menu => {
        if (menu !== element.nextElementSibling) {
          menu.classList.remove('show');
          menu.previousElementSibling.classList.remove('active');
        }
      });
      
      // Alternar el submenú actual
      const submenu = element.nextElementSibling;
      submenu.classList.toggle('show');
      element.classList.toggle('active');
    }