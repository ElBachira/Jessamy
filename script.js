document.addEventListener('DOMContentLoaded', function() {
    
    // 1. PRELOADER
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }, 2000);

    // 2. TABS & OVERLAYS
    const tabButtons = document.querySelectorAll('.tab-button');
    const closeButtons = document.querySelectorAll('.close-btn');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.tab;
            const overlay = document.getElementById(targetId);
            overlay.classList.add('active');
            
            // Si abrimos Stats, animar las barras
            if (targetId === 'stats-tab') {
                const fills = document.querySelectorAll('.stat-fill');
                fills.forEach(fill => {
                    // Reseteamos el ancho para que anime de nuevo
                    const targetWidth = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => { fill.style.width = targetWidth; }, 100);
                });
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const overlay = document.getElementById(btn.dataset.target);
            overlay.classList.remove('active');
        });
    });

    // 3. REPRODUCTOR DE MÚSICA (Lógica Real)
    const audio = document.getElementById('song-player');
    const playBtn = document.getElementById('play-pause-btn');
    const icon = playBtn.querySelector('i');
    const progressBar = document.getElementById('progress-fill');
    
    // Datos de la canción
    const songData = {
        title: "Why'd You Only Call Me...",
        artist: "Arctic Monkeys",
        meaning: "Es una representación de la desesperación narcisista...",
        lyrics: "The mirror's image tells me it's home time..."
    };

    // Cargar textos
    document.getElementById('song-title').innerText = songData.title;
    document.getElementById('song-artist').innerText = songData.artist;
    document.getElementById('song-meaning').innerText = songData.meaning;
    document.getElementById('lyrics-container').innerText = songData.lyrics;

    // Play/Pause
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            document.getElementById('album-art').style.animation = "spinBorder 4s linear infinite";
        } else {
            audio.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            document.getElementById('album-art').style.animation = "none";
        }
    });

    // Actualizar barra de progreso
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = percent + '%';
        }
    });

    // 4. ACORDEONES
    window.toggleSection = function(id) {
        const el = document.getElementById(id);
        el.classList.toggle('show');
    };

    // 5. CARGAR BOTS (Grid System)
    const masculinos = document.getElementById('bots-masculinos');
    const femeninos = document.getElementById('bots-femeninos');
    const currentBotName = "Archibald";

    if (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST)) {
        BOTS_LIST.forEach(bot => {
            if (!bot.nombre.includes(currentBotName)) {
                const html = `
                    <a href="${bot.url}" class="char-icon" target="_blank">
                        <img src="${bot.imagen}" alt="${bot.nombre}" loading="lazy">
                        <span class="char-name">${bot.nombre}</span>
                    </a>`;
                
                if (bot.genero === 'masculino') masculinos.innerHTML += html;
                else femeninos.innerHTML += html;
            }
        });
    }

    // 6. BOTON COPIAR
    const copyBtn = document.getElementById('copy-link-btn');
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="btn-text">¡COPIADO!</span> <i class="fas fa-check"></i>';
        copyBtn.style.borderColor = "#fff";
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.borderColor = "var(--c-neon-green)";
        }, 2000);
    });
});
