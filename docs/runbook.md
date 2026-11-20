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
| {{Staging}} | {{URL or "none"}} | {{names/roles}} | {{steps}} |
| {{Production}} | {{URL or "none"}} | {{names/roles}} | {{steps}} |

Where the data actually lives: {{host, database name, storage bucket}}.
Where the logs actually live: {{path or console}}.

## 2. Start, stop, restart

```
# start
{{command}}
# expected: {{success line}}

# stop
{{command}}

# restart after a config change
{{command}}
```

## 3. Health check

The one thing you run to answer "is it alive?":

```
{{command or curl}}
```

Healthy looks like: `{{exact output}}`
Unhealthy looks like: `{{exact output}}` → go to section 6.

## 4. Routine operations

| Task | Command | How often | Expected result |
|---|---|---|---|
| Back up the data | `{{command}}` | {{cadence}} | {{file/size}} |
| Restore from a backup | `{{command}}` | on demand | {{how you verify it worked}} |
| Apply a schema change | `{{command}}` | on release | {{output}} |
| Rotate a key or secret | {{steps}} | {{cadence}} | {{how you verify}} |
| Seed demo data | `{{command}}` | for demos | {{output}} |

## 5. Normal readings

So the operator can tell abnormal from normal:

- Startup time: about {{N}} seconds.
- Typical response time for {{the main operation}}: about {{N}} ms.
- Log lines you should expect to see and safely ignore: {{examples}}.
- Known limits: {{rate limits, row counts, concurrent users, disk}} — behavior at the limit: {{what happens}}.

## 6. Failure catalogue

Copy this block once per failure. Write these from your defect log, not from imagination.

### F-01 — {{Short symptom, in the operator's words}}

- **Symptom:** {{exact error text or observed behavior}}
- **First check:** `{{command}}` → {{what you are looking for}}
- **Likely cause:** {{cause}}
- **Fix:** `{{command or steps}}`
- **Verify the fix:** {{the health check or the specific action that should now work}}
- **If that does not work:** {{next thing to try, or "stop and escalate — see section 7"}}

### F-02 — {{...}}

## 7. Escalation and the things only a human can decide

- Data loss suspected → **stop.** Do not restart. {{who to contact, what to preserve}}.
- A third-party service is down → {{status page URL}}; the system {{degrades how}}.
- A secret may be exposed → rotate first, investigate second. Steps: {{...}}.
- Contact: {{name, email, expected response time — and, after handoff, who owns this instead}}.

## 8. Last verified

This runbook was executed end to end on {{date}} by {{name}} on {{machine/OS}}.
Anything not verified on that date is marked **UNVERIFIED** in the text above.