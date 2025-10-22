// Process-Tab Verwaltung

let processInterval = null;

// Rezepte anzeigen
function renderRecipes() {
  const container = document.querySelector("#recipe-list");
  const template = document.querySelector("#tpl-recipe");

  if (!container || !template) {
    console.log("Fehler beim Laden von Rezept oder Template");
    return;
  }

  container.innerHTML = "";

  // Für jedes Rezept durchgehen und anzeigen
  for (let [recipeId, recipe] of Object.entries(CONFIG.RECIPES)) {
    const card = template.content.cloneNode(true);

    // Zutaten und Produkt herausfinden
    const inputId = Object.keys(recipe.input[0]);
    const outputId = Object.keys(recipe.output[0]);
    const inputAmount = recipe.input[inputId];
    const timeSec = Math.floor(recipe.time / 1000);

    // Titel setzen
    const inputItem = CONFIG.ITEM[inputId];
    const outputItem = CONFIG.ITEM[outputId];

    card.querySelector(
      "[data-ref='titel']"
    ).textContent = `${outputItem.name} Herstellen`;
    card.querySelector(
      "[data-ref='subtitle']"
    ).textContent = `${inputItem.name} zu ${outputItem.name} (${timeSec}s)`;

card.querySelector("[data-ref='outIcon']").src = `${outputId.icon}`;


  }
}
