document.addEventListener('DOMContentLoaded', () => {
    
    // --- SONIDOS SFX ---
    // Sonido simple de "click tecnológico"
    const clickSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-click-900.mp3'); 
    clickSound.volume = 0.3;

    function playTechSound() {
        // Reiniciamos el audio para poder tocar rápido
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Audio play blocked", e));
    }

    // --- 1. PANTALLA DE CARGA ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 500);
    }, 1500);

    // --- 2. REPRODUCTOR MUSICA (Igual que antes) ---
    const songs = [
        {
            title: "Why'd You Only Call Me When You're High",
            artist: "Arctic Monkeys",
            src: "song.mp3", 
            lyrics: "The mirror's image tells me it's home time...",
            meaning: "Dependencia emocional y búsqueda de validación nocturna."
        }
    ];

    let currentIdx = 0;
    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-pause-btn');
    const playerContainer = document.querySelector('.music-player-container');
    const titleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('song-artist');
    const lyricsEl = document.getElementById('lyrics-content');
    const meaningEl = document.getElementById('meaning-content');

    function loadSong(index) {
        const s = songs[index];
        titleEl.innerText = s.title;
        artistEl.innerText = s.artist;
        if(audio) audio.src = s.src;
        if(lyricsEl) lyricsEl.innerText = s.lyrics;
        if(meaningEl) meaningEl.innerText = s.meaning;
    }
    loadSong(currentIdx);

    if(playBtn) {
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playerContainer.classList.add('playing');
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                playerContainer.classList.remove('playing');
            }
        });
    }

    // --- 3. OVERLAYS Y ANIMACIONES DE STATS ---
    window.openOverlay = (id) => {
        playTechSound();
        const el = document.getElementById(id);
        el.classList.add('active');

        // Si es el tab de STATS, animamos las barras
        if (id === 'stats-tab') {
            setTimeout(() => {
                document.querySelectorAll('.bar-fill').forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    bar.style.width = targetWidth; // Dispara la transición CSS
                });
            }, 100); // Pequeño delay para que la transición se vea
        }
    };
    
    window.closeOverlay = (id) => {
        playTechSound();
        const el = document.getElementById(id);
        el.classList.remove('active');

        // Resetear barras para la próxima vez
        if (id === 'stats-tab') {
            document.querySelectorAll('.bar-fill').forEach(bar => {
                bar.style.width = '0%';
            });
        }
    };

    // --- 4. ACCORDEONES ---
    window.toggleFold = (id) => {
        playTechSound();
        const el = document.getElementById(id);
        el.classList.toggle('active');
    };

    // --- 5. STICKER INTERACTIVO ---
    const sticker = document.getElementById('honk-sticker');
    if(sticker) {
        const honkAudio = new Audio('https://www.myinstants.com/media/sounds/honk-sound.mp3');
        sticker.addEventListener('click', () => {
            honkAudio.currentTime = 0;
            honkAudio.play();
            sticker.style.transform = "scale(0.8) rotate(-20deg)";
            setTimeout(() => sticker.style.transform = "scale(1) rotate(0deg)", 150);
        });
    }

    // --- 6. AGREGAR SONIDO A LINKS ---
    document.querySelectorAll('.mega-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Sonido muy sutil al pasar el mouse (opcional)
        });
        link.addEventListener('click', () => {
            playTechSound();
        });
    });
});
