# ai-usage

# AI Usage Log — Capstone Project

<!--
  Milestone 1 template. Copy this file into your repository as docs/ai-usage.md.
  The policy header is written ONCE, in Week 1, before you need it. The table
  grows one row per Amber-zone use, all semester, written the day it happens.
  This file is a required artifact in the Week 16 submission.
-->

**Owner:** Katherine Spencer · **Policy set:** <2026-08-26> · **Last entry:** <2026-09-22>

## Policy

**Spine rule.** The human stays in the loop where the judgment lives. AI accelerates;
I decide, I verify, and I am accountable for everything in this repository.

**The line I do not cross.** I will not delegate a judgment I cannot defend. If I
cannot explain a decision in this repository in my own words, under questions,
without the tool in front of me, it does not go in.

### Tools I have decided to use

| Tool / product | Model or version, as best I can name it | What I will use it for | What I will never use it for |
|---|---|---|---|
| Copilot | Agent/Plan/Ask - Auto | I will ask it questions if I'm confused about something and ensure that I fully understand the answers it provides. I will plan with it a component that I have in mine and somewhat know how to do, discussing with it and revising the plan. I will also ask it to make the component I already somewhat know how to make but I will edit and fix what it provides me, fully understanding what it did line by line, and change it if I can't understand it or if it is beyond my scope | I will never have it make a plan for me and then not work to understand the plan. I will not ask it to make something then not understand it at all or be unable to defend it. I will not make it write statements for me or have others do work for me and then use it as my own |
| ChatGPT | GPT-5.6 Luna | I will use ChatGPT in the same way I do Copilot as listed above | I will follow the same principles as what I will not use for ChatGPT as I do Copilot as listed above |

### Zones

| Zone | Covers | What I owe |
|---|---|---|
| Green (assistive) | error-message explanation, reformatting, grammar, boilerplate I fully understand, rubber-ducking a design I already drafted | nothing; work normally |
| Amber (generative) | drafted requirements, scaffolded code I keep, generated tests, proposed architecture, documentation prose | one row in the table below, the day it happens |
| Red (prohibited) | generated decision records, memos, or reflections submitted as mine; a choice I cannot defend; another person's private data or a classmate's unsubmitted work; code I cannot explain line by line | do not |

### Disclosure

Every Amber-zone use appears below. Generated code that survives into `src/` carries a
comment naming the date of the log entry that covers it. Nothing in `docs/adr/`, the
memos, or the reflections is generated text.

## Entries

| Date | Tool / model | What I asked | What I kept | What I changed | How I verified |
|---|---|---|---|---|---|
| 2026-08-27 | Copilot - Auto | How would I approach making a .gitignore file for a React Native app using Expo and TypeScript | I kept dependencies, expo, build output, typeScript cache, and the local environment ignore files that it created | I removed any extra unnecessary files, those being one local environment file line it added, a python file, and c# files it added. I added a logs, testing and coverage, operating-system files, and VS Code file ignores. | I researched what each line did to see if it was necessary for my project and researched ones that may be good to have |
| 2026-08-27 | Copilot - Auto | Create for me a personal weekly calendar for 15 hours a week, blocked into sessions, with the milestone due dates marked based on this sixteen-week table from §1.2 | I kept the main struture of the calendar. Keeping the week number, phase, hat, milestone/checkpoint, and artifact(s)  | I changed how it laid out the times, adding the exact time to work each day instead of outside on an overall table and I added broken weeks of 8 and 14. Then I fixed the messed up dates. | I verified this calendar was right by comparing it to my real calendar and checked to ensure the total hours and dates were correct again |
| 2026-09-04 | Copilot - Auto | It is Week 16. This project failed and I am writing the post-mortem. Give me the three most likely causes, in order of probability, each with the earliest week it would have become visible. | I kept the main struture that each created for both the failure and trigger sections. I kept 1 of the weeks it said. | Though I had to change and remove a lot of sentences, words, and excess file names as it made it messy, I had to change 2 of the weeks it said as it didn't know when something would actually start | How I verified that these changes and what it said were right was by double checking chapter 1 and the calendar to ensure that the weeks and what could go wrong were true | 
| 2026-09-12 | Copilot - Auto | Here are my 18 functional requirements. Do not rewrite them. List every situation a user could get into that none of these requirements covers, and for each, name the identifier that should have covered it | I kept the main idea of each hole provided and only kept one fifth of the general ideas | I changed the whole sentence struture to fit the idea but used my orginal words and made the ideas align will my other given answers, and I only needed to generally add submission and data saving given worse case points | How I verified these changes was by ensuring they aligned with my goals for the functional requirement, I checked they aligned with the other functional requirement responses to ensure proper and non repeated responses, and I checked with the check_requirement.py to ensure no errors | 
| 2026-09-18 | Copilot - Auto | Here is the functional requirements section of my capstone project, plus my one-paragraph project charter. Act as a skeptical senior engineer reviewing this before a design review. List the NON-FUNCTIONAL requirements and external obligations I have not written down. For each: name the category; say what about MY project triggers it; propose a measurable target with metric, threshold, condition, and measurement method; and flag anything I must verify against a primary source. Do not invent vendor limits, prices, license terms, or regulations — where a claim depends on one, say "verify" and name the source I should read. | I kept the general idea for the non functional requirements and obligations and I only kept 1/3 of what it outputted for the non functional requirements (7 out of the 21) and 1/4 of the obligations (2 out of the 8) as many ideas it provided did not align with the goals for my project such as data deletation | I changed every sentences structure and a lot of the words in each sentence, and for the majoirty I basically had to change every single thing to make it sound not so general, off, or so they fit the structure and gist of my other non functional requirements | How I verified these changes was by ensuring they aligned with my goals, I checked they were not repeated non functional requirements, and I checked they fit the requirements had a metric, threshold, and condition | 
| 2026-09-22 | ChatGPT - GPT-5.6 Luna | For a solo developer building a stress management app with check ins, journal entries, weekly and monthly overviews, and ai analysis, there are over about 200 remaining hours, list eight options for data store. Include at least two that are unfashionable. For each: one sentence on what it is best at, and one sentence on its most common failure mode. Do not recommend one. | I kept the 8 data stores it presented me, keeping the main idea of many of the failures or what they are best at, keeping key words but changing or editing many of the other sentences. | I changed the rest of the main structures and I didn't keep many of the bests or failures | How I verified these changes was by checking that the 8 ideas it presented me were proper and real. I researched each claim going to their documentatioin and researching those thoroughly that I did not know and I compared each against the one that I previously researched to see how they compared. The AI had a 4/5 hit rate as it got Realm / Atlas Device SDK wrong as it technically can do anything as it is being deprecated so it can't be an option | 
| 2026-10-03 | ChatGPT - GPT-5.6 Luna | I have the sql table and I understand how to create a table and general things in SQLite I just need help understanding/doing the setting up and testing the migrations for my Stress Manager app. | I kept the idea to create the database.ts file and how it tested the migration | I changed the rest of the tables to match the tables that I layed out earlier as it did not create the tables properly, I got rid of a lot of the extra SQL code it wrote and simplified it to what was necessary for the migration | How I verified these changes was by double checking that the what it wrote was proper, necessary, and worked by researching and then I also tested that the migration worked, and it did as I could test that the tables were created and that the version of the migration was one | 
| 2026-10-04 | ChatGPT - GPT-5.6 Luna | You are the senior engineer who will inherit this project. Name the five places this design will break first, and for each, the requirement it violates and the cheapest change that would prevent it. Do not compliment the design. | I kept the ideas it provided me and removed the produceResponse as it stated that another request to produce the response wasn't necessary, I add in the extra timeout messgae and validation result, and edited the 409 and 429 like it told me to | I changed what it told me to write to truly fit my project and I didn't remove any extra small things that it got wrong or that weren't necessary | How I verified these changes was by double checking that what needed to be removed was actually necessary by research the endpoint it told me to remove or research if what was added would be needed or helpful to document | 
| 2026-10-10 | ChatGPT - GPT-5.6 Luna | List every task required to deliver this, including setup, error handling, tests, and documentation. Do not estimate anything. | I kept the 4 main ideas for the tasks it presented me out of the 22 as the others were repeats split up a bunch or just were not true for my project | I changed the four ideas into 1 task as it wasn't necessary to split them | How I verified these changes was by review that tasks that I had written down in the plan.md and researched anything I didn't understand about a task it presented be and verified if it was needed for my project based on the requirements.md | 
| 2026-10-10 | ChatGPT - GPT-5.6 Luna | Name fifteen risks for a solo nine-week build with a third-party API dependency. Give each a cause, an event, and a consequence. | I kept the 2 of the main ideas for the risks it presented me out of the 15 as the others were repeats or risks that didn't apply | I changed the 2 ideas into to actually match my project and created risks to fully present them | How I verified these changes was by review that risks that I had written down in the risk-register.md and verified if it was needed for my project based on the plan.md and requirements.md | 
| 2026-10-10 | ChatGPT - GPT-5.6 Luna | You are a skeptical senior engineer reviewing a design for a project that ONE student must finish in 90 hours. You are hunting defects, not suggesting improvements. For every finding output exactly: section requirement id (or "none") what is wrong severity (Critical/Major/Minor) why it matters during construction. Do not propose solutions. Do not comment on style. If you are not certain a section says what you claim, mark the finding "UNVERIFIED". | I kept the main 17 defects that it presented me | I changed some of the words but logged what it presented me and then added my input to the defect and also change the severity of them as major didn't fit them as they were more so clarifing defects | How I verified these changes was by reviewing the plan.md, requirements.md, architecture.md, and the design-review-checklist.md and checking them thoroughly to ensure that the defect was real and needed fixing | 
| 2026-10-18 | Copilot - Auto | How do I stop my ci from failing | I kept the main CI checks that it gave me because did not think that it would make code changes but what it provided me helped to fix it from failing | I changed one of the check from a web add to an app to fit my project and I had to add in an Expo check because it gave me on for a website not an app like how mine is | How I verified these changes was commiting and having the CI run to ensure it worked and I check what I app used to ensure I had all the checks needed | 
| 2026-10-21 | Copilot - Auto | Is there a specific way that Expo/React Native do navigation? Also how do I make a line under my navigation it isn't appearing properly, is there a specific way that it has to be done? | I kept the general structure for how it did the navigation. Then I kept how it added in the boarder as no way else made it work | I changed the navigation and underline to fit my project and to look better, I added in more detail too | How I verified these changes was running the Expo Go app to ensure I could go to a different page and to ensure that the border was there on both screens and didn't look funky and I researched why it needed to create what it did | 
| 2026-10-21 | Copilot - Auto | How would I do this, "Create the script/ directory (or your stack’s equivalent) with five files, each of which does its whole job in one command: Fill them in. script/setup must go from a fresh clone to a runnable project — dependencies from the lock file, database created, migrations applied, one row seeded. If that is eleven steps, then the file has eleven lines and the stranger still types one command. Produce: five executable scripts, committed, plus a ## Run it section in README.md that uses them." | I kept the general structure for how it did the scripts because they were all pretty similar and I kept the seeded data that I didn't ask for but it was right and I kept the information it added to the README | I changed the setup to inclue the key and url had inputs and then I added in a little more information to the README so that it would be a bit more thorough though it did make it pretty thorough | How I verified these changes was by researching to ensure the DEV was needed in the seeded data, I researched to see how scripts are normally done and what mine would need and I researched more on how to write a README | 
| 2026-10-22 | Copilot - Auto | Is there a way to spilt up the build script so that it doesn't take one of my 15 builds for iOS but I can still test it? Then I'm trying to implement the smoke-test script to fit my system, do you know of a better way to do it I need to alter the three defaults to fit into my project and then wire it into the pipeline as the last stage. | I kept the scripts that it gave me, the updates to the ci and README too checking them to ensure that they actually worked with my project | I changed how it was trying to implement them for an Android phone in some part for the simulator changing it for iOS but that was pretty much it because after going through each line they all looked correct | How I verified these changes was by research everything that was confusing or that I didn't understand enough | 
| 2026-10-23 | Copilot - Auto | Can you look at these errors and help me fix my ci smoke test | I kept the code it gave me to fix it because it finally worked | I removed the failing code from the script if it failed | How I verified these changes was looking into what it was doing and the error but then it kept giving half a fix so I tested them until the ci ran green | 
| 2026-10-25 | Copilot - Auto | Could you look at this error and provide me with some placeholder error handling for the analysis page so that I can test its functionality for now | I kept the code it gave me for the error handling because it helps with errors for now until I look into them next week. Then from the code that I already had written on my own which was working to get a response from the AI it updated it and split it up into the analysis page and the index page with the errors to show/generate on the UI so I kept that as it worked well. | I removed/editted some of the extra code it add for errors and displaying the prompts because it did that without me asking | How I verified these changes was testing that I could tell the difference between an error and analysis response. | 
| 2026-10-25 | Copilot - Auto | Can you look at these errors and help me fix my ci smoke test and make the test simplier so it is faster and actually works consistently; please help me with the iOS simulator test it keeps failing | I kept the code it gave me to fix it because it finally worked | I removed the failing code from the script if it failed | How I verified these changes was looking into what it was doing and the error but then it kept giving half a fix so I tested them until the ci ran green | 
| 2026-10-27 | Copilot - Auto | I have implemented the developmentSeed.js and running the smoke script back in, can you double check if I have missed anything? | I kept the code it gave me to make small edits to it to make it actually work | I removed the failing code and then also the extra words and lines it added that weren't neccessary anymore | How I verified these changes was looking into what it was doing and I tested the ci again until the ci ran green | 
| 2026-10-29 | ChatGPT - GPT-5.6 Luna | Instead of a bunch of if statements for the journal entries topic and word counts can you help me make it cleaner and ensure that it works. | I kept the cleaner format that it added to ensure the strings were accurate and displayed properly, and the code and for loops for the topic and word count. | I removed extra edits that it made to a random part in my code because I wanted to keep my original code. | How I verified these changes was by checking that the for loops did what they were supposed to and that it worked | 
| 2026-10-31 | ChatGPT - GPT-5.6 Luna | I have created a page where Journal entries are written, I want to keep the Journal page one page. I want to be able to first see all the rest of the journal entries that were completed then have a button to click on to bring up the writting journal entry component that I have right now that is located in the journal.tsx. Keep it simple, display the journal entries, allowing them to be clicked into and have a button that brings the already coded writing area up. Do not change anything else, then list every assumption you made that I did not state. | I kept the three seperate view it created so that the journal sections can be neatly seperated and gone into | I changed how the views were named, I fixed the spacing of a lot of items, I changed how the styling what done for every component, I changed how the header was presented, I removed the safeareaview, and I changed how the date was presented on both the listing of all the entries and looking into the entries | How I verified these changes was by clicking into each of the past entries to ensure I could see the whole entry, I checked that the writing of the journal entry still worked, and I checked to see if I could see all the journal entries. | 
| 2026-10-31 | ChatGPT - GPT-5.6 Luna | Can you please look at the error handling I have in place now and verify if I have added them in properly and if I am missing anything else? Also can you please help me with adding in the 200 check and if possible the 409 error check. | I kept the additional malformed response, 400, and 429 edits to the checks I had made so they would fully work. Then I kept what it added in for the 200 and 409 checks. | I didn’t keep half of the random error handling it presented me and added in more logging. Then I only had to change a few messages for the 200 and 409 checks. | How I verified these changes was by testing and verifying the errors were necessary and helpful. | 
| 2026-11-01 | ChatGPT - GPT-5.6 Luna | I need to create unit test(s) for the Analysis Page analysis.tsx and index.ts, how would I go about this for my initially, can you give me two base unit tests that I can go off of so I can get an understanding of how it works in this project and with the structure I have in place? | I followed and kept the basic structure it gave me and kept the first example one on the page. I then also kept the beginning of the more complex unit test for the fallback. | I changed the first example to fit my project and the based for the other unit tests and I modified the rest of the more complex unit test for the fallback to fit what mine actually checks. | How I verified these changes was running the units tests with npm test to test if they passed and verified that they were accurate based on the analysis.tsx | 
| 2026-11-05 | Copilot - Auto  | I need to create unit tests, intergration tests, and acceptance test cases and test for my Stress Manager app. Please create them based on the requirements.md. | I kept the five test files that it created for the test cases and their tests | I changed the traceability.csv to match the new test cases and tests and ran/tested them if they could be to see if they could pass and marked them accordingly | How I verified these changes was running the tests with npm test to test if they passed and verified that they were accurate based on the requirements. | 
| 2026-11-05 | Copilot - Auto  | I need to create seeded data sets being, happy, boudary, and hostile sets for my Stress Manager app. Please create them based on the requirements.md. | I kept the three main files that it created for the seeded data and the other extra edits that it made around | I had to edit one return for a check in because it messed up the name that I had already added somewhere else but I kept the rest generally the same | How I verified these changes was looking through the seeded data to ensure that it look correct and right based on the type of seeded data and I ran the tests with npm test to test if they passed again. | 


**Log an entry whenever:** assistant-drafted code, config, schema, or prose
survived into the repository; an assistant materially shaped a decision you
kept; or an assistant did the debugging that produced a fix you committed.

**You do not need an entry for:** autocomplete of a line you were already
typing, spell-check, or a question you asked and did not use.

---

## Entry format

```
### YYYY-MM-DD — <short title>
Tool: <assistant name>, <model / version if you know it>
Asked for: <one line: the actual task, plus where the full prompt is stored>
Accepted: <file or function, and roughly how much survived>
Changed: <the edits you made, and why>
Verified: <the tests or checks that proved it works, plus the requirement id>
```

---

## Good entry

```
### 2026-03-19 — barcode lookup client
Tool: <assistant name>, <model/version if known>
Asked for: an HTTP client `lookupProduct(barcode)` for the product API, with a
  3s timeout, one retry on 5xx only, 404 => null, never throws. Full prompt in
  prompts/2026-03-19-lookup.txt.
Accepted: `pantry/barcode/client.*` — the retry loop and the response mapping;
  about 40 of 95 lines survived.
Changed: rewrote error handling to match `pantry/items` (it swallowed timeouts
  silently); replaced a hard-coded key with PANTRY_API_KEY; renamed three
  variables; deleted a caching layer I did not ask for and do not need yet.
Verified: 4 unit tests with a stubbed HTTP layer (200 / 404 / 500-then-200 / timeout), green in CI on feat/fr-12-barcode. Checked against FR-12 AC-1 and AC-3. DEF-014 filed for the retry-count edge case.
```

Why it earns points: it shows judgment (a rejected caching layer), verification
(four named cases), traceability (FR-12, DEF-014), and honest proportion
(40 of 95 lines).

---

## Bad entry

```
3/19 - used AI for the barcode stuff
```

Why it costs points: no tool, no file, no prompt, no proportion, no test, no
requirement. A grader learns nothing except that you know the word "AI" — and a
hostile reading is the only one available.

---

## Other entries worth logging (short forms)

```
### 2026-03-20 — explained an error message
Tool: <assistant name>
Asked for: what "connection reset by peer" means for my HTTP client under load.
Accepted: nothing into the repo — explanation only.
Changed: n/a
Verified: n/a. Logged because it shaped the retry decision in ADR-0004.
```

```
### 2026-03-21 — test scaffolding for FR-18
Tool: <assistant name>
Asked for: a table-driven test skeleton for the expiring-soon date rule.
Accepted: the skeleton and 2 of 7 cases.
Changed: wrote the boundary cases myself (exactly 3 days, DST change, past date)
  because the drafted cases all sat safely in the middle of the range.
Verified: all 7 pass; FR-18 AC-2 now has a test that fails if the rule flips to
  inclusive.
```

---

## End-of-term self-check

Before the Week-16 submission, read this file straight through and ask: **where
is the "Changed" line empty?** Those are the modules you accepted rather than
built. Re-read them, or rewrite them, before someone asks you about them.