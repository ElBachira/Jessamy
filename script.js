document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PRELOADER ---
    setTimeout(() => {
        document.getElementById('preloader').classList.add('loaded');
    }, 1500);

    // --- 2. TABS NAVIGATION ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const views = document.querySelectorAll('.view-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover activos
            tabBtns.forEach(b => b.classList.remove('active'));
            views.forEach(v => v.classList.add('hidden-view'));
            
            // Activar actual
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetView = document.querySelector(targetId);
            
            // Pequeño delay para la animación
            targetView.classList.remove('hidden-view');
            
            // Si es Stats, animar barras
            if (targetId === '#stats-view') animateStats();
        });
    });

    function animateStats() {
        const bars = document.querySelectorAll('.progress-fill');
        bars.forEach(bar => {
            const finalWidth = bar.style.width; // Guarda el valor del HTML
            bar.style.width = '0%'; // Resetea
            setTimeout(() => {
                bar.style.width = finalWidth; // Anima
            }, 100);
        });
    }

    // --- 3. ACORDEONES (PLEGABLES) ---
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const item = acc.parentElement;
            item.classList.toggle('open');
            
            // Cerrar otros (opcional, si quieres que solo uno esté abierto a la vez)
            // document.querySelectorAll('.accordion-item').forEach(other => {
            //     if(other !== item) other.classList.remove('open');
            // });
        });
    });

    // --- 4. REPRODUCTOR DE MÚSICA ---
    const audio = document.getElementById('audio-source');
    const playBtn = document.getElementById('play-btn');
    const visualizer = document.querySelector('.player-visualizer');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (!isPlaying) {
            audio.play().catch(e => console.log("Interacción requerida primero"));
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            visualizer.classList.add('playing');
            isPlaying = true;
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            visualizer.classList.remove('playing');
            isPlaying = false;
        }
    });

    // --- 5. CARGAR BOTS DESDE ARRAY (Tu lógica existente) ---
    const masculinosContainer = document.getElementById('bots-masculinos');
    const femeninosContainer = document.getElementById('bots-femeninos');
    const nombreActual = "Archibald"; // Para evitar duplicados

    if (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST)) {
        BOTS_LIST.forEach(bot => {
            if (!bot.nombre.includes(nombreActual)) {
                const botHtml = `
                    <a href="${bot.url}" class="char-icon" title="${bot.nombre}">
                        <img src="${bot.imagen}" alt="${bot.nombre}" loading="lazy">
                    </a>
                `;
                if (bot.genero === 'masculino' && masculinosContainer) {
                    masculinosContainer.innerHTML += botHtml;
                } else if (bot.genero === 'femenino' && femeninosContainer) {
                    femeninosContainer.innerHTML += botHtml;
                }
            }
        });
    }

    // --- 6. BOTÓN COPIAR ---
    const shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href);
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '<i class="fas fa-check"></i> ¡ENLACE COPIADO!';
        shareBtn.style.background = '#fff';
        shareBtn.style.color = '#000';
        
        setTimeout(() => {
            shareBtn.innerHTML = originalText;
            shareBtn.style.background = '';
            shareBtn.style.color = '';
        }, 2000);
    });
});
