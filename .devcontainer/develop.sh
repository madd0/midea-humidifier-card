#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

config="$PWD/.devcontainer/homeassistant"
mkdir -p "$config"
cp .devcontainer/configuration.yaml .devcontainer/ui-lovelace.yaml "$config/"
ln -sfn "$PWD/.devcontainer/custom_components" "$config/custom_components"
ln -sfn "$PWD/dist" "$config/www"

exec .venv/bin/hass --config "$config" "$@"
