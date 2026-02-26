#!/bin/bash

# Flare Flatpak Build Script
# This script simplifies building and installing Flare as a Flatpak

set -e

MANIFEST="${1:-.}"
APP_ID="com.github.rocketpowerinc.flare"
BUILD_DIR="build-flatpak"

# Color output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if flatpak-builder is installed
if ! command -v flatpak-builder &> /dev/null; then
    echo -e "${RED}Error: flatpak-builder is not installed${NC}"
    echo "Install it with:"
    echo "  Fedora: sudo dnf install flatpak-builder"
    echo "  Ubuntu: sudo apt install flatpak-builder"
    echo "  Arch: sudo pacman -S flatpak-builder"
    exit 1
fi

# Determine which manifest to use
if [ -f "com.github.rocketpowerinc.flare.json" ]; then
    MANIFEST_FILE="com.github.rocketpowerinc.flare.json"
    echo -e "${BLUE}Using JSON manifest${NC}"
elif [ -f "flatpak.yaml" ]; then
    MANIFEST_FILE="flatpak.yaml"
    echo -e "${BLUE}Using YAML manifest${NC}"
else
    echo -e "${RED}Error: No Flatpak manifest found${NC}"
    echo "Expected: com.github.rocketpowerinc.flare.json or flatpak.yaml"
    exit 1
fi

# Build the Flatpak
echo -e "${BLUE}Building Flatpak from $MANIFEST_FILE...${NC}"
flatpak-builder \
    --user \
    --install \
    --force-clean \
    "$BUILD_DIR" \
    "$MANIFEST_FILE"

echo -e "${GREEN}✅ Flatpak build complete!${NC}"
echo ""
echo "To run the application:"
echo -e "  ${GREEN}flatpak run $APP_ID${NC}"
echo ""
echo "To create a distributable bundle:"
echo -e "  ${GREEN}flatpak build-bundle ~/.local/share/flatpak/repo flare.flatpak $APP_ID${NC}"
