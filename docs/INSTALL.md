# Installation Guide

## Quick Start (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/flare.git
cd flare
```

### 2. Install System Dependencies

See [DEPENDENCIES.md](DEPENDENCIES.md) for detailed instructions per distribution.

Quick: Ubuntu/Debian
```bash
sudo apt update
sudo apt install -y nodejs npm flatpak make
sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

### 3. Build and Run

```bash
# Install Node.js dependencies and run in development mode
make dev
```

Or manually:
```bash
npm install --no-save
npm start
```

---

## System-Wide Installation

### Install to /usr/local (Default)

```bash
make build
sudo make install
```

Then run anywhere:
```bash
flare
```

### Install to /usr

```bash
sudo make install PREFIX=/usr
```

### Install with Custom Prefix

```bash
sudo make install PREFIX=/opt/flare
```

The binary will be at `/opt/flare/bin/flare`

---

## Uninstallation

### Remove from System

```bash
# From /usr/local (default)
sudo make uninstall

# From custom location
sudo make uninstall PREFIX=/usr
```

### Clean Local Build

```bash
make clean
```

---

## Verification

After installation, verify it works:

```bash
flare --help     # Check if binary is in PATH
which flare      # Show installation location
npm list -g      # Show globally installed packages
```

Create a desktop shortcut:
- GNOME: App should appear in Activities (if installed system-wide)
- KDE: App should appear in Application Menu
- Manual: Use the desktop file at `/usr/local/share/applications/flare.desktop`

---

## Troubleshooting

### "Command not found: flare"

The binary may not be in your PATH. Try:
```bash
/usr/local/bin/flare    # Full path
sudo make install       # Reinstall
```

### "node_modules not found"

Rebuild the project:
```bash
make clean
make build
```

### Flatpak apps not launching

Ensure Flathub is added:
```bash
flatpak remote-list
sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

### Permission denied on bin/flare

Fix file permissions:
```bash
chmod +x /usr/local/bin/flare
```

### Cannot detect Node.js version

Check your Node.js installation:
```bash
node --version
npm --version
```

Install Node.js if missing (see DEPENDENCIES.md)

---

## Development Setup

For contributors:

```bash
git clone https://github.com/yourusername/flare.git
cd flare
npm install
make dev
```

Make changes to files in `src/` and rebuild:
```bash
make clean
make dev
```

See the main README for architecture and contribution guidelines.
