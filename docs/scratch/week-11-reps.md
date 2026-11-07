
## Rep 1 — Scope, out of scope, and six exit criteria

Reflect: Read criterion 6 back. Could a grader check it without you in the room? If not, it is an adjective wearing a number’s clothes — rewrite it.
- Yes, they would be able to check it without me in the room.

## Rep 2 — One acceptance criterion, one test case

TC-007  Verifies: FR-QUES-01-AC2__   Level: unit  Data: __Check in required fields: stress_level, mood, concentration_level filled in and eaten_recently not filled in__
Preconditions: __Check ins can take in and save data__
Steps:  1. __Insert a check in with eaten_recently mssing__  2. __Check if the check in field is missing__  3. __Test that it is rejected__
Expected: __The check in is rejected__ (an observable value, not "it works")
Fails if: __The check in is allowed__ (the specific bug you are hunting)

TC-028  Verifies: FR-JOU-01-AC4   Level: unit   Data: Entry has data or white space "  "
Preconditions: __Journal Entry can take in and save _data__
Steps:  1. __Insert an entry with blank spaces "  "_  2. __Check if an entry has only whitespace_  3. __Test that these are rejected__
Expected: __The entry is rejected__ (an observable value, not "it works")
Fails if: __Whitespace or fully blank entris are allowed__ (the specific bug you are hunting)

TC-063  Verifies: FR-AIA-01-AC4   Level: unit   Data: _No check ins and one journal entries selected: "School is stressful right now"_
Preconditions: __The Analysis can taken in check ins and journal entries, checking if they are there__
Steps:  1. __Insert no check ins but one journal entry__  2. __Check if the check in and journal entry are there__  3. __Test that the analysis request is rejected__
Expected: __The analysis request is rejected__ (an observable value, not "it works")
Fails if: __The analysis request is allowed to be sent through__ (the specific bug you are hunting)

Reflect: Which of the three was hardest to write, and why? A criterion you cannot turn into a test case is usually a criterion that was never testable — that is a Week-3 defect you just found for free.
- Out of the three the hardest one to write was the first one because I was trying to fully understand what was expected and wanted from these test cases.

## Rep 3 — Partitions and boundaries
Take one requirement that contains a number, a date, a length, or a count. Produce the full partition table, then write a test at every boundary value.

FR-JOU-01 AC-1
- Journal Entry written then viewed in the list of the other entry

| Partition | Representative | Boundary values worth a test |
|-----|------|---------|
| below the range | Displays in 5 seconds | Displays in 14 seconds |
| inside the range | Displays in 15 seconds | Displays in 15 seconds |
| above the range | Displays in 25 seconds | Displays in 16 seconds |
| absent / null | Isn't Displayed | null |

## Rep 6 — Three families of test data

  - seed --set happy -> 12 records
  - seed --set boundary -> 10 records (empty, one, max, zero, negative, earliest, latest)
  - seed --set hostile -> 12 records (unicode, emoji, apostrophes, 10000 chars, injection strings, path traversal, wrong file type)

## Rep 8 — Triage ten defects with a real deadline

FIX ORDER (in the hours you actually have left):
  1. __DEF-004__  2. __DEF-005__  3. __DEF-006__  4. __DEF-007__  5. __DEF-009__  6. __DEF-010__  7. __DEF-008__

SHIPS WITH KNOWN DEFECTS (with the workaround a user needs):
  __DEF-001__  workaround: just wait for the AI Analysis to load
  __DEF-002__  workaround: just wait for the Analysis to load and fail to see the toast
  __DEF-003__  workaround: just wait for the Analysis to load and fail to see the predetermined fallback

Reflect: Which defect did you want to fix that you cannot? Write one sentence defending the decision to a user who is affected by it. If you cannot write that sentence, re-triage — you got the priority wrong.
- The AI Analysis timing seems very unlikely that I will get to it to fix. I really wanted it to be quicker but I haven't been successful yet. If time somehow remain I will try to fix it again, otherwise, this known defect will have to ship. To the user that is affected by it I'm sorry that I couldn't make the AI respond faster, you'll have to wait a bit for now to get a response, it was a goal but it seems unlikly at this point in time.

## Rep 12 — The pesticide check

Reflect: How many defects did a green suite fail to catch? Beizer’s pesticide paradox says the bugs your existing methods can find are already gone.
- 7