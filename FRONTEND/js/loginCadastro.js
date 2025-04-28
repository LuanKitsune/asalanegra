document.addEventListener("DOMContentLoaded", function () {
    const loginTab = document.getElementById("loginTab");
    const registerTab = document.getElementById("registerTab");
  
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
  
    loginTab.addEventListener("click", function () {
      loginTab.classList.add("active");
      registerTab.classList.remove("active");
  
      loginForm.classList.add("active");
      registerForm.classList.remove("active");
    });
  
    registerTab.addEventListener("click", function () {
      registerTab.classList.add("active");
      loginTab.classList.remove("active");
  
      registerForm.classList.add("active");
      loginForm.classList.remove("active");
    });
  });
  
const successloginSound = new Audio('../sounds/login.mp3');
// const errorloginSound = new Audio('../sounds/loginfail.m4a');
// const sucessregisterSound = new Audio('../sounds/register.m4a')
// const errorregisterSound = new Audio('../sounds/registerfail.m4a')

// CADASTRO
document.getElementById('registerFormElement').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const namecomplete = document.getElementById('registerName').value;
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirm').value;

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    const userData = {
        namecomplete,
        username,
        email,
        password
    };

    console.log('Dados enviados:', userData);

    try {
        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            // sucessregisterSound.play();
            alert('Usuário cadastrado com sucesso!');
            // Mudar para a aba de login após cadastro
            document.getElementById('loginTab').click();
        } else {
            // errorregisterSound.play();
            alert('Erro: ' + (data.error || data.message || 'Erro desconhecido'));
        }
    } catch (error) {
        console.error('Erro ao conectar com a API:', error);
        alert('Erro ao conectar com o servidor.');
    }
});

// LOGIN
document.getElementById('loginFormElement').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const userData = { username, password };
    console.log('Dados de login:', userData);

    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            successloginSound.play();
            alert('Login bem-sucedido!');
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
            window.location.href = "dashboard.html";
        } else {
            // errorloginSound.play();
            alert('Erro: ' + (data.error || data.message || 'Erro desconhecido'));
        }
    } catch (error) {
        console.error('Erro ao conectar com a API:', error);
        alert('Erro ao conectar com o servidor.');
    }
});