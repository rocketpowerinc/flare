# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2024-02-23

### Changed

- **Restructured as native Linux project** - No longer relies on Docker
- **Modular directory structure** - Proper separation of concerns
- **Makefile build system** - Professional build automation
- **Improved documentation** - Comprehensive guides for installation and development

### Added

- `bin/flare` - Executable launcher script
- `Makefile` - Build, install, and development targets
- `src/` directory structure with proper module organization
- `config/` directory for system configuration files
- `docs/` directory with comprehensive documentation:
  - `INSTALL.md` - Installation instructions
  - `DEPENDENCIES.md` - System dependency list
  - `ARCHITECTURE.md` - Project architecture overview
  - `DEVELOPMENT.md` - Developer setup and contribution guide
- Desktop application file for system integration
- `.gitignore` - Git ignore patterns
- `LICENSE` - MIT License
- `CONTRIBUTING.md` - Contribution guidelines
- `.editorconfig` - Editor configuration

### Improved

- Cleaner project organization
- Better documentation
- Professional build system
- Easier installation and deployment
- Better separation of UI, logic, and services

## [1.0.0] - 2024-02-01

### Initial Release

- Electron-based application launcher
- Flatpak integration
- Category-based organization
- Dynamic wallpapers per category
- Single bash script deployment (Docker-based)
