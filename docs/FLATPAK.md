# Flare Flatpak Build Guide

This document explains how to build and test Flare as a Flatpak application.

## Prerequisites

Before building Flare as a Flatpak, install the required tools:

```bash
# Fedora
sudo dnf install flatpak flatpak-builder elfutils

# Ubuntu/Debian
sudo apt install flatpak flatpak-builder

# Arch
sudo pacman -S flatpak flatpak-builder
```

Also add the Flathub repository:

```bash
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

## Building the Flatpak

You have two manifest format options:

### Option 1: Using JSON manifest (Recommended)

```bash
flatpak-builder --user --install --force-clean build-dir com.github.rocketpowerinc.flare.json
```

### Option 2: Using YAML manifest

```bash
flatpak-builder --user --install --force-clean build-dir flatpak.yaml
```

## Testing the Flatpak

After building, run the application:

```bash
flatpak run com.github.rocketpowerinc.flare
```

## Creating a Bundle for Distribution

Generate a distributable bundle:

```bash
flatpak build-bundle ~/.local/share/flatpak/repo flare.flatpak com.github.rocketpowerinc.flare
```

The resulting `flare.flatpak` file can be shared and installed by others.

## Installing from a Bundle

```bash
flatpak install flare.flatpak
```

## Publishing to Flathub

To publish Flare on Flathub:

1. Fork https://github.com/flathub/flathub
2. Create a new branch for your app
3. Add the manifest file to a folder named `com.github.rocketpowerinc.flare/`
4. Submit a pull request
5. Follow Flathub's guidelines for app submissions

See https://docs.flathub.org/docs/for-app-authors for detailed instructions.

## Troubleshooting

### Build fails with Node.js issues

- Ensure the Node 18 SDK extension is available
- If you see a `cp: cannot stat 'node-v18.20.1-linux-x64/*'` error, the
  versioned directory may not exist after extraction. The manifest now copies
  all files (`cp -r * /usr/local/`) instead of relying on the specific
  directory name.
- Check logs: `flatpak-builder` outputs detailed error messages

### App won't launch

- Check permissions in finish-args
- View logs: `flatpak run --command=sh com.github.rocketpowerinc.flare`

### Flatpak not found

- Verify installation: `flatpak list`
- Rebuild: `flatpak-builder --install --force-clean build-dir flatpak.yaml`

## Configuration

The manifest includes:

- **Permissions**: Network access, wayland/X11 sockets, home filesystem access (for app configs)
- **Runtime**: GNOME Platform 46 with Node.js 18 SDK extension
- **Build process**: npm dependency installation and app setup

For more customization, edit `com.github.rocketpowerinc.flare.json` or `flatpak.yaml`
