# Architecture

## Project Overview

Flare is a native Linux application launcher built with Electron. It organizes applications into categories and provides a modern, intuitive interface for launching them.

## Technology Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Node.js with Electron
- **Build System**: Make
- **Package Manager**: npm

## Core Components

### 1. Main Process (`src/main.js`)

- Handles window creation and Electron lifecycle
- Manages IPC (Inter-Process Communication) with renderer
- Provides context menu for app management (install/uninstall)
- Handles window chrome controls (minimize, maximize, close)

### 2. Renderer Process (`src/AppLauncher.js`)

- Loads category data from service
- Displays app grid UI
- Handles app launching via:
  - **Flatpak**: Uses `flatpak run` / `flatpak install`
  - **Binary**: Direct command execution
  - **Bash**: Script execution
- Manages sidebar toggle state

### 3. UI (`src/ui/index.html`)

- Single-page application with dynamic content
- Sidebar for category navigation
- Grid layout for app cards
- Top bar for window controls (frameless window)
- CSS handles state transitions (sidebar collapse, app hover effects)

### 4. Services (`src/services/categoryService.js`)

- Reads category directories from `assets/`
- Parses `config.json` files
- Provides category metadata (name, wallpaper, apps)
- Abstracts file system interactions

## Data Flow

```
User Click on Category
    ↓
AppLauncher.js receives click
    ↓
loadCategory() called
    ↓
Update background image
    ↓
Fetch apps from getCat egories()
    ↓
Render app cards in grid
```

## App Configuration

Each category has:
- **config.json**: List of apps with metadata
- **wallpaper.png**: Background image (1920x1080+)

Config structure:
```json
{
  "apps": [
    {
      "name": "Display name",
      "type": "flatpak|binary|bash",
      "id": "com.example.app",      // (flatpak only)
      "cmd": "binary-name",          // (binary only)
      "script": "/path/to/script",   // (bash only)
      "website": "https://..."       // (optional, for context menu)
    }
  ]
}
```

## Build System

### Makefile Targets

- **build**: Install npm dependencies
- **dev**: Run with Electron (development)
- **install**: Deploy to system directories
- **uninstall**: Remove system installation
- **clean**: Remove artifacts

### Installation Process

```
make install
    ↓
Copy src/ → /usr/local/lib/flare/src/
Copy assets/ → /usr/local/lib/flare/assets/
Copy node_modules/ → /usr/local/lib/flare/node_modules/
Copy bin/flare → /usr/local/bin/flare
Copy *.desktop → /usr/local/share/applications/
```

## File Organization

```
flare/
├── bin/
│   └── flare           # Executable wrapper
├── src/
│   ├── main.js         # Electron main
│   ├── AppLauncher.js  # App logic
│   ├── ui/
│   │   └── index.html  # UI
│   └── services/
│       └── categoryService.js  # Data access
├── assets/
│   ├── Games/
│   ├── Dev/
│   └── Utilities/
├── config/
│   └── flare.desktop   # Desktop integration
├── docs/
│   └── *.md            # Documentation
├── Makefile            # Build system
└── package.json        # Dependencies
```

## Process Model

### Single Instance

- One main process (Electron core)
- One renderer process (UI)
- Child processes for app launching via `exec()`

### IPC Communication

```
Renderer (UI)
    ↓ ipcRenderer.send()
    ↓
Main Process (Electron)
    ↓ ipcMain.on()
    ↓
Action (minimize, close, context menu)
```

## Performance Considerations

- **Categories are cached** at startup (not re-read per interaction)
- **Background images** use CSS transitions (GPU accelerated)
- **App launching** runs in child process (non-blocking)
- **Sidebar animations** use CSS transforms (performant)

## Future Architecture Considerations

- **Plugin system**: Allow third-party category providers
- **Database integration**: Store user preferences/recent launches
- **Theme engine**: Support custom themes beyond dark mode
- **Search functionality**: Full-text app search
- **Collections**: User-defined app groups across categories
