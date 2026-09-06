# Idea Canvas — Candidate <A>

**Candidate name:** Stress Mangement
**Date started:** 2026-08-31   **Well it came from:** campus

---

## 1. Problem statement

For                                 Students, individuals that go to a school such as college,
who                                 are very stressed because of tasks, deadlines, lifes challenges, expectations, people, and any stressor other that stresses them so
the problem is                      that they can not figure out how to manage their stress properly and identify what causes them stress from everything going on   
what goes wrong, in their words     is that stress continually increases and they get stuck in a cycle of stress where they can not manage it
which costs                         about 5-10 hours of wasted time each week stressing or trying to manage their stress
Today they                          can try to manage it on their own or find a stress managing aid that could help them
which falls short because           trying to figure it out on our own can create more stress and most aids today because they don't account for everybodies needs

## 2. Evidence a user exists

- **Person spoken to:** Stella .S (SS) - College student
- **Date and length:** 2026-09-02, 30 minutes
- **Three verbatim quotes:**
  1. "I have experienced lots of stress and anxiety in the past couple weeks due to going back to class. I expressed the way I felt to people around me and they supported me through it by telling me it is normal to feel stressed about certain things or places but I can do it because I'm a strong independent woman."
  2. "Now, I deal with my anxiety day by day, facing my fears helping reduce the amount of anxiety therefore making it easier to go thorough the day"
  3. "It is still pretty scary and annoying to not be able to predict how much stress I am going to feel that day."
- **The workaround they already use:** The work around she uses is to talk to people and to her therapist
- **Full write-up:** `docs/interviews/2026-09-02-SM.md`

## 3. Candidate scope (Must features only)

| # | Feature (one vertical slice each) | Hours |
|---|---|---:|
| 1 | Check in Questions | interface 2 hr, handler 2 hr, data 1.5 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 9.5 hr  |
| 2 | Overview of stress | interface 3, hander 3 hr, data 3 hr, validation 1.5, error path 1 hr, test 1, docs 1 hr, subtotal 13.5 |
| 3 | Journal | interface 2 hr, handler 2 hr, data 2 hr, validation 0.5, error path 0.5 hr, test 1 hr, docs 1 hr, subtotal 9 hr |
| 4 | Destressing activity - sound & breathing exercises | interface 3.5 hr, handler 1.5 hr, data 1 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 10 hr |
| 5 | AI Analysis of week/month (Looks through data overview and journal to see what stressed the individual out the most)| interface 2 hr, handler 5 hr, data 3 hr, validation 1.5, error path 1.5 hr, test 1.5 hr, docs 1 hr, subtotal 15.5 hr  |
| | Walking skeleton + CI | 6 hr |
| | Deployment + clean-machine test | 4 hr |
| | **Construction total** | 67.5 |

Budget: plan on **60 hours**, hard ceiling **75**. Above 75 you are borrowing from testing and documentation, which are graded.

## 3.5. Reconcile Two Estimates

Bottom-up (Rep 7): 67.5 h        Sizer (Rep 8): 69 h
Gap: 2.22 %      The assumption that differs: The bottom up focused more on individual features while the sizer focused more on the overall picture. The bottom up took in that the features won't take as long because I know that 2 to 3 shouldn't take as long while the sizer took in integrations and believes more features will take longer
The number I will plan against: 67.5 h     because I don't want to barrow from testing or documantion if things take longer than expected

## 4. Out of scope — will NOT be built

1. I will not build a login page
2. I will not build it into a website or for a watch
3. I will not build it to implement school related technology such as the canvas to-do
4. I will not build an AI assisant for it that answers personal questions or gives advise, only if I have time to implement the AI feature will it be for analyzing the data the user already inputted into the app such as the overview or journal and only provides explainations of the patterns or suggestions only.
5. I will not add notifications
6. I will not build something that tells an individual that it can treat or diagnose them
7. I will not build in more than 5 general destressing activity sections
8. I will not build a way for individuals to communicate on the app to each other

- Which of the eight will be hardest to keep out at 11 p.m. in Week 10? Write one sentence to your future self explaining why it stays out. That sentence is the whole point of this rep.
    - Number 5 will be the hardest to keep out because I expect that making the sections will be really fun as there are so many sections that can be added to help individuals. However, I should focus on the whole of the app and not get distracted adding in too many sections for features but keeping it simple and not overly focusing on just one aspect of the app as it won't substantially improve my app to add in more than 5.

## 5. Feasibility screen

| Gate | Verdict | Evidence (dated) |
|---|---|---|
| **Build** — novelty load ≤ 2 | pass | React Native (new) · Expo (new) · TypeScript (known) 2026-09-04 |
| **Get** — every dependency exercised for real | pass | Google Gemini AI API - Verfified, 200, stress management prompt returned response, 2026-09-05 |
| **Ship** — a named deployment target, terms read | pass | Target - Apple App Store using Expo EAS, pricing page read on 2026-09-05. |
| **Show** — a stranger sees it work in 10 minutes | pass | 1. opens the app, 2. home screen with main pages, 3. can go through check-ins for how stress is, 4. can move to the general overview page, 5. can go to journal page and journal, 6. can go to the destressing activites sections page and can click on a section, 7. can pick a destressing actvity from the specific section, 8. can go to the AI Analysis page for more specific stress analysis, 9. AI Analysis can suggest a destressing activity, 10. can go through each page again if new changes in stress occur or can leave the app |

**Technologies:** React Native (new) · Expo (new) · TypeScript (known)
**Novelty load:** 2

## 6. The one hard part

The hard part of this project will be the AI Analysis and even if the fallback is necessary the fallback will still be the hardest part, mainly because it will need to take in both the check in and journal to create a word based search for a non advise related, but suggestion based explanation for the stress when the provider errors or is slow. I also have never made AI do anything in a project before so it will be hard to figure out how to start and make it work as intend.

## 6.5. Pre-Mortem

Failure	Mine / Earliest visible week / The trigger that would catch it
1. The main features start to take too much time and become too complex / Week 9 / Work starts to take over 75 hours beause that's the hard ceiling so cutting less beneficial features will be necessary
2. The AI analysis doesn't properly work / Week 9 / AI analysis continually fails its tests and starts taking longer than expected, the fallback then must be started right away to ensure an overview of at least general results are produced
3. Bugs start to take over and cause everything to become a mess where only parts of each feature work / Week 9 / Testing will catch it, so continual testing before moving on is necessary
Failure / model /	Earliest visible week /	The trigger that would catch it
1. React Native and Expo take longer to learn and integrate than expected, delaying the core features / Copilot - Auto / Week 5 / By the end of Week 5, the React Native and Expo setup or technology evaluation is still incomplete, so the walking skeleton cannot be started on schedule (Week 9).
2. The project scope exceeds the available schedule, especially with five feature areas and AI analysis. / Copilot - Auto / Week 2 / The forecast exceeds 60 hours or a vertical slice is not working.
3. AI analysis and cross-feature data integration are underestimated, leaving too little time for validation and testing / Copilot - Auto / Week 10 / A test dataset cannot complete the analysis path reliably.

- Note: Both the AI and I had the same concerns with the AI analysis taking longer than it should or with complications arising.

## 7. Scorecard (1–5 each; weight in parentheses)

| Criterion | (w) | Score | Weighted |
|---|---:|---:|---:|
| Evidence a user exists | 3 | 5 | 15 |
| Fits ~45 hours of features | 3 | 3 | 9 |
| Novelty load | 2 | 4 | 8 |
| Dependencies verified | 2 | 5 | 10 |
| Demonstrable in ten minutes | 1 | 5 | 5|
| **Total (max 55)** | | | 47 |

## 8. If this candidate is rejected

Not Rejecting