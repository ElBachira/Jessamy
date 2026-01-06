document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. PANTALLA DE CARGA ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 2500); // 2.5 segundos de carga dramática

    // --- 1. CARGA DE BOTS (Simulada para visualización) ---
    // En tu versión real, esto carga desde bots.js
    const maleGrid = document.getElementById('bots-masculinos');
    const femaleGrid = document.getElementById('bots-femeninos');
    
    // Si BOTS_LIST no existe, pongo ejemplos dummy para que veas el diseño
    if (typeof BOTS_LIST === 'undefined') {
        const dummies = [
            {url:'#', img:'https://i.pravatar.cc/150?u=1', name:'Alejandro'},
            {url:'#', img:'https://i.pravatar.cc/150?u=2', name:'Drexler'},
            {url:'#', img:'https://i.pravatar.cc/150?u=3', name:'Kardi'}
        ];
        dummies.forEach(d => {
            maleGrid.innerHTML += `<a href="${d.url}" class="bot-item"><img src="${d.img}"><div class="bot-name">${d.name}</div></a>`;
        });
    }

    // --- 2. REPRODUCTOR ---
    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-pause-btn');
    const coverEl = document.getElementById('album-art-img');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (!isPlaying) {
            // audio.play(); // Descomentar si hay archivo real
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.style.boxShadow = "0 0 30px var(--c-hot-pink)";
            coverEl.style.transform = "scale(1.05)";
            isPlaying = true;
        } else {
            // audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.style.boxShadow = "0 0 20px var(--c-neon-green)";
            coverEl.style.transform = "scale(1)";
            isPlaying = false;
        }
    });

    // --- 3. ACORDEONES (Lyrics / Significado) ---
    window.toggleFold = function(id) {
        const el = document.getElementById(id);
        const allFolds = document.querySelectorAll('.foldable');
        
        // Cierra los otros para mantenerlo limpio
        allFolds.forEach(fold => {
            if (fold.id !== id) fold.classList.remove('open');
        });
        
        el.classList.toggle('open');
    };

    // --- 4. OVERLAYS ---
    window.openOverlay = function(id) {
        document.getElementById(id).classList.add('active');
    };
    
    window.closeOverlay = function(id) {
        document.getElementById(id).classList.remove('active');
    };

    // --- 5. STICKER INTERACTION ---
    const sticker = document.getElementById('fnaf-sticker');
    sticker.addEventListener('click', () => {
        const honk = new Audio('https://www.myinstants.com/media/sounds/honk-sound.mp3');
        honk.volume = 0.5;
        honk.play();
        
        // Efecto visual extra
        sticker.style.filter = "hue-rotate(90deg) drop-shadow(0 0 15px red)";
        setTimeout(() => sticker.style.filter = "", 200);
    });
});
