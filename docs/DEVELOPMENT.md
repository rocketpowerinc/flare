# Development Guide

## Quick Start

```bash
git clone https://github.com/yourusername/flare.git
cd flare
npm install
make dev
```

## File Structure for Development

```
src/
├── main.js             # Electron main process - modify for window behavior
├── AppLauncher.js      # Application launcher logic
├── ui/
│   └── index.html      # HTML template - modify for UI changes
└── services/
    └── categoryService.js  # Data loading - modify to change config loading

assets/                # Category configurations
├── Games/config.json
├── Dev/config.json
└── Utilities/config.json
```

## Making Changes

### Changing the UI

Edit `src/ui/index.html`:
- CSS Styles: Modify the `<style>` block
- HTML: Modify the markup
- JavaScript: Import additional scripts in `<script>` tag

### Adding App Launch Types

In `src/AppLauncher.js`, the `handleApp()` function processes app types:

```javascript
function handleApp(app) {
  if (app.type === "flatpak") {
    // Flatpak launch logic
  }
  if (app.type === "bash") {
    // Script launch logic
  }
  if (app.type === "binary") {
    // Binary launch logic
  }
}
```

To add a new type, add a new condition here.

### Adding Categories

1. Create a new folder in `assets/`: `assets/MyCategory/`
2. Add `config.json` with app list
3. Add `wallpaper.png` (1920x1080+ PNG)
4. Restart the app

### Modifying Main Process

Edit `src/main.js` for:
- Window size/properties
- Menu items
- IPC handlers
- Application preferences

### Adding Dependencies

```bash
npm install <package> --save-dev
npm list                          # View installed packages
npm outdated                      # Check for updates
```

Update `package.json` after installing.

## Testing

```bash
# Run development mode
make dev

# Test installation
make build
sudo make install
flare

# Test uninstall
sudo make uninstall
```

## Debugging

### Enable DevTools

Modify `src/main.js`:
```javascript
function createWindow() {
  // ...
  win.webContents.openDevTools();
}
```

### View Console Output

```bash
make dev 2>&1 | tee debug.log
```

### Check App Paths

In `src/AppLauncher.js`:
```javascript
console.log("Category:", category);
console.log("Apps:", category.apps);
```

## Common Tasks

### Update Wallpaper

1. Create PNG image (1920x1080+)
2. Save as `assets/CategoryName/wallpaper.png`
3. Restart app

### Add Flatpak App

1. Find the Flatpak ID on [flathub.org](https://flathub.org)
2. Add to `assets/Category/config.json`:

```json
{
  "name": "App Name",
  "type": "flatpak",
  "id": "com.example.app",
  "website": "https://flathub.org/apps/com.example.app"
}
```

### Add Binary App

```json
{
  "name": "Code",
  "type": "binary",
  "cmd": "code"
}
```

### Add Custom Script

```json
{
  "name": "My Script",
  "type": "bash",
  "script": "/home/user/myapp/launcher.sh"
}
```

## Code Style

- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Keep functions focused and small
- Follow existing naming conventions

## Submitting Changes

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and test: `make dev`
3. Commit: `git commit -m 'Add: description'`
4. Push: `git push origin feature/my-feature`
5. Create Pull Request with description

## Troubleshooting Development

### "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port already in use (if using dev server)

```bash
lsof -i :3000  # Check what's using port
kill -9 PID    # Kill the process
```

### Electron not launching

Check Node.js version:
```bash
node --version  # Should be 18+
```

### Path issues in Linux

Use absolute paths in configs:
```json
"script": "/home/user/exact/path/to/script.sh"
```

## Performance Tips

- Minimize DOM manipulation in loops
- Use event delegation for many elements
- Keep background images under 5MB
- Profile with DevTools Performance tab

## Learning Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Flatpak Documentation](https://docs.flatpak.org/)

## Getting Help

- Check existing [Issues](https://github.com/yourusername/flare/issues)
- Read [ARCHITECTURE.md](ARCHITECTURE.md)
- Ask in [Discussions](https://github.com/yourusername/flare/discussions)

Happy developing! 🚀
