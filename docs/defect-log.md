# Defect Report & Defect Log

---

## The seven required fields

1. **ID and one-line title** — `DEF-014 — Expiry warning misses items expiring today`
2. **Environment** — build/commit, OS, runtime or browser, which data set
3. **Steps to reproduce** — numbered, minimal, starting from a known state
4. **Expected vs. actual** — both stated, in that order, in the observable world
5. **Evidence** — failing test name, log excerpt, screenshot path, request/response
6. **Severity and priority** — assigned *separately*, each with a one-line reason
7. **Traceability and status** — requirement ID, test case ID, status, owner, resolution

---

## Defect report block

ID:          DEF-001
Title:       AI Analysis isn't able to response back within twenty five seconds
Reported:    2026-11-06 by Katherine Spencer
Environment: d2329ef, iPhone 11 Pro with iOS, Expo Go 58.0.5, done with at least 1 check in and journal entry recorded on an iPhone with throttled "Fast 3G"; seeded data

Requirement: FR-AIA-01 (FR-AIA-01-AC1) & FR-AIA-04 (FR-AIA-04-AC1) & NFR-PERF-01 (NFR-PERF-01-AC1)   Test case: TC-038, TC-065, TC-069

Steps to reproduce:
  1. Open Analysis Page
  2. Choose one prompt option
  3. Choose one prompt type 
  4. Choose one check-in duration
  5. Choose one journal duration
  6. Click Generate
  7. Check/Record how long it takes to generate the AI Analysis

Expected: AI Analysis loads with its response within 25 seconds
Actual:   AI Analysis loads with its response within 26 seconds to 3.5 minutes

Evidence: TC-038, TC-065, TC-069 fails; After timing the AI Analysis response time it was consistently over 25 seconds.

Severity: S3 — A requirement is partly met; where the whole point of the AI Analysis is met: producing an AI Analysis response. However, it takes consistently longer that 25 seconds which is an AC of FR-AIA-01 & FR-AIA-04 and causes NFR-PERF-01 to not be met. Addionally, the AI Analysis can also sometimes fail, though that is why there is a fallback so that isn't as harmful.

Priority: P3 — it isn't that crucial to have the AI Analysis to respond within 25 seconds though it would be nice especially when presenting the final app. If time allows it would be nice to fix. However, I've already tried to fix it and haven't had any luck.

Status:   Not Fixed.
Owner:    Katherine Spencer



ID:          DEF-002
Title:       The toast after the AI Analysis fails is dependent on the AI Analysis' timing so it takes longer than 30 seconds if the AI Analysis does so
Reported:    2026-11-06 by Katherine Spencer
Environment: d4308c5, iPhone 11 Pro with iOS, Expo Go 58.0.5, time started from generating the AI Analysis recorded on an iPhone with throttled "Fast 3G" and seeded data

Requirement: FR-AIA-01 (FR-AIA-01-AC2) & FR-AIA-04 (FR-AIA-04-AC2)   Test case: TC-096, TC-099

Steps to reproduce:
  1. Open Analysis Page
  2. Choose one prompt option
  3. Choose one prompt type 
  4. Choose one check-in duration
  5. Choose one journal duration
  6. Click Generate
  7. If AI Analysis Fails
  8. Toast pops up, stating the AI model failed or is down; check/record how long this takes

Expected: AI Analysis loads with its response within 25 seconds and a toast doesn't need to pop up to state that it failed
Actual:   AI Analysis some times fails with its response taking longer than 30 seconds and whenever the AI Analysis does fail then the toast pops up right away when this happens so the toast doesn't pop up within the 30 seconds like expected but the toast still pops up

Evidence: TC-096, TC-099 fails; After timing the AI Analysis response time when it fails it was consistently over 30 seconds which causes the toast to technically take longer than 30 seconds.

Severity: S3 — A requirement is partly met; where the whole point of if the AI Analysis fails, having a fall back and a toast popping up right away to signal it is met. However, the AI Analysis takes consistently longer that 30 seconds which causes the toast to techinally take longer than 30 seconds and this is an AC of FR-AIA-01 & FR-AIA-04.

Priority: P4 — it isn't that crucial or something that techinally needs to be fixed as the toast pops up right away when the AI Analysis fails anyways, though its still a defect as the AC can't be fully fulfilled. 

Status:   Not Fixed.
Owner:    Katherine Spencer



ID:          DEF-003
Title:       The predetermined fallback response after the AI Analysis fails is dependent on the AI Analysis' timing so it takes longer than 30 seconds if the AI Analysis does so
Reported:    2026-11-06 by Katherine Spencer
Environment: 50f3b67, iPhone 11 Pro with iOS, Expo Go 58.0.5, time started from generating the AI Analysis recorded on an iPhone with throttled "Fast 3G" and seeded data

Requirement: NFR-AVA-01 (NFR-AVA-01-AC1)   Test case: TC-071

Steps to reproduce:
  1. Open Analysis Page
  2. Choose one prompt option
  3. Choose one prompt type 
  4. Choose one check-in duration
  5. Choose one journal duration
  6. Click Generate
  7. If AI Analysis Fails
  8. Predetermined Fallback Response is provided instead; check/record how long this takes

Expected: AI Analysis loads with its response within 25 seconds and a predetermined fallback isn't needed
Actual:   AI Analysis some times fails with its response taking longer than 30 seconds and whenever the AI Analysis does fail then the predetermined fallback response pops up right away when this happens so the predetermined fallback response doesn't appear up within the 30 seconds like expected but the predetermined fallback response still appears right away

Evidence: TC-071 fails; After timing the AI Analysis response time when it fails it was consistently over 30 seconds which causes the predetermined fallback response to technically take longer than 30 seconds.

Severity: S3 — A requirement is partly met; where the whole point of if the AI Analysis fails, having a predetermined fallback response. However, the AI Analysis takes consistently longer that 30 seconds which causes the predetermined fallback response to techinally take longer than 30 seconds and this is an AC of NFR-AVA-01.

Priority: P4 — it isn't that crucial or something that techinally needs to be fixed as the predetermined fallback response appears right away when the AI Analysis fails anyways, though its still a defect as the AC can't be fully fulfilled. 

Status:   Not Fixed.
Owner:    Katherine Spencer



ID:          DEF-004
Title:       The Check in input spinner base number shown on the UI is misleading
Reported:    2026-11-06 by Katherine Spencer
Environment: d2329ef, iPhone 11 Pro with iOS, Expo Go 58.0.5, submitting check-ins on an iPhone with throttled "Fast 3G"

Requirement: FR-QUES-01 (FR-QUES-01-AC1)   Test case: TC-001

Steps to reproduce:
  1. Open Check In Page
  2. Input all fields that are required but leave the input spinners at zero or one
  3. Submit Check-In
  4. Check if it stops you if you forgot to input a required input spinner field and that input spinner still has a 0 or 1 in it
  4. Check what the input spinner fields state in the database

Expected: Check-in input spinner fields start blank and if required still state a field is missing, with no 0, 1, or other answer in it; then if it's not required and submitted blank then it should return null but when it's submitted with a 1 or 0 still returning that field in the database if allowed
Actual:   The Check in input spinner base number shown on the UI is either 0 or 1, however, if an answer isn't clicked when the check-in isn't required the database is given null not 0 or if it stays at 1 if the individual wants 1 it should stay and input 1 not claim a missing field, so they should start blank

Evidence: After checking the database after testing check ins and playing with the input spinner the input spinner results are misleading as can seen/checked currently on the UI

Severity: S4 — How the check-in's UI input spinner presents is a bit misleading so it would be beneficial to fix and only slightly affects functionality

Priority: P2 — I would like to fix this sooner than later as though it isn't critical it is something than make the useability cleaner and would be nice to fix.

Status:   Not Fixed Yet.
Owner:    Katherine Spencer



ID:          DEF-005
Title:       The Check in picker base field when an non required field changed from answered to unanswer result is misleading
Reported:    2026-11-06 by Katherine Spencer
Environment: d2329ef, iPhone 11 Pro with iOS, Expo Go 58.0.5, submitting check-ins on an iPhone with throttled "Fast 3G"

Requirement: FR-QUES-01 (FR-QUES-01-AC2)   Test case: TC-085

Steps to reproduce:
  1. Open Check In Page
  2. Input fields in all areas then in a input spinner that is not required change the answered field back to it's "title"
  3. It says an error happened when submitting the check in

Expected:   The check-in picker when change from answered to then unanswered goes back to returning null when it's not required and null is also saved to the database, so no error happens
Actual:   The check-in picker when change from answered to then unanswered states that an error happened when submitting a check in

Evidence: The error appears when an non required check in picker field goes from answered to unanswered this can misleading as can seen/checked currently on the UI as it should just submit and input null

Severity: S4 — How the check-in's picker presents is a bit misleading so it would be beneficial to fix, though it only slightly affects functionality

Priority: P2 — I would like to fix this sooner than later as though it isn't critical it is something than make the useability cleaner and would be nice to fix, even though it still presents an error when this happens, I think it would be better to switch to submitting null when a non required field is changed back to being unanswered.

Status:   Not Fixed Yet.
Owner:    Katherine Spencer



ID:          DEF-006
Title:       AI Analysis message when only one data duration is selected is misleading
Reported:    2026-11-06 by Katherine Spencer
Environment: 50f3b67, iPhone 11 Pro with iOS, Expo Go 58.0.5, done with at least 1 check in or journal entry recorded on an iPhone with throttled "Fast 3G"; seeded data

Requirement: FR-AIA-01 (FR-AIA-01-AC1) & FR-AIA-04 (FR-AIA-04-AC1)   Test case: TC-038, TC-065

Steps to reproduce:
  1. Open Analysis Page
  2. Choose one prompt option
  3. Choose one prompt type 
  4. Choose one check-in duration or one journal duration, 
  5. Click Generate
  6. Note error message
  7. Then click on the other that wasn't choosen without clicking a duration though
  8. Click Generate
  9. Note error message

Expected: A consistent error message across the instances when either just one duration or one duration and just a button is chosen that just states: to select a duration for both Check-in and Journal Entry ranges
Actual:   An error appears that differs where when one duration is clicked it states to: more check-in question responses and journal entries are needed before...;then when a duration and the others button is click it states to select a duration from a least one of the sections: Check-ins or Journal Entries

Evidence: After clicking one duration or then one duration and a button for the durations the error messages differ

Severity: S4 — How the error messages for duration are presents is a bit misleading as they both are for the same reasons so it would be nice to fix it and it only slightly affects usability

Priority: P2 — I would like to fix this sooner than later as though it isn't critical it is something than make the error message cleaner and would be nice to fix, even though it still presents an error when this happens, I think it would be better to switch to a consistent error message.

Status:   Not Fixed Yet.
Owner:    Katherine Spencer



ID:          DEF-007
Title:       AI Analysis duration buttons allow for the selected duration to be removed
Reported:    2026-11-06 by Katherine Spencer
Environment: 50f3b67, iPhone 11 Pro with iOS, Expo Go 58.0.5, done with at least 1 check in or journal entry recorded on an iPhone with throttled "Fast 3G"; seeded data

Requirement: FR-AIA-01 (FR-AIA-01-AC1) & FR-AIA-04 (FR-AIA-04-AC1)   Test case: TC-038, TC-065

Steps to reproduce:
  1. Open Analysis Page
  2. Click either duration button 
  3. Click a duration
  4. Click the duration button again
  5. See/Check that the duration is cleared

Expected: When the either duration button is clicked on when a duration is chosen then it doesn't clear the duration
Actual:   When the either duration button is clicked on when a duration is chosen it does clears the duration for that data type

Evidence: After clicking the duration button, a duration, then the same duration button again it clears the duration

Severity: S4 — The clearing from clicking on the same duration button again is not intended and both durations for Analysis are needed so it shouldn't be empty anyways so it would be good to fix though it doesn't affect functionality that much.

Priority: P2 — I would like to fix this sooner than later as though it isn't critical it is something that shouldn't be happening so it is good to fix it even though the durations still work as expected, this clearing isn't so it is better to fix it.

Status:   Not Fixed Yet.
Owner:    Katherine Spencer



ID:          DEF-008
Title:       Journal Seeded data date is wrong
Reported:    2026-11-06 by Katherine Spencer
Environment: 1f4926d, iPhone 11 Pro with iOS, Expo Go 58.0.5, done with at least 1 journal entry recorded on an iPhone with throttled "Fast 3G"; seeded data

Requirement: FR-JOU-01 (FR-JOU-01-AC1)  Test case: TC-023

Steps to reproduce:
  1. Open Journal Page
  2. Click look at seeded data
  3. Check date
  4. See that date is one day ahead

Expected: The seeded data date is the same day that as the seeded data was inputted
Actual:   The seeded data date is one day ahead of the day it is

Evidence: After opening the journal page it can be viewed that the date is one day ahead when checking the date

Severity: S4 — Viewing the differences in the dates isn't that bad but can be confusing that they are different, they shouldn't be different so it would be good to fix though it doesn't affect really useability much.

Priority: P3 — I would like to fix this sooner than later as though it isn't critical it is something that shouldn't be happening so it is good to fix it even though the normal journal page date still work as expected.

Status:   Not Fixed Yet.
Owner:    Katherine Spencer



ID:          DEF-009
Title:       Analysis page data selection buttons are too close to the edges of the screen
Reported:    2026-11-06 by Katherine Spencer
Environment: 1f4926d, iPhone 11 Pro with iOS, Expo Go 58.0.5, recorded on an iPhone with throttled "Fast 3G"

Requirement: NFR-PORT-02 (NFR-PORT-02-AC1)  Test case: TC-084

Steps to reproduce:
  1. Open Analysis Page
  2. Click duration buttons
  3. Look at both the duration buttons and the duration and see the spacing

Expected: The duration component has a bit of a gap from the sides of the screen
Actual:   The duration component has no gap from the sides of the screen

Evidence: After opening the analysis page it can be viewed that the duration component has no gaps to give room to the side of the screen and the duration component

Severity: S4 — The buttons are not cut of but they could be thought as and it isn't as visually pleasing to have no space in between UI components

Priority: P2 — I would like to fix this sooner than later as though it isn't critical it is something that would be good to fit so it isn't misunderstood to be cut off.

Status:   Not Fixed Yet.
Owner:    Katherine Spencer



ID:          DEF-010
Title:       Check in input spinner allows for clicking into and inputting a number
Reported:    2026-11-06 by Katherine Spencer
Environment: d2329ef, iPhone 11 Pro with iOS, Expo Go 58.0.5, recorded on an iPhone with throttled "Fast 3G"

Requirement: FR-QUES-01 (FR-QUES-01-AC1)   Test case: TC-001

Steps to reproduce:
  1. Open Check-In Page
  2. Double tap on the white space in the input spinner 
  3. View how a number can be inputted in it

Expected: No number is able to be inputted through typing a number only through the +/- buttons
Actual:   Numbers are able to be inputted through typing a number not just through the +/- buttons

Evidence: After opening the check in page and double tapping the input spinner white space a number keyword appears and numbers can be inputted from it

Severity: S4 — The clicking into the input spinner is not intended as it was intended to just use the +/- buttons to increase the number and so it would be good to fix this and it doesn't affect functionality that much.

Priority: P2 — I would like to fix this sooner than later as though it isn't critical it is something that would be good to fit so it isn't also misused.

Status:   Not Fixed Yet.
Owner:    Katherine Spencer
---

## Severity ladder (how bad is it, in the product)

| Code | Meaning | Test |
|---|---|---|
| S1 | Data loss, security exposure, or the system will not run | Would you stop a release for it? Yes. |
| S2 | A Must requirement is not met; no acceptable workaround | Yes, unless documented and accepted. |
| S3 | A requirement is partly met, or there is a real workaround | No — but it is written down. |
| S4 | Cosmetic, wording, or a Could-priority gap | No. |

## Priority ladder (when do we fix it, given the calendar)

| Code | Meaning |
|---|---|
| P1 | Fix now — next thing you touch |
| P2 | Fix this iteration |
| P3 | Fix if hours remain; otherwise ship it as a known defect |
| P4 | Will not fix — recorded, with the reason |

Severity is a fact about the product. Priority is a decision about your remaining hours. They are set by different people in industry, and by the same person wearing two different hats here — write down which hat you were wearing.

Tester

---

## Defect log table

| ID | Title | Req | Sev | Pri | Found by | Status | Fix commit | Regression test |
|---|---|---|---|---|---|---|---|---|
| DEF-001 | AI Analysis isn't able to response back within twenty five seconds | FR-AIA-01, FR-AIA-04, NFR-PERF-01 | S3 | P3 | Katherine Spencer | Not Fixed Yet | — | TC-038, TC-065, TC-069 |
| DEF-002 | The toast after the AI Analysis fails is dependent on the AI Analysis' timing so it takes longer than 30 seconds if the AI Analysis does so | FR-AIA-01, FR-AIA-04 | S3 | P4 | Katherine Spencer | Not Fixed | — | TC-096, TC-099 |
| DEF-003 | The predetermined fallback response after the AI Analysis fails is dependent on the AI Analysis' timing so it takes longer than 30 seconds if the AI Analysis does so | NFR-AVA-01 | S3 | P4 | Katherine Spencer | Not Fixed | — | TC-071 |
| DEF-004 | The Check in input spinner base number shown on the UI is misleading | FR-QUES-01 | S4 | P2 | Katherine Spencer | Not Fixed Yet | — | TC-001 |
| DEF-005 | The Check in picker base field when an non required field changed from answered to unanswer result is misleading | FR-QUES-01 | S4 | P2 | Katherine Spencer | Not Fixed Yet | — | TC-085 |
| DEF-006 | AI Analysis message when only one data duration is selected is misleading | FR-AIA-01, FR-AIA-04 | S4 | P2 | Katherine Spencer | Not Fixed Yet | — | TC-038, TC-065 |
| DEF-007 | AI Analysis duration buttons allow for the selected duration to be removed | FR-AIA-01, FR-AIA-04 | S4 | P2 | Katherine Spencer | Not Fixed Yet | — | TC-038, TC-065 |
| DEF-008 | Journal Seeded data date is wrong | FR-JOU-01 | S4 | P3 | Katherine Spencer | Not Fixed Yet | — | TC-023 |
| DEF-009 | Analysis page data selection buttons are too close to the edges of the screen | NFR-PORT-02 | S4 | P2 | Katherine Spencer | Not Fixed Yet | — | TC-084 |
| DEF-010 | Check in input spinner allows for clicking into and inputting a number | FR-QUES-01 | S4 | P2 | Katherine Spencer | Not Fixed Yet | — | TC-001 |