# Idea Canvas — Candidate <C>

**Candidate name:** Period Predictions
**Date started:** 2026-08-31   **Well it came from:** client

---

## 1. Problem statement

For                           women who still have periods
who                           try to track when their period happens
the problem is                that its hard to do manually and many apps predict wrong
which costs                   a minimum of 3 weeks long of anguish trying to firgue out when they are going to bleed so they can be prepared and not bleed through
Today they                    can use period tracking journals or try to track manually
which falls short because     each journal fails to properly account for everything each individual women goes through such as sleep disruptions, a missed birth control pill, health issues, and so on which all individually affect the cycle and tracking manually is extremely hard

## 2. Evidence a user exists

- **Person spoken to:** Tristen N. (TN) - Troubled with period timing
- **Date and length:** 2026-09-02, 42 minutes
- **Three verbatim quotes:**
  1. "I have always had troubles predicting when my period would start but the last time was before I got pregnant"
  2. "What I had to do was literally wait it out and sacrifice one of my pairs of underwear for when it would mysteriously appear until I started to use birth control to regulate my period and better predict it even though birth control has so many side effects"
  3. "Birth control made it easier but the side effects are what's the annoying part. Your emotions are now constantly all over the place and gaining weight is also a factor due to birth control which I don't like"
- **The workaround they already use:** She just sacrifices a piece of her clothing or uses birth control
- **Full write-up:** `docs/interviews/2026-09-02-TN.md`

## 3. Candidate scope (Must features only)

| # | Feature (one vertical slice each) | Hours |
|---|---|---:|
| 1 | Record Period | interface 1 hr, handler 1 hr, data 1 hr, validation 0.5, error path 1 hr, test 1 hr, docs 1 hr, subtotal 6.5 hr |
| 2 | Period Calendar | interface 1 hr, handler 1.5 hr, data 1 hr, validation 1, error path 1 hr, test 0.5 hr, docs 0.5 hr, subtotal 6.5 hr |
| 3 | Predict Period | interface 0.5 hr, handler 2 hr, data 1.5 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 8 hr |
| 4 | Affecting Factors (sleep, birth control, issues) | interface 1 hr, handler 2.5 hr, data 2 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 9.5 hr |
| 5 | Ovulation Prediction | interface 1 hr, handler 2 hr, data 1.5 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 8.5 hr |
| 6 | Period History Data | interface 1 hr, handler 2 hr, data 1.5 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 8.5 hr |
| 7 | Cycle Length | interface 0.5 hr, handler 0.5 hr, data 0.5 hr, validation 0.5, error path 0.5 hr, test 0.5 hr, docs 0.5 hr, subtotal 3.5 hr |
| 8 | Cycle Variation | interface 0.5 hr, handler 1.5 hr, data 1.5 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 7.5 hr |
| 9 | Cycle Phase | interface 0.5 hr, handler 1 hr, data 1 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 6.5 hr |
| | Walking skeleton + CI | 6 |
| | Deployment + clean-machine test | 4 |
| | **Construction total** | 75 |

Budget: plan on **60 hours**, hard ceiling **75**. Above 75 you are borrowing from
testing and documentation, which are graded.

## 4. Out of scope — will NOT be built

1. I will not build a period content page
2. I will not build it into a website or for a watch
3. I will not build it to implement health related technology such as the health app
4. I will not build an AI assisant for it that answers personal questions about period or gives advise for it
5. I will not build a login in page
6. I will not build something that tells an individual that it can treat or diagnose them
7. I will not build in pregnancy predictions
8. I will not build a way for individuals to communicate on the app to each other

## 5. Feasibility screen

| Gate | Verdict | Evidence (dated) |
|---|---|---|
| **Build** — novelty load ≤ 2 | pass | React Native (new) · Expo (new) · TypeScript (known) 2026-09-04 |
| **Get** — every dependency exercised for real | pass | downloaded period dataset, saved dataset, 2026-09-05 |
| **Ship** — a named deployment target, terms read | pass | Target - Apple App Store using Expo EAS, pricing page read on 2026-09-05 |
| **Show** — a stranger sees it work in 10 minutes | pass / fail | 1. opens the app, 2. records period,  3. they can record affecting factors, 4. then they can check if the next predicted period start date changed, 5. they can check if ovulation date is different, 6. then they can check cycle length for the period, 7. then they can check variation in cycle and cycle phase, 8. then they can check the period calendar for predicted periods and lengths for the next 3 period, 9. then they can check the period history data is see differences, 10. after they can then leave the app when informed of period status |

**Technologies:** React Native (new) · Expo (new) · TypeScript (known)
**Novelty load:** 2

## 6. The one hard part

The hard part of this project will be predicting the period with the affecting factors accounted for as the affecting factors range in how they affect a period drastically and there are also a lot of them. This would be a lot of data and it would be hard to ensure that this properly tested to be correct.

## 7. Scorecard (1–5 each; weight in parentheses)

| Criterion | (w) | Score | Weighted |
|---|---:|---:|---:|
| Evidence a user exists | 3 | 5 | 15 |
| Fits ~45 hours of features | 3 | 1 | 3 |
| Novelty load | 2 | 4 | 8 |
| Dependencies verified | 2 | 5 | 10 |
| Demonstrable in ten minutes | 1 | 5 | 5 |
| **Total (max 55)** | | | 41 |

## 8. If this candidate is rejected

The evidence shows that this candidate should also be rejected, this evidence being that scorecard scored the second to lowest and according to the candidate-scorecard.csv it has the highest estimated time, again causing the verdict to say that I won't finish it in time even when cutting the two things it recommened, both 2 of the features and one of the integrations. The condition under which I would revisit it would be if I am able to lessen the time it would take to do it, if I am able to condense the amount of features, and if I am able to find a way to work with only one integration.