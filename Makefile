.PHONY: help install uninstall build dev clean flatpak flatpak-bundle

PREFIX ?= /usr/local
DESTDIR ?=
BINDIR ?= $(PREFIX)/bin
LIBDIR ?= $(PREFIX)/lib/flare
SHAREDIR ?= $(PREFIX)/share

help:
	@echo "Flare - Ultimate Linux Launcher"
	@echo ""
	@echo "Available targets:"
	@echo "  make build         - Install dependencies and prepare the app"
	@echo "  make install       - Install Flare system-wide (requires sudo)"
	@echo "  make uninstall     - Remove Flare from system (requires sudo)"
	@echo "  make dev           - Run in development mode"
	@echo "  make flatpak       - Build and install as Flatpak"
	@echo "  make flatpak-bundle - Create distributable Flatpak bundle"
	@echo "  make clean         - Remove node_modules and build artifacts"
	@echo "  make help          - Show this help message"
	@echo ""
	@echo "Options:"
	@echo "  PREFIX=/usr        - Installation prefix (default: /usr/local)"
	@echo "  DESTDIR=/tmp       - Staging directory (default: empty)"
	@echo ""
	@echo "Examples:"
	@echo "  sudo make install PREFIX=/usr"
	@echo "  make dev"
	@echo "  make flatpak"

build: deps
	@echo "✅ Build complete"

deps:
	@echo "📦 Installing Node.js dependencies..."
	npm install

dev: deps
	@echo "🚀 Starting Flare in development mode..."
	npx electron . --dev

clean:
	@echo "🧹 Cleaning up..."
	rm -rf node_modules package-lock.json
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true

install: 
	@echo "📦 Installing Flare to $(DESTDIR)$(LIBDIR)..."
	@if [ ! -d "node_modules" ]; then \
		echo "📦 Installing Node.js dependencies first..."; \
		npm install; \
	fi
	mkdir -p "$(DESTDIR)$(LIBDIR)"
	mkdir -p "$(DESTDIR)$(BINDIR)"
	mkdir -p "$(DESTDIR)$(SHAREDIR)/applications"
	mkdir -p "$(DESTDIR)$(SHAREDIR)/pixmaps"
	
	cp -r src "$(DESTDIR)$(LIBDIR)/"
	cp -r assets "$(DESTDIR)$(LIBDIR)/"
	cp -r node_modules "$(DESTDIR)$(LIBDIR)/" 2>/dev/null || true
	cp package.json "$(DESTDIR)$(LIBDIR)/"
	cp main.js "$(DESTDIR)$(LIBDIR)/"
	cp bin/flare "$(DESTDIR)$(BINDIR)/flare"
	chmod +x "$(DESTDIR)$(BINDIR)/flare"
	
	# Install desktop file
	cp config/flare.desktop "$(DESTDIR)$(SHAREDIR)/applications/"
	chmod 644 "$(DESTDIR)$(SHAREDIR)/applications/flare.desktop"
	
	@echo "✅ Installation complete!"
	@echo "Run 'flare' to start the application"

uninstall:
	@echo "🗑️  Uninstalling Flare..."
	rm -f "$(DESTDIR)$(BINDIR)/flare"
	rm -rf "$(DESTDIR)$(LIBDIR)"
flatpak:
	@echo "📦 Building Flare as Flatpak..."
	@if [ ! -d "node_modules" ]; then \
		echo "❌ node_modules not found!"; \
		echo "Run 'npm install --omit=dev' first"; \
		exit 1; \
	fi
	@if ! command -v flatpak-builder > /dev/null; then \
		echo "❌ flatpak-builder not found. Install it with:"; \
		echo "   Fedora: sudo dnf install flatpak-builder"; \
		echo "   Ubuntu: sudo apt install flatpak-builder"; \
		echo "   Arch: sudo pacman -S flatpak-builder"; \
		exit 1; \
	fi
	flatpak-builder --user --install --force-clean build-flatpak com.github.rocketpowerinc.flare.json
	@echo "✅ Flatpak built and installed!"
	@echo "Run with: flatpak run com.github.rocketpowerinc.flare"

flatpak-bundle: flatpak
	@echo "📦 Creating distributable Flatpak bundle..."
	flatpak build-bundle ~/.local/share/flatpak/repo flare.flatpak com.github.rocketpowerinc.flare
	@echo "✅ Bundle created: flare.flatpak"
	@echo "Share this file for others to install with: flatpak install flare.flatpak"

	rm -f "$(DESTDIR)$(SHAREDIR)/applications/flare.desktop"
	@echo "✅ Uninstallation complete"

.SILENT: help
