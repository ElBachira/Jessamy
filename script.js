document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. SISTEMA DE SONIDOS UI ---
    const sfxHover = document.getElementById('sfx-hover');
    const sfxClick = document.getElementById('sfx-click');
    const sfxOpen = document.getElementById('sfx-open');

    // Función auxiliar para reproducir sin error
    const playSound = (audioEl) => {
        if(audioEl) {
            audioEl.currentTime = 0;
            audioEl.volume = 0.3; // Volumen bajo para no molestar
            audioEl.play().catch(() => {}); // Ignora errores de autoplay
        }
    };

    // Asignar sonidos a elementos interactivos
    document.querySelectorAll('.ui-trigger').forEach(el => {
        el.addEventListener('click', () => playSound(sfxClick));
    });

    document.querySelectorAll('.ui-trigger-hover').forEach(el => {
        el.addEventListener('mouseenter', () => playSound(sfxHover));
    });

    // --- 1. PANTALLA DE CARGA ---
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Sonido de inicio opcional
            playSound(sfxOpen);
        }, 800);
    }, 2000); 

    // --- 2. SISTEMA DE REPRODUCTOR DE MÚSICA ---
    const songs = [
        {
            title: "Why'd You Only Call Me When You're High",
            artist: "Arctic Monkeys",
            src: "song.mp3", 
            lyrics: "The mirror's image tells me it's home time\nBut I'm not finished 'cause you're not by my side...",
            meaning: "Refleja la dependencia tóxica de Archie. Él sabe que es una opción de madrugada, pero su soledad lo obliga a contestar."
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
        audio.src = s.src;
        lyricsEl.innerText = s.lyrics;
        meaningEl.innerText = s.meaning;
    }

    loadSong(currentIdx);

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playerContainer.classList.add('playing');
            }).catch(e => console.log("Interacción requerida", e));
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playerContainer.classList.remove('playing');
        }
    });

    // --- 3. GALERÍA DE BOTS ---
    const maleGrid = document.getElementById('bots-masculinos');
    const femaleGrid = document.getElementById('bots-femeninos');
    const myName = "Archibald"; 

    if (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST)) {
        BOTS_LIST.forEach(bot => {
            if (!bot.nombre.includes(myName)) {
                const item = document.createElement('a');
                item.href = bot.url || '#';
                item.className = 'bot-item ui-trigger'; // Añadido sonido
                item.style.animation = `fadeIn 0.5s ease forwards ${Math.random()}s`;
                
                // Evento de clic para sonido en bots dinámicos
                item.addEventListener('click', () => playSound(sfxClick));

                item.innerHTML = `
                    <img src="${bot.imagen}" loading="lazy" alt="${bot.nombre}">
                    <span>${bot.nombre}</span>
                `;

                if (bot.genero === 'masculino') maleGrid.appendChild(item);
                else femaleGrid.appendChild(item);
            }
        });
    } else {
        maleGrid.innerHTML = '<p style="color:#555; font-size:0.8rem;">Sin conexión...</p>';
    }

    // --- 4. STICKER INTERACTIVO (HONK) ---
    const sticker = document.getElementById('honk-sticker');
    const honkAudio = new Audio('https://www.myinstants.com/media/sounds/honk-sound.mp3'); // O tu archivo local
    
    sticker.addEventListener('click', () => {
        honkAudio.currentTime = 0;
        honkAudio.volume = 0.5;
        honkAudio.play();
        
        sticker.style.transform = "scale(0.8) rotate(-20deg)";
        setTimeout(() => sticker.style.transform = "scale(1) rotate(0deg)", 150);
    });

    // --- 5. UTILIDADES UI (Tabs & Acordeones) ---
    window.openOverlay = (id) => {
        playSound(sfxOpen);
        document.getElementById(id).classList.add('active');
    };
    
    window.closeOverlay = (id) => {
        playSound(sfxClick);
        document.getElementById(id).classList.remove('active');
    };

    window.toggleFold = (id) => {
        playSound(sfxClick);
        const el = document.getElementById(id);
        document.querySelectorAll('.foldable').forEach(f => {
            if(f.id !== id) f.classList.remove('active');
        });
        el.classList.toggle('active');
    };
});
