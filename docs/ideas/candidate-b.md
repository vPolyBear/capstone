# Idea Canvas — Candidate <B>

**Candidate name:** Outfit Planning
**Date started:** 2026-08-31   **Well it came from:** hobby

---

## 1. Problem statement

For                           an individual that likes to dress nicely or cares more deeply about what they want to wear, may be called a fashionista
who                           can not figure out what they want to wear based on what they have already, what they look good in, and what they want to wear
the problem is                their outfits end up being ugly, mismatched, and unflattering
which costs                   15 minutes each day trying to figure out what is in a closet or what they want to buy, to make an outfit
Today they                    forge through their closet and look at collages to find things that match the things they already have
which falls short because     it can take a really long time, to go through each piece of clothing individually every day and think of what works together, or find and buy a piece of clothing that matches the rest

## 2. Evidence a user exists

- **Person spoken to:** Finn L. (FL) — Fashionista who has very good outfits
- **Date and length:** 2026-09-02, 33 minutes
- **Three verbatim quotes:**
  1. "Four days ago was the last time I had trouble and I asked for advice to help pick"
  2. "I give up quickly and sometimes wear the same exact rotation of clothing 5 days in a row"
  3. "Sometimes it annoys me too much to look through everything to think about what matches so I pick up the first thing I see and wear it"
- **The workaround they already use:** He asks someone for help or just picks the first thing he sees
- **Full write-up:** `docs/interviews/2026-09-02-TF.md`

## 3. Candidate scope (Must features only)

| # | Feature (one vertical slice each) | Hours |
|---|---|---:|
| 1 | Adding Clothing Item | interface 1 hr, handler 1.5 hr, data 1.5 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 8 hr |
| 2 | Generating Outfit | interface 1 hr, handler 3 hr, data 2.5 hr, validation 2, error path 1 hr, test 1 hr, docs 1 hr, subtotal 11.5 hr |
| 3 | Filters (color, location, weather) | interface 1 hr, handler 3 hr, data 2.5 hr, validation 2, error path 1 hr, test 1 hr, docs 1 hr, subtotal 11.5 hr |
| 4 | User Login | interface 1 hr, handler 3 hr, data 2.5 hr, validation 2, error path 1 hr, test 1.5 hr, docs 1 hr, subtotal 12 hr |
| 5 | Outfit Lists | interface 1 hr, handler 2 hr, data 1.5 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 8.5 hr |
| 6 | Save, Edit, Delete for Clothing, Outfits, Lists | interface 0.5 hr, handler 0.5 hr, data 1 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 6 hr |
| 7 | Available Clothing | interface 1 hr, handler 1 hr, data 1 hr, validation 1, error path 1 hr, test 1 hr, docs 1 hr, subtotal 7 hr |
| | Walking skeleton + CI | 6 |
| | Deployment + clean-machine test | 4 |
| | **Construction total** | 74.5 |

Budget: plan on **60 hours**, hard ceiling **75**. Above 75 you are borrowing from
testing and documentation, which are graded.

## 4. Out of scope — will NOT be built

1. I will not build it to implement online realtors
2. I will not build it into a website or for a watch
3. I will not build it to track which item is dirty verus clean
4. I will not build an AI assisant for it that gives advise for clothing
5. I will not add notifications
6. I will not build something that shows the clothing on a human
7. I will not build in more than 5 filters
8. I will not build a way for individuals to communicate on the app to each other

## 5. Feasibility screen

| Gate | Verdict | Evidence (dated) |
|---|---|---|
| **Build** — novelty load ≤ 2 | pass | React Native (new) · Expo (new) · TypeScript (known) 2026-09-04 |
| **Get** — every dependency exercised for real | pass | downloaded clothing dataset full & fashion recommendation dataset, saved datasets, 2026-09-05 |
| **Ship** — a named deployment target, terms read | pass | Target - Apple App Store using Expo EAS, pricing page read on 2026-09-05 |
| **Show** — a stranger sees it work in 10 minutes | pass | 1. opens the app, 2. logs in, 3. adds clothing items, 4. adds filters for what type of outfit they want to see, 5. moves to generating outfits from clothing items and based on filters, 6. if generated outfit is worn they can mark it off the available clothing list, 7. can add the generated outfit to a clothing list, 8. can save, edit, or delete clothing item, outfits, or lists on each page, 9. can go through adding more clothing, creating more outfits, and adding them to lists, 10. until outfit(s) is/are chosen then they can then leave app |

**Technologies:** React Native (new) · Expo (new) · TypeScript (known)
**Novelty load:** 2

## 6. The one hard part

The hard part of this project will be generating the outfits as ensuring that the outfits it creates actually look good, is consistent, and is correct based on the filters and available items as this part works with the other features a lot which makes it even more challenging. The generated outfits must be continually tested and scanned to ensure that when items that clash with the current clothing are added, that the clashing item isn't used in any circumstance until another item that can match it is added in and it is hard to truly objectively analyze a clothing item photo.

## 7. Scorecard (1–5 each; weight in parentheses)

| Criterion | (w) | Score | Weighted |
|---|---:|---:|---:|
| Evidence a user exists | 3 | 4 | 12 |
| Fits ~45 hours of features | 3 | 1 | 3 |
| Novelty load | 2 | 4 | 8 |
| Dependencies verified | 2 | 5 | 10 |
| Demonstrable in ten minutes | 1 | 5 | 5 |
| **Total (max 55)** | | | 38 |

## 8. If this candidate is rejected

The evidence shows that this candidate should be rejected, this evidence being that scorecard scored the lowest and according to the candidate-scorecard.csv it has the second highest estimated time causing the verdict to say that I won't finish it in time even when cutting the two things it recommened, both 2 of the features and the need for user accounts. The condition under which I would revisit it, would be if I am able to lessen the time it would take to do it, if I am able to condense the amount of features, and if a fallback such as a shared join code fits in.