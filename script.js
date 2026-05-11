let apps = JSON.parse(localStorage.getItem("apps")) || [];

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
                    <a href="${app.file}" download="${app.fileName}">
                        <button>İndir</button>
                    </a>
                </div>
            </div>
        `;

        appsDiv.appendChild(card);
    });
}

renderApps();

function uploadApp() {
    let appName = document.getElementById('appName').value;
    let appCategory = document.getElementById('appCategory').value;
    let file = document.getElementById('appFile').files[0];

    if (!appName || !appCategory || !file) {
        alert("Tüm alanları doldur");
        return;
    }

    let fileURL = URL.createObjectURL(file);

    let newApp = {
        name: appName,
        category: appCategory,
        rating: "Yeni",
        file: fileURL,
        fileName: file.name
    };

    apps.push(newApp);

    localStorage.setItem("apps", JSON.stringify(apps));

    renderApps();

    alert("Uygulama kaydedildi!");
}
