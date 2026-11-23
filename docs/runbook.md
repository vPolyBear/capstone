# Runbook

Where each credential comes from
    - The Supabase URL + the anon key is from the Supabase's projects API setting. 
    - Then the Google API key is from the Google AI Studio.
How to rotate it
    - I'll rotate it by getting a replacement anon key and then update the .env with it and test to make sure that the app still works
    - I'll rotate it by getting a new Google API key then update the Supabase Edge Function secrets with it, then I will test that the app still works with it
Who to tell 
    - If a key was exposed I will tell the project maintainer me, Katherine Spencer and also Dr. Litman.
How long rotation takes
    - How long rotation will take is as long as it takes to update the key with a new one and checking that everything still works, this would likely take around 30 minutes and I will rotate it right away if a key is exposed.

# Runbook — Stress Manager

For the person operating this system, possibly at an inconvenient hour, possibly without you.
Every command below has been run by a human on a machine that is not the author's laptop.

## 1. Where it runs

| Environment | Where | Who has access | How to get in |
|---|---|---|---|
| Local | developer machine | anyone with the repo | see `README.md` |

Where the data actually lives: Data inputted in from the Check In and Journal Page are saved only on a local SQLite database named StressManagement.db on the user's phone. The database: mobile\src\lib\database.ts. This inclues the check_ins, journal entries, and schema_migrations tables. The AI Analysis sents the selected data to the Supabase Edge Function called sendAnalysis that then sends it to the Google Gemini API.
Where the logs actually live: Expo Terminal and Expo / React Native console. Supabase Edge Function Logs for the deployed sendAnalysis Edge Function.

## 2. Start, stop, restart

```bash
# start
./script/start
# expected: Expo SQLite creates the device database, applies migrations, and seeds development data on first app launch.

# stop
Ctrl + C

# restart after a config change
./script/start

# Then if cached or other problems happen run: 
npx expo start --go --tunnel --clear
```

## 3. Health check

The one thing you run to answer "is it alive?":

```bash
./script/smoke-test
```

Healthy looks like: `SMOKE PASS: SQLite database verified`
Unhealthy looks like: `SMOKE FAIL: Database not found` → go to section 6.

## 4. Routine operations

| Task | Command | How often | Expected result |
|---|---|---|---|
| Apply a schema change | Update the SQLite migration files and run the app | on release | The migration is recorded in the schema_migrations table and the database works as intended |
| Rotate a key or secret | Steps at the top of this page | when the key or secret is exposed | The Edge Function and Google Gemini AI still work as intended |
| Seed demo data | `.script/smoke-test` | for demos | SMOKE PASS: SQLite database verified (tense). |

## 5. Normal readings

So the operator can tell abnormal from normal:

- Startup time: about 5-25 seconds.
- Typical response time for saving a check-in: about 1 s.
- Known limits: Rate limited by Gemini or Supabase — behavior at the limit: the AI Analysis would go to its fallback. Data stored is deleted when the app is deleted from the users phone. AI request takes longer than 5 minutes — behavior at the limit: the AI Analysis would go to its fallback. 64 KB per AI request, larger is rejected. Then 10,000 characters for a journal entry, longer are also rejected.

## 6. Escalation and the things only a human can decide

- Data loss suspected → **stop.** Do not restart. Contact the project maintainer Katherine Spencer and preserve the device and database as is.
- A third-party service is down → Supabase: https://status.supabase.com & Google Gemini: https://status.cloud.google.com; The system fallbacks back to the Analysis fallback for the Analysis Pages response.
- A secret may be exposed → rotate first, investigate second. Steps: listed on the top of this page.
- Contact: Katherine Spencer, kspencer0710@gmail.com, Expected to response within 2 business day

## 7. Last verified

This runbook was executed end to end on 2026-11-22 by Katherine Spencer on an iPhone 11 Pro in Expo Go iOS Version 26.3.1 (a).
Anything not verified on that date is marked **UNVERIFIED** in the text above.