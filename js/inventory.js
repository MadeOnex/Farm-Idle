// Inventar-Tab-Logik

// Rendert das Inventar-Grid aus dem Aktuellen Stand
// Annahmen
// - state.inventory ist ein Objekt: key -> Menge
// - config.items enthält für jeden key {name, icon}
// Verhalten
// Sicherheit bei Unbekannten Keys Überspringen
// - DOM wird neu Aufgebaut

function renderInventory() {

  const wrap = document.querySelector("#inv-list");
  const template = document.querySelector("#tpl-inventory-item");
  if (!wrap || !template) return;

  wrap.innerHTML = "";

  const entries = Object.entries(state.inventory);

  for (const pair of entries) {
    const key = pair[0];
    const qtyRaw = pair[1];
    const meta = CONFIG.ITEMS[key];
    if (!meta) {
      console.warn("Unbekanntes Item-Key im Inventar", key);
    }

    const node = template.content.firstElementChild.cloneNode(true);
    node.dataset.itemId = key;

    const nameEl = node.querySelector('[data-ref="itemName"]');
    const stockEl = node.querySelector('[data-ref="stock"]');
    const imgEl = node.querySelector('[data-ref="icon"]');

    if (nameEl) nameEl.textContent = meta.name;
    if (stockEl) stockEl.textContent = qtyRaw || 0;
    if (imgEl) {
      imgEl.src = meta.icon;
      imgEl.alt = meta.name;
    }

    wrap.appendChild(node);
  }
}

document.addEventListener("DOMContentLoaded", renderInventory);
