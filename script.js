"use strict";

// ---------- 1. PULSANTE TEMA ----------
const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

// Il tema è scuro se c'è la classe "dark", oppure se non hai scelto
// nulla (nessuna classe "light") e il sistema operativo usa il tema scuro.
function isScuro() {
    if (root.classList.contains("dark")) return true;
    if (root.classList.contains("light")) return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function aggiornaPulsanteTema() {
    const scuro = isScuro();
    themeBtn.setAttribute("aria-pressed", String(scuro));
    themeBtn.textContent = scuro ? "Tema chiaro" : "Dark mode";
}

themeBtn.addEventListener("click", () => {
    const nuovo = isScuro() ? "light" : "dark";
    root.classList.remove("dark", "light");
    root.classList.add(nuovo);
    try {
        localStorage.setItem("tema", nuovo); // ricorda la scelta
    } catch (e) { /* ignorato */ }
    aggiornaPulsanteTema();
});
aggiornaPulsanteTema();

// ---------- 2. PULSANTE MENU (mobile) ----------
const menuBtn = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

function impostaMenu(aperto) {
    menu.classList.toggle("open", aperto);
    menuBtn.setAttribute("aria-expanded", String(aperto));
}

menuBtn.addEventListener("click", () => {
    impostaMenu(!menu.classList.contains("open"));
});

menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) impostaMenu(false); // chiude dopo il click su un link
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") impostaMenu(false);
});

// ---------- 3. CERTIFICAZIONI: "Mostra tutte" ----------
// ---------- 3. CERTIFICAZIONI: "Mostra tutte" ----------
const aggiornaListeCertificazioni = [];

document.querySelectorAll(".cert-list").forEach((lista) => {
    const elementi = Array.from(lista.querySelectorAll(".cert-grid > li"));
    let aperta = false;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cert-more";

    const aggiorna = () => {
        const griglia = lista.querySelector(".cert-grid");
        const limite = getComputedStyle(griglia).gridTemplateColumns.split(" ").length;
        const serve = elementi.length > limite;

        // Se non serve il bottone: mostra tutto, resetta lo stato e nascondi il bottone
        if (!serve) {
            aperta = false;
            lista.classList.remove("open");
            elementi.forEach((elemento) => (elemento.hidden = false));
            btn.hidden = true;
            btn.style.display = "none";
            return;
        }

        btn.style.display = "";
        btn.hidden = false;

        elementi.forEach((elemento, index) => {
            elemento.hidden = !aperta && index >= limite;
        });
        btn.textContent = aperta ? "Mostra meno" : "Mostra di più";
        btn.setAttribute("aria-expanded", String(aperta));
    };

    btn.addEventListener("click", () => {
        aperta = !aperta;
        lista.classList.toggle("open", aperta);
        aggiorna();
    });

    lista.after(btn); // il pulsante va subito sotto l'elenco
    aggiornaListeCertificazioni.push(aggiorna);
    aggiorna(); // chiamata iniziale: imposta testo e visibilità subito
});

// Una sola volta, fuori dal forEach: ricalcola al ridimensionamento della finestra
window.addEventListener("resize", () => {
    aggiornaListeCertificazioni.forEach((fn) => fn());
});

// ---------- 4. PROGETTI: "Mostra di più" ----------
const aggiornaPulsantiProgetti = [];

document.querySelectorAll(".project-card").forEach((card, index) => {
    const media = card.querySelector(".project-image, .project-video");
    const contenuto = document.createElement("div");
    contenuto.className = "project-content";

    let sibling = media.nextElementSibling;
    while (sibling && !sibling.matches(".project-link")) {
        const next = sibling.nextElementSibling;
        contenuto.append(sibling);
        sibling = next;
    }
    card.insertBefore(contenuto, sibling);

    contenuto.id = `project-details-${index + 1}`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "icon-btn project-more";
    btn.hidden = true;
    btn.textContent = "Mostra di più";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", contenuto.id);

    const aggiornaPulsante = () => {
        const espansa = card.classList.contains("expanded");
        btn.hidden = !espansa && contenuto.scrollHeight <= contenuto.clientHeight;
    };
    aggiornaPulsantiProgetti.push(aggiornaPulsante);

    btn.addEventListener("click", () => {
        const espansa = card.classList.toggle("expanded");
        btn.setAttribute("aria-expanded", String(espansa));
        btn.textContent = espansa ? "Mostra meno" : "Mostra di più";
        aggiornaPulsante();
    });

    card.append(btn);
});

document.fonts.ready.then(() => {
    document.documentElement.classList.add("projects-ready");
    aggiornaPulsantiProgetti.forEach((aggiorna) => aggiorna());
});
window.addEventListener("resize", () => {
    aggiornaListeCertificazioni.forEach((aggiorna) => aggiorna());
    aggiornaPulsantiProgetti.forEach((aggiorna) => aggiorna());
});