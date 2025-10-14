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

// --- kleine Cookie-Helpers ---
function readCookie(name) {
  const m = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return m ? decodeURIComponent(m[1]) : null;
}
function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=0; path=/";
}

// --- Flash aus Cookies lesen ---
const flashText = readCookie("flash_text");
const flashOk = readCookie("flash_ok");
const flashTab = readCookie("flash_tab");

if (flashTab) show(flashTab);
else show("login");

if (flashText) {
  msgBox.textContent = flashText;
  const ok = flashOk === "1";
  msgBox.classList.toggle("ok", ok);
  msgBox.classList.toggle("err", !ok);
  msgBox.style.color = ok ? "var(--ok,green)" : "var(--danger,crimson)";
}

// einmalig -> löschen
["flash_text", "flash_ok", "flash_tab"].forEach(eraseCookie);
