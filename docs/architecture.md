# architecture

## Rep 1 — The decision inventory

| # | Requirement | Decision that must be made first | Section it belongs in |
|---|---|---|---|
| 1 | FR-QUES-01 | When does a check in happen, right away or after a welcome screen? | Behavior |
| 2 | FR-QUES-01 | How many check ins will there be? | Data |
| 3 | FR-OVER-01 | What type of graphs will be used? | Data / Components |
| 4 | FR-JOU-01 | Will adding a journal entry bring up a pop up or move an individual to a new page? | Behavior |
| 5 | FR-ACT-01 | What will be destressing activities that can be chosen from in the destressing activity sections? | Components |
| 6 | FR-AIA-01 | What will the predetermined prompt say for the stress explanation? | Data |
| 7 | FR-AIA-01 | Will there be multiple predetermined prompts to pick from for stress explanations? | Data |
| 8 | FR-AIA-01 | What is the range or way the specific check ins and journal entries are chosen to be used for the stress explanation? | Data |
| 9 | FR-AIA-04 | What will the predetermined prompt say to get a destressing aid suggestion? | Data |
| 10 | FR-AIA-04 | What is the range or way the specific check ins and journal entries are chosen to be used to get a destressing aid suggestion? | Data |
| 11 | NFR-PERF-01 | What if the AI Analysis takes longer than 25 seconds, will there just be an error or will the AI Analysis fallback happen too? | Behavior |
| 12 | NFR-REL-01 | What does the expections/errors say if the app fails to run when entered? | Behavior |
| 13 | NFR-AVA-01 | What specific words will the fallback check for in the journal entries? | Data / Components |
| 14 | NFR-SEC-01 | Where exactly in the Supabase Edge Function does the API key go? | Data |
| 15 | NFR-SEC-02 | What will the general error message say? | Data |
| 16 | NFR-PRIV-01 | How exactly with it check that zero responses and entries were sent to Gemini AI when no predetermined prompt is chosen? | Behavior |
| 17 | NFR-PRIV-02 | What types of security measures are need to ensure no unrelated information is send? | Behavior |
| 18 | NFR-ACC-01 | What colors, and font styles and sizes are going to be used in the app? | Components |
| 19 | NFR-ACC-02 | What size, shape, and fonts will be used on the success, failure, and loading states to ensure they can be clearly understood without color? | Components |
| 20 | NFR-MNT-01 | What will the README fully entail/what is necessary in order to have a clear README so a clean clone of a repository can reach a running app? | Behavior |

Reflect: Which requirement generated the most decisions? That requirement is where your design risk lives, and it is almost certainly the one you should build first in Week 9.
- FR-AIA-01 generated the most decisions, three.


## Rep 2 — Context, then containers

Reflect: How many containers did you draw, and how many of them did the requirements demand versus how many you added because they felt professional? Delete the ones that fail that test and say what you deleted.
- For Level 1 - Context I drew one box for my system
- For Level 2 Containers I drew four containers and all of them are demanded by the requirements


## Rep 3 — The level-3 zoom, exactly once

Reflect: Why did you pick that container? Name the specific thing a reviewer would otherwise have had to guess at. If you cannot name it, you picked the wrong container — or you did not need a level 3 at all, which is also a legitimate answer to write down.
- The container I chose was the mobile app container as it has the most connecting parts, connecting to the local relational databse and the edge function as it is the main base of the project. Each of the modules will also take the longest and be the hardest to do overall especially the AI Analysis' fallback. I did not really need level 3 at all as the mobile app container is where all the work is truly at which makes this project hard in general.


## Rep 4 — The responsibility table, and the audit that follows it

| Component	| Responsibility (one sentence, starts with a verb)	| Owns (state) | Depends on | Serves |
|---|---|---|---|---|
| `check-in` | Displays check in questions and records responses | `responses` | database | FR-QUES-01 | 
| `journal` | Provides a journaling spot and records entries | `entries` | database | FR-JOU-01 | 
| `overview` | Displays check in results in weekly and monthly graphs | `graphs` | database, `check-in` | FR-OVER-01 | 
| `activities` | Provides destressing activities to go through | `activities` | none | FR-ACT-01 | 
| `analysis` | Provides predetermined prompts for suggestions on stress analysis and aids, with a keyword fallback | none | gemini API, edge function, database, `check-in`, `journal` | FR-AIA-01, FR-AIA-04, NFR-AVA-01, NFR-PERF-01 | 

Dependency graph is acyclic: yes
Every piece of state has exactly one owner: yes

Reflect: Which test failed first? Almost everyone fails the single-owner test on their first draft. What state did you find with two owners, and what would that have cost you in Week 12?
- I didn't fail any test or find two owners in any row.


