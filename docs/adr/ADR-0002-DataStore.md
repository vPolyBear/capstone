# ADR 0002 — Local Data Storage

- **Status:** Accepted
- **Date:** 2026-09-27
- **Decider:** Katherine Spencer
- **Requirements affected:** FR-QUES-01, FR-OVER-01, FR-JOU-01, FR-AIA-01, FR-AIA-04, NFR-SEC-02, CON-01 
- **Related ADRs:** ADR 0001 (Framework)

## Context

What about my requirements makes this a real decision to use Expo SQLite is because the requirements highlight that I am making an app that will need to be able to store and retrieve data locally for the the core features (FR-QUES-01, FR-OVER-01, FR-JOU-01, FR-AIA-01, FR-AIA-04) while not exposing any error details from the database (NFR-SEC-02). These features push on this data storage, Expo SQLite, as the core features (FR-QUES-01, FR-JOU-01) will need to have the data inputted into them stored, which will then need to be retrieved for the core features (FR-OVER-01, FR-AIA-01, FR-AIA-04). This data store provides a place for the features data to be stored and retrieved locally which makes this Stress Management app possible.

I already know how to query in Expo SQLite as it uses SQL which I'm very familiar with and from testing it shows that I am able to store and reteive data that was inserted. What is new to me is using it with the Gemini API as I haven't provided the Gemini AI API data from Supabase Edge Function before, to get a response back based on the data provided from Expo SQLite. Though I expect that because of this choice of using Expo SQLite and based on how familiar I am with it, that it will not cause me to go over my hour budget so that I will be able to complete the app within the deadline of 240 hours in 16 weeks (CON-01). Then because it is open source, meaning that it is free, it perfectly allows me to work within my budget as a student.

## Options considered

| Option | Weighted score | The detail that decided it |
|---|---:|---|
| SQLite | 5.00 | Stores data in a way that I'm used to as it is a relational database |
| AsyncStorage | 4.50 | Stores data with key value pairs which isn't a way that I'm used to |
| WatermelonDB | 4.10 | Stores data in the same way as SQLite the setup complexity makes it overall harder learn and would take more time than I budgeted for |

## Decision

I will use Expo SQLite 57.0.3 as the local data store. I chose this because it works with Expo/React Native and is able to store the check in and journal entry data and retrieve it for the Overview and AI Analysis. I have also work with SQL which is used for Expo SQLite which makes it easy for me to work with it. 

## Consequences

**Positive**

- What becomes easier because of Expo SQLite is that it provides me with local data storage for my core features (FR-QUES-01, FR-OVER-01, FR-JOU-01, FR-AIA-01, FR-AIA-04). It also allows me to store and retrieve data for the specific features easily.

**Negative**

- What becomes slower is the writing of SQL in Expo SQLite as I will need to freshen up on how to work with SQL through Expo SQLite.
- The new thing that I will have to learn is retrieving the data for the AI Anaylsis as I'm not exactly sure how it fully works though I have budgeted 6 hours for it.
- I will continue to research how to get the data from Expo SQLite to the end goal of the Gemini AI API for anaylsis which will likely cost 3 hours.

## Revisit trigger

I will write a superseding ADR if Expo SQLite can no longer safely store data a user inputs 100% of the time or if it can not properly retreive the data stored anymore 4 out of 5 times in less than 25 seconds or if it no longer is open source and costs money where its monthly price exceeds over 50 dollars a month.

## Verification

| Claim in this ADR | Source | Checked on |
|---|---|---|
| Expo SQLite Version 57.0.3 | https://docs.expo.dev/versions/latest/sdk/sqlite/ | 2026-09-27 |
| Expo SQLite is Open Source | https://github.com/expo/expo/blob/main/LICENSE | 2026-09-27 |
| Expo SQLite works with Expo/React Native | https://docs.expo.dev/versions/latest/sdk/sqlite/ | 2026-09-27 |
| Expo SQLite is a Relational Database | https://docs.expo.dev/versions/latest/sdk/sqlite/ | 2026-09-27 |
| Expo SQLite uses SQL queries | https://docs.expo.dev/versions/latest/sdk/sqlite/ | 2026-09-27 |
| Expo SQLite can safely store and retrieve data | https://docs.expo.dev/develop/user-interface/store-data/ | 2026-09-27 |
