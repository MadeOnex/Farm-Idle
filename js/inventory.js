// Inventar-Tab-Logik


function renderInventory() {
// Stellen holen
  const wrap = document.querySelector("#inv-list");
  const template = document.querySelector("#tpl-inventory-item");
  if (!wrap || !template) return;
  
  // Leeren zum frisch Aufbauen
  wrap.innerHTML = "";

  // Aktueller stand verwenden
  const entries = Object.entries(state.inventory);

  for (const [key, qtyRaw] of entries) {
    const meta = CONFIG.ITEMS[key];
  
    if (!meta) continue;
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

