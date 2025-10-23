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
    const startButton = card.querySelector("button");
    const hasEnoughMaterial = canStartRecipe(recipe);

    startButton.disabled = !hasEnoughMaterial;
    startButton.onclick = () => startJob(recipeId);

    container.appendChild(card);
  }
}

function renderJobs() {
  const container = document.querySelector("#job-list");
  const template = document.querySelector("#tpl-job");
  const counter = document.querySelector(".jobs small");

  if (!container || !template) {
    console.log("Job-Container oder Template nicht gefunden");
    return;
  }

  container.innerHTML = "";
  let hasRunningJobs = false;

  // Jeden aktiven Job durchgehen
  for (let job of window.state.jobs) {
    const recipe = CONFIG.RECIPES[job.recipeId];

    if (!recipe) {
      console.error(`${job.recipeId} nicht gefunden`);
      continue;
    }

    const outputId = Object.keys(recipe.output)[0];
    const outputItem = CONFIG.ITEMS[outputId];

    const card = template.content.cloneNode(true);

    // Produkt-Info anzeigen
    card.querySelector("[data-ref='prodIcon']").src = outputItem.icon;
    card.querySelector("[data-ref='prodIcon']").alt = outputItem.name;
    card.querySelector("[data-ref='prodName']").textContent = outputItem.name;

    // Fortschritt berechnen
    // TODO: Wenn startjob

    // Fortschrittsbalken aktualisieren
    const progressBar = card.querySelector(".progress");
    progressBar.style.setProperty(".progress", `${percent}`);

    // Restzeit berechnen und anzeigen
    // TODO: nach startjob

    // Prüfen ob Job fertig ist
    // TODO nach startjob

    // Abbrechen-Button konfigurieren
    const cancelButton = card.querySelector("button");
    cancelButton.onclick = () => {
      if (confirm("Job wirklich abbrechen? Material ist verloren!")) {
        // TODO canceljob
      }
    };

    container.appendChild(card);
  }

  if (counter) {
    counter.textContent = `${window.state.length}/3`;
  }
}

function canStartRecipe() {
  // TODO v2: echtes limit ü Inventar prüfen
  return true;
}

function startJob(recipeId) {
  const recipe = CONFIG.RECIPES[recipeId];
  if (!recipeId) {
    console.error(`Rezept ${recipeId} existiert nicht`);
    return;
  }

const now = Date.now();
const newJob = {
  
}
  
}

document.addEventListener("DOMContentLoaded", renderRecipes);
