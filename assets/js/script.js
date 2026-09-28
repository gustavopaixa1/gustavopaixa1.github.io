// Ano do rodapé (só existe no portfólio)
const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();

// ===== Menu mobile (só existe no portfólio) =====
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
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
}

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
    // Textos curtos: troca o texto pela chave do dicionário
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const texto = traducoes[idioma][el.dataset.i18n];
        if (texto) el.textContent = texto;
    });

    // aria-label (leitores de tela)
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
        const texto = traducoes[idioma][el.dataset.i18nAria];
        if (texto) el.setAttribute("aria-label", texto);
    });

    // Blocos longos (currículo): mostra só o bloco do idioma atual
    document.querySelectorAll("[data-lang]").forEach((el) => {
        el.hidden = el.dataset.lang !== idioma;
    });

    // Cada página diz qual chave usar no título da aba
    const chaveTitulo = document.body.dataset.titulo ?? "meta.titulo";
    document.title = traducoes[idioma][chaveTitulo];

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

// ===== Botão de PDF (só existe no currículo) =====
const pdfBtn = document.getElementById("pdf-btn");
if (pdfBtn) pdfBtn.addEventListener("click", () => window.print());

// ===== Animação de entrada ao rolar =====
// O IntersectionObserver avisa quando um elemento entra na tela,
// sem precisar escutar o evento de scroll (que é caro para o navegador).
const observer = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observer.unobserve(entrada.target); // anima só uma vez
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
