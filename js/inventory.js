// Inventarverwaltung

// Funktion zum Anzeigen des Inventars
function renderInventory() {
  // Container für Items finden
  const container = document.getElementById("inv-list");
  if (!container) return;

  // Template für Items finden
  const template = document.getElementById("tpl-inventory-item");
  if (!template) return;

  container.innerHTML = "";

  // Für jedes mögliche Item
  for (const [itemId, item] of Object.entries(CONFIG.ITEMS)) {
    // Menge aus Spielstand holen
    const amount = window.state?.inventory[itemId] || 0;

    // Neue Karte erstellen
    const card = template.content.cloneNode(true);

    // Daten einfügen
    card.querySelector(".card").dataset.itemId = itemId;
    card.querySelector("[data-ref='itemName']").textContent = item.name;
    card.querySelector("[data-ref='icon']").src = item.icon;
    card.querySelector("[data-ref='stock']").textContent = amount;

    container.appendChild(card);
  }
}

// Item-Menge ändern
function updateItem(itemId, amount) {
  // Spielstand aktualisieren
  if (!window.state?.inventory) return;
  window.state.inventory[itemId] = amount;

  // Anzeige aktualisieren
  renderInventory();
  updateDisplay();
}

document.addEventListener("DOMContentLoaded", renderInventory);
window.Inventory = { render: renderInventory, update: updateItem };
