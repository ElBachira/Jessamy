// ABRIR Y CERRAR OVERLAYS
function openOverlay(id) {
    document.getElementById(id).classList.add('active');
}

function closeOverlay(id) {
    document.getElementById(id).classList.remove('active');
}

// BOTÓN PLAY/PAUSE (Simulado)
const playBtn = document.getElementById('playToggle');
let isPlaying = true;

playBtn.addEventListener('click', function() {
    isPlaying = !isPlaying;
    if(isPlaying) {
        this.innerHTML = '<i class="fas fa-pause"></i>';
        document.querySelector('.album-art').classList.add('spin-slow');
        document.querySelector('.progress-fill').style.animationPlayState = 'running';
    } else {
        this.innerHTML = '<i class="fas fa-play"></i>';
        document.querySelector('.album-art').classList.remove('spin-slow');
        document.querySelector('.progress-fill').style.animationPlayState = 'paused';
    }
});

// BOTÓN COPIAR ENLACE
const shareBtn = document.getElementById('shareBtn');
shareBtn.addEventListener('click', () => {
    // Copiar URL al portapapeles
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    // Feedback visual
    const originalText = shareBtn.innerHTML;
    shareBtn.style.background = '#bc13fe'; // Violeta
    shareBtn.style.color = '#fff';
    shareBtn.innerHTML = '<span class="btn-text">¡COPIADO!</span>';

    setTimeout(() => {
        shareBtn.style.background = 'var(--neon-green)';
        shareBtn.style.color = '#000';
        shareBtn.innerHTML = originalText;
    }, 2000);
});

// INICIAR CON ANIMACIÓN
document.addEventListener('DOMContentLoaded', () => {
    // Asegurar que las animaciones corran
    console.log("Sistema Bio-Cyberpunk Iniciado");
});

