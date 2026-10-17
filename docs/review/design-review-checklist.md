# Design Review Checklist — Capstone Baseline Gate

Six areas. Answer every item **yes / no / partial**, and write one line of *evidence* — a section number, a requirement id, a table row, a commit. An item with no evidence counts as **no**. These are the same six areas the Design Review Auditor uses.

---

## Area 1 — Requirements complete and traceable

- [ yes ] Every functional requirement has a unique id, an actor, an action, an object, and a condition.
    - requirements.md section #5. Functional Requirements
    - Commit - adadf0b Sep 13, 2026: finished the rest of the functional requirements, added in some more definitions in requirements.md and used the FIND THE HOLES prompt on the functional requirements
    - Commit - 3baf482 Sep 10, 2026: Did two thirds of the functional requirements and added in some definitions
- [ yes ] Every functional requirement has acceptance criteria a stranger could execute without asking you a question.
    - requirements.md section #5. Functional Requirements
    - Commit - adadf0b Sep 13, 2026: finished the rest of the functional requirements, added in some more definitions in requirements.md and used the FIND THE HOLES prompt on the functional requirements
    - Commit - 3baf482 Sep 10, 2026: Did two thirds of the functional requirements and added in some definitions
- [ yes ] Every requirement carries a MoSCoW priority, and the Must set is written down as a list.
    - requirements.md section #5. Functional Requirements
    - Commit - adadf0b Sep 13, 2026: finished the rest of the functional requirements, added in some more definitions in requirements.md and used the FIND THE HOLES prompt on the functional requirements
    - Commit - 3baf482 Sep 10, 2026: Did two thirds of the functional requirements and added in some definitions
- [ yes ] Every non-functional requirement states a metric, a threshold, a condition, and a measurement method.
    - requirements.md section #6. Non-Functional Requirements
    - Commit - 7341467 Sep 18, 2026: Completed rep 8-10 and updated requirements.md with the NFRs and updated the ai-usage.md
- [ yes ] The traceability matrix maps each Must requirement to at least one specification section.
    - traceability-matrix.csv
    - FR-QUES-01,functional,Must,An individual with stress shall be able to complete a check in question that asks about their stress when they open the app,Elicitation Interview with Stella,AddCheckInResponse,T-001,acceptance criteria AC-001..003,planned
    - Commit - 5e1bce8 Sep 19, 2026: milestone-4: NFR's, traceability-matrix, and definition of done
- [ yes ] The traceability matrix maps each Must requirement to at least one planned test.
    - traceability-matrix.csv
    - FR-QUES-01,functional,Must,An individual with stress shall be able to complete a check in question that asks about their stress when they open the app,Elicitation Interview with Stella,AddCheckInResponse,T-001,acceptance criteria AC-001..003,planned
    - Commit - 5e1bce8 Sep 19, 2026: milestone-4: NFR's, traceability-matrix, and definition of done
- [ yes ] No requirement contains the words *user-friendly*, *fast*, *robust*, *intuitive*, *scalable*, or *etc.* without a number attached.
    - requirements.md section #5. Functional Requirements
- [ ] The out-of-scope list exists and names at least three things you are deliberately not building.
    - requirements.md section #7. Out of Scope (the Won't-Have List)
    - A Special Therapist View, Personal To Do Lists, User Accounts, Notifications/Reminders, Pulling sleep data from a watch

## Area 2 — Interfaces fully specified

- [ yes ] Every external interface (HTTP endpoint, CLI command, queue topic, file format) is listed in one place.
    - docs/diagrams/Level2-Containers.png
- [ yes] Each interface names its inputs with types, its outputs with types, and its error responses.
    - architecture.md section #5 Interface Contracts
    - Commit - d3aa388 Oct 2, 2026: completed rep 5-8 and half of rep 9 for the migration decision
- [ yes ] Status codes or exit codes are enumerated, including the failure cases, not just the happy path.
    - architecture.md section #5 Interface Contracts
    - Commit - d3aa388 Oct 2, 2026: completed rep 5-8 and half of rep 9 for the migration decision
    - 200 - the request for the AI Analysis succeeded and it has the response of the analysis_explanation and activity_suggestion | 400 - invalid request or input, or missing field in the check-ins, journal entry, or prompt
- [ yes ] Authentication and authorization are stated per interface, not assumed globally.
    - architecture.md section #5 Interface Contracts
    - Auth - There are no user accounts. Though the Gemini AI API key is kept in Supabase and used to request the Gemini API.
- [ yes ] Every third-party service you call is named with the specific operation you call, and what you do when it is unavailable.
    - architecture.md section #2 System Context (Level 1)
    - docs/diagrams/Level1-Context.png
- [ yes ] Rate limits, quotas, timeouts, and retry behavior are stated as numbers.
    - architecture.md section: #5 Interface Contracts; #8 Error Handling and Edge Cases; #9 External and Nondeterministic Dependencies
- [ yes ] Nothing in the interface section says "handle errors appropriately."
    - architecture.md section #5 Interface Contracts

## Area 3 — Data model sound

- [ yes ] Every entity has a primary key and named attributes with types.
    - architecture.md section: #6 Data Model
    - id integer PK
- [ yes ] Every relationship states its cardinality and what happens on delete.
    - architecture.md section: #6 Data Model
    - Relationships  None, nothing relies on another entity
- [ yes ] Units are explicit for every quantity, duration, money, and measurement field.
    - architecture.md section: #6 Data Model
    - concentration_level integer NOT NULL CHECK level ranges from 1-10~ 1: very to concentrate; very hard to concentrate
- [ yes ] Time fields state a time zone policy and a storage format.
    - architecture.md section: #6 Data Model
    - UTC using ISO 8601 format
- [ yes ] Personal data is identified as such, with a retention and deletion answer.
    - architecture.md section: #6 Data Model
    -  stress_level, date, mood, physical_stress_location, physical_symptoms, hours_slept, water_consumed, eaten_recently, concentration_level, stress_cause, stress_duration, entry
    - Retained for as long as the stressed individual has the app on their phone and deleted when the stressed individual deletes the app
- [ yes ] There is a migration story: how the schema changes after data exists.
    - architecture.md section: #6 Data Model
    - Mechanism: numbered SQL files applied in order and tracked in a schema_migrations table
    - mobile\migrations\001-initial.sql
- [ yes ] At least one worked example row exists for each core entity.
    - mobile\migrations\001-initial.sql

## Area 4 — Risks owned

- [ yes ] Every risk in the register has a likelihood, an impact, a trigger, an owner, and a response.
    - risk-register.md
    - R-01
- [ yes ] The response is an action, not an attitude ("switch to library X" beats "be careful").
    - risk-register.md
    - R-01: mitigate — finish the Analysis fallback (T-5.6) first then work on the AI Analysis (FR-AIA-01, FR-AIA-04) right away afterwards.
- [ yes ] Every technology you have never used before appears as a risk.
    - risk-register.md
    - R-08, R-04
- [ yes ] Every free tier, trial, credit, or borrowed access appears as a risk with an expiry date.
    - risk-register.md
    - R-15
- [ yes ] Every dependency on another human being appears as a risk.
    - There is no dependency on another human
- [ yes ] At least one risk has already had its trigger checked this week, with the result written down.
    - risk-register.md
    - R-07: Gemini AI API free tier data usage terms still only state that they use the data to improve their products

## Area 5 — Definition of done written

- [ yes ] The definition of done is a single list that applies to every requirement.
    - definition-of-done.md section: The checklist
- [ yes ] It names the test evidence required before a requirement counts as done.
    - definition-done.md section: The checklist
    - Every acceptance criterion for that requirement passes, checked by running it — not by reading the code.
    - At least one automated test covers the new behavior, and the whole suite passes locally.
- [ yes ] It names the documentation required before a requirement counts as done.
    - definition-done.md section: The checklist
    - Any behavior change a stranger would need to know is reflected in `README.md`, `CHANGELOG.md`, or `docs/runbook.md`.
    - It traces to a requirement ID in `docs/requirements.md` (or a new requirement was added and the traceability matrix updated).
- [ yes ] It states what "merged" means: branch, review, checks passing.
    - definition-done.md section: The checklist
    - The branch is merged only after the pipeline is green on the merge commit.
- [ yes ] It is achievable in the hours you have — check one Must requirement against it end to end.
    - requirements.md section: #5 Functional Requirements
    - plan.md section: #3 Work breakdown
    - FR-QUES-01, it is achievable in the hours I have
    - WP-1: 12 hours

## Area 6 — Plan within budget

- [ yes ] The work breakdown covers every Must requirement; no Must requirement lacks a task.
    - plan.md section: #3 Work breakdown
- [ yes ] Every task has an estimate produced by a stated method, not a round number guessed at.
    - plan.md section: #3 Work breakdown
    - T-1.1
- [ yes ] The total estimate for the Must set fits inside the hours remaining, with buffer left over.
    - plan.md section: #4 Roll-up
    - plan.md section: #2 Capacity — Weeks 8–16
- [ yes ] The schedule names which week each work package finishes.
    - plan.md section: #5 Schedule
- [ yes ] The hours log is current through this week and matches the calendar.
    - plan.md section: #5 Schedule
    - plan.md section: #2 Capacity — Weeks 8–16
    - docs\calendar\October-updated.png
- [ yes ] Buffer is a named, quantified line in the plan, not the hope of working faster later.
    - plan.md section: #2 Capacity — Weeks 8–16

---

## Entry criteria (the moderator refuses the review without these)

1. All six artifacts are in the repository and pushed.
2. The author has run this checklist over their own package first.
3. No load-bearing section says TBD.
4. The reviewer's brief names the time box and what kind of finding is wanted.

## Exit criteria (you may not declare a baseline until these hold)

1. Every Critical and Major defect has a written disposition.
2. Every rejected finding has a written reason.
3. Rework on Majors is verified, and the verification is recorded.
4. The review report is written, dated, and committed.