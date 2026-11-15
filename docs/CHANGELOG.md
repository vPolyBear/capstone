## Specification changes since baseline v1.0

| CR | Date | Change | Requirements | Hours | Decision |
|---|---|---|---|---:|---|
| There are no change logs at the moment because nothing was deffered and no cuts were need to be made so there are no changes that need to be created yet that I know is already coming for a change log |


examples:
| CR-001 | 2026-03-12 | Store expiry dates in UTC with a household time zone | NFR-04 | +2.0 | approved |
| CR-002 | 2026-03-19 | Add item attribution ("added by") | new FR-019 | +6.5 | rejected — out of budget for v1 |
| CR-003 | 2026-04-02 | Drop offline mode from the Must set | FR-016 | -14.0 | approved with instructor |



# CHANGELOG template — the release log a reviewer can follow

Copy this into your repository root as `CHANGELOG.md`. The shape below follows the widely used
"Keep a Changelog" convention (<https://keepachangelog.com/>) with Semantic Versioning
(<https://semver.org/>): `MAJOR.MINOR.PATCH`, plus a pre-release suffix such as `-rc.1` for a
release candidate.

**Do not clobber the change table.** Since Week 8 the top of `CHANGELOG.md` has carried a table with
one row per change request — the index to the files in `docs/change-requests/`. Leave it where it
is and paste the release sections below it. The table says which decisions were made; the sections
below say what the software now does.

Rules that make a change log *useful* rather than decorative:

- Write for a human reader, newest version first.
- Group under the six standard headings: **Added, Changed, Deprecated, Removed, Fixed, Security.**
  Omit a heading with no entries.
- One entry per user-visible change. Reference the requirement ID or defect ID it closes.
- Never paste raw `git log` output. Commits are a record of typing; a change log is a record of
  *decisions*.
- Keep an `## [Unreleased]` section at the top and move entries down when you tag.

---

## Template — copy this

```markdown
# Changelog

All notable changes to this project are documented here.
Format: Keep a Changelog. Versioning: Semantic Versioning.

## [Unreleased]

## [0.9.0-rc.1] - YYYY-MM-DD
### Added
- <user-visible capability> (FR-NN)
### Changed
- <behavior that changed, and what a user must do differently> (FR-NN)
### Fixed
- <defect, stated as the symptom the user saw> (DEF-NNN)
### Security
- <hardening or upgrade, with the advisory ID if there is one>
### Known issues
- <defect shipping in this candidate, with its ID, severity, and workaround>
```

---

## Worked example — GOOD (PantryPilot, the running example)

## [0.9.0-rc.1] - 2026-11-07
### Added
- Expiring-soon view: items within 3 days of their expiry date are listed on the
  dashboard, newest expiry first (FR-07).
- "Cook tonight" suggestions from on-hand items, with an offline rule-based path
  used automatically when the recipe model is unavailable (FR-14).

### Changed
- Barcode lookup now times out after 4 seconds and falls back to manual entry
  instead of blocking the add-item form (FR-11, NFR-08).
- Item quantities are stored as integers in a base unit; existing rows are
  converted by migration `0007_quantity_units`. Run migrations before starting
  the app (FR-03).

### Fixed
- Adding an item with an expiry date in the past no longer silently discards the
  date (DEF-041).
- Household invitations sent to an address that is already a member returned 500;
  they now return 409 with a readable message (DEF-034).

### Security
- Upgraded the image-resizing dependency to a patched release; the prior version
  carried a published advisory. Verified against the GitHub Advisory Database.
- Session cookies are now `HttpOnly` and `Secure`; the demo deploy is HTTPS-only.

### Known issues
- DEF-036 (medium): the expiring-soon view is not paginated and renders slowly
  past ~800 items. Workaround: filter by location. Scheduled for 0.9.1.

Read that as a stranger. You can tell what the software now does, what you must do differently,
what was broken and is not, and what is still broken. Every line traces to an identifier you can
look up in `docs/requirements.md` or `docs/defect-log.md`.

## Worked example — BAD (the same release)

## v0.9
- various bug fixes and improvements
- updated dependencies
- refactored the backend
- misc

| Line | Why it fails |
|---|---|
| "various bug fixes" | Names nothing. A user cannot tell whether *their* bug is fixed. |
| "updated dependencies" | Hides whether a security advisory was involved. |
| "refactored the backend" | Internal churn, invisible to a user — and it hides the migration. |
| "misc" | The author stopped caring, and the reader can tell. |
| No known-issues section | Implies zero known defects. That claim is almost never true. |
| No requirement or defect IDs | Nothing traces; the change log is decoration. |

The bad version costs you twice: once on the change-log line of the rubric, and again in Week 16
when a grader cannot connect your shipped software to the requirements you baselined in Week 8.