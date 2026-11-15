#!/bin/sh
# release-check.sh - Week 12 release-candidate readiness gate.
#
# Stack-agnostic. Point it at YOUR real commands and run it from the root of
# your repository, on the branch you intend to tag:
#
#   TEST_CMD="npm test" SETUP_CMD="npm ci" sh release-check.sh
#   TEST_CMD="pytest -q" SETUP_CMD="pip install -r requirements.txt" sh release-check.sh
#
# It never modifies your repository: it clones a throwaway copy into a temp
# directory and reports. Exit 0 means every check passed. A failure is not a
# verdict on your project - it is a thing to fix or to record as a known defect
# before you tag.

set -u

TEST_CMD="${TEST_CMD:-}"
SETUP_CMD="${SETUP_CMD:-}"
SECRET_RE='(AKIA[0-9A-Z]{16}|BEGIN [A-Z ]*PRIVATE KEY|(api[_-]?key|secret|token|password)[[:space:]]*[:=][[:space:]]*[^[:space:]]{12,})'
fails=0

say()  { printf '%s\n' "$*"; }
pass() { say "  PASS  $*"; }
fail() { say "  FAIL  $*"; fails=$((fails + 1)); }

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  say "release-check: not inside a git repository."; exit 2; }

say "== 1. Working tree =="
if [ -n "$(git status --porcelain)" ]; then
  fail "uncommitted changes - a release candidate is built from a committed state"
else
  pass "working tree is clean"
fi

say "== 2. Secrets =="
if git grep -nIE "$SECRET_RE" -- . >/dev/null 2>&1; then
  fail "possible credential in tracked files - rerun: git grep -nIE '$SECRET_RE'"
else
  pass "no obvious credential literals in tracked files"
fi
if git ls-files --error-unmatch .env >/dev/null 2>&1; then
  fail ".env is tracked - ignore it and commit a .env.example instead"
else
  pass ".env is not tracked"
fi

say "== 3. Documents a reviewer will open first =="
for f in README.md CHANGELOG.md; do
  if [ -f "$f" ]; then pass "$f present"; else fail "$f missing"; fi
done

say "== 4. Setup and tests on a clean clone =="
if [ -z "$TEST_CMD" ]; then
  fail "TEST_CMD is unset - this gate is worthless without your real test command"
else
  tmp="$(mktemp -d)" || { say "could not create a temp directory"; exit 2; }
  if git clone --quiet . "$tmp/rc" >/dev/null 2>&1; then
    if ( cd "$tmp/rc" && { [ -z "$SETUP_CMD" ] || sh -c "$SETUP_CMD"; } && sh -c "$TEST_CMD" ) \
         >"$tmp/out.log" 2>&1; then
      pass "clean clone: setup and tests passed"
    else
      fail "clean clone: setup or tests FAILED - transcript in $tmp/out.log"
    fi
  else
    fail "could not clone this repository into $tmp"
  fi
fi

say ""
if [ "$fails" -eq 0 ]; then
  say "RELEASE CANDIDATE READY."
  say "Tag it:  git tag -a v0.9.0-rc.1 -m 'release candidate 1'  &&  git push origin v0.9.0-rc.1"
  exit 0
fi
say "$fails check(s) failed. Fix them, or open a defect for each one, before you tag."
exit 1