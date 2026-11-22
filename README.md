# Capstone — Capstone Project

Senior capstone by Katherine Spencer, Fall 2026. **Status: Week 9 — Walking Skeleton & Continuous Integration** 

## Project idea
The project idea is a stress management app that aims to help individuals deal with their stress through check ins, overviews, journaling, destressing activities, and AI analysis.

## What is here
- `docs/charter.md` — scope, constraints, non-goals, risks, working agreement
- `docs/hours-log.csv` — every work session, logged the day it happens
- `docs/ai-usage.md` — which AI tools are used on this project, and how
- `docs/` — one document per life-cycle phase; each header says the week it is written
- `src/`, `tests/` — empty until Week 9
- `docs/definition-of-done.md` - a list that must be followed to consider an item as done

## Run it

Install Node.js 22.16.0, npm, and Expo Go on your iPhone. For Windows use Git Bash for the commands below.

Install Commands

```bash
cd ~/Documents   # Example folder to clone the repository in
git clone https://github.com/vPolyBear/capstone.git
cd capstone
```

Before setup, create `mobile/.env` by copying `mobile/.env.example` and replacing the placeholders with your Supabase project URL and anon key. Find these in your Supabase project's API settings:

```bash
cd mobile
cp .env.example .env
```

Note: Replace your own URL and ANON Key from Supabase with the placeholders. This can be done through this commmand too:

```bash
notepad .env
```

Run this from the `mobile/` directory. `./script/setup` checks that both values are present; it does not display them.

Keep the Google API key used by the Edge Function in Supabase's server-side function secrets. Never put it in this file or commit it. The `.env` file is ignored by Git.

From the `mobile/` root, install dependencies and start Expo:

```bash
./script/setup
./script/start
```

- `setup` checks the Supabase settings and installs the locked dependencies. `lint` checks TypeScript.
- `start` launches the Expo development server in tunnel mode; scan the QR code with Expo Go on your iPhone. Tunnel mode can help when the phone cannot connect over the local network. On the app's first launch, it creates the local SQLite database and applies migrations. In Expo Go/development, it adds one sample check-in if the database has no check-ins; later launches do not add another sample. The installable preview build does not include development sample data.

To check the iOS JavaScript bundle locally, run this from `mobile/`:

```bash
./script/build
```

To create an installable iOS preview build through EAS, run `./script/build-ios` from `mobile/`. Sign in and link an EAS project when prompted, configure the `EXPO_PUBLIC_...` values in EAS, and provide Apple signing credentials.

Other project checks, run from `mobile/`:

```bash
./script/lint   # TypeScript check
./script/test   # Run tests
./script/smoke-test     # Verifies SQLite database and sample data
```

The smoke check reads the database from the running iOS app, verifies both migrations, and checks the development-seeded check-in. CI builds and launches a clean app in an iOS simulator before running it. To run it locally, start the app in an iOS simulator first. Since SQLite is embedded in the app, there is no separate database service to stop; for the failure check, rename the app's SQLite file in the simulator container and run `./script/smoke`. It must fail because the real database file is missing.



# Stress Manager

> {{ONE SENTENCE: what it does and who it is for. Not what you wish it did — what it does today.}}

**Status:** {{Working / Partially working — say plainly what does not work yet}}
**Built by:** {{Your name}} · {{Course, term}}

## 1. What this is and who it is for

{{2–4 sentences: the problem, the user, the thing it replaces. A reader who stops here should be able
to decide whether to keep reading.}}

**What it does not do:** {{2–3 honest non-goals. This is the part that earns trust.}}

## 2. Demo

{{Screenshot, animated GIF, or a 60–90 second recording; for a CLI, a real terminal session. Commit the image under `docs/img/` and use a relative path so it renders on GitHub.}}

## 3. Prerequisites

| Requirement | Version built and tested on | Check it with | What breaks without it |
|---|---|---|---|
| Node.js | v22.16.0 | `node --version ` | Typescript and Javascript wouldn't run properly  |
| npm | 10.9.2 | `npm --version` | Couldn't install any packages |
| Git | 2.51.0.windows.1 | `git --version` | Could not be cloned |
| Expo CLI | 58.1.19 | `npx expo --version` | The app could not build or start |
| Supabase CLI | 2.122.1 | `npx supabase --version` | Could not deploy the edge functions |
| EAS CLI | 27.6.0 | `eas --version` | Could not preview the build |
| Expo-sqlite | 58.0.15 | `npm list expo-sqlite` | Could not store data locally |
| Supabase key | n/a | see Configure | The AI Analysis requests would fail |



## 4. Install

First install Expo Go from the App Store

```bash
cd ~/Documents   # Example folder to clone the repository in
git clone https://github.com/vPolyBear/capstone.git
cd capstone
cd mobile
```

Note: the dependencies are install through the command: ./script/setup
 which is done later as seen in the run section

Expected: The cloned project folder.
Takes about 1 to 2 minutes on a first run.

## 5. Configure

Note: Before setup, create `mobile/.env` by copying `mobile/.env.example` and replacing the placeholders with your Supabase project URL and anon key. Find these in your Supabase project's API settings:

```bash
cp .env.example .env
```

Note: Replace your own URL and ANON Key from Supabase with the placeholders. This can be done through this commmand too:

```bash
notepad .env
```

| Variable | Required? | What it is | Default |
|---|---|---|---|
| `EXPO_PUBLIC_SUPABASE_URL` | yes | The URL address for the Supabase project that allows the app to connect to the Edge Functions | none |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | yes | The app uses this public key to communicate with the Supabase project | none |

Never commit `.env`. Placeholder values only in this file and in `.env.example`.

## 6. Run

```bash
./script/setup
./script/start
```

Expected: the setup commands success lines are these
- found 0 vulnerabilities
- Setup complete. Run ./script/start to open the app.
- Expo SQLite creates the device database, applies migrations, and seeds development data on first app launch.

Then open the QR code provided with the start command, opening it through your phones camera and you should see the Home screen for the Stress Manager app.
If this doesn't work use npx expo start --go --tunnel and ensure you click s so your in Expo Go not the development build and open the app by going to Expo Go then clicking on the development server after the app starts
Takes about 1 to 5 minutes on a first run.

**Verify it actually works:** {{one concrete action a stranger can take — create a record, run a query — and the result they should get. This is the difference between "it started" and "it works."}}
    - Create a check-in, filling minimally the four required fields and save it. Then check that the check-in appears on the Overview page properly.

To stop the app press Ctrl + C the to build do this command:

```bash
./script/build
```

## 7. Test

```bash
./script/lint           # TypeScript check
./script/test           # Run automated tests
./script/smoke-test     # Verifies SQLite database and sample data
```
The lint command is expected to pass with no errors

The Tests results Expect: 9 passed, 9 total tests, 78 passing, 1 skipped, about 17.6 seconds.
Known failing/skipped tests and why: 0 failing, 1 Skipped: "hostile dataset entries persist exactly through the Journal screen and SQLite"

Then the smoke test is expected to return: SMOKE PASS: SQLite database verified (tense).


## 8. Project layout

Main Folders

```
capstone/
    docs/        specification, architecture, runbook, decision records
    mobile/     The React Native / Expo app
    tests/      The Automated Tests

```

## 9. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Supabase URL and ANON Key missing | Didn't input it in or can't find it | Copy the .env.example into the .env, Go to Supabase.com, create a project, go into the project, open the left hand bar, open `Project Settings` add in from `General` the `Project ID` to the `your-project` spot in the URL keep the rest the same, then go back to the Supabase page and instead on in General go to API Keys and copy the `Publishable Key` and insert it into the `your-anon-key` spot in the `ANON Key` |
| Edge Function is missing or out of date | Didn't input it, update it, or deploy it | Go to `mobile\supabase\functions\sendAnalysis\index.ts` and copy the code in it, then go to Supabase.com, go into the project, then open the left hand bar, open `Edge Functions` and either deploy new function `Via Editor` or open existing one, copy and paste new copy or original code and hit deploy |
| Expo Go isn't connecting | Phone isn't able to connect or not starting the app properly | Retry internet connection, click Try Again in Expo Go or Ctrl + C on the computer and restart it, and ensure the command `npx expo start --tunnel` is being used OR If this doesn't work use npx expo start --go --tunnel and ensure you click s so your in Expo Go not the development build and open the app by going to Expo Go then clicking on the development server after the app starts |

## 10. License

MIT — see `LICENSE`.

## 11. Contact and further reading

kspencer0710@gmail.com · Architecture: `docs/architecture.md` · Operations: `docs/runbook.md` ·
Decisions: `docs/adr/README.md` · New here? `docs/onboarding.md`