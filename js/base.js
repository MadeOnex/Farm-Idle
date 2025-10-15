// Tab System
function showTab(tabId) {
    // Alle Tabs ausblenden
    const sections = document.querySelectorAll("section[data-tab]");
    sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('is-active');
    });

    // Gewählten Tab anzeigen
    const target = document.querySelector(`section[data-tab="${tabId}"]`);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('is-active');
    }
}

// Navigation Setup
function setupNavigation() {
    const navItems = document.querySelectorAll(".nav a[data-tab]");
    
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Aktive Klasse setzen
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
            
            // Tab anzeigen
            showTab(item.dataset.tab);
        });
    });

    // Start-Tab festlegen
    const startTab = location.hash.slice(1) || "tab-farm";
    const startNav = document.querySelector(`[data-tab="${startTab}"]`);
    
    if (startNav) {
        startNav.classList.add("active");
        showTab(startTab);
    }
}

// Toolbar Setup
function setupToolbar() {
    const toolbars = document.querySelectorAll(".toolbar, .toolbar-farm");
    
    toolbars.forEach(toolbar => {
        const buttons = toolbar.querySelectorAll("button");
        
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                buttons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
            });
        });
    });
}

// Initialisierung
document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupToolbar();
});

// Global verfügbar machen
window.UI = {
    showTab,
    setupNavigation,
    setupToolbar
};

// // Globaler Spielstand - hier werden alle Spieldaten gespeichert
// window.state = structuredClone(CONFIG.DEFAULT_STATE);

// // Wenn die Seite geladen ist, führe diese Funktionen aus
// document.addEventListener("DOMContentLoaded", async () => {
//     try {
//         // Prüfe ob Templates verfügbar sind
//         const inventoryTemplate = document.getElementById("tpl-inventory-item");
//         if (!inventoryTemplate) {
//             console.error("Inventory Template nicht gefunden!");
//         }

//         // Lade den Spielstand
//         const loadedState = await Storage.loadGameState();
//         window.state = loadedState;
        
//         // UI aktualisieren
//         updateHUD();
//         renderInventory();
//     } catch (err) {
//         console.error("Fehler beim Laden:", err);
//     }
// });

// // Einfache Funktion zum Neuladen der Seite
// function reloadPage() {
//     window.location.reload();
// }

// // Wenn der Speichern-Button geklickt wird
// document.getElementById("btn-save")?.addEventListener("click", async () => {
//     if (!window.state) return;
    
//     // Speichere in Datenbank und lade neu
//     const success = await Storage.saveGameState(window.state);
//     if (success) {
//         reloadPage();
//     }
// });

// // Aktualisiert die Anzeige oben (Gold und Inventar)
// function updateHUD() {
//     if (!window.state) return;

//     const goldEl = document.querySelector("#hud-gold");
//     const inventoryEl = document.querySelector("#hud-inventory");
    
//     // Zähle alle Items im Inventar
//     let totalItems = 0;
//     Object.values(window.state.inventory).forEach(amount => {
//         totalItems += Number(amount) || 0;
//     });

//     // Aktualisiere die Anzeige
//     if (goldEl) goldEl.textContent = Math.floor(window.state.gold);
//     if (inventoryEl) inventoryEl.textContent = totalItems;
// }

// // Spielfunktionen die überall verfügbar sind
// window.Game = {
//     // Fügt Items zum Inventar hinzu
//     addItem(itemId, amount) {
//         if (!window.state.inventory[itemId]) {
//             window.state.inventory[itemId] = 0;
//         }
//         window.state.inventory[itemId] += Number(amount);
        
//         // Speichern und Seite neu laden
//         Storage.saveGameState(window.state).then(() => {
//             reloadPage();
//         });
//     },

//     // Fügt Gold hinzu
//     addGold(amount) {
//         window.state.gold += Number(amount);
        
//         // Speichern und Seite neu laden
//         Storage.saveGameState(window.state).then(() => {
//             reloadPage();
//         });
//     },

//     // Speichert den Spielstand
//     async save() {
//         const success = await Storage.saveGameState(window.state);
//         if (success) {
//             reloadPage();
//         }
//         return success;
//     }
// };
