document.addEventListener("DOMContentLoaded", function() {

    const productosMenu = document.querySelector("productos-menu");
    const menuServicios = document.querySelector("servicios-menu");
    const submenu = productosMenu.querySelector("submenu");

    productosMenu.addEventListener ('mouseover', () => {
        submenu.style.display = "block";
    });
    menuProductos.addEventListener ('mouseleave', () => {
        submenu.style.display = "none";
    });

    if (serviciosMenu) {
        serviciosMenu.addEventListener('mouseover', () => {
            submenu.style.display = "none";  // Ocultar el submenú de productos
        });

        serviciosMenu.addEventListener('mouseleave', () => {
            // Opcional: Ocultar el menú de servicios si tuviera un submenú
        });
    }

    // Ocultar los submenús al hacer clic en cualquier parte del documento
    document.addEventListener('click', (event) => {
        if (!productosMenu.contains(event.target)) {
            submenu.style.display = "none";
        }
    });
});