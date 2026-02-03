

(() => {
  "use strict";

  
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

 
  const yearEl = $("#year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const burger = $("#burger");
  const mobileNav = $("#mobileNav");

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

  
    document.body.style.overflow = "hidden";
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

    document.body.style.overflow = "";
  };

  burger?.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    isOpen ? closeMobileNav() : openMobileNav();
  });


  $$(".mobileNav a").forEach(link => {
    link.addEventListener("click", closeMobileNav);
  });


  })