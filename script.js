document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. SISTEMA DE LUCIÉRNAGAS (AMBIENTE VISUAL) ---
    const firefliesContainer = document.getElementById('fireflies-container');
    const fireflyCount = 20; // Cantidad de partículas

    for(let i=0; i < fireflyCount; i++) {
        const div = document.createElement('div');
        div.classList.add('firefly');
        // Posición aleatoria inicial
        div.style.left = Math.random() * 100 + 'vw';
        div.style.top = Math.random() * 100 + 'vh';
        // Animación diferente para cada una
        div.style.animationDuration = (Math.random() * 10 + 10) + 's';
        div.style.animationDelay = Math.random() * 5 + 's';
        // Destino aleatorio
        div.style.setProperty('--moveX', (Math.random() * 200 - 100) + 'px');
        div.style.setProperty('--moveY', (Math.random() * 200 - 100) + 'px');
        firefliesContainer.appendChild(div);
    }

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
                // Añadimos un efecto de retraso en la animación para que aparezcan en cascada
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
            src: "song.mp3", 
            cover: "cancion_icon.png",
            lyrics: "The mirror's image tells me it's home time\nBut I'm not finished 'cause you're not by my side\n...\nWhy'd you only call me when you're high?",
            meaning: "Esta canción refleja esa toxicidad nocturna donde Archie sabe que solo lo buscas cuando estás vulnerable o intoxicado, pero él sigue contestando."
        }
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

    loadSong(currentIdx); 

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            coverEl.style.animation = "spinRing 4s linear infinite"; // Usamos la misma animación de rotación
            coverEl.style.boxShadow = "0 0 20px #39ff14";
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            coverEl.style.animation = "none";
            coverEl.style.boxShadow = "none";
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        currentIdx = (currentIdx + 1) % songs.length;
        loadSong(currentIdx);
        if(!audio.paused) audio.play();
    });
    
    document.getElementById('prev-btn').addEventListener('click', () => {
        currentIdx = (currentIdx - 1 + songs.length) % songs.length;
        loadSong(currentIdx);
        if(!audio.paused) audio.play();
    });

    // --- 3. FUNCIONALIDAD DEL STICKER (HONK) ---
    const sticker = document.getElementById('fnaf-sticker');
    const honkSound = new Audio('https://www.myinstants.com/media/sounds/honk-sound.mp3'); 
    
    sticker.addEventListener('click', () => {
        honkSound.currentTime = 0;
        honkSound.volume = 0.6;
        honkSound.play();
        sticker.style.transform = "scale(0.8) rotate(-10deg)";
        setTimeout(() => {
            sticker.style.transform = "scale(1) rotate(10deg)";
        }, 150);
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
        const icon = el.querySelector('.fa-chevron-down');
        if(el.classList.contains('open')) icon.style.transform = "rotate(180deg)";
        else icon.style.transform = "rotate(0deg)";
    };
});
