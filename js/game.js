// Globaler Spielstand
window.state = structuredClone(CONFIG.DEFAULT_STATE);

// Initialisierung
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Spielstand laden
        const loadedState = await Storage.loadGameState();
        window.state = loadedState;
        
        // UI aktualisieren
        updateHUD();
        renderInventory();
    } catch (err) {
        console.error("Fehler beim Laden:", err);
    }
});

// Seite neu laden
function reloadPage() {
    window.location.reload();
}

// Speichern-Button Handler
document.getElementById("btn-save")?.addEventListener("click", async () => {
    if (!window.state) return;
    const success = await Storage.saveGameState(window.state);
    if (success) {
        reloadPage();
    }
});

// HUD aktualisieren
function updateHUD() {
    if (!window.state) return;

    const goldEl = document.querySelector("#hud-gold");
    const inventoryEl = document.querySelector("#hud-inventory");
    
    let totalItems = 0;
    Object.values(window.state.inventory).forEach(amount => {
        totalItems += Number(amount) || 0;
    });

    if (goldEl) goldEl.textContent = Math.floor(window.state.gold);
    if (inventoryEl) inventoryEl.textContent = totalItems;
}

// Spielfunktionen
window.Game = {
    addItem(itemId, amount) {
        if (!window.state.inventory[itemId]) {
            window.state.inventory[itemId] = 0;
        }
        window.state.inventory[itemId] += Number(amount);
        Storage.saveGameState(window.state).then(reloadPage);
    },

    addGold(amount) {
        window.state.gold += Number(amount);
        Storage.saveGameState(window.state).then(reloadPage);
    },

    async save() {
        const success = await Storage.saveGameState(window.state);
        if (success) reloadPage();
        return success;
    }
};