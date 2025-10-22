let processInterval = null; // Timer für Auto-Update


// ==========================================
// REZEPTE ANZEIGEN
// ==========================================
function renderRecipes() {
  const container = document.getElementById("recipe-list");
  const template = document.getElementById("tpl-recipe");
  
  // Früher Abbruch falls Elemente fehlen
  if (!container || !template) {
    console.warn("Rezept-Container oder Template nicht gefunden");
    return;
  }

  // Alte Rezepte entfernen
  container.innerHTML = "";

  // Jedes Rezept durchgehen und anzeigen
  for (let [recipeId, recipe] of Object.entries(CONFIG.RECIPES)) {
    // Neue Karte aus Template erstellen
    const card = template.content.cloneNode(true);

    // Zutat und Produkt herausfinden
    const inputId = Object.keys(recipe.input)[0];  // z.B. "wheat"
    const outputId = Object.keys(recipe.output)[0]; // z.B. "flour"
    const inputAmount = recipe.input[inputId];      // z.B. 2
    const timeSec = Math.floor(recipe.time / 1000); // Zeit in Sekunden

    // Titel und Untertitel setzen
    const outputItem = CONFIG.ITEMS[outputId];
    const inputItem = CONFIG.ITEMS[inputId];
    
    card.querySelector("[data-ref='title']").textContent = 
      `${outputItem.name} herstellen`;
    
    card.querySelector("[data-ref='subtitle']").textContent = 
      `${inputItem.name} → ${outputItem.name} (${timeSec}s)`;

    // Produkt-Icon und Name
    card.querySelector("[data-ref='outIcon']").src = outputItem.icon;
    card.querySelector("[data-ref='outIcon']").alt = outputItem.name;
    card.querySelector("[data-ref='outName']").textContent = outputItem.name;

    // Benötigte Menge (Kosten)
    card.querySelector("[data-ref='costAmount']").textContent = inputAmount;
    card.querySelector("[data-ref='costIcon']").src = inputItem.icon;
    card.querySelector("[data-ref='costIcon']").alt = inputItem.name;

    // Verfügbare Menge im Inventar
    const available = window.state?.inventory[inputId] || 0;
    card.querySelector("[data-ref='available']").textContent = available;
    card.querySelector("[data-ref='availIcon']").src = inputItem.icon;
    card.querySelector("[data-ref='availIcon']").alt = inputItem.name;

    // Start-Button konfigurieren
    const startButton = card.querySelector("button");
    const hasEnoughMaterial = canStartRecipe(recipe);
    
    startButton.disabled = !hasEnoughMaterial;
    startButton.onclick = () => startJob(recipeId);
    
    // Visuelles Feedback wenn nicht genug Material
    if (!hasEnoughMaterial) {
      startButton.title = "Nicht genug Material oder Job-Limit erreicht";
    }

    // Karte zum Container hinzufügen
    container.appendChild(card);
  }
}

// ==========================================
// AKTIVE JOBS ANZEIGEN
// ==========================================
function renderJobs() {
  const container = document.getElementById("job-list");
  const template = document.getElementById("tpl-job");
  const counter = document.querySelector(".jobs small");
  
  if (!container || !template) {
    console.warn("Job-Container oder Template nicht gefunden");
    return;
  }

  // Alte Jobs entfernen
  container.innerHTML = "";
  let hasRunningJobs = false;

  // Jeden aktiven Job durchgehen
  for (let job of window.state.jobs) {
    // Rezept-Daten laden
    const recipe = CONFIG.RECIPES[job.recipeId];
    if (!recipe) {
      console.error(`Rezept ${job.recipeId} nicht gefunden`);
      continue;
    }
    
    const outputId = Object.keys(recipe.output)[0];
    const outputItem = CONFIG.ITEMS[outputId];

    // Neue Job-Karte erstellen
    const card = template.content.cloneNode(true);

    // Produkt-Info anzeigen
    card.querySelector("[data-ref='prodIcon']").src = outputItem.icon;
    card.querySelector("[data-ref='prodIcon']").alt = outputItem.name;
    card.querySelector("[data-ref='prodName']").textContent = outputItem.name;

    // Fortschritt berechnen (wie bei Farm-Feldern)
    const now = Date.now();
    const elapsed = now - job.startedAt;        // Bereits vergangene Zeit
    const total = job.finishAt - job.startedAt;  // Gesamt-Zeit
    const percent = Math.min(100, (elapsed / total) * 100); // Prozent (max 100%)

    // Fortschrittsbalken aktualisieren
    const progressBar = card.querySelector(".progress");
    progressBar.style.setProperty("--progress", `${percent}%`);

    // Restzeit berechnen und anzeigen
    const remaining = Math.max(0, job.finishAt - now);
    const remainingSeconds = Math.ceil(remaining / 1000);
    card.querySelector("[data-ref='timeLeft']").textContent = `Noch ${remainingSeconds}s`;

    // Prüfen ob Job fertig ist
    if (now >= job.finishAt) {
      // Job ist fertig → sofort abschließen
      finishJob(job.id);
      continue; // Nächsten Job anzeigen
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

    // Karte zum Container hinzufügen
    container.appendChild(card);
  }

  // Job-Zähler aktualisieren (z.B. "2/3")
  if (counter) {
    counter.textContent = `${window.state.jobs.length}/3`;
  }

  // Auto-Update starten/stoppen
  if (hasRunningJobs && !processInterval) {
    // Jobs laufen → Timer starten (jede Sekunde aktualisieren)
    processInterval = setInterval(renderJobs, 1000);
  } else if (!hasRunningJobs && processInterval) {
    // Alle Jobs fertig → Timer stoppen
    clearInterval(processInterval);
    processInterval = null;
  }
}

// ==========================================
// PRÜFEN OB REZEPT GESTARTET WERDEN KANN
// ==========================================
function canStartRecipe(recipe) {
  // 1. Prüfen: Job-Limit (maximal 3 gleichzeitige Jobs)
  if (window.state.jobs.length >= 3) {
    return false;
  }

  // 2. Prüfen: Genug Material im Inventar?
  for (let [itemId, neededAmount] of Object.entries(recipe.input)) {
    const availableAmount = window.state.inventory[itemId] || 0;
    
    if (availableAmount < neededAmount) {
      return false; // Nicht genug Material
    }
  }

  return true; // Alles OK
}

// ==========================================
// NEUEN JOB STARTEN
// ==========================================
function startJob(recipeId) {
  const recipe = CONFIG.RECIPES[recipeId];
  
  // Sicherheits-Check
  if (!recipe) {
    console.error(`Rezept ${recipeId} existiert nicht`);
    return;
  }
  
  // Prüfen ob Start möglich ist
  if (!canStartRecipe(recipe)) {
    alert("Nicht genug Material oder Job-Limit (3) erreicht!");
    return;
  }

  // Material vom Inventar abziehen
  for (let [itemId, amount] of Object.entries(recipe.input)) {
    window.state.inventory[itemId] -= amount;
  }

  // Neuen Job erstellen
  const now = Date.now();
  const newJob = {
    id: `job_${now}`,           // Eindeutige ID
    recipeId: recipeId,         // Welches Rezept
    startedAt: now,             // Startzeit
    finishAt: now + recipe.time, // Endzeit
    status: "running"           // Status
  };

  // Job zur Liste hinzufügen
  window.state.jobs.push(newJob);
  
  // Spielstand speichern
  Storage.saveGameState(window.state);
  
  // Anzeige aktualisieren
  renderRecipes(); // Rezepte neu rendern (verfügbare Menge ändert sich)
  renderJobs();    // Jobs neu rendern (neuer Job sichtbar)
  updateDisplay(); // HUD aktualisieren
}

// ==========================================
// JOB ABSCHLIESSEN (FERTIG)
// ==========================================
function finishJob(jobId) {
  // Job in der Liste finden
  const jobIndex = window.state.jobs.findIndex(j => j.id === jobId);
  
  if (jobIndex === -1) {
    console.warn(`Job ${jobId} nicht gefunden`);
    return;
  }

  // Job-Daten holen
  const job = window.state.jobs[jobIndex];
  const recipe = CONFIG.RECIPES[job.recipeId];

  // Produkt ins Inventar legen
  for (let [itemId, amount] of Object.entries(recipe.output)) {
    Game.addItem(itemId, amount);
  }

  // Job aus der Liste entfernen
  window.state.jobs.splice(jobIndex, 1);
  
  // Speichern und neu rendern
  Storage.saveGameState(window.state);
  renderRecipes();
  renderJobs();
  
  console.log(`Job ${jobId} abgeschlossen!`);
}

// ==========================================
// JOB ABBRECHEN (MANUELL)
// ==========================================
function cancelJob(jobId) {
  // Job aus der Liste entfernen (ohne Output)
  window.state.jobs = window.state.jobs.filter(j => j.id !== jobId);
  
  // Speichern und neu rendern
  Storage.saveGameState(window.state);
  renderRecipes();
  renderJobs();
  
  console.log(`Job ${jobId} abgebrochen`);
}

// ==========================================
// INITIALISIERUNG
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Tab-Navigation für Verarbeitung finden
  const processTab = document.querySelector('[data-tab="tab-process"]');
  
  if (!processTab) {
    console.warn("Verarbeitungs-Tab nicht gefunden");
    return;
  }
  
  // Event-Listener für Tab-Klick
  processTab.addEventListener("click", () => {
    console.log("Verarbeitungs-Tab geöffnet");
    
    // Rezepte und Jobs anzeigen
    renderRecipes();
    renderJobs();
    
    // Bonus: Fertige Jobs sofort abschließen
    const now = Date.now();
    const finishedJobs = [...window.state.jobs].filter(job => now >= job.finishAt);
    
    for (let job of finishedJobs) {
      finishJob(job.id);
    }
  });
});

// ==========================================
// EXPORT FÜR ANDERE MODULE
// ==========================================
window.Process = { 
  renderRecipes, 
  renderJobs 
};