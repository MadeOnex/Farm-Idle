const login = document.getElementById("panel-login");
const register = document.getElementById("panel-register");
const msgBox = document.getElementById("msg");

// Tabs wechseln
function show(tab) {
  if (tab === "register") {
    register.classList.remove("hidden");
    login.classList.add("hidden");
  } else {
    login.classList.remove("hidden");
    register.classList.add("hidden");
  }

  // Tab-Button aktiv markieren
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });
}

// Tab Klicken
document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => show(button.dataset.tab));
});

// 
 // aus URL lesen: ?tab=register&m=ok|err&text=...
    const qs = new URLSearchParams(location.search);
    show(qs.get('tab') || 'login');
    const text = qs.get('text');
    if (text) {
      msgBox.textContent = text;
      msgBox.style.color = qs.get('m') === 'ok' ? 'var(--ok,green)' : 'var(--danger,crimson)';
    }