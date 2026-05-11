
function renderApps() {
    let appsDiv = document.getElementById('apps');
    appsDiv.innerHTML = '';

    apps.forEach(app => {
        let card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="https://picsum.photos/300?random=${Math.random()}">
            <div class="card-content">
                <h2>${app.name}</h2>
                <p>${app.category}</p>

                <div class="bottom">
                    <span>⭐ ${app.rating}</span>
                    <button>Yükle</button>
                </div>
            </div>
        `;

        appsDiv.appendChild(card);
    });
}

renderApps();

function searchApps() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        let title = card.querySelector('h2').innerText.toLowerCase();

        if(title.includes(input)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

if(localStorage.getItem('currentUser')) {
    document.getElementById('loginPanel').style.display = 'none';
}

function register() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    localStorage.setItem(username, password);
    alert('Kayıt başarılı');
}

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let savedPassword = localStorage.getItem(username);

    if(savedPassword === password) {
        localStorage.setItem('currentUser', username);
        document.getElementById('loginPanel').style.display = 'none';
        alert('Giriş başarılı');
    } else {
        alert('Hatalı giriş');
    }
}

function uploadApp() {
    if(!localStorage.getItem('currentUser')) {
        alert('Önce giriş yap');
        return;
    }

    let appName = document.getElementById('appName').value;
    let appCategory = document.getElementById('appCategory').value;
    let file = document.getElementById('appFile').files[0];

    if(!appName || !appCategory || !file) {
        alert('Tüm alanları doldur');
        return;
    }

    let fileURL = URL.createObjectURL(file);

    let card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
        <img src="https://picsum.photos/300?random=${Math.random()}">
        <div class="card-content">
            <h2>${appName}</h2>
            <p>${appCategory}</p>

            <div class="bottom">
                <span>⭐ Yeni</span>

                <a href="${fileURL}" download="${file.name}">
                    <button>İndir</button>
                </a>
            </div>
        </div>
    `;

    document.getElementById('apps').appendChild(card);
}
