# Technical Specification — Stress Manager

Version: v0.3   Date: 2026-10-16   Author: Katherine Spencer   Status: Baselined
Requirements baseline this design satisfies: docs/requirements.md v1.3

## 1. Purpose and Scope

This system is for stressed individuals who need help managing their stress. To help them with this the system provides check-ins, journal entries, an overview of their stress over the week and month, destressing activities, and an AI Analysis for a suggestion based explanation for their stress or destressing activities. From these features the goal is to help individuals not only better understand their stress but also find ways that help them best to deal with their stress.

In scope: FR-QUES-01, FR-JOU-01, FR-OVER-01, FR-ACT-01, FR-AIA-01, FR-AIA-04, FR-JOU-02, NFR-PERF-01, NFR-REL-01, NFR-AVA-01, NFR-SEC-01, NFR-SEC-02, NFR-PRIV-01, NFR-PRIV-02, NFR-ACC-01, NFR-ACC-02, NFR-USE-01, NFR-USE-02, NFR-MNT-01, NFR-PORT-02
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
| Mobile app | Takes in the stressed individuals checks ins to create an overview then also takes in their journal entries using both for the AI Analysis, then has activity options, all present on the UI in Expo Go. | Expo + React Native | on the stressed individuals mobile device | no |
| Local Relational Database | Stores the check ins and journal entries locally on the stressed individuals device | Expo SQLite | on the stressed individuals mobile device | no |
| Edge Function | Provides a place to securely store the Gemini API key and receives the AI Analysis requests, calls the Gemini API, and returns the AI analysis response back | Supabase Edge Function | Supabase Edge Runtime (server-side function) | yes, the Gemini API key |
| API service | Provides a suggestion based explanation for the stressed individuals stress or a suggestion for a destressing aid when prompted with a predetermined prompt | Gemini AI API | Google's servers | no |

Trust boundary: The trust boundary is between the mobile app and the edge function as the mobile app and local relational database run on the user's machine and the edge function holds the secrets on a server and API service runs on Google's servers (NFR-SEC-01).

## 4. Components (Level 3 — for the container with the hard part only)
Diagram: docs/diagrams/Level3-Components.png
| Component | Responsibility (verb first) | Owns (state) | Depends on | Serves (req IDs) |
|---|---|---|---|---|
| `check-ins` | Displays check in questions and records responses | `responses` | database | FR-QUES-01, NFR-ACC-01, NFR-ACC-02, NFR-MNT-01, NFR-REL-01, NFR-PORT-02, NFR-USE-01, NFR-USE-02 | 
| `journals` | Provides a journaling spot and records entries | `entries` | database | FR-JOU-01, NFR-ACC-01, NFR-ACC-02, NFR-MNT-01, NFR-REL-01, NFR-PORT-02, NFR-USE-01, NFR-USE-02, FR-JOU-02 | 
| `overview` | Displays check in results in weekly and monthly graphs | `graphs` | database, `check-in` | FR-OVER-01, NFR-ACC-01, NFR-ACC-02, NFR-MNT-01, NFR-REL-01, NFR-PORT-02 | 
| `activities` | Provides destressing activities to go through | `activities` | none | FR-ACT-01, NFR-ACC-01, NFR-ACC-02, NFR-MNT-01, NFR-REL-01, NFR-PORT-02 | 
| `analysis` | Provides predetermined prompts for suggestions on stress analysis and aids, with a keyword fallback | `analysis` | gemini API, edge function, database, `check-ins`, `journals` | FR-AIA-01, FR-AIA-04, NFR-AVA-01, NFR-PERF-01, NFR-ACC-01, NFR-ACC-02, NFR-MNT-01, NFR-REL-01, NFR-SEC-01, NFR-SEC-02, NFR-PRIV-01, NFR-PRIV-02, NFR-PORT-02, NFR-USE-01 | 

Dependency graph is acyclic: yes
Every piece of state has exactly one owner: yes

## 5. Interface Contracts

### POST /sendAnalysis                        (serves FR-AIA-01, FR-AIA-04, NFR-AVA-01, NFR-PERF-01, NFR-SEC-02, NFR-PRIV-01, NFR-PRIV-02)
Purpose      To request an AI Analysis suggestion explanation or aid based on the selected check ins, journal entries, and the predetermined prompt
Auth         There are no user accounts. Though the Gemini AI API key is kept in Supabase and used to request the Gemini API.
Request      prompt string req · check_ins array req · journal_entries array req
Success      200 { "analysis_explanation": string, required, 1–999 chars,
                   "activity_suggestion": string, required, 1–999 chars }
                   the response is validated before it is returned and when
                   invalid it uses the keyword fallback
Errors       400 invalid_request · 409 changed_data · 429 rate_limited · 500 ai_service_error
Envelope     {"error":{"code":...,"field":...,"message":...}}  (system-wide)
Idempotency  a repeat can happen and it returns a different AI analysis response 
             every time; the check ins and journal entries stays the same after
Side effects nothing is stored
Limits       check-ins <= 30 per request; journal entries <= 30 per request;
             max 5 requests in 5 seconds; if the Gemini API call exceeds 20 seconds and overall AI Analysis request process exceeds 25 seconds,
             retry once if the validator fails using the same timings then use the keyword fallback if it fails and provide a messgae that the request failed but the fallback is returning a response

- If just either the analysis_explanation or the activity_suggestion is required to be return based on the prompt picked then the response not returned/required to be returned, returns with, no suggested explanation or activity requested

Error envelope used system-wide: { "error": { "code": ..., "field": ..., "message": ... } }
Status-code policy- Codes I will use and what each means in THIS system:
  200 __the request for the AI Analysis succeeded and it has the response of the analysis_explanation and activity_suggestion__ 
  400 __invalid request or input, or missing field in the check-ins, journal entry, or prompt__   
  401 __this won't be used in my system as it isn't needed because I don't have user accounts__
  403 __this won't be used in my system as it isn't needed because I don't have user accounts__   
  404 __this won't be used in my system because check-ins and journal entries are stored in SQLite so the Edge Function can't itself verify if they are there or not__
  409 __the selected check-ins or journal entries changed before the AI Analysis request finished__   
  429 __the amount of AI Analysis requests exceed the limit of requests (5) in the time limit (5 seconds)__
  500 __the AI service or Edge Function ran into an error, or there was a server error__

Error Number | What a user is shown for each | What gets logged | 
|---|---|---|
| 400 | this input or request is invalid and sees the what input or request is invalid in it or this field is missing and they see what field is missing | this error happened and that it was because something was invalid or missing |
| 401 | They won't be shown anything because I don't have user accounts | Nothing needs to be logged because I don't have user accounts |
| 403 | They won't be shown anything because I don't have user accounts | Nothing needs to be logged because I don't have user accounts |
| 404 | the selected check in or journal entries could not be found for the AI Analysis service please try selecting a different one | that this error happened and that it was because the selected item did not exist |
| 409 | a check in or journal entry that was selected changed before the AI Analysis could complete, please try selecting again | that this error happened and that it was because a selection was changed before the AI could complete its process |
| 429 | you have exceeded the limit of 5 AI Analysis requests within the 5 second time limit, please wait a few seconds before making each request | this error happened and that it was because the individual trying to make too many requests all at once |
| 500 | the AI Analysis is presenting its fallback as the AI Analysis could not be completed, if you want the full experience please try again later but in the meantime here is the altered experience | that this error happen and that the edge function or gemini ai api service ran into an error and the AI Analysis feature went to its fallback |

- Errors log the type of error, when it happened, and what the request was that caused the error

## 6. Data Model
### Entity: check-in            (serves FR-QUES-01)
Purpose        A set of check-in questions that are completed by a stressed individual is recorded
  id                        integer         PK          the universal unique identifier for the specific check-in
  date                      text     NOT NULL    date and time the check_in was completed; UTC using ISO 8601 format
  stress_level              integer         NOT NULL    CHECK level ranges from 1-10~ 1: very low stress; 10: very high stress
  mood                      text            NOT NULL    enum: 'happy' | 'angry' | 'sad' | 'frustrated' | 'tense' | 'bored' | 'nervous' | 'worried' | 'calm' | 'scared' | 'lonely' | 'excited' |
  physical_stress_location  text            NULL        (null = unknown stress area present in body) enum: 'jaw' | 'teeth' | 'neck' | 'shoulders/traps' | 'head' | 'stomach' | 'chest' | 'back' | 'hips' | 'arms' | 'legs' | 'hands' | 'feet' | 
  physical_symptoms         text            NULL        (null = no physical symptoms present/known) enum: 'headache' | 'migraine' |  'dizzy' | 'fatigue' | 'upset stomach' | 'racing heart' | 'tense muscles' | 'twitches' | 'shortness of breath' | 'illness' | 'heart palpitations'
  hours_slept               decimal         NULL        (null = unknown/sleep was not tracked) range: >= 0 hours per day
  water_consumed            decimal         NULL        (null = unknown amount of water consumed) range: >= 0 water bottles per day
  eaten_recently            boolean         NOT NULL    true = eaten recently; false = has not eaten recently
  concentration_level       integer         NOT NULL    CHECK level ranges from 1-10~ 1: very easy to concentrate; very hard to concentrate
  stress_cause              text            NULL        (null = unknown stress cause) enum: 'school' | 'work' | 'time' | 'deadline' | 'finances' | 'relationship' | 'family' | 'argument' | 'loss' | 'health' | 'big change' | 'surroundings' | 'lack of control' | 'overthinking' | 'uncertainty' | 'lonely' | 'procrastination' | 
  stress_duration           integer         NULL        (null = unknown length of time that stress has been happening) range: >= 0 hours
Invariants     I1: a stress level can not be lower than 1 and higher than 10 
               I2: a concentration level can not be lower than 1 and higher than 10 
               I3: each check-in response must have a unique identifier
               I4: every check-in question that is not null must have a response
Relationships  None, nothing relies on another entity
Volume         ~1 row/check-in, ~7 rows/week
Lifecycle      Created when a check-in set is submitted successfully. Possible update when editing though no deletion currently added.

- For all enum fields there can be multiple picked and stored
- The time is coverted to the stressed individuals device's current timezone when displaying the check-ins and then the check ins are grouped to week/months before they are displayed.

### Entity: journal-entry                (serves FR-JOU-01, FR-JOU-02)
Purpose        A journal entry that is written by a stressed individual is recorded
  id                        integer         PK          the universal unique identifier for the specific journal entry
  date                      text     NOT NULL    date and time the journal entry was completed;  UTC using ISO 8601 format
  entry                     text            NOT NULL    the text that was written into the journal entry
Invariants     I1: every entry can not be blank/empty
               I2: each journal entry must have a unique identifier
Relationships  None, nothing relies on another entity
Volume         ~1 row/journal entry, ~7 rows/week
Lifecycle      Created when a journal entry is submitted successfully. Hard delete if when editing the entry is updated to being blank/empty.

### Migrations
Mechanism      numbered SQL files applied in order and tracked in a schema_migrations table
Direction      forward-only
Path + runner  migrations/0001-initial.sql, applied by the setup script your Week 14 clean-machine test will execute
Conventions    enums constrained;

- The time is coverted to the stressed individuals device's current timezone when displaying the entries

Personal Data:
 -  stress_level, date, mood, physical_stress_location, physical_symptoms, hours_slept, water_consumed, eaten_recently, concentration_level, stress_cause, stress_duration, entry
 - Retained for as long as the stressed individual has the app on their phone and deleted when the stressed individual deletes the app

## 7. Sequence Flows
### Flow 1 — Add a check in response   (serves FR-QUES-01, FR-OVER-01; money path: used in most areas of the app)
| Step | What can go wrong | System behavior | User sees |
|---|---|---|---|
| 1: Stressed individual submits the check-in response | They forget a field | The system rejects it | A message stating that they need to fill in a missing required field |
| 2: The mobile app sends the submitted check-in response to Expo SQLite | The database doesn't save the response | The app makes the stressed individual resubmit the response if the answers are still there otherwise it will make the stressed individual redo the check-in question | A message appears stating that submitting failed and to retry submitting or redoing the check-ins again in a 5 seconds |
| 3: The mobile app UI updates the Overview page week/month to show the added check-in response | The Overview page does not update with the check-in response right away or fails to update it | The app updates the Overview page with the added check-in response or just shows the same graphs as they were before | The graphs on the Overview page with the added check-in response or they see the past graphs with a message stating the graphs could not update |

### Flow 2 — Prompt AI Analysis for suggestions (serves FR-AIA-01, FR-AIA-04, NFR-PRIV-01, NFR-PRIV-02, NFR-SEC-01, NFR-PERF-01; risky path: the Gemini AI API)
| Step | What can go wrong | System behavior | User sees |
|---|---|---|---|
| 1: Stressed individual selects the specific check-ins and journal entries the want for the Analysis, and then also selects either the suggestion based, explanation or destressing aid prompt | The stressed individual doesn't select at least one 1 both of the check-ins or journal entries | The system rejects it, and logs the error | A message stating that they need to select more check ins or journal entries |
| 2: The mobile app sends the selected check ins, journal entries, and prompt request to the Supabase Edge Function | The request fails to send to the Supabase Edge Function or the Supabase Edge Function is down | The keyword fallback happens, and the error is logged | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |
| 3: The Supabase Edge Function sends the request to the Gemini AI API | The Supabase Edge Function takes the longest it can before it times out processing the request before it sends it to Gemini | The Supabase Edge Function finishes processing the request and sends it to the Gemini AI API | The user has to wait a bit longer for the AI Analysis |
| 4: The Gemini AI API sends the AI Analysis response to the Supabase Edge Function | The Gemini AI API lags and takes a bit of extra time to return a response | The Edge Function waits until Gemini AI API returns its AI Analysis response | The user sees the AI Analysis response after a bit of time |
| 5: The Supabase Edge Function sends the AI Analysis response to the mobile app | The mobile app takes a bit longer display the AI Analysis response on the UI | The mobile app continues to load until it can display the AI Analysis response | The user sees the AI Analysis response after a bit of time |

### Flow 3 —  AI Analysis Failing (serves NFR-AVA-01, NFR-SEC-02; failure path: Gemini AI API is not available)
| Step | What can go wrong | System behavior | User sees |
|---|---|---|---|
| 1: Stressed individual selects the specific check-ins and journal entries the want for the Analysis, and then also selects either the suggestion based, explanation or destressing aid prompt | The stressed individual doesn't select at least one 1 both of the check-ins or journal entries | The system rejects it, and logs the error | A message stating that they need to select more check ins or journal entries |
| 2: The mobile app sends the selected check ins, journal entries, and prompt request to the Supabase Edge Function | The request fails to send to the Supabase Edge Function or it takes too long | The keyword fallback happens, and the error is logged | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |
| 3: The Supabase Edge Function sends the request to the Gemini AI API | The Gemini AI API is not available | The keyword fallback happens, and the error is logged | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |
| 4: The Supabase Edge Function waits for the AI Analysis response | The Gemini AI API does not send a AI Analysis response at all to the Edge Function | The Supabase Edge checks for the AI Analysis, when none is received, an error is logged the error, and the keyword fallback happens | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |
| 5: The Supabase Edge Function sends that Gemini AI API failed to produce an AI Analysis response to the mobile app | The mobile app takes longer to produce a keyword fallback response | The mobile app continues to load the keyword fallback | A message stating that the AI Analysis can not happen at this time, if you want the full experience please try again later but in the meantime here is the altered experience |

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
| 10 | The Gemini AI API takes too long to process the request | The keyword fallback is displayed  | Week 11 |
| 11 | Symbols are entered into the journal entry | They should be displayed as they were entered in like | Week 11 |
| 12 | The mobile app is closed before the AI Analysis request is done | The request doesn't continue | Week 11 |

## 9. External and Nondeterministic Dependencies
For an AI component, the prompt contract: purpose, inputs, privacy rule, prompt
template path in this repo, model identifier + date verified, parameters, output
schema + validator, behavior on invalid output, token/latency/cost budget with a
hard cap, the non-AI fallback, and the logging + retention rule.
| Fact | Value | Source URL | Date checked |
|---|---|---|---|
| purpose | FR-AIA-01, FR-AIA-04 (It will be able to provide an individual with a suggestion based explanation for stress and destressing aids which will be able to help an individual understand their stress better and destressing ways that may better helper them with their stress)  | requirements.md | 2026-10-04 |
| inputs | The selected check ins (from the check_ins table), journal entries (from the journal_entries tables), and the predetermined prompt; in the order it is selected in, so first the prompt then either the check ins or journal entries in the order they are selected in | requirements.md | 2026-10-04 |
| privacy rule | The AI Analysis request will only take in what the user selected to be sent no other unrelated data will be analysis by the Gemini AI API (NFR-PRIV-01, NFR-PRIV-02) | requirements.md | 2026-10-04 |
| prompt template path in this repo | mobile/prompts/suggest-analysis-v1.txt | n/a | 2026-10-04 |
| model identifier + date verified | gemini-3.6-flash | https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/guides/gemini-3-6-flash | 2026-10-04 |
| parameters | "Custom values for temperature, top-k, or top-p parameters are no longer supported. Setting custom values will be ignored in the API surface. Use thinking_level or structured JSON schemas to control output determinism instead" maximum output length: 65,536 (I would set my maximum to 1,000), stop condition: when the model completes the analysis or when the maximum tokens are hit |  https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/guides/gemini-3-6-flash | 2026-10-04 |
| output schema + validator | the analysis response is what I require back from the Gemini AI API the schema which would have in the analysis_explanation and the activity_suggestion, the validator would check that the response is a proper structured JSON with both of the results in it, if the validator fails then retry once with a repair instruction, then use the fallback if it still isn't right. | requirements.md | 2026-10-04 |
| behavior on invalid output | Use the keyword fallback | requirements.md | 2026-10-04 |
| token/latency/cost budget with a hard cap | tokens per call: 1,000 max; latency: target p50/p95 under 25 seconds; $0.00375 (cost per call) × 20 max (calls per day) = $0.075 day; hard cap: $0.075 day | requirements.md & https://ai.google.dev/gemini-api/docs/pricing?authuser=1| 2026-10-04 |
| the non-AI fallback | A word based search over the journal entries searching for frequent keywords written | requirements.md | 2026-10-04 |
| the logging + retention rule | there are predetermined prompts and they selected their own check ins and journal entries they want and the AI Analysis responses is not recorded, only errors are logged for 7 days, read only by the maintainer | requirements.md | 2026-10-04 |

Note: The token counting can greatly vary depending on the call but since my calls will generally be lighter I suspect that the max amount of tokens used would be 1,000 per call.

## 10. Traceability
| Requirement | Priority | Component(s) | Interface(s) | Flow |
|---|---|---|---|---|
| FR-QUES-01 | Must | `check-ins` | Stores (INSERT(s)) and retrieves (SELECT(s)) the data from the SQLite database | Flow 1 - Add a check in response |
| FR-OVER-01 | Must | `overview` | Retrieves (SELECT(s)) the data from the SQLite database | Flow 1 - Add a check in response (the overview page is updated and the added check ins can be viewed) |
| FR-JOU-01 | Must | `journals` | Stores (INSERT(s)) and retrieves (SELECT(s)) the data from the SQLite database | Add in a journal entry |
| FR-JOU-02 | Should | `journals` | Retrieves (INSERT(s)) and updates (UPDATE(s)) the data from the SQLite database | Edit a journal entry |
| FR-ACT-01 | Must | `activities` | The activities are stored in the mobile apps interface | Uses an activity |
| FR-AIA-01 | Must | `analysis` | POST /sendAnalysis | Flow 2 - Prompt AI Analysis for suggestions |
| FR-AIA-04 | Must | `analysis` | POST /sendAnalysis | Flow 2 - Prompt AI Analysis for suggestions |
| NFR-ACC-01 | Must | `check-ins`,`journals`,`overview`,`activities`,`analysis` | Shown on the mobile app UI | Going through the app testing the UI appearance |
| NFR-ACC-02 | Must | `check-ins`,`journals`,`overview`,`activities`,`analysis` | Shown on the mobile app UI | Shown on the mobile app UI | Going through the app testing the states and messages appearance |
| NFR-MNT-01 | Must | `check-ins`,`journals`,`overview`,`activities`,`analysis` | REAME/clean clone | The README is used to create a clean clone of the repository |
| NFR-REL-01 | Must | `check-ins`,`journals`,`overview`,`activities`,`analysis` | Start of the app | Starting the app the exceptions and errors are handled  |
| NFR-AVA-01 | Must | `analysis` | POST /sendAnalysis | Flow 3 —  AI Analysis Failing |
| NFR-PERF-01 | Must | `analysis` | POST /sendAnalysis | Flow 2 - Prompt AI Analysis for suggestions |
| NFR-SEC-01 | Must | `analysis` | Github commits/secrets | Flow 2 - Prompt AI Analysis for suggestions |
| NFR-SEC-02 | Must | `analysis` | POST /sendAnalysis | Flow 3 —  AI Analysis Failing |
| NFR-PRIV-01 | Must | `analysis` | POST /sendAnalysis | Flow 2 - Prompt AI Analysis for suggestions |
| NFR-PRIV-02 | Must | `analysis` | POST /sendAnalysis | Flow 2 - Prompt AI Analysis for suggestions |

Deferred: FR-ACT-02, FR-ACT-03, FR-AIA-02, FR-AIA-03, FR-JOU-03, FR-JOU-04, FR-JOU-05, FR-OVER-02, FR-OVER-03, FR-QUES-02, FR-QUES-03, FR-QUES-04, NFR-PORT-01, NFR-PORT-03

## 11. Open Questions and Design Risks
| # | Open question | What it blocks | Owner | Decide by |
|---|---|---|---|---|
| 1 | Will Expo/React Native be able to send a prompt and receive a response from Supabase Edge Function? | n/a | Katherine Spencer | 2026-10-28 |
| 2 | Will the Supabase Edge Function be able to send a prompt and receive back from Gemini API? | n/a | Katherine Spencer | 2026-10-28 |
| 3 | Will the Supabase Edge Function be able to safely access the Gemini API key? | n/a | Katherine Spencer | 2026-10-28 |

## 12. Change Log for This Document
| Version | Date | Change | Why |
|---|---|---|---|
| v0.1 | 2026-10-04 | technical specification | created the architecture document |
| v0.2 | 2026-10-13 | comment edits | small missing edits and findings needed to be deferred or added to this document |
| v0.3 | 2026-10-16 | Refining edits and defects fixed | After going through the walkthrough, checklist, and the assistant go through I found some defects that needed to be updated |
