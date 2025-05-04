document.addEventListener('DOMContentLoaded', function() {

    checkAuthAndLoadUser();
    loadNewsFeed();
    loadUserStatistics();
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

    // document.getElementById('user-patent').textContent = `Patente: ${ userData.patent}`;
    document.getElementById('user-patent').textContent = `Patente: ${userData.patent.name || "Sem patente"}`;
    document.getElementById('user-level').textContent = `Lv: ${userData.level}`;
    // document.getElementById('populacao-total').textContent = ``
    // document.getElementById('populacao-online').textContent = ``
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

async function loadUserStatistics() {
    try {
        const response = await fetch('http://localhost:5000/auth/statistics', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const { data } = await response.json();
        
        document.getElementById('populacao-total').textContent = `Usuários totais: ${data.totalUsers}`;
        document.getElementById('populacao-online').textContent = `Usuários online: ${data.onlineUsers}`;

    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);

        document.getElementById('populacao-total').textContent = `Usuários totais: Falha, algo terrível ocorreu.`;
        document.getElementById('populacao-online').textContent = `Usuários online: Uma falha indica um mau presságio.`;
    }
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


async function logoutUser() {
    const logoutBtn = document.getElementById('logout-btn');
    try {
        
        logoutBtn.classList.add('loading');

        // const response = await fetch('http://localhost:5000/auth/logout', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //         'Content-Type': 'application/json'
        //     }
        // });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.location.href = '../index.html';

    } catch (error) {
        console.error('Erro no logout:', error);

        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.location.href = '../index.html';
        
    }
}

function setupEventListeners() {
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.location.href = '../index.html';
    });
    
}