// Markt-Tab Verwaltung (Vereinfacht)

// Markt-Items rendern
function renderMarket() {
  const container = document.querySelector("#tab-markt .grid");
  const template = document.querySelector("#tpl-market-item");

  if (!container || !template) {
    console.error("Markt-Container oder Template nicht gefunden");
    return;
  }

  // Container leeren
  container.innerHTML = "";

  // Für jedes Item eine Karte erstellen
  for (const [itemId, item] of Object.entries(CONFIG.ITEMS)) {
    const stock = window.state.inventory[itemId] || 0;
    const price = item.basePrice;

    const card = template.content.cloneNode(true);

    // Daten einfügen
    card.querySelector(".card").dataset.itemId = itemId;
    card.querySelector("[data-ref='itemName']").textContent = item.name;
    card.querySelector("[data-ref='icon']").src = item.icon;
    card.querySelector("[data-ref='icon']").alt = item.name;
    card.querySelector("[data-ref='price']").textContent = price.toFixed(2);
    card.querySelector("[data-ref='stock']").textContent = stock;

    const qtyInput = card.querySelector("[data-ref='qty']");
    qtyInput.max = stock;
    qtyInput.value = Math.min(1, stock);

    const sellButton = card.querySelector("[data-action='sell']");

    // Button deaktivieren wenn kein Bestand
    if (stock <= 0) {
    //   sellButton.disabled = true;
      qtyInput.disabled = true;
    } else {
      sellButton.onclick = () => {
        const qty = parseInt(qtyInput.value) || 0;
        sellItem(itemId, qty);
      };
    }

    container.appendChild(card);
  }
}

// Item verkaufen
function sellItem(itemId, quantity) {
  const stock = window.state.inventory[itemId] || 0;

  // Validierung
  if (quantity <= 0) {
    alert("Bitte eine gültige Menge eingeben!");
    return;
  }

  if (quantity > stock) {
    alert("Nicht genug auf Lager!");
    return;
  }

  // Preis berechnen
  const price = CONFIG.ITEMS[itemId].basePrice;
  const totalEarnings = price * quantity;

  // Verkauf durchführen
  window.state.inventory[itemId] -= quantity;
  Game.addGold(totalEarnings);

  // Speichern und neu rendern
  Storage.saveGameState(window.state);
  renderMarket();
  updateDisplay();

  console.log(
    `${quantity}x ${CONFIG.ITEMS[itemId].name} für ${totalEarnings.toFixed(2)}G verkauft`
  );
}

// Initialisierung
document.addEventListener("DOMContentLoaded", () => {
  const marketTab = document.querySelector("[data-tab='tab-markt']");

  if (!marketTab) {
    console.warn("Markt-Tab nicht gefunden");
    return;
  }

  // Event-Listener für Tab-Klick
  marketTab.addEventListener("click", () => {
    renderMarket();
  });
});

// Export
window.Market = {
  render: renderMarket,
  sell: sellItem,
};