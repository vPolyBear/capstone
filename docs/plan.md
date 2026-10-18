# Work Breakdown, Schedule & Burn-Down — Template

## 1. Rules this plan obeys

- **The 100 percent rule.** The children of any node sum to *all* of that node's work — no more, no less.
  If it is not in the WBS, it is not in the plan, and it will not get done.
- **Task size: 1–6 hours.** Under one hour is noise. Over six hours means you do not yet understand it —
  split it, or write a spike for it.
- **Every task traces.** A task carries a requirement identifier from `docs/requirements.md`, or it is
  enabling work (`-`) and the plan says why it exists.
- **Every task has a done-when.** One sentence, verifiable by somebody who is not you.

## 2. Capacity — Weeks 8–16

| Week | What it is | Course overhead: Chapter, quiz, reps, milestone write-up | Available for this plan | Known losses |
|---|---:|---:|
| 8 | Design review + midterm checkpoint | 12 | 8 | none |
| 9 | Walking skeleton + CI | 7 | 13 | none |
| 10 | Iteration one: the core | 5 | 15 | none |
| 11 | Testing, quality, defect log | 7 | 13 | none |
| 12 | Iteration two: integration | 7 | 13 | none |
| 13 | Documentation | 7 | 13 | none |
| 14 | Deployment and handoff | 7 | 13 | non |
| 15 | Presentation preparation | 7 | 13 | none |
| 16 | Delivery day | 7 | 13 | none |
| **Total** | **66** | **114** |

Declared project buffer: **25%** of available hours = **28.5 h**
Plannable effort (available − buffer) = **85.5 h**
- Default buffer seems reasonable for my project and speed

## 3. Work breakdown

### WP-1 — Check-in Questions  ·  requirements FR-QUES-01, FR-QUES-02  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-1.1 | Add in the check in questions (10 main) | FR-QUES-01 | 1 | 2 | 3 | 2.0 | The check in questions are displayed and can be answered | — |
| T-1.2 | Submiting the check in questions | FR-QUES-01 | 1 | 2 | 3 | 2.0 | The check in questions can be submitted when the submit button is clicked and the responses are saved to SQLite, they should also be visible on the Overview pages graphs | T-1.1 |
| T-1.3 | Check for missing check in questions | FR-QUES-01 | 1 | 2 | 3 | 2.0 | When a required check in question is missing it must prevent the individual from submitting and state that the check in question must be completed before proceeding | T-1.1, T-1.2 |
| T-1.4 | Save failure | FR-QUES-01 | 1 | 2 | 3 | 2.0 | The app provides a response that the check ins were not properly saved if it fails to save or they disappear | T-1.1, T-1.2 |
| T-1.5 (deffered) | Edit a check in response | FR-QUES-02 | 1 | 2 | 3 | 2.0 | Individual can edit a check in question they did that day when selecting edit to change a response | T-1.1, T-1.2 |
| T-1.6 (deffered) | Count of completed check ins | FR-QUES-03 | 1 | 2 | 3 | 2.0 | Individual can see how many checks they have completed through a toast when they submit | T-1.1, T-1.2 |

### WP-2 — Overview  ·  requirements FR-OVER-01, FR-OVER-02  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-2.1 | Create the weekly graphs | FR-OVER-01 | 1 | 2 | 4 | 2.2 | When switched to check ins done in a specific week are displayed on the weekly graphs | — |
| T-2.2 | Create the monthly graphs | FR-OVER-01 | 1 | 2 | 4 | 2.2 | When switched to check ins done in a specific month are displayed on the monthly graphs | T-2.1 |
| T-2.3 | Empty graphs view | FR-OVER-01 | 1 | 3 | 4 | 2.8 | Display that there are no check ins done on the weekly/monthly graphs when there are no check ins done yet for that week or month and state that more check in responses are needed before results can appear | T-2.1, T-2.2 |
| T-2.4 | Graphs loading view | FR-OVER-01 | 1 | 3 | 4 | 2.8 | When a graph is loading it should have a loading symbol and if it doesn't load in 5 seconds then a load fail message should pop up | T-2.1, T-2.2 |
| T-2.5 (deffered) | Extra goals at the top | FR-OVER-02 | 1 | 2 | 3 | 2.0 | At the top of the Overview page there are stress relieving based goals, both predetermined ones and custom written ones to choose from. | T-2.1, T-2.2 |

### WP-3 — Journal  ·  requirements FR-JOU-01, FR-JOU-02  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-3.1 | Create the text area for the entry | FR-JOU-01 | 1 | 2 | 3 | 2.0 | When an individual can enter in text for a journal entry | — |
| T-3.2 | Submiting the journal entry | FR-JOU-01 | 1 | 2 | 3 | 2.0 | The journal entry can be submitted when the submit button is clicked and the responses are saved to SQLite | T-3.1 |
| T-3.3 | Handle blank journal entries | FR-JOU-01 | 1 | 2 | 3 | 2.0 | When a journal entry is made but nothing is entered or only spaces are entered then the journal entry should not be displayed or be saved | T-3.1, T-3.2 |
| T-3.4 | Crashes and save failure | FR-JOU-01 | 1 | 3 | 4 | 2.8 | The app should prompt that the data entered in recently might not have been saved if there is a crash or it should provide a response they were not properly saved if it fails to save | T-3.1 |
| T-3.5 | Edit Journal Entry | FR-JOU-02 | 1 | 2 | 3 | 2.0 | An individual can edit a journal entry they did that day when it is clicked and the journal entry that they wanted to edit is pulled up and changes when submitted again | T-3.1, T-3.2 |
| T-3.6 (deffered) | Text Length Counting & Warning | FR-JOU-03 | 1 | 2 | 3 | 2.0 | When typing the word aligns with the amount of words written and the count increases when typing and decreases when deleting letters | T-3.1 |

### WP-4 — Destressing activities  ·  requirements FR-ACT-01  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-4.1 | Create the 5 sections for the destressing activities | FR-ACT-01 | 1 | 2 | 3 | 2.0 | When there are 5 sections that can be clicked into on the Destressing activities page | — |
| T-4.2 | Create the breathing activities | FR-ACT-01 | 2 | 3 | 5 | 3.2 | There are at least two breathing activities displayed that can be run and played | T-4.1 |
| T-4.3 | Create the creative and sounds activities | FR-ACT-01 | 2 | 3 | 4 | 3.0 | There are at least two of each the creative and sounds activities displayed that can be run and played | T-4.1 |
| T-4.4 | Create the physical and self care activities | FR-ACT-01 | 1 | 2 | 3 | 2.0 | There are at least two of each the physical and self care activities displayed that can be run and played | T-4.1 |
| T-4.5 | Handle failure and resume state | FR-ACT-01 | 1 | 3 | 4 | 2.8 | When an individual clicks on a destressing activity and it does not start then a toast should pop up or if an activity is started but the app is left for 5 seconds then the activity should resume from the state it was in when reentered within 5 seconds | T-4.1, T-4.2, T-4.3, T-4.4 |
| T-4.6 (deffered) | Random Activity Chooser | FR-ACT-03 | 1 | 2 | 3 | 2.0 | A random destressing activity pops up and can be chosen when the random activity button is clicked. If the pop up activity chosen is clicked on then it goes directly to that activity. | T-4.2, T-4.3, T-4.4 |

### WP-5 — AI Analysis  ·  requirements FR-AIA-01, FR-AIA-04,  NFR-PRIV-01, NFR-PRIV-02, NFR-PERF-01, NFR-AVA-01, NFR-SEC-01  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-5.1 | Link the Mobile app to the Supabase Edge Function | FR-AIA-01, FR-AIA-04 | 1 | 2 | 4 | 2.2 | The Mobile app is able to send the request to the Supabase Edge Function | — |
| T-5.2 | Link the Supabase Edge Function to the Gemini AI API | FR-AIA-01, FR-AIA-04, NFR-SEC-01 | 1 | 2 | 4 | 2.2 | The Supabase Edge Function is able to send the request it got to the Gemini AI API and receive a response from the Gemini AI API, while the Gemini API key is kept secure and isn't exposed or sent to the mobile app | T-5.1 |
| T-5.3 | Provide predetermined prompts for suggestion based explanations and destressing activities | FR-AIA-01, FR-AIA-04 | 1 | 2 | 3 | 2.0 | Prompts are selectable for analysis and provide the proper response back based on the selected on | T-5.1, T-5.2 |
| T-5.4 | Select the check ins and journal entries wanted for the analysis | FR-AIA-01, FR-AIA-04, NFR-PRIV-01, NFR-PRIV-02 | 2 | 3 | 4 | 3.0 | The check ins and journal entries can be selected and are the only ones sent through for the analysis, no other unrelated, unchecked information is sent | T-5.1, T-5.2 |
| T-5.5 | Display and check the received response | FR-AIA-01, FR-AIA-04, NFR-PERF-01 | 1 | 3 | 4 | 2.8 | The suggestion based explanation or destressing aid is displayed on the UI within a p95 under 25 seconds | T-5.1, T-5.2, T-5.3, T-5.4 |
| T-5.6 | Keyword Fallback analysis and testing | FR-AIA-01, FR-AIA-04, NFR-AVA-01 | 2 | 3 | 5 | 3.2 | The keyword fallback provides an analysis when Gemini or Supabase is unavailable, times out, error, or provides an invalid response within 30 seconds | T-5.1, T-5.2, T-5.3, T-5.4 |
| T-5.7 | AI Analysis and Supabase Edge Function documentation, testing, and error handling | FR-AIA-01, FR-AIA-04, NFR-AVA-01 | 1 | 3 | 4 | 2.8 | Checks have been done for changes in each dependencies documentation weekly, and tests succeed that hande malformed responses, missing fields, API errors, and other invalid results, the specific errors are then returned when a request can not be processed on both iOS and Android. | T-5.1, T-5.2, T-5.3, T-5.4, T-5.5 |

### WP-6 — Setup  ·  requirements FR-QUES-01, FR-JOU-01  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-6.1 | Set up the repository and the CI | — | 1 | 2 | 3 | 2.0 | The repository is made and the projects files can be comitted to it, the CI also runs successfully | — |
| T-6.2 | Expo/React Native and SQLite set up | FR-QUES-01, FR-JOU-01 | 1 | 2 | 3 | 2.0 | Expo Go properly opens the pages and check ins and journal entries can be saved and retrieve from the SQLite database for the other features | T-6.1 |

## WP-7 — Pass through tests ·  requirements NFR-REL-01, NFR-ACC-01, NFR-ACC-02, NFR-SEC-02, NFR-USE-01, NFR-USE-02, NFR-PORT-01, NFR-PORT-02, NFR-PORT-03 ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-7.1 | Reliability pass through | NFR-REL-01, NFR-USE-01, NFR-SEC-02 | 1 | 2 | 3 | 2.0 | Individuals can run the app 9 out of 10 times without any errors and without seeing any exposed technical errors or help | WP-01, WP-02, WP-03, WP-04, WP-05 |
| T-7.2 (deffered) | Portibility pass through | NFR-PORT-01, NFR-PORT-02, NFR-PORT-03 | 1 | 2 | 3 | 2.0 | Individuals can go through the app and complete each feature on both an iOS and Android phone in both portrait and landscape mode without any errors | WP-01, WP-02, WP-03, WP-04, WP-05 |
| T-7.3 | Accessibility pass through | NFR-ACC-01, NFR-ACC-02, NFR-USE-02 | 1 | 2 | 3 | 2.0 | Individuals can go through the app without any problems reading, looking, and completing each of the features and seeing and identifing there success and failure message without any problems | WP-01, WP-02, WP-03, WP-04, WP-05 |

## WP-8 — Documentation, deployment, and release  ·  requirements NFR-MNT-01, NFR-SEC-01  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-8.1 | README | NFR-MNT-01 | 2 | 4 | 5 | 3.8 | The README describes how to create a clean clone of the repository to reach a running app in under 10 minutes with 0 errors | — |
| T-8.2 | Runbook and handoff guide | — | 2 | 3 | 5 | 3.2 | The runbook/handoff guids explains to the next maintainer how to run, configure, understand, and maintain the app | T-8.1 |
| T-8.3 | Deploy with configured secrets and a smoke check | NFR-SEC-01 | 1 | 2 | 3 | 2.0 | The app is deployed and runs on a clean machine with the secrets configured without any in any commit and a smoke test goes successfully | T-8.1, T-8.2 |
| T-8.4 | Test deploying the Expo app on Week 12 | — | 1 | 2 | 3 | 2.0 | The app is deployed and runs successfully | T-8.1, T-8.2 |

## 4. Roll-up

| Work package | Tasks | Raw E (h) | Calibrated (h) |
|---|---:|---:|---:|
| WP-1-Check-in Questions | 4 | 8 | 8.8 |
| WP-2-Overview | 4 | 10 | 11 |
| WP-3-Journal | 5 | 10.8 | 11.88 |
| WP-4-Destressing activities | 5 | 13 | 14.3 |
| WP-5-AI Analysis | 7 | 18.2 | 20.02 |
| WP-6-Setup | 1 left | 2.0 | 2.2 |
| WP-7-Pass through tests | 2 | 4.0 | 4.4 |
| WP-8-Deployment and release | 3 | 11 | 12.1 |
| **Total** | 31 | **77** | **84.7** |

Calibration factor from `docs/hours-log.csv`: **1.10×**
-  1.10x factor comes from docs/hours-log.csv (42 rows, Rep 6)

## 5. Schedule

| Week | Work packages in flight | Planned hours | Gate / dependency |
|---|---|---:|---|
| 8 | Review fixes, re-baseline the plan | 8 | Specification is frozen; the plan fits the capacity | 
| 9 | WP-6 enabling, WP-1 + WP-3 first slice, WP-5 first analysis slice | 13 | Expo/React Native and SQLite are able to take in check ins and journal entries, and the analysis has all of it's connections working when linked together and the predetermined prompts can be inputted |
| 10 | WP-5 analysis, WP-5 fallback | 15 | The result from the Gemini AI API based on the selected check ins and journal entries present on screen an analysis response and errors are handled, and the analysis fallback can provide a response |
| 11 | WP-2 overview,  WP-4 first slice | 13 | The overview page has weekly + monthly graphs that show either the results of check ins, or the empty or loading views, and the sections for the activites are created and the breathing activities are started  |
| 12 | WP-1 check-in tests, WP-3 journal tests, WP-4 activites | 13 | The missing/blank response and saving tests succeed, editing a journal entry works, and the rest of the activites are created and tests succeed |
| 13 | WP-7 first slice, WP-8 documentation slice | 13 | One pass through test must pass, and an individual can clone and run the app from the README alone |
| 14 | WP-7 pass through, WP-8 deployment and release | 13 | All the pass through test succeed and the app is reliable and accessible, and is deployed and reproducible from a clean machine |
| 15 | Final fixes from development and the clean-machine test | 13 | No high severity bugs or errors present |
| 16 | Delivery | 13 | Tagged release; submitted |

Rules: risky work first, integration before Week 12, nothing new starts after Week 14.

## 6. Burn-down baseline

| Week | Capacity | Ideal remaining | Projected remaining |
|---|---:|---:|---:|
| 8 | 8.0 | 85.5 | 84.7 |
| 9 | 13.0 | 79.5 | 76.7 |
| 10 | 15.0 | 69.8 | 63.7 |
| 11 | 13.0 | 58.5 | 48.7 |
| 12 | 13.0 | 48.8 | 35.7 |
| 13 | 13.0 | 39.0 | 22.7 |
| 14 | 13.0 | 29.2 | 9.7 |
| 15 | 13.0 | 19.5 | -3.3 |
| 16 | 13.0 | 9.8 | -16.3 |
| end | - | 0.0 | -29.3 |

First week the plan exceeds remaining capacity: **never**
Hours over plannable: **-0.8**
- VERDICT: fits, with 0.8 h to spare

## 7. The scope decision

| Cut / deferred / re-estimated | Item | Reqs | Hours recovered | MoSCoW before → after | Why |
|---|---|---|---:|---|---|
| deffered | T-3.6 | FR-JOU-03 | 2.0 | Could → Won't | I think that the text length counting can be useful in the future but it not pertinent to the shipment currently  |
| deffered | T-1.6 | FR-QUES-03 | 2.0 | Should → Won't | Counting check ins is a good task but not necessary to do right away, better to be done in the future after the main features are done |
| deffered | T-2.5 | FR-OVER-02 | 2.0 | Should → Won't | This could definitely help an individual stay more encourged to manage their stress if they have a goal to look forword too but its not super important right now |
| deffered | T-4.6 | FR-ACT-03 | 2.0 | Should → Won't | This will already in a way be done in the Analysis page so it does not need to be shipped until the future |
| deffered | T-7.2 | NFR-PORT-01, NFR-PORT-03 | 2.0 | Should → Won't; Could → Won't | It can be genuinely helpful to be able to run the app on both iOS and Android in portrait and landscape mode without running into any errors or problems but iOS and portait mode is the focus and Android and landscape mode would a bonus for the future |
| deffered | T-1.5 | FR-QUES-02 | 2.0 | Should → Won't | Editing a check in would be nice to have however I believe that check ins won't really need to be edited to frequently by anyone as they are more for checking in at that current moment so changing it later doesn't make to much sense to me so I believe it's better done in the future after shipping with more evidence if it would be truly useful or not |
| re-estimate | T-8.3 | NFR-SEC-01 | 3.2 → 2.0 | Must → Must | I added a working package to test deploying the Expo app on Week 12 ahead of time so since I'll know how to work around deploying the main app it will lessen the hours |


Signed: Katherine Spencer, 2026-10-10. Re-baselined after any change of more than 5 hours.