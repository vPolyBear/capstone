# Software Requirements Specification — Stress Manager

**Author:** Katherine Spencer  **Version:** 1.1  **Date:** 2026-09-19
**Status:** Baselined

---

## 1. Purpose and Scope

This system is for individuals who deal with stress, such as college students as school is a time of learning not only information but about yourself. Many students struggle with dealing with what life throws at them, from school, work, family issues, self image, and so on. Stress is very apparent in many individuals' lives. Though some struggle more than others, therefore, this system will serve anyone who needs a little extra help. This system will remove the problem of needing to download multiple apps to write, understand, and release stress and it will remove the struggle of trying to figure out the root of a stressor and mend it, without aid. 

What is out of the boundaries for this release is a communication page, notifications and reminders, more than 5 sections of destressing activities, user accounts, predicting the stressed individuals stress, a special therapist view, tracking and pulling sleep data from a watch (sleep is only tracked if the stressed individual answers hours slept question on the check in page), personal To Do lists, and linking of school related technology such as the Canvas ToDos are all out of bounds.

## 1.5 Feature areas and the identifier scheme

AREA CODE   AREA NAME              ONE SENTENCE OF SCOPE
QUES        Questions              Questions about current stress
OVER        Overview               Results in graphs of week/months stressors
JOU         Journal                Place to express feelings
ACT         Activity               Things to do to reduce stress
AIA         AI Analysis            User based explanation and suggestion for stress

## 2. Stakeholders and Personas

| Persona | Who they are | What they need from the system | Evidence they exist |
|---|---|---|---|
| Stella S., 20, College Student | She is an easily stressed student that has a hard time dealing with both deadlines and life's challenges | She needs a place to learn how to properly deal with her emotions and stressors, so instead of wishing to predict her stress she can learn to manage it | Interview 2026-09-02 & Elicitation Interview 2026-09-09 |
| The next maintainer | They will be inheriting this repository when the course ends | They need to be able to understand what every feature was intended for solely from what is documented | They are a course requirement and present in the Chapter 13 clean machine test |

## 3. Definitions

Define every term your requirements use in a project-specific sense. If a reader could interpret a word two ways, it belongs here.

| Term | Definition in this document |
| Stress | This comes from a clear outside event, when a mind focuses on the present events, and it is typically temporary (this is considered acute stress) as it ends when the outside event ends. Though chronic stress is stress that stays for a long time from weeks to years and continues because an individual is "stuck" in the outside event |
| Anxiety | This does not come from a clear outside event but comes from an individual's mind, when they focus on the future events, and it isn't temporary but persists. Similar to chronic stress it can also stay for weeks to years continuing until the internal "threat" is gone. |
| Grounding | A strategy done by someone to help them cope with their feelings and emotions, pulling the individual away from the overwhelming feelings or panic |
| Sections of Destressing Activities | This would be the groups of destressing activities themself, not an individual destressing activity |
| Destressing activity | This would be the individual destressing activity itself that you could complete or interact with |
| Toast | It is a pop up message that is temporary and provides feedback based on the action done. It usually appears on the corners of the screen and interfere with anything |
| Pop up | It is a message that appears and can show a message and/or includes an action. It also usually includes an X or a cancel option in order to close the window and continue. |
| Method | It is a thing done with the aim to relieve stress, everybody usually does different things that work with them to lower their stress quicker and manage it. |
| Manage | It is a thing done to take control of an individual's stress and properly work with it instead of against it. |

## 4. Assumptions and Dependencies

- **Assumption:** The app will be able to save a stressed individuals data from the check in and the journal entries locally to their devices — *If false:* The app will need to use an external database instead in order to then save the individuals data
- **Dependency:** The external service the app relies on is Google's Gemini AI API in order to provide suggestion based explanations for stress and a destressing activity suggestion — *If unavailable:* The fallback is to search for specific key words in the journal and patterns/key words in the check in question responses to provide an altered suggestion based explanations for stress.

## 5. Functional Requirements

### FR-QUES-01 — Add check in response

**Priority:** Must
**Requirement:** An individual with stress shall be able to complete a check in question that asks about their stress when they open the app.
**Rationale:** This exists because it is one of the main features used to understand and break down why an individual has stress. Stella struggled with centering herself so going through check ins can ground her when nothing anyone can do for her helps.
**Acceptance criteria:**
- Given check in question on the screen, when the individual with stress answers a question, after they submit, then they should see the saved check in response as when they open the Overview of stress page the graphs will update within seven seconds with the added response answers.
- Given a missing response to a check in question, when the stressed individual submits the check in response, then the system must instantly reject the submission and state the missing field(s) within five seconds.
- Given a check in question response fails to save, when the stressed individual submits the check in response, then the system should provide a response within five seconds that the check in responses were not properly saved and to try submitting again in five seconds.

**Source:** Elicitation Interview with Stella, 2026-09-09

### FR-QUES-02 — Edit check in response

**Priority:** Should
**Requirement:** An individual with stress shall be able to edit a check in question they did that day when selecting edit to change a response about their stressors.
**Rationale:** This exists because it is the second part to one of the main features and allows individuals to change a response if they make a mistake. Again since Stella struggled with centering herself, going through check ins can ground her when nothing anyone can do for her helps and mistakes can happen so having the ability to edit them is helpful when trying to ground yourself.
**Acceptance criteria:**
- Given a check in question, when the individual edits a previous response, after they edit, then they should see when they open the Overview of stress page the graphs update within seven seconds with the edited response answers.
- Given a check in response is removed when editing a check in, when the stressed individual submits the edits, then the system must reject the submission and state the missing field(s) within five seconds.
- Given a check in edit fails to save, when the stressed individual submits the check in response, then the system provides a response within five seconds that the check in responses were not properly saved and to try submitting again in five seconds.

**Source:** Elicitation Interview with Stella, 2026-09-09 & my decision

### FR-QUES-03 — Count of completed check ins

**Priority:** Should
**Requirement:** An individual with stress shall be able to see how many check ins they completed through a toast when they submit a check in.
**Rationale:** This exists because it allows individuals to get a quick grasp on how many check ins they have completed through the time they have had the app. This is my decision, I believe that it's nice to be proud of the fact that you are able to check in on yourself and seeing the amount of check ins done can help an individual see the progress they've made.
**Acceptance criteria:**
- Given the check in question is entered in, when the individual submits it, then they should see a toast pop up within five seconds, congratulating them on completing a specific amount of check ins since they started using the app.
- Given the pop up does not appear when a check in is submitted, then the system must state it failed to appear but the check in was/wasn't successfully submitted within seven seconds of the pop up not appearing.

**Source:** My Decision

### FR-QUES-04 — Monthly check in question

**Priority:** Won't (this release)
**Requirement:** An individual with stress shall be able to answer longer, overview style monthly check in questions about their stress when they enter the app at the end of the month.
**Rationale:** This exists because it allows individuals to take some time reflecting on how the month has been and allows individuals a chance to still see an informative overview of the month even if they have missed checking in some days. Again Stella mentioned that when she gets through her stress alone she feels proud of herself and when the month has been bad but you get through it, I believe that it's nice to be proud of that fact and reflect on any small progress. Though this is still recorded to show that it wasn't forgotten so if for a later release an idea is thought of to mimic this/in a way make it possible.

**Source:** Elicitation Interview with Stella, 2026-09-09 & my decision

### FR-OVER-01 — Stress weekly/monthly view

**Priority:** Must
**Requirement:** An individual with stress shall be able to see how their stress is doing from the results of the check ins in weekly/monthly views when they open up the weekly/monthly views on the overview page.
**Rationale:** This exists because without it individuals would not really get much from the questions they answered during the check in. Stella saw from the past with stress that when she was able to get over the stress on her own it made her proud. This page allows individuals to see a progression. Then the next maintainer needs to understand that the overview shows how an individuals stress is doing through two views 
**Acceptance criteria:**
- Given a graph with the check in question results when the view is switched to a weekly or monthly view, then the stressed individuals should see either the week's check ins overview or the months within five seconds.
- Given the graphs don't appear to have information in them yet when the stressed individual opens the page, then state within three seconds that check in question responses are needed before results can appear.
- Given the graphs haven't loaded yet when the stressed individual opens the page, then state within five seconds that check in question responses are still loading and if loading fails that something went wrong.

**Source:** Elicitation Interview with Stella, 2026-09-09 & my decision & The next maintainer

### FR-OVER-02 — Extra goals

**Priority:** Should
**Requirement:** An individual with stress shall be able to choose stress relieving based goals either a predetermined one or custom written one, for the week and month when they enter in the overview page.
**Rationale:** This exists because it is a should feature that will be made only if there is room available for the time it takes to create it. Stella uses various methods that were given to her to deal with stress, having goals is another method that an individual can use to have something to aim for that they can be proud of completing.
**Acceptance criteria:**
- Given that a goal is chosen, when a stressed individual clicks on a predetermined one or writes one, then it should appear as a goal above the overview page within five seconds so the individual can check back to this goal when reviewing the overview page.
- Given the goal fails when clicked or fails to be sent to the database, when the stressed individual clicks/submits the goal, then an error message should appear stating that the goal was not processed please try again within ten seconds of the goal failing.

**Source:** Elicitation Interview with Stella, 2026-09-09 & my decision

### FR-OVER-03 — Graph Click in view

**Priority:** Won't (this release)
**Requirement:** An individual with stress shall be able to see the full results of an individual check in when they click a specific point on any of the graphs.
**Rationale:** This exists because it allows individuals to see where the specific full response for where the individual answer to the check in question came from. This is my decision because I believe it is useful to be able to look back or for a stressed individual to check if they wonder why that specific point was at the position it was. Though this is still recorded to show that it wasn't forgotten so if for a later release an idea is thought of to mimic this/in a way make it possible.

**Source:** My Decision

### FR-JOU-01 — Add Journal Entry

**Priority:** Must
**Requirement:** An individual with stress shall be able to add in a journal entry that describes their stress and stressors when a journal entry box is clicked.
**Rationale:** This exists because it is the second main component necessary for the AI Analysis and gives a space for individuals to let out all the thoughts that are their minds. Stella has a lot of thoughts that go through her brain so writing down them can help, even if she wanted to show her therapist. This could also replace her needing to talk to other people if she isn't able to do so.
**Acceptance criteria:**
- Given a journal entry box, when typed in and submitted, then it should be saved and visible for viewing within fifteen seconds.
- Given the app crashes, when a stressed individual is writing in a journal, then the app should prompt that the data entered in recently might not have been saved within ten seconds of the stressed individual opening the app.
- Given a journal fails to save, when the stressed individual submits the journal, then the system should provide a response within five seconds that the journal entries were not properly saved and to try submitting again in five seconds.
- Given a stressed individual submits a blank journal entry, when submitted, then the system should not create anything, no blank journal entries or provide a toast stating you can't submit a blank entry.

**Source:** Elicitation Interview with Stella, 2026-09-09

### FR-JOU-02 — Edit Journal Entry

**Priority:** Should
**Requirement:** An individual with stress shall be able to edit a journal entry they did that day when it is clicked to include more about what is stressing them or to add in things that are stressing them.
**Rationale:** This exists because it is the second part to the second main component necessary for the AI Analysis and gives a space for individuals to edit their thoughts if they make a mistake. Again Stella has a lot of thoughts that go through her brain so when writing them down, having the option to edit them if it is mistakenly entered can be helpful because distress can cause errors. 
**Acceptance criteria:**
- Given a journal entry box, when clicked in to edit, then the edit should be saved and visible for viewing again when done within ten seconds.
- Given the app crashes, when a stressed individual is editing the journal entry, then the app should not erase the previous response but prompt that the edit might not have been saved within five seconds of the stressed individual opening the app.
- Given a journal fails to save the edited response, when the stressed individual submits the journal, then the system should provide a response within five seconds that the journal entries edited were not properly saved and to try submitting again in five seconds.

**Source:** Elicitation Interview with Stella, 2026-09-09

### FR-JOU-03 — Text Length Counting & Warning

**Priority:** Could
**Requirement:** An individual with stress shall be able to see the word count when writing a journal entry about their stress.
**Rationale:** This exists to ensure that the database can handle not only processing how much the stressed individual writes but ensures the text box isn't taken advantage of. It is my decision to ensure app runs smoothly without lag and for security against those with bad intentions.
**Acceptance criteria:**
- Given a journal entry is entered into, when the stressed individual is typing, then the app should display the word count.
- Given the text gets to 10,000 words, when the stressed individual is typing, then the app should, prevent them from writing more and either prompt them to make a new journal entry if they have more they need to get off their chest, or turn the text a different color within seven seconds.
- Given the word count fails to count properly, when a stressed individual is typing, it then should fallback to counting each character instead within ten seconds of it failing.

**Source:** My Decision

### FR-JOU-04 — Auto Draft Journal Entry

**Priority:** Won't (this release)
**Requirement:** An individual with stress shall be able to click off or click the X when adding in a journal entry and the journal entry should still ask if you want to save or ask if you want to save this as a draft when selecting submit isn't clicked.
**Rationale:** This exists because it allows individuals to stop journaling for a second and go into a destressing activity, look through their other journals if it is needed, or do something else. This is my decision as it can relieve the stress of losing all writing progress if an individual wants to do something else. Though this is still recorded to show that it wasn't forgotten so if for a later release an idea is thought of to mimic this/in a way make it possible.

**Source:** My Decision

### FR-JOU-05 — Monitored Communication

**Priority:** Won't (this release)
**Requirement:** An individual with stress shall be able to click on the option to have an emergency or casual conversation with a specialized stress/anxiety psychologist about their stressors when in the journal page so when they write it can go directly to the specialist in real time for when they need help or just need to relay their thoughts stressing them out to someone they trust
**Rationale:** This exists because many individuals with chronic stress can sometimes have a hard time speaking or properly expressing how they feel in words and if this individual needs emergency help fast then there can be people there writing to them to ensure they don't do anything harmful. Stella mentioned multiple times that she likes to communicate to people she trusts when stressed and she recommends getting help when you need it so I believe that having this as an option can be helpful to those who like communicating with others or need a little extra help. Though this is still recorded to show that it wasn't forgotten so if for a later release an idea is thought of to mimic this/in a way make it possible.

**Source:**  Elicitation Interview with Stella, 2026-09-09 & my decision

### FR-ACT-01 — Destressing aid

**Priority:** Must
**Requirement:** An individual with stress shall be able to click/play a destressing activity when they choose one out of one of the sections choices.
**Rationale:** This exists because it is the main area that can help take an individual's mind away from stress, lower it, and it shows the available destressing aids to someone struggling. Stella does some breathing exercises to calm her nervous system along with other stress managing techniques, such as walks, talking, etc., having some available to her would take some stress away from her when she panics.
**Acceptance criteria:**
- Given a destressing activity is chosen, when the stressed individual goes through the exercise, then they should see the activity running again within ten seconds.
- Given a destressing activity does not start up, when the stressed individual clicks on it, then a toast should pop up within fifteen seconds explaining why it failed to start.
- Given a destressing activity is left when started, when the stressed individual leaves the app without finishing, then the system should resume the state left off within five seconds of the stressed individual reentering the app.


**Source:** Elicitation Interview with Stella, 2026-09-09

### FR-ACT-02 — Section Options Expansion

**Priority:** Won't (this release)
**Requirement:** An individual with stress shall be able to click on more than 5 destressing activity sections that have a greater range of destressing activity options that could better help their stress.
**Rationale:** This exists because it will allow more individuals to have even more sections and options in those sections to choose from that will be even more aligned with how they ground themselves and manage their stress. This was my decision as having more than five sections in the future will provide even more aid to individuals. Though this is still recorded to show that it wasn't forgotten so if for a later release an idea is thought of to mimic this/in a way make it possible.

**Source:** My Decision

### FR-ACT-03 — Random Activity Chooser

**Priority:** Should
**Requirement:** An individual with stress shall be able to click an option to get a random automatic destressing activity option when the pop up appears and that directs the individual to the activity that was randomly chosen when clicked on.
**Rationale:** This exists because it will allow the individual to choose to get a quick fully random option if they don't want to get a suggestion based on their journal entries and check ins from the AI Analysis page. This was my decision as it gives quicker options, making individuals' experience on the app nicer.
**Acceptance criteria:**
- Given the destressing activity page is chosen, when an individual clicks on the option to get a random destressing activity, then they should see a pop up within ten seconds with the random activities and they should be able to select an option whether to go to activity directly.
- Given the pop up fails to appear within fifteen seconds, when the stressed individual clicks on the option to get a random destressing activity, then a message should appear stating the action failed, try again within fifteen seconds.

**Source:** My Decision

### FR-AIA-01 — Prompt AI Analysis for Stress Explanation

**Priority:** Must
**Requirement:** An individual with stress shall be able to click from a predetermined prompt to ask AI for a suggestion based explanation of their stress when they open the AI Analysis page.
**Rationale:** This exists because it allows an individual to get a more personalized understanding of their overview results and journal entries. Stella has times when it can take her hours to calm down so a quick explanation when completely lost can help quicken the time it takes to recover from stress.
**Acceptance criteria:**
- Given when the AI Analysis page loads, when the stressed individual clicks on one of the predetermined prompts, then the AI should prompt back with a suggestion based explanation within twenty five seconds.
- Given the AI model fails or is down, when the stressed individuals is prompting/wants to prompt it, then a toast must pop up within thirty seconds stating the AI model is currently failing or down but here is a altered experience that may not be as accurate, which is the fallback of searching the journal for frequent words written.
- Given an individual tries to communicate with the AI model without using the provided predetermined prompts, when a stressed individual prompts it differently, then the AI model must reject the different prompt and state to use the predetermined prompts above.
- Given the AI model doesn't have enough information yet from the check ins and journal entries, when the stressed individual prompts the AI model, then state within ten seconds that more check in question responses and journal entries are needed before the AI model can provide a useful stress explanation.

**Source:** Elicitation Interview with Stella, 2026-09-09

### FR-AIA-02 — Predicting stress

**Priority:** Won't (this release)
**Requirement:** An individual with stress shall be able to predict when they will be stressed before it happens.
**Rationale:** Mentioned once by Stella but it is generally not possible to consistently predict when someone gets stressed when lifestyle variables are not constantly recorded. Though this is still recorded to show that it wasn't forgotten so if for a later release an idea is thought of to mimic this/in a way make it possible.

**Source:** Interview with Stella, 2026-09-02

### FR-AIA-03 — Stress Vs Anxiety Differentiating

**Priority:** Won't (this release)
**Requirement:** An individual with stress shall be able to see whether the things they are feeling are either stress or anxiety when the AI is prompted with the predetermined prompt of are my feelings stress or anxiety, basing the results on the check in and journal entry.
**Rationale:** This exists because it can be hard to differentiate what is stress, anxiety, or both. Stella mentioned that there is a difference between stress and anxiety. Though this line can be really blurred so it would be harder to confidently state if an individual is feeling one or the other, because sometimes outside events that cause the stress aren't recognized, even if one happened as outside events define stress. While anxiety comes from the mind so there isn't a true outside event that triggers it. Though this is still recorded to show that it wasn't forgotten so if for a later release an idea is thought of to mimic this/in a way make it possible.

**Source:** Elicitation Interview with Stella, 2026-09-09

### FR-AIA-04 — Prompt AI Analysis for Destressing Aid

**Priority:** Must
**Requirement:** An individual with stress shall be able to click from a predetermined prompt to ask AI for a suggestion for destressing aid when they open the AI Analysis page.
**Rationale:** This exists because it allows an individual to get a more personalized destressing aid based on their check ins and journal entries. Stella has times when it can take her hours to calm down so a quick aid suggestion when completely lost can help quicken the time it takes to recover from stress.
**Acceptance criteria:**
- Given when the AI Analysis page loads, when the stressed individual clicks on one of the predetermined prompts, then the AI should prompt back with a suggestion for a stress aid within twenty five seconds.
- Given the AI model fails or is down, when the stressed individuals is prompting/wants to prompt it, then a toast must pop up within thirty seconds stating the AI model is currently failing or down but here is a altered experience that may not be as accurate, which is the fallback of searching the journal for frequent words written.
- Given an individual tries to communicate with the AI model without using the provided predetermined prompts, when a stressed individual prompts it differently, then the AI model must reject the different prompt and state to use the predetermined prompts above.
- Given the AI model doesn't have enough information yet from the check ins and journal entries, when the stressed individual prompts the AI model, then state within ten seconds that more check in question responses and journal entries are needed before the AI model can provide a useful destressing aid.

**Source:** Elicitation Interview with Stella, 2026-09-09

## 6. Non-Functional Requirements

| Data element | Why you need it | Where it lives | How long you keep it | How a user gets rid of it |
|---|---|---|---|---|
| Check in responses | To help stressed individuals to take a minute to calm and think about their stress, to show the overview of an individual stress throughout time, and it is used in the AI's analysis to provide some insight of current condition | It lives locally on the stressed individuals phone | Until they delete the app | There is no way to delete a check in currently unless a delete function is implemented |
| Journal Entries | To help stressed individuals express and reflected on their stress and feelings and it is used in the AI's analysis to provide more context | It lives locally on the stressed individuals phone | Until they delete the app | If they clear out an entry through editted unless a delete function is implemented |
| Check in response and Journal Entries sent to the AI, Gemini | Need the responses and entries to create a suggestion based explanation and to provide an destressing suggestion | It lives in Gemini as that is were the information is being sent, it stores it if you don't pay for a premium version | N/A | N/A |
| Google Gemini AI API Key | This is necessary in order to connect the stress management app to Gemini | Supabase Edge Function | N/A | N/A |

- The two rows that I do not know the answer to are the 'Check in response and Journal Entries sent to the AI, Gemini' & 'Gemini AI API Key' rows in the columns 'How long you key it' and 'How a user gets rid of it'. The primary source I would read to find out is on Google Gemini's terms page for the 'Check in response and Journal Entries sent to the AI, Gemini' row and the Supabase terms page for the 'Gemini AI API Key' row.

### 6.1 Performance

| ID | Requirement (metric · threshold · condition) | Priority | How it is measured |
|---|---|---|---|
| NFR-PERF-01 | Stressed individuals shall be able to get a response from the AI Analysis in a p95 under 25 seconds when there is at least 1 check in and journal entry recorded on an iPhone with throttled "Fast 3G" connection in Expo Go. | Must | Measured with 20 prompts to the AI Analysis and recording the p95 result in `docs/measurements.md` expecting that it is under 25. |

### 6.2 Reliability & Availability

| ID | Requirement | Priority | How it is measured |
|---|---|---|---|
| NFR-REL-01 | Stressed individuals shall be able to run the app 9 out of 10 times when entering it with 0 unhandled exceptions and errors. | Must | Measured with 10 opening and closings of the app and the times it succeeded vs failed, which expects 9 successes out of the 10. |
| NFR-AVA-01 | When Gemini is unavailable, the app shall display the predetermined fallback response within 30 seconds for 10 out of 10 simulated failures. | Must | Measured by testing with a simulated timeout, an API error, and an invalid response, then recording whether the fallback appears as expected in 10 simulated failures. |

### 6.3 Security

| ID | Requirement | Priority | How it is measured |
|---|---|---|---|
| NFR-SEC-01 | Stressed individuals data shall be breached 0 times when the repository has 0 AI API key's in any commit. | Must | Measured by scanning over the full history, going over every commit made to GitHub, and checking that the .env is in the gitignore, and expecting that there are 0 secrets found when this is done. |
| NFR-SEC-02 | The app shall expose 0 technical error details, API keys, database errors, or provider error details in 10 simulated failure cases, instead it will proved general error messages. | Must | Measured by simulating 10 save, API, and database failures, then expecting that 0 are recorded with contain technical error details, API keys, or database information. |

### 6.4 Privacy & Data Handling

| ID | Requirement | Priority | How it is measured |
|---|---|---|---|
| NFR-PRIV-01 | Stressed individuals check in responses and journal entries shall be sent to Gemini AI 0 times unless the stressed individual prompts for an AI Analysis request | Must | Measured by checking the AI request page after doing 7 check ins and 7 journal entries, expecting that the responses and entries were sent 0 times to Gemini AI. |
| NFR-PRIV-02 | Each AI request shall send only the check-in responses, journal entry, and the predetermined prompt when prompted for that analysis. It shall send 0 unrelated personal information or device information. | Must | Measured by sending 10 test requests with sample data, checking each request to make sure it includes 0 unrelated information. |

### 6.5 Accessibility

| ID | Requirement | Priority | How it is measured |
|---|---|---|---|
| NFR-ACC-01 | Stressed individuals shall be able to go through each 5 main features in the app with 0 problems as each will have easy readable fonts and text size, and contrasts in colors | Must | Measured with 5 individuals that go through the app with the grayscale setting on first before opening the stress management app, then each of the 5 individuals will go through the app, and expecting that 4 out the 5 individuals have 0 problems going through the app reading and looking through features will the mode on |
| NFR-ACC-02 | The app shall show success, failure, and loading states and message without relying on color alone in 5 out of the 5 tests. | Must | Measured by turning on the grayscale mode first before opening the stress management app, then checking the 5 main features, expecting the recording shows that 0 main feature rely on color alone when a success, failure, or loadinig state appears, and recording that all 5 main feature pass the 5 tests |

### 6.6 Usability · 6.7 Maintainability · 6.8 Portability

| ID | Requirement | Priority | How it is measured |
|---|---|---|---|
| NFR-USE-01 | Stressed individuals first time on the app 4 out of 5 of them shall be able to complete 1 check in, journal entry, and AI Anylsis prompt request when they go through the app, without help. | Should | Measured with 5 first time stressed individuals app usage completion expecting 4 passing out of 5 |
| NFR-USE-02 | Stressed individuals first time on the app 4 out of 5 of them shall be able to correctly identify whether a journal entry or check-in was saved after both a successful and failed save attempt. | Should | Measured with 5 users in both scenarios with 0 assistance and recording their answers.|
| NFR-MNT-01 | New stressed individuals shall be able to use only the README when creating a clean clone of the repository to reach a running app in under 10 minutes with 0 errors. | Must | Measured through testing this on a clean computer and that the app works on an iPhone in Expo Go, recording how long it took which expects under 10 mintues and expecting 0 errors. |
| NFR-PORT-01 | Stressed individuals shall be able to run the app and complete the a least 1 check in, journal entry, and AI Anaylsis when on 2 different operting systems, both iOS and Android | Should | Measured through testing and recording that each feature works on an iPhone and Android expecting that all 5 main features have 0 errors. |
| NFR-PORT-02 | The app shall work when in portrait mode and cut of 0 main buttons or controls. | Should | Measured by testing every main screen in portrait mode, expecting that all 5 main feautre work, recording any controls that are cut off or cannot be reached, though expecting 0 fail to work. |
| NFR-PORT-03 | The app shall work when in landscape mode and cut of 0 main buttons or controls. | Could | Measured by testing every main screen in landscape mode, expecting that all 5 main feautre work, recording any controls that are cut off or cannot be reached, though expecting 0 fail to appear or work properly. |

## 7. Out of Scope (the Won't-Have List)

Things a reasonable reader might expect and will not get in this release, each
with one line of reasoning. A short list here means you have not thought hard enough.

| Not building | Why not | Revisit when |
|---|---|---|
| A Special Therapist View | A special view just for therapists that allows for selecting of journals and check ins to show a therapist if the stressed individual is not comfortable with their therapist yet; costs an estimated 15 hours the budget does not have | After a v1.0 release exists |
| Personal To Do Lists | No evidence any one interviewed would want it because there is uncertainty in its helpfulness as it may actually make an individual more stressed | I would revisit after the capstone completes where the first verison is out if I find after more research that individuals benefit from other systems using personal to do lists |
| User Accounts | This would require a lot of extra work from ensuring privacy to security and this isn't currently imperative to this app; costs an estimated 15 hours the budget does not have | After a v1.0 release exists |
| Notifications/Reminders | No evidence any one interviewed would want it because there is uncertainty in its helpfulness as it may actually make an individual more stressed | I would revisit after the capstone completes where the first verison is out if I find after more research that individuals benefit from other systems using notifications/reminders |
| Pulling sleep data from a watch | This isn't super necessary for this project unless individuals start find it useful or want more data reviewed for the effects on stress | I would revisit after the capstone completes where the first verison is out if I find after more research that individuals benefit from other systems pulling sleep data from their watches |

I would need to revisit it after the capstone in the future when I have a lot of extra time, it would probably be one of the first things I'd revisit

## 8. Open Questions

| # | Question | Who can answer it | Needed by |
|---|---|---|---|
| Each of the 20 questions could be answered |

## 9. Document Change Log

| Date | Version | Change | Reason |
|---|---|---|---|
| 2026-09-10 | 1.0 | Initial specification | Milestone 3 |
| 2026-09-12 | 1.0 | Edited 10 sentences that could be inferred that two different programs could satisfy it | Ambiguity pass after external read |
| 2026-09-19 | 1.1 | non-functional requirements, constraints, assumptions, dependencies, and obligations added | Milestone 4 |

## 10. Constraints

| ID | Constraint | Where it comes from | What it rules out |
|---|---|---|---|
| CON-01 | The system must be completed in 16 weeks and be demostratable by Week 16 | course deadlines | Extra features that cause the main features to not be completed in time |
| CON-02 | The app must be able run on Expo Go on an iOS phone | app requirements | The main features can not run in Expo Go on iOS such as the AI Anaylsis |
| CON-03 | I can only generally work 30 hours per week on the project if time is managed perfectly | my schedule | Extra features that would exceed time able to work on the project  |
| CON-04 | The project must follow the course rubric and criteria | course rubric | The completed app doesn't follow the rubric |

## 11. Assumptions

| ID | Assumption | Owner | Verify by | If it is false |
|---|---|---|---|---|
| ASM-01 | The Gemini AI API will still have a free tier in December or the paid tier will still not use the content to improve products | me | Week 5 | Try using a different AI API |
| ASM-02 | Gemini AI will be able to response with proper and helpful suggestion based explanations based on the check ins and journal | me | Week 9 | Add in extra instructions, add in back up prewritten suggestions to the AI, or use the keyword fallback |
| ASM-03 | The Supabase Edge Function will be able to safely store and call the Gemini AI API key | me | Week 6 | Use a server |
| ASM-04 | Individuals will find the destressing activity suggestion range to pick from and use to be useful | me and stressed individuals testing it | Week 11 | Contuinally check with stressed individuals that the activities are helpful, in not then add or change the activity types |

## 12. Dependencies 

| ID | Dependency | Version / plan pinned | Failure mode | Fallback |
|---|---|---|---|---|
| DEP-01 | Gemini AI API | Gemini API - Gemini 3.6 Flash, free tier checked Week 5 |  The API is down and unavailable for an extended period of time when needed | An error message is shown saying it failed and will instead use the fallback of a word based search over the journal entries to provide a prewritten response based on the key words found and provide a random activity suggestion |
| DEP-02 | Expo Go | Expo Go - SDK 57, checked in Week 5 | The app fails randomly, cannot be started, or can not reach Gemini AI  | Test and use an iOS simulator beforehand |
| DEP-03 | Supabase Edge Function | Supabase free plan, checked in Week 5 | The key can not be retrieved or it can not call for the Gemini AI API key | It falls back to the fallback for the general AI Anaylsis were an error message is shown saying it failed and will instead use a word based search to provide prewritten suggestion based explanations and activity suggestions |

## 13. Obligations  <license, third-party terms, data rights>

| Obligation | Primary source (URL) | Date checked | What it requires of me |
|---|---|---|---|
| Gemini API terms for use and data | https://ai.google.dev/gemini-api/terms | 2026-09-18 | It requires that I follow the Prohibited Use Policy and don't use the AI API to provide any medical. I must also follow the laws when using generated content. The unpaid AI API responses generated can be used to improve Google's technology, though this isn't true for the paid AI API. At the end it states I am responsible for the actions and tasks performed. |
| Supabase Terms of Service | https://github.com/supabase/supabase/blob/master/LICENSE & https://supabase.com/terms | 2026-09-18 | It requires that I understand how Supabase stores, protects, deletes, and backs up project data, and that I also must protect user data. |
| Expo Terms of Service | https://github.com/expo/expo/blob/main/LICENSE & https://expo.dev/terms | 2026-09-18 | It requires that I must properly keep user content secure, follow its usage rules, accept responsibility for my app and data, and follow Apple's app store rules when publishing my app. |
