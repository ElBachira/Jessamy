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
    // === CONFIGURACIÓN DE CANCIONES ===
    // =================================================================
    const songs = [
        {
            title: "All I Want Is You",
            artist: "Rebzyyx",
            src: "song.mp3",
            lyrics: [
  { "time": 0, "line": "SÉ LO QUE QUIERES, NENA" },
  { "time": 1, "line": "DÉJAME SER QUIÉN..." },
  { "time": 2, "line": "TE ABRACE, ABRACE POR SIE-E-EMPRE" },
  { "time": 4, "line": "ESTARÍAMOS BIEN JUN-JUN-JUNTOS" },
  { "time": 7, "line": "Sé lo que quieres, nena" },
  { "time": 8, "line": "Déjame ser el único que" },
  { "time": 10, "line": "Sostenga tu mano por siempre" },
  { "time": 12, "line": "Seríamos perfectos juntos" },
  { "time": 13, "line": "Te haré sentir especial" },
  { "time": 15, "line": "Quitaré todo tu estrés" },
  { "time": 16, "line": "Sanaré los huecos de tu corazón" },
  { "time": 18, "line": "Siempre fue mi intención" },
  { "time": 19, "line": "Tengo problemas mentales" },
  { "time": 21, "line": "Siempre te extraño, joder" },
  { "time": 23, "line": "Hay pañuelos con sangre" },
  { "time": 24, "line": "Tirados por todo mi cuarto" },
  { "time": 26, "line": "Tengo que limpiar este desastre" },
  { "time": 28, "line": "Bebé, estoy muy jodido" },
  { "time": 29, "line": "Bebé, ¿me vas a ayudar?" },
  { "time": 31, "line": "Porque yo te ayudaré a ti" },
  { "time": 33, "line": "Solo te quiero a ti AHORA" },
  { "time": 34, "line": "Lo único que quiero hacer" },
  { "time": 36, "line": "Es esperar a que me llames" },
  { "time": 38, "line": "Bebé, cuánto lo siento" },
  { "time": 40, "line": "¿Quieres lastimarme?" },
  { "time": 41, "line": "¿Vas a hacerme daño?" },
  { "time": 43, "line": "Por favor, no me abandones" },
  { "time": 44, "line": "Por favor, no me abandones" },
  { "time": 46, "line": "Solo te quiero a ti AHORA" },
  { "time": 47, "line": "Lo único que quiero hacer" },
  { "time": 49, "line": "Es esperar a que me llames" },
  { "time": 51, "line": "Bebé, cuánto lo siento" },
  { "time": 53, "line": "¿Quieres lastimarme?" },
  { "time": 54, "line": "¿Vas a hacerme daño?" },
  { "time": 56, "line": "Por favor, no me abandones" },
  { "time": 57, "line": "Por favor, no me abandones" },
  { "time": 61, "line": "No me abandones, madrugué por ti" },
  { "time": 62, "line": "Toda la noche despierto, drogándome" },
  { "time": 65, "line": "Me haces sentir sucio" },
  { "time": 68, "line": "Dices que doy asco" },
  { "time": 69, "line": "Me dices que me amas" },
  { "time": 70, "line": "Pero tus palabras no valen nada" },
  { "time": 72, "line": "No quiero hablar de esto" },
  { "time": 74, "line": "No, no está a discusión" },
  { "time": 76, "line": "Tú controlas mi vida" },
  { "time": 77, "line": "Me siento como tu puta marioneta" },
  { "time": 79, "line": "Sigue mandándome a callar" },
  { "time": 80, "line": "Okay, nena, está bien" },
  { "time": 82, "line": "Recuerdo aquellas noches" },
  { "time": 84, "line": "Bailando bajo la luz de la luna" },
  { "time": 86, "line": "Recuerdo esconderme" },
  { "time": 87, "line": "Era tímido y tenía pánico escénico" },
  { "time": 89, "line": "Recuerdo estar llorando" },
  { "time": 90, "line": "Solo quiero que estés bien" },
  { "time": 92, "line": "Quiero que estés bien" },
  { "time": 93, "line": "Okay, bebé, está bien" },
  { "time": 95, "line": "Quiero que estés bien" },
  { "time": 96, "line": "Okay, bebé, está bien" },
  { "time": 98, "line": "Solo te quiero a ti AHORA" },
  { "time": 100, "line": "Lo único que quiero hacer" },
  { "time": 102, "line": "Es esperar a que me llames" },
  { "time": 104, "line": "Bebé, cuánto lo siento" },
  { "time": 105, "line": "¿Quieres lastimarme?" },
  { "time": 106, "line": "¿Vas a hacerme daño?" },
  { "time": 108, "line": "Por favor, no me abandones" },
  { "time": 110, "line": "Por favor, no me abandones" },
  { "time": 111, "line": "Solo te quiero a ti AHORA" },
  { "time": 114, "line": "Lo único que quiero hacer" },
  { "time": 115, "line": "Es esperar a que me llames" },
  { "time": 116, "line": "Bebé, cuánto lo siento" },
  { "time": 118, "line": "¿Quieres lastimarme?" },
  { "time": 120, "line": "¿Vas a hacerme daño?" },
  { "time": 121, "line": "Por favor, no me abandones" },
  { "time": 123, "line": "Por favor, no me abandones" }
           ]
        }
    ];

    let currentSongIndex = 0;
    let currentLyricIndex = -1;

    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const songTitleEl = document.getElementById('song-title');
    const songArtistEl = document.getElementById('song-artist');
    const spotifyIcon = document.querySelector('.spotify-icon');
    
    // CORRECCIÓN AQUÍ: Faltaba cerrar comilla y paréntesis, y el ID estaba cortado.
    const lyricsContainer = document.getElementById('lyrics-container');
    
    const playIcon = '<i class="fas fa-play"></i>';
    const pauseIcon = '<i class="fas fa-pause"></i>';

    function loadSong(songIndex) {
        const song = songs[songIndex];
        audio.src = song.src;
        songTitleEl.textContent = song.title;
        songArtistEl.textContent = song.artist;
        loadLyrics(song.lyrics);
        audio.pause();
        playPauseBtn.innerHTML = playIcon;
        spotifyIcon.classList.remove('is-spinning');
    }

    function loadLyrics(lyrics) {
        lyricsContainer.innerHTML = ''; 
        currentLyricIndex = -1; 

        if (!lyrics || lyrics.length === 0) {
            lyricsContainer.innerHTML = '<p class="lyric-line active">♪ No hay letra para esta canción ♪</p>';
            return;
        }

        lyrics.forEach((line, index) => {
            const p = document.createElement('p');
            p.textContent = line.line;
            p.classList.add('lyric-line');
            p.dataset.index = index; 
            lyricsContainer.appendChild(p);
        });
        
        lyricsContainer.style.transform = `translateY(0px)`;
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

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const lyrics = songs[currentSongIndex].lyrics;

        if (!lyrics || lyrics.length === 0) return; 

        let newActiveIndex = -1;
        for (let i = lyrics.length - 1; i >= 0; i--) {
            if (currentTime >= lyrics[i].time) {
                newActiveIndex = i;
                break;
            }
        }

        if (newActiveIndex === currentLyricIndex) {
            return;
        }

        currentLyricIndex = newActiveIndex;

        lyricsContainer.querySelectorAll('.lyric-line').forEach(lineEl => {
            lineEl.classList.remove('active');
        });

        if (currentLyricIndex !== -1) {
            const activeLine = lyricsContainer.querySelector(`.lyric-line[data-index="${currentLyricIndex}"]`);
            if (activeLine) {
                activeLine.classList.add('active');
                const scrollOffset = activeLine.offsetTop - (100 / 2) + (activeLine.clientHeight / 2);
                lyricsContainer.style.transform = `translateY(-${scrollOffset}px)`;
            }
        } else {
            lyricsContainer.style.transform = `translateY(0px)`;
        }
    });

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
