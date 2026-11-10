# The Week-12 Security Pass — checklist and evidence sheet

Fill the **Evidence** column with something a grader could re-run or re-read, and disposition every finding. This is a *student capstone* pass, not a professional penetration test — the goal is that you looked, in a structured way, and wrote down what you found.

Two rules before you start:

- **Evidence beats assertion.** "Inputs are validated" is a claim. "Every write endpoint rejects
  the payloads in `tests/security/test_input.py`; run `pytest tests/security`" is evidence.
- **A finding you cannot fix this week is not a failure — an undocumented one is.** Record it as a
  defect with a severity and a disposition, exactly as in Week 11.

For the current category list and cheat sheets, use the OWASP project pages
(<https://owasp.org/www-project-top-ten/>). The category names and numbering are revised
periodically, so read the current edition rather than a remembered list.

---

## The seven areas

| # | Area | The question to answer | Evidence | Finding | Disposition |
|---|---|---|---|---|---|
| 1 | **Secrets** | Is any credential in the repository, in its history, in a log, or in a screenshot? | the env in the mobile folder that hasn't been commited and there are placeholders for the env in the env.example | 0 credentials leaked | Nothing was found so contuine to keep the secrets out like I have been doing |
| 2 | **Input** | Does every externally supplied value get validated and safely parameterized before it reaches a query, a shell, a path, or a template? | The database queries uses parameters and the fields are checked | 0 are not unvalidated or not safely parameterized | Nothing is super necessary to fix |
| 3 | **Authentication** | Can a request act as a user without proving it is that user? Are sessions and password storage handled by a maintained library rather than by you? | sendAnalysis is called in the analysis.tsx, though the JWT is disabled because there are no user accounts | Someone else might be able to call the endpoint | Accepting the security tradeoffs for now |
| 4 | **Authorization** | For every object a user can name, is ownership checked *server-side* on every request — not just hidden in the UI? | A user owns everything that is on their own devices | Everything stays on the owner device so there are no user accounts that need to depict ownership | Nothing needs to be fixed |
| 5 | **Transport & storage** | Is traffic HTTPS end to end? Is anything sensitive stored that you do not actually need? | The check-ins and journal entries are sent from the database to Supabase to Gemini and the user is told that Gemini can use their response for product improvement | The user can choose what they want to provide and not, nothing necessary is super revealing, and everything is generally necessary | Users are made aware and everything is sent properly |
| 6 | **Dependencies** | Does any direct or transitive dependency carry a published advisory? Which, and what did you do? | There were 0 vulnerabilities found from npm audit | Nothing was found | Everything is currently good |
| 7 | **Errors & logging** | Do error responses leak stack traces, queries, paths, or tokens? Do logs contain secrets or personal data? | None of my files in the mobile folder contain leak anything, or contian secrets or personal data | 0 issues found | Ensure sensitive data is always kept safe and private |

---

## Area 1 — Secrets: the commands

Search tracked files *and* history. Deleting a key in a later commit does not remove it.

```sh
# Tracked files, obvious literals. Widen the pattern for your provider's key format.
git grep -nIE '(AKIA[0-9A-Z]{16}|BEGIN [A-Z ]*PRIVATE KEY|(api[_-]?key|secret|token|password)[[:space:]]*[:=][[:space:]]*[^[:space:]]{12,})'

# Every version of every file that ever existed.
git rev-list --all | xargs -n1 -I{} git grep -nIE 'AKIA[0-9A-Z]{16}' {} 2>/dev/null | head

# Is the environment file tracked by accident?
git ls-files --error-unmatch .env 2>/dev/null && echo "TRACKED - fix this"
```

If you find a live credential: **rotate it at the provider first**, then clean the repository, then
write it up. Rotation is the fix. Removing the commit is housekeeping.

## Area 6 — Dependencies: check the advisory, not the vibe

Run whatever your ecosystem provides — for example `npm audit`, `pip-audit`, `cargo audit`, or your platform's dependency-scanning alerts — then verify each reported issue against a primary source:

- GitHub Advisory Database — <https://github.com/advisories>
- OSV — <https://osv.dev/>
- NVD — <https://nvd.nist.gov/>


Under CVSS v3.1 the qualitative bands are None 0.0, Low 0.1–3.9, Medium 4.0–6.9, High 7.0–8.9, Critical 9.0–10.0. "Reachable from my code?" is the column students skip and professionals live by: a critical advisory in a code path you never call is a different decision than a medium one in your login flow.

**If an assistant told you about a vulnerability, the advisory ID it gave you is the claim, not the proof.** Paste the ID into the advisory database. Fabricated and mis-numbered identifiers are a routine failure mode. No ID in the database, no line in this table.

---

## Sign-off

```
Security pass performed by: __Katherine Spencer__  Date: _2026-11-09_
Areas covered: 1 2 3 4 5 6 7      Findings opened: _0_   Fixed: _0_   Accepted: _1_
Issue shipping in this release candidate: ___It would be more medium severity but area 3___
```