// CONFIGURACIÓN DE LA MÚSICA
const songs = [
    {
        title: "Why'd You Only Call Me When You're High",
        artist: "Arctic Monkeys",
        src: "song.mp3", // ASEGURATE DE TENER ESTE ARCHIVO
        meaning: "Esta canción refleja la toxicidad cíclica entre tú y Archie. Él solo te busca cuando está vulnerable (drogado/ebrio) porque sobrio su orgullo no se lo permite, y tú disfrutas tener ese control sobre él a las 3 AM.",
        lyrics: [
            "The mirror's image tells me it's home time",
            "But I'm not finished 'cause you're not by my side",
            "...",
            "Why'd you only call me when you're high?"
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    
    // --- PRELOADER ---
    setTimeout(() => {
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('preloader').style.display = 'none';
        }, 500);
    }, 2000);

    // --- REPRODUCTOR DE MÚSICA ---
    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('btn-play');
    const titleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('song-artist');
    const vinyl = document.querySelector('.vinyl-icon');
    const progressBar = document.getElementById('progress-fill');
    
    let isPlaying = false;
    let currentSong = 0;

    // Cargar canción inicial
    loadSong(currentSong);

    function loadSong(index) {
        const song = songs[index];
        titleEl.innerText = song.title;
        artistEl.innerText = song.artist;
        audio.src = song.src;
        document.getElementById('song-meaning').innerText = song.meaning;
        
        // Cargar letras
        const lyricBox = document.getElementById('lyrics-text');
        lyricBox.innerHTML = song.lyrics.map(line => `<p>${line}</p>`).join('');
    }

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    function playSong() {
        isPlaying = true;
        audio.play().catch(e => console.log("Interacción requerida primero"));
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        document.querySelector('.music-player-glass').classList.add('playing');
    }

    function pauseSong() {
        isPlaying = false;
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        document.querySelector('.music-player-glass').classList.remove('playing');
    }

    // Barra de progreso
    audio.addEventListener('timeupdate', (e) => {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    });

    // --- PLEGABLE DE LETRAS ---
    const toggleBtn = document.getElementById('toggle-lyrics');
    const content = document.getElementById('lyrics-content');
    
    toggleBtn.addEventListener('click', () => {
        content.classList.toggle('open');
        const icon = toggleBtn.querySelector('i');
        if(content.classList.contains('open')){
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });

    // --- STICKER FNAF ---
    const sticker = document.getElementById('fnaf-sticker');
    const honkSound = document.getElementById('fnaf-sound');
    
    sticker.addEventListener('click', () => {
        // Reiniciar audio para poder spamear el click
        honkSound.currentTime = 0;
        honkSound.play().catch(e => console.log("Error audio sticker"));
        
        // Animación visual extra al click
        sticker.style.transform = "scale(1.2) rotate(20deg)";
        setTimeout(() => sticker.style.transform = "scale(1) rotate(0deg)", 100);
    });

    // --- MODALES (STATS & LINKS) ---
    window.openModal = function(id) {
        const modal = document.getElementById(id);
        modal.classList.add('active');
        
        // Si es stats, animar las barras
        if(id === 'stats-modal') {
            const bars = modal.querySelectorAll('.bar-fill');
            bars.forEach(bar => {
                // Truco para reiniciar animación css width
                const w = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => bar.style.width = w, 100);
            });
        }
    }

    window.closeModal = function(id) {
        document.getElementById(id).classList.remove('active');
    }

    // Cerrar modal al hacer click fuera
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if(e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // --- SHARE BUTTON ---
    const shareBtn = document.getElementById('share-fab');
    shareBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href);
        alert("¡Enlace copiado al portapapeles! 🌲");
    });
});
