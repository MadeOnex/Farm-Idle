const Storage = {
  // Spielstand laden
  loadGameState: async function () {
    try {
      const response = await fetch("./php/load_save.php");

      if (!response.ok) {
        console.error("Laden fehlgeschlagen");
        return this.getDefaultState();
      }

      // Wandle in JSON um
      const data = await response.json();

      return data || this.getDefaultState();
    } catch (error) {
      console.error("Fehler beim Laden:", error);
      return this.getDefaultState();
    }
  },

  // Spielstand speichern
  saveGameState: async function (gameState) {
    try {
      const response = await fetch("./php/save.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameState),
      });

      if (!response.ok) {
        console.error("Speichern fehlgeschlagen");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      return false;
    }
  },

  // Hilfsfunktion für Standardwerte
  getDefaultState: function () {
    return structuredClone(CONFIG.DEFAULT_STATE);
  },
};

window.Storage = Storage;
