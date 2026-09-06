# Scoping Decision — Stress Mangement

Copy this into your repository as `docs/scoping-decision.md`. Two pages is plenty.
Every sentence you write here must be checkable by someone who is not you: a number,
a date, a quote, or a named condition. Delete the bracketed guidance as you fill it in.

**Author:** Katherine Spencer  ·  **Date:** 2026-09-04  ·  **Course week:** 2

---

## 1. Problem

For students, individuals that go to a school, such as college, who are very stressed because of tasks, deadlines, lifes challenges, expectations, people, and any stressor other that stresses them. The problem is that they can not figure out how to manage their stress properly and identify what causes them stress from everything going on. Hence, what goes wrong in their words, is that stress continually increases and they get stuck in a cycle of stress where they can not manage it. This costs about 5-10 hours of wasted time each week stressing or trying to manage their stress. Today they can try to manage it on their own or find a stress managing aid that could help them. Though this falls short because trying to figure it out on our own can create more stress and most aids today because they don't account for everybodies needs.

## 2. Evidence a user exists

Interviewed Stella .S (SS) - College student on 2026-09-02, 30 minutes, past-tense questions only.
Full write-up in `docs/interviews/2026-09-02-SM.md`.

- "I have experienced lots of stress and anxiety in the past couple weeks due to going back to class. I expressed the way I felt to people around me and they supported me through it by telling me it is normal to feel stressed about certain things or places but I can do it because I'm a strong independent woman."
- "Now, I deal with my anxiety day by day, facing my fears helping reduce the amount of anxiety therefore making it easier to go throough the day"
- "It is still pretty scary and annoying to not be able to predict how much stress I am going to feel that day."

## 3. Chosen scope — Must features

| # | Feature | Hours |
|---|---|---:|
| 1 | Check in Questions | interface 2 hr, handler 2 hr, data 1.5 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 9.5 hr  |
| 2 | Overview of stress | interface 3, hander 3 hr, data 3 hr, validation 1.5, error path 1 hr, test 1, docs 1 hr, subtotal 13.5 |
| 3 | Journal | interface 2 hr, handler 2 hr, data 2 hr, validation 0.5, error path 0.5 hr, test 1 hr, docs 1 hr, subtotal 9 hr |
| 4 | Destressing activity - sound & breathing exercises | interface 3.5 hr, handler 1.5 hr, data 1 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 10 hr |
| 5 | AI Analysis of week/month (Looks through data overview and journal to see what stressed the individual out the most)| interface 2 hr, handler 5 hr, data 3 hr, validation 1.5, error path 1.5 hr, test 1.5 hr, docs 1 hr, subtotal 15.5 hr  |
| | **Feature total** | 57.5 |
| | Walking skeleton + continuous integration | 6 |
| | Deployment + clean-machine test | 4 |
| | **Construction total** | 67.5 |

Plan: 60 hours. Hard ceiling: 75. My number: 67.5. 
It does not leave slack as it is considered the right size so since it doesn't leave slack, I will do the most important features first simplifying them a bit then cutting the smaller less timely features until time is available.

## 4. Should features — built only if there is room

The should features built only if there is room, time, and when all the main features are completed could be a goals page that could let users choose goals for a week/month to help them become less stressed. This would likely take 4 extra hours to create and would be built before Week 12 is done. Then if time allows both, another could be a page that shows that the user did a specific number of check in questions, journal entries, and destressing activities that week/month. This would also likely take 4 extra hours to create and would be built before Week 12 is done. Though this would be the second one cut because it isn't as useful as a goals page to help improve an individuals stress. Then if all these are possible and I still have time I would like to add in themes so that a user can choose the look they like the best for the app. This would likely take 3 extra hours to create and would be built before Week 12 is done. Though this last one would be cut first because it doesn't help improve an individuals stress.

## 5. Out of scope — will not be built

I will not build a login page. I will not build it into a website or for a watch. I will not build it to implement school related technology such as the canvas to-do. I will not build an AI assisant for it that answers personal questions or gives advise, only if I have time to implement the AI feature will it be for analyzing the data the user already inputted into the app such as the overview or journal and only provides explainations of the patterns or suggestions only. I will not add notifications. I will not build something that tells an individual that it can treat or diagnose them. I will not build in more than 5 general destressing activity sections. I will not build a way for individuals to communicate on the app to each other

## 6. Accepted tradeoffs

The accepted tradeoff that I deliberately chose a cheaper design for was user accounts so the data is stored only on the users device. This costs the user the ablities to have the app on multiple mobile devices. I accpected this tradeoff because it would push the project time over the hard ceiling and it would also save me time dealing with ensuring that no one can get into another users account. I would only revisit this if every single main feature and should feature is complete, if I have a considerable amount of time left to fully complete it such as 15 hours, and when testing if a real user asks for a user system to be implemented.

## 7. Rejected candidates

**Rejected: Outfit Planning.** The evidence shows that this candidate should be rejected, this evidence being that scorecard scored the lowest and according to the candidate-scorecard.csv it has the second highest estimated time causing the verdict to say that I won't finish it in time even when cutting the two things it recommened, both 2 of the features and the need for user accounts. The condition under which I would revisit it, would be if I am able to lessen the time it would take to do it, if I am able to condense the amount of features, and if a fallback such as shared join code fits in the time and works for the app.

**Rejected: Period Predictions.** The evidence shows that this candidate should also be rejected, this evidence being that scorecard scored the second to lowest and according to the candidate-scorecard.csv it has the highest estimated time, again causing the verdict to say that I won't finish it in time even when cutting the two things it recommened, both 2 of the features and one of the integrations. The condition under which I would revisit it would be if I am able to lessen the time it would take to do it, if I am able to condense the amount of features, and if I am able to find a way to work with only one integration.

## 8. Hour budget, reconciled

| Weeks | Phase | Hours |
|---|---|---:|
| 1–2 | Inception | 30 |
| 3–4 | Requirements | 30 |
| 5–6 | Design | 30 |
| 7 | Planning | 15 |
| 8 | Design review + midterm | 15 |
| 9–12 | Construction + verification | 60 |
| 13 | Documentation | 15 |
| 14 | Deployment + handoff | 15 |
| 15–16 | Presentation + delivery | 30 |
| | **Total** | **240** |

Yes, my construction fits inside the 60/75 line. I had to cut the should features and accept the tradeoffs in order to do this.

## 9. The one hard part

The hard part of this project will be the AI Analysis and even if the fallback is necessary the fallback will still be the hardest part, mainly because it will need to take in both the check in and journal to create a word based search for a non advise related, but suggestion based explanation for the stress when the provider errors or is slow. I also have never made AI do anything in a project before so it will be hard to figure out how to start and make it work as intend.

## 10. Risks and the scope-cut trigger

| Risk | Likelihood | What it costs me | Early warning sign |
|---|---|---|---|
| The main features take  too much time and grow too complex | M | It costs me the complexity of the features and possibly even some of the other less beneficial main features | If work starts to take over 75 hours (the hard ceiling) by Week 9 |
| The AI Analysis doesn't work properly | M | It costs me the AI part of the analysis and causes me to either go to the fallback were I look for key words in the journal and patterns in the check in questions | AI analysis continually fails its tests and starts taking longer than expected by Week 9 |

**Scope-cut trigger.** If I'm over the 75 hours by the end of Week 12 (2026-11-14), I will cut the Destressing Activities first, then AI Analysis. Decided now, in advance, so I do not have to decide it while panicking.

---

**Signed:** Katherine Spencer, 2026-09-04
**AI use for this document:** No use