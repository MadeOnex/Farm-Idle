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
    const toolbars = document.querySelectorAll(".toolbar");
    
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
