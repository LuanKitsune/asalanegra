document.addEventListener('DOMContentLoaded', function() {
    const blackHole = document.getElementById('blackHole');
    const abyssText = document.getElementById('abyssText');
    const enterBtn = document.getElementById('enterBtn');
    const typingElement = document.querySelector('.typing');
    const latinText = "Si enim introieris in abyssum, abyssus in te introibit";

    let i = 0;
    const typingEffect = setInterval(() => {
        typingElement.textContent += latinText[i];
        i++;
        if (i === latinText.length) {
            clearInterval(typingEffect);
            typingElement.style.borderRight = 'none';
        }
    }, 50);
    
    const windSound = document.getElementById('windSound');
    const whisperSound = document.getElementById('whisperSound');
    windSound.volume = 0.3;
    windSound.play();
    
    // Configurar partículas
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#aaaaaa"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "top",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "repulse": {
                    "distance": 100,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
    
    // Efeitos de terror aleatórios no buraco negro
    const terrorEffects = [
        { type: 'facehorror2', duration: 1500, sound: whisperSound },
        { type: 'facehorror3', duration: 2000, sound: whisperSound },
        { type: 'facehorror4', duration: 1500, sound: whisperSound },
        { type: 'facehorror5', duration: 2000, sound: whisperSound },
        { type: 'handhorror', duration: 1500, sound: whisperSound },
        { type: 'horrofaceface', duration: 2000, sound: whisperSound },
        { type: 'horrofacewhite', duration: 1500, sound: whisperSound },
        { type: 'horror', duration: 2000, sound: whisperSound },
        { type: 'horrorclawn', duration: 1500, sound: whisperSound },
        { type: 'horrorface', duration: 2000, sound: whisperSound },
        { type: 'horrorfacesinister', duration: 1500, sound: whisperSound }
    ];
    function triggerRandomTerror() {
        // 5% de chance de ativar um efeito a cada 30 segundos
        if (Math.random() < 0.05) {
            const effect = terrorEffects[Math.floor(Math.random() * terrorEffects.length)];
            
            // Criar elemento de efeito
            const terrorElement = document.createElement('div');
            terrorElement.className = 'abyss-face';
            terrorElement.style.backgroundImage = `url('../images/apparitions/${effect.type}.png')`;
            terrorElement.style.opacity = '0';
            
            blackHole.appendChild(terrorElement);
            
            // Ativar efeito
            setTimeout(() => {
                terrorElement.style.opacity = '0.8';
                effect.sound.currentTime = 0;
                effect.sound.play();
                
                // Remover efeito após duração
                setTimeout(() => {
                    terrorElement.style.opacity = '0';
                    setTimeout(() => {
                        blackHole.removeChild(terrorElement);
                    }, 1000);
                }, effect.duration);
            }, 100);
        }
        
        // Agendar próximo efeito
        setTimeout(triggerRandomTerror, 30000);
    }
    
    // Iniciar efeitos de terror após 1 minuto
    setTimeout(triggerRandomTerror, 60000);
    
    // Botão de entrada
    enterBtn.addEventListener('click', function() {
        // Efeito de transição
        document.body.style.transition = 'background-color 2s';
        document.body.style.backgroundColor = '#100';
        
        // Redirecionar para a próxima página (simulado)
        setTimeout(() => {
            alert('Acesso concedido. Bem-vindo ao Arquivo Obsidiana.');
            // Aqui você redirecionaria para a próxima página
            window.location.href = 'loginCadastro.html';
        }, 2000);
    });
    
    blackHole.addEventListener('mouseenter', function() {
        windSound.volume = 0.6;
        if (Math.random() < 0.3) {
            whisperSound.currentTime = 0;
            whisperSound.play();
        }
    });
    
    blackHole.addEventListener('mouseleave', function() {
        windSound.volume = 0.3;
    });
});