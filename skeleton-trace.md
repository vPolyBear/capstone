# Walking Skeleton Trace — TEMPLATE

Copy this to `docs/skeleton-trace.md` in your repository. Keep it current for the rest of the term; Week 13 grades it as part of the documentation set, and Week 16 uses it to check that every requirement you claimed is actually reachable.

Replace everything in ANGLE BRACKETS. Delete the PantryPilot example rows once your own are in — they are here to show the shape, not to be kept.

---

## 1. The request path

One row per hop. "Real" means the production component, not a stub, a mock, a hard-coded fixture, or a `TODO`. A hop that is not real is a bone that is missing.

| # | Hop | Component in my system | Real? | Evidence |
|---|---|---|---|---|
| 1 | Client / entry point | Expo/ React Native Analysis page prompting for analysis | no | A screen shows a place where a prompt can be chosen |
| 2 | Route / dispatch | The Analysis request handler sends the analysis request to the Supabase Edge Function | no | The Supabase Edge Function receives the request |
| 3 | Service / domain logic | The Supabase Edge Function ensures the request is formatted properly and ensures it has all the correct fields then calls the Gemini API and takes in its response | no | The Supabase Edge Funcion is able to proceed with the request and Gemini provides a response back that it is expecting |
| 4 | Data store | Expo SQLite check_ins & journal_entries | no | The check_ins & journal_entries data is able to be retrieved and store; the AI Analysis' response takes in this data too |
| 5 | Response | 200 {"analysis_explanation", "activity_suggestion"} | no | The API returns a response with a proper analysis_explanation and activity_suggestion |
| 6 | Rendered result | Analysis page that displays the analysis explanation and activity suggestion | no | The analysis_explanation and activity_suggestion are displayed on screen |
| 7 | External integration | Gemini AI Analysis API is called by the Supabase Edge Functino | no | The Supabase Edge Function sent the request to Gemini and request a response back for the AI Analysis |

**Missing bone (the next task):** Issue #1: Expo/ React Native Analysis page prompting for analysis

## 2. Requirement traceability

Every requirement identifier you baselined in Week 8 gets a row. A requirement
with no issue is a promise nobody is keeping.

| Req ID | Requirement (short) | Issue | Branch | Verified by | Status |
|---|---|---|---|---|---|
| `<FR-1>` | `<one line>` | `#<n>` | `<branch>` | `<test name or "manual">` | not started / in progress / done |
| FR-4 | List items expiring within 7 days | #12 | `fr-4-expiring-list` | `tests/unit/list-expiring` | done |
| FR-7 | Add an item from the web form | #14 | `fr-7-add-item` | — | in progress |
| NFR-2 | First page paint under 2 s on 3G | #21 | — | — | not started |

## 3. Skeleton acceptance record

- **Date the skeleton first walked end to end:** `<YYYY-MM-DD>`
- **Commit that made it walk:** `<sha>`
- **CI run that proved it (URL):** `<link to the green run>`
- **One red build I caused on purpose, and the fix:** `<red run URL>` -> `<fix sha>`
- **Hops still stubbed, and when they get real:** `<list, with issue numbers>`