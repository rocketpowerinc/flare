# Flare - Website Version

This is a web-based version of the Flare launcher app. It maintains the same UI/UX as the Electron app but runs in a web browser.

## Features

- **Category-based app organization** - Browse apps organized by categories (Games, Development, Utilities)
- **Visual installation status** - Color-coded indicators showing installed, not installed, or installing apps
- **Responsive grid layout** - Auto-fill grid that adapts to different screen sizes
- **Context menu** - Right-click to open official websites or remove apps
- **Smooth animations** - Loading spinner and hover effects
- **Simulated operations** - Installation and app launching are simulated for web environment

## Getting Started

1. Open `index.html` in your web browser or serve it with a local web server
2. Click on a category in the sidebar to view apps
3. Click on an app card to simulate launching/installing
4. Right-click an app to see context menu options

## File Structure

```
website/
├── index.html       # Main HTML file with styling
├── app.js          # Application logic and state management
├── README.md       # This file
└── assets/         # Asset files (optional for actual icons/wallpapers)
    ├── Games/
    ├── Dev/
    └── Utilities/
```

## How It Differs from the Electron App

- **No system commands** - App launching and installation are simulated
- **Sample data** - Uses placeholder images and sample categories
- **Browser-based context menu** - Works with browser right-click
- **No Electron dependencies** - Pure HTML/CSS/JavaScript
- **No file system access** - Can't access real system files

## Customization

### Adding Your Own Apps

Edit the `categories` array in `app.js` to add your own apps:

```javascript
{
  name: "Your App",
  type: "flatpak",
  id: "com.example.app",
  website: "https://example.com",
  icon: "path/to/icon.png"
}
```

### Changing Colors or Layout

Modify the CSS in the `<style>` section of `index.html` to customize the appearance.

### Loading Real Config Files

To use the actual config files from the main Flare app:
1. Copy config files from `../assets/` to `assets/` folder
2. Modify `app.js` to load configs via fetch API instead of hardcoded data

## Browser Compatibility

Works on all modern browsers (Chrome, Firefox, Safari, Edge). Requires ES6 support.

## Testing Tips

- **Refresh button** - Click the refresh button in the top-right to test
- **Simulate installation** - Click not-installed apps to see the installation animation
- **Context menu** - Right-click apps to see available options
- **Responsive design** - Resize the browser window to test responsiveness
