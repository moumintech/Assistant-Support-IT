
(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  
  const burger = $("#burger");
  const mobileNav = $("#mobileNav");

  const lockScroll = (lock) => {
    document.body.style.overflow = lock ? "hidden" : "";
  };

  const openMobileNav = () => {
    if (!burger || !mobileNav) return;

    burger.setAttribute("aria-expanded", "true");
    mobileNav.hidden = false;

  
    mobileNav.style.opacity = "0";
    mobileNav.style.transform = "translateY(-8px)";
    requestAnimationFrame(() => {
      mobileNav.style.opacity = "1";
      mobileNav.style.transform = "translateY(0)";
    });

    lockScroll(true);

    
    const firstLink = mobileNav.querySelector("a");
    firstLink?.focus();
  };

  const closeMobileNav = () => {
    if (!burger || !mobileNav) return;

    burger.setAttribute("aria-expanded", "false");

  
    mobileNav.style.opacity = "0";
    mobileNav.style.transform = "translateY(-8px)";
    setTimeout(() => {
      mobileNav.hidden = true;
      mobileNav.style.opacity = "";
      mobileNav.style.transform = "";
    }, 180);

    lockScroll(false);
    burger.focus();
  };

  burger?.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    isOpen ? closeMobileNav() : openMobileNav();
  });

 
  $$(".mobileNav a").forEach((a) => a.addEventListener("click", closeMobileNav));

 
  document.addEventListener("click", (e) => {
    if (!burger || !mobileNav) return;
    if (mobileNav.hidden) return;

    const target = e.target;
    const clickedInsideMenu = mobileNav.contains(target);
    const clickedBurger = burger.contains(target);

    if (!clickedInsideMenu && !clickedBurger) closeMobileNav();
  });

  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && burger?.getAttribute("aria-expanded") === "true") {
      closeMobileNav();
    }
  });

  
  const openChat = () => {
    // Tawk.to
    if (window.Tawk_API) {
     
      if (typeof window.Tawk_API.showWidget === "function") {
        window.Tawk_API.showWidget();
      }
      if (typeof window.Tawk_API.maximize === "function") {
        window.Tawk_API.maximize();
        return;
      }
    }

    alert("Le chat n'est pas encore chargé. Vérifie que le script Tawk.to est bien collé avant </body>.");
  };

  ["btnChat", "btnChat2", "btnChat3", "btnChat4", "btnChatMobile"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", openChat);
  });

  

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(contactForm);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !email || !message) {
        alert("Merci de remplir tous les champs.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Merci d’entrer une adresse email valide.");
        return;
      }

      const subject = encodeURIComponent(`Demande support IT — ${name}`);
      const body = encodeURIComponent(
        `Nom : ${name}\n` +
        `Email : ${email}\n\n` +
        `Message :\n${message}\n`
      );

     
      const to = "zam@mail.com";
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      contactForm.reset();
    });
  }


})();
