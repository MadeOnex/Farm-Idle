//Process-Tab Verwaltung

let processInterval = null;

// Recipes anzeigen
function renderRecipes() {
  const container = document.getElementById("recipe-list");
  const template = document.getElementById("tpl-recipe");

  if (!container || !template) return;

  container.innerHTML = "";

  // Für jedes Rezept
  for (let [recipeId, recipe] of Object.entries(CONFIG.RECIPES)) {
    const card = template.content.cloneNode(true);

    // Input/Output IDs holen
    const inputId = recipe.inputItem;
    const outputId = recipe.outputItem;
    const inputAmount = recipe.inputAmount;
    const outputAmount = recipe.outputAmount;
    const timeSec = Math.floor(recipe.time / 1000);

    // Daten einfügen
    card.querrySelector("[data-ref='title'").textContent = `Rezept #${i + 1}`;
    card.querrySelector("[data-ref='subtitle'").textContent = "Weizen ";
  }
}
    