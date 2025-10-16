// Tab System und Navigation
function showTab(tabId) {
  // Alle Tabs und Nav-Items zurücksetzen
  document.querySelectorAll("section[data-tab]").forEach((tab) => {
    tab.classList.add("hidden");
    tab.classList.remove("is-active");
  });

  document.querySelectorAll(".nav a[data-tab]").forEach((nav) => {
    nav.classList.remove("active");
  });

  // Aktiven Tab und Nav-Item setzen
  const targetTab = document.querySelector(`section[data-tab="${tabId}"]`);
  const targetNav = document.querySelector(`.nav a[data-tab="${tabId}"]`);

  if (targetTab) {
    targetTab.classList.remove("hidden");
    targetTab.classList.add("is-active");
  }

  if (targetNav) {
    targetNav.classList.add("active");
  }
}

// Setup
function setupNavigation() {
  // Click Handler für Nav-Items
  document.querySelectorAll(".nav a[data-tab]").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      showTab(item.dataset.tab);
    });
  });

  // Toolbar Button Handler
  document.querySelectorAll(".toolbar").forEach((toolbar) => {
    toolbar.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        toolbar
          .querySelectorAll("button")
          .forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
      });
    });
  });

  // Start mit Default-Tab
  const startTab = location.hash.slice(1) || "tab-farm";
  showTab(startTab);
}

// Initialisierung
document.addEventListener("DOMContentLoaded", setupNavigation);

// Exports (falls nötig)
window.UI = { showTab };
