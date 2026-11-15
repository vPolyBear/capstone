

## Rep 5 — Break your dependency on purpose

| Failure | How I simulated it | What the user saw | Acceptable? |
|---|---|---|---|
| slow (10 s) | Added a timeout function so that I can stop it at 5 minutes but tested it with 10 seconds | The AI Analysis Fallback was presented | yes |
| down | I changed the name of the Edge Function it called from "sendAnalysis" to "sendAnalysis-testingfailing" | The AI Analysis Fallback was presented | yes |
| rate limited | I changed the !checkRequestAmount() in the if statement to true so it would cause a rate limit | The AI Analysis Fallback was presented | yes |
| changed response | changed the jsonResponse in the index.ts to be empty | The AI Analysis Fallback was presented | yes |

Reflect: Before this rep, what did your app do when that dependency was down? Be specific — “it hung” and “it crashed” and “it showed a blank page” are three different answers, and only one of them is survivable on demo day.
- The AI Analysis loads its response if it's successful, otherwise, if it fails then the AI Analysis Fallback presents.


## Rep 6 — The assistant as security reviewer, then the advisory database

Findings claimed:            __5__
Findings confirmed real:     __5__
Advisory IDs that existed:   __0__ / __0__
Affected range actually included my version: __N/A__
Real issues it MISSED that I found myself:   __0__

Reflect: What was its hit rate? And what class of problem did it miss entirely — was it a whole-system issue that no single file could reveal? Write one sentence on what that means for how you use it in Weeks 13–16.
- The hit ratio was 100% as all it hit seemed relevant. There wasn't a class of problem that it missed entirely. This means that I will periodly use it to confirm and review my code to check for issues that I might manually miss.


## Rep 10 — Freeze, gate, tag

[ ] every Must-have requirement has a passing acceptance test
[ ] zero open Critical or High defects
[ ] security pass complete; every finding fixed or explicitly accepted
[ ] every performance target measured; each miss has a recorded decision
[ ] a clean clone sets up, runs, and passes tests using only documented steps

Reflect: Which check failed first, and what undeclared state on your machine was it detecting? Write the sentence you will add to README.md in Week 13 so a stranger never hits it.
- 