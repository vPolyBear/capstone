# Test Plan — Stress Manager

**Version:** 1.0  ·  **Author:** Katherine Spencer  ·  **Date:** 2026-11-02  ·  **Baseline commit:** <sha>

---

## 1. Scope — what is under test

Check Ins:
    - requirement FR-QUES-01 at commit d2329ef, 

Journal:
    - requirement FR-JOU-01 at commit d2329ef, d4308c5
        - requirement FR-JOU-02 no commits yet

AI Analysis:
    - requirements FR-AIA-01 & FR-AIA-04, NFR-PERF-01, NFR-PRIV-01, NFR-PRIV-02, NFR-SEC-01, NFR-AVA-01 at commit d2329ef, 50f3b67, d4308c5

Overview:
    - requirement FR-OVER-01 no commits yet

Destressing Activites:
    - requirement FR-ACT-01 no commits yet

## 2. Out of scope — what is NOT under test, and why

- The Gemini AI API's correctness
    - The result is always changing and not set so it would be hard to verify. The main importance is that it returns a response and generally useful is what is hoped for.
- Unsupported browers such as on Android and websites
    - Not testing on these as that is out of scope and won't improve the overall projects functionality.
- Supabase Edge Functions and Gemini API reliability
    - It not critical that Supabase and Gemini are able to work together or perform perfectly every time. I just want to handle the errors so that the fallback can run if it fails.
    
## 3. Test levels

| Level | What it covers here | How it runs | Roughly how many |
|---|---|---|---|
| Unit | <modules / pure logic> | `<command>` | <n> |
| Integration | <named seams: DB, HTTP client, queue> | `<command>` | <n> |
| Acceptance | <requirement acceptance criteria, end to end> | `<command or manual script>` | <n> |

## 4. Environment

| Item | Value |
|---|---|
| Runtime / language version | Node.js 22.16.0 (`mobile/.nvmrc`); TypeScript 6.0.3 |
| Operating system(s) | Local development environment |
| Database / storage | SQLite, seeded with one sample check-in and journal entry. |
| Third-party services | Supabase mocked & Gemini not called. |
| Test data set | `mobile/test-data/generated/`; generate with `npm run seed:testdata` from `mobile/`. |
| Where it runs | Locally with `npm test` |

## 5. Entry criteria — we may begin testing when

- [ ] The build under test is tagged and pushed; CI is green on the pipeline from Chapter 9.
- [ ] Every Must requirement has at least one written test case.
- [ ] The test data set is checked in and loads without manual steps.
- [ ] <your own>

## 6. Exit criteria — verification is DONE when

[Numbers, not adjectives. These are the criteria you will be held to in Week 16.]

- [ ] 100% of Must requirements have at least one passing acceptance test.
- [ ] 0 open defects at severity S1 or S2.
- [ ] Every open S3/S4 defect appears in `docs/defect-log.md` with a documented workaround.
- [ ] Every defect fixed this iteration has a named unit test that fails on the old code.
- [ ] The full suite runs from one documented command and passes in CI.
- [ ] The Accessibility checks for user experience NFR-ACC-01 and NFR-ACC-2 tests succeed minimally 4 out of 5 times.

## 7. Risks to the testing itself

| Risk | Trigger | Response |
|---|---|---|
| <e.g. third-party sandbox unavailable> | <how you'd notice> | <stub + a manual test before release> |

## 8. Schedule

| When | What |
|---|---|
| Week 11, days 1–2 | Test plan, test case derivation, traceability matrix |
| Week 11, days 3–5 | Write and automate the suite; first full pass |
| Week 11, days 6–7 | Triage, fix S1/S2, regression tests, log |

## 9. Approval

I have read this plan and I am accountable for the exit criteria above.

Signed: <you>  ·  Date: <YYYY-MM-DD>