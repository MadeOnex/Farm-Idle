// Nur ein Spielstand
window.state = structuredClone(CONFIG.DEFAULT_STATE);

// Eine Update-Funktion
function updateDisplay() {
  // Prüfen ob Spielstand existiert
  if (!window.state) return;

  // 1. Gold anzeigen
  const goldDisplay = document.getElementById("hud-gold");
  if (goldDisplay) {
    goldDisplay.textContent = Math.floor(window.state.gold);
  }

  // 2. Inventar-Summe anzeigen
  const inventoryDisplay = document.getElementById("hud-inventory");
  if (inventoryDisplay) {
    let total = 0;
    // Alle Items zusammenzählen
    for (let amount of Object.values(window.state.inventory)) {
      total += Number(amount) || 0;
    }
    inventoryDisplay.textContent = total;
  }

  // 3. Detailliertes Inventar aktualisieren
  if (typeof renderInventory === "function") {
    renderInventory();
  }
}

// Spiel starten
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Spielstand laden
    const loadedState = await Storage.loadGameState();
    if (loadedState) {
      window.state = loadedState;
      updateDisplay();
    }
  } catch (err) {
    console.error("Fehler beim Laden:", err);
  }
});

// Speichern-Button
document.getElementById("btn-save")?.addEventListener("click", async () => {
  if (!window.state) return;
  const success = await Storage.saveGameState(window.state);
  if (success) {
    alert("Spielstand gespeichert!");
    updateDisplay();
  }
});

// Spiel-Funktionen
window.Game = {
  // Item hinzufügen
  addItem(itemId, amount) {
    if (!window.state.inventory[itemId]) {
      window.state.inventory[itemId] = 0;
    }
    window.state.inventory[itemId] += Number(amount);
    updateDisplay(); // Anzeige aktualisieren
    Storage.saveGameState(window.state); // Speichern
  },

  // Gold hinzufügen
  addGold(amount) {
    window.state.gold += Number(amount);
    updateDisplay(); // Anzeige aktualisieren
    Storage.saveGameState(window.state); // Speichern
  },

  // Manuelles Speichern
  save() {
    return Storage.saveGameState(window.state);
  },
};
