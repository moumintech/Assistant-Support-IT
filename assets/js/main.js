(() => {
  "use strict";

 
  const $ = (sel, root = document) => root.querySelector(sel);

  const setExpanded = (btn, isOpen) => {
    if (btn) btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  const openMenu = (btn, list) => {
    btn.classList.add("is-open");
    list.classList.add("is-open");
    setExpanded(btn, true);
  };

  const closeMenu = (btn, list) => {
    btn.classList.remove("is-open");
    list.classList.remove("is-open");
    setExpanded(btn, false);
  };

  function initMenu() {
    const navToggle = $(".nav-toggle");
    const navList = $(".nav-list");
    if (!navToggle || !navList) return;

  
    if (!navToggle.hasAttribute("aria-expanded")) navToggle.setAttribute("aria-expanded", "false");
    if (navList.id) navToggle.setAttribute("aria-controls", navList.id);

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.classList.contains("is-open");
      if (isOpen) closeMenu(navToggle, navList);
      else openMenu(navToggle, navList);
    });


    navList.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      closeMenu(navToggle, navList);
    });

    
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu(navToggle, navList);
    });

    
    const mq = window.matchMedia("(min-width: 900px)");
    const handleMQ = (e) => {
      if (e.matches) closeMenu(navToggle, navList);
    };
    if (mq.addEventListener) mq.addEventListener("change", handleMQ);
    else mq.addListener(handleMQ);
  }

  function initTheme() {
    const switchEl = $("#theme-switch");
    if (!switchEl) return;

    const root = document.documentElement;

    const applyTheme = (theme) => {
      root.setAttribute("data-theme", theme);
      switchEl.checked = theme === "dark";
      localStorage.setItem("theme", theme);
    };

 
    const saved = localStorage.getItem("theme");
    const systemPrefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    applyTheme(saved || (systemPrefersDark ? "dark" : "light"));

   
    switchEl.addEventListener("change", () => {
      applyTheme(switchEl.checked ? "dark" : "light");
    });
  }

  function initContactForm() {
    const form = $("#contact-form");
    if (!form) return;

    const endpoint = form.getAttribute("action");
    if (!endpoint) return;

    const emailInput = $("#email");
    const emailError = $("#email-error");
    const successMessage = $("#contact-success");
    const errorMessage = $("#contact-error");
    const submitButton = form.querySelector('button[type="submit"]');

    const hide = (el) => {
      if (el) el.hidden = true;
    };
    const show = (el) => {
      if (el) el.hidden = false;
    };

    hide(successMessage);
    hide(errorMessage);
    if (emailError) hide(emailError);

    if (emailInput && emailError) {
      emailInput.addEventListener("input", () => {
        const valid = emailInput.checkValidity();
        emailInput.setAttribute("aria-invalid", valid ? "false" : "true");
        emailError.hidden = valid;
      });
    }

    const setSubmitting = (isSubmitting) => {
      if (!submitButton) return;
      submitButton.disabled = isSubmitting;
      submitButton.dataset.originalText ||= submitButton.textContent || "Envoyer";
      submitButton.textContent = isSubmitting
        ? "Envoi en cours…"
        : submitButton.dataset.originalText;
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      hide(successMessage);
      hide(errorMessage);

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      setSubmitting(true);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });

        if (response.ok) {
          show(successMessage);
          form.reset();
          if (emailError) emailError.hidden = true;
          if (emailInput) emailInput.setAttribute("aria-invalid", "false");
        } else {
          show(errorMessage);
        }
      } catch (err) {
        console.error("Erreur formulaire :", err);
        show(errorMessage);
      } finally {
        setSubmitting(false);
      }
    });
  }

 
  document.addEventListener("DOMContentLoaded", () => {
    initMenu();
    initTheme();
    initContactForm();
  });
})();
