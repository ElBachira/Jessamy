document.addEventListener('DOMContentLoaded', function() {

    const audio = document.getElementById('song-player'); 
    const preloader = document.getElementById('preloader');
    
    const clickSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
    const swooshSound = new Audio('https://www.fesliyanstudios.com/play-mp3/570');
    
    document.querySelectorAll('.tab-button, .close-btn, .links-grid a, .player-ctrl-btn').forEach(element => {
        element.addEventListener('click', () => {
            if (element.matches('.links-grid a')) {
                swooshSound.currentTime = 0;
                swooshSound.play().catch(e => console.log("Error al reproducir swoosh:", e));
            } else {
                clickSound.currentTime = 0;
                clickSound.play().catch(e => console.log("Error al reproducir click:", e));
            }
        });
    });

    document.querySelectorAll('.typewriter').forEach((element, index) => {
        const text = element.innerHTML;
        element.innerHTML = '';
        element.style.opacity = 1;
        let i = 0;
        setTimeout(() => {
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 25);
        }, 500 + index * 100); 
    });

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xOffset = (clientX / innerWidth - 0.5) * -2;
        const yOffset = (clientY / innerHeight - 0.5) * -2;
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.style.backgroundPosition = `calc(50% + ${xOffset}%) calc(50% + ${yOffset}%)`;
        }
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    const closeButtons = document.querySelectorAll('.close-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const paneId = button.dataset.tab;
            document.getElementById(paneId).classList.add('active');
            if (paneId === 'stats-tab') { animateStats(); }
        });
    });
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.overlay-pane').classList.remove('active');
        });
    });
    function animateStats() {
        const bars = document.querySelectorAll('.overlay-pane.active .fill');
        bars.forEach(bar => {
            bar.style.transition = 'none';
            bar.style.width = '0%';
            void bar.offsetWidth; 
            bar.style.transition = 'width 1s ease-in-out';

            let rawVal = bar.getAttribute('data-p');
            if(rawVal) {
                const percentage = rawVal.replace('%', '').trim();
                setTimeout(() => {
                    bar.style.width = percentage + '%';
                }, 50);
            }
        });
    }
    
    // =================================================================
    // === CONFIGURACIÓN DE CANCIONES (¡AHORA SIN TIEMPOS!) ===
    // =================================================================
    const songs = [
        {
            title: "Why'd You Only Call Me When You're High",
            artist: "Arctic Monkeys",
            src: "song.mp3",
            // AQUÍ AGREGAS EL SIGNIFICADO:
            meaning: "Esta canción refleja la dependencia emocional extrema de Archie. Representa cómo, a pesar del dolor y la toxicidad, él prefiere aferrarse a ti antes que enfrentar el vacío de la soledad. Es su grito desesperado de 'no me abandones' aunque le hagas daño.",
            // LAS LETRAS AHORA SON SOLO UNA LISTA DE TEXTO, SIN TIEMPOS:
            lyrics: [
            "El espejo me dice que ya es hora de irme a casa",
            "Pero no quiero, porque no estás conmigo",
            "Al llegar creí verte alejándote",
            "Con los zapatos en la mano",
            "Pensé que otra vez solo lo había imaginado",
            "Que nos cruzábamos por casualidad",
            "Ahora son las tres de la mañana",
            "Y trato de hacerte cambiar de opinión",
            "Te dejé un montón de llamadas perdidas",
            "Y a mi mensaje me respondes",
            "¿Por qué solo me llamas cuando estás drogado?",
            "Hola, ¿por qué solo me llamas cuando estás drogado?",
            "En un lugar más oscuro, repitiendo las mismas estupideces",
            "Necesito alguien que esté conmigo, ¿saldrás esta noche?",
            "Cada vez es más difícil que me escuches",
            "Cuanto más apuro el coche",
            "Soy incapaz de decidir bien",
            "Y solo se me ocurren ideas de mierda",
            "Ahora son las tres de la mañana",
            "Y trato de hacerte cambiar de opinión",
            "Te dejé un montón de llamadas perdidas",
            "Y a mi mensaje me respondes",
            "¿Por qué solo me llamas cuando estás drogado?",
            "¿Por qué solo me llamas cuando estás...?",
            "Hola, ¿por qué solo me llamas cuando estás drogado?",
            "No te veo por ningún lado, me pregunto dónde estarás",
            "Siento que se me acaba el tiempo",
            "No encontré lo que esperaba encontrar",
            "Dijiste que mañana madrugas",
            "Que te ibas a acostar temprano",
            "Y ya me estás aburriendo, nena",
            "¿Por qué solo me llamas cuando estás drogado?",
            "¿Por qué solo me llamas cuando estás drogado?",
            "¿Por qué solo me llamas cuando estás drogado?",
            "¿Por qué solo me llamas cuando estás drogado?",
            "¿Por qué solo me llamas cuando estás drogado?"
                   ]
        }
    ];

    let currentSongIndex = 0;

    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const songTitleEl = document.getElementById('song-title');
    const songArtistEl = document.getElementById('song-artist');
    const spotifyIcon = document.querySelector('.spotify-icon');
    const lyricsContainer = document.getElementById('lyrics-container');
    const meaningContainer = document.getElementById('song-meaning'); // Referencia al nuevo contenedor
    
    const playIcon = '<i class="fas fa-play"></i>';
    const pauseIcon = '<i class="fas fa-pause"></i>';

    function loadSong(songIndex) {
        const song = songs[songIndex];
        audio.src = song.src;
        songTitleEl.textContent = song.title;
        songArtistEl.textContent = song.artist;
        
        // Cargar letras y significado
        loadLyrics(song.lyrics);
        loadMeaning(song.meaning);

        audio.pause();
        playPauseBtn.innerHTML = playIcon;
        spotifyIcon.classList.remove('is-spinning');
    }

    function loadMeaning(meaningText) {
        if(meaningText) {
            meaningContainer.textContent = meaningText;
        } else {
            meaningContainer.textContent = "Disfruta de la música...";
        }
    }

    function loadLyrics(lyrics) {
        lyricsContainer.innerHTML = ''; 

        if (!lyrics || lyrics.length === 0) {
            lyricsContainer.innerHTML = '<p class="lyric-line">♪ No hay letra para esta canción ♪</p>';
            return;
        }

        // Simplemente añadimos las líneas, sin lógica de tiempo
        lyrics.forEach((line) => {
            const p = document.createElement('p');
            p.textContent = line;
            p.classList.add('lyric-line');
            lyricsContainer.appendChild(p);
        });
        // Reiniciar el scroll al top
        document.querySelector('.lyrics-section').scrollTop = 0;
    }

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(e => console.error("Error al intentar reproducir:", e));
            playPauseBtn.innerHTML = pauseIcon;
            spotifyIcon.classList.add('is-spinning');
        } else {
            audio.pause();
            playPauseBtn.innerHTML = playIcon;
            spotifyIcon.classList.remove('is-spinning');
        }
    });

    prevBtn.addEventListener('click', () => {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1; 
        }
        loadSong(currentSongIndex);
        audio.play().catch(e => console.error("Error al intentar reproducir:", e)); 
        playPauseBtn.innerHTML = pauseIcon;
        spotifyIcon.classList.add('is-spinning');
    });

    nextBtn.addEventListener('click', () => {
        currentSongIndex++;
        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0; 
        }
        loadSong(currentSongIndex);
        audio.play().catch(e => console.error("Error al intentar reproducir:", e)); 
        playPauseBtn.innerHTML = pauseIcon;
        spotifyIcon.classList.add('is-spinning');
    });

    audio.addEventListener('ended', () => {
        nextBtn.click(); 
    });

    // Se eliminó el audio.addEventListener('timeupdate') porque ya no es necesario para el scroll manual.

    loadSong(currentSongIndex);

    const fnafSticker=document.getElementById('fnaf-sticker');const honkSound=new Audio('https://www.myinstants.com/media/sounds/fnaf-nose-honk.mp3');fnafSticker.addEventListener('click',()=>{honkSound.currentTime=0;honkSound.play().catch(e => {})});
    const copyBtn = document.getElementById('copy-link-btn');
    const originalBtnText = copyBtn.innerHTML;
    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href).then(() => {
            copyBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
            copyBtn.classList.add('copied');
            swooshSound.currentTime = 0;
            swooshSound.play().catch(err => {});
            setTimeout(() => {
                copyBtn.innerHTML = originalBtnText;
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });

    // OCULTAR PRELOADER AL FINAL
    preloader.classList.add('loaded');

});
