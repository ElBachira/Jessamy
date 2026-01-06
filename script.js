document.addEventListener('DOMContentLoaded', () => {

    // --- 1. PRELOADER ---
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 600);
    }, 2000); // 2 segundos de carga simulada

    // --- 2. MODALES (Stats & Links) ---
    window.toggleModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal.classList.contains('open')) {
            modal.classList.remove('open');
        } else {
            // Cerrar otros modales primero
            document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
            modal.classList.add('open');

            // Si es stats, reiniciar animación de barras
            if(modalId === 'stats-modal') {
                const bars = modal.querySelectorAll('.progress-fill');
                bars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => bar.style.width = width, 100);
                });
            }
        }
    };

    // --- 3. ACORDEONES (Lyrics & Meaning) ---
    window.toggleAccordion = function(panelId) {
        const panel = document.getElementById(panelId);
        const btn = panel.previousElementSibling;
        const icon = btn.querySelector('.arrow');

        if (panel.classList.contains('active')) {
            panel.classList.remove('active');
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        } else {
            panel.classList.add('active');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    };

    // --- 4. REPRODUCTOR DE MÚSICA (Simulado) ---
    const playBtn = document.getElementById('play-pause');
    const icon = playBtn.querySelector('i');
    let isPlaying = false;

    /* Nota: En muchos navegadores el audio no inicia sin interacción directa previa */
    playBtn.addEventListener('click', () => {
        const audio = document.getElementById('bg-music');
        if (!isPlaying) {
            audio.play().catch(e => console.log("Audio play error (browser policy):", e));
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            document.querySelector('.album-art').style.animationPlayState = 'running';
        } else {
            audio.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            document.querySelector('.album-art').style.animationPlayState = 'paused';
        }
        isPlaying = !isPlaying;
    });

    // --- 5. COPIAR ENLACE ---
    document.getElementById('share-btn').addEventListener('click', function() {
        const btn = this;
        const originalText = btn.innerHTML;

        // Simular copiado
        navigator.clipboard.writeText(window.location.href);

        btn.innerHTML = '<i class="fas fa-check"></i> ¡COPIADO!';
        btn.style.background = 'var(--neon-violet)';
        btn.style.color = '#fff';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    });
});

