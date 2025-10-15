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



// Globaler Spielstand - hier werden alle Spieldaten gespeichert
window.state = structuredClone(CONFIG.DEFAULT_STATE);

// Wenn die Seite geladen ist, führe diese Funktionen aus
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Prüfe ob Templates verfügbar sind
        const inventoryTemplate = document.getElementById("tpl-inventory-item");
        if (!inventoryTemplate) {
            console.error("Inventory Template nicht gefunden!");
        }

        // Lade den Spielstand
        const loadedState = await Storage.loadGameState();
        window.state = loadedState;
        
        // UI aktualisieren
        updateHUD();
        renderInventory();
    } catch (err) {
        console.error("Fehler beim Laden:", err);
    }
});

// Einfache Funktion zum Neuladen der Seite
function reloadPage() {
    window.location.reload();
}

// Wenn der Speichern-Button geklickt wird
document.getElementById("btn-save")?.addEventListener("click", async () => {
    if (!window.state) return;
    
    // Speichere in Datenbank und lade neu
    const success = await Storage.saveGameState(window.state);
    if (success) {
        reloadPage();
    }
});

// Aktualisiert die Anzeige oben (Gold und Inventar)
function updateHUD() {
    if (!window.state) return;

    const goldEl = document.querySelector("#hud-gold");
    const inventoryEl = document.querySelector("#hud-inventory");
    
    // Zähle alle Items im Inventar
    let totalItems = 0;
    Object.values(window.state.inventory).forEach(amount => {
        totalItems += Number(amount) || 0;
    });

    // Aktualisiere die Anzeige
    if (goldEl) goldEl.textContent = Math.floor(window.state.gold);
    if (inventoryEl) inventoryEl.textContent = totalItems;
}

// Spielfunktionen die überall verfügbar sind
window.Game = {
    // Fügt Items zum Inventar hinzu
    addItem(itemId, amount) {
        if (!window.state.inventory[itemId]) {
            window.state.inventory[itemId] = 0;
        }
        window.state.inventory[itemId] += Number(amount);
        
        // Speichern und Seite neu laden
        Storage.saveGameState(window.state).then(() => {
            reloadPage();
        });
    },

    // Fügt Gold hinzu
    addGold(amount) {
        window.state.gold += Number(amount);
        
        // Speichern und Seite neu laden
        Storage.saveGameState(window.state).then(() => {
            reloadPage();
        });
    },

    // Speichert den Spielstand
    async save() {
        const success = await Storage.saveGameState(window.state);
        if (success) {
            reloadPage();
        }
        return success;
    }
};
