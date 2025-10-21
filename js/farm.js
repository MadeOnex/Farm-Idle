let selectedCrop = null;
let updateInterval = null;

function renderFields() {
  const fieldsContainer = document.getElementById("field-list");
  const fieldTemplate = document.getElementById("tpl-field");

  if (!fieldsContainer || !fieldTemplate) return;

  fieldsContainer.innerHTML = "";
  let hasGrowingCrops = false;

  // Für jedes Feld
  for (let i = 0; i < window.state.fields.length; i++) {
    const field = window.state.fields[i];
    const card = fieldTemplate.content.cloneNode(true);

    // Titel setzen
    card.querySelector("[data-ref='title']").textContent = `Field #${i + 1}`;

    // Button-Element holen
    const btn = card.querySelector("button");

    // Ist Feld leer?
    if (field === null) {
      card.querySelector("[data-ref='status']").textContent = "Leer";
      card.querySelector("[data-ref='stats']").style.display = "none";
      btn.textContent = "Säen";
      btn.onclick = () => plantField(i, selectedCrop);
    } else {
      // Feld ist bepflanzt
      const cropData = CONFIG.CROPS[field.crop];

      card.querySelector("[data-ref='status']").style.display = "none";

      // Crop-Informationen
      card.querySelector("[data-ref='cropName']").textContent =
        CONFIG.ITEMS[field.crop].name;
      card.querySelector("[data-ref='cropIcon']").src =
        CONFIG.ITEMS[field.crop].icon;

      const timeInSeconds = Math.floor(cropData.time / 1000);
      card.querySelector(
        "[data-ref='stats']"
      ).textContent = `Wachstumszeit: ${timeInSeconds}s`;

      // Fortschritt berechnen
      const now = Date.now();
      const elapsed = now - field.plantedAt;
      const total = field.harvestAt - field.plantedAt;
      const percent = Math.min(100, (elapsed / total) * 100);

      const progressBar = card.querySelector(".progress");
      progressBar.style.setProperty("--progress", `${percent}%`);

      // Button-Status
      if (now >= field.harvestAt) {
        btn.textContent = "Ernten";
        btn.disabled = false;
        btn.onclick = () => harvestField(i);
      } else {
        hasGrowingCrops = true;
        const remaining = field.harvestAt - now;
        const remainingSeconds = Math.ceil(remaining / 1000);
        btn.textContent = `Wächst... (${remainingSeconds}s)`;
        btn.disabled = true;
      }
    }

    fieldsContainer.appendChild(card);
  }

  // Auto-Update Management
  if (hasGrowingCrops && !updateInterval) {
    // Starten wenn etwas wächst
    updateInterval = setInterval(renderFields, 1000);
  } else if (!hasGrowingCrops && updateInterval) {
    // Stoppen wenn fertig
    clearInterval(updateInterval);
    updateInterval = null;
  }
}

// Saat-Auswahl-Handler
document.querySelectorAll(".toolbar button[data-crop]").forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedCrop = btn.dataset.crop;
    document
      .querySelectorAll(".toolbar button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Feld-Kauf-Button
document.getElementById("btn-buy-field").addEventListener("click", buyFields);

document.addEventListener("DOMContentLoaded", renderFields);
window.Farm = { render: renderFields };

// Feld bepflanzen
function plantField(fieldIndex, cropId) {
  if (!cropId) {
    alert("Bitte erst Saat auswählen!");
    return;
  }

  if (window.state.fields[fieldIndex] !== null) {
    alert("Feld ist belegt!");
    return;
  }

  const now = Date.now();
  const growTime = CONFIG.CROPS[cropId].time;

  window.state.fields[fieldIndex] = {
    crop: cropId,
    plantedAt: now,
    harvestAt: now + growTime,
  };

  Storage.saveGameState(window.state);
  renderFields(); // Auto-Update startet automatisch
}

// Feld ernten
function harvestField(fieldIndex) {
  const field = window.state.fields[fieldIndex];
  if (!field || Date.now() < field.harvestAt) {
    alert("Noch nicht fertig!");
    return;
  }

  const yield = CONFIG.CROPS[field.crop].yield;

  for (const [itemId, amount] of Object.entries(yield)) {
    Gamepad.addItem(itemId, amount);
  }

  window.state.fields[fieldIndex] = null;
  Storage.saveGameState(window.state);
  renderFields(); // Auto-Update stoppt automatisch wenn alles fertig
}

// Felder erweitern
function buyFields() {
  const cost = 100;
  if (window.state.gold < cost) {
    alert("Nicht genug Gold!");
    return;
  }

  Game.addGold(-cost);
  window.state.fields.push(null);
  Storage.saveGameState(window.state);
  renderFields();
}
