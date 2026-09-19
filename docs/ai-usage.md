# ai-usage

# AI Usage Log — Capstone Project

<!--
  Milestone 1 template. Copy this file into your repository as docs/ai-usage.md.
  The policy header is written ONCE, in Week 1, before you need it. The table
  grows one row per Amber-zone use, all semester, written the day it happens.
  This file is a required artifact in the Week 16 submission.
-->

**Owner:** Katherine Spencer · **Policy set:** <2026-08-26> · **Last entry:** <2026-09-11>

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

<!--
  A BAD entry (do not imitate):
    | Week 3 | ChatGPT | requirements | most of it | some | looked fine |

  A GOOD entry:
    | 2026-09-22 | <assistant + the model version you actually used>
    | "Interview me about a household food-tracking app and list functional requirements."
    | 6 of 19 proposed requirements, as raw material only.
    | Rewrote all 6 into FR form with actor + condition; deleted 13 as out of scope
      (it invented multi-household sharing and a mobile app I never mentioned).
    | Checked each against my Week-2 scoping decision; confirmed FR-004's "3 days"
      threshold with my actual user instead of accepting the model's default.

  The good entry takes ninety seconds and is evidence of judgment.
  The bad one is evidence of nothing.
-->