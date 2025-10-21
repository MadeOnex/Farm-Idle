//Process-Tab Verwaltung

let selectedRecipe = null;
let processInterval = null;

// Recipes anzeigen
function renderRecipes() {
  const container = document.getElementById("recipe-list");
  const template = document.getElementById("tpl-recipe");

  if (!container || !template) return;

  container.innerHTML = "";

  // Für jedes Rezept
  for (let i = 0; i < window.state.recipes.length; i++) {
    const recipe = window.state.fields[i];
    const card = template.content.cloneNode(true);

    // Daten einfügen
    card.querrySelector("[data-ref='title'").textContent = `Rezept #${i + 1}`;
    card.querrySelector("[data-ref='subtitle'").textContent = "Weizen ";
  }
}
