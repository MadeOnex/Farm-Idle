const login = document.getElementById("panel-login");
const register = document.getElementById("panel-register");
const msgBox = document.getElementById("msg");
const tabs = document.querySelectorAll("[data-tab]");

// Tabs wechseln
function show(tab) {
  const isRegister = tab === "register";
  if (isRegister) {
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


// Erklären Lassen
// ?tab=register&m=ok|err&text=Nachricht
const queryString = new URLSearchParams(location.search);
show(queryString.get("tab") || "login");

const text = queryString.get("text");
if (text) {
  const ok = queryString.get("m") === "ok";
  msgBox.textContent = text;
  msgBox.classList.toggle("ok", ok);
  msgBox.classList.toggle("err", !ok);
}
