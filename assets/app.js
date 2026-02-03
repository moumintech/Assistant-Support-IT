// Année dans le footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");

burger?.addEventListener("click", () => {
  const isOpen = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", String(!isOpen));
  mobileNav.hidden = isOpen;
});

// Smooth close mobile menu when clicking a link
mobileNav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    burger.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  });
});

// Contact form -> mailto (simple sans backend)
const contactForm = document.getElementById("contactForm");
contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = String(data.get("name") || "");
  const email = String(data.get("email") || "");
  const message = String(data.get("message") || "");

  const subject = encodeURIComponent(`Demande support IT — ${name}`);
  const body = encodeURIComponent(
    `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
  );

  // Remplace par ton email
  window.location.href = `mailto:zam@email.com?subject=${subject}&body=${body}`;
});

// Boutons "ouvrir le chat" (tous)
function openChat() {
  // ✅ Option 1 (Tawk.to) : si le widget existe, on l'ouvre
  if (window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
    window.Tawk_API.maximize();
    return;
  }

  // ✅ Option 2 : si ManyChat ouvre via une URL / popup, mets ton lien ici
  // window.open("https://m.me/tonlien", "_blank");

  // ✅ Fallback
  alert("Le chat n'est pas encore configuré. Ajoute le script ManyChat/Tawk.to dans index.html.");
}

["btnChat","btnChat2","btnChat3","btnChat4","btnChatMobile"].forEach((id) => {
  document.getElementById(id)?.addEventListener("click", openChat);
});
