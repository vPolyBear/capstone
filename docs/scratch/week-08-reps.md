
## Rep 1 — Assemble the package and gate it yourself

Write: three sentences naming what you had to fix to pass your own entry criteria. If the answer is “nothing,” you did not look hard enough.
- Had to get rid of the word fast and instead used a number for time individual need to get help in
- Had to add in a 200 code in the architecture.md for the happy case because it is a code that I will use in my system 
- Wanted to add in more clarifying information for the auth field in the interface contract to still show that the API key is needed.
- Had to add the time field time zone policy and storage format (UTC using ISO 8601 format)
- Clearly identified the personal data that is stored and stated how long it is retained and when it is deleted.
- Added risk R-15 for the Expo free tier
- Updated October calendar to reflect actual working hours

## Rep 2 — The traceability spot-check

| Req id | Spec section that designs it | Task/work package that builds it | How it will be verified | Verdict | 
|---|---|---|---|---|
| FR-QUES-01 | requirements.md - Add check in response | WP-1 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| FR-OVER-01 | requirements.md - Stress weekly/monthly view | WP-2 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| FR-JOU-01 | requirements.md - Add Journal Entry | T-3.1,T-3.2,T-3.3,T-3.4 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| FR-ACT-01 | requirements.md - Destressing aid | WP-4 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| FR-AIA-01 | requirements.md - Prompt AI Analysis for Stress Explanation | WP-5 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| FR-AIA-04 | requirements.md - Prompt AI Analysis for Destressing Aid | WP-5 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| FR-JOU-02 | requirements.md - Edit Journal Entry | T-3.5 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| NFR-AVA-01 | requirements.md - Availability | T-5.6,T-5.7 | Requirement & How it is measured column in requirements.md for the non-functional requirement | complete |
| NFR-ACC-01 | requirements.md - Accessibility | T-7.3 | Requirement & How it is measured column in requirements.md for the non-functional requirement | complete |
| NFR-PERF-01 | requirements.md - Performance | T-5.5 | Requirement & How it is measured column in requirements.md for the non-functional requirement | complete |

- I had no orphans

## Rep 3 — Write the reviewer’s brief

Design review: Stress Manager, senior capstone, baseline gate.

What I need (45 minutes, please do not go over):
  1. Read docs/requirements.md section 5 (the Must set, 16 requirements) and docs/architecture.md sections 5-7 (interfaces, data model, flows).
  2. Use docs/review/design-review-checklist.md, areas 1-3.
  3. I am specifically asking: is there a Must requirement this design does not satisfy, and is there anything in the interface section a developer could not build from?

NOT asking for: wording, formatting, or whether the idea is good. Settled.
Format: one line per finding, with the section number. Do not soften it.
I will not argue in the meeting; I will log it.

Materials: tag spec-review-candidate, commit 70930d1.
Time box: 45 minutes reading, 45 minutes together Friday.

Write: Could a competent stranger start reading in under two minutes? If not, cut it in half.
- Yes

