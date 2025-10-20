// @ts-check

let selectedCrop = null;
let updateInterval = null;

function renderFields() {
  const fieldsContainer = document.querySelector("#field-list");
  const fieldTemplate = document.querySelector("#tpl-field");

  if (!fieldTemplate && !fieldsContainer) return;

  // Liste leeren
  fieldsContainer.innerHTML = "";
  let hasGrowingCrops = false;

  for (i = 0; i < window.state.fields.length; i++) {
    const field = window.state.fields[i];
    const card = fieldTemplate.content.cloneNode(true);

    // Titel
    card.querySelector("[data-ref='title]").textContent = `Field #${i + 1}`;

    const btn = card.querySelector("button");

    if (field === null) {
      card.querySelector("[data-ref='status']").textContent = "";
      card.querySelector("[data-ref='stats]").style.display = "none";
      btn.textContent = "Säen";
      btn.onclick = () => {
        plantField(i, selectedCrop);
      };
    } else {
      const cropData = CONFIG.CROPS[field.crop];
    }
  }
}
