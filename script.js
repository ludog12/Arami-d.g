document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. BOTÓN RETRO: SCROLL A SOBRE MÍ
       ========================================================================== */
    const botonVer = document.getElementById('btn-ver');
    const seccionSobreMi = document.getElementById('about');

    if (botonVer && seccionSobreMi) {
        botonVer.addEventListener('click', () => {
            seccionSobreMi.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    /* ==========================================================================
       2. CONTROLADOR DE VENTANAS MODALES (PROYECTOS)
       ========================================================================== */
    const proyectos = document.querySelectorAll(".proyecto-clickable");
    const modales = document.querySelectorAll(".custom-modal");

    const cerrarModales = () => {
        modales.forEach(modal => modal.classList.remove("is-visible"));
        document.body.style.overflow = "auto";
    };

    proyectos.forEach(proyecto => {
        proyecto.addEventListener("click", (e) => {
            // No abre el modal si se clickea un botón nativo de la ventana (.win-btn)
            if (e.target.classList.contains("win-btn")) return;

            const targetId = proyecto.getAttribute("data-target");
            const modalDestino = document.getElementById(targetId);
            
            if (modalDestino) {
                modalDestino.classList.add("is-visible");
                document.body.style.overflow = "hidden";
            }
        });
    });

    // Delegación de eventos para cerrar modales (Por clicks en botones X o fuera de la caja)
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal-close-btn") || 
            e.target.classList.contains("modal-close-btn-retro") || 
            e.target.classList.contains("custom-modal")) {
            cerrarModales();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") cerrarModales();
    });

    /* ==========================================================================
       3. NAVEGACIÓN ACTIVA (SCROLL-SPY PARA MENÚ INFERIOR)
       ========================================================================== */
    const navLinks = document.querySelectorAll('.nav-tab');
    const secciones = document.querySelectorAll('section, div.canvas-frame');

    function spyScroll() {
        let top = window.scrollY;

        secciones.forEach(section => {
            let offset = section.offsetTop - 200; 
            let height = section.offsetHeight;
            let id = section.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', spyScroll);

    /* ==========================================================================
       4. CICLO DE FOTOS DE PERFIL (SOBRE MÍ)
       ========================================================================== */
    const photos = document.querySelectorAll(".profile-photo-container .profile-photo");
    let currentIndex = 0;

    if (photos.length > 0) {
        photos[currentIndex].classList.add("active");

        setInterval(() => {
            photos[currentIndex].classList.remove("active");
            currentIndex = (currentIndex + 1) % photos.length;
            photos[currentIndex].classList.add("active");
        }, 2500); // 2.5 segundos para un ritmo ideal
    }

    /* ==========================================================================
       5. ANIMACIÓN POR SCROLL (INTERSECTION OBSERVER)
       ========================================================================== */
    // Seleccionamos las etiquetas de sección y los ítems de proyectos para animarlos
    const elementosAAnimar = document.querySelectorAll('.scrapbook-item, .merch-item, .retrowindow, .section-header-tag');

    elementosAAnimar.forEach(el => el.classList.add('revelar'));

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Se activa cuando se ve el 15% del elemento
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('activo');
                observer.unobserve(entry.target); // Deja de observar una vez animado
            }
        });
    }, observerOptions);

    elementosAAnimar.forEach(elemento => {
        scrollObserver.observe(elemento);
    });
});