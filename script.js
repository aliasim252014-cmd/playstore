let apps = JSON.parse(localStorage.getItem("apps")) || [];

/* UYGULAMALARI GÖSTER */
function renderApps() {
    let appsDiv = document.getElementById("apps");
    appsDiv.innerHTML = "";

    apps.forEach(app => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h2>${app.name}</h2>
            <p>${app.category}</p>

            <a href="${app.file}" download="${app.fileName}">
                <button>İndir</button>
            </a>
        `;

        appsDiv.appendChild(card);
    });
}

renderApps();

/* ARAMA */
function searchApps() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let title = card.querySelector("h2").innerText.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
}

/* FİLTRE */
function filterApps(type) {
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let category = card.querySelector("p").innerText;

        if(type === "all") {
            card.style.display = "block";
        } 
        else if(category === type) {
            card.style.display = "block";
        } 
        else {
            card.style.display = "none";
        }
    });
}

/* KAYIT */
function register() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    localStorage.setItem(u, p);
    alert("Kayıt başarılı");
}

/* GİRİŞ */
function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if(localStorage.getItem(u) === p) {
        localStorage.setItem("currentUser", u);
        document.getElementById("loginPanel").style.display = "none";
        alert("Giriş başarılı");
    } else {
        alert("Hatalı giriş");
    }
}

/* UYGULAMA YÜKLE */
function uploadApp() {
    if(!localStorage.getItem("currentUser")) {
        alert("Önce giriş yap");
        return;
    }

    let name = document.getElementById("appName").value;
    let category = document.getElementById("appCategory").value;
    let file = document.getElementById("appFile").files[0];

    let fileURL = URL.createObjectURL(file);

    apps.push({
        name,
        category,
        file: fileURL,
        fileName: file.name
    });

    localStorage.setItem("apps", JSON.stringify(apps));

    renderApps();
}
