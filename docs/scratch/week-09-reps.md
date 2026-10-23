## Rep 1 — Draw the request path, honestly
Which hop is the first no? Were you tempted to write yes for any of them, and what were you telling yourself when you were?
- My first hop that was a no was number 1, the "Client / entry point: Expo/ React Native Analysis page prompting for analysis"
- I not tempted to write yes for any of them because I knew that I needed to get the work done so they definitely couldn't be a yes yet

## Rep 2 — Kill the first mock
How long did it take, versus your Week-7 estimate for the same work?
- 2 hours, which is roughly the same for the estimate that I did.


## Rep 3 — Rewrite five bad commit messages
These are real, and you have written all five. Rewrite each into a subject line under about fifty characters, imperative mood, with a one-sentence body explaining why:

1. fix
    - Fixed the Analysis radio selections layout
    - Updated spacing, padding, and border radius to be consistent across each component 
2. update code
    - Updated the Analysis screen
    - Now allows for clicking of the radio buttons for the Prompt Types
3. WIP
    - Added in Prompt Options
    - Each of the Prompt Options have their own prompt options that can be clicked on and started implementing the ability for the prompt to be requested
4. Final version 2 FINAL
    - Completed the final UI layout
    - Chose the final look for what the app will look like the colors, spacing, and pages
5. changes requested by prof
    - Fixed change requested
    - Comment: Analysis page needs to send the request, allows the page to now send the requests to the API

Then run git log --oneline -20 on your own repository and rewrite — on paper, not with a rebase — the three worst subject lines you find.
Produce: ten rewritten messages in your notes; then use the good form for the rest of the week. Reflect: read your last ten subject lines as a list. Do they read like the changelog of a project or the diary of a tired person? Be specific about what gave it away.

1. completed rep 6-9 for week 7
    - Completed Week 7's Reps 6-9
    - 6, Computing the calibration factor; 7, running the checker; 8, building the capacity table
2. completed weeks 7's 1-5 reps
    - Completed Week 7's Reps 1-5
    - 1, inventory of the invisible work; decomposing one work package; 3, the bad-WBS autopsy; 4, the three point estimates; 5, the spread test
3. updated expo
    - Updated Expo
    - To version 58.0.16
4. testing ci changes
    - Added in the CI
    - Committed to test if the changes work
5. fixed ci
    - Made Edits to CI to fix it
    - CI was missing iOS app bundle
6. fixed week 5-7 comments
    - Fixed Week 5-7 Comments
    - Comments were on: 5, the stack that holds the project together; 6, the techinal specification; 7, the planning of the build- estimates, schedule, and risk
7. updated sql table to reflect the defect that was found in DR-022
    - Updated sql table to reflect the defect that was found in DR-022
    - DR-022 defect revealed that there were missing CHECKS of >= 0 needed for the check_ins table: stress_duration, water_consumed, hours_slept
8. Environment pushing a trivial commit to confirm the whole loop still runs.
    - Environment pushing a trivial commit to confirm the whole loop still runs.
    - Added a space to the week-07-reps.md file to check if the whole loop still runs properly
9. updated the commit to hold the tagged commit number
    - Added the commit number
    -  The baseline.md and  2026-10-18-design-review-report.md holds the tagged (spec-baseline-v1.0) commit number
10. leftover commits that did not get commited
    - The pace-audit.py didn't get commited
    - The file didn't get auto commited when tagging

- Before they read like the diary of tired person because they didn't have much information in them. Now they read like the changelog of a project. What gave it away was the lack in information and clarified detail.

## Rep 4 — Build the script contract
Which script was hardest to write, and what does that tell you about which part of your setup is not actually reproducible yet?
- The setup script was the hardest one to write since I needed to make sure that the url and key was accounted for and I realized I needed to add a seeded data insertion section to the database.ts so that it can insert it when the app launches. Though because I am using SQLite the setup can't complete the entire database setup itself this is  Supabase’s server-side API key still depend on extra steps outside the script. Therefore, it is only really installing the dependencies. Then the part of my setup that is not actually reproducible 

## Rep 5 — The stranger’s machine

Elapsed Time: 3 minutes after I restarted after adding the fixes below

Fixes made:
- Updated the start script Expo Go command so that it doesn't timeout with my connection
- Then updated the README to reflect the tunnel as I have always used start --tunnel to run I just thought it would work the more normal way but tunnel helps because of my network.

How many times did you restart? 
- Once

## Rep 6 — Pin everything

Reflect: if a dependency of yours published a breaking release tonight, would your build still pass tomorrow? Answer with evidence, not optimism.
- The .nvmrc has the pinned version of 22.16.0 now and the npm ci is used for the installs in the lock file, package-lock.json, so my build will still pass tomorrow because a dependency published with a breaking realse would not affect my project as my project will still be using the pinned version. 

## Rep 7 — Ship the pipeline

Reflect: list every failure it took to get green. For each one, say whether it was a real portability problem or a workflow-syntax problem. The first kind is the valuable one — name what your laptop had that a clean machine does not.
- The only failure was that the script files needed to be executables.
- It was a real portability problem as GitHub couldn't identify them as executables 
- My laptop had them marked as executables but GitHub didn't yet

## Rep 8 — Break it on purpose, twice

- I updated calm assert to calmmmmm in the developmentSeed.test.js and it failed properly. The error is in the test file and returned "Error: Process completed with exit code 1." on line 48.
    - red (broke): https://github.com/vPolyBear/capstone/commit/c06f96cd2a4efc1f5216e9a3d062c8ab48b3328c
    - green (fixed): https://github.com/vPolyBear/capstone/commit/f899b8320f2e46b5fdecac3979ab472ea7f8ec45
- I updated a onPress={() => setSelectedPrompt(12345)} to take in a number instead of the string like it is supposed to so the TypeScript lint checks fail. The error is in the lint file line 11 and 12 and returned "Error: app/analysis.tsx(45,58): error TS2345: Argument of type '12345' is not assignable to parameter of type 'SetStateAction string | null'. Error: Process completed with exit code 2."
    - red (broke): https://github.com/vPolyBear/capstone/commit/7ce0a7b62de8f580e2b0169cb6413761da307958
    - green (fixed): https://github.com/vPolyBear/capstone/commit/d2067d6a87ab5a3e8da1a303ddfad9a6440b3548

- It brought me to the error so it didn't really take a scroll if I needed to scroll since the error is at the bottom it would be one scroll

## Rep 9 — Make the skeleton walk in CI

- Passed: SMOKE OK: SQLite database returned the seeded check-in (calm).
- Failed when date store was stopped: SMOKE FAIL: SQLite database file does not exist: Documents/SQLite/does-not-exist.db

Reflect: in one sentence, what exactly does your smoke test prove that a unit test of the same code does not?
- What my smoke test proves that a unit test of the same code does not is proof that the app can be launched and creates the SQLite database; it can also read back the seeded check-in that I had as a unit test won't be able to have the app launch itself and read the seeded data.

