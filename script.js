document.addEventListener('DOMContentLoaded', function() {

    const audio = document.getElementById('song-player'); 
    const preloader = document.getElementById('preloader');
    
    // Simular carga y ocultar preloader
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 1500);

    const clickSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
    
    // Sonidos de interfaz
    document.querySelectorAll('button, a, .tab-button').forEach(element => {
        element.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => {});
        });
    });

    // Manejo de TABS
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
            bar.style.width = '0%';
            setTimeout(() => {
                let rawVal = bar.getAttribute('data-p');
                if(rawVal) bar.style.width = rawVal + '%';
            }, 100);
        });
    }
    
    // === MÚSICA ===
    const songs = [
        {
            title: "Why'd You Only Call Me When You're High",
            artist: "Arctic Monkeys",
            src: "song.mp3",
            meaning: `¿Alguna vez has contestado una llamada a las tres de la mañana sabiendo perfectamente que al otro lado hay alguien que solo te recuerda cuando las drogas le aflojan la lengua... (RESTO DE TU TEXTO AQUÍ)...`,
            lyrics: [
                "The mirror's image tells me it's home time",
                "But I'm not finished 'cause you're not by my side",
                "...",
                "Why'd you only call me when you're high?"
            ]
        }
    ];

    let currentSongIndex = 0;
    // (Resto de tu lógica de reproductor musical, copiar y pegar si ya la tenías bien)
    // Solo asegúrate de que playPauseBtn cambie el icono correctamente.
    const playPauseBtn = document.getElementById('play-pause-btn');
    // ... Carga inicial
    loadSong(0);

    function loadSong(index) {
        // Lógica simple para cargar título y artista
        const song = songs[index];
        document.getElementById('song-title').innerText = song.title;
        document.getElementById('song-artist').innerText = song.artist;
        document.getElementById('song-meaning').innerText = song.meaning;
        
        // Cargar letras
        const lyricContainer = document.getElementById('lyrics-container');
        lyricContainer.innerHTML = '';
        song.lyrics.forEach(line => {
            let p = document.createElement('p');
            p.innerText = line;
            p.className = 'lyric-line';
            lyricContainer.appendChild(p);
        });
    }
    
    // Botón Copiar
    const copyBtn = document.getElementById('copy-link-btn');
    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href).then(() => {
            copyBtn.innerHTML = '¡ENLACE COPIADO!';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-share-alt"></i> COPIAR ENLACE';
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });
});
