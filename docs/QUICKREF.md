# Quick Reference

## Common Commands

### Development
```bash
make dev           # Run app in development mode
make build         # Prepare for production
make clean         # Clean artifacts
make help          # Show all commands
```

### Installation
```bash
sudo make install              # Install to /usr/local (default)
sudo make install PREFIX=/usr  # Install to /usr
flare                          # Run installed app
sudo make uninstall            # Remove installation
```

### npm Tasks
```bash
npm install                    # Install dependencies
npm start                      # Start Electron app
npm list                       # List installed packages
```

### File Locations
```bash
~/.config/flare/               # User config (not yet implemented)
/usr/local/lib/flare/          # Installation directory
/usr/local/share/applications/ # Desktop file
```

## Project Structure Quick Look

```
bin/flare           → Entry point executable
src/main.js         → Electron window & IPC
src/AppLauncher.js  → App launching logic
src/ui/index.html   → User interface
assets/*/config.json → App definitions
Makefile            → Build automation
package.json        → Node.js dependencies
```

## Configuration

### Adding an App

Edit `assets/CategoryName/config.json`:

```json
{
  "apps": [
    {
      "name": "App Name",
      "type": "flatpak",
      "id": "com.example.app",
      "website": "https://..."
    }
  ]
}
```

### App Types

| Type | Example |
|------|---------|
| flatpak | `"id": "com.valvesoftware.Steam"` |
| binary | `"cmd": "code"` |
| bash | `"script": "/path/to/script.sh"` |

### Adding Wallpaper

1. Create PNG image (1920x1080+)
2. Save to `assets/CategoryName/wallpaper.png`
3. Restart app

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `command not found: flare` | Run `which flare` or reinstall |
| Dependencies missing | Read `docs/DEPENDENCIES.md` |
| App won't launch | Check `make dev` for errors |
| Flatpak not working | Add Flathub: `sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo` |

## Documentation Map

| File | Purpose |
|------|---------|
| [README.md](../README.md) | Project overview |
| [docs/INSTALL.md](INSTALL.md) | Installation steps |
| [docs/DEPENDENCIES.md](DEPENDENCIES.md) | System requirements |
| [docs/ARCHITECTURE.md](ARCHITECTURE.md) | Code structure |
| [docs/DEVELOPMENT.md](DEVELOPMENT.md) | Dev setup |
| [docs/PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Directory layout |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | How to contribute |

## Next Steps

1. **Install dependencies**: Follow `docs/DEPENDENCIES.md` for your Linux distro
2. **Build the project**: `make build` 
3. **Run in dev mode**: `make dev`
4. **System install**: `sudo make install`
5. **Configure apps**: Edit `assets/*/config.json`

## Resources

- Electron: https://www.electronjs.org/
- Flatpak: https://flathub.org/
- GitHub: https://github.com/yourusername/flare
