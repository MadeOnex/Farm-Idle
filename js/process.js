// Process-Tab Verwaltung

// Globale Variable
let processInterval = null;

// Rezepte anzeigen
// Zeigt alle verfügbaren Rezepte aus CONFIG.RECIPES an.
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

    startButton.onclick = () => startJob(recipeId);

    container.appendChild(card);
  }
}

// Aktiv Jobs anzeigen
// Zeigt alle laufenden Job mit Fortschritt an.
// Aktualisiert sich jede Sekunde Automatisch.
// schließt fertige Jo automatisch ab.
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
      continue; // Damit nächster Job verarbeitet wird
    }

    // Was ist der Output angaben
    const outputId = Object.keys(recipe.output)[0];
    const outputItem = CONFIG.ITEMS[outputId];

    const card = template.content.cloneNode(true);

    // Produkt-Info anzeigen
    card.querySelector("[data-ref='prodIcon']").src = outputItem.icon;
    card.querySelector("[data-ref='prodIcon']").alt = outputItem.name;
    card.querySelector("[data-ref='prodName']").textContent = outputItem.name;

    // Fortschritt berechnen
    const now = Date.now();
    const elapsed = now - job.startedAt;
    const total = job.finishedAt - job.startedAt;
    const percent = Math.min(100, (elapsed / total) * 100); // Prozente max 100

    // Fortschrittsbalken aktualisieren
    const progressBar = card.querySelector(".progress");
    progressBar.style.setProperty("--progress", `${percent}%`);

    // Restzeit berechnen und anzeigen
    const remaining = Math.max(0, job.finishedAt - now);
    const remainingSeconds = Math.ceil(remaining / 1000);
    card.querySelector(
      "[data-ref='timeLeft']"
    ).textContent = `Noch ${remainingSeconds}s`;

    // Prüfen ob Job fertig ist
    if (now >= job.finishedAt) {
      // Job fertig -> Abschließen
      finishJob(job.id);
      continue;
    } else {
      // Job läuft noch
      hasRunningJobs = true;
    }

    // Abbrechen-Button konfigurieren
    const cancelButton = card.querySelector("button");
    cancelButton.onclick = () => {
      if (confirm("Job wirklich abbrechen? Material ist verloren!")) {
        cancelJob(job.id);
      }
    };

    container.appendChild(card);
  }

  // Job-Zähler aktuallisieren
  if (counter) {
    counter.textContent = `${window.state.jobs.length}/3`;
  }

  // Auto-Update start/stop
  if (hasRunningJobs && !processInterval) {
    // Jede Sekunde update
    processInterval = setInterval(renderJobs, 1000);
  } else if (!hasRunningJobs && processInterval) {
    clearInterval(processInterval);
    processInterval = null;
  }
}

// Prüfung ob rezept starten kann
function canStartRecipe(recipe) {
  // Prüfung Job-Limit (max. 3)
  if (window.state.jobs.length >= 3) {
    return false;
  }

  // Prüfen ob genug Material im Inventar
  for (const [itemId, neededAmount] of Object.entries(recipe.input)) {
    const availableAmount = window.state.inventory[itemId] || 0;

    if (availableAmount < neededAmount) {
      return false; // nicht Genug Material
    }
  }

  return true; // Genug Material Start mögliich
}

// neuen Job starten
function startJob(recipeId) {
  const recipe = CONFIG.RECIPES[recipeId];

  if (!recipe) {
    console.error(`Rezept ${recipeId} existiert nicht`);
    return;
  }

  // Prüfen ob Start möglich ist
  if (!canStartRecipe(recipe)) {
    alert("Nicht genug Material oder Job-Limit (3) erreicht!");
    return;
  }

  // Material aus dem Inventar abziehen
  for (const [itemId, amount] of Object.entries(recipe.input)) {
    window.state.inventory[itemId] -= amount;
  }

  // Neuen Job erstellen
  const now = Date.now();
  const newJob = {
    id: `job_${now}`, // Eindeutige Id
    recipeId: recipeId, // Welches Rezept
    startedAt: now, // Startzeit
    finishedAt: now + recipe.time, // Endzeit
    status: "running", // Status
  };

  // Job zur Liste hinzufügen
  window.state.jobs.push(newJob);

  // Spielstand speichern
  Storage.saveGameState(window.state);

  // Anzeige aktualisieren
  renderRecipes(); // Menge ändert sich
  renderJobs(); // Job neu rendern (neuer Job sichtbar)
}

// Job abschließen und Sachen ins Inventar hinzufügen
function finishJob(jobId) {
  // Job in der Liste finden
  const jobIndex = window.state.jobs.findIndex((j) => j.id === jobId);

  // jobInfex gibt -1 wenn nicht gefunden daher if
  if (jobIndex === -1) {
    console.warn(`Job ${jobId} nicht gefunden`);
    return;
  }

  // Job-Daten holen
  const job = window.state.jobs[jobIndex];
  const recipe = CONFIG.RECIPES[job.recipeId];

  // Produkt ins Inventar legen
  for (const [itemId, amount] of Object.entries(recipe.output)) {
    Game.addItem(itemId, amount);
  }

  // Job aus Liste entfernen
  window.state.jobs.splice(jobIndex, 1);

  // Speichern und neu Rendern
  Storage.saveGameState(window.state);
  renderRecipes();
  renderJobs();

  console.log(`Job ${jobId} abgeschlossen`);
}

// Job abbrechen
function cancelJob(jobId) {
  // Job aus liste ohne Output
  window.state.jobs = window.state.jobs.filter((j) => j.id !== jobId);

  // Speichern und neu Rendern
  Storage.saveGameState(window.state);
  renderRecipes();
  renderJobs();

  console.log(`Job ${jobId} abgebrochen`);
}

// Initialisierung
document.addEventListener("DOMContentLoaded", () => {
  // Tab-Button finden
  const processTab = document.querySelector("[data-tab='tab-process']");

  if (!processTab) {
    console.warn("Verarbeitung-Tab nicht gefunden");
    return;
  }

  // Event-Listener für Tab-Klick
  processTab.addEventListener("click", () => {
    // Rezepte und Job anzzeigen
    renderRecipes();
    renderJobs();

    // Fertige Jobs sofort abschließen
    const now = Date.now();
    const finishedJobs = [...window.state.jobs].filter(
      (job) => now >= job.finishedAt
    );

    // Alle fertigen Jobs abschließen
    for (let job of finishedJobs) {
      finishJob(job.id);
    }
  });
});

// Export
window.Process = {
  renderRecipes,
  renderJobs,
};
