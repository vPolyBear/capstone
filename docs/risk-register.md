# Risk Register — Template and Worked Rows

## Scales (use these exact ones so your numbers mean something week to week)

**Likelihood** — 1 rare · 2 unlikely · 3 even odds · 4 likely · 5 near certain, before you do anything about it.

**Impact** — score in *hours you would lose*, not in feelings:
1 = under 2 h · 2 = 2–5 h · 3 = 5–12 h · 4 = 12–25 h · 5 = over 25 h, or the project cannot ship.

**Exposure** = Likelihood × Impact. Order the register by exposure, descending. Work the top five.

**Response** — one of: **avoid** (change the plan so it cannot happen) · **mitigate** (reduce likelihood or
impact) · **transfer** (make it somebody else's problem — a managed service, a library) · **accept**
(name it, write the contingency, move on).

## The row format

| Field | What goes in it |
|---|---|
| ID | `R-01`, stable forever, never reused |
| Risk | **cause → uncertain event → consequence**, in one sentence |
| Category | technical · dependency · scope · schedule/personal · data/legal |
| L / I / E | likelihood, impact, exposure |
| Trigger | the *observable* thing that says it is happening — a number, a date, a log line |
| Owner | you, by name; a risk with no owner is a wish |
| Response | avoid / mitigate / transfer / accept + the concrete action, with a due week |
| Contingency | what you do if it happens anyway |
| Status | open · retired · **became an issue on <date>** |

---

## Worked rows 

**R-01** — Because there are many connecting parts and components needed to create the AI Analysis (FR-AIA-01, FR-AIA-04) the individual components may work independently but still fail when combined which would then cause the AI Analysis to also fail.
· dependency · L 4 · I 5 · **E 20**
· **Trigger:** I observe that Gemini API or Supabase returning a `500` error response in the logs (T-5.2) *or* I observe that there are no results with responses returned on the AI Analysis page. 
· **Owner:** Katherine Spencer. · **Response:** mitigate — finish the Analysis fallback (T-5.6) first the work on the AI Analysis (FR-AIA-01, FR-AIA-04) right away afterwards.
· **Contingency:** use the Analysis fallback if it can not be connected fully.
· **Status:** open. 

**R-02** — Because I have two courses with projects and assignment due at incredibly random times, where half assignments are either not scheduled, expected at a certain time undisclosed, or assignments aren't present right away, I never know what homework will suddenly pop up which may drop my available hours that week by 5 pushing that weeks work package past its gate.
· schedule/personal · L 4 · I 3 · **E 12**
· **Trigger:** the week the homework appeared shows 5 fewer hour logged.
· **Owner:** Katheine Spencer. · **Response:** mitigate — move 5 hours of WP-3 forward into Week 11, where the plan has slack, and book the spacer weeks hours on the calendar now.
· **Contingency:** spend project buffer, and record the draw in `docs/plan.md`.
· **Status:** open.

**R-03** — Because I keep getting sick already my immune system is lower than it should be so I may get sick again and if it gets worse than what I can normally manage then I may lose 4 hours in the week I get sick pushing the weeks work package past its gate.
· schedule/personal · L 4 · I 3 · **E 12**
· **Trigger:** the week the sickness appeared shows 4 fewer hour logged.
· **Owner:** Katherine Spencer. · **Response:** mitigate — move 4 hours of WP-2 forward into Week 10, where the plan has a bit of slack, and book the  spacer weeks hours on the calendar now.
· **Contingency:** spend project buffer, and record the draw in `docs/plan.md`.
· **Status:** open.

**R-04** — Because I am new to calling the Gemini API through Supabase Edge Functions (T-5.2) in an Expo/ React Native app, I may run into technical problems that I have never gone through before because of it and this novelty may increase the hours required for completing the app by 6 hours which would push a work package past its gate.
· technical/novelty · L 4 · I 3 · **E 12**
· **Trigger:** I can't send or get the response from the Gemini API based on the data provided *or* hours required to complete the previous week push over to the next week increasing it by 6 hours 
· **Owner:** Katherine Spencer. · **Response:** mitigate — continually test that the Supabase Edge function can send requests to the Gemini AI API and receive a response from it to ensure that no technical errors appear in the code and move 6 hours of WP-5 forward into Week 9, and book the spacer weeks hours on the calendar now..
· **Contingency:** fix and work through the errors, testing and understanding them to ensure that they don't happen again, and implement the Analysis fallback (T-5.6) right away so the Analysis is functional no matter what. Hours recorded/shown in `docs/hours-log.csv`.
· **Status:** open. Reviewed weekly.

**R-05** — Because there is limited time to complete this app and a lot of testing needed there may be important privacy, error-handling, or performance tests missed which may cause the app to fail in some areas.
· schedule/personal · L 3 · I 3 · **E 9**
· **Trigger:** I observe that requirements on the rubrics are missing or only partially done. 
· **Owner:** Katherine Spencer. · **Response:** mitigate —  finish the Analysis fallback (T-5.6) first the work on the AI Analysis (FR-AIA-01, FR-AIA-04) right away afterwards.
· **Contingency:** implement the most necessary tests to the functionality first cutting more should and could tasks if necessary to maintain time
· **Status:** open. 

**R-06** — Because I am sending the data received from the check ins and journal entries if Gemini AI API changes the way data is sent in changes then it will cause the AI part of my AI Analysis (FR-AIA-01, FR-AIA-04) to fail.  
· data/legal · L 3 · I 3 · **E 9**
· **Trigger:** The Gemini API returns a `500` error response in the logs *or* I observe that Google Gemini's AI API documents state the change in the data terms and policies.
· **Owner:** Katherine Spencer. · **Response:** mitigate — spend 10 minutes a week checking that Gemini AI API data policies on how data is send in and returned and implement the Analysis fallback (T-5.6) right away so the Analysis is functional no matter what.
· **Contingency:** update the code that deals with how the data is send in and returned to match what the Gemini AI API requires which is shown on the Gemini API data policies documentation.
· **Status:** open. Reviewed weekly.

**R-07** — Because I am sending the data received from the check ins and journal entries if Gemini AI API changes their free tiers terms past just using the data for training their models then the AI Analysis (FR-AIA-01, FR-AIA-04) note on the AI will need to change or a paid tier will need to be bought.  
· data/legal · L 3 · I 3 · **E 9**
· **Trigger:** I observe that Gemini AI API data privacy policies state the change in data useage
· **Owner:** Katherine Spencer. · **Response:** mitigate — spend 10 minutes a week checking that Gemini AI API data policies on where data is sent and implement the Analysis fallback (T-5.6) right away if unhappy with the policy and pay for the paid tier.
· **Contingency:** update the UI notes for stressed individuals with details on how the stressed individual data is being used or just pay and use the paid tier which is shown on the Gemini API pricing documentation.
· **Status:** open. Reviewed weekly.

**R-08** — Because I am new to deploying an app with Expo and using Expo with React (T-6.2), I may run into technical problems when building the app or deploying it because of this novelty may increase the hours required for completing the app by 3 hours which would push a work package past its gate.
· technical/novelty · L 3 · I 3 · **E 9**
· **Trigger:** I observe hours required to complete the previous week push over to the next week increasing it by 3 hours *or* I continue to run into technical errors presented in the logs.
· **Owner:** Katherine Spencer. · **Response:** mitigate — contuinally test the app on Expo Go to ensure that no technical errors appear and test deploying the Expo app on Week 12 and move 3 hours of WP-1 forward into Week 11, and book the spacer weeks hours on the calendar now.
· **Contingency:** fix and work through the errors, testing and understanding them to ensure that they don't happen again
· **Status:** open. Reviewed weekly.

___________________________________________________________________

## Risks that did not survive

**R-09** — Because Gemini AI API has a free tier API it can change the free tier's pricing, avaliability, and models included with little notice which may cause the AI part of my AI Analysis (FR-AIA-01, FR-AIA-04) to fail.
· dependency · L 3 · I 3 · **E 9**
· **Trigger:** The Gemini API returns a `500` error response in the logs *or* I observe that Google Gemini's AI API documents state the change in pricing, availability, or model.
· **Owner:** Katherine Spencer. · **Response:** mitigate — spend 10 minutes a week checking the Gemini AI API documents on pricing and realse notes, always looking for new changes and also implement the Analysis fallback (T-5.6) right away so the Analysis is functional no matter what.
· **Contingency:** switch the AI API model to the newest one and use the Analysis fallback in the mean time.
· **Status:** open. Reviewed weekly.

**R-10** — Because the Supabase Edge Function holds my AI API key and has a free tier with 500,000 invocations if I reach the 500,000 invocations or the invocation limit changes because the free tier changes it could cause my AI Analysis (FR-AIA-01, FR-AIA-04) to stop working.
· dependency · L 2 · I 3 · **E 6**
· **Trigger:** The Supabase dashboard invocation states 500,000 invocations *or* I observe that Supabase documents state the change in pricing and invocation limits *or* I observe that Supabase returns a `500` error response in the logs (T-5.2). 
· **Owner:** Katherine Spencer. · **Response:** mitigate — spend 10 minutes a week checking the Supabase documents and dashboard looking for new changes and invocation numbers so if payment for a paid tier can be done ahead of time and ensure that the Analysis fallback (T-5.6) is completed right away so the Analysis is functional no matter what.
· **Contingency:** pay for a paid tier for the Edge Function and use the Analysis fallback in the mean time if payment doesn't go through right away.
· **Status:** open. Reviewed weekly

**R-11** — Because I am working on finishing a house that needs to be done by early December, my available hours Week 13 may drop from 13 to 10, pushing the deployment and release work package past its gate.
· schedule/personal · L 2 · I 2 · **E 4**
· **Trigger:** the Week-13 hours log shows 3 fewer hours logged.
· **Owner:** Katherine Spencer. · **Response:** mitigate — move 3 more hours of WP-4 forward into Week 11, and book the spacer weeks hours on the calendar now.
· **Contingency:** spend project buffer, and record the draw in `docs/plan.md`.
· **Status:** open.

**R-012** — Because I have never done a task quite like the AI Analysis (FR-AIA-01, FR-AIA-04) there may be tasks that I may not have discovered through my research which may cause the feature to continue to grow and increase the hours required for completing the app by 3 hours.
· scope · L 2 · I 2 · **E 4**
· **Trigger:** I observe the WP-5 requires more new tasks that were not yet logged *or* I observe hours required to complete the previous week push over to the next week increasing it by 3 hours
· **Owner:** Katherine Spencer. · **Response:** mitigate — continually research and keep track of the tasks and hours it takes to complete them, cutting the could then should tasks if new must tasks appear and move 3 hours of WP-5 forward into Week 11.
· **Contingency:** focus on the must and the new musts and get them done before reevaluating the shoulds and coulds that may have also newly appeared. 
· **Status:** open. Reviewed weekly.

**R-013** — Because everyone is different when adding in the check-in questions (T-1.1) the amount and the types of question take ins may contuine to grow if which may cause me to loss track of what is the most important check-ins
· scope · L 2 · I 2 · **E 4**
· **Trigger:** I observe the check in questions growing past 20 questions
· **Owner:** Katherine Spencer. · **Response:** mitigate — choose 10 main check-in questions and only adding more at the end after reviewing all the must features.
· **Contingency:** combine similar questions and cut it down to 10 unless more is deemed neccessary to fulfill the check in questions purpose of helping individuals do a good check in scope of themselves after doing a full review of the features and time available.
· **Status:** open.

**R-014** — Because everyone is different when adding in the destressing activities into the 5 destressing activity section (FR-ACT-01) the amount in each destressing activity section may contuine to grow which may cause me to have way to many destressing activities in one section than the other or not enough in the others
· scope · L 2 · I 2 · **E 4**
· **Trigger:** I observe the that one destressing activity section of activities amount grows past 2 before the other destressing activities have 2 in them
· **Owner:** Katherine Spencer. · **Response:** mitigate — choose just 2 main destressing activitiies per section and only adding more at the end after reviewing all the other must features.
· **Contingency:** cut from the least important destressing activity sections first (T-4.3, T-4.4) and return focus on the most important destressing activity section (4.2) add one to each section after if time allows if not just deal with less in some sections as any destressing activity is generally helpful
· **Status:** open.

---