document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // 1. Dark Mode Toggle
    // =======================================================
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = darkModeToggle.querySelector('i');
    
    // Función para aplicar/remover el modo oscuro
    const applyDarkMode = (isDark) => {
        if (isDark) {
            body.classList.add('dark');
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark');
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    };

    // Auto-detect prefers-color-scheme y persistencia
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('darkMode');

    if (storedTheme === 'enabled' || (storedTheme === null && prefersDark)) {
        applyDarkMode(true);
    } else {
        applyDarkMode(false);
    }

    // Event Listener para el toggle
    darkModeToggle.addEventListener('click', () => {
        const isCurrentlyDark = body.classList.contains('dark');
        applyDarkMode(!isCurrentlyDark);
    });


    // =======================================================
    // 2. Smooth Scroll para Navbar Links
    // =======================================================
    document.querySelectorAll('#mainNav a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // e.preventDefault(); // Desactivado para mantener el scrollspy de Bootstrap
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Cierra la navbar en móviles después de hacer click
                const navbarCollapse = document.getElementById('navbarNav');
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                if (navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            }
        });
    });


    // =======================================================
    // 3. Formulario de Contacto (Simulación)
    // =======================================================
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Previene el envío real del formulario

        // Validación simple (Bootstrap ya maneja 'required')
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && message) {
            // Simulación de envío exitoso
            alert('¡Mensaje enviado! 📧 Gracias por contactarme, Juan Pérez te responderá pronto.');
            
            // Opcional: Resetear el formulario
            contactForm.reset();
        } else {
            alert('Por favor, rellena todos los campos del formulario.');
        }
    });

});