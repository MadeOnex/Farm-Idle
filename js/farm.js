let selectedCrop = null;

function renderFields() {
  const fieldsContainer = document.getElementById("field-list");
  const fieldTemplate = document.getElementById("tpl-field");

  if (!fieldsContainer || !fieldTemplate) return;

  fieldsContainer.innerHTML = "";

  for (let i = 0; i < window.state.fields.length; i++) {
    const field = window.state.fields[i];
    const card = fieldTemplate.content.cloneNode(true);

    card.querySelector("[data-ref]='title']").textContent = `Field #${i + 1}`;

    if (field === null) {
      card.querySelector("[data-ref]='status'").textContent = "Leer";
      btn.textContent = "Saen";
      btn.onclick = () => plantField(i, selectedCrop);
    } else {
      const cropData = CONFIG.CROPS[field.crop];
      card.querySelector("[data-ref]='cropName'").textContent =
        CONFIG.ITEMS[field.crop].name;
      card.querySelector("[data-ref]='cropIcon'").src =
        CONFIG.ITEMS[field.crop].icon;

      // Fortschritt
      const now = Date.now();
      const elapsed = now - field.plantedAt;
      const total = field.harvestAt - field.plantedAt;
      const percent = Math.min(100, (elapsed / total) * 100);

      card.querySelector(".progress").dataset.value = Math.floor(percent);

      // Button
      if (now >= field.harvestAt) {
        const btn = card.querySelector("button");
        btn.textContent = "Ernten";
        btn.onclick = () => harvestField(i);
      } else {
        card.querySelector("button").disable = true;
      }
    }
  }

  fieldsContainer.appendChild(card);
}

document.addEventListener("DOMContentLoaded", renderFields);
window.Farm = {render: renderFields};