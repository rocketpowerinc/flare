# Flare - Ultimate Linux Launcher

A modern, lightweight Electron-based application launcher for Linux with built-in Flatpak support.

**Flare** is designed to provide an elegant interface for organizing and launching your applications across different categories. It features a collapsible sidebar, dynamic wallpapers per category, and seamless integration with Flatpak applications.

## Features

✨ **Modern UI** - Clean, dark-themed interface with category-based organization
📦 **Flatpak Support** - Directly launch and manage Flatpak applications
🎨 **Dynamic Wallpapers** - Different backgrounds for each category
⚡ **Lightweight** - Fast, responsive Electron app
🎯 **Easy Configuration** - JSON-based config for managing apps
🛠️ **Native Linux** - Builds natively on Linux without Docker

## Prerequisites

- **Node.js** 18.0.0+ and **npm** 9.0.0+
- **Flatpak** (optional, for Flatpak app support)
- **Make** (for building and installation)
- Linux distribution (Ubuntu 20.04+, Fedora 35+, Arch, etc.)

For detailed dependency installation, see [DEPENDENCIES.md](docs/DEPENDENCIES.md)

## Quick Start

### 1. Clone and Enter Directory

```bash
sudo apt install -y nodejs npm git
git clone https://github.com/rocketpowerinc/flare.git
cd flare
```

### 2. Run in Development Mode

```bash
make dev
```

This will install Node.js dependencies and launch Electron with the app.

### 3. Install System-Wide

```bash
make build
sudo make install
```

Then simply run:

```bash
flare
```

## Installation

For detailed instructions, see [INSTALL.md](docs/INSTALL.md)

Quick system-wide install:

```bash
sudo make install PREFIX=/usr/local
```

## Building as Flatpak

Flare can be packaged and distributed as a Flatpak for simple installation across different Linux distributions.

### Prerequisites for Flatpak Builds

```bash
# Fedora
sudo dnf install flatpak flatpak-builder

# Ubuntu/Debian
sudo apt install flatpak flatpak-builder

# Arch
sudo pacman -S flatpak flatpak-builder
```

Add the Flathub repository:

```bash
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

### Build and Test Locally

Install dependencies in the repository directory, then build the Flatpak:

```bash
npm install --omit=dev
flatpak install flathub org.gnome.Sdk//46 org.gnome.Platform//46 -y
make flatpak
```

Then run the Flatpak:

```bash
flatpak run com.github.rocketpowerinc.flare
```

> **Important:** Run `npm install --omit=dev` in your repository directory *before* building. The Flatpak must include `node_modules` since the build sandbox has no network access. The manifest is configured to include `node_modules` from your local directory.

> ⚠️ **Build error troubleshooting**
>
> **npm install errors (EAI_AGAIN):** The Flatpak build sandbox doesn't have network access. Run `npm install --omit=dev` locally first:
>
> ```bash
> npm install --omit=dev
> rm -rf build-flatpak ~/.local/share/flatpak/staging
> make flatpak
> ```
>
> If you encounter other Flatpak build errors, ensure you have the latest code and clean build cache:
>
> ```bash
> git pull origin main
> rm -rf build-flatpak ~/.local/share/flatpak/staging
> npm install --omit=dev
> make flatpak
> ```
>
> **npm ci errors:** If you see `npm ERR! The npm ci command can only install with an existing package-lock.json`, run `npm install --omit=dev` first.
>
> If you see an error like `cp: cannot stat 'node-v18.20.1-linux-x64/*': No such file or directory`,
> the Node archive has already been extracted. The repository includes the corrected build command that copies Node.js to `/app` instead of `/usr/local/`:
>
> ```json
> "build-commands": ["mkdir -p /app", "cp -r * /app/"]
> ```

````

or directly:

```bash
flatpak-builder --user --install --force-clean build-flatpak com.github.rocketpowerinc.flare.json
````

Then run:

```bash
flatpak run com.github.rocketpowerinc.flare
```

### Create a Distributable Bundle

Generate a `.flatpak` file to share with others:

```bash
make flatpak-bundle
```

This creates `flare.flatpak` which can be installed by others with:

```bash
flatpak install flare.flatpak
flatpak run com.github.rocketpowerinc.flare
```

### Publish to Flathub

To submit Flare to Flathub for public distribution:

1. Fork https://github.com/flathub/flathub
2. Create a folder `com.github.rocketpowerinc.flare/`
3. Copy `com.github.rocketpowerinc.flare.json` to that folder
4. Submit a pull request
5. Follow [Flathub submission guidelines](https://docs.flathub.org/docs/for-app-authors)

For more details, see [FLATPAK.md](docs/FLATPAK.md)

## Usage

### Starting the Application

```bash
flare              # If installed system-wide
./bin/flare        # From project directory
make dev           # Development with live reload
```

### Configuration

Applications are configured via JSON files in `assets/` directories. See [INSTALL.md](docs/INSTALL.md) for details.

Example:

```json
{
  "apps": [
    {
      "name": "Steam",
      "type": "flatpak",
      "id": "com.valvesoftware.Steam",
      "website": "https://flathub.org/apps/com.valvesoftware.Steam"
    }
  ]
}
```

### App Types

- **flatpak** - Flatpak applications
- **binary** - System binaries
- **bash** - Custom scripts

## Project Structure

```
flare/
├── bin/flare                  # Main launcher script
├── src/
│   ├── main.js                # Electron main process
│   ├── AppLauncher.js         # Core logic
│   ├── ui/index.html          # Main UI
│   └── services/              # Service modules
├── assets/                    # Category configs and wallpapers
├── config/flare.desktop       # Desktop entry
├── docs/                      # Documentation
├── Makefile                   # Build automation
└── package.json               # Dependencies
```

## Commands

```bash
make dev           # Development mode
make build         # Build only
make install       # System-wide install (requires sudo)
make uninstall     # Remove installation
make flatpak       # Build and install as Flatpak
make flatpak-bundle # Create distributable Flatpak bundle
make clean         # Clean artifacts
make help          # Show all commands
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make improvements
4. Submit a pull request

## Troubleshooting

See [INSTALL.md](docs/INSTALL.md) for detailed troubleshooting guides.

## License

Licensed under the MIT License - see LICENSE file for details.

---

**Flare** - Launch your apps with style 🔥
