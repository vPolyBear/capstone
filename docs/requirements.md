# Software Requirements Specification — Stress Manager

**Author:** Katherine Spencer  **Version:** 1.0  **Date:** 2026-09-08
**Status:** Draft | In review | Baselined

---

## 1. Purpose and Scope

This system is for individuals who deal with stress, such as college students as school is a time of learning not only information but about yourself. Many students struggle with dealing with what life throws at them, from school, work, family issues, self image, and so on. Stress is very apparent in many individuals lives. Though some struggle more than others, therefore, this system will serve anyone who needs a little extra help. This system will remove the problem of needing to download multiple apps to write, understand, and release stess and it will remove the struggle of trying to figure out the root of a stressor and mend it, without aid. 

What is out of the boundaries for this release is a communication page, notifications and reminders, more than 5 sections of destressing activities, user accounts, predicting a users stress, a special therapist view, tracking and pulling sleep data from a watch (sleep is only tracked if the user answers hours slept question on the check in page), personal To Do lists, and linking of school related technology such as the Canvas ToDos are all out of bounds.

## 1.5 Feature areas and the identifier scheme

AREA CODE   AREA NAME              ONE SENTENCE OF SCOPE
QUES        Questions              Questions about current stress
OVER        Overview               Results in graphs of week/months stressors
JOU         Journal                Place to express feelings
ACT         Activity               Things to do to reduce stress
AIA         AI Anaylsis            User based explanation and suggestion for stress

## 2. Stakeholders and Personas

| Persona | Who they are | What they need from the system | Evidence they exist |
|---|---|---|---|
| Stella S., 20, College Student | She is an easily stressed student that has a hard time dealing with both deadlines and lifes challenges | She needs a place to learn how to properly deal with her emotions and stressors, so instead of wishing to predict her stress she can learn to manage it | Interview 2026-09-02 & Elicitation Interview 2026-09-09 |
| The next maintainer | They will be inheriting this repository when the course ends | They need to be able to understand what every feature was intended for soley from what is documented | They are a course requirement and present in the Chapter 13 clean machine test |

## 3. Definitions

Define every term your requirements use in a project-specific sense. If a reader could interpret a word two ways, it belongs here.

| Term | Definition in this document |
| Stress | This comes from a clear outside event, when a mind focuses on the present events, and it is typically temporary (this is considered acute stress) as it ends when the outside event ends. Though chronic stress is stress that stays for a long time from weeks to years and continues because an individual is "stuck" in the outside event |
| Anxiety | This does not come from a clear outside event but comes from an individuals mind, when they focus on the future events, and it isn't temporary but persists. Similar to chronic stress it can also stay for weeks to years continuing until the internal "threat" is gone. |
| Grounding | A strategy done by someone to help them cope with their feelings and emotions, pulling the individual away from the overwhelming feelings or panic |
| Sections of destressing activities? |  |

## 4. Assumptions and Dependencies

- **Assumption:** <something you are taking as true without proof> — *If false:* <consequence>
- **Dependency:** <an external service, dataset, device, or person you rely on> — *If unavailable:* <fallback>

## 5. Functional Requirements

### FR-QUES-01 — Add check in response

**Priority:** Must
**Requirement:** An individual with stress shall be able to complete a check in question when they open the app.
**Rationale:** This exists because it is one of the main features used to understand and break down why an individual has stress. Stella struggled with centering herself so going through check ins can ground her when nothing anyone can do for her helps.
**Acceptance criteria:**
- Given check in question on the screen, when the individual with stress answers a question, after they submit, then they should see the Overview of stress page update the graph with the added answers.
- Given a missing response to a check in question, when the user submits the check in response, then the system must reject the submission and state the missing field(s).

**Source:** Elicitation Interview with Stella, 2026-09-09

### FR-QUES-02 — Edit check in response

**Priority:** Should
**Requirement:** An individual with stress shall be able to edit a check in question they did that day when clicking an edit button.
**Rationale:** This exists because it is the second part to one of the main features and allows individuals to change a response if they make a mistake. Again since Stella struggled with centering herself going through check ins can ground her when nothing anyone can do for her helps and mistaken can happen so having the ability to edit them is helpful when trying to ground yourself.
**Acceptance criteria:**
- Given check in question, when the individual edits a previous response, after they the edit, then they should see the Overview of stress page update the graph with the editted answers.
- Given a response is removed when editting a check in response, when the user submits the edits, then the system must reject the submission and state the missing field(s).

**Source:** Elicitation Interview with Stella, 2026-09-09 & my decision

### FR-OVER-01 — Stress weekly/monthly view

**Priority:** Must
**Requirement:** An individual with stress shall be able to see the results of the check ins in weekly/monthly views when they open up the page.
**Rationale:** This exists because without it individuals would not really get much from the questions they answered during the check in. Stella saw from the past with stress that when she was able to get over the stress on her own it made her proud. This page allows individuals see a progression.
**Acceptance criteria:**
- Given a graph with the check in question results when switched to a weekly or montlhy view, then users should see either the weeks check ins overview or the months.
- Given the graphs don't appear to have inform in them yet, when a user opens the paper, then state that check in question answers are needed before results can appear.

**Source:** Elicitation Interview with Stella, 2026-09-09 & observation

### FR-OVER-02 — Extra goals

**Priority:** Should
**Requirement:** A individual with stress shall be able to choose goals for the week and month after they enter in the overview page.
**Rationale:** This exits because it is a should feature that will be made only if there is room available for the time it takes to create it. Stella uses various methods that were given to her to deal with stress, having goals is another method that an individual can use to have something to aim for that they can be proud of completing.
**Acceptance criteria:**
- Given that a goal is choosen, when user clicks on one or writes one, then it should appear as a goal above the overview page so they can check in on this goal when reviewing the overview page.
- Given the goal fails when clicked or fails to be sent to the database, when the user clicks/submits the goal, then a error message should appear stating that the goal was not processed please try again.

**Source:** Elicitation Interview with Stella, 2026-09-09 & my decision

### FR-OVER-03 — Graph Click in view

**Priority:** Won't (this release)
**Requirement:** An individual with stress shall be able to see the full results of an individual check in when they click a specific point on any of the graphs.
**Rationale:** This exists because it allows individuals to see where the specific full response for where the individual answer to the check in question came from. This is my decision because it would be too complex and require way over the time that I have determined for this task roughly 5 to 7 extra hours.

**Source:** My Decision

### FR-JOU-01 — Add Journal Entry

**Priority:** Must
**Requirement:** An individual with stress shall be able to add in a journal entry when a journal entry box is click.
**Rationale:** This exists because it is the second main component necessary for the AI Analysis and gives a space for individuals to let out all the thoughts that are their minds. Stella has a lot of thoughts that goes through her brain so writing down them can help, even if she wanted to show her therapist. This could also replace her needing to talk to other people if she isn't able do so.
**Acceptance criteria:**
- Given a journal entry box, when typed in and entered, then it should be saved and visiable for viewing when done.
- Given the app crashes, when a user is writing in a journal, then the app should prompt that the data entered in recently might not have been saved.

**Source:** Elicitation Interview with Stella, 2026-09-09

### FR-JOU-02 — Edit Journal Entry

**Priority:** Should
**Requirement:** An individual with stress shall be able to edit a journal entry they did that day when it is clicked.
**Rationale:** This exists because it is the second part to the second main component necessary for the AI Analysis and gives a space for individuals to edit their thoughts if they make a mistake. Again Stella has a lot of thoughts that goes through her brain so when writing them down, having the option to edit them if it is mistakenly entered can be helpful because distress can cause errors.
**Acceptance criteria:**
- Given a journal entry box, when clicked in to edit, then the edit should be saved and visiable for viewing again when done.
- Given the app crashes, when a user is editting the journal entry, then the app should not erase the previous response but prompt that the edit might not have been saved.

**Source:** Elicitation Interview with Stella, 2026-09-09 & observation

### FR-JOU-03 — Text Length Counting & Warning

**Priority:** Could
**Requirement:** An individual with stress shall be able to see the word count when writing in a journal entries.
**Rationale:** This exists to ensure that the database can handle not only processing how much the user writes but ensures the text box isn't taken advantage of. It is my decision to ensure app run smoothly without lag and for security against those with bad intentions.
**Acceptance criteria:**
- Given the text gets to 10,000 words, when the user is typing, then then the app should, prevent the user from writing more and either prompt the user to make a new journal entry if they have more they need to get off their chest, or turn the text a different color.
- Given the word count fails to count proprely, when a user is typing, it then should fallback to counting each character instead.

**Source:** My Decision

### FR-ACT-01 — Destressing aid

**Priority:** Must
**Requirement:** An individual with stress shall be able to click/play a destressing activity when they choose one out of one of the sections choices.
**Rationale:** This exists because it is the main area that can help take an individuals mind away from stress, lower it, and it shows the available destressing aids to someone struggling. Stella does some breathing exercises to calm her nervous system along with other stress managing techinqiues, such as walks, talking, etc., having some available to her would take some stress away from her when she panics.
**Acceptance criteria:**
- Given a destressing activity is choosen, when goes through the exercise, then they should see the activity progressing properly.
- Given an activity does not start up, when the user clicks on it, then a toast should pop up explaining why it failed to start.

**Source:** Elicitation Interview with Stella, 2026-09-09

### FR-ACT-02 — Section Options Expansion

**Priority:** Won't (this release)
**Requirement:** An individual with stress shall be able to click on more than 5 destressing activity sections that have a greater range of destressing activity options.
**Rationale:** This exists because it will allow more individuals to have even more sections and options in those sections to choose from that will be even more aligned with how they ground themselves and manage their stress. This was my decision as having more than 5 sections in the future will provide even more aid to individuals.

**Source:** Elicitation Interview with Stella, 2026-09-09

### FR-AIA-01 — AI Anaylsis

**Priority:** Must
**Requirement:** An individual with stress shall be able to click from a predetermined prompt to ask AI for a suggestion based explanation of their stress and also suggestions for destressing aid when they open the AI Analysis page.
**Rationale:** This exists because it allows an individual to get a more personalized understanding of their overview results and journal entries. Stella has times when it can take her hours to calm down so a quick aid suggestion or explanation when completely lost can help quicken the time it takes to recover from stress.
**Acceptance criteria:**
- Given when the AI Analysis page loads, when the user clicks on one of the predetermined prompts, then the AI should prompt back with a suggestion based explanation and/or suggestions for a stress aid.
- Given the AI model fails or is down, when the users wants to prompt it, then a toast must pop up saying the AI model is currently down but here is a altered experience that may not be as accurate, which is the fallback of searching the journal for frequent words written.

**Source:** Elicitation Interview with Stella, 2026-09-09, observation

### FR-FR-AIA-02 — Predicting stress

**Priority:** Won't (this release)
**Requirement:** An individual with stress shall be able to predict when they will be stress before it happens.
**Rationale:** Mentioned once by Stella but it is generally not possible to consistently predict when someone gets stressed when lifestyle variables are not constantly recorded. Though this is still recorded to show that it wasn't forgotten so if for a later release an idea is thought of to mimic this/in a way make it possible.

**Source:** Interview with Stella, 2026-09-02

### FR-AIA-03 — Stress Vs Anxiety Differentiating

**Priority:** Won't (this release)
**Requirement:** An individual with stress shall be able to see whether the things they are feeling is either stress or anxiety when the AI is prompted with the predetermined prompt of is my feelings stress or anxiety, basing the results on the check in and journal entry.
**Rationale:** This exists because it can be hard to differentiate what is stress, anxiety, or both. Stella mentioned that there is a difference between stress and anxiety. Though this line can be really blurred so it would be harder to confidently state if an individual is feeling one or the other, because sometimes outside events that cause the stress aren't recoginzed, even if one happened as outside events define stress. While anxiety comes from the mind so there isn't a true outside event that triggers it. Though this is still recorded to show that it wasn't forgotten so if for a later release an idea is thought of to mimic this/in a way make it possible.

**Source:** Elicitation Interview with Stella, 2026-09-09

## 6. Non-Functional Requirements

Placeholder for Week 4. Do not write vague quality words here now; write nothing
and fill it in when you can make each one measurable.

## 7. Out of Scope (the Won't-Have List)

Things a reasonable reader might expect and will not get in this release, each
with one line of reasoning. A short list here means you have not thought hard enough.

| Not building | Why not | Revisit when |
|---|---|---|

## 8. Open Questions

| # | Question | Who can answer it | Needed by |
|---|---|---|---|
| Each of the 20 question could be answered |

## 9. Document Change Log

| Date | Version | Change | Reason |
|---|---|---|---|
| 2026-09-10 | 1.0 | Initial specification | Milestone 3 |