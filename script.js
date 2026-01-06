document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('song-player'); 
    const preloader = document.getElementById('preloader');
    
    // Quitar preloader con suavidad
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 1000);
    });

    // --- LÓGICA DE TABS ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const paneId = button.dataset.tab;
            const pane = document.getElementById(paneId);
            pane.classList.add('active');
            if (paneId === 'stats-tab') { 
                setTimeout(animateStats, 300); 
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.overlay-pane').classList.remove('active');
        });
    });

    function animateStats() {
        const bars = document.querySelectorAll('.fill');
        bars.forEach(bar => {
            const p = bar.getAttribute('data-p');
            bar.style.width = p + '%';
        });
    }

    // --- REPRODUCTOR DE MÚSICA (Restaurado) ---
    const songs = [
        {
            title: "Why'd You Only Call Me When You're High",
            artist: "Arctic Monkeys",
            src: "song.mp3",
            lyrics: ["The mirror's image tells me it's home time...", "But I'm not finished..."],
            meaning: "Trata sobre las llamadas impulsivas bajo efectos de sustancias..."
        }
    ];

    let currentIdx = 0;
    const playBtn = document.getElementById('play-pause-btn');
    const title = document.getElementById('song-title');
    const artist = document.getElementById('song-artist');

    function loadSong(idx) {
        const s = songs[idx];
        audio.src = s.src;
        title.innerText = s.title;
        artist.innerText = s.artist;
        document.getElementById('song-meaning').innerText = s.meaning;
    }

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    loadSong(currentIdx);

    // Sticker FNAF
    const fnaf = document.getElementById('fnaf-sticker');
    const honk = new Audio('https://www.myinstants.com/media/sounds/fnaf-nose-honk.mp3');
    fnaf.addEventListener('click', () => {
        honk.currentTime = 0;
        honk.play();
    });
});
