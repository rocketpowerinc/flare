# System Dependencies

Flare requires the following packages to be installed on your Linux system:

## Required

- **Node.js** (v18.0.0 or later): Runtime for Electron
- **npm** (v9.0.0 or later): Package manager
- **Flatpak** (optional): For running Flatpak applications

## Build Dependencies

- **make**: For building and installing (usually pre-installed)
- **git**: For cloning the repository

## Installation by Distribution

### Ubuntu / Debian

```bash
sudo apt update
sudo apt install -y nodejs npm flatpak make git
sudo apt install -y flatpak  # Install Flatpak for app support
sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

### Fedora / CentOS / RHEL

```bash
sudo dnf install -y nodejs npm flatpak make git
sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

### Arch Linux

```bash
sudo pacman -S nodejs npm flatpak make git
sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

### Fedora CoreOS / Silverblue

These distributions come with Flatpak pre-installed. Only install Node.js:

```bash
toolbox enter
sudo dnf install -y nodejs npm make git
```

## Optional Dependencies

- **xdotool**: For advanced window management features
- **wmctrl**: For workspace control features
- **git**: If cloning from repository

## Verify Installation

Check that dependencies are properly installed:

```bash
node --version    # Should be v18.0.0 or later
npm --version     # Should be v9.0.0 or later
flatpak --version # Should show version (if installed)
make --version    # Should show GNU Make version
```
