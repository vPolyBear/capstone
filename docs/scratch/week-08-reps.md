
## Rep 1 — Assemble the package and gate it yourself

Write: three sentences naming what you had to fix to pass your own entry criteria. If the answer is “nothing,” you did not look hard enough.
- Had to get rid of the word fast and instead used a number for time individual need to get help in
- Had to add in a 200 code in the architecture.md for the happy case because it is a code that I will use in my system 
- Wanted to add in more clarifying information for the auth field in the interface contract to still show that the API key is needed.
- Had to add the time field time zone policy and storage format (UTC using ISO 8601 format)
- Clearly identified the personal data that is stored and stated how long it is retained and when it is deleted.
- Added risk R-15 for the Expo free tier
- Updated October and November calendar to reflect actual working hours

## Rep 2 — The traceability spot-check

| Req id | Spec section that designs it | Task/work package that builds it | How it will be verified | Verdict | 
|---|---|---|---|---|
| FR-QUES-01 | requirements.md - Add check in response | WP-1 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| FR-OVER-01 | requirements.md - Stress weekly/monthly view | WP-2 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| FR-JOU-01 | requirements.md - Add Journal Entry | T-3.1,T-3.2,T-3.3,T-3.4 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| FR-ACT-01 | requirements.md - Destressing aid | WP-4 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| FR-AIA-01 | requirements.md - Prompt AI Analysis for Stress Explanation | WP-5 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| FR-AIA-04 | requirements.md - Prompt AI Analysis for Destressing Aid | WP-5 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| FR-JOU-02 | requirements.md - Edit Journal Entry | T-3.5 | 1st Acceptance criteria in requirements.md for the requirement | complete |
| NFR-AVA-01 | requirements.md - Availability | T-5.6,T-5.7 | Requirement & How it is measured column in requirements.md for the non-functional requirement | complete |
| NFR-ACC-01 | requirements.md - Accessibility | T-7.3 | Requirement & How it is measured column in requirements.md for the non-functional requirement | complete |
| NFR-PERF-01 | requirements.md - Performance | T-5.5 | Requirement & How it is measured column in requirements.md for the non-functional requirement | complete |

- I had no orphans

## Rep 3 — Write the reviewer’s brief

Design review: Stress Manager, senior capstone, baseline gate.

What I need (45 minutes, please do not go over):
  1. Read docs/requirements.md section 5 (the Must set, 16 requirements) and docs/architecture.md sections 5-7 (interfaces, data model, flows).
  2. Use docs/review/design-review-checklist.md, areas 1-3.
  3. I am specifically asking: is there a Must requirement this design does not satisfy, and is there anything in the interface section a developer could not build from?

NOT asking for: wording, formatting, or whether the idea is good. Settled.
Format: one line per finding, with the section number. Do not soften it.
I will not argue in the meeting; I will log it.

Materials: tag spec-review-candidate, commit 70930d1.
Time box: 45 minutes reading, 45 minutes together Friday.

Write: Could a competent stranger start reading in under two minutes? If not, cut it in half.
- Yes

## Rep 4 — The solo walkthrough, cold and out loud

Produce: at least six findings in the log format, each with a location.

1. DR-001,self,walkthrough,all throughout the architecture.md,docs/architecture.md, ,"multiple words are misspelled",minor,Fix now,"fixed the spelling error that were all throughout the document",Katherine Spencer,8,yes
2. DR-002,self,walkthrough,Purpose and Scope,docs/architecture.md In scope,all musts and shoulds,"there wasn't all of the musts and shoulds listed to clearly show what was in the in scope section",minor,Fix now,"added in all of the musts and shoulds that weren't listed that are in scope for the design",Katherine Spencer,8,yes
3. DR-003,self,walkthrough,Interface Contracts,docs/architecture.md What a user is shown for each,"I only stated n/a for 401 and 403 not clarifying why they are not shown or logged in the table",minor,Fix now,"clarifyed that 401 and 403 aren't shown or logged because I don't have user accounts",Katherine Spencer,8,yes
4. DR-004,self,walkthrough,Interface Contracts,docs/architecture.md POST /sendAnalysis,"I only added 404 and 409 to my error envelope and never added it to the interface contract",minor,Fix now,"I added 404 and 409 to the interface contract so they will actually be shown to being used",Katherine Spencer,8,yes
5. DR-005,self,walkthrough,Interface Contracts,docs/architecture.md POST /sendAnalysis,"I didn't clarify the limits enough specificly the times for the Gemini API call to the overall AI Analysis process time",minor,Fix now,"I edited it to include/fix the time for each call/request to if the Gemini API call exceeds 20 seconds and overall AI Analysis request process exceeds 25 seconds",Katherine Spencer,8,yes
6. DR-006,self,walkthrough,Interface Contracts,docs/architecture.md POST /sendAnalysis,"I didn't add in the information that I had later on where the request will be retried once before the fallback happens",minor,Fix now,"Added in how the validator retries once if it fails then does the fallback so it matches what I wrote later on",Katherine Spencer,8,yes

 Write: the one sentence you had to explain out loud that surprised you most.
 - One sentence that I had to explain out loud that surprised me the most was that I had written later on that the validator retried if it failed so I kept having to make sure that I added what I wrote later to the previous section to ensure it matched.

## Rep 5 — Run the Design Review Auditor

Write: your readiness score, the widget’s top three send-backs
- 100% readiness score so no send-backs because they were all yes.

## Rep 6 — Forty-five minutes with one human being

docs\architecture.md #7 Sequence Flow 1 row 2
- What if after submitting the check in questions and it tries to save them the check in answers disappear, and so you can't just have them resubmit them, what would happen then?

docs\architecture.md #7 Sequence Flow 2 row 2
- What if the request doesn't just fail but Supabase Edge Function is down?

After asking about which part would you be most nervous to build?
- The AI Analysis because I have never done it before.

Write: the finding that stung, and the honest reason it stung.
- The finding that stung was how she mentioned how what if the Supabase Edge Function is down because it seems so ovbsious but I still missed it even though it wasn't hard to add in but was still really important.

## Rep 7 — The adversarial AI pass, then the verification

1. confirmed
2. rejected
3. confirmed
4. confirmed
5. confirmed
6. confirmed
7. confirmed
8. confirmed
9. fabricated & rejected
10. rejected
11. rejected
12. confirmed
13. confirmed
14. fabricated & rejected
15. confirmed
16. rejected
17. fabricated & rejected

Write: your fabrication rate — fabricated findings over total findings — and one sentence on what that number means for how you use this tool in Week 12. Then answer the question that matters most: name one defect your human reviewer found that the assistant did not, and say why the assistant could not have found it.
- 3/17 = 17.65% fabricated rate
- What this number means for how I will use this tool in Week 12 is that though a lot of the times it gave me really good findings  there are definitely times when it can be completely off so I'll need to make sure that I am good about using and checking what it provides me.
- The one defect my human reviewer found that the assistant did not was how what if the check in answers disappeared and so since they couldn't just be resubmitted, what would happen next. The assistant could not have found it because the human reviewer was able to think about the situtations they have been in before that caused them more trouble while the assistant likely didn't check every possibly or think of it as important.

## Rep 8 — Severity, disposition, owner, due week

Write: the counts — how many Criticals, Majors, Minors — and the one disposition you are least comfortable with.
- Criticals: 0
- Majors: 2
- Minors: 29
- Trivial: 1

- I am comfortable with all of them because I believe that I have added in the context necessary for them to be accounted for.

## Rep 9 — Rework the Majors, then verify them separately

Write: one finding whose fix created a second finding. There is usually one, and catching it is the whole point of verifying separately.
- The one finding created a second finding was DR-003 because I found DR-004 because of it because after explaining the 401 and 403 codes I looked further into the codes and realized I missed adding the codes 404 and 409 that I specified already to the interface contract.