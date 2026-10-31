# Definition of Done

## What this is

One checklist. It applies to **every** work item — every card, issue, or task — before that item may be moved to Done. It is not a plan and it is not per-feature acceptance criteria; those live with each requirement in `docs/requirements.md`.

## The honesty rule

If you will not do an item every single time, take it off the list. A definition of
done that you routinely skip is worse than no definition of done, because it teaches you that written commitments are decorative.

Eight to twelve items. Every item must be answerable **yes or no** by someone who is not you.

---

## The checklist

An item is Done when all of the following are true:

- [ ] It traces to a requirement ID in `docs/requirements.md` (or a new requirement was added and the traceability matrix updated).
- [ ] Every acceptance criterion for that requirement passes, checked by running it — not by reading the code.
- [ ] At least one automated test covers the new behavior, and the whole suite passes locally.
- [ ] The branch is merged only after the pipeline is green on the merge commit.
- [ ] No secret, API key, token, or real user data was added to the repository.
- [ ] Error paths are handled: the failure a user is most likely to hit produces a message that names what failed.
- [ ] New user-facing screens and the controls are readable, labeled, and pass the contrast check.
- [ ] Any behavior change a stranger would need to know is reflected in `README.md`, `CHANGELOG.md`, or `docs/runbook.md`.
- [ ] Any use of an AI assistant on this item is recorded in `docs/ai-usage.md`, and every generated line was read and understood.
- [ ] Time spent is written to the hours log the same day.
- [ ] The item was demonstrated once end to end from a clean state, not from the state left over by development.

---

## What a bad definition of done looks like

Keep this next to yours as a warning:

- [ ] It works.
- [ ] Code is clean.
- [ ] Tested.
- [ ] Documented if needed.

Every one of these is unverifiable by anyone but the author, which means the list
enforces nothing. "If needed" is where documentation goes to die.

---

## Cut list

- No items were cut but just removed the (or, for a CLI, remain readable with color disabled) because my system wouldn't be for the terminal. Then I edited the "New user-facing screens..." checklist item to fit for mobile because keyboards aren't necessary for my system. The item that I kept but am least sure I will honor is the "At least one automated test..." checklist item as it will be harder to push myself to do them when I feel that I need to do a more important feature sooner than later. Though what I will change about my workflow to make sure it survives Week 12 is by getting in the habit of writing tests after each item to ensure I don't miss, procrastinate, or forget to do them.

---

## Checks for when a task is done

A task is DONE when ALL of the following are true:

1. The acceptance criteria on its requirement are met, verbatim. (`FR-__ AC-__`)
2. At least one automated test exercises the new behavior and passes, if possible.
3. The full test suite passes locally AND in CI on the pushed branch.
4. Errors and edge cases named in the technical specification are handled.
5. The four-pass self-review below is complete; findings fixed or logged.
6. No secrets, credentials, or personal data appear anywhere in the diff.
7. Any assistant contribution is recorded in `docs/ai-usage.md`.
8. The issue links to its requirement id and has been moved on the board.
9. Docs touched: `README.md`, `docs/runbook.md`, or an ADR updated if this
   changed how the system is built, run, or configured.
10. Hours are logged in `docs/hours-log.csv` with a real description.

---

## The bad version, and what each line costs you

```
Definition of Done
- Code is written        <- unfalsifiable; that is what makes it a task
- It works               <- under what input? on whose machine? which criterion?
- Committed to GitHub    <- a commit proves a file changed, not that work finished
```

Nothing there can be checked by anyone but the author, which means it earns
nothing on a rubric a stranger applies.

---



## Journal FR-JOU-01 Add a Journal Entry

| Check | Evidence |
|---|---|
| 1 | AC-1 scan resolves a name; AC-2 unknown barcode falls through to manual entry |
| 2 | `test_lookup_200`, `test_lookup_404`, `test_lookup_5xx_retry`, `test_timeout` |
| 3 | Run #211 green on `feat/fr-12-barcode` |
| 4 | Timeout, 404, 429, and garbage-body cases handled per spec §4.3 |
| 5 | Four passes done 3/19; 3 findings fixed, DEF-014 logged and deferred |
| 6 | Key read from `PANTRY_API_KEY`; `git diff --staged` reviewed hunk by hunk |
| 7 | `docs/ai-usage.md` entry 2026-03-19 (client draft, ~40 of 95 lines kept) |
| 8 | Issue #34 closed, labeled `FR-12`, moved to Done |
| 9 | `README.md` prerequisites updated with the new env var |
| 10 | 3.75 h construction + 1.00 h debugging logged 3/19 |



## Worked example — PantryPilot, FR-12 (add an item by barcode)

| Check | Evidence |
|---|---|
| 1 | AC-1 scan resolves a name; AC-2 unknown barcode falls through to manual entry |
| 2 | `test_lookup_200`, `test_lookup_404`, `test_lookup_5xx_retry`, `test_timeout` |
| 3 | Run #211 green on `feat/fr-12-barcode` |
| 4 | Timeout, 404, 429, and garbage-body cases handled per spec §4.3 |
| 5 | Four passes done 3/19; 3 findings fixed, DEF-014 logged and deferred |
| 6 | Key read from `PANTRY_API_KEY`; `git diff --staged` reviewed hunk by hunk |
| 7 | `docs/ai-usage.md` entry 2026-03-19 (client draft, ~40 of 95 lines kept) |
| 8 | Issue #34 closed, labeled `FR-12`, moved to Done |
| 9 | `README.md` prerequisites updated with the new env var |
| 10 | 3.75 h construction + 1.00 h debugging logged 3/19 |

---

## The four-pass self-review (check 5, expanded)

**Pass 1 — Diff (mechanical).** `git diff --staged` and `git diff --staged --stat`.
Hunt debug prints, commented-out blocks, files staged by accident, hard-coded
hosts, and TODOs you forgot. Five minutes; finds about half of everything.

**Pass 2 — Stranger (comprehension).** Read from the entry point as if you had
never seen it. Flag ambiguous names, functions doing three jobs, magic numbers, nesting deeper than three.

**Pass 3 — Adversary (destruction).** For every input ask what the worst version
looks like:

| Input | Hostile version |
|---|---|
| text field | empty · 10,000 chars · emoji · `'; DROP TABLE` · padded whitespace |
| number | zero · negative · 0.1 + 0.2 · your type's maximum |
| date | today · leap day · 1900 · another time zone |
| network call | slow · timed out · 500 · 429 · valid HTTP, garbage body |
| collection | empty · one · one million · duplicates |

Fix now, log a defect, or accept with a written reason. All three are fine.
Silence is not.

**Pass 4 — Contract (traceability).** Read each acceptance criterion out loud and
point at the line of code that satisfies it. No line, no criterion met.


---

**Adopted:** 2026-10-31 · **Revised:** 2026-09-19, Edited Definition of Done