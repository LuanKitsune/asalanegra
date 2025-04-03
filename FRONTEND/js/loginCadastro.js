document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const windSound = document.getElementById('windSound');
    const whisperSound = document.getElementById('whisperSound');
    
    windSound.volume = 0.3;
    windSound.play();

    // Alternar entre tabs
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });

    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    // Validação de formulário
    document.getElementById('loginFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        // Validação simples (substituir por validação real)
        if(username && password) {
            // Efeito sonoro
            whisperSound.currentTime = 0;
            whisperSound.play();
            
            // Simular autenticação
            setTimeout(() => {
                alert('Autenticação bem-sucedida. Acessando arquivos...');
                // window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showError('Preencha todos os campos');
        }
    });

    document.getElementById('registerFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const code = document.getElementById('registerCode').value;
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('registerConfirm').value;
        
        // Validação
        if(!code || !username || !password || !confirm) {
            showError('Preencha todos os campos');
            return;
        }
        
        if(password !== confirm) {
            showError('As senhas não coincidem');
            return;
        }
        
        if(password.length < 6) {
            showError('A senha deve ter pelo menos 6 caracteres');
            return;
        }
        
        // Efeito sonoro
        whisperSound.currentTime = 0;
        whisperSound.play();
        
        // Simular cadastro
        setTimeout(() => {
            alert('Cadastro concluído. Iniciando treinamento...');
            // window.location.href = 'dashboard.html';
        }, 1000);
    });

    // Efeito de erro
    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const forms = document.querySelectorAll('.tab-content.active form');
        forms[0].appendChild(errorElement);
        
        setTimeout(() => {
            errorElement.remove();
        }, 3000);
    }

    // Efeito de hover nos inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('mouseenter', () => {
            whisperSound.currentTime = 0;
            whisperSound.volume = 0.3;
            whisperSound.play();
        });
    });
});