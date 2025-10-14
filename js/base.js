// Seiten Logik layout

// Tabs Anzeigen / Verstecken
function showTab(href) {
  if (!href) return;
  let tab = href.charAt(0) === "#" ? href.slice(1) : href;
  let section = document.querySelectorAll("main > section");

  // Alle Tabs zu
  for (let i = 0; i < section.length; i++) {
    section[i].style.display = "none";
  }

  // Ziel zeigen
  let target = document.getElementById(tab);
  if (target) target.style.display = "block";

  // Hash in URL Aktualisieren
  history.replaceState(null, "", "#" + tab);
}

// Toggle Gruppe für Nav und Toolbar + callback
function setupToggle(container, itemSelector, onChange) {
  if (!container) return;
  let items = container.querySelectorAll(itemSelector);


  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function (e) {
      if (this.tagName === "A") e.preventDefault();

      // Alle Items inaktiv
      for (let j = 0; j < items.length; j++) {
        items[j].classList.remove("active");
      }
      this.classList.add("active");
      // Callback
      if (onChange) onChange(this, e);
    });
  }

  // Erstes Aktiv setzten
  if (items.length && !container.querySelector(itemSelector + ".active")) {
    items[0].classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  //Aktive Klasse + Wechsel
  let aside = document.querySelector("aside");

  setupToggle(aside, "a", function (link) {
    showTab(link.getAttribute("href"));
  });

  // Start-Tab festlegen
  let startHref = location.hash || "#tab-farm";

  // Tab Anzeigen
  showTab(startHref);

  // NavLink visuell aktiv markieren
  let startLink = aside && aside.querySelector('a[href="' + startHref + '"]');
  if (startLink) startLink.classList.add("active");

  // Toolbar logik
  let toolBars = document.querySelectorAll(".toolbar, .toolbar-farm");
  for (let t = 0; t < toolBars.length; t++) {
    setupToggle(toolBars[t], "button");
  }
});



// Storage
// Speichern/Laden kapseln
const Storage = {
  KEY: "save",

  load() {
    // Holt den Stand oder DEFAULT
    const raw = localStorage.getItem(this.KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);

    try {
      return JSON.parse(raw);
    } catch {
      return structuredClone(DEFAULT_STATE);
    }
  },

  saved(state) {
    localStorage.setItem(this.KEY, JSON.stringify(state));
  },
};

// Globaler spielstand
let state = Storage.load();

// HUD Befüllen
function updateHUD() {
  const goldEl = document.querySelector("#hud-gold");
  const inventoryEl = document.querySelector("#hud-inventory");
  let totalItems = 0;

  // Schaue im inventar wenn kein wert nehme 0
  for (const amount of Object.values(state.inventory)) {
    totalItems += amount || 0;
  }

  if (goldEl) {
    goldEl.textContent = Math.floor(state.gold);
  }

  if (inventoryEl) {
    inventoryEl.textContent = totalItems;
  }
}

document.addEventListener("DOMContentLoaded", updateHUD);

// Testing Debug

// Game.state // Game.save() // console.log(Game.snapshot())
window.Game = {
  state,
  save() {
    Storage.save(state);
  },
  snapshot() {
    return JSON.stringify(state, null, 2);
  },
};
