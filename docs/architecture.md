# architecture

# Technical Specification — Stress Manager

Version: v0.1   Date: 2026-10-01   Author: Katherine Spencer   Status: Draft
Requirements baseline this design satisfies: docs/requirements.md v0.1

## 1. Purpose and Scope

This system is for stressed individuals who need help managing their stress. To help them with this the system provides check-ins, journal entries, an overview of their stress over the week and month, destressing activities, and an AI Analysis for a suggestion based explanation for their stress or destressing activities. From these features the goal is to help individuals not only better understand their stress but also find ways that help them best to deal with their stress.

In scope: FR-QUES-01, FR-JOU-01, FR-OVER-01, FR-ACT-01, FR-AIA-01, FR-AIA-04
Out of scope: A Communication Page, Special Therapist View, Personal or linking Canvas To Do Lists, User Accounts, Notifications/Reminders, Pulling sleep data from a watch, Stress Prediction, and more than 5 sections of destressing activities. The time that these would need would push my project over the budget, there is no evidence any one interviewed would want it, and there is uncertainty in its helpfulness overall.

## 2. System Context (Level 1)
Diagram: docs/diagrams/Level1-Context.png
| External actor / system | What it does with us | Protocol | If it is unavailable |
|---|---|---|---|
| Stressed Individual (user) | Adds check ins and journal entries, checks the stress overview, uses the destressing aids, and requests an AI Analysis | Mobile app | n/a |
| AI Analysis Gemini AI API | Receives the AI Analysis requests and returns the AI Analysis responses | HTTPS/JSON | keyword fallback |

## 3. Containers (Level 2)
Diagram: docs/diagrams/Level2-Containers.png
| Container | Responsibility (one sentence) | Technology | Runs where | Holds secrets? |
|---|---|---|---|---|
| Mobile app | Takes in the stressed individuals checks ins to create an overview then also takens in their journal entries using both for the AI Analysis, then has activity options, all present on the UI in Expo Go. | Expo + React Native | on the stressed individuals mobile device | no |
| Local Relational Database | Stores the check ins and journal entries locally on the stressed individuals device | Expo SQLite | on the stressed individuals mobile device | no |
| Edge Function | Provides a place to securely store the Gemini API key and receives the AI Analysis requests, calls the Gemini API, and returns the AI analysis response back | Supabase Edge Function | Supabase Edge Runtime (server-side function) | yes, the Gemini API key |
| API service | Provides a suggestion based explanantion for the stressed individuals stress or a suggestion for a destresssing aid when prompted with a predetermined prompt | Gemini AI API | Google's servers | no |

Trust boundary: The trust boundary is between the mobile app and the edge function as the mobile app and local relational database run on the user's machine and the edge functioin holds the secrets on a server and API service runs on Google's servers.

## 4. Components (Level 3 — for the container with the hard part only)
Diagram: docs/diagrams/Level3-Components.png
| Component | Responsibility (verb first) | Owns (state) | Depends on | Serves (req IDs) |
|---|---|---|---|---|
| `check-ins` | Displays check in questions and records responses | `responses` | database | FR-QUES-01 | 
| `journals` | Provides a journaling spot and records entries | `entries` | database | FR-JOU-01 | 
| `overview` | Displays check in results in weekly and monthly graphs | `graphs` | database, `check-in` | FR-OVER-01 | 
| `activities` | Provides destressing activities to go through | `activities` | none | FR-ACT-01 | 
| `analysis` | Provides predetermined prompts for suggestions on stress analysis and aids, with a keyword fallback | `analysis` | gemini API, edge function, database, `check-ins`, `journals` | FR-AIA-01, FR-AIA-04, NFR-AVA-01, NFR-PERF-01 | 

Dependency graph is acyclic: yes
Every piece of state has exactly one owner: yes

## 5. Interface Contracts

### POST /sendAnalysis                        (serves FR-AIA-01, FR-AIA-04, NFR-AVA-01, NFR-PERF-01)
Purpose      To request an ai analysis suggestion explanation or aid based on the selected check ins, journal entries, and the predetermined prompt
Auth         There are no user accounts
Request      prompt string req · check_ins array req · journal_entries array req
Success      200 { analysis_explanation, activity_suggestions }
Errors       400 invalid_request · 500 ai_service_error
Envelope     {"error":{"code":...,"field":...,"message":...}}  (system-wide)
Idempotency  a repeat can happen and it returns a different AI analysis response 
             every time; the check ins and journal entries stays the same after
Side effects nothing is stored
Limits       check-ins <= 30 per request; journal entries <= 30 per request;
             5 <= requests in 5 seconds

### POST /produceResponse                     (serves FR-AIA-01, FR-AIA-04, NFR-PERF-01)
Purpose      To receive a response created by gemini ai based on the sent check ins, journal entries, and the predetermined prompt
Auth         Gemini API key stored in the Supabase Edge Function
Request      prompt string req · check_ins array req · journal_entries array req
Success      200 { analysis_explanation, activity_suggestions }
Errors       400 invalid_request · 500 ai_service_error
Envelope     {"error":{"code":...,"field":...,"message":...}}  (system-wide)
Idempotency  a repeat can happen and it returns a different AI analysis response 
             every time; the check ins and journal entries stays the same after
Side effects nothing is stored
Limits       check-ins <= 30 per request; journal entries <= 30 per request;
             5 <= requests in 5 seconds

Error envelope used system-wide: { "error": { "code": ..., "field": ..., "message": ... } }
Status-code policy- Codes I will use and what each means in THIS system:
  400 __invalid request or input, or missing field in the check-ins, journal entry, or prompt__   
  401 __this won't be used in my system as it isn't needed because I don't have user account__
  403 __this won't be used in my system as it isn't needed because I don't have user account__   
  404 __the resource (check-in, journal entry, or AI Analysis prompt) requested does not exist__
  409 __this AI request conflicts with current state of the selected check-ins or journal entries__   
  429 __the amount of AI Analysis requests exceed the limit of requests (5) in the time limit (5 seconds)__
  500 __the AI service or Edge Function ran into an error, or there was a server error__

Error Number | What a user is shown for each | What gets logged | 
|---|---|---|
| 400 | this input or request is invalid and sees the what input or request is invalid in it or this field is missing and they see what field is missing | this error happened and that it was because something was invalid or missing |
| 401 | n/a | n/a |
| 403 | n/a | n/a |
| 404 | the selected check in or journal entries could not be found for the AI Analysis service please try selecting a different one | that this error happened and that it was because the selected item did not exist |
| 409 | a check in or journal entry that was selected changed before the AI Analysis could complete, please try selecting again | that this error happened and that it was because a selection was changed before the AI could complete its process |
| 429 | you have exceeded the limit of 5 AI Analysis requests within the 5 second time limit, please wait a few seconds before making each request | this error happened and that it was because the individual trying to make too many requests all at once |
| 500 | the AI Analysis is presenting its fallback as the service ran into an error, if you want the full experience please try again later but in the meantime here is the altered experience | that this error happen and that the edge function or gemini ai api service ran into an error and the AI Analysis feature went to its fallback |

## 6. Data Model
### Entity: check-in            (serves FR-QUES-01)
Purpose        A set of check-in questions that are completed by a stressed individual is record
  id                        integer         PK          the univeral unique identifier for the specifc check-in
  date                      datetime     NOT NULL    date and time the check-in was completed
  stress_level              integer         NOT NULL    CHECK level ranges from 1-10~ 1: very low stress; 10: very high stress
  mood                      text            NOT NULL    enum: 'happy' | 'angry' | 'sad' | 'frustrated' | 'tense' | 'bored' | 'nervous' | 'worried' | 'calm' | 'scared' | 'lonely' | 'excited' |
  physical_stress_location  text            NULL        (null = unknown stress area present in body) enum: 'jaw' | 'teeth' | 'neck' | 'shoulders/traps' | 'head' | 'stomach' | 'chest' | 'back' | 'hips' | 'arms' | 'legs' | 'hands' | 'feet' | 
  physical_symptoms         text            NULL        (null = no physical symptoms present/known) enum: 'headache' | 'migraine' |  'dizzy' | 'fatigue' | 'upset stomach' | 'racing heart' | 'tense muscles' | 'twitches' | 'shortness of breath' | 'illness' | 'heart palpitations'
  hours_slept               decimal         NULL        (null = unknown/sleep was not tracked)
  water_consumed            decimal         NULL        (null = unknown amount of water consumed)
  eaten_recently            boolean         NOT NULL    true = eaten recently; false = has not eaten recently
  concentration_level       integer         NOT NULL    CHECK level ranges from 1-10~ 1: very to concentrate; very hard to concentrate
  stress_cause              text            NULL        (null = unknown stress cause) enum: 'school' | 'work' | 'time' | 'deadline' | 'finances' | 'relationship' | 'family' | 'argument' | 'loss' | 'health' | 'big change' | 'surroundings' | 'lack of control' | 'overthinking' | 'uncertainty' | 'lonely' | 'procrastination' | 
  stress_duration           integer         NULL        (null = unknown length of time that stress has been happening)
Invariants     I1: a stress level can not be lower than 1 and higher than 10 
               I2: a concentration level can not be lower than 1 and higher than 10 
               I3: each check-in response must have a unique identifier
               I4: every check-in question that is not null must have a response
Relationships  None, nothing relies on another entity
Volume         ~1 row/check-in, ~7 rows/week
Lifecycle      Created when a check-in set is submitted successfully. Possible update when editting though no deletion currently added.

### Entity: journal-entry                (serves FR-JOU-01)
Purpose        A journal entry that is written by a stressed individual is record
  id                        integer         PK          the univeral unique identifier for the specifc journal entry
  date                      datetime     NOT NULL    date and time the journal entry was completed
  entry                     text            NOT NULL    the text that was written into the journal entry
Invariants     I1: every entry can not be blank/empty
               I2: each journal entry must have a unique identifier
Relationships  None, nothing relies on another entity
Volume         ~1 row/journal entry, ~7 rows/week
Lifecycle      Created when a journal entry is submitted successfully. Hard deleted if when editting the entry is updated to being blank/empty.

### Migrations
Mechanism      numbered SQL files applied in order and tracked in a schema_migrations table
Direction      forward-only
Path + runner  migrations/0001-initial.sql, applied by the setup script your Week 14 clean-machine test will execute
Conventions    enums constrained;

## 7. Sequence Flows
### Flow 1 — Add a check in response   (serves FR-QUES-01; money path: used in most areas of the app)
| Step | What can go wrong | System behavior | User sees |
|---|---|---|---|
| 1: Stressed individual submits the check-in response | They forget a field | The system rejects it | A message stating that they need to fill in a missing required field |
| 2: The mobile app sends the submitted check-in response to Expo SQLite | The database doesn't save the response | The app makes the stressed individual resubmit the response | A message stating that submitting failed and to retry submitting in a 5 seconds |
| 3: The mobile app UI updates the Overview page week/month to show the added check-in response | The Overview page does not update with the check-in response right away | The app updates the Overview page with the added check-in response | The graphs on the Overview page with the added check-in response |

### Flow 2 — Prompt AI Analysis for suggestions (serves FR-AIA-01, FR-AIA-04; risky path: the Gemini AI API)
| Step | What can go wrong | System behavior | User sees |
|---|---|---|---|
| 1: Stressed individual selects the specific check-ins and journal entries the want for the Analysis, and then also selects either the suggestion based, explanation or destresting aid prompt | The stressed individual doesn't select at least one 1 both of the check-ins or journal entries | The system rejects it, and logs the error | A message stating that they need to select more check ins or journal entries |
| 2: The mobile app sends the selected check ins, journal entries, and prompt request to the Supabase Edge Function | The request fails to send to the Supabase Edge Function | The keyword fallback happens, and the error is logged | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |
| 3: The Supabase Edge Function sends the request to the Gemini AI API | The Supabase Edge Function takes extra time processing the request before it sends it to Gemini | The Supabase Edge Function finishs processing the request and send it to the Gemini AI API | The user has to wait a bit longer for the AI Analysis |
| 4: The Gemini AI API sends the AI Analysis response to the Supabase Edge Function | The Gemini AI API lags and takes a bit of extra time to return a response | The Edge Function waits until Gemini AI API returns its AI Analysis response | The user sees the AI Analysis response after a bit of time |
| 5: The Supabase Edge Function sends the AI Analysis response to the mobile app | The mobile app takes a bit longer display the AI Analysis response on the UI | The mobile app continues to load until it can display the AI Analysis response | The user sees the AI Analysis response after a bit of time |

### Flow 3 —  AI Analysis Failing (serves NFR-AVA-01; failure path: Gemini AI API is not available)
| Step | What can go wrong | System behavior | User sees |
|---|---|---|---|
| 1: Stressed individual selects the specific check-ins and journal entries the want for the Analysis, and then also selects either the suggestion based, explanation or destresting aid prompt | The stressed individual doesn't select at least one 1 both of the check-ins or journal entries | The system rejects it, and logs the error | A message stating that they need to select more check ins or journal entries |
| 2: The mobile app sends the selected check ins, journal entries, and prompt request to the Supabase Edge Function | The request fails to send to the Supabase Edge Function | The keyword fallback happens, and the error is logged | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |
| 3: The Supabase Edge Function sends the request to the Gemini AI API | The Gemini AI API is not available | The keyword fallback happens, and the error is logged | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |
| 4: The Supabase Edge Function waits for the AI Analysis response | The Gemini AI API does not send a AI Analysis response at all to the Edge Function | The Supabase Edge checks for the AI Analysis, when none is received, an error is logged the error, and the keyword fallback happens | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |
| 5: The Supabase Edge Function sends that Gemini AI API failed to produce an AI Analysis response to the mobile app | The mobile app takes longer to produce a keyword fallback response | The mobile app contuines to load the keyword fallback | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |

## 8. Error Handling and Edge Cases
| Category | Example | Policy |
|---|---|---|
| Invalid input | Missing required check in response | Reject the input and provide a message stating that a required check in is missing |
| Not authorized | A stress individual tries to send a message to the AI API instead of one of the predetermined prompts | Rejects the request and states that they are not allow send something other than one of the predetermined prompts |
| Not found | The selected check in or journal entry is not found | Provide a message stating that the check in or journal entry was not found and to try selecting a different check in or journal entry |
| Conflict | A stressed individual tries to send another AI Analysis prompt request before the first is done | Finish the first request and provide a message stating to send the other one after the first is done if they still want to send it |
| Dependency failure | Gemini AI API is unavailable or fails | Shows the keyword fallback and provides a message stating that this is an alter experience and to try again later for the full experience |
| Exhaustion | Gemini AI API free tier is fully used up | Shows the keyword fallback and provides a message stating that this is an alter experience and to try again later for the full experience |

For every call that leaves this process:
| Call | Timeout (s) | Retries + backoff | Fallback | User is told? |
|---|---|---|---|---|
| The Mobile app calls the Supabase Edge Function | 25 seconds | 0 retries | the keyword fallback | Yes |
| The Supabase Edge Function calls the Gemini API | 20 seconds | 0 retries | the keyword fallback | Yes |

Edge-case register (12+ entries; these become tests in Week 11):
| # | Edge case | Expected behavior | Becomes test |
|---|---|---|---|
| 1 | Empty state: there are no check ins done, first run | The Overview page states that check in responses are needed before results can appear. | Week 11 |
| 2 | Empty state: there are no journal entries done, first run | The AI Analysis page states that more journal entries are needed before the AI Analysis can provide a useful response. | Week 11 |
| 3 | There is exactly one check in done | The Overview page displays the check in in the weekly and monthly graphs | Week 11 |
| 4 | There is exactly one journal done | The AI Analysis can provide a suggestion, an explanation or aid | Week 11 |
| 5 | There are one thousand AI Analysis requests within 5 seconds | The system rejects all the requests and states to request one at a time | Week 11 |
| 6 | Blank journal entry is made | The entry isn't displayed or saved | Week 11 |
| 7 | A journal entry is made with only spaces | The entry isn't displayed or saved | Week 11 |
| 8 | A stress individual tries to submit a check in with none of the required check ins filled in | The system rejects it and states that the required fields must be filled in | Week 11 |
| 9 | The Gemini AI API is unavailable | The keyword fallback is displayed | Week 11 |
| 10 | The Gemini AI API takes to long to process the request | The keyword fallback is displayed  | Week 11 |
| 11 | Various symbols are entered into the journal entry | They should be displayed as they were entered in like | Week 11 |
| 12 | The mobile app is closed before the AI Analysis request is done | The request doesn't continue | Week 11 |

## 9. External and Nondeterministic Dependencies
For an AI component, the prompt contract: purpose, inputs, privacy rule, prompt
template path in this repo, model identifier + date verified, parameters, output
schema + validator, behavior on invalid output, token/latency/cost budget with a
hard cap, the non-AI fallback, and the logging + retention rule.
For any other third party: what you call, cost, limits, behavior when it is down.
| Fact | Value | Source URL | Date checked |
|---|---|---|---|

## 10. Traceability
| Requirement | Priority | Component(s) | Interface(s) | Flow |
|---|---|---|---|---|
Every Must requirement appears here. Every component appears at least once.

## 11. Open Questions and Design Risks
| # | Open question | What it blocks | Owner | Decide by |
|---|---|---|---|---|
An open question with a blocker, an owner, and a date is professional.
An unmarked hole is a landmine.

## 12. Change Log for This Document
| Version | Date | Change | Why |
|---|---|---|---|



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
| `check-ins` | Displays check in questions and records responses | `responses` | database | FR-QUES-01 | 
| `journals` | Provides a journaling spot and records entries | `entries` | database | FR-JOU-01 | 
| `overview` | Displays check in results in weekly and monthly graphs | `graphs` | database, `check-ins` | FR-OVER-01 | 
| `activities` | Provides destressing activities to go through | `activities` | none | FR-ACT-01 | 
| `analysis` | Provides predetermined prompts for suggestions on stress analysis and aids, with a keyword fallback | `analysis` | gemini API, edge function, database, `check-ins`, `journals` | FR-AIA-01, FR-AIA-04, NFR-AVA-01, NFR-PERF-01 | 

Dependency graph is acyclic: yes
Every piece of state has exactly one owner: yes

Reflect: Which test failed first? Almost everyone fails the single-owner test on their first draft. What state did you find with two owners, and what would that have cost you in Week 12?
- I didn't fail any test or find two owners in any row.


## Rep 5 — One complete interface contract, for the one you understand least

### POST /ai-analysis                      (serves FR-AIA-01, FR-AIA-04, NFR-AVA-01, NFR-PERF-01 )
Auth         There are no user accounts
Request      prompt string req · check_ins array req · journal_entries array req
Success      200 { analysis_explanation, activity_suggestions }
Errors       400 invalid_request · 500 ai_service_error
Envelope     {"error":{"code":...,"field":...,"message":...}}  (system-wide)
Idempotency  a repeat can happen and it returns a different AI analysis response 
             every time; the check ins and journal entries stays the same after
Side effects nothing is stored
Limits       check-ins <= 30 per request; journal entries <= 30 per request;
             5 <= requests in 5 seconds

Reflect: What did you have to decide while writing this that you had been quietly leaving open? Name it. That decision is the value of the rep.
- How many check ins and journal entries can go into a request.


## Rep 6 — One error envelope, one status-code policy

Error envelope used system-wide: { "error": { "code": ..., "field": ..., "message": ... } }
Status-code policy - Codes I will use and what each means in THIS system:
  400 __invalid request or input, or missing field (in the check-ins, journal entry, or prompt)__   
  401 __this won't be used in my system as it isn't needed because I don't have user account__
  403 __this won't be used in my system as it isn't needed because I don't have user account__   
  404 __the resource (check-in, journal entry, or AI Analysis prompt) requested does not exist__
  409 __this AI request conflicts with current state of the selected check-ins or journal entries__   
  429 __the amount of AI Analysis requests exceed the limit of requests (5) in the time limit (5 seconds)__
  500 __the AI service or Edge Function ran into an error, or there was a server error__

Error Number | What a user is shown for each | What gets logged | 
|---|---|---|
| 400 | this input or request is invalid and sees the what input or request is invalid in it or this field is missing and they see what field is missing | this error happened and that it was because something was invalid or missing |
| 401 | n/a | n/a |
| 403 | n/a | n/a |
| 404 | the selected check in or journal entries could not be found for the AI Analysis service please try selecting a different one | that this error happened and that it was because the selected item did not exist |
| 409 | a check in or journal entry that was selected changed before the AI Analysis could complete, please try selecting again | that this error happened and that it was because a selection was changed before the AI could complete its process |
| 429 | you have exceeded the limit of 5 AI Analysis requests within the 5 second time limit, please wait a few seconds before making each request | this error happened and that it was because the individual trying to make too many requests all at once |
| 500 | the AI Analysis is presenting its fallback as the service ran into an error, if you want the full experience please try again later but in the meantime here is the altered experience | that this error happen and that the edge function or gemini ai api service ran into an error and the AI Analysis feature went to its fallback |

Reflect: Where were you about to use two different error shapes in the same system, and why did that feel reasonable at the time?
- I was not about to use two different error shapes in the same system as that would create extra complexity


## Rep 7 — The data model, with invariants

### Entity: check-in            (serves FR-QUES-01)
Purpose        A set of check-in questions that are completed by a stressed individual is record
  id                        integer         PK          the univeral unique identifier for the specifc check-in
  date                      datetime        NOT NULL    date and time the check-in was completed
  stress_level              integer         NOT NULL    CHECK level ranges from 1-10~ 1: very low stress; 10: very high stress
  mood                      text            NOT NULL    enum: 'happy' | 'angry' | 'sad' | 'frustrated' | 'tense' | 'bored' | 'nervous' | 'worried' | 'calm' | 'scared' | 'lonely' | 'excited' |
  physical_stress_location  text            NULL        (null = unknown stress area present in body) enum: 'jaw' | 'teeth' | 'neck' | 'shoulders/traps' | 'head' | 'stomach' | 'chest' | 'back' | 'hips' | 'arms' | 'legs' | 'hands' | 'feet' | 
  physical_symptoms         text            NULL        (null = no physical symptoms present/known) enum: 'headache' | 'migraine' |  'dizzy' | 'fatigue' | 'upset stomach' | 'racing heart' | 'tense muscles' | 'twitches' | 'shortness of breath' | 'illness' | 'heart palpitations'
  hours_slept               decimal         NULL        (null = unknown/sleep was not tracked)
  water_consumed            decimal         NULL        (null = unknown amount of water consumed)
  eaten_recently            boolean         NOT NULL    true = eaten recently; false = has not eaten recently
  concentration_level       integer         NOT NULL    CHECK level ranges from 1-10~ 1: very to concentrate; very hard to concentrate
  stress_cause              text            NULL        (null = unknown stress cause) enum: 'school' | 'work' | 'time' | 'deadline' | 'finances' | 'relationship' | 'family' | 'argument' | 'loss' | 'health' | 'big change' | 'surroundings' | 'lack of control' | 'overthinking' | 'uncertainty' | 'lonely' | 'procrastination' | 
  stress_duration           integer         NULL        (null = unknown length of time that stress has been happening)
Invariants     I1: a stress level can not be lower than 1 and higher than 10 
               I2: a concentration level can not be lower than 1 and higher than 10 
               I3: each check-in response must have a unique identifier
               I4: every check-in question that is not null must have a response
Relationships  None, nothing relies on another entity
Volume         ~1 row/check-in, ~7 rows/week
Lifecycle      Created when a check-in set is submitted successfully. Possible update when editting though no deletion currently added.

### Entity: journal-entry                (serves FR-JOU-01)
Purpose        A journal entry that is written by a stressed individual is record
  id                        integer         PK          the univeral unique identifier for the specifc journal entry
  date                      datetime        NOT NULL    date and time the journal entry was completed
  entry                     text            NOT NULL    the text that was written into the journal entry
Invariants     I1: every entry can not be blank/empty
               I2: each journal entry must have a unique identifier
Relationships  None, nothing relies on another entity
Volume         ~1 row/journal entry, ~7 rows/week
Lifecycle      Created when a journal entry is submitted successfully. Hard deleted if when editting the entry is updated to being blank/empty.

Reflect: Which column did you almost make free text that should be constrained? Which nullable column’s meaning did you struggle to state in words? That struggle means two concepts are sharing one column — say what they are.
- At first the column that I almost made free text that should be constrained was the physical symptoms because I almost forgot that I also wanted it to be constrained like how mood was physical_stress_location because I wanted it to be as clear as I could make it to show that sometimes individuals don't know where the stress is highlighted in their body. This strugle showed me that physical stress can result in being both unknown or just not present. 


## Rep 8 — Three sequence flows, and the branch that matters

### Flow 1 — Add a check in response   (serves FR-QUES-01; money path: used in most areas of the app)
| Step | What can go wrong | System behavior | User sees |
|---|---|---|---|
| 1: Stressed individual submits the check-in response | They forget a field | The system rejects it | A message stating that they need to fill in a missing required field |
| 2: The mobile app sends the submitted check-in response to Expo SQLite | The database doesn't save the response | The app makes the stressed individual resubmit the response | A message stating that submitting failed and to retry submitting in a 5 seconds |
| 3: The mobile app UI updates the Overview page week/month to show the added check-in response | The Overview page does not update with the check-in response right away | The app updates the Overview page with the added check-in response | The graphs on the Overview page with the added check-in response |

### Flow 2 — Prompt AI Analysis for suggestions (serves FR-AIA-01, FR-AIA-04; risky path: the Gemini AI API)
| Step | What can go wrong | System behavior | User sees |
|---|---|---|---|
| 1: Stressed individual selects the specific check-ins and journal entries the want for the Analysis, and then also selects either the suggestion based, explanation or destresting aid prompt | The stressed individual doesn't select at least one 1 both of the check-ins or journal entries | The system rejects it, and logs the error | A message stating that they need to select more check ins or journal entries |
| 2: The mobile app sends the selected check ins, journal entries, and prompt request to the Supabase Edge Function | The request fails to send to the Supabase Edge Function | The keyword fallback happens, and the error is logged | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |
| 3: The Supabase Edge Function sends the request to the Gemini AI API | The Supabase Edge Function takes extra time processing the request before it sends it to Gemini | The Supabase Edge Function finishs processing the request and send it to the Gemini AI API | The user has to wait a bit longer for the AI Analysis |
| 4: The Gemini AI API sends the AI Analysis response to the Supabase Edge Function | The Gemini AI API lags and takes a bit of extra time to return a response | The Edge Function waits until Gemini AI API returns its AI Analysis response | The user sees the AI Analysis response after a bit of time |
| 5: The Supabase Edge Function sends the AI Analysis response to the mobile app | The mobile app takes a bit longer display the AI Analysis response on the UI | The mobile app continues to load until it can display the AI Analysis response | The user sees the AI Analysis response after a bit of time |

### Flow 3 —  AI Analysis Failing (serves NFR-AVA-01; failure path: Gemini AI API is not available)
| Step | What can go wrong | System behavior | User sees |
|---|---|---|---|
| 1: Stressed individual selects the specific check-ins and journal entries the want for the Analysis, and then also selects either the suggestion based, explanation or destresting aid prompt | The stressed individual doesn't select at least one 1 both of the check-ins or journal entries | The system rejects it, and logs the error | A message stating that they need to select more check ins or journal entries |
| 2: The mobile app sends the selected check ins, journal entries, and prompt request to the Supabase Edge Function | The request fails to send to the Supabase Edge Function | The keyword fallback happens, and the error is logged | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |
| 3: The Supabase Edge Function sends the request to the Gemini AI API | The Gemini AI API is not available | The keyword fallback happens, and the error is logged | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |
| 4: The Supabase Edge Function waits for the AI Analysis response | The Gemini AI API does not send a AI Analysis response at all to the Edge Function | The Supabase Edge checks for the AI Analysis, when none is received, an error is logged the error, and the keyword fallback happens | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |
| 5: The Supabase Edge Function sends that Gemini AI API failed to produce an AI Analysis response to the mobile app | The mobile app takes longer to produce a keyword fallback response | The mobile app contuines to load the keyword fallback | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |

Reflect: What did the failure branch change about your interface contract from Rep 5 or your data model from Rep 7? If the answer is “nothing,” you drew the flow after deciding instead of to decide — do it again, honestly.
- The failture branch changed my interfact contract because I had to define more about what happens when Gemini fails.


## Rep 9 — The migration decision

1. Migration mechanism: numbered SQL files applied in order and tracked in a schema_migrations table  (tool, or numbered SQL files applied in order and tracked in a schema_migrations table)
2. Forward-only or reversible: forward-only  (forward-only is fine —
   what is not fine is not knowing)
3. Path and runner: migrations/0001-initial.sql , applied by the setup script in the src/lib/database.ts
   (the same script the Week 14 clean-machine test will run)
4. Conventions: enums constrained;

Reflect: What is your plan for the first schema change after you have data you care about? Write the two sentences now, while it is hypothetical and therefore easy to be honest about.
- What my plan is for the first schema change after I have data that I care about, is that I will create another new numbered migration file instead of going back and changing the other older migration file. Then I will also test the newer migration file with a test copy of database before making it permanent.


## Rep 10 — Error policy and the edge-case register

| Category | Example | Policy |
|---|---|---|
| Invalid input | Missing required check in response | Reject the input and provide a message stating that a required check in is missing |
| Not authorized | A stress individual tries to send a message to the AI API instead of one of the predetermined prompts | Rejects the request and states that they are not allow send something other than one of the predetermined prompts |
| Not found | The selected check in or journal entry is not found | Provide a message stating that the check in or journal entry was not found and to try selecting a different check in or journal entry |
| Conflict | A stressed individual tries to send another AI Analysis prompt request before the first is done | Finish the first request and provide a message stating to send the other one after the first is done if they still want to send it |
| Dependency failure | Gemini AI API is unavailable or fails | Shows the keyword fallback and provides a message stating that this is an alter experience and to try again later for the full experience |
| Exhaustion | Gemini AI API free tier is fully used up | Shows the keyword fallback and provides a message stating that this is an alter experience and to try again later for the full experience |

For every call that leaves this process:
| Call | Timeout (s) | Retries + backoff | Fallback | User is told? |
|---|---|---|---|---|
| The Mobile app calls the Supabase Edge Function | 25 seconds | 0 retries | the keyword fallback | Yes |
| The Supabase Edge Function calls the Gemini API | 20 seconds | 0 retries | the keyword fallback | Yes |

Edge-case register (12+ entries; these become tests in Week 11):
| # | Edge case | Expected behavior | Becomes test |
|---|---|---|---|
| 1 | Empty state: there are no check ins done, first run | The Overview page states that check in responses are needed before results can appear. | Week 11 |
| 2 | Empty state: there are no journal entries done, first run | The AI Analysis page states that more journal entries are needed before the AI Analysis can provide a useful response. | Week 11 |
| 3 | There is exactly one check in done | The Overview page displays the check in in the weekly and monthly graphs | Week 11 |
| 4 | There is exactly one journal done | The AI Analysis can provide a suggestion, an explanation or aid | Week 11 |
| 5 | There are one thousand AI Analysis requests within 5 seconds | The system rejects all the requests and states to request one at a time | Week 11 |
| 6 | Blank journal entry is made | The entry isn't displayed or saved | Week 11 |
| 7 | A journal entry is made with only spaces | The entry isn't displayed or saved | Week 11 |
| 8 | A stress individual tries to submit a check in with none of the required check ins filled in | The system rejects it and states that the required fields must be filled in | Week 11 |
| 9 | The Gemini AI API is unavailable | The keyword fallback is displayed | Week 11 |
| 10 | The Gemini AI API takes to long to process the request | The keyword fallback is displayed  | Week 11 |
| 11 | Various symbols are entered into the journal entry | They should be displayed as they were entered in like | Week 11 |
| 12 | The mobile app is closed before the AI Analysis request is done | The request doesn't continue | Week 11 |

Reflect: Which external call did you discover had no timeout at all in your plan? Look up what your client library’s default actually is and write the number down — some defaults are “forever.”
- The external call I discovered had no timeout at all in my plan was techinally the Supabase Edge Function to Gemini AI API. The Supabase Edge Function's default has to set my me, which will be set to 25 seconds.


## Rep 11 — Rewrite the vague specification

FR-12 — Search                           Priority: Must
Owner: search   ·   Depends on: database

Definition  The search feature will use the databases search feature to search through their data, searching for keywords. Results similar to what was search will be returned and displayed as paginated if it goes past 25 rows returned. The search must be able to find results than match no matter the case and state no results found when the search doesn't match anything in the database.
Trigger  The individual submits the search to search for a specific data piece
Behavior
  1. Search through the database for the data entered in
  2. Find the results in the database that match what was searched for
  3. If results are found return the results from the database that match what was searched for and paginate the results
  4. If no results are found state nothing matched
Data  reads database · writes nothing. Search is done by GET /search?word={word}.
Errors  search fails -> retry twice (30s, 300s); on final failure
  show no results and state that something went wrong when searching. Search was invaild. -> state that it was invalid and to retry searching something else.
Edge  searched only spaces -> ignore the spaces -> if a word is added to the spaces search for the word ignoring the spaces
UI  Each page as up to 25 rows. When there is no results found state no matches were found.
Acceptance (Week 11 turns these into tests, verbatim)
  AC-12.1 searching for a keyword -> displays results that has the keyword
  AC-12.2 searching for a keyword where no data has the keyword        -> state that no matches were found
  AC-12.3 searching with different cases    -> search normally that match the keyword ignoring the case
  AC-12.4 search result exceed 25 rows                -> paginate the other rows to another page
OPEN QUESTION (blocks build of `notify`; needed by Week 9)
  Will the search just be keyword or will it be another different type of search? 
  Blocked on what the actual type of search will be used.
  Owner: Katherine Spencer.  Decide by: end of Week 7.

Reflect: Count the decisions you added.
- I added in ~8 decisions.