## Rep 1 — Inventory the invisible work

Invisible work package                                          In my WBS already?   Rough hours
--------------------------------                                -------------------  -----------
Repository scaffold + CI                                        [X] yes  [ ] no       __6 hrs__
Seed / fixture data                                             [ ] yes  [X] no       __4 hrs__
Error handling + edge cases                                     [X] yes  [ ] no       __10 hrs__
Accessibility pass                                              [ ] yes  [X] no       __4 hrs__
Secrets, config, deployment                                     [ ] yes  [X] no       __11 hrs__
Reviewing AI-generated code                                     [ ] yes  [X] no       __6 hrs__
README / runbook / handoff                                      [ ] yes  [X] no       __11 hrs__
Selecting check in and journal entries for AI Analysis          [ ] yes  [X] no       __5 hrs__
Reviewing and testing the AI's fallbacks analysis               [ ] yes  [X] no       __5 hrs__
Testing on both iOS and Android phones                          [ ] yes  [X] no       __5 hrs__

Reflect: How many boxes came back “no”? Add those hours up. That number is how wrong your plan was ten minutes ago — write it down before you fix it, because you will want the humility later.
- 61 hours

## Rep 2 — Decompose one work package properly

### WP-05 — AI Analysis  ·  requirements FR-AIA-01, FR-AIA-04,  NFR-PRIV-01, NFR-PRIV-02, NFR-PERF-01, NFR-AVA-01, NFR-SEC-01  ·  owner: Katherine Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-5.1 | Link the Mobile app to the Supabase Edge Function | FR-AIA-01, FR-AIA-04 | 1 | 2 | 4 | 2.2 | The Mobile app is able to send the request to the Supabase Edge Function | — |
| T-5.2 | Link the Supabase Edge Function to the Gemini AI API | FR-AIA-01, FR-AIA-04, NFR-SEC-01 | 1 | 2 | 4 | 2.2 | The Supabase Edge Function is able to send the request it got to the Gemini AI API and receive a response from the Gemini AI API, while the Gemini API key is kept secure and isn't exposed or sent to the mobile app | T-5.1 |
| T-5.3 | Provide predetermined prompts for suggestion based explanations and destressing activities | FR-AIA-01, FR-AIA-04 | 1 | 2 | 3 | 2.0 | Prompts are selectable for analysis and provide the proper response back based on the selected on | T-5.1, T-5.2 |
| T-5.4 | Select the check ins and journal entries wanted for the analysis | FR-AIA-01, FR-AIA-04, NFR-PRIV-01, NFR-PRIV-02 | 2 | 3 | 4 | 3.0 | The check ins and journal entries can be selected and are the only ones sent through for the analysis, no other unrelated, unchecked information is sent | T-5.1, T-5.2 |
| T-5.5 | Display and check the received response displays on the UI within a p95 under 25 seconds | FR-AIA-01, FR-AIA-04, NFR-PERF-01 | 1 | 3 | 4 | 2.8 | The suggestion based explanation or destressing aid is displayed on the UI | T-5.1, T-5.2, T-5.3, T-5.4 |
| T-5.6 | Keyword Fallback analysis and testing it | FR-AIA-01, FR-AIA-04, NFR-AVA-01 | 2 | 3 | 5 | 3.2 | The keyword fallback provides an analysis when Gemini is unavailable, times out, error, or provides an invalid response within 30 seconds | T-5.1, T-5.2, T-5.3, T-5.4 |

## Rep 3 — The bad-WBS autopsy

### Five distinct defects. 

1. Doesn't seperate and break down the work packages into actual tasks, 
2. It just states a big range of what can be done in the work package as it doesn't specify what tasks are done/ what happens in each
3. Doesn't provide estimates for each one
4. Doesn't provide traces to the requirements each touch
5. Doesn't state when each are determined complete 

### WP-02 — Backend  ·  requirements FR-SET-01  ·  owner: me

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-2.1 | Main framework set up | FR-SET-01 | 1 | 3 | 4 | 2.8 | The main framework properly opens the pages and runs without errors | — |
| T-2.2 | Link the database to the framework | FR-SET-01 | 1 | 3 | 4 | 2.8 | The data can be stored and retreived from the database | T-2.1 |
| T-2.3 | Link the chosen APIs to the framework | FR-SET-01 | 2 | 3 | 5 | 3.2 | The framework can send requests and receive responses back from the API | T-2.1 |
| T-2.4 | Implement testing and error handling | FR-SET-01 | 2 | 4 | 5 | 3.8 |  Tests run without errors and errors are caught and a proper message appears if an error occurs | T-2.1, T-2.2, T-2.3 |

Reflect: Which of the five defects is the most expensive, and in which week does the bill arrive? Be specific about the week — that is the skill.
- Out of the five defects the one that is the most expensive is it, doesn't state when each are determined complete because may cause an individual to continue working on a task for way longer than it should be which may then leave little time left for the other tasks. The most expensive week the bill arrives is likely week 10 because there as been time to work on the project and there isn't too much time left so individuals may get the bill and have to work overtime or take time away from other tasks. 

## Rep 4 — Three-point estimate everything

Reflect: For your first five, how did E compare to the single number you would have written before this chapter? Report the average difference as a percentage. That gap is the planning fallacy, measured on yourself.

First Five I wrote were for WP-05
- T-5.1 E = 2.2 | Before this chapter = 4
    - Orginally I thought that it may take longer to link the mobile app to the Supabase Edge Function because just thinking about the whole process was stressful but after breaking it down it does seem more managable.
    - Average difference percentage = -45% (so 45% less time the original)
- T-5.2 E = 2.2 | Before this chapter = 4
    - Orginally I thought that it may take longer to link the Supabase Edge Function to the Gemini AI API because just thinking about the whole process was stressful but after breaking it down it does seem more managable.
    - Average difference percentage = -45% (so 45% less time the original)
- T-5.3 E = 2.0 | Before this chapter = 2
    - Orginally I thought that this may not take as long because it seems not as hard and this lines up
    - Average difference percentage = 0% (so 0% more/less time the original)
- T-5.4 E = 3.0 | Before this chapter = 5
    - Orginally I thought that this may take longer because I didn't fully know yet how the check ins and journal entries would be used but it now seems more reasonable
    - Average difference percentage = -40% (so 40% less time the original)
- T-5.5 E = 2.8 | Before this chapter = 3
    - Orginally I thought that this would be a little bit harder to do but generally it does not seem worst to do
    - Average difference percentage = -6.67% (so 6.67% less time the original)

## Rep 5 — The spread test

Reflect: How many tasks failed the spread test? Where do the spikes have to sit in your schedule for their answers to arrive in time to matter?
- 0 tasks failed the spread test all were under 4 hours. None needed to be split or timeboxed. All the spikes are able to sit in the the normal starting and ending areas of the schedule because none are over 4 hours.

## Rep 6 — Compute your calibration factor

T-1.1 E = 2.0 x 1.10 = 2.2
T-1.2 E = 2.0 x 1.10 = 2.2
T-1.3 E = 2.0 x 1.10 = 2.2
T-1.4 E = 2.0 x 1.10 = 2.2
T-1.5 E = 2.0 x 1.10 = 2.2
T-1.6 E = 2.0 x 1.10 = 2.2

T-2.1 E = 2.2 x 1.10 = 2.42
T-2.2 E = 2.2 x 1.10 = 2.42
T-2.3 E = 2.8 x 1.10 = 3.08
T-2.4 E = 2.8 x 1.10 = 3.08
T-2.5 E = 2.0 x 1.10 = 2.2

T-3.1 E = 2.0 x 1.10 = 2.2
T-3.2 E = 2.0 x 1.10 = 2.2
T-3.3 E = 2.0 x 1.10 = 2.2
T-3.4 E = 2.8 x 1.10 = 3.08
T-3.5 E = 2.0 x 1.10 = 2.2
T-3.6 E = 2.0 x 1.10 = 2.2

T-4.1 E = 2.0 x 1.10 = 2.2
T-4.2 E = 3.2 x 1.10 = 3.52
T-4.3 E = 3.0 x 1.10 = 3.3
T-4.4 E = 2.0 x 1.10 = 2.2
T-4.5 E = 2.8 x 1.10 = 3.08
T-4.6 E = 2.0 x 1.10 = 2.2

T-5.1 E = 2.2 x 1.10 = 2.42
T-5.2 E = 2.2 x 1.10 = 2.42
T-5.3 E = 2.0 x 1.10 = 2.2
T-5.4 E = 3.0 x 1.10 = 3.3
T-5.5 E = 2.8 x 1.10 = 3.08
T-5.6 E = 3.2 x 1.10 = 3.52

T-6.1 E = 2.0 x 1.10 = 2.2
T-6.2 E = 2.0 x 1.10 = 2.2

T-7.1 E = 2.0 x 1.10 = 2.2
T-7.2 E = 2.0 x 1.10 = 2.2
T-7.3 E = 2.0 x 1.10 = 2.2

T-8.1 E = 3.8 x 1.10 = 4.18
T-8.2 E = 3.2 x 1.10 = 3.52
T-8.3 E = 3.2 x 1.10 = 3.52

= 96.14 hours

87.4 x 1.10  = 96.14 hours

Reflect: What is your factor, and how many tasks is it built on? If it is fewer than eight, say so in one sentence and state how you will strengthen the sample by Week 10. Then answer the uncomfortable question: are you slower than you thought, or were your done-whens too vague to fail?
- The calibration factor was 1.10 built on 42 tasks. I am a bit slower than I thought because my estimate was 8.74 less than the actual 96.14 hours.

## Rep 7 — Run the checker
Reflect: What is your verdict line, verbatim? If you are over budget, by how many hours — and which week does the script say the plan first exceeds remaining capacity?
- VERDICT: OVER BUDGET by 9.2 h - cut, defer, or re-estimate
- The week the plan first exceeds the remaining capacity is week 8

## Rep 8 — Build the capacity table you will actually live in

| Week | Chapter, quiz, reps, milestone write-up | Known losses | Available for this plan |
|---|---:|---:|
| 8 | 12 | none | 8 |
| 9 | 7 | none | 13 |
| 10 | 5 | none | 15 |
| 11 | 7 | none | 13 |
| 12 | 7 | none | 13 |
| 13 | 7 | none | 13 |
| 14 | 7 | none | 13 |
| 15 | 7 | none | 13 |
| 16 | 7 | none | 13 |
| **Total** | **66** | **114** |

Reflect: What is your real total, and how far is it from 87? If your number is higher than 87, name the specific thing that makes you faster than the model. “I’ll just work more” is not a thing.
- It is 27 hours away from 87 though this is because each week I generally work 20 hours based on the hours-log.csv this is because I typically spend more time on each thing because I work slower so I accounted for this in the table because I know that I will spend more time on a task because I am slower which is why my number is higher than 87.

## Rep 9 — Declare the buffer and find the gap

Available __114__ h   ·   Buffer __28.5__ h   ·   Plannable __85.5__ h
Calibrated WBS total __96.14__ h   ·   Gap __10.64__ h

Reflect: Was your first instinct to lower the buffer or to cut scope? Both close the gap on paper. Only one of them still closes it in Week 13.
- My first instinct was to cut the scope to close the gap because I already knew that I would likely need to cut some of the shoulds or coulds and this proves it to me that this is necessary so it lowers the work load time without removing the buffer because it is important to have the buffer in place just in case something goes wrong or if I am even slower than I predicted.