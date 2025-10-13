const login = document.getElementById("panel-login");
const register = document.getElementById("panel-register");
const msgBox = document.getElementById("msg");
const tabs = document.querySelectorAll("[data-tab]");

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
  tabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });
}

// Tab Klicken
tabs.forEach((button) => {
  button.addEventListener("click", () => show(button.dataset.tab));
});

// Erklären
// ?tab=register&m=ok|err&text=Nachricht
const qs = new URLSearchParams(location.search);
show(qs.get("tab") || "login");

const text = qs.get("text");
if (text) {
  const ok = qs.get("m") === "ok";
  msgBox.textContent = text;
  msgBox.classList.toggle("ok", ok);
  msgBox.classList.toggle("err", !ok);
}
