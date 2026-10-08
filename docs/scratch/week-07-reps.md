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
- T-5.1 E = 3.0 | Before this chapter = 4
    - Orginally I thought that it may take longer to link the mobile app to the Supabase Edge Function because just thinking about the whole process was stressful but after breaking it down it does seem more managable.
    - Average difference percentage = -20% (so -20% less time the original)
- T-5.2 E = 3.0 | Before this chapter = 4
    - Orginally I thought that it may take longer to link the Supabase Edge Function to the Gemini AI API because just thinking about the whole process was stressful but after breaking it down it does seem more managable.
    - Average difference percentage = -20% (so 20% less time the original)
- T-5.3 E = 2.0 | Before this chapter = 2
    - Orginally I thought that this may not take a long because it seems not as hard but knowing how I work more now it may take a bit longer
    - Average difference percentage = 60% (so 60% more time the original)
- T-5.4 E = 3.2 | Before this chapter = 5
    - Orginally I thought that this may take longer because I didn't fully know yet how the check ins and journal entries would be used but it now seems more reasonable
    - Average difference percentage = -24% (so 24% less time the original)
- T-5.5 E = 2.8 | Before this chapter = 3
    - Orginally I thought that this would be a little bit harder to do but generally it does not seem worst to do
    - Average difference percentage = -6.67% (so 6.67% less time the original)

## Rep 5 — The spread test

Reflect: How many tasks failed the spread test? Where do the spikes have to sit in your schedule for their answers to arrive in time to matter?
- 0 tasks failed the spread test all were under 4 hours. None needed to be split or timeboxed. All the spikes are able to sit in the the normal starting and ending areas of the schedule because none are over 4 hours.