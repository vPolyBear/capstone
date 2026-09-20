# Week 4 Reps

## Rep 1 - Five adjectives, four fields

| Adjective | Metric | Threshold | Condition | Measurement method |
|---|---|---|---|---|
| Quick | The AI analysis prompt response time on the AI Analysis page | p95 under 25 seconds | 1 check in response and 1 journal entry recorded with throttled "Fast 3G" connection in Expo Go on an iPhone | 20 prompt responses sent and loaded in the mobile app; record the response time and the p95 in the measurements log |
| Clean | The app clones and runs on an empty machine | 0 errors/issues recorded | An empty iPhone running on throttled "Fast 3G" connection in Expo Go without any pre existing data that would interfer with the app | Cloning the repository while following the README to get the app running to test it |
| Personalized | AI Anaylsis response matches what an with stress individual responds to the check ins and journal entries | 7 out of 10 test individual responses | 10 test individual check ins and journal entries provide varying AI responses that align with the test entries on an iPhone with throttled "Fast 3G" connection in Expo Go | minimum of 7 AI responses that match the test individual responses |
| Random | A different activity is choosen everytime and appears on the screen | 10 out of 10 activities vary and choosen p95 under 15 seconds | 10 random activity tests return on an iPhone with throttled "Fast 3G" connection in Expo Go | 10 activities selected differently 10 times and the results of each loaded in the mobile app; record the response time and the p95 in the measurements log |
| Automatic | A activity is choosen without user input to aid the choosing of the activity | 10 out of 10 activities are choosen with only a user pushing a random button, no other user input needed | 10 random activity tests return on an iPhone with throttled "Fast 3G" connection in Expo Go | 10 activities selected differently 10 times and the results of each loaded in the mobile app without any other user input needed other than clicking the random button |

- The hardest adjective to convert was automatic because it was similar to random but it means a different thing. Though it is still important to the function of the system so trying to differ it but show its relevance was harder. The difficulty told me that I needed to ensure I fully understand how automation in my app works.


## Rep 2 - The percentile drill

0.38  0.41  0.39  0.44  0.40  0.42  0.37  0.45  0.41  0.39  0.43  0.40  0.38  0.46  0.42  0.41  0.39  0.44  2.90  9.20

0.38 + 0.41 + 0.39 + 0.44 + 0.40 + 0.42 + 0.37 + 0.45 + 0.41 + 0.39 + 0.43 + 0.40 + 0.38 + 0.46 + 0.42 + 0.41 + 0.39 + 0.44 + 2.90 + 9.20 = 19.49 

19.49 / 20 = 0.9745
Mean = 0.97 seconds

0.37, 0.38, 0.38, 0.39, 0.39, 0.39, 0.40, 0.40, 0.41, 0.41, 0.41, 0.42, 0.42, 0.43, 0.44, 0.44, 0.45, 0.46, 2.90, 9.20

0.95 x 20 = 19

19th number is 2.90 => p95 = 2.90 seconds

Max = 9.20 seconds

Summary
Mean = 0.97 seconds
p95 = 2.90 seconds
Max = 9.20 seconds


Which of the three numbers you would put in a requirement, and why. 
- Out of the three numbers I would put p95 = 2.90 seconds because it shows that 95% of measurements are at or below 2.90 which helps to show both the context and speed averages because some loading speeds can be slower than others so 95% of measurements ran at or below 2.90.

Then answer this: if your requirement said “average page load under 1.5 seconds,” would this system pass? Would your users agree?
- Yes this system would pass because it's average load was 0.97 and that is below 1.5 seconds on average. I believe the majority would agree because it states on average and even if some cases are above 1.5 the mean loading time for this system is 0.97 which is still lower.

One more thing to notice, and it matters for your document: percentile has more than one definition — nearest-rank and interpolated methods give different answers on small samples. That is exactly why the method field exists. Write down which one you used.
- Nearest rank because the 19th number was 2.90 because it was considered the 95th percentile because the 19th number from the 20 numbers was revealed through multipling 0.95 by 20 it equals 19 meaning the closest number to 19 was the 19th number.


## Rep 3 - Diagnose and rewrite

NFR-1  The application should have good performance.
- unmeasurable, missing condition, aspirational - not verifiable, no measurement method
- NFR-PERF-01 (Must): Stressed individuals shall be able to get a response from the AI Analysis in a p95 under 25 seconds when there is at least 1 check in and journal entry recorded on an iPhone with throttled "Fast 3G" connection in Expo Go. Measured with 20 prompts to the AI Analysis and checking the p95 result.

NFR-2  The system must be highly available and scalable.
- unmeasurable, missing condition, compound (two or more requirements in one), aspirational - not verifiable, no measurement method 
- NFR-REL-01 (Must): Stressed individuals shall be able to run the app 9 out of 10 times when entering it with 0 unhandled exceptions and errors on an iPhone with throttled "Fast 3G" connection in Expo Go. Measured with 10 opening and closings of the app and the times it succeeded vs failed.
- NFR-SCAL-01 (Should): Stressed individuals shall be able to run the app when there are over 50 journal entries in it in p95 under 50 seconds on an iPhone with throttled "Fast 3G" connection in Expo Go. Measured with 10 opening and closings of the app and checking the p95 result.

NFR-3  The UI shall be intuitive.
- unmeasurable, missing condition, aspirational - not verifiable
-  NFR-USE-01 (Should): Stressed individuals first time on the app 4 out of 5 of them shall be able to complete 1 check in, journal entry, and AI Anylsis prompt request when they go through the app, without help on an iPhone with throttled "Fast 3G" connection in Expo Go. Measured with 5 first time stressed individuals app usage results.

NFR-4  User data will be kept safe.
- unmeasurable, missing condition, aspirational - not verifiable
- NFR-SEC-01 (Must): Stressed individuals data shall not be breached 0 times when the repository has 0 AI API key's in any commit in an iPhone with throttled "Fast 3G" connection in Expo Go. Measured by scanning over the full history and recording the results of the AI API key presence after checking every file.

NFR-5  The code should follow best practices.
- unmeasurable, aspirational - not verifiable
- NFR-MNT-01 (Must): New stressed individuals shall be able to use only the README when creating a clean clone of the repository to reach a running app in under 10 minutes with 0 errors. Measured through testing this on a clean computer and that the app works on an iPhone with throttled "Fast 3G" connection in Expo Go, recording how long it took. 

NFR-6  The app should work on mobile.
- unmeasurable, missing condition, solution-biased
- NFR-PORT-01 (Should): Stressed individuals shall be able to run the app and complete the a least 1 check in, journal entry, and AI Anaylsis when on 2 different operting systems, both iOS and Android with throttled "Fast 3G" connection in Expo Go. Measured through testing and recording that each feature works on an iPhone and Android.

 whether the difficulty was in the metric, the threshold, the condition, or the method.
- The one that I found the hardest to rewrite was NFR-2 because it was hard to think about how both availability and scalability aspects fit in my app. The difficulty was in the condition because I wanted to ensure that it would be possible for my app to realistically handle the data amount while also being testable.


## Rep 4 — The data inventory

Build the table from section 4.4 for your project. 
One row per data element you touch — including things you would not have called data: email addresses, uploaded files, session logs, error reports, anything you send to a third party.

| Data element | Why you need it | Where it lives | How long you keep it | How a user gets rid of it |
|---|---|---|---|---|
| Check in responses | To help stressed individuals to take a minute to calm and think about their stress, to show the overview of an individual stress throughout time, and it is used in the AI's analysis to provide some insight of current condition | It lives locally on the stressed individuals phone | Until they delete the app | There is no way to delete a check in currently unless a delete function is implemented |
| Journal Entries | To help stressed individuals express and reflected on their stress and feelings and it is used in the AI's analysis to provide more context | It lives locally on the stressed individuals phone | Until they delete the app | If they clear out an entry through editted unless a delete function is implemented |
| Check in response and Journal Entries sent to the AI, Gemini | Need the responses and entries to create a suggestion based explanation and to provide an destressing suggestion | It lives in Gemini as that is were the information is being sent, it stores it if you don't pay for a premium version | N/A | N/A |
| Google Gemini AI API Key | This is necessary in order to connect the stress management app to Gemini | Supabase Edge Function | N/A | N/A |

- The two rows that I do not know the answer to are the 'Check in response and Journal Entries sent to the AI, Gemini' & 'Gemini AI API Key' rows in the columns 'How long you key it' and 'How a user gets rid of it'. The primary source I would read to find out is on Google Gemini's terms page for the 'Check in response and Journal Entries sent to the AI, Gemini' row and the Supabase terms page for the 'Gemini AI API Key' row.


## Rep 5

Did on gmail because this does not make sense for the current state of my project because there are no three core tasks complete to test.

| ID | Requirement (metric · threshold · condition) | Priority | How it is measured |
|---|---|---|---|
| NFR-USE-01 | The visibility precentage of the composition buttons hovering feature shall be above 50% opacity when an individual hovers over the composition button this higher visiblitiy of black must be visible on a Windows computer in Chrome | Must | Hovering over the composition button 5 times to see if it is visible in different brightnesses and background colors |
| NFR-USE-02 | The minimal tabbing amount to get to the X out button shall be less than 7 tabs when tabbing over to the X button in the email draft recorded on a Windows computer in Chrome | Must | Tabbing over to the X out button 5 times to see if the tabbing gets to the X in less than 7 tabs |
| NFR-USE-03 | The minimal shift tabbing amount get to the a section on the page shall be less than 7 shift tabs when shift tabbing over to the search email section on the page with minimal button switches on a Windows computer in Chrome | Must | Shift tabbing over to the search email section 5 times to see if the shift tabbing gets to the search section in less than 7 shift tabs |


## Rep 6

This does not make sense for the current state of my project because there are no true UI elements inplace that could test the color nor three core tasks implemented.


## Rep 7 — The prohibitions, and the history check

- Stressed individuals shall not be able to see committed or have access to the Gemini AI API keys, tokens, or other keys when looking into the repository. This is measured by going over every commit made to GitHub and checking that the .env is in the gitignore and that there are 0 secrets found when this is done. 
- Stressed individuals responses and entries shall not be put into a query or command line when the user enters a response into the check in or journal entries. This is measured by testing for injectioin attacks and checking that there are 0 injection attack opportunities present.
- Stressed individuals shall not be able to request for multiple AI analysis' when prompting over 5 times for either an analysis or an activity suggestion all at once or in less than 5 seconds. This is measured by sending 6 analysis' or activities' and on the 6th one the app should not accept it and throw an error message and this should check for how many times this happens and the amount of sent requests both should be 0.
- Stressed individuals shall not be able to see system errors or messagse when running into trouble on a feature, instead in less than 15 seconds a user error should appear stating something went wrong. This is measured by checking what error message appeared and where, and the recording must show 0 times an error or message appeared.
- Stressed individuals responses to the check ins and journal entries shall not be provided to Gemini AI unless the stressed individual prompts the AI Analysis with a request when they want a suggestion based explanation for their stress or an activity suggestion. This is measured by checking the AI request page after doing 7 check ins and 7 journal entries, where the recording must show that the check ins and jounray entries were sent 0 times to Gemini AI.

- It found promptTokens, candidateTokenCount, and js-tokens, though these are found to be false posititives so they are not secrets.


## Rep 8 — Sort the pile

Practice Ones

Constraint
a. The course ends in Week 16.
c. I have no administrator rights on my laptop.
f. I can only work about 15 hours a week.
j. I must demo live in a 30-minute session.

Assumption
b. The barcode API's free tier allows 1,000 calls per day.
d. The hosting provider will still have a free tier in December.
g. My roommates will test the app in Week 11.
k. Two hundred pantry items is a realistic maximum for one household.
l. The framework's auth module handles password hashing for me.

Dependency
e. The app needs a hosted database.
i. CI minutes on my provider's free plan.
h. The charting library I want to use is GPL-licensed.
l. The framework's auth module handles password hashing for me.

Obligation
h. The charting library I want to use is GPL-licensed.


For My System

Constraints
| Number | Constraint |
|---|---|
| 1 | The system must be completed in 16 weeks and be demostratable by Week 16 |
| 2 | The app must be able run on Expo Go on an iOS phone |
| 3 | I can only generally work 30 hours per week on the project if time is managed perfectly |
| 4 | The project must follow the course rubric and criteria |

Assumptions
| Number | Dependency | Owners | Verify-By Dates |
|---|---|---|---|
| 1 | The Gemini AI API will still have a free tier in December or the paid tier will still not use the content to improve products | me | Week 5 |
| 2 | Gemini AI will be able to response with proper and helpful suggestion based explanations based on the check ins and journal | me | Week 9 |
| 3 | The Supabase Edge Function will be able to safely store and call the Gemini AI API key | me | Week 6 |
| 4 | Individuals will find the destressing activity suggestion range to pick from and use to be useful | me and stressed individuals testing it | Week 11 |

Dependencies
| Number | Dependency | Failure Modes | Fallbacks |
|---|---|---|---|
| 1 | Gemini AI API | The API is down and unavailable for an extended period of time when needed | An error message is shown saying it failed and will instead use the fallback of a word based search over the journal entries to provide a prewritten response based on the key words found and provide a random activity suggestion |
| 2 | Expo Go  | The app fails randomly, cannot be started, or can not reach Gemini AI | Test and use an iOS simulator beforehand |
| 3 | Supabase Edge Function | The key can not be retrieved or it can not call for the Gemini AI API key | It falls back to the fallback for the general AI Anaylsis were an error message is shown saying it failed and will instead use a word based search to provide prewritten suggestion based explanations and activity suggestions |


## Rep 9 — Verify one obligation at the source

| Obligation | Primary source (URL) | Date checked | What it requires of me |
|---|---|---|---|
| Gemini API terms for use and data | https://ai.google.dev/gemini-api/terms | 2026-09-18 | It requires that I follow the Prohibited Use Policy, don't use the AI API to provide any medical. I must follow the laws when using generated content. The unpaid AI API responses generated can be used to improve Google's technology, though this isn't true for the paid AI API. At the end it states I am responsible for the actions and tasks performed. |

- The primary source generally said exactly what I expected it to say as it just stated the generic rules and regulations for how it should be used and how data is used differently for whether it is paid or unpaid. However, I kind of forgot how with service like this that you can't use the AI API as part of an application that is directed towards or is likely to be accessed by individuals under the age of 18. Though luckily my primary audience is stressed college students.


## Rep 10 — The enumeration pass, and the cull

- Added the AI additions to the Requirements.md file
- AI's Response Analysis (This is also added in the ai-usage.md)
    - Proposed: 21 Non Functional Requirements & 8 Obligations
    - Kept: 7 Non Functional Requirements & 2 Obligations
    - One specific thing it go wrong: That it thought that I wanted to have the journals or checks in to be deletable and wanted me to add in a non functional requirement for data deletion though I have never stated that deletation of the individual features data is possible. Only when the app is deleted would this data be deleted fully.


## Rep 11 — Break it, then fix it

ORPHAN REQUIREMENT (2)
  - FR-005: no design element -- nothing in the system is responsible for it
        - Demote FR-005 to Could and record the decision

  - NFR-PRIV-02: no design element -- nothing in the system is responsible for it
        - IdentifierOptService, Add the design element that will remove any names or user identifiers when the opting out is clicked on the opt pop up

UNTESTED REQUIREMENT (3)
  - FR-004: no test -- you cannot show it works, so it does not count
        - Test by scanning in or typing in a barcode checking that each test returns the correct item each time

  - FR-005: no test -- you cannot show it works, so it does not count
        - Test by having each individual in the household can fully access and functionaltiy by changing, adding, or deleting items in the pantry

  - NFR-PRIV-02: no test -- you cannot show it works, so it does not count
        - Test that the opt in and out work when a user clicks either option checking that the item name or user identifier are only sent when the opt in is explicitly clicked by the user, otherwise, neither shall be sent to a third-party model

UNMEASURABLE NFR (1)
  - NFR-PERF-02: no measurement method -- this is a wish, not a requirement
        - Measured by testing 10 times that a barcode lookup either returns or times out expecting that the recording times are within in p25 under 3 seconds

UNREQUESTED WORK (1)
  - ExportToCsvButton: built or planned with no requirement behind it -- cut it, or write the requirement and get it prioritized
        - Cut the ExportToCsvButton, removing it, and then record the decision

DUPLICATE ID (1)
  - NFR-ACC-02: appears 2 times; identifiers must be unique and stable
        - If the duplicate id is the same and the information in the row is also the same in both rows then delete the duplicate row. If it is not a duplicate row then increment the id and log as modified. Then record these decisions

Example One Final Results:
Clean. Every requirement is designed, tested, and measurable.

My systems requirments arelisted in traceability-matrix.csv

- There were 0 orphans on the first run and for all the requirements I listed I'm intending to build them.


## Rep 12 — Write it, then cut it

- No items were cut but just removed the (or, for a CLI, remain readable with color disabled) because my system wouldn't be for the terminal. Then I edited the "New user-facing screens..." checklist item to fit for mobile because keyboards aren't necessary for my system. The item that I kept but am least sure I will honor is the "At least one automated test..." checklist item as it will be harder to push myself to do them when I feel that I need to do a more important feature sooner than later. Though what I will change about my workflow to make sure it survives Week 12 is by getting in the habit of writing tests after each item to ensure I don't miss, procrastinate, or forget to do them.
