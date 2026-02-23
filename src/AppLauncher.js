const { exec } = require("child_process");
const { ipcRenderer } = require("electron");
const { getCategories } = require("./services/categoryService");

const categories = getCategories();
const categoryList = document.getElementById("category-list");
const appsGrid = document.getElementById("apps-grid");
const sidebar = document.getElementById("sidebar");
const contentArea = document.getElementById("content-area");

function run(cmd) { exec(cmd); }

function handleApp(app) {
  if (app.type === "flatpak") {
    exec(`flatpak info ${app.id}`, (err) => {
      if (err) {
        run(`flatpak install flathub ${app.id} -y`);
        setTimeout(() => run(`flatpak run ${app.id}`), 4000);
      } else {
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
    card.innerHTML = `<div>${app.name}</div>`;

    card.onclick = () => handleApp(app);

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
