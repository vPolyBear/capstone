# The First-Commit Secrets & Config Checklist

Run this **before** your first push this week, and again before every push for
the rest of the term. Git history is public memory. The cheapest minute you will
ever spend on security is the one you spend here.

---

## 1. The `.gitignore` goes in first

Create it before you create anything worth ignoring. A starter that covers the usual offenders regardless of stack:

```gitignore
# secrets and local config
.env
.env.*
!.env.example
*.pem
*.key
credentials.json
service-account*.json

# local data and build output
*.sqlite
*.sqlite3
*.db
/dist/
/build/
/target/
/out/

# dependencies (never commit these; the lock file is the record)
/node_modules/
/venv/
/.venv/
__pycache__/

# editor and OS noise
.DS_Store
.idea/
.vscode/*
!.vscode/extensions.json
```

## 2. Config comes from the environment, not from source

Commit `.env.example` with **every variable the app reads** and a placeholder value. It doubles as documentation: a stranger can see what the app needs.

```bash
# .env.example  — copy to .env and fill in. NEVER commit .env.
APP_BASE_URL=http://127.0.0.1:8080
DATABASE_URL=sqlite:./data/dev.sqlite
PRODUCT_API_KEY=replace-me-not-a-real-key
MODEL_API_KEY=replace-me-not-a-real-key
LOG_LEVEL=info
```

Rule: **the app must start with only `.env.example` values plus a local database.** If it cannot, your README's five-minute promise is a lie and a grader on a clean machine will find out.

## 3. The audit — run it, paste the output in your milestone

```bash
# What is actually tracked right now?
git ls-files | grep -Ei '\.env$|\.pem$|\.key$|credentials|secret' || echo "clean: nothing tracked"

# What is in the HISTORY, not just the working tree?
git log --all --name-only --pretty=format: | sort -u \
  | grep -Ei '\.env$|\.pem$|\.key$|credentials' || echo "clean: nothing in history"

# High-signal string scan across every commit (noisy; read every hit)
git grep -nEI '(api[_-]?key|secret|password|token)[^A-Za-z0-9]{0,3}[=:][^=:]' $(git rev-list --all) \
  | head -50
```

## 4. Keys in CI

- Store them as **repository secrets** in your CI provider, never as literals in
  the workflow file.
- Reference them by name only, e.g. `${{ secrets.PRODUCT_API_KEY }}`.
- Providers mask registered secret values in logs on a best-effort basis. That
  masking will not save you if you transform the value (base64, split, JSON) or
  dump the whole environment. So: **never** `echo` a secret, never `env`/`printenv`
  in a step, never turn on shell tracing in a step that touches one.
- A pull request from a fork should not be able to read your secrets. Check your
  provider's current rules before you point CI at anything that costs money.

## 5. If a secret is already committed — the order matters

1. **Rotate the credential first.** Revoke it at the provider and issue a new one.
   Assume the old one is compromised the moment it left your machine.
2. **Then** clean the history (`git filter-repo`, or your host's support process).
   Rewriting history does not reach forks, clones, caches, or anyone's terminal
   scrollback. Rotation is the fix; cleaning is the tidy-up.
3. Record it in your defect log, and in `docs/ai-usage.md` if an assistant wrote
   the line that leaked it.

> The three commonest ways a key ends up in a capstone repo: a generated
> quick-start that hard-codes it, a debug `print` left in, and a "temporary"
> commit made at 1 a.m. All three are avoided by step 1 of this checklist.