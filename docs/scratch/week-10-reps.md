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

Task: ______________   Checks passed: __/10   Checks that fail: __________
What I am doing about it:  fix now / log a defect / accept with reason
Reflect: Which check failed first? Almost every student fails on the same one — the test, the docs update, or the log entry. That is your personal weak point for the next six weeks; name it out loud.

- Then reference it from your pull-request template so you cannot merge without seeing it.


