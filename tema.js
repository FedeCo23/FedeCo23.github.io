(function () {
    const root = document.documentElement;
    root.classList.add("js"); // dice al CSS che JavaScript funziona
 
    let salvato = null;
    try {
        salvato = localStorage.getItem("tema");
    } catch (e) { /* localStorage può essere bloccato: non è un problema */ }
 
    if (salvato === "dark" || salvato === "light") {
        root.classList.add(salvato);
    }
})();
 