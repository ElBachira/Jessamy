document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. PANTALLA DE CARGA ---
    const loader = document.getElementById('loader-screen');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.visibility = 'hidden';
            // Iniciar animaciones de entrada
            document.querySelector('.hero-section').classList.add('fade-in');
        }, 1000);
    }, 2500); // Tiempo de carga falso de 2.5s

    // --- 1. EFECTO TILT 3D (Solo en PC) ---
    const card = document.getElementById('main-card');
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

    // --- 2. CARGA DE BOTS ---
    const maleGrid = document.getElementById('bots-masculinos');
    const femaleGrid = document.getElementById('bots-femeninos');
    
    // Simulación si no existe el archivo externo
    const BOTS_FALLBACK = [
        { nombre: "Alejandro", genero: "masculino", imagen: "https://i.pinimg.com/564x/23/e4/20/23e4209c122396342898950293673197.jpg", url: "#" },
        { nombre: "Drexler", genero: "masculino", imagen: "https://i.pinimg.com/564x/a0/0a/63/a00a6311e6498f3239a031940a430588.jpg", url: "#" },
        { nombre: "Lilith", genero: "femenino", imagen: "https://i.pinimg.com/564x/5f/88/4a/5f884a0d81e09d174780287126285434.jpg", url: "#" }
    ];

    const listToUse = (typeof BOTS_LIST !== 'undefined') ? BOTS_LIST : BOTS_FALLBACK;

    listToUse.forEach(bot => {
        const botItem = document.createElement('a');
        botItem.href = bot.url;
        botItem.className = 'bot-item';
        botItem.innerHTML = `<img src="${bot.imagen}" loading="lazy" alt="${bot.nombre}">`;
        
        if (bot.genero === 'masculino') maleGrid.appendChild(botItem);
        else if (bot.genero === 'femenino') femaleGrid.appendChild(botItem);
    });

    // --- 3. REPRODUCTOR DE MÚSICA ---
    const songs = [
        {
            title: "Why'd You Only Call Me When You're High",
            artist: "Arctic Monkeys",
            src: "song.mp3", 
            cover: "cancion_icon.png",
            lyrics: "The mirror's image tells me it's home time...",
            meaning: "Refleja la toxicidad nocturna..."
        }
    ];

    let currentIdx = 0;
    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-pause-btn');
    const coverEl = document.getElementById('album-art-img');
    const titleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('song-artist');

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(e => console.log("Audio no encontrado, pon 'song.mp3' en la carpeta"));
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            coverEl.style.animationPlayState = "running";
            document.querySelector('.equalizer-top').style.opacity = "1";
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            coverEl.style.animationPlayState = "paused";
            document.querySelector('.equalizer-top').style.opacity = "0.3";
        }
    });

    // Cargar datos iniciales
    titleEl.innerText = songs[0].title;
    artistEl.innerText = songs[0].artist;
    // Si tienes los archivos, descomenta:
    // audio.src = songs[0].src; 
    // coverEl.src = songs[0].cover;

    // --- 4. STICKER INTERACTIVO ---
    const sticker = document.getElementById('fnaf-sticker');
    const honkSound = new Audio('https://www.myinstants.com/media/sounds/honk-sound.mp3'); 
    
    sticker.addEventListener('click', () => {
        honkSound.currentTime = 0; honkSound.volume = 0.5; honkSound.play();
        sticker.style.transform = "scale(0.8) rotate(-10deg)";
        setTimeout(() => sticker.style.transform = "scale(1) rotate(0deg)", 150);
        
        // Efecto confeti simple (opcional)
        createConfetti(sticker.getBoundingClientRect().left, sticker.getBoundingClientRect().top);
    });

    function createConfetti(x, y) {
        // Lógica simple para visual
        console.log("Honk! 🎉");
    }

    // --- 5. OVERLAYS Y ACORDEONES ---
    window.openOverlay = function(id) {
        const overlay = document.getElementById(id);
        overlay.classList.add('active');
        
        // Animar barras de progreso si es Stats
        if (id === 'stats-tab') {
            setTimeout(() => {
                document.querySelector('.s-angst').style.width = '100%';
                document.querySelector('.s-lewd').style.width = '65%';
                document.querySelector('.s-mad').style.width = '85%';
                document.querySelector('.s-love').style.width = '90%';
            }, 300);
        }
    };
    
    window.closeOverlay = function(id) {
        const overlay = document.getElementById(id);
        overlay.classList.remove('active');
        
        if (id === 'stats-tab') {
            document.querySelectorAll('.bar-fill').forEach(b => b.style.width = '0');
        }
    };

    window.toggleFold = function(id) {
        const el = document.getElementById(id);
        el.classList.toggle('open');
    };
});
