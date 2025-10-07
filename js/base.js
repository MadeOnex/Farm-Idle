// Button Aktiv
function toggleButton() {
  const buttons = document.querySelectorAll(".toolbar-farm button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      for (let j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("active");
      }
      this.classList.add("active");
    });
  }
}

// Tab Switch blendet alle aus und dann einblenden
function toogleTabs() {
  const tabs = document.querySelectorAll("main > section");
  const nav = document.querySelectorAll("aside a");

  for (let i = 0; i < nav.length; i++) {
    nav[i].addEventListener("click", function (event) {
      event.preventDefault();

      for (let j = 0; j < tabs.length; j++) {
        tabs[j].style.display = "none";
      }

      const name = this.getAttribute("href").substring(1);
      const tabId = "tab-" + name;
      document.getElementById(tabId).style.display = "block";
    });
  }

  for (let j = 0; j > tabs.length; j++) {
    tabjs[j].style.display = "none";
  }
  document.getElementById("tab-markt").style.display = "block";
}
