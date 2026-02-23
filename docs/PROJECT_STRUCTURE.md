# Project Structure Summary

## Complete Directory Layout

```
flare/
│
├── bin/
│   └── flare                          # Main executable wrapper script
│
├── src/
│   ├── main.js                        # Electron main process
│   ├── AppLauncher.js                 # App launching logic & UI interaction
│   ├── ui/
│   │   └── index.html                 # Main user interface
│   └── services/
│       └── categoryService.js         # Category/app data service
│
├── assets/                            # App categories & configurations
│   ├── Games/
│   │   ├── config.json                # App definitions
│   │   └── wallpaper.png              # Category background image
│   ├── Dev/
│   │   ├── config.json
│   │   └── wallpaper.png
│   └── Utilities/
│       ├── config.json
│       └── wallpaper.png
│
├── config/
│   └── flare.desktop                  # Desktop menu entry
│
├── docs/
│   ├── INSTALL.md                     # Installation guide
│   ├── DEPENDENCIES.md                # System dependencies
│   ├── ARCHITECTURE.md                # Project architecture
│   └── DEVELOPMENT.md                 # Developer guide
│
├── Makefile                           # Build automation
├── package.json                       # Node.js dependencies
├── README.md                          # Main documentation
├── CHANGELOG.md                       # Version history
├── CONTRIBUTING.md                    # Contribution guidelines
├── LICENSE                            # MIT License
└── .editorconfig                      # Editor settings
└── .gitignore                         # Git ignore patterns
```

## Key Files Explained

| File                              | Purpose                                                                  |
| --------------------------------- | ------------------------------------------------------------------------ |
| `bin/flare`                       | Executable entry point - handles dependency checks and launches Electron |
| `src/main.js`                     | Electron main process - window management, IPC handlers                  |
| `src/AppLauncher.js`              | Frontend logic - app launching, UI interactions                          |
| `src/ui/index.html`               | Single HTML page - UI markup and styling                                 |
| `src/services/categoryService.js` | Data layer - reads configs and returns category data                     |
| `assets/*/config.json`            | App definitions in JSON format                                           |
| `config/flare.desktop`            | Desktop application file for system integration                          |
| `Makefile`                        | Build targets: dev, build, install, uninstall, clean                     |
| `package.json`                    | Node.js dependencies (Electron)                                          |

## Build Targets (Makefile)

```bash
make dev           # Run in development mode (live editing)
make build         # Install dependencies for production
make install       # System-wide installation (requires sudo)
make uninstall     # Remove system installation
make clean         # Remove build artifacts
make help          # Show all available targets
```

## Installation Paths

When installed with `make install PREFIX=/usr/local`:

- Binary: `/usr/local/bin/flare`
- App files: `/usr/local/lib/flare/`
- Desktop entry: `/usr/local/share/applications/flare.desktop`
- Dependencies: Automatically installed via npm

## System Integration

Desktop file enables:

- Application menu integration
- Desktop shortcut creation
- System launcher discovery
- Application name/icon display

## Development Workflow

```bash
# 1. Setup
git clone <repo>
cd flare
npm install

# 2. Develop
make dev          # Launch with auto-reload

# 3. Test Installation
make build
sudo make install
flare             # Run installed version

# 4. Contribute
git checkout -b feature/my-feature
# ... make changes ...
git push origin feature/my-feature
# Create PR
```

## Comparison: Before vs After

### Before (Docker-based)

- Single bash script
- Docker dependency required
- Not truly native Linux
- Hard to debug and modify
- No standard build system

### After (Native Linux)

- ✅ Proper project structure
- ✅ No Docker required
- ✅ Native Linux application
- ✅ Easy to debug and extend
- ✅ Standard Makefile build system
- ✅ System package integration
- ✅ Comprehensive documentation
- ✅ Clear development path
