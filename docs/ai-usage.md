# ai-usage

# AI Usage Log — <project name>

<!--
  Milestone 1 template. Copy this file into your repository as docs/ai-usage.md.
  The policy header is written ONCE, in Week 1, before you need it. The table
  grows one row per Amber-zone use, all semester, written the day it happens.
  This file is a required artifact in the Week 16 submission.
-->

**Owner:** Katherine Spencer · **Policy set:** <2026-08-26> · **Last entry:** <2026-08-26>

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