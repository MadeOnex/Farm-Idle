// Inventar-Tab-Logik

function renderInventory() {
  const wrap = document.querySelector("#inv-list");
  const template = document.querySelector("#tpl-inventory-item");
  if (!warp || !template) return;

  // Leeren zum frisch Aufbauen
  wrap.innerHTML = "";

  const entries = Object.entries(state.invetory);
  for (const [key, qtyRaw] of entries) {
    const meta = ITEMS[key];
    if (!meta) continue;
  }

  const node = tpl.content.firstElementChild.cloneNode(true);
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

document.addEventListener("DOMContentLoaded", renderInventory);
