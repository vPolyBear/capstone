# Idea Canvas — Candidate <A>

Copy this file once per candidate into your repository as `docs/ideas/candidate-a.md`
(then `-b`, `-c`). Fill every field. A blank field is an answer: it means you do not
know yet, and that is exactly what this page is for. Delete the bracketed guidance
as you go.

**Candidate name:** Stress Mangement
**Date started:** 2026-08-31   **Well it came from:** campus

---

## 1. Problem statement

For                                 Students, individuals that go to a school such as college,
who                                 are very stressed because of tasks, deadlines, lifes challenges, expectations, people, and any stressor other that stresses them so
the problem is                      that they can not figure out how to manage their stress properly and identify what causes them stress from everything going on   
what goes wrong, in their words     is that stress continually increases and they get stuck in a cycle of stress where they can not manage it
which costs                         about 5-10 hours of wasted time each week stressing or trying to manage their stress
Today they                          can try to manage it on their own or find a stress managing app like Stressbuoy or Silas that could help them
which falls short because           trying to figure it out on are own can make them more stressed and apps today don't account for everybodies needs

## 2. Evidence a user exists

- **Person spoken to:** Stella .S (SS) - College student
- **Date and length:** 2026-09-02, 30 minutes
- **Three verbatim quotes:**
  1. "I have experienced lots of stress and anxiety in the past couple weeks due to going back to class. I expressed the way I felt to people around me and they supported me through it by telling me it is normal to feel stressed about certain things or places but I can do it because I'm a strong independent woman."
  2. "Now, I deal with my anxiety day by day, facing my fears helping reduce the amount of anxiety therefore making it easier to go throough the day"
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

Budget: plan on **60 hours**, hard ceiling **75**. Above 75 you are borrowing from
testing and documentation, which are graded.

## 3.5. Reconcile Two Estimates

Bottom-up (Rep 7): 67.5 h        Sizer (Rep 8): 69 h
Gap: 2.22 %      The assumption that differs: The bottom up focused more on individual features while the sizer focused more on the overall picture. The bottom up took in that the features won't take as long because I know that 2 to 3 shouldn't take as long while the sizer took in integrations and believes more features will take longer
The number I will plan against: 67.5 h     because I don't want to barrow from testing or documantion if things take longer than expected

## 4. Out of scope — will NOT be built

1. I will not build a login page
2. I will not build it into a website or for a watch
3. I will not build it to implement school related technology such as the canvas to-do
4. I will not build an AI assisant for it that answers personal questions or gives advise, only if I have time to implement the AI feature will it be for analysing the data the user already inputted into the app such as the overview or journal
5. I will not add notifications
6. I will not build something that tells an individual that it can treat or diagnose them
7. I will not build in more than 5 general destressing activity sections
8. I will not build a way for individuals to communicate on the app to each other

- Which of the eight will be hardest to keep out at 11 p.m. in Week 10? Write one sentence to your future self explaining why it stays out. That sentence is the whole point of this rep.
    - Number 5 will be the hardest to keep out because I expect that making the sections will be really fun as there are so many sections that can be added to help individuals. However, I should focus on the whole of the app and not get distracted adding in too many sections for features but keeping it simple and not overly focusing on just one aspect of the app as it won't substantially improve my app to add in more than 5.

## 5. Feasibility screen

| Gate | Verdict | Evidence (dated) |
|---|---|---|
| **Build** — novelty load ≤ 2 | pass / fail | <technology list, each marked known/new> |
| **Get** — every dependency exercised for real | pass / fail | <status code, saved response, date> |
| **Ship** — a named deployment target, terms read | pass / fail | <target + pricing page read on YYYY-MM-DD> |
| **Show** — a stranger sees it work in 10 minutes | pass / fail | <the ten steps, written down> |

**Technologies:** React Native (new) · Expo (new) · TypeScript (known)
**Novelty load:** 2

## 6. The one hard part

<Name exactly one. Say what makes it hard in two sentences. If you can name three, you have three projects.>

## 6.5. Pre-Mortem - scope cut trigger???

Failure	Mine /Earliest visible week / The trigger that would catch it
1. 
2. 
3. 

Failure / model /	Earliest visible week /	The trigger that would catch it
1. 
2. 
3. 

## 7. Scorecard (1–5 each; weight in parentheses)

| Criterion | (w) | Score | Weighted |
|---|---:|---:|---:|
| Evidence a user exists | 3 | | |
| Fits ~45 hours of features | 3 | | |
| Novelty load | 2 | | |
| Dependencies verified | 2 | | |
| Demonstrable in ten minutes | 1 | | |
| **Total (max 55)** | | | |

## 8. If this candidate is rejected

<Write the rejection paragraph NOW, while you still like the idea. Name the gate it
failed, the number that killed it, and the condition under which you would revisit
it — or say plainly that it is closed, not deferred.>