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