# Walking Skeleton Trace

Keep this document current for the rest of the term; Week 13 grades it as part of the documentation set, and Week 16 uses it to check that every requirement you claimed is actually reachable.

---

## 1. The request path

One row per hop. "Real" means the production component, not a stub, a mock, a hard-coded fixture, or a `TODO`. A hop that is not real is a bone that is missing.

| # | Hop | Component in my system | Real? | Evidence |
|---|---|---|---|---|
| 1 | Client / entry point | Expo/ React Native Analysis page prompting for analysis | yes | A screen shows a place where a prompt can be chosen |
| 2 | Route / dispatch | The Analysis request handler sends the analysis request to the Supabase Edge Function | yes | The Supabase Edge Function receives the request |
| 3 | Service / domain logic | The Supabase Edge Function ensures the request is formatted properly and ensures it has all the correct fields then calls the Gemini API and takes in its response | yes | The Supabase Edge Funcion is able to proceed with the request and Gemini provides a response back that it is expecting |
| 4 | Data store | Expo SQLite check_ins & journal_entries | yes | The check_ins & journal_entries data is able to be retrieved and store; the AI Analysis' response takes in this data too |
| 5 | Response | 200 {"analysis_explanation", "activity_suggestion"} | yes | The API returns a response with a proper analysis_explanation and activity_suggestion |
| 6 | Rendered result | Analysis page that displays the analysis explanation and activity suggestion | yes | The analysis_explanation and activity_suggestion are displayed on screen |
| 7 | External integration | Gemini AI Analysis API is called by the Supabase Edge Functino | yes | The Supabase Edge Function sent the request to Gemini and request a response back for the AI Analysis |

**Missing bone (the next task):** I-7 Implementing the AI Analysis Fallback and testing the Analysis Page more

## 2. Requirement traceability

Every requirement identifier you baselined in Week 8 gets a row. A requirement with no issue is a promise nobody is keeping.

| Req ID | Requirement (short) | Issue | Branch | Verified by | Status |
|---|---|---|---|---|---|
| FR-QUES-01 | Add a check in and save the check in after it is submitted | #33 (I-1) | us/kspencer/FR-AIA-01-Ai/Analysis | — | in progress |
| FR-JOU-01 | Write in a journal entry and then save | #34 (I-2) | us/kspencer/FR-AIA-01-Ai/Analysis | — | in progress |
| FR-JOU-02 | Edit a journal entry and save its changes | #42 (I-10) | — | — | not started |
| FR-OVER-01 | Weekly and monthly views based on the check-ins | #35 (I-3) | — | — | not started |
| FR-ACT-01 | Play and continue a destressing activity | #36 (I-4) | — | — | not started |
| FR-AIA-01 | Request for an AI stress explanation | #37 (I-5) | us/kspencer/FR-AIA-01-Ai/Analysis | — | in progress |
| FR-AIA-04 | Request for an AI destressing activity | #38 (I-6) | us/kspencer/FR-AIA-01-Ai/Analysis | — | in progress |
| NFR-AVA-01 | Display Analysis Fallback when Gemini isn't available | #39 (I-7) | — | — | not started |
| NFR-PERF-01 | AI Analysis response provided in a p95 under 25 seconds | #37 (I-5); #38 (I-6) | — | — | not started |
| NFR-PRIV-01 | Unless prompted for AI Analysis, 0 check ins and journal entries are sent to Gemini AI | #37 (I-5); #38 (I-6) | — | — | not started |
| NFR-PRIV-02 | 0 unrelated personal information or device information sent in an AI request | #37 (I-5); #38 (I-6) | — | — | not started |
| NFR-SEC-01 | 0 API key's in any commit | #37 (I-5); #38 (I-6); #41 (I-9) | — | — | not started |
| NFR-REL-01 | 0 unhandled exceptions and error when running the app | #40 (I-8) | — | — | not started |
| NFR-ACC-01 | Features have easy readable fonts and text sizes, and contrasts in colors | #40 (I-8) | — | — | not started |
| NFR-ACC-02 | Success, failure, loading states, and messages don't rely on color alone | #40 (I-8) | — | — | not started |
| NFR-SEC-02 | 0 exposed error and error details | #40 (I-8) | — | — | not started |
| NFR-USE-01 | App traversal without help | #40 (I-8) | — | — | not started |
| NFR-USE-02 | Easy identification of successful and failed save attempts | #40 (I-8) | — | — | not started |
| NFR-PORT-02 | 0 main buttons or controls are cut off in portrait mode | #40 (I-8) | — | — | not started |
| NFR-MNT-01 | Clean clone from just the README | #41 (I-9) | — | — | not started |

## 3. Skeleton acceptance record

- **Date the skeleton first walked end to end:** `2026-10-25`
- **Commit that made it walk:** `4114896`
- **CI run that proved it (URL):** https://github.com/vPolyBear/capstone/commit/bb3b60a31276a7b5d507e883af4cb53614905cc3 
- **One red build I caused on purpose, and the fix:** `https://github.com/vPolyBear/capstone/commit/1842332e6af3c2c98b32a1b5d8bd01626989d311` -> `1842332`
- **Hops still stubbed, and when they get real:** `No Hops still stubbed`