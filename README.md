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

## How to run it

Install Node.js 22.16.0, npm, and Expo Go on your iPhone. For Windows use Git Bash for the commands below.

Before setup, create `mobile/.env` by copying `mobile/.env.example` and replacing the placeholders with your Supabase project URL and anon key. Find these in your Supabase project's API settings:

```sh
cp .env.example .env
```

Run this from the `mobile/` directory. `./script/setup` checks that both values are present; it does not display them.

Keep the Google API key used by the Edge Function in Supabase's server-side function secrets. Never put it in this file or commit it. The `.env` file is ignored by Git.

From the repository root, install dependencies and start Expo:

```sh
cd mobile
./script/setup
./script/start
```

- `setup` checks the Supabase settings and installs the locked dependencies. `lint` checks TypeScript.
- `start` launches the Expo development server in tunnel mode; scan the QR code with Expo Go on your iPhone. Tunnel mode can help when the phone cannot connect over the local network. On the app's first launch, it creates the local SQLite database and applies migrations. In Expo Go/development, it adds one sample check-in if the database has no check-ins; later launches do not add another sample. The installable preview build does not include development sample data.

To check the iOS JavaScript bundle locally, run this from `mobile/`:

```sh
./script/build
```

To create an installable iOS preview build through EAS, run `./script/build-ios` from `mobile/`. Sign in and link an EAS project when prompted, configure the `EXPO_PUBLIC_...` values in EAS, and provide Apple signing credentials.

Other project checks, run from `mobile/`:

```sh
./script/lint   # TypeScript check
./script/test   # Run tests
```
