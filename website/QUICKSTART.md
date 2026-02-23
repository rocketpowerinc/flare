# Quick Start Guide

## Option 1: Direct Browser Opening (Easiest)
1. Navigate to the `website` folder
2. Double-click `index.html` to open in your default browser
3. Enjoy!

## Option 2: Local Web Server (Recommended)

### Using Python 3:
```bash
cd website
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser

### Using Python 2:
```bash
cd website
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser

### Using Node.js:
```bash
cd website
npx http-server
```

### Using php:
```bash
cd website
php -S localhost:8000
```

## What to Expect

1. The app loads with a default category displayed
2. Apps are randomly marked as "installed" or "not installed" on each refresh
3. Clicking an app shows a toast notification (simulating install/launch)
4. Right-clicking shows a context menu
5. Installing apps triggers a 3-second loading animation
6. Toggle the hamburger menu (☰) to collapse/expand the sidebar

## Interactive Features to Try

- **Hover over cards** - See smooth animations and hover effects
- **Click hamburger menu** - Toggle sidebar collapse
- **Right-click app** - View context menu
- **Click an uninstalled app** - Watch the installation animation
- **Click Install button (in context menu after install)** - Simulate removal

## Notes for Development

This version uses placeholder images from via.placeholder.com. To use real icons:
1. Download or add icon files to `assets/Games/`, `assets/Dev/`, `assets/Utilities/`
2. Update the `icon` paths in `app.js` to point to local files
3. Re-run the server if needed

## Troubleshooting

**Icons not showing?**
- Check browser console for errors (F12)
- Ensure you're serving via web server, not opening as file://

**Context menu not working?**
- Make sure right-click is not blocked by browser
- Try a different browser if issues persist

**Layout looks broken?**
- Resize the window
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser
