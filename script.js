/* FIREBASE */

  const firebaseConfig = {
    apiKey: "AIzaSyDQZkk9L2DoO7Aw-JXGYDt5Kq6UsaDFiLw",
    authDomain: "playstore-86762.firebaseapp.com",
    projectId: "playstore-86762",
    storageBucket: "playstore-86762.firebasestorage.app",
    messagingSenderId: "891958864313",
    appId: "1:891958864313:web:7019800551f6e4ffe76e68",
    measurementId: "G-05EH3JVCLQ"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

/* UYGULAMALARI YÜKLE */

function loadApps() {

    db.collection("apps").onSnapshot(snapshot => {

        let appsDiv =
            document.getElementById("apps");

        appsDiv.innerHTML = "";

        snapshot.forEach(doc => {

            let app = doc.data();

            let card =
                document.createElement("div");

            card.className = "card";

            card.innerHTML = `
                <h2>${app.name}</h2>

                <p>${app.category}</p>

                <a href="${app.link}" target="_blank">
                    <button>İndir</button>
                </a>

                <button
                    class="delete-btn"
                    onclick="deleteApp('${doc.id}')"
                >
                    Sil
                </button>
            `;

            appsDiv.appendChild(card);

        });

    });

}

loadApps();

/* KAYIT */

function register() {

    let email =
        document.getElementById("email").value;

    let password =
        document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(
        email,
        password
    )

    .then(() => {

        alert("Kayıt başarılı");

    })

    .catch(error => {

        alert(error.message);

    });

}

/* GİRİŞ */

function login() {

    let email =
        document.getElementById("email").value;

    let password =
        document.getElementById("password").value;

    auth.signInWithEmailAndPassword(
        email,
        password
    )

    .then(() => {

        document.getElementById(
            "loginPanel"
        ).style.display = "none";

        alert("Giriş başarılı");

    })

    .catch(error => {

        alert(error.message);

    });

}

/* UYGULAMA EKLE */

function uploadApp() {

    let name =
        document.getElementById("appName").value;

    let category =
        document.getElementById("appCategory").value;

    let link =
        document.getElementById("appLink").value;

    if(!name || !category || !link) {

        alert("Tüm alanları doldur");

        return;

    }

    db.collection("apps").add({

        name: name,
        category: category,
        link: link

    })

    .then(() => {

        alert("Uygulama eklendi");

    });

}

/* SİL */

function deleteApp(id) {

    db.collection("apps")
    .doc(id)
    .delete();

}

/* ARAMA */

function searchApps() {

    let input =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();

    let cards =
        document.querySelectorAll(".card");

    cards.forEach(card => {

        let title =
            card.querySelector("h2")
            .innerText
            .toLowerCase();

        card.style.display =
            title.includes(input)
            ? "block"
            : "none";

    });

}

/* FİLTRE */

function filterApps(type) {

    let cards =
        document.querySelectorAll(".card");

    cards.forEach(card => {

        let category =
            card.querySelector("p")
            .innerText;

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
