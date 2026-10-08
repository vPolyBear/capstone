# Work Breakdown, Schedule & Burn-Down — Template

## 1. Rules this plan obeys

- **The 100 percent rule.** The children of any node sum to *all* of that node's work — no more, no less.
  If it is not in the WBS, it is not in the plan, and it will not get done.
- **Task size: 1–6 hours.** Under one hour is noise. Over six hours means you do not yet understand it —
  split it, or write a spike for it.
- **Every task traces.** A task carries a requirement identifier from `docs/requirements.md`, or it is
  enabling work (`-`) and the plan says why it exists.
- **Every task has a done-when.** One sentence, verifiable by somebody who is not you.

## 2. Capacity — Weeks <N>–16

| Week | Chapter, quiz, reps, milestone write-up | Available for this plan |
|---|---:|---:|
| <8> | <11> | <4> |
| … | … | … |
| **Total** | **<48>** | **<87>** |

Declared project buffer: **<25>%** of available hours = **<21.8> h**
Plannable effort (available − buffer) = **<65.2> h**

## 3. Work breakdown

### WP-01 — Check-in Questions  ·  requirements FR-QUES-01, FR-QUES-02  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-1.1 | Add in the check in questions | FR-QUES-01 | 1 | 2 | 3 | 2.0 | The check in questions are displayed and can be answered | — |
| T-1.2 | Submiting the check in questions | FR-QUES-01 | 1 | 2 | 3 | 2.0 | The check in questions can be submitted when the submit button is clicked and the responses are saved to SQLite, they should also be visible on the Overview pages graphs | T-1.1 |
| T-1.3 | Check for missing check in questions | FR-QUES-01 | 1 | 2 | 3 | 2.0 | When a required check in question is missing it must prevent the individual from submitting and state that the check in question must be completed before proceeding | T-1.1, T-1.2 |
| T-1.4 | Save failure | FR-QUES-01 | 1 | 2 | 3 | 2.0 | The app provides a response that the check ins were not properly saved if it fails to save | T-1.1, T-1.2 |
| T-1.5 | Edit a check in response | FR-QUES-02 | 1 | 2 | 3 | 2.0 | Individual can edit a check in question they did that day when selecting edit to change a response | T-1.1, T-1.2 |
| T-1.6 | Count of completed check ins | FR-QUES-03 | 1 | 2 | 3 | 2.0 | Individual can see how many checks they have completed through a toast when they submit | T-1.1, T-1.2 |

### WP-02 — Overview  ·  requirements FR-OVER-01, FR-OVER-02  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-2.1 | Create the weekly graphs | FR-OVER-01 | 1 | 2 | 4 | 2.2 | When switched to check ins done in a specific week are displayed on the weekly graphs | — |
| T-2.2 | Create the monthly graphs | FR-OVER-01 | 1 | 2 | 4 | 2.2 | When switched to check ins done in a specific month are displayed on the monthly graphs | T-2.1 |
| T-2.3 | Empty graphs view | FR-OVER-01 | 1 | 3 | 4 | 2.8 | Display that there are no check ins done on the weekly/monthly graphs when there are no check ins done yet for that week or month and state that more check in responses are needed before results can appear | T-2.1, T-2.2 |
| T-2.4 | Graphs loading view | FR-OVER-01 | 1 | 3 | 4 | 2.8 | When a graph is loading it should have a loading symbol and if it doesn't load in 5 seconds then a load fail message should pop up | T-2.1, T-2.2 |
| T-2.5 | Extra goals at the top | FR-OVER-02 | 1 | 2 | 3 | 2.0 | At the top of the Overview page there are stress relieving based goals, both predetermined ones and custom written ones to choose from. | T-2.1, T-2.2 |

### WP-03 — Journal  ·  requirements FR-JOU-01,  FR-JOU-02  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-3.1 | Create the text area for the entry | FR-JOU-01 | 1 | 2 | 3 | 2.0 | When an individual can enter in text for a journal entry | — |
| T-3.2 | Submiting the journal entry | FR-JOU-01 | 1 | 2 | 3 | 2.0 | The journal entry can be submitted when the submit button is clicked and the responses are saved to SQLite | T-3.1 |
| T-3.3 | Handle blank journal entries | FR-JOU-01 | 1 | 2 | 3 | 2.0 | When a journal entry is made but nothing is entered or only spaces are entered then the journal entry should not be displayed or be saved | T-3.1, T-3.2 |
| T-3.4 | Crashes and save failure | FR-JOU-01 | 1 | 3 | 4 | 2.8 | The app should prompt that the data entered in recently might not have been saved if there is a crash or it should provide a response they were not properly saved if it fails to save | T-3.1 |
| T-3.5 | Edit Journal Entry | FR-JOU-02 | 1 | 2 | 3 | 2.0 | An individual can edit a journal entry they did that day when it is clicked and the journal entry that they wanted to edit is pulled up and changes when submitted again | T-3.1, T-3.2 |
| T-3.6 | Text Length Counting & Warning | FR-JOU-03 | 1 | 2 | 3 | 2.0 | When typing the word aligns with the amount of words written and the count increases when typing and decreases when deleting letters | T-3.1 |

### WP-04 — Destressing activities  ·  requirements FR-ACT-01  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-4.1 | Create the 5 sections for the destressing activities | FR-ACT-01 | 1 | 2 | 3 | 2.0 | When there are 5 sections that can be clicked into on the Destressing activities page | — |
| T-4.2 | Create the breathing activities | FR-ACT-01 | 2 | 3 | 5 | 3.2 | There are at least two breathing activities displayed that can be run and played | T-4.1 |
| T-4.3 | Create the creative and sounds activities | FR-ACT-01 | 2 | 3 | 4 | 3.0 | There are at least two of each the creative and sounds activities displayed that can be run and played | T-4.1 |
| T-4.4 | Create the physical and self care activities | FR-ACT-01 | 1 | 2 | 3 | 2.0 | There are at least two of each the physical and self care activities displayed that can be run and played | T-4.1 |
| T-4.5 | Handle failure and resume state | FR-ACT-01 | 1 | 3 | 4 | 2.8 | When an individual clicks on a destressing activity and it does not start then a toast should pop up or if an activity is started but the app is left then is should resume when reentered | T-4.1, T-4.2, T-4.3, T-4.4 |
| T-4.6 | Random Activity Chooser | FR-ACT-01 | 1 | 2 | 3 | 2.0 | A random destressing activity pops up and can be chosen when the random activity button is clicked. If the pop up activity chosen is clicked on then it goes directly to that activity. | T-4.2, T-4.3, T-4.4 |

### WP-05 — AI Analysis  ·  requirements FR-AIA-01, FR-AIA-04,  NFR-PRIV-01, NFR-PRIV-02, NFR-PERF-01, NFR-AVA-01, NFR-SEC-01  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-5.1 | Link the Mobile app to the Supabase Edge Function | FR-AIA-01, FR-AIA-04 | 1 | 2 | 4 | 2.2 | The Mobile app is able to send the request to the Supabase Edge Function | — |
| T-5.2 | Link the Supabase Edge Function to the Gemini AI API | FR-AIA-01, FR-AIA-04, NFR-SEC-01 | 1 | 2 | 4 | 2.2 | The Supabase Edge Function is able to send the request it got to the Gemini AI API and receive a response from the Gemini AI API, while the Gemini API key is kept secure and isn't exposed or sent to the mobile app | T-5.1 |
| T-5.3 | Provide predetermined prompts for suggestion based explanations and destressing activities | FR-AIA-01, FR-AIA-04 | 1 | 2 | 3 | 2.0 | Prompts are selectable for analysis and provide the proper response back based on the selected on | T-5.1, T-5.2 |
| T-5.4 | Select the check ins and journal entries wanted for the analysis | FR-AIA-01, FR-AIA-04, NFR-PRIV-01, NFR-PRIV-02 | 2 | 3 | 4 | 3.0 | The check ins and journal entries can be selected and are the only ones sent through for the analysis, no other unrelated, unchecked information is sent | T-5.1, T-5.2 |
| T-5.5 | Display and check the received response displays on the UI within a p95 under 25 seconds | FR-AIA-01, FR-AIA-04, NFR-PERF-01 | 1 | 3 | 4 | 2.8 | The suggestion based explanation or destressing aid is displayed on the UI | T-5.1, T-5.2, T-5.3, T-5.4 |
| T-5.6 | Keyword Fallback analysis and testing it | FR-AIA-01, FR-AIA-04, NFR-AVA-01 | 2 | 3 | 5 | 3.2 | The keyword fallback provides an analysis when Gemini is unavailable, times out, error, or provides an invalid response within 30 seconds | T-5.1, T-5.2, T-5.3, T-5.4 |

### WP-06 — Setup  ·  requirements FR-QUES-01, FR-JOU-01  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-6.1 | Set up the repository and the CI | — | 1 | 2 | 3 | 2.0 | The repository is made and the projects files can be comitted to it, the CI also runs successfully | — |
| T-6.2 | Expo/React Native and SQLite set up | FR-QUES-01, FR-JOU-01 | 1 | 2 | 3 | 2.0 | Expo Go properly opens the pages and check ins and journal entries can be saved and retrieve from the SQLite database for the other features | T-6.1 |

## WP-07 — Pass through tests ·  requirements NFR-REL-01, NFR-ACC-01, NFR-ACC-02, NFR-SEC-02, NFR-USE-01, NFR-USE-02, NFR-PORT-01, NFR-PORT-02, NFR-PORT-03 ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-7.1 | Reliability pass through | NFR-REL-01, NFR-USE-01, NFR-SEC-02 | 1 | 2 | 3 | 2.0 | Individuals can run the app 9 out of 10 times without any errors and without seeing any exposed technical errors or help | WP-01, WP-02, WP-03, WP-04, WP-05 |
| T-7.2 | Portibility pass through | NFR-PORT-01, NFR-PORT-02, NFR-PORT-03 | 1 | 2 | 3 | 2.0 | Individuals can go through the app and complete each feature on both an iOS and Android phone in both portrait and landscape mode without any errors | WP-01, WP-02, WP-03, WP-04, WP-05 |
| T-7.3 | Accessibility pass through | NFR-ACC-01, NFR-ACC-02, NFR-USE-02 | 1 | 2 | 3 | 2.0 | Individuals can go through the app without any problems reading, looking, and completing each of the features and seeing and identifing there success and failure message without any problems | WP-01, WP-02, WP-03, WP-04, WP-05 |

## WP-08 — Deployment and release  ·  requirements NFR-MNT-01, NFR-SEC-01  ·  owner: Katherine Spencer
| T-8.1 | README | NFR-MNT-01 | 2 | 4 | 5 | 3.8 | The README describes how to create a clean clone of the repository to reach a running app in under 10 minutes with 0 errors | — |
| T-8.2 | Runbook and handoff guide | — | 2 | 3 | 5 | 3.2 | The runbook/handoff guids explains to the next maintainer how to run, configure, undertsand, and maintain the app | T-8.1 |
| T-8.3 | Deploy with configured secrets and a smoke check | NFR-SEC-01 | 2 | 3 | 5 | 3.2 | The app is deployed with the secrets configured without any in any commit and a smoke test goes successfully | T-8.1, T-8.2 |

## 4. Roll-up

| Work package | Tasks | Raw E (h) | Calibrated (h) |
|---|---:|---:|---:|
| WP-0 <enabling> | <2> | <5.3> | <6.1> |
| … | | | |
| **Total** | | **<86.2>** | **<97.9>** |

Calibration factor from `docs/hours-log.csv`: **<1.14>×**
(actual hours ÷ expected hours over the tasks you have already finished)

## 5. Schedule

| Week | Work packages in flight | Planned hours | Gate / dependency |
|---|---|---:|---|
| <9> | <WP-0, WP-2> | <12> | <CI green before any feature merges> |

Rules: risky work first, integration before Week 12, nothing new starts after Week 14.

## 6. Burn-down baseline

| Week | Capacity | Ideal remaining | Projected remaining |
|---|---:|---:|---:|
| <8> | <4.0> | <65.2> | <97.9> |

First week the plan exceeds remaining capacity: **<week 8>**
Hours over plannable: **<32.7>**

## 7. The scope decision

| Cut / deferred / re-estimated | Item | Reqs | Hours recovered | MoSCoW before → after | Why |
|---|---|---|---:|---|---|
| cut | <WP-5 recipe suggestion> | <FR-031, FR-032> | <12.9> | Could → Won't | <one honest sentence> |

Signed: <your name>, <date>. Re-baselined after any change of more than <5> hours.