const Storage = {
    // Lädt Spielstand aus der Datenbank
    async loadGameState() {
        try {
            const response = await fetch("./php/load_save.php");
            if (!response.ok) throw new Error("Load failed");
            const data = await response.json();
            return data || structuredClone(CONFIG.DEFAULT_STATE);
        } catch (err) {
            console.error("Ladefehler:", err);
            return structuredClone(CONFIG.DEFAULT_STATE);
        }
    },

    // Speichert Spielstand in der Datenbank
    async saveGameState(state) {
        try {
            const response = await fetch("./php/save.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(state)
            });
            
            if (!response.ok) throw new Error("Speichern fehlgeschlagen");
            return true;
        } catch (err) {
            console.error("Speicherfehler:", err);
            return false;
        }
    }
};

// Mache Storage überall verfügbar
window.Storage = Storage;

