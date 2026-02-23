// Sample data structure for categories
const categories = [
  {
    name: "Games",
    wallpaper: "https://via.placeholder.com/1920x1080/1a1a2e/16c784?text=Games",
    apps: [
      {
        name: "Steam",
        type: "flatpak",
        id: "com.valvesoftware.Steam",
        website: "https://flathub.org/apps/com.valvesoftware.Steam",
        icon: "https://via.placeholder.com/64/FF6B35/FFFFFF?text=Steam"
      },
      {
        name: "Lutris",
        type: "flatpak",
        id: "net.lutris.Lutris",
        website: "https://flathub.org/apps/net.lutris.Lutris",
        icon: "https://via.placeholder.com/64/2196F3/FFFFFF?text=Lutris"
      },
      {
        name: "Proton-Plus",
        type: "flatpak",
        id: "com.github.Matoking.protontricks",
        website: "https://flathub.org/apps/com.github.Matoking.protontricks",
        icon: "https://via.placeholder.com/64/9C27B0/FFFFFF?text=Proton"
      }
    ]
  },
  {
    name: "Development",
    wallpaper: "https://via.placeholder.com/1920x1080/0f3460/e94560?text=Development",
    apps: [
      {
        name: "VS Code",
        type: "flatpak",
        id: "com.visualstudio.code",
        website: "https://flathub.org/apps/com.visualstudio.code",
        icon: "https://via.placeholder.com/64/0078D4/FFFFFF?text=VsCode"
      },
      {
        name: "GNOME Text Editor",
        type: "flatpak",
        id: "org.gnome.TextEditor",
        website: "https://flathub.org/apps/org.gnome.TextEditor",
        icon: "https://via.placeholder.com/64/4285F4/FFFFFF?text=Editor"
      },
      {
        name: "Git Kraken",
        type: "flatpak",
        id: "com.gitkraken.GitKraken",
        website: "https://flathub.org/apps/com.gitkraken.GitKraken",
        icon: "https://via.placeholder.com/64/179287/FFFFFF?text=GitKraken"
      }
    ]
  },
  {
    name: "Utilities",
    wallpaper: "https://via.placeholder.com/1920x1080/16213e/f4a261?text=Utilities",
    apps: [
      {
        name: "GNOME Settings",
        type: "flatpak",
        id: "org.gnome.Settings",
        website: "https://flathub.org/apps/org.gnome.Settings",
        icon: "https://via.placeholder.com/64/388E3C/FFFFFF?text=Settings"
      },
      {
        name: "Files",
        type: "flatpak",
        id: "org.gnome.Nautilus",
        website: "https://flathub.org/apps/org.gnome.Nautilus",
        icon: "https://via.placeholder.com/64/F57C00/FFFFFF?text=Files"
      },
      {
        name: "System Monitor",
        type: "binary",
        cmd: "gnome-system-monitor",
        icon: "https://via.placeholder.com/64/1976D2/FFFFFF?text=Monitor"
      }
    ]
  }
];

const categoryList = document.getElementById("category-list");
const appsGrid = document.getElementById("apps-grid");
const sidebar = document.getElementById("sidebar");
const contentArea = document.getElementById("content-area");
const contextMenu = document.getElementById("context-menu");
const infoToast = document.getElementById("info-toast");

// Track installation status of apps
const appStatus = {};
let currentContextApp = null;
let currentContextCard = null;

function showToast(message) {
  infoToast.textContent = message;
  infoToast.classList.add("show");
  setTimeout(() => {
    infoToast.classList.remove("show");
  }, 2000);
}

function updateCardStatus(card, status) {
  card.classList.remove("installed", "installing", "not-installed");
  card.classList.add(status);
}

function simulateInstallation(app, card) {
  if (appStatus[app.id] === "installing") return;

  updateCardStatus(card, "installing");
  appStatus[app.id] = "installing";
  card.style.pointerEvents = "none";
  card.style.opacity = "0.6";

  showToast(`Installing ${app.name}...`);

  // Simulate installation delay
  setTimeout(() => {
    updateCardStatus(card, "installed");
    appStatus[app.id] = "installed";
    card.style.pointerEvents = "auto";
    card.style.opacity = "1";
    showToast(`${app.name} installed! (Simulated)`);
  }, 3000);
}

function handleApp(app, card) {
  if (appStatus[app.id] === "installing") return;

  if (app.type === "flatpak") {
    const isInstalled = appStatus[app.id] === "installed";
    
    if (isInstalled) {
      showToast(`Launching ${app.name}... (Simulated - Web version)`);
    } else {
      simulateInstallation(app, card);
    }
  }

  if (app.type === "bash" || app.type === "binary") {
    showToast(`${app.cmd ? "Executing: " + app.cmd : "Running app"} (Simulated)`);
  }
}

function checkInstallation(app) {
  // For web version, we'll randomly set initial states for demo
  // In real app, this would check system
  return Math.random() > 0.5;
}

function updateCardContent(card, app) {
  let cardContent = "";
  if (app.icon) {
    cardContent = `<img src="${app.icon}" class="app-icon" alt="${app.name}" onerror="this.style.display='none'"><br>`;
  }
  cardContent += `<div class="app-name">${app.name}</div><div class="app-status"></div>`;
  card.innerHTML = cardContent;
}

function loadCategory(category) {
  document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${category.wallpaper}')`;

  appsGrid.innerHTML = "";

  category.apps.forEach(app => {
    const card = document.createElement("div");
    card.className = "app-card";
    
    updateCardContent(card, app);

    // Set initial installation status
    const isInstalled = checkInstallation(app);
    if (isInstalled) {
      appStatus[app.id] = "installed";
      updateCardStatus(card, "installed");
      card.style.opacity = "1";
    } else {
      appStatus[app.id] = "not-installed";
      updateCardStatus(card, "not-installed");
    }

    card.onclick = () => handleApp(app, card);

    card.oncontextmenu = (e) => {
      e.preventDefault();
      showContextMenu(e, app, card);
    };

    appsGrid.appendChild(card);
  });
}

function showContextMenu(event, app, card) {
  currentContextApp = app;
  currentContextCard = card;

  const openWebsiteBtn = document.getElementById("open-website-btn");
  const removeAppBtn = document.getElementById("remove-app-btn");

  // Update button visibility
  removeAppBtn.style.display = app.type === "flatpak" ? "block" : "none";

  openWebsiteBtn.onclick = () => {
    if (app.website) {
      window.open(app.website, "_blank");
    }
    contextMenu.classList.remove("show");
  };

  removeAppBtn.onclick = () => {
    if (appStatus[app.id] === "installed") {
      appStatus[app.id] = "not-installed";
      updateCardStatus(currentContextCard, "not-installed");
      showToast(`${app.name} removed (Simulated)`);
    }
    contextMenu.classList.remove("show");
  };

  contextMenu.style.left = event.clientX + "px";
  contextMenu.style.top = event.clientY + "px";
  contextMenu.classList.add("show");
}

function toggleSidebar() {
  sidebar.classList.toggle("collapsed");
  contentArea.classList.toggle("shifted");
}

function closeApp() {
  if (confirm("Close Flare Launcher?")) {
    window.close();
  }
}

// Populate category buttons
categories.forEach(cat => {
  const btn = document.createElement("button");
  btn.className = "category-btn";
  btn.innerHTML = `<span class="category-text">${cat.name}</span>`;
  btn.onclick = () => loadCategory(cat);
  categoryList.appendChild(btn);
});

// Close context menu on click outside
document.addEventListener("click", (e) => {
  if (!contextMenu.contains(e.target)) {
    contextMenu.classList.remove("show");
  }
});

// Load first category on startup
if (categories.length > 0) {
  loadCategory(categories[0]);
}
