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
    const inputId = Object.keys(recipe.input)[0];
    const outputId = Object.keys(recipe.output)[0];
    const inputAmount = recipe.input[inputId];
    const timeSec = Math.floor(recipe.time / 1000);

    // Titel und Untertitel setzen
    const outputItem = CONFIG.ITEMS[outputId];
    const inputItem = CONFIG.ITEMS[inputId];

    // Titel Untertitel setzen
    card.querySelector(
      "[data-ref='title']"
    ).textContent = `${outputItem.name} Herstellen`;
    card.querySelector(
      "[data-ref='subtitle']"
    ).textContent = `${inputItem.name} zu ${outputItem.name} (${timeSec}s)`;

    // Produkt Icon und Name
    card.querySelector("[data-ref='outIcon']").src = outputItem.icon;
    card.querySelector("[data-ref='outIcon']").alt = outputItem.name;
    card.querySelector("[data-ref='outName']").textContent = outputItem.name;

    // Benötigte Menge (Kosten)
    card.querySelector("[data-ref='costAmount']").textContent = inputAmount;
    card.querySelector("[data-ref='costIcon']").src = inputItem.icon;
    card.querySelector("[data-ref='costIcon']").alt = inputItem.name;

    // Benötigte Menge (Inventar)
    const available = window.state.inventory[inputId] || 0;
    card.querySelector("[data-ref='available']").textContent = available;
    card.querySelector("[data-ref='availIcon']").src = inputItem.icon;
    card.querySelector("[data-ref='availIcon']").alt = inputItem.name;

    // // Start Button Konfig
    // const startButton = card.querySelector("button");
    // const hasEnoughMaterial = canStartRecipe(recipe);

    // // startButton.disabled = !hasEnoughMaterial;
    // // startButton.onclick = () => startJob(recipeId);

    container.appendChild(card);
  }
}

function renderJobs() {
  const container = document.querySelector("#job-list");
  const template = document.querySelector("#tpl-job");
  // Counter

  if (!container || !template) {
    console.log("Job-Container oder Template nicht gefunden");
    return;
  }

  container.innerHTML = "";
  let hasRunningJobs = false;

  // Jeden aktiven Job durchgehen
  for(let job of window.state.jobs) {
    const recipe = CONFIG.RECIPES[job.recipeId];

    
  }

}

document.addEventListener("DOMContentLoaded", renderRecipes);
