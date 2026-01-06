document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PANTALLA DE CARGA ---
    const loader = document.getElementById('loader');
    
    // Simular tiempo de carga para efecto dramático
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 2000); // 2 segundos de carga

    // --- 2. SISTEMA DE REPRODUCTOR DE MÚSICA ---
    const songs = [
        {
            title: "Why'd You Only Call Me When You're High",
            artist: "Arctic Monkeys",
            src: "song.mp3", // ASEGURA QUE ESTE ARCHIVO EXISTA
            lyrics: "The mirror's image tells me it's home time\nBut I'm not finished 'cause you're not by my side...",
            meaning: "Refleja la dependencia tóxica de Archie. Él sabe que es una opción de madrugada, pero su soledad lo obliga a contestar."
        }
        // Agrega más canciones aquí si quieres
    ];

    let currentIdx = 0;
    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-pause-btn');
    const playerContainer = document.querySelector('.music-player-container');
    
    // Elementos de texto
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

    // Cargar inicial
    loadSong(currentIdx);

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playerContainer.classList.add('playing');
            }).catch(e => console.log("Error de autoplay (usuario debe interactuar):", e));
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playerContainer.classList.remove('playing');
        }
    });

    // --- 3. GALERÍA DE BOTS ---
    const maleGrid = document.getElementById('bots-masculinos');
    const femaleGrid = document.getElementById('bots-femeninos');
    const myName = "Archibald"; // Para no auto-listarse

    // Verificamos si BOTS_LIST existe (del script externo)
    if (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST)) {
        BOTS_LIST.forEach(bot => {
            if (!bot.nombre.includes(myName)) {
                const item = document.createElement('a');
                item.href = bot.url || '#';
                item.className = 'bot-item';
                // Añadimos un efecto de retardo aleatorio para la aparición
                item.style.animation = `fadeIn 0.5s ease forwards ${Math.random()}s`;
                
                item.innerHTML = `
                    <img src="${bot.imagen}" loading="lazy" alt="${bot.nombre}">
                    <span>${bot.nombre}</span>
                `;

                if (bot.genero === 'masculino') maleGrid.appendChild(item);
                else femaleGrid.appendChild(item);
            }
        });
    } else {
        // Fallback visual si no carga la lista
        maleGrid.innerHTML = '<p style="color:#555; font-size:0.8rem;">Sin conexión a la base de datos...</p>';
    }

    // --- 4. STICKER INTERACTIVO (HONK) ---
    const sticker = document.getElementById('honk-sticker');
    const honkAudio = new Audio('https://www.myinstants.com/media/sounds/honk-sound.mp3');
    
    sticker.addEventListener('click', () => {
        honkAudio.currentTime = 0;
        honkAudio.volume = 0.5;
        honkAudio.play();
        
        // Animación JS simple
        sticker.style.transform = "scale(0.8) rotate(-20deg)";
        setTimeout(() => sticker.style.transform = "scale(1) rotate(0deg)", 150);
    });

    // --- 5. UTILIDADES UI (Tabs & Acordeones) ---
    window.openOverlay = (id) => {
        document.getElementById(id).classList.add('active');
    };
    
    window.closeOverlay = (id) => {
        document.getElementById(id).classList.remove('active');
    };

    window.toggleFold = (id) => {
        const el = document.getElementById(id);
        // Cierra los otros si quieres comportamiento de acordeón estricto
        document.querySelectorAll('.foldable').forEach(f => {
            if(f.id !== id) f.classList.remove('active');
        });
        el.classList.toggle('active');
    };
});
