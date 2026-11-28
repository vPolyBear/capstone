#!/usr/bin/env bash
# preflight.sh — prove your repository is self-contained, and time the proof.
#
# Clones your project fresh into a throwaway directory, runs the setup command
# your own README documents, runs the smoke check, and reports wall-clock time.
# This is the REHEARSAL for the clean-machine test — it catches the two most
# common failures (something is not committed; something is only installed on
# your laptop) before you burn a real fresh environment on them.
#
# It is NOT a clean-machine test. It still runs on your machine, with your
# globally installed tools and your shell profile. Passing here means "the repo
# is complete enough"; it does not mean "a stranger can run this." For that you
# need a machine that is not yours — see Chapter 14, section 14.3.
#
# Usage:
#   ./preflight.sh <git-url-or-local-path> "<setup command>" "<smoke command>"
# Example:
#   ./preflight.sh . "./script/setup" "npm test -- --smoke"

set -euo pipefail

SOURCE="${1:?usage: preflight.sh <repo> <setup-cmd> <smoke-cmd>}"
SETUP_CMD="${2:?missing setup command — the one your README tells a stranger to run}"
SMOKE_CMD="${3:?missing smoke command — the one that proves it actually works}"

# Tools your project assumes exist. EDIT THIS LIST to match your own stack, then
# put the same list in your README's Prerequisites section. If the two lists
# disagree, your README is wrong.
REQUIRED_TOOLS=(git)

WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

echo "== preflight =="
echo "source:  $SOURCE"
echo "workdir: $WORKDIR"
echo

echo "-- 1. required tools"
missing=0
for tool in "${REQUIRED_TOOLS[@]}"; do
  if command -v "$tool" >/dev/null 2>&1; then
    printf '   ok      %-12s %s\n' "$tool" "$("$tool" --version 2>&1 | head -n 1)"
  else
    printf '   MISSING %-12s (undeclared prerequisite or a broken README)\n' "$tool"
    missing=$((missing + 1))
  fi
done
[ "$missing" -eq 0 ] || { echo "   -> $missing tool(s) missing. Stop and fix the prerequisites list."; exit 1; }

echo
echo "-- 2. fresh clone (tracked files only — anything uncommitted disappears here)"
git clone --quiet "$SOURCE" "$WORKDIR/app"
cd "$WORKDIR/app"
echo "   HEAD: $(git rev-parse --short HEAD)   files: $(git ls-files | wc -l | tr -d ' ')"

if [ -f mobile/.env.example ] && [ ! -f mobile/.env ]; then
    echo "   note: copying mobile/.env.example -> mobile/.env"
    cp mobile/.env.example mobile/.env
fi

echo
echo "-- 3. setup: $SETUP_CMD"
start=$(date +%s)
bash -lc "$SETUP_CMD"
setup_done=$(date +%s)

echo
echo "-- 4. smoke: $SMOKE_CMD"
bash -lc "$SMOKE_CMD"
end=$(date +%s)

echo
echo "== PASSED =="
echo "setup: $((setup_done - start))s   smoke: $((end - setup_done))s   total: $((end - start))s"
echo "Record this number in docs/deployment.md. If total > 15 minutes, your"
echo "successor's first day is already half gone before they write any code."