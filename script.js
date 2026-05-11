let apps = JSON.parse(localStorage.getItem("apps")) || [];

function renderApps() {
    let appsDiv = document.getElementById("apps");
    appsDiv.innerHTML = "";

    apps.forEach(app => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="https://picsum.photos/300?random=${Math.random()}">
            <div class="card-content">
                <h2>${app.name}</h2>
                <p>${app.category}</p>

                <a href="${app.file}" download="${app.fileName}">
                    <button>İndir</button>
                </a>
            </div>
        `;

        appsDiv.appendChild(card);
    });
}

renderApps();

// ARAMA
function searchApps() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let title = card.querySelector("h2").innerText.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
}

// REGISTER
function register() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    localStorage.setItem(user, pass);
    alert("Kayıt başarılı");
}

// LOGIN
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let saved = localStorage.getItem(user);

    if(saved === pass) {
        localStorage.setItem("currentUser", user);
        document.getElementById("loginPanel").style.display = "none";
        alert("Giriş başarılı");
    } else {
        alert("Hatalı giriş");
    }
}

// UPLOAD
function uploadApp() {
    if(!localStorage.getItem("currentUser")) {
        alert("Önce giriş yap");
        return;
    }

    let name = document.getElementById("appName").value;
    let category = document.getElementById("appCategory").value;
    let file = document.getElementById("appFile").files[0];

    let fileURL = URL.createObjectURL(file);

    let newApp = {
        name,
        category,
        file: fileURL,
        fileName: file.name
    };

    apps.push(newApp);
    localStorage.setItem("apps", JSON.stringify(apps));

    renderApps();
}
