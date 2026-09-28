document.getElementById("ano").textContent = new Date().getFullYear();

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    const aberto = menu.classList.toggle("hidden") === false;
    menuBtn.setAttribute("aria-expanded", aberto);
});

menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
        menu.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", false);
    })
);

// ===== Idioma (PT/EN) =====
const langBtn = document.getElementById("lang-btn");

function lerIdiomaSalvo() {
    try {
        return localStorage.getItem("idioma");
    } catch {
        return null;
    }
}

function aplicarIdioma(idioma) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const texto = traducoes[idioma][el.dataset.i18n];
        if (texto) el.textContent = texto;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
        const texto = traducoes[idioma][el.dataset.i18nAria];
        if (texto) el.setAttribute("aria-label", texto);
    });

    document.title = traducoes[idioma]["meta.titulo"];

    document.documentElement.lang = idioma === "pt" ? "pt-BR" : "en";
    langBtn.textContent = idioma === "pt" ? "EN" : "PT";
    langBtn.setAttribute("aria-label", idioma === "pt" ? "Switch to English" : "Mudar para português");

    try {
        localStorage.setItem("idioma", idioma);
    } catch {}
}

let idioma = lerIdiomaSalvo() ?? (navigator.language.startsWith("pt") ? "pt" : "en");
aplicarIdioma(idioma);

langBtn.addEventListener("click", () => {
    idioma = idioma === "pt" ? "en" : "pt";
    aplicarIdioma(idioma);
});
