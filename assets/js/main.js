document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (!navToggle || !navList) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.classList.toggle("is-open");
    navList.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navList.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.tagName.toLowerCase() === "a") {
      navToggle.classList.remove("is-open");
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navToggle.classList.remove("is-open");
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 899) {
      navToggle.classList.remove("is-open");
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const switchEl = document.getElementById("theme-switch");
  if (!switchEl) return;

  const saved = localStorage.getItem("theme");
  const initialTheme = saved || "light";

  document.documentElement.setAttribute("data-theme", initialTheme);
  switchEl.checked = initialTheme === "dark";

 
  switchEl.addEventListener("change", () => {
    const nextTheme = switchEl.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
});