"use strict";

// Nota di sicurezza: qui uso solo textContent e attributi,
// mai innerHTML con dati che non controllo (evita attacchi XSS).

// ---------- 1. DARK MODE ----------
const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

function aggiornaPulsanteTema() {
    const scuro = root.dataset.theme === "dark";
    themeBtn.setAttribute("aria-pressed", String(scuro));
    themeBtn.textContent = scuro ? "Tema chiaro" : "Tema scuro";
}

themeBtn.addEventListener("click", () => {
    const nuovo = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nuovo;
    try {
        localStorage.setItem("tema", nuovo); // ricorda la scelta
    } catch (e) { /* ignorato */ }
    aggiornaPulsanteTema();
});
aggiornaPulsanteTema();

// ---------- 2. MENU MOBILE ----------
const menuBtn = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

function impostaMenu(aperto) {
    menu.classList.toggle("open", aperto);
    menuBtn.setAttribute("aria-expanded", String(aperto));
}
menuBtn.addEventListener("click", () => impostaMenu(!menu.classList.contains("open")));
menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) impostaMenu(false); // chiude dopo il click su un link
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") impostaMenu(false);
});

// ---------- 3. BANNER ----------
document.querySelector(".wip-close").addEventListener("click", () => {
    document.getElementById("banner").hidden = true;
});

// ---------- 4. FILTRO PROGETTI ----------
const filtri = document.querySelectorAll(".filter-btn");
const progetti = document.querySelectorAll(".project-card");

filtri.forEach((btn) => {
    btn.addEventListener("click", () => {
        const scelta = btn.dataset.filter;
        filtri.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        progetti.forEach((card) => {
            card.hidden = scelta !== "all" && card.dataset.category !== scelta;
        });
    });
});

// ---------- 5. CERTIFICAZIONI: "Mostra tutte" ----------
document.querySelectorAll(".cert-list").forEach((lista) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cert-more";
    btn.textContent = "Mostra tutte";
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", () => {
        const aperta = lista.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(aperta));
        btn.textContent = aperta ? "Mostra meno" : "Mostra tutte";
    });
    lista.after(btn);
});

// ---------- 6. ANIMAZIONE ALLO SCROLL ----------
const daAnimare = document.querySelectorAll("main section, .project-card");
daAnimare.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
    const osservatore = new IntersectionObserver((voci) => {
        voci.forEach((voce) => {
            if (voce.isIntersecting) {
                voce.target.classList.add("visible");
                osservatore.unobserve(voce.target); // una volta sola
            }
        });
    }, { threshold: 0.1 });
    daAnimare.forEach((el) => osservatore.observe(el));
} else {
    daAnimare.forEach((el) => el.classList.add("visible"));
}