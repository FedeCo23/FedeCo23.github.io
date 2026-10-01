(function () {
    const root = document.documentElement;
    root.classList.add("js");

    let tema = null;
    try {
        tema = localStorage.getItem("tema");
    } catch (e) { /* localStorage può essere bloccato */ }

    if (tema !== "dark" && tema !== "light") {
        tema = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    root.dataset.theme = tema;
})();