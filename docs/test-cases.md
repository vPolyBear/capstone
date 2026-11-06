# Test Cases - Stress Manager

These cases cover requirements prioritized Must or Should that are not marked
deferred. Functional cases map to the numbered acceptance criteria in
`requirements.md`. Non-functional requirements do not list individual
acceptance criteria, so each is mapped to one case derived from its stated
measurement method. Won't-have and deferred requirements are excluded.

## Check-in

### TC-001  Verifies: FR-QUES-01-AC1   Level: acceptance   Data: Valid answers for every required check-in question
Preconditions: The check-in form is available and the local store can save responses.
Steps:  1. Complete and submit the check-in.  2. Open the Overview page.  3. Observe the response and graphs.
Expected: The submitted response is visible and the weekly/monthly graph reflects it within 7 seconds of opening Overview.
Fails if: The response is missing, graph data is unchanged, or the update takes longer than 7 seconds.

### TC-002  Verifies: FR-QUES-01-AC2   Level: integration   Data: One required check-in answer left empty
Preconditions: The check-in form is available.
Steps:  1. Leave a required answer empty.  2. Submit the check-in.  3. Observe the form and saved responses.
Expected: Submission is rejected within 5 seconds; the missing field is identified and no response is saved.
Fails if: The incomplete check-in is saved, the form does not identify the missing field, or feedback takes more than 5 seconds.

### TC-019  Verifies: FR-QUES-01-AC3   Level: integration   Data: Valid check-in answers; force local save failure
Preconditions: The check-in form is available and the test environment can simulate a storage failure.
Steps:  1. Enter valid answers.  2. Submit while storage failure is active.  3. Observe the response.
Expected: Within 5 seconds, a message says the check-in was not saved and advises retrying or redoing it.
Fails if: The app shows success, provides no failure guidance, or takes longer than 5 seconds to respond.

## Overview

### TC-020  Verifies: FR-OVER-01-AC1   Level: acceptance   Data: At least one saved check-in in the current week and month
Preconditions: Check-ins are saved and the Overview page is available.
Steps:  1. Open the weekly view.  2. Switch to the monthly view.  3. Observe each graph.
Expected: The weekly and monthly views display the corresponding check-in results within 5 seconds of each selection.
Fails if: Either view is missing, shows the wrong period's results, or takes longer than 5 seconds.

### TC-021  Verifies: FR-OVER-01-AC2   Level: acceptance   Data: No saved check-ins
Preconditions: The local store contains no check-in responses.
Steps:  1. Open the Overview page.  2. Observe the empty graph state.
Expected: Within 3 seconds, a message states that check-in responses are needed before results can appear.
Fails if: The app shows a misleading graph, no empty-state guidance, or the message appears after 3 seconds.

### TC-022  Verifies: FR-OVER-01-AC3   Level: integration   Data: Saved check-in; simulate graph data loading and loading failure
Preconditions: The Overview page is available and the test environment can delay and fail graph loading.
Steps:  1. Open Overview with loading delayed.  2. Observe the loading state.  3. Repeat with loading forced to fail.
Expected: The delayed load shows a loading message within 5 seconds; the failed load shows an error message.
Fails if: Either state is absent, or a failed load is presented as successful or remains indefinitely loading.

## Journal

### TC-023  Verifies: FR-JOU-01-AC1   Level: acceptance   Data: Non-empty journal entry
Preconditions: The journal page is available and local storage can save entries.
Steps:  1. Enter and submit a journal entry.  2. Reopen or refresh the journal view.  3. Locate the entry.
Expected: The exact submitted text is saved and visible within 15 seconds.
Fails if: The entry is absent, text differs, or it takes longer than 15 seconds to appear.

### TC-024  Verifies: FR-JOU-01-AC2   Level: integration   Data: Non-empty unsaved draft; simulate app crash
Preconditions: The journal page is available; draft content has been entered but not confirmed saved.
Steps:  1. Enter draft text.  2. Force-close the app before saving.  3. Reopen the app and observe the prompt.
Expected: Within 10 seconds of reopening, the app warns that recently entered journal data might not have been saved.
Fails if: The prompt is absent, incorrectly claims the draft was saved, or appears after 10 seconds.

### TC-025  Verifies: FR-JOU-01-AC3   Level: integration   Data: Non-empty journal entry; force local save failure
Preconditions: The journal page is available and the test environment can simulate a storage failure.
Steps:  1. Enter and submit an entry.  2. Observe the response and entry list.
Expected: Within 5 seconds, a message says the entry was not saved and advises retrying; the failed entry is not represented as saved.
Fails if: The app shows success, omits retry guidance, or responds after 5 seconds.

### TC-032  Verifies: FR-JOU-02-AC1   Level: integration   Data: Existing journal entry and replacement text
Preconditions: An entry created today is visible and local storage can save edits.
Steps:  1. Open the entry for editing.  2. Change its text and save.  3. Reopen the entry.
Expected: The edited text is visible within 10 seconds and the entry reflects the saved edit.
Fails if: The old text remains, the edit is lost, a duplicate entry is created instead, or it takes longer than 10 seconds.

### TC-033  Verifies: FR-JOU-02-AC2   Level: integration   Data: Existing saved entry; unsaved edit; simulate app crash
Preconditions: A journal entry is saved and can be edited.
Steps:  1. Change the entry without saving.  2. Force-close the app.  3. Reopen the app and observe the entry and prompt.
Expected: The previously saved text remains intact and, within 5 seconds of reopening, a prompt warns that the edit might not have been saved.
Fails if: The original saved text is erased, the prompt is missing, or the prompt takes more than 5 seconds.

### TC-034  Verifies: FR-JOU-02-AC3   Level: integration   Data: Existing entry with changed text; force local save failure
Preconditions: A journal entry is available to edit and the test environment can simulate a storage failure.
Steps:  1. Edit the entry.  2. Submit while storage failure is active.  3. Observe the response and stored entry.
Expected: Within 5 seconds, a message says the edit was not saved and advises retrying; the last saved entry remains available.
Fails if: The app reports success, gives no retry guidance, loses the last saved version, or responds after 5 seconds.

## Destressing activities

### TC-035  Verifies: FR-ACT-01-AC1   Level: acceptance   Data: Available activity that can be started and replayed
Preconditions: At least one activity is available.
Steps:  1. Select and complete the activity.  2. Return to its activity screen.  3. Start it again.
Expected: The activity can be started and is running again within 10 seconds of choosing it to replay.
Fails if: The activity cannot be replayed or does not run within 10 seconds.

### TC-036  Verifies: FR-ACT-01-AC2   Level: integration   Data: Activity configured to fail to start
Preconditions: An activity is visible and the test environment can simulate its startup failure.
Steps:  1. Select the activity.  2. Observe the result and any toast.
Expected: Within 15 seconds, a toast explains that the activity failed to start.
Fails if: No failure toast appears, the activity appears to run when it did not, or the toast takes longer than 15 seconds.

### TC-037  Verifies: FR-ACT-01-AC3   Level: integration   Data: Activity with a distinguishable in-progress state
Preconditions: An activity can be started and its state can be resumed after leaving the app.
Steps:  1. Start the activity and advance to a recognizable state.  2. Leave the app without finishing.  3. Reopen the app.
Expected: Within 5 seconds of reentry, the same activity is resumed at the state where it was left.
Fails if: The activity restarts, resets, or fails to resume within 5 seconds.

## AI analysis - stress explanation

### TC-038  Verifies: FR-AIA-01-AC1   Level: acceptance   Data: Saved check-in and journal data; valid predetermined stress-explanation prompt
Preconditions: The AI Analysis page is available, with sufficient saved check-in and journal data.
Steps:  1. Open AI Analysis.  2. Select the predetermined stress-explanation prompt.  3. Measure response time and inspect the response.
Expected: A suggestion-based explanation is displayed within 25 seconds.
Fails if: No explanation is returned, the response is not an explanation, or it takes longer than 25 seconds.

### TC-039  Verifies: FR-AIA-01-AC2   Level: integration   Data: Journal text with known frequent words; simulate AI unavailable
Preconditions: AI Analysis is available and the test environment can simulate an AI failure.
Steps:  1. Submit a predetermined stress-explanation prompt.  2. Keep the AI failure active.  3. Observe the fallback response.
Expected: Within 30 seconds, a toast states that AI is failing or unavailable, warns that the alternate experience may be less accurate, and a keyword-based journal fallback is provided.
Fails if: The fallback is absent, the failure or reduced-accuracy notice is absent, or the response takes longer than 30 seconds.

### TC-040  Verifies: FR-AIA-01-AC3   Level: integration   Data: Explanation prompt selected, then switch to destressing-aid analysis
Preconditions: The AI Analysis page exposes the predetermined prompts for each analysis type.
Steps:  1. Select an explanation prompt.  2. Switch to destressing-aid analysis.  3. Submit without selecting a new prompt.
Expected: The request is not sent and the user is told to select a predetermined prompt for the active analysis type.
Fails if: The old explanation prompt is sent for destressing-aid analysis or the user is not told to select an active prompt.

### TC-060  Verifies: FR-AIA-01-AC4   Level: integration   Data: No check-in or journal entries; predetermined stress-explanation prompt
Preconditions: No check-in responses or journal entries are stored.
Steps:  1. Submit the stress-explanation prompt.  2. Observe the response time and message.
Expected: Within 10 seconds, the app states that more check-in responses and journal entries are needed to provide a useful explanation.
Fails if: The app presents an unsupported explanation, fails to request more information, or responds after 10 seconds.

## AI analysis - destressing aid

### TC-065  Verifies: FR-AIA-04-AC1   Level: acceptance   Data: Saved check-in and journal data; valid predetermined destressing-aid prompt
Preconditions: The AI Analysis page is available, with sufficient saved check-in and journal data.
Steps:  1. Open AI Analysis.  2. Select the predetermined destressing-aid prompt.  3. Measure response time and inspect the response.
Expected: A suggestion for a stress-relief activity is displayed within 25 seconds.
Fails if: No suggestion is returned, the response is not an activity suggestion, or it takes longer than 25 seconds.

### TC-066  Verifies: FR-AIA-04-AC2   Level: integration   Data: Journal text with known frequent words; simulate AI unavailable
Preconditions: AI Analysis is available and the test environment can simulate an AI failure.
Steps:  1. Submit a predetermined destressing-aid prompt.  2. Keep the AI failure active.  3. Observe the fallback response.
Expected: Within 30 seconds, a toast states that AI is failing or unavailable, warns that the alternate experience may be less accurate, and a keyword-based journal fallback is provided.
Fails if: The fallback is absent, the failure or reduced-accuracy notice is absent, or the response takes longer than 30 seconds.

### TC-067  Verifies: FR-AIA-04-AC3   Level: integration   Data: Destressing-aid prompt selected, then switch to explanation analysis
Preconditions: The AI Analysis page exposes the predetermined prompts for each analysis type.
Steps:  1. Select a destressing-aid prompt.  2. Switch to explanation analysis.  3. Submit without selecting a new prompt.
Expected: The request is not sent and the user is told to select a predetermined prompt for the active analysis type.
Fails if: The old destressing-aid prompt is sent for explanation analysis or the user is not told to select an active prompt.

### TC-068  Verifies: FR-AIA-04-AC4   Level: integration   Data: No check-in or journal entries; predetermined destressing-aid prompt
Preconditions: No check-in responses or journal entries are stored.
Steps:  1. Submit the destressing-aid prompt.  2. Observe the response time and message.
Expected: Within 10 seconds, the app states that more check-in responses and journal entries are needed to provide a useful aid suggestion.
Fails if: The app presents an unsupported aid suggestion, fails to request more information, or responds after 10 seconds.

## Unit-level validation

These 48 cases are the individual deterministic unit-test scenarios in
`mobile/tests/validation.test.ts`; each ID appears in the Jest test name and in
`docs/traceability.csv`. The same information-sufficiency cases cover both AI
analysis types because they share the production decision function. Screen
timings, storage failures, and provider failures stay integration/acceptance
tests: labeling those as unit tests would not exercise the relevant seam.

| Test case | Verifies | Scenario / input | Expected | Fails if |
|---|---|---|---|---|
| TC-003 | FR-QUES-01-AC2 | Missing stress level | Names stress level as missing | Incomplete form passes or field is unidentified |
| TC-004 | FR-QUES-01-AC2 | Null mood | Names mood as missing | Incomplete form passes or field is unidentified |
| TC-005 | FR-QUES-01-AC2 | Empty mood | Names mood as missing | Incomplete form passes or field is unidentified |
| TC-006 | FR-QUES-01-AC2 | Whitespace-only mood | Names mood as missing | Incomplete form passes or field is unidentified |
| TC-007 | FR-QUES-01-AC2 | Missing eaten-recently response | Names eaten-recently response as missing | Incomplete form passes or field is unidentified |
| TC-008 | FR-QUES-01-AC2 | Missing concentration level | Names concentration as missing | Incomplete form passes or field is unidentified |
| TC-009 | FR-QUES-01-AC2 | Stress at lower supported bound | Complete form passes | Valid boundary value is rejected |
| TC-010 | FR-QUES-01-AC2 | Stress at upper supported bound | Complete form passes | Valid boundary value is rejected |
| TC-011 | FR-QUES-01-AC2 | Eaten-recently answer of zero | Complete form passes | Valid false answer is rejected |
| TC-012 | FR-QUES-01-AC2 | Concentration at lower supported bound | Complete form passes | Valid boundary value is rejected |
| TC-013 | FR-QUES-01-AC2 | Concentration at upper supported bound | Complete form passes | Valid boundary value is rejected |
| TC-014 | FR-QUES-01-AC2 | All required responses missing | Reports the first missing field | Incomplete data passes or no missing field is reported |
| TC-015 | FR-QUES-01-AC2 | Missing stress-level message | Message asks the user to select a stress level | Message is blank or describes the wrong field |
| TC-016 | FR-QUES-01-AC2 | Missing mood message | Message asks the user to select a mood | Message is blank or describes the wrong field |
| TC-017 | FR-QUES-01-AC2 | Missing eaten-recently message | Message asks whether the user ate in the past six hours | Message is blank or describes the wrong field |
| TC-018 | FR-QUES-01-AC2 | Missing concentration message | Message asks the user to select a concentration level | Message is blank or describes the wrong field |
| TC-026 | FR-JOU-01-AC4 | Null entry | Rejected | Null is accepted |
| TC-027 | FR-JOU-01-AC4 | Empty string | Rejected | Empty text is accepted |
| TC-028 | FR-JOU-01-AC4 | Spaces only | Rejected | Whitespace is accepted |
| TC-029 | FR-JOU-01-AC4 | Tabs and line breaks only | Rejected | Whitespace is accepted |
| TC-030 | FR-JOU-01-AC4 | One non-blank word | Accepted | Non-blank text is rejected |
| TC-031 | FR-JOU-01-AC4 | Multiline non-blank entry | Accepted | Non-blank text is rejected |
| TC-041 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Explanation prompt 1 | Accepted for explanation | Valid prompt is rejected |
| TC-042 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Explanation prompt 2 | Accepted for explanation | Valid prompt is rejected |
| TC-043 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Explanation prompt 3 | Accepted for explanation | Valid prompt is rejected |
| TC-044 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Activity prompt 1 | Accepted for activities | Valid prompt is rejected |
| TC-045 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Activity prompt 2 | Accepted for activities | Valid prompt is rejected |
| TC-046 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Activity prompt 3 | Accepted for activities | Valid prompt is rejected |
| TC-047 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Combined prompt 1 | Accepted for combined analysis | Valid prompt is rejected |
| TC-048 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Combined prompt 2 | Accepted for combined analysis | Valid prompt is rejected |
| TC-049 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Combined prompt 3 | Accepted for combined analysis | Valid prompt is rejected |
| TC-050 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Explanation analysis with activity prompt | Rejected with instruction to use a provided prompt | Wrong-type prompt is accepted |
| TC-051 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Explanation analysis with combined prompt | Rejected with instruction to use a provided prompt | Wrong-type prompt is accepted |
| TC-052 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Activity analysis with explanation prompt | Rejected with instruction to use a provided prompt | Wrong-type prompt is accepted |
| TC-053 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Activity analysis with combined prompt | Rejected with instruction to use a provided prompt | Wrong-type prompt is accepted |
| TC-054 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Combined analysis with explanation prompt | Rejected with instruction to use a provided prompt | Wrong-type prompt is accepted |
| TC-055 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Combined analysis with activity prompt | Rejected with instruction to use a provided prompt | Wrong-type prompt is accepted |
| TC-056 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Empty analysis type | Rejected with instruction to use a provided prompt | Invalid analysis type passes |
| TC-057 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Unknown analysis type | Rejected with instruction to use a provided prompt | Invalid analysis type passes |
| TC-058 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Empty prompt ID | Rejected with instruction to use a provided prompt | Missing prompt passes |
| TC-059 | FR-AIA-01-AC3; FR-AIA-04-AC3 | Free-form prompt | Rejected with instruction to use a provided prompt | Free-form prompt passes |
| TC-061 | FR-AIA-01-AC4; FR-AIA-04-AC4 | No check-ins or journal entries | Insufficient data | AI request is allowed |
| TC-062 | FR-AIA-01-AC4; FR-AIA-04-AC4 | Check-ins but no journal entries | Insufficient data | AI request is allowed |
| TC-063 | FR-AIA-01-AC4; FR-AIA-04-AC4 | Journal entries but no check-ins | Insufficient data | AI request is allowed |
| TC-064 | FR-AIA-01-AC4; FR-AIA-04-AC4 | Both check-ins and journal entries | Sufficient data | Eligible data is rejected |
| TC-076 | NFR-PRIV-02 | Payload has only four permitted top-level fields | Payload contains only analysis type, prompt, check-ins, journal entries | Extra fields are added |
| TC-077 | NFR-PRIV-02 | Sample data with unrelated personal/device fields absent | Selected data is preserved; unrelated fields are absent | Data is altered or unrelated fields added |
| TC-078 | NFR-PRIV-02 | Combined analysis prompt and type | Prompt ID and analysis type remain paired | The wrong prompt/type pair is built |

## Non-functional requirements

### TC-069  Verifies: NFR-PERF-01-AC1   Level: acceptance   Data: 20 AI prompts; iPhone, Expo Go, Fast 3G throttling; at least one check-in and journal entry
Preconditions: The app is running on an iPhone in Expo Go with Fast 3G throttling and the required saved data.
Steps:  1. Submit 20 AI Analysis prompts.  2. Record each response time.  3. Calculate the 95th percentile.
Expected: The measured p95 response time is less than 25 seconds; record the result in `docs/measurements.md`.
Fails if: The p95 is 25 seconds or greater, fewer than 20 prompts are measured, or the result is not recorded.

### TC-070  Verifies: NFR-REL-01-AC1   Level: acceptance   Data: 10 app open-and-close attempts
Preconditions: The app is installed and the test environment can observe unhandled exceptions and errors.
Steps:  1. Open the app.  2. Record whether it starts without unhandled exceptions or errors.  3. Close it and repeat until 10 attempts are recorded.
Expected: At least 9 of 10 attempts start successfully with zero unhandled exceptions or errors.
Fails if: Fewer than 9 attempts meet the stated success condition.

### TC-071  Verifies: NFR-AVA-01-AC1   Level: acceptance   Data: 10 simulated Gemini failures, including timeout, API error, and invalid response
Preconditions: The test environment can simulate all three Gemini failure modes.
Steps:  1. Run 10 AI requests across the listed failure modes.  2. Record fallback appearance and response time for each.
Expected: The predetermined fallback appears within 30 seconds in all 10 cases.
Fails if: Any case lacks the fallback, the fallback takes more than 30 seconds, or fewer than 10 failures are recorded.

### TC-072  Verifies: NFR-SEC-01-AC1   Level: acceptance   Data: Full Git history, repository ignore rules, and configured secret scanner
Preconditions: The complete repository history is available to the scanner.
Steps:  1. Scan every commit for AI API keys and other secrets.  2. Check that `.env` is ignored.  3. Record scan findings.
Expected: No API key or secret is found in any commit, and `.env` is listed in the repository ignore rules.
Fails if: Any secret is found in history or `.env` is not ignored.

### TC-073  Verifies: NFR-SEC-02-AC1   Level: acceptance   Data: 10 simulated save, API, and database failure cases
Preconditions: The app can simulate the listed failures and capture user-visible error messages and logs.
Steps:  1. Trigger 10 failures across save, API, and database operations.  2. Inspect messages and accessible logs for each.
Expected: All user-facing errors are general; none expose technical error details, API keys, database details, or provider error details.
Fails if: Any of the 10 cases exposes one of the prohibited details.

### TC-074  Verifies: NFR-PRIV-01-AC1   Level: acceptance   Data: Seven check-ins and seven journal entries; inspect Gemini requests
Preconditions: The AI request page or network test instrumentation can verify whether data was sent to Gemini.
Steps:  1. Complete and save seven check-ins and seven journal entries without prompting AI.  2. Inspect captured Gemini requests.
Expected: Zero check-in responses and journal entries are sent to Gemini before an explicit AI Analysis request.
Fails if: Any check-in response or journal entry is transmitted without an explicit user prompt.

### TC-075  Verifies: NFR-PRIV-02-AC1   Level: acceptance   Data: 10 AI requests with sample check-in, journal, and predetermined prompt data
Preconditions: AI request payloads can be inspected before transmission.
Steps:  1. Submit 10 predetermined AI Analysis requests.  2. Inspect each outgoing payload.
Expected: Each request contains only the relevant check-in responses, journal entry, and predetermined prompt; no unrelated personal or device information is present.
Fails if: Any payload contains unrelated personal information or device information.

### TC-079  Verifies: NFR-ACC-01-AC1   Level: acceptance   Data: Five participants; grayscale enabled; five main app features
Preconditions: Grayscale is enabled before opening the app; five participants can evaluate the app.
Steps:  1. Have each participant navigate all five main features.  2. Record reading or navigation problems.  3. Count participants with zero problems.
Expected: At least four of five participants complete the features with zero readability or contrast-related problems.
Fails if: Fewer than four participants meet the stated result.

### TC-080  Verifies: NFR-ACC-02-AC1   Level: acceptance   Data: Grayscale enabled; success, failure, and loading states across five main features
Preconditions: Grayscale is enabled and each main feature can be exercised through success, failure, and loading states.
Steps:  1. Exercise those states in each of the five features.  2. Inspect the visual and text cues without relying on color.  3. Record pass/fail for each feature.
Expected: All five features communicate each tested state without relying on color alone.
Fails if: Any state in any main feature is indicated by color alone or is not communicated.

### TC-081  Verifies: NFR-USE-01-AC1   Level: acceptance   Data: Five first-time participants; one check-in, journal entry, and AI Analysis prompt each
Preconditions: Five participants are first-time users and receive no assistance during the test.
Steps:  1. Ask each participant to complete one check-in, create one journal entry, and submit one AI Analysis prompt.  2. Record unaided completion.
Expected: At least four of five participants complete all three tasks without help.
Fails if: Fewer than four participants complete all tasks unaided.

### TC-082  Verifies: NFR-USE-02-AC1   Level: acceptance   Data: Five first-time participants; successful and failed check-in and journal saves
Preconditions: Five first-time participants receive no assistance; the test can produce successful and failed check-in and journal saves.
Steps:  1. Show each participant a successful check-in and journal save.  2. Show each a failed save for both.  3. Ask whether each item was saved after each attempt and record answers.
Expected: At least four of five participants correctly identify the saved/unsaved status for both item types in both scenarios.
Fails if: Fewer than four participants correctly identify all presented save outcomes.

### TC-083  Verifies: NFR-MNT-01-AC1   Level: acceptance   Data: Clean computer, repository clone, README, iPhone, Expo Go
Preconditions: A clean computer has the required baseline tooling and access to an iPhone with Expo Go.
Steps:  1. Start a timer.  2. Follow only the README to clone and run the app.  3. Stop the timer and record errors.
Expected: The app runs on the iPhone in Expo Go in under 10 minutes with zero errors.
Fails if: Setup takes 10 minutes or longer, requires instructions beyond the README, does not run, or produces an error.

### TC-084  Verifies: NFR-PORT-02-AC1   Level: acceptance   Data: Every main screen and its interactive controls in portrait orientation
Preconditions: The app is installed on a supported device and all main screens are reachable.
Steps:  1. Set the device to portrait orientation.  2. Visit every main screen.  3. Locate and operate every main button and control.
Expected: Every main button and control is visible, reachable, and operable in portrait orientation.
Fails if: Any main button or control is cut off, unreachable, or inoperable.

## Additional functional acceptance cases

These are manual, end-to-end checks for acceptance criteria that previously had
only unit or integration cases. Run them on a build that includes the feature;
leave them unrun until that build is available.

### TC-085  Verifies: FR-QUES-01-AC2   Level: acceptance   Data: Check-in with mood left unanswered
Preconditions: The check-in screen is available and the local store can be inspected.
Steps:  1. Complete every required check-in answer except mood.  2. Submit the check-in.  3. Observe the response and saved check-ins.
Expected: Within 5 seconds, the app identifies mood as missing and saves no check-in.
Fails if: The incomplete check-in is saved, the wrong field is identified, or feedback takes more than 5 seconds.

### TC-086  Verifies: FR-QUES-01-AC3   Level: acceptance   Data: Complete check-in; local save failure
Preconditions: The check-in screen is available and the test environment can make local saving fail.
Steps:  1. Complete all required answers.  2. Make local saving fail and submit.  3. Observe the response and saved check-ins.
Expected: Within 5 seconds, the app says the check-in was not saved and advises retrying or redoing it; no new check-in appears.
Fails if: The app reports success, fails to provide retry guidance, or takes longer than 5 seconds.

### TC-087  Verifies: FR-OVER-01-AC3   Level: acceptance   Data: Saved check-in; delayed and failed graph loading
Preconditions: The Overview page is available and graph loading can be delayed and made to fail.
Steps:  1. Open Overview with graph loading delayed.  2. Observe the loading message.  3. Repeat with graph loading forced to fail.
Expected: The loading message appears within 5 seconds; the failure displays an error message instead of a successful or permanent loading state.
Fails if: Either message is missing, the loading message takes more than 5 seconds, or failure appears as success or indefinite loading.

### TC-088  Verifies: FR-JOU-01-AC2   Level: acceptance   Data: Non-empty unsaved journal draft
Preconditions: Journal draft recovery is available and the app can be force-closed.
Steps:  1. Enter journal text without submitting it.  2. Force-close the app.  3. Reopen it and observe the prompt.
Expected: Within 10 seconds of reopening, the app warns that recently entered journal text might not have been saved.
Fails if: The warning is absent, says the draft was saved, or appears after 10 seconds.

### TC-089  Verifies: FR-JOU-01-AC3   Level: acceptance   Data: Non-empty journal entry; local save failure
Preconditions: The journal page is available and the test environment can make local saving fail.
Steps:  1. Enter a journal entry.  2. Make local saving fail and submit.  3. Observe the response and entry list.
Expected: Within 5 seconds, the app says the entry was not saved and advises retrying; the failed entry is not listed as saved.
Fails if: The app reports success, omits retry guidance, or takes more than 5 seconds.

### TC-090  Verifies: FR-JOU-01-AC4   Level: acceptance   Data: Empty and whitespace-only journal submissions
Preconditions: The journal page is available and the local store can be inspected.
Steps:  1. Submit an empty entry.  2. Submit an entry containing only spaces.  3. Inspect the entry list and any feedback.
Expected: Neither submission creates an entry; the app tells the user a blank entry cannot be submitted.
Fails if: Either submission creates an entry or the user receives no blank-entry feedback.

### TC-091  Verifies: FR-JOU-02-AC1   Level: acceptance   Data: Today's saved entry and replacement text
Preconditions: The journal page supports editing and contains a saved entry created today.
Steps:  1. Open the entry for editing.  2. Replace its text and save.  3. Reopen the entry.
Expected: Within 10 seconds, the entry displays the exact replacement text and remains a single entry.
Fails if: The old text remains, the replacement is lost, a duplicate is created, or it takes longer than 10 seconds.

### TC-092  Verifies: FR-JOU-02-AC2   Level: acceptance   Data: Saved journal entry and unsaved edit
Preconditions: The journal page supports editing and the app can be force-closed.
Steps:  1. Open a saved entry and change its text without saving.  2. Force-close the app.  3. Reopen it and inspect the saved entry and prompt.
Expected: The original saved text remains and, within 5 seconds, the app warns that the edit might not have been saved.
Fails if: The original text is erased, the warning is absent, or it appears after 5 seconds.

### TC-093  Verifies: FR-JOU-02-AC3   Level: acceptance   Data: Saved journal entry; edited-save failure
Preconditions: The journal page supports editing and the test environment can make local saving fail.
Steps:  1. Edit a saved entry.  2. Make local saving fail and submit the edit.  3. Observe the response and saved entry.
Expected: Within 5 seconds, the app says the edit was not saved and advises retrying; the last saved text remains available.
Fails if: The app reports success, omits retry guidance, loses the last saved text, or takes longer than 5 seconds.

### TC-094  Verifies: FR-ACT-01-AC2   Level: acceptance   Data: Activity configured to fail to start
Preconditions: A destressing activity is available and its start failure can be induced.
Steps:  1. Induce the activity start failure.  2. Select the activity.  3. Observe the user-visible response.
Expected: Within 15 seconds, a toast explains that the activity failed to start.
Fails if: No explanatory toast appears within 15 seconds or the app presents the activity as running.

### TC-095  Verifies: FR-ACT-01-AC3   Level: acceptance   Data: Activity with a recognizable in-progress state
Preconditions: An activity can be started, its progress can be observed, and it can be resumed after leaving the app.
Steps:  1. Start the activity and advance it to a recognizable state.  2. Leave the app without finishing.  3. Reopen the app.
Expected: Within 5 seconds, the same activity resumes at the same recognizable state.
Fails if: The activity restarts, resets, is unavailable, or takes longer than 5 seconds to resume.

### TC-096  Verifies: FR-AIA-01-AC2   Level: acceptance   Data: Journal with repeated keywords; unavailable AI provider
Preconditions: AI Analysis has saved check-in and journal data; the provider failure can be induced.
Steps:  1. Submit a predetermined stress-explanation prompt.  2. Induce an AI provider failure.  3. Observe the notice and fallback.
Expected: Within 30 seconds, a notice says AI is unavailable and the alternate experience may be less accurate; a journal-keyword fallback appears.
Fails if: The notice or fallback is missing, the reduced-accuracy warning is absent, or the response takes longer than 30 seconds.

### TC-097  Verifies: FR-AIA-01-AC3   Level: acceptance   Data: Explanation prompt followed by a switch to destressing-aid analysis
Preconditions: AI Analysis presents distinct predetermined prompts for explanation and destressing-aid analysis.
Steps:  1. Select an explanation prompt.  2. Switch to destressing-aid analysis without selecting one of its prompts.  3. Submit.
Expected: The old prompt is rejected, no analysis request is sent, and the user is told to choose a provided prompt.
Fails if: The explanation prompt is processed for destressing-aid analysis or the user receives no instruction to choose a provided prompt.

### TC-098  Verifies: FR-AIA-01-AC4   Level: acceptance   Data: No saved check-ins or journal entries; explanation prompt
Preconditions: No check-in responses or journal entries are saved, and the AI Analysis page is available.
Steps:  1. Select a predetermined stress-explanation prompt.  2. Select the available data ranges.  3. Submit and observe the response.
Expected: Within 10 seconds, the app says more check-in responses and journal entries are needed before it can provide a useful explanation.
Fails if: An unsupported explanation is presented, the app fails to request more information, or it responds after 10 seconds.

### TC-099  Verifies: FR-AIA-04-AC2   Level: acceptance   Data: Journal with repeated keywords; unavailable AI provider
Preconditions: AI Analysis has saved check-in and journal data; the provider failure can be induced.
Steps:  1. Submit a predetermined destressing-aid prompt.  2. Induce an AI provider failure.  3. Observe the notice and fallback.
Expected: Within 30 seconds, a notice says AI is unavailable and the alternate experience may be less accurate; a journal-keyword fallback appears.
Fails if: The notice or fallback is missing, the reduced-accuracy warning is absent, or the response takes longer than 30 seconds.

### TC-100  Verifies: FR-AIA-04-AC3   Level: acceptance   Data: Destressing-aid prompt followed by a switch to explanation analysis
Preconditions: AI Analysis presents distinct predetermined prompts for explanation and destressing-aid analysis.
Steps:  1. Select a destressing-aid prompt.  2. Switch to explanation analysis without selecting one of its prompts.  3. Submit.
Expected: The old prompt is rejected, no analysis request is sent, and the user is told to choose a provided prompt.
Fails if: The destressing-aid prompt is processed for explanation analysis or the user receives no instruction to choose a provided prompt.

### TC-101  Verifies: FR-AIA-04-AC4   Level: acceptance   Data: No saved check-ins or journal entries; destressing-aid prompt
Preconditions: No check-in responses or journal entries are saved, and the AI Analysis page is available.
Steps:  1. Select a predetermined destressing-aid prompt.  2. Select the available data ranges.  3. Submit and observe the response.
Expected: Within 10 seconds, the app says more check-in responses and journal entries are needed before it can provide a useful destressing aid.
Fails if: An unsupported aid suggestion is presented, the app fails to request more information, or it responds after 10 seconds.
