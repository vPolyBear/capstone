## Rep 1 — Cut this week’s slices

SLICE: FR-AIA-01/FR-AIA-04/NFR-AVA-01  Analysis page provides a word based search over the journal entries searching for frequent keywords written as a fallback when Gemini or the Edge Function is unavailable for any reason
Layers:       The Analysis page displays the fallback response → Goes through each journal entry and check ins selected for continually used keywords and then the keywords are used in a predetermined response → Retrieve from SQLite the journal entries to go through → Checks for when the Gemini AI API or Supabase Edge Function is unavailable
Demo in one sentence: When Gemini or the Edge Function is unavailable the Analysis page provides message stating that the AI Analysis can not happen at this time then it goings through the journal entries and check ins so it can provide and display the predetermined fallback response
Acceptance criteria to satisfy: AC-2
Estimate (three-point):  optimistic 2 h | likely 3 h | pessimistic 5 h
Riskiest unknown:  If the keywords found can actually be added in to a predetermined response that makes sense

SLICE: FR-AIA-01/FR-AIA-04/NFR-PRIV-01/NFR-PRIV-02  AI Analysis allows for the selecting of the completed check ins and journal entries wanted to be used for the analysis
Layers:       The check ins and journal entries can be selected and appear when clicking an add button → The selected check ins and journal entries are added in and send to the request for the AI Analysis  → The specific check ins and journal entries selected are retrieved from SQLite so they can be used in the response → The data selected is sent in the request to the Edge Function and Gemini API to be used for the AI response
Demo in one sentence: When clicking the add button check ins and journal entries appear with the ability to be selected and when selected they are the only ones used in the AI request and response
Acceptance criteria to satisfy: AC-4
Estimate (three-point):  optimistic 2 h | likely 3 h | pessimistic 4 h
Riskiest unknown:  How will the check-ins and journal entries appear in a way that is easily understood for what they contained and how many selected would be too much for the Edge Function and AI to handle 

SLICE: FR-AIA-01/FR-AIA-04/NFR-AVA-01/NFR-SEC-02  AI Analysis error handling for malformed responses, missing fields, API errors, and other invalid results 
Layers:       The Analysis page displays a general error message → Checks that the request, response, and data checked is has the correct fields and format and if an error is detected the fallback triggers → Uses the journal entries and check ins retrieved from SQLite in the request → Checks on the Edge Function and the Gemini API for when they have errors
Demo in one sentence: If there is a malformed response, missing fields, API errors, or other invalid results then the error is logged and instead a general error message pops up stating that something went wrong and to try again later, or here is the altered experience.
Acceptance criteria to satisfy: AC-2, AC-3, AC-4
Estimate (three-point):  optimistic 1 h | likely 3 h | pessimistic 4 h
Riskiest unknown:  If there are way too many errors that I keep finding that need more and more error handling

SLICE: FR-JOU-01  Journal entries written then submitted they appear with the rest of the journal entries completed on one page
Layers:       The entry writing spot appears when adding a entry and then the completed journal entries are displayed the Journal page → When the add button is clicked on the Journal page then there is a spot to write and after submitting, all the Journal entries can be seen on the Journal Page → The entries are stored and retrieved from SQLite
Demo in one sentence: When entering the journal page the stressed individual can see all the completed entries and also click the add button to add and display the new entry done with the rest of the journal entries
Acceptance criteria to satisfy: AC-1
Estimate (three-point):  optimistic 1 h | likely 2 h | pessimistic 3 h
Riskiest unknown:  Whether the Journal page entries displayed will need to be seperated from the writting functionality 

Reflect: Which slice did you put first, and is it first because it is the riskiest or because it is the most fun? If those are different slices, say why you are overruling the rule — or reorder.
- The slice that I put first was the AI Analysis fallback because it is the riskiest as if it doesn't work out and the AI API fails then that entire page would not work. It may also be hard to also have the fallback produce a response that will also make sense.

## Rep 2 — Find the horizontal task hiding on your board
Reflect: How many H tasks did you have? Horizontal tasks are not evil — a migration is a migration — but a board that is mostly H is a board that cannot demo anything in Week 15. What is your V-to-H ratio?
- H = 6
- V = 15
    - I folded all the H's in a V slice
- V-to-H ratio: 15:6
    - 15/6 = 2.5

## Rep 3 — Adapt the definition of done, then use it as a weapon

Task: I-7 [NFR-AVA-01] Display Analysis Fallback when Gemini isn't available   Checks passed: 7/10   Checks that fail: #1, #2, #5
What I am doing about it:  fixing now
Reflect: Which check failed first? Almost every student fails on the same one — the test, the docs update, or the log entry. That is your personal weak point for the next six weeks; name it out loud.
- The check that failed first was Check 1 because I just forgot to add in a toast to really highlight that the fallback is happening for when the AI Analysis fails. My personal weakness if forgetting to go back and check that all the AC are completed.

## Rep 4 — The four passes on your ugliest file

| Pass | Findings | Fixed / logged / accepted |
| 1 Diff | 0 | n/a |
| 2 Stranger | 0 | n/a |
| 3 Adversary | 4 | Fixed |
| 4 Contract | 1 | Fixed |

Reflect: Which pass found the most? Pass 3 usually wins, and pass 4 usually finds the one that matters. If pass 4 found an acceptance criterion with no line of code behind it, you just caught a requirement you were about to claim falsely in Week 16.
- Pass 3 won because I just need to add in more error handling. Pass for found AC-3 for FR-AIA-01/FR-AIA-04 so I just need to add in a check in for invaild prompts.

## Rep 5 — Open a pull request to yourself

Branch: us/kspencer/FourSlicesErrorHandlingJournalViewsUnitTests

Reflect: Did the web diff view show you anything the editor did not? Most students find at least one thing — unfamiliar presentation is a cheap substitute for a second pair of eyes.
- No, the diff view did not show me any problems that I am not unfamiliar with.

## Rep 6 — A prompt contract, not a wish

Wish prompt:  _Can you create a place for me to see all of the journal entries that were done and have a button for the writing area_
Contract prompt:  saved at prompts/2026-10-31-JournalPrompt.txt
Assumptions the model listed that I had not stated: _the newest journal entries should appear first, Entries should be read-only, submitting an entry should return the user to the list, and a Cancel button should return to the list without saving the draft._
Reflect: Compare the two outputs. What did the wish version assume about your project that is not true? Those assumptions are the two hours of reconciliation you just avoided.
- The wish prompt output assumed it was in html and that the write area and the journal entries done, would be side by side.

## Rep 7 — Explain it, break it, rewrite it

Lines I stalled on:        __I did not stalled on any lines__
What broke it:             __If a blank journal is submitted empty it still provides messsage stating you can't submit a blank entry__
Could I rewrite it?        yes

Reflect: If you could not rewrite it, you have found the module you do not own yet. What are you going to do about that this week — study it, or replace it?
- I was able to rewrite it.

## Rep 8 — Write both ai-usage entries

Reflect: Read the bad one as if you were a grader who has never met you. What would you assume about the student who wrote it? That assumption is exactly what a thin log buys you.
- What I would have assumed about the student who wrote it was that they just accepted it without really trying to understand it or verify that it worked.

## Rep 9 — Rewrite five bad commit messages

| Actual message | What it should have said |
|---|---|
| Hours log update for 10-28 hours were added wrong | Hours-log.csv 10-28 entry hours were logged wrong. I put down the hours going from 14:00 to 16:00 though I looked at the time wrong and I was supposed to end at 15:30  |
| accidentlly removed half my ci | Accidentally deleted half my CI. Right before committing I controlled all and deleted it instead of saving it so my CI appeared wrong, so this commit just added the CI I deleted back in. |
| actual last test | Last Test on the CI for Week 9. Added in a new try statement in the CI for the smoke test to test a different variation to see if the CI passes. |
| small error | Removed Comments. I accidentlly kept the comments in the CI when testing it so I had to remove it so that the CI could run. |
| updated ai usage | Updated AI Usage Date. Accidentlly put the wrong date for the 2026-10-25 entry, as I had guessed that it was the 23rd so I updated it to the correct date which is the 25th. |

Reflect: How much of why is recoverable from your history right now — say, three weeks from now, when you need to know why you chose the retry count you chose? Be honest.
- I believe that three weeks from now I would still be able to understand what was happening in that commit and what was changed in that commit with these new commit messages and their whys.

## Rep 10 — Reconstruct one honest day, then run the report

Reflect: What did the report flag? And separately: what does your phase distribution say about where the semester actually went? If Construction is 15% of your hours in Week 10, that is not a scandal — it is a fact you now have to plan around.
- It did not report any pattern flags. Then what my phase distribution says about where the semester actualy went is that I spend the most time in the inception phase as it is where 24.0% of my hours when then to the construction phases which is where 21.8% of my hours went, this does line up with what I thought.

## Rep 11 — The secret you almost committed

Credentials my project uses:  Google API Key & the Supabase URL and anon key
Read from:                    Expo env var and Supabase Edge Function secret
In history?                   no
Ignore file covers:          __.env, .env.*, .env*.local, docker.env, *pem, *.key, credentials.json, service-account*.json__

Reflect: If a real key were in your history right now, what would your next four steps be, in order? Write them down. The reason to write them today is that the day you need them you will be panicking.
- I would follow the runbook.md: Where each credential comes from, How to rotate it, Who to tell, How long rotation takes.

## Rep 12 — The five-minute demo, rehearsed and recorded
Write the demo script — literal clicks or commands, in order, with the exact input values — commit your seed data, and rehearse the three acts on a timer: the claim (45 s), the software (3 min), the evidence and the gap (75 s). Then record it.


ACT 1 opening line (write it verbatim):
Stress Manager now fully closes NFR-AVA-01: where an analysis fallback is provided for when Gemini or Supabase aren't available. I would like to note that FR-AIA-01 and FR-AIA-04 are 99% done: where an AI Analysis is provided based on prompts and data selection. The reason I didn't consider it fully done is because Gemini takes longer than 25 seconds. When this is done, this would result in NFR-PERF-01, NFR-PRIV-01, NFR-PRIV-02, to be fully done too, which focuses on the Analysis performance, data privacy, and security. Here is the AI Analysis, starting from the seeded data.

ACT 2 script steps:
1. On the Anaylsis Page
2. After clicking a prompt option, a prompt type, then to select a data range from both check ins and journal entries to have AI use for the Analysis
    1. Click the Generate button (to show that still need prompt)
    2. Clicks a prompt option
    3. Then prompt type
    4. Then Check In button
    5. Duration
    6. Click the Generate button (to show that still need journal entry clicked on)
    7. Then Click Journal Entry button
    8. Duration
3. Then to Generate an Analysis,
    1. Click the Generate button
    2. The View Analysis Response (when it loads)

- Then the failure path for the AI Analysis fallback is shown in a seperate video.

ACT 2 failure path shown (Recorded in different video listed below):
This is the failure path for when the AI Analysis is down.
1. After clicking a prompt option, a prompt type, then to select a data range from both check ins and journal entries to have AI use for the Analysis
    1. Clicks a prompt option
    2. Then prompt type
    3. Then Check In button
    4. Duration
    5. Then Journal Entry button
    6. Duration
2. Then Generate an Analysis, however, this time this fallback is presented
    1. Click Generate button
    2. View Fallback response

ACT 3 what is NOT done, and when it is scheduled: 
The requirements that are not done because final tests and error handling is still needed are FR-JOU-01: that allows for writing in a journal entry, saving it, viewing, and previewing it. Then also FR-QUES-01: where you can add a check in and save the check in after it is submitted. Then along with FR-JOU-02 for entry edits, these are scheduled for Week 12. [*STEPS HERE*]
Then what is not started is FR-OVER-01: which displays the check-ins in overview graphs and FR-ACT-01 which is for the destressing activities to play, these are scheduled for Week 11. Then the final pass through tests and documentation for the rest of the other NFRs are scheduled in Weeks 13 and 14. I have an estimated 13 hours scheduled each week for all of these. If any one of these takes longer than expected the first thing I will cut is the Journal Edits which is the Should FR-JOU-02 and if the Gemini can't take under 25 seconds for every instance to load the Analysis I will need a potential Change Request, fallback at 25 seconds, or to accept it and so this is the Stress Manager's state currently.
[*STEPS*]
1. Scroll through the Journal page
    1. Show Previous Journal Entries
    2. Click into the only Previous Journal Entry 
    3. Click Write Journal Entry
    4. Submit Blank Entry
    5. Then enter in Journal the entry 
    6. Enter "School is stressful right now"
    7. Submit Entry
    8. View Created entry on the page
2. Scroll through the Check in page
    1. Enter (required check ins) Stress level 7, mood tense, eaten Yes
    2. Click Submit
    3. Click out of still need the concentration level input
    4. Enter concentration level 7
    5. Show it submits


Recorded fallback saved at: 
- docs/demo-recordings/FiveMinDemoVideo.mp4
- docs/demo-recordings/FallbackDemoVideo.mp4


Reflect: Time the first run. Where did you go over? The overrun is almost always in Act 2, and almost always because you improvised instead of following the script. What are you cutting?
- The time the first run was in 5 minutes thought I actually went over in ACT 1 by a few seconds because I struggled saying the NFR and FR names. I just shorted the names.