document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. SISTEMA DE SONIDOS UI OPTIMIZADO ---
    const sfxHover = document.getElementById('sfx-hover');
    const sfxClick = document.getElementById('sfx-click');
    const sfxOpen = document.getElementById('sfx-open');

    // Función auxiliar no bloqueante
    const playSound = (audioEl) => {
        if(audioEl) {
            audioEl.currentTime = 0;
            audioEl.volume = 0.3; 
            // Promesa sin espera para no bloquear UI
            audioEl.play().catch(() => {}); 
        }
    };

    // Usar 'passive: true' mejora rendimiento de scroll en móviles si se usara ahí
    // Delegación de eventos para mejor performance
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('.ui-trigger')) {
            playSound(sfxClick);
        }
    });

    document.querySelectorAll('.ui-trigger-hover').forEach(el => {
        el.addEventListener('mouseenter', () => playSound(sfxHover), { passive: true });
    });

    // --- 1. PANTALLA DE CARGA ---
    const loader = document.getElementById('loader');
    
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                playSound(sfxOpen);
            }, 800);
        }, 1500); // Reducido un poco para sensación de rapidez
    }

    // --- 2. SISTEMA DE REPRODUCTOR DE MÚSICA ---
    const songs = [
        {
            title: "Why'd You Only Call Me When You're High",
            artist: "Arctic Monkeys",
            src: "song.mp3", 
            lyrics: `El espejo me dice que ya es hora de irme a casa
            Pero no quiero, porque no estás conmigo
            Al llegar creí verte alejándote
            Con los zapatos en la mano
            Pensé que otra vez solo lo había imaginado
            Que nos cruzábamos por casualidad
            Ahora son las tres de la mañana
            Y trato de hacerte cambiar de opinión
            Te dejé un montón de llamadas perdidas
            Y a mi mensaje me respondes
            ¿Por qué solo me llamas cuando estás drogado?
            Hola, ¿por qué solo me llamas cuando estás drogado?
            En un lugar más oscuro, repitiendo las mismas estupideces
            Necesito alguien que esté conmigo, ¿saldrás esta noche?
            Cada vez es más difícil que me escuches
            Cuanto más apuro el coche
            Soy incapaz de decidir bien
            Y solo se me ocurren ideas de mierda
            Ahora son las tres de la mañana
            Y trato de hacerte cambiar de opinión
            Te dejé un montón de llamadas perdidas
            Y a mi mensaje me respondes
            ¿Por qué solo me llamas cuando estás drogado?
            ¿Por qué solo me llamas cuando estás...?
            Hola, ¿por qué solo me llamas cuando estás drogado?
            No te veo por ningún lado, me pregunto dónde estarás
            Siento que se me acaba el tiempo
            No encontré lo que esperaba encontrar
            Dijiste que mañana madrugas
            Que te ibas a acostar temprano
            Y ya me estás aburriendo, nena
            ¿Por qué solo me llamas cuando estás drogado?
            ¿Por qué solo me llamas cuando estás drogado?
            ¿Por qué solo me llamas cuando estás drogado?
            ¿Por qué solo me llamas cuando estás drogado?
            ¿Por qué solo me llamas cuando estás drogado?`,
            meaning: `¿Alguna vez has contestado una llamada a las tres de la mañana sabiendo perfectamente que al otro lado hay alguien que solo te recuerda cuando las drogas le aflojan la lengua y le bajan los estándares? ¿Cuántas veces has permitido que te usen como pañuelo desechable para sus bajones, solo para que al día siguiente te ignoren como si fueras un error de borracho?

            Porque eso es exactamente lo que pasa aquí: un tipo (o tipa) que solo te busca cuando está tan colocado que hasta tú le pareces buena idea. Cuando está sobrio, ni te registra. Eres el plan Z, el relleno de un vacío que solo aparece cuando la realidad le pega fuerte y necesita a alguien que le diga “sí, todo bien” aunque sepa que es mentira.

            Imagínate la escena real: estás intentando dormir, el teléfono vibra, lo miras y ahí está su nombre. Contestas porque todavía queda algo de esa ilusión tonta que te dice “quizá esta vez sea diferente”. Habla arrastrando las palabras, te dice que te extraña muchísimo, que deberías verte ya, que eres lo único que le hace sentido en ese momento. Tú hablas, te ilusionas un rato, hasta sientes mariposas. Y luego llega el amanecer y… silencio total. Ni un mensaje de “gracias por escucharme”, ni un “¿cómo estás?”, nada. Desaparece hasta la próxima crisis química.

            Eso no es interés, eso es ser el juguete de alguien que no tiene los huevos de enfrentar sus propios demonios sin arrastrarte a ti. Es patético de su parte y, aunque duela admitirlo, también es patético de tu parte seguir contestando. Porque cada vez que lo haces le confirmas que puede tratarte como basura y tú seguirás ahí, disponible para cuando le dé la gana.

            Tú no eres el premio de consolación de nadie. No eres la muleta emocional de un adicto funcional que solo sabe querer cuando está fuera de sí. Mereces a alguien que te busque a las once de la mañana porque de verdad le importas, no porque necesita un cuerpo caliente para no sentirse solo en su mierda.

            Si estás en ese ciclo, párate un segundo y sé honesto contigo: ¿de verdad quieres seguir siendo la opción fácil de alguien que ni siquiera te elige cuando está en sus cinco sentidos? Bloquéalo, bórralo, déjalo gritarle al vacío la próxima vez que esté volando. Duele al principio, claro, porque duele soltar la esperanza de que “algún día cambie”. Pero esa esperanza es veneno puro.

            Tú vales demasiado como para ser el entretenimiento nocturno de un cobarde emocional. Cuando dejes de contestar, vas a sentir un vacío raro, pero después va a llegar el alivio más grande del mundo: darte cuenta de que tu tiempo, tu cariño y tu atención son demasiado buenos para regalarlos a quien solo los quiere cuando está hecho mierda.

            Tú puedes vivir sin esas migajas. Y cuando lo hagas, vas a abrirle la puerta a alguien que te llame porque realmente te quiere, no porque las drogas le hicieron bajar la guardia. Ámate lo suficiente para mandarlo a la verga de una vez. Te lo mereces todo, no las sobras de nadie.`
        }
    ];

    let currentIdx = 0;
    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-pause-btn');
    const playerContainer = document.querySelector('.music-player-container');
    
    const titleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('song-artist');
    const lyricsEl = document.getElementById('lyrics-content');
    const meaningEl = document.getElementById('meaning-content');

    function loadSong(index) {
        if (!titleEl || !artistEl || !lyricsEl || !meaningEl) return;
        const s = songs[index];
        titleEl.innerText = s.title;
        artistEl.innerText = s.artist;
        if(audio) audio.src = s.src;
        lyricsEl.innerText = s.lyrics;
        meaningEl.innerText = s.meaning;
    }

    loadSong(currentIdx);

    if (playBtn && audio) {
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().then(() => {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    if(playerContainer) playerContainer.classList.add('playing');
                }).catch(e => console.log("Interacción requerida o error", e));
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                if(playerContainer) playerContainer.classList.remove('playing');
            }
        });
    }

    // --- 3. GALERÍA DE BOTS ---
    const maleGrid = document.getElementById('bots-masculinos');
    const femaleGrid = document.getElementById('bots-femeninos');
    const myName = "Archibald"; 

    if (maleGrid && femaleGrid) {
        if (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST)) {
            const fragMale = document.createDocumentFragment();
            const fragFemale = document.createDocumentFragment();

            BOTS_LIST.forEach(bot => {
                if (!bot.nombre.includes(myName)) {
                    const item = document.createElement('a');
                    item.href = bot.url || '#';
                    item.className = 'bot-item ui-trigger'; 
                    // Animación optimizada
                    item.style.animation = `fadeIn 0.5s ease forwards`; 
                    
                    item.innerHTML = `
                        <img src="${bot.imagen}" loading="lazy" alt="${bot.nombre}">
                        <span>${bot.nombre}</span>
                    `;

                    if (bot.genero === 'masculino') fragMale.appendChild(item);
                    else fragFemale.appendChild(item);
                }
            });
            maleGrid.appendChild(fragMale);
            femaleGrid.appendChild(fragFemale);
        } else {
            maleGrid.innerHTML = '<p style="color:#555; font-size:0.8rem;">Sin conexión...</p>';
        }
    }

    // --- 4. STICKER INTERACTIVO ---
    const sticker = document.getElementById('honk-sticker');
    const honkAudio = new Audio('https://www.myinstants.com/media/sounds/honk-sound.mp3'); 
    
    if (sticker) {
        sticker.addEventListener('click', () => {
            honkAudio.currentTime = 0;
            honkAudio.volume = 0.5;
            honkAudio.play().catch(() => {});
            
            // Usamos clases CSS si fuera posible, pero mantener JS simple está bien
            sticker.style.transform = "scale(0.8) rotate(-20deg)";
            setTimeout(() => sticker.style.transform = "", 150);
        });
    }

    // --- 5. UTILIDADES UI (Tabs & Acordeones) ---
    // Funciones globales para onlick en HTML
    window.openOverlay = (id) => {
        playSound(sfxOpen);
        const el = document.getElementById(id);
        if(el) requestAnimationFrame(() => el.classList.add('active'));
    };
    
    window.closeOverlay = (id) => {
        playSound(sfxClick);
        const el = document.getElementById(id);
        if(el) el.classList.remove('active');
    };

    window.toggleFold = (id) => {
        playSound(sfxClick);
        const el = document.getElementById(id);
        if (el) {
            // Cierra otros con suavidad
            document.querySelectorAll('.foldable').forEach(f => {
                if(f.id !== id) f.classList.remove('active');
            });
            // Usa requestAnimationFrame para asegurar que el navegador esté listo para pintar
            requestAnimationFrame(() => {
                el.classList.toggle('active');
            });
        }
    };
});
