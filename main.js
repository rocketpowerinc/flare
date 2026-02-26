const { app, BrowserWindow, ipcMain, Menu, shell } = require("electron");
const path = require("path");
const { exec } = require("child_process");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 750,
    frame: false,
    backgroundColor: "#000000",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile(path.join(__dirname, "src/index.html"));
  // Open DevTools only when explicitly requested via env var
  if (process.env.OPEN_DEVTOOLS === "true") {
    try { win.webContents.openDevTools(); } catch (e) { /* ignore */ }
  }
}

app.whenReady().then(createWindow);

ipcMain.on("minimize", () => win.minimize());
ipcMain.on("toggle-maximize", () => {
  if (win.isMaximized()) win.unmaximize();
  else win.maximize();
  win.webContents.send("max-state", win.isMaximized());
});
ipcMain.on("close", () => win.close());

ipcMain.on("context-menu-extended", (event, data) => {
  const template = [
    {
      label: "Open Official Website",
      click: () => shell.openExternal(data.website)
    }
  ];

  if (data.type === "flatpak") {
    template.push({ type: "separator" });
    template.push({
      label: "Uninstall App",
      click: () => exec(`flatpak remove ${data.id} -y`)
    });
  }

  const menu = Menu.buildFromTemplate(template);
  menu.popup({ window: win });
});
