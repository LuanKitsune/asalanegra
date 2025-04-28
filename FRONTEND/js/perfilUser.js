document.addEventListener('DOMContentLoaded', function() {
    // Verifica autenticação e carrega dados do usuário
    checkAuthAndLoadUser();
    
    // Carrega conteúdo dinâmico
    loadNewsFeed();
    loadFriendsList();
    
    // Configura eventos
    setupEventListeners();
});

// Função atualizada para carregar dados do usuário
function checkAuthAndLoadUser() {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData')); // Dados salvos durante o login
    
    if (!token || !userData) {
        alert('Seu login foi sequestrado por forças ocultas! Redirecionando...');
        window.location.href = '../loginCadastro.html';
        return;
    }
    
    // Preenche os dados do usuário sem precisar de nova requisição
    document.getElementById('username-display').textContent = userData.username;
    
    // Se tiver outros elementos para preencher:
    // document.getElementById('user-name').textContent = userData.name;
    // document.getElementById('user-email').textContent = userData.email;
    
    // Se quiser manter a imagem de avatar padrão até implementar upload:
    const avatarElement = document.getElementById('user-avatar');
    if (avatarElement) {
        avatarElement.src = userData.avatar || '../assets/default-avatar.jpg';
    }
}

// Mantemos as outras funções exatamente como estão
function loadNewsFeed() {
    const newsFeed = document.getElementById('news-feed');
    const sampleNews = [
        { title: "Novo protocolo de segurança", content: "Todos os agentes devem atualizar seus sistemas." },
        { title: "Missão concluída", content: "A operação Eclipse foi finalizada com sucesso." }
    ];
    
    sampleNews.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h3>${news.title}</h3>
            <p>${news.content}</p>
        `;
        newsFeed.appendChild(newsItem);
    });
}

function loadFriendsList() {
    const friendsList = document.getElementById('friends-list');
    const sampleFriends = [
        { name: "Agente_Smith", status: "online" },
        { name: "Agente_Johnson", status: "offline" }
    ];
    
    sampleFriends.forEach(friend => {
        const friendItem = document.createElement('div');
        friendItem.className = 'friend-item';
        friendItem.innerHTML = `
            <span class="status ${friend.status}"></span>
            <span>${friend.name}</span>
        `;
        friendsList.appendChild(friendItem);
    });
}

function setupEventListeners() {
    document.getElementById('logout-btn').addEventListener('click', function() {
        // Limpa TODOS os dados de autenticação
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.location.href = '../index.html';
    });
    
    // Adicione outros event listeners conforme necessário
}