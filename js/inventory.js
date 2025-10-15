// Inventar-Tab-Logik

// Rendert das Inventar-Grid aus dem Aktuellen Stand
// Annahmen
// - state.inventory ist ein Objekt: key -> Menge
// - config.items enthält für jeden key {name, icon}
// Verhalten
// Sicherheit bei Unbekannten Keys Überspringen
// - DOM wird neu Aufgebaut

// State Management für Inventory
function renderInventoryItem(container, itemId, amount) {
    const item = CONFIG.ITEMS[itemId];
    if (!item) return;

    const tpl = document.getElementById("tpl-inventory-item");
    if (!tpl) return;

    const clone = tpl.content.cloneNode(true);
    const card = clone.querySelector(".card");
    
    // HTML Struktur für Inventory Item
    card.innerHTML = `
        <h3>${item.name}</h3>
        <div class="row">
            <img class="icon" src="${item.icon}" alt="${item.name}">
            <span>Bestand: <b>${amount || 0}</b></span>
        </div>
    `;
    
    card.dataset.itemId = itemId;
    container.appendChild(card);
}

// Funktion zum Anzeigen des Inventars
function renderInventory() {
    // Debug-Ausgaben hinzufügen
    console.log("Rendering inventory...");
    
    // Hole wichtige HTML Elemente
    const container = document.getElementById("inv-list");
    if (!container) {
        console.error("Container #inv-list nicht gefunden!");
        return;
    }

    const template = document.getElementById("tpl-inventory-item");
    if (!template) {
        console.error("Template #tpl-inventory-item nicht gefunden!");
        // Debug: Alle verfügbaren Templates anzeigen
        const templates = document.querySelectorAll('template');
        console.log("Verfügbare Templates:", templates);
        return;
    }

    if (!window.state) {
        console.error("State nicht verfügbar!");
        return;
    }

    // Lösche alte Anzeige
    container.innerHTML = "";

    // Gehe durch alle möglichen Items
    Object.entries(CONFIG.ITEMS).forEach(([itemId, item]) => {
        // Hole Anzahl aus Spielstand
        const amount = window.state.inventory[itemId] || 0;

        // Erstelle neue Item-Karte
        const clone = template.content.cloneNode(true);
        
        // Fülle die Karte mit Daten
        const card = clone.querySelector(".card");
        const title = clone.querySelector("[data-ref='itemName']");
        const icon = clone.querySelector("[data-ref='icon']");
        const stock = clone.querySelector("[data-ref='stock']");

        card.dataset.itemId = itemId;
        title.textContent = item.name;
        icon.src = item.icon;
        icon.alt = item.name;
        stock.textContent = amount;

        // Füge Karte zum Container hinzu
        container.appendChild(clone);
    });
}

// Funktion zum Aktualisieren eines einzelnen Items
function updateInventoryItem(itemId, amount) {
    if (!state) return;
    state.inventory[itemId] = amount;
    renderInventory();
    updateHUD();
}

// Initial rendern und bei Änderungen
document.addEventListener("DOMContentLoaded", () => {
    // Warte auf das Laden der Daten
    Storage.loadGameState().then(loadedState => {
        state = loadedState;
        renderInventory();
        updateHUD();
    });
});

// Funktionen global verfügbar machen
window.Inventory = {
    render: renderInventory,
    update: updateInventoryItem
};
