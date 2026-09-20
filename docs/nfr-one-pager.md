# NFR One Pager

## 3 Important NFR's

| ID | Requirement | Priority | How it is measured |
|---|---|---|---|
| NFR-AVA-01 | When Gemini is unavailable, the app shall display the predetermined fallback response within 30 seconds for 10 out of 10 simulated failures. | Must | Measured by testing with a simulated timeout, an API error, and an invalid response, then recording whether the fallback appears as expected in 10 simulated failures. |
| NFR-SEC-01 | Stressed individuals data shall be breached 0 times when the repository has 0 AI API key's in any commit. | Must | Measured by scanning over the full history, going over every commit made to GitHub, and checking that the .env is in the gitignore, and expecting that there are 0 secrets found when this is done. |
| NFR-PRIV-01 | Stressed individuals check in responses and journal entries shall be sent to Gemini AI 0 times unless the stressed individual prompts for an AI Analysis request | Must | Measured by checking the AI request page after doing 7 check ins and 7 journal entries, expecting that the responses and entries were sent 0 times to Gemini AI. |

## 1 Constraint

| ID | Constraint | Where it comes from | What it rules out |
|---|---|---|---|
| CON-02 | The app must be able run on Expo Go on an iOS phone | app requirements | The main features can not run in Expo Go on iOS such as the AI Anaylsis |

## 1 Assumption

| ID | Assumption | Owner | Verify by | If it is false |
|---|---|---|---|---|
| ASM-03 | The Supabase Edge Function will be able to safely store and call the Gemini AI API key | me | Week 6 | Use a server |

## 1 Obligation

| Obligation | Primary source (URL) | Date checked | What it requires of me |
|---|---|---|---|
| Gemini API terms for use and data | https://ai.google.dev/gemini-api/terms | 2026-09-18 | It requires that I follow the Prohibited Use Policy and don't use the AI API to provide any medical. I must also follow the laws when using generated content. The unpaid AI API responses generated can be used to improve Google's technology, though this isn't true for the paid AI API. At the end it states I am responsible for the actions and tasks performed. |

## Definition of Done

### What this is

One checklist. It applies to **every** work item — every card, issue, or task — before that item may be moved to Done. It is not a plan and it is not per-feature acceptance criteria; those live with each requirement in `docs/requirements.md`.

### The honesty rule

If you will not do an item every single time, take it off the list. A definition of
done that you routinely skip is worse than no definition of done, because it teaches you that written commitments are decorative.

Eight to twelve items. Every item must be answerable **yes or no** by someone who is not you.

---

### The checklist

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

### What a bad definition of done looks like

Keep this next to yours as a warning:

- [ ] It works.
- [ ] Code is clean.
- [ ] Tested.
- [ ] Documented if needed.

Every one of these is unverifiable by anyone but the author, which means the list
enforces nothing. "If needed" is where documentation goes to die.

---

**Adopted:** 2026-09-19 · **Revised:** 2026-09-19, Edited Definition of Done

## Traceability Summary

There are 12 functional requirements and 15 non-functional requirements, totaling to 27 requiremetns in the traceability matric. All the functional requirements are traced to a design element in the requirements.md and all tests are traced to a placeholder. While all non-functional requirements are traced to a  design element and test placeholder. There were 0 orphans remaining after running the traceability-matrix.csv because all the requirements I listed I'm intending to build.