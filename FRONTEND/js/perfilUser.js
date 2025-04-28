document.addEventListener('DOMContentLoaded', function() {

    checkAuthAndLoadUser();
    loadNewsFeed();
    loadFriendsList();
    setupEventListeners();
});

function checkAuthAndLoadUser() {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!token || !userData) {
        alert('Seu login foi sequestrado por forças ocultas! Redirecionando...');
        window.location.href = '../loginCadastro.html';
        return;
    }
    
    document.getElementById('username-display').textContent = userData.username;
    if (userData.status == false){
       document.getElementById('user-status').textContent = `Status: Offline`;
    }else{
       document.getElementById('user-status').textContent = `Status: Online`;
    }
    document.getElementById('user-patent').textContent = `Patente: ${ userData.patent}`;
    document.getElementById('user-level').textContent = `Lv: ${userData.level}`;
    const avatarElement = document.getElementById('user-avatar');

    if (avatarElement) {
        avatarElement.src = userData.avatar || '../assets/default-avatar.jpg';
    }
    // document.getElementById('user-email').textContent = userData.email;
}
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
    
}