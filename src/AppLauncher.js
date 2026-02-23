const { exec } = require("child_process");
const { ipcRenderer } = require("electron");
const { getCategories } = require("./services/categoryService");

const categories = getCategories();
const categoryList = document.getElementById("category-list");
const appsGrid = document.getElementById("apps-grid");
const sidebar = document.getElementById("sidebar");
const contentArea = document.getElementById("content-area");

// Track installation status of apps
const appStatus = {};

function run(cmd) { exec(cmd); }

function checkInstallation(app) {
  return new Promise((resolve) => {
    if (app.type === "flatpak") {
      exec(`flatpak info ${app.id}`, (err) => {
        resolve(!err);
      });
    } else {
      resolve(true);
    }
  });
}

function updateCardStatus(card, status) {
  card.classList.remove("installed", "installing", "not-installed");
  card.classList.add(status);
}

function handleApp(app, card) {
  if (appStatus[app.id] === "installing") return;

  if (app.type === "flatpak") {
    exec(`flatpak info ${app.id}`, (err) => {
      if (err) {
        // App not installed, start installation
        updateCardStatus(card, "installing");
        appStatus[app.id] = "installing";
        card.style.pointerEvents = "none";
        card.style.opacity = "0.6";

        run(`flatpak install flathub ${app.id} -y`);
        setTimeout(() => {
          updateCardStatus(card, "installed");
          appStatus[app.id] = "installed";
          card.style.pointerEvents = "auto";
          card.style.opacity = "1";
          run(`flatpak run ${app.id}`);
        }, 4000);
      } else {
        // App already installed
        appStatus[app.id] = "installed";
        updateCardStatus(card, "installed");
        card.style.pointerEvents = "auto";
        card.style.opacity = "1";
        run(`flatpak run ${app.id}`);
      }
    });
  }

  if (app.type === "bash") run(`bash ${app.script}`);
  if (app.type === "binary") run(app.cmd);
}

function loadCategory(category) {
  const imgPath = category.wallpaper.replace(/\\/g, "/");
  document.body.style.backgroundImage =
    `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('file://${imgPath}')`;

  appsGrid.innerHTML = "";

  category.apps.forEach(app => {
    const card = document.createElement("div");
    card.className = "app-card";
    card.innerHTML = `<div class="app-name">${app.name}</div><div class="app-status"></div>`;

    // Check installation status
    checkInstallation(app).then(isInstalled => {
      if (isInstalled) {
        appStatus[app.id] = "installed";
        updateCardStatus(card, "installed");
        card.style.opacity = "1";
      } else {
        appStatus[app.id] = "not-installed";
        updateCardStatus(card, "not-installed");
      }
    });

    card.onclick = () => handleApp(app, card);

    card.oncontextmenu = (e) => {
      e.preventDefault();
      ipcRenderer.send("context-menu-extended", app);
    };

    appsGrid.appendChild(card);
  });
}

categories.forEach(cat => {
  const btn = document.createElement("button");
  btn.className = "category-btn";
  btn.innerHTML = `<span class="category-text">${cat.name}</span>`;
  btn.onclick = () => loadCategory(cat);
  categoryList.appendChild(btn);
});

window.toggleSidebar = () => {
  sidebar.classList.toggle("collapsed");
  contentArea.classList.toggle("shifted");
};

window.minimize = () => ipcRenderer.send("minimize");
window.toggleMax = () => ipcRenderer.send("toggle-maximize");
window.closeApp = () => ipcRenderer.send("close");

ipcRenderer.on("max-state", (e, isMax) => {
  document.getElementById("maxBtn").innerText = isMax ? "❐" : "▢";
});

if (categories.length > 0) loadCategory(categories[0]);
