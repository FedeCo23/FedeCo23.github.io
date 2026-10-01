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

    lista.after(btn); // il pulsante va subito sotto l'elenco
});