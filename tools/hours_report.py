#!/usr/bin/env python3
"""Weekly rollup, phase mix, burn-down, and honesty checks for a capstone hours log.

Usage:  python3 tools/hours_report.py [docs/hours-log.csv]

This supersedes the Week 1 script at the same path: same columns, same command,
plus the weekly rollup, phase mix, burn-down, and honesty checks. Overwrite
tools/hours_report.py with this file in Week 10 and keep using it to Week 16.

Needs only three columns: date, hours, phase. It reads the work description
from whichever of description, task, or notes your log actually has, so it
runs on the Week-1 template and on the wider log this chapter uses.

Prints the weekly rollup against the plan, the phase distribution, the
cumulative burn against the 240-hour budget, and the pattern checks a grader
runs on a log to see whether it was kept or reconstructed.
"""

import csv
import sys
from collections import defaultdict
from datetime import datetime

BUDGET = 240.0
WEEKS = 16


def load(path):
    rows = []
    with open(path, newline="", encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            if not row.get("date"):
                continue
            row["date"] = datetime.strptime(row["date"].strip(), "%Y-%m-%d").date()
            row["hours"] = float(row["hours"])
            rows.append(row)
    return sorted(rows, key=lambda r: r["date"])


def what_you_did(row):
    """The work description, whatever your log calls that column."""
    for key in ("description", "task", "notes"):
        text = (row.get(key) or "").strip()
        if text:
            return text
    return ""


def flags(rows, per_day):
    found = []
    whole = sum(1 for r in rows if float(r["hours"]).is_integer())
    if whole / len(rows) > 0.8:
        found.append(f"{whole}/{len(rows)} entries are whole numbers. Real work is not round.")
    day, hours = max(per_day.items(), key=lambda kv: kv[1])
    if hours > 10:
        found.append(f"{day} logs {hours:.2f} h in one day. That is a backfill tell.")
    seen = defaultdict(int)
    for r in rows:
        text = what_you_did(r)
        if text:
            seen[text.lower()] += 1
    for text, n in seen.items():
        if n >= 3:
            found.append(f'"{text[:44]}" appears {n} times. Say what you actually did.')
    days = sorted(per_day)
    for earlier, later in zip(days, days[1:]):
        gap = (later - earlier).days
        if gap > 10:
            found.append(f"{gap}-day silence from {earlier} to {later}. Did work go unlogged?")
    return found


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else "hours-log.csv"
    rows = load(path)
    if not rows:
        print(f"No entries found in {path}")
        return 1

    start = rows[0]["date"]
    weekly, phases, per_day = defaultdict(float), defaultdict(float), defaultdict(float)
    for r in rows:
        weekly[(r["date"] - start).days // 7 + 1] += r["hours"]
        phases[r["phase"]] += r["hours"]
        per_day[r["date"]] += r["hours"]
    total = sum(r["hours"] for r in rows)

    print(f"\nHOURS LOG - {path}  ({len(rows)} entries, {start} to {rows[-1]['date']})")
    print("\nWEEKLY ROLLUP")
    running = 0.0
    for week in sorted(weekly):
        running += weekly[week]
        plan = BUDGET / WEEKS * week
        print(f"  Week {week:>2}  {weekly[week]:6.2f} h   cumulative {running:7.2f} h"
              f"   plan {plan:6.1f} h   {running - plan:+7.2f} h")
    print(f"\n  Budget {BUDGET:.0f} h | logged {total:.2f} h | remaining {BUDGET - total:.2f} h")

    print("\nPHASE DISTRIBUTION")
    for phase, hours in sorted(phases.items(), key=lambda kv: -kv[1]):
        bar = "#" * int(round(hours / total * 40))
        print(f"  {phase:<14} {hours:6.2f} h  {hours / total * 100:5.1f}%  {bar}")

    print("\nWHAT YOUR GRADER SEES")
    for line in flags(rows, per_day) or ["No pattern flags. This reads as kept, not reconstructed."]:
        print("  -", line)
    print()
    return 0


if __name__ == "__main__":
    sys.exit(main())