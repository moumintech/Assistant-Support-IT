

(function () {
  function initMenu() {
    const navToggle = document.querySelector(".nav-toggle");
    const navList = document.querySelector(".nav-list");

    if (!navToggle || !navList) return;

 
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.classList.toggle("is-open");
      navList.classList.toggle("is-open", isOpen);
    });

   
    navList.addEventListener("click", (event) => {
      const target = event.target;
      if (target.tagName.toLowerCase() === "a") {
        navToggle.classList.remove("is-open");
        navList.classList.remove("is-open");
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navToggle.classList.remove("is-open");
        navList.classList.remove("is-open");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navToggle.classList.remove("is-open");
        navList.classList.remove("is-open");
      }
    });
  }

 
  window.initMenu = initMenu;
})();