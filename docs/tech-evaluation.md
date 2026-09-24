## Drivers

| Driver | Requirement id | Why it constrains the stack |
|---|---|---|
| Must be able to communicate with an AI API and properly store its key | FR-AIA-01, FR-AIA-04, NFR-SEC-01, NFR-SEC-02 | Rules out technology stacks that can not implement AI APIs or their keys | 
| Must be able to save and pull the data stored on a phone locally | FR-JOU-01 FR-OVER-01, FR-QUES-01, FR-QUES-03, FR-AIA-01, FR-AIA-04 | Rules out technology that can not pull data that was locally stored on an stressed individuals phone |
| Must be able to not send any unrelated personal information or device information to Gemini when the AI is prompted | NFR-PRIV-02 | Rules out technology that can not choose where data is sent |
| Must be able to measure that the AI Analysis in a p95 under 25 seconds | NFR-PERF-01 | Rules out technology that can not measure specific circumstances |
| Must run where my grader can reach it, specifically on an iOS iPhone through Expo Go and if necessary an simulator for the presentation | CON-02, DEP-02, MNT-01 | Rules out other technology that is not compatible with Expo |


## The job-board test

| Technology | The real reason | Driver or résumé?/(serves me) |
|---|---|---|
| Expo | I want to use this for my app as it is a driver because I need my app to run on an iOS iPhone and I have done more research on it than other technologies though it is a novelty load of 1 so it will take me a bit of extra time understanding it. | Driver |
| React Native | I want to use this for my app as it is a driver because it works with Expo to create the mobile app | Driver |
| React | I purely just want React on my résumé though it is not a driver for this project as it won't create a true native app and React Native definitely works better for mobile devices so, instead I will use it on a side project. | Résumé |
| Expo SQLite | I want to use this for my app as it is a driver because I need to and want to store data locally and it serves me as it is built into expo making it easier for me to store data locally | Driver + Résumé |
| Supabase Edge Function | I want to use this for my app as it is a driver since it can help me store my AI API key safely and I have done more research on it than others though again it is a novelty load of 1 so it will take me a bit of extra time understanding it. | Driver + Résumé |
| Expo API Route | This serves me as it works with Expo though later on it may cost me 7 to 10 more hours as it seems to need a server and I haven't really worked with those | Résumé |

## Generate the option space, then prune it

Data store

Ask an assistant to widen the field:
For a solo developer building a stress management app with check ins, journal entries, weekly and monthly overviews, and ai analysis, there are over about 200 remaining hours, list eight options for data store. Include at least two that are unfashionable. For each: one sentence on what it is best at, and one sentence on its most common failure mode. Do not recommend one. 

Now prune to three, on paper, by hand. Keep at least one option you did not previously want. Delete anything with a novelty load you cannot afford.

The eight it provided me:
1. Supabase (PostgreSQL)
2. SQLite
3. Realm / Atlas Device SDK
4. Firebase Firestore
5. AsyncStorage
6. IndexedDB
7. JSON files / file-system storage (unfashionable)
8. CSV files (unfashionable)

5 not keeping (One sentence per deletion)
1. Supabase (PostgreSQL) - It implements cloud, authentication, security, and synchronization complexity that the app may not actually need and it isn't used primarliy for local storage.
2. Firebase Firestore - It can be hard to manage when data relationships and queries become more relational or complex.
3. IndexedDB - It can be inconvenient when the application is native mobile rather than web-based.
4. JSON files / file-system storage (unfashionable) - It may make updating, querying, validating, and safely modifying many independent records harder.
5. CSV files (unfashionable) - It doesn't work well with relationships, concurrent updates, record modification, and querying.

Top 3
1. SQLite - It is a small embedded relational database that is very good at storing structured app data locally on a device without requiring a server.
2. Realm / Atlas Device SDK - It is an object-oriented local database that is designed for mobile apps and can make working with structured objects convenient.
3. AsyncStorage - It is a simple on device key value store that is good for small amounts of app states and preferences.

