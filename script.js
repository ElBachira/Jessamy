document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. PRELOADER ---
    setTimeout(() => {
        document.getElementById('preloader').classList.add('loaded');
    }, 1500);

    // --- 2. LOGICA DEL REPRODUCTOR (FIX COMPLETO) ---
    const audio = document.getElementById('song-player');
    const playBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const titleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('song-artist');
    const diskVisual = document.getElementById('disk-visual');
    const progressBar = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    const lyricsContainer = document.getElementById('lyrics-container');
    const meaningContainer = document.getElementById('song-meaning');

    const songs = [
        {
            title: "Why'd You Only Call Me When You're High",
            artist: "Arctic Monkeys",
            src: "song.mp3", // ASEGURATE DE QUE ESTE ARCHIVO EXISTA
            meaning: "Una reflexión sobre la soledad y el deseo tóxico a altas horas de la madrugada...",
            lyrics: [
                "The mirror's image tells me it's home time",
                "But I'm not finished 'cause you're not by my side",
                "As I arrived I thought I saw you leaving",
                "Carrying your shoes",
                "Decided that once again I was just dreaming",
                "Now it's three in the morning",
                "And I'm trying to change your mind",
                "Why'd you only call me when you're high?"
            ]
        }
        // Agrega más canciones aquí si quieres
    ];

    let songIndex = 0;

    function loadSong(song) {
        titleEl.innerText = song.title;
        artistEl.innerText = song.artist;
        audio.src = song.src;
        meaningContainer.innerText = song.meaning;

        // Cargar letras
        lyricsContainer.innerHTML = '';
        song.lyrics.forEach(line => {
            const p = document.createElement('p');
            p.innerText = line;
            lyricsContainer.appendChild(p);
        });
    }

    function playSong() {
        playBtn.querySelector('i').classList.remove('fa-play');
        playBtn.querySelector('i').classList.add('fa-pause');
        diskVisual.classList.add('spinning'); // Hace girar el disco
        audio.play();
    }

    function pauseSong() {
        playBtn.querySelector('i').classList.remove('fa-pause');
        playBtn.querySelector('i').classList.add('fa-play');
        diskVisual.classList.remove('spinning'); // Detiene el disco
        audio.pause();
    }

    playBtn.addEventListener('click', () => {
        const isPlaying = playBtn.querySelector('i').classList.contains('fa-pause');
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    // Barra de progreso
    audio.addEventListener('timeupdate', (e) => {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    });

    // Clic en la barra para saltar
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });

    // Cargar canción inicial
    loadSong(songs[songIndex]);


    // --- 3. LOGICA DE TABS (PESTAÑAS) Y OVERLAYS ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const closeButtons = document.querySelectorAll('.close-btn');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Si es Stats, animar barras
            if(tabId === 'stats-tab') {
                setTimeout(() => {
                    document.querySelectorAll('.bar-fill').forEach(bar => {
                        bar.style.width = bar.getAttribute('data-p') + '%';
                    });
                }, 300);
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Cerrar el panel
            btn.closest('.overlay-pane').classList.remove('active');
            // Resetear barras para próxima animación
            document.querySelectorAll('.bar-fill').forEach(bar => bar.style.width = '0%');
        });
    });

    // --- 4. SONIDOS FX ---
    const clickFx = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
    document.querySelectorAll('button, a, .tab-button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Opcional: Sonido al pasar mouse
        });
        el.addEventListener('click', () => {
            clickFx.currentTime = 0;
            clickFx.play().catch(e=>{});
        });
    });
    
    // --- 5. STICKER INTERACTIVO ---
    const sticker = document.getElementById('fnaf-sticker');
    if(sticker){
        sticker.addEventListener('click', () => {
             const honk = new Audio('https://www.myinstants.com/media/sounds/fnaf-nose-honk.mp3');
             honk.play();
        });
    }
});
