document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CARGA DE BOTS (Automatizada) ---
    const maleGrid = document.getElementById('bots-masculinos');
    const femaleGrid = document.getElementById('bots-femeninos');
    const currentBotName = "Archibald";

    if (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST)) {
        BOTS_LIST.forEach(bot => {
            if (!bot.nombre.includes(currentBotName)) {
                const botItem = document.createElement('a');
                botItem.href = bot.url;
                botItem.className = 'bot-item';
                botItem.innerHTML = `<img src="${bot.imagen}" loading="lazy"><span class="bot-name">${bot.nombre}</span>`;
                
                if (bot.genero === 'masculino') maleGrid.appendChild(botItem);
                else if (bot.genero === 'femenino') femaleGrid.appendChild(botItem);
            }
        });
    }

    // --- 2. REPRODUCTOR DE MÚSICA PRO ---
    const songs = [
        {
            title: "Why'd You Only Call Me When You're High",
            artist: "Arctic Monkeys",
            src: "song.mp3", // ASEGURATE DE TENER ESTE ARCHIVO
            cover: "cancion_icon.png",
            lyrics: "The mirror's image tells me it's home time\nBut I'm not finished 'cause you're not by my side\n...\nWhy'd you only call me when you're high?",
            meaning: "Esta canción refleja esa toxicidad nocturna donde Archie sabe que solo lo buscas cuando estás vulnerable o intoxicado, pero él sigue contestando."
        }
        // Puedes agregar más canciones aquí copiando el bloque { ... }
    ];

    let currentIdx = 0;
    const audio = document.getElementById('audio-player');
    const titleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('song-artist');
    const coverEl = document.getElementById('album-art-img');
    const playBtn = document.getElementById('play-pause-btn');
    const lyricsEl = document.getElementById('lyrics-content');
    const meaningEl = document.getElementById('meaning-content');

    function loadSong(index) {
        const s = songs[index];
        titleEl.innerText = s.title;
        artistEl.innerText = s.artist;
        coverEl.src = s.cover;
        audio.src = s.src;
        lyricsEl.innerText = s.lyrics;
        meaningEl.innerText = s.meaning;
    }

    loadSong(currentIdx); // Cargar inicial

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            coverEl.style.animation = "spinGlow 4s linear infinite"; // Girar disco
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            coverEl.style.animation = "none";
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        currentIdx = (currentIdx + 1) % songs.length;
        loadSong(currentIdx);
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    
    document.getElementById('prev-btn').addEventListener('click', () => {
        currentIdx = (currentIdx - 1 + songs.length) % songs.length;
        loadSong(currentIdx);
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });

    // --- 3. FUNCIONALIDAD DEL STICKER (HONK) ---
    const sticker = document.getElementById('fnaf-sticker');
    // Sonido de nariz de payaso (FNAF style)
    const honkSound = new Audio('https://www.myinstants.com/media/sounds/honk-sound.mp3'); 
    
    sticker.addEventListener('click', () => {
        honkSound.currentTime = 0;
        honkSound.volume = 0.6;
        honkSound.play();
        
        // Animación de apachurrar
        sticker.style.transform = "scale(0.8) rotate(10deg)";
        setTimeout(() => {
            sticker.style.transform = "scale(1) rotate(10deg)";
        }, 100);
    });

    // --- 4. OVERLAYS Y ACORDEONES ---
    window.openOverlay = function(id) {
        document.getElementById(id).classList.add('active');
    };
    
    window.closeOverlay = function(id) {
        document.getElementById(id).classList.remove('active');
    };

    window.toggleFold = function(id) {
        const el = document.getElementById(id);
        el.classList.toggle('open');
    };
});
