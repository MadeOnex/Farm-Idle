const login = document.getElementById("panel-login");
const register = document.getElementById("panel-register");
const msgBox = document.getElementById("msg");
const tabs = document.querySelectorAll("[data-tab]");

function getCookie(name) {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];

  return value ? decodeURIComponent(value) : null;
}

function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=0; path=/";
}

function switchTab(tabName) {
  login.classList.toggle("hidden", tabName === "register");
  register.classList.toggle("hidden", tabName === "login");

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });
}

// Event Listeners
tabs.forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
});

// Flash Message Handling
const flashText = getCookie("flash_text");
const flashOk = getCookie("flash_ok") === "1";
const flashTab = getCookie("flash_tab");

if (flashTab) switchTab(flashTab);
else switchTab("login");

if (flashText) {
  msgBox.textContent = flashText;
  msgBox.classList.toggle("ok", flashOk);
  msgBox.classList.toggle("err", !flashOk);
  msgBox.style.color = flashOk ? "var(--ok,green)" : "var(--danger,crimson)";
}

// Cleanup
["flash_text", "flash_ok", "flash_tab"].forEach(eraseCookie);
